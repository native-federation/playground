# Features

A catalogue of what each team ships, the fragments they expose, the
events they speak, and the cross-remote dependencies between them.

## Teams at a glance

| Team       | Remote name               | Port | Colour    | Owns                             |
| ---------- | ------------------------- | ---- | --------- | -------------------------------- |
| Explore    | `@tractor-store/explore`  | 4301 | `#FF5A54` | Catalog, recommendations, chrome |
| Decide     | `@tractor-store/decide`   | 4302 | `#53FF90` | Product detail                   |
| Checkout   | `@tractor-store/checkout` | 4303 | `#FFDE54` | Cart, checkout flow, mini-cart   |

The host runs on port 4300 and owns the URL. Colours are used by the
boundary-overlay debugging script described in
[architecture.md](./architecture.md#team-boundary-visualisation).

---

## Explore — catalog & chrome

Explore owns the catalog *and* the page chrome (header, footer) that
every other remote pulls in. It also ships the recommendations and the
store picker.

**Source:** `apps/explore/`

### Exposed fragments

| `mfe-*` tag           | Component                                          | Purpose                                 |
| --------------------- | -------------------------------------------------- | --------------------------------------- |
| `mfe-home`            | `features/home/Home.tsx`                           | Landing page (full route)               |
| `mfe-category`        | `features/category/Category.tsx`                   | Category listing (full route)           |
| `mfe-stores`          | `features/stores/Stores.tsx`                       | Store finder (full route)               |
| `mfe-header`          | `features/header/Header.tsx`                       | Top nav, logo, mini-cart slot           |
| `mfe-footer`          | `features/footer/Footer.tsx`                       | Page footer                             |
| `mfe-recommendations` | `features/recommendations/Recommendations.tsx`     | "You might also like" (`skus` attribute)|
| `mfe-store-picker`    | `features/store-picker/StorePicker.tsx`            | Store selector (used inside checkout)   |

### Routed intents

| Public intent ID            | Path                           | Renders        |
| --------------------------- | ------------------------------ | -------------- |
| `explore.home`              | `/explore/`                    | `mfe-home`     |
| `explore.products`          | `/explore/products`            | `mfe-category` |
| `explore.products.category` | `/explore/products/{category}` | `mfe-category` |
| `explore.stores`            | `/explore/stores`              | `mfe-stores`   |

### Cross-remote fragments it loads

- `mfe-mini-cart` from `@tractor-store/checkout`
  (`features/header/Header.tsx`).

### Events it emits

- `store:selected` — when the user picks a pickup store inside
  `mfe-store-picker`. Consumed by `mfe-checkout`.

---

## Decide — product detail

**Source:** `apps/decide/`

### Exposed fragments

| `mfe-*` tag   | Component                         | Purpose                |
| ------------- | --------------------------------- | ---------------------- |
| `mfe-product` | `features/product/Product.tsx`    | Product detail (route) |

### Routed intents

| Public intent ID | Path                   | Renders       |
| ---------------- | ---------------------- | ------------- |
| `decide.product` | `/decide/product/{id}` | `mfe-product` |

The page reads `id` from the path and an optional `sku` query
parameter from `routeParams`, e.g. `/decide/product/CL-01?sku=CL-01-GR`.

### Cross-remote fragments it loads

```tsx
useRemoteElement('@tractor-store/explore', 'mfe-header');
useRemoteElement('@tractor-store/checkout', 'mfe-add-to-cart');
useRemoteElement('@tractor-store/explore', 'mfe-recommendations');
useRemoteElement('@tractor-store/explore', 'mfe-footer');
// …
<mfe-add-to-cart sku={selected?.sku ?? ''}></mfe-add-to-cart>
<mfe-recommendations skus={selected?.sku ?? ''}></mfe-recommendations>
```

---

## Checkout — cart & purchase flow

**Source:** `apps/checkout/`

### Exposed fragments

| `mfe-*` tag       | Component                               | Purpose                                         |
| ----------------- | --------------------------------------- | ----------------------------------------------- |
| `mfe-cart`        | `features/cart/Cart.tsx`                | Shopping cart (full route)                      |
| `mfe-checkout`    | `features/checkout/Checkout.tsx`        | Checkout form (full route)                      |
| `mfe-thanks`      | `features/thanks/Thanks.tsx`            | Order confirmation (full route)                 |
| `mfe-mini-cart`   | `features/mini-cart/MiniCart.tsx`       | Header cart icon + count                        |
| `mfe-add-to-cart` | `features/add-to-cart/AddToCart.tsx`    | "Add to cart" button (`sku` attribute, used by decide) |

### Routed intents

| Public intent ID    | Path                 | Renders        |
| ------------------- | -------------------- | -------------- |
| `checkout.cart`     | `/checkout/cart`     | `mfe-cart`     |
| `checkout.checkout` | `/checkout/checkout` | `mfe-checkout` |
| `checkout.thanks`   | `/checkout/thanks`   | `mfe-thanks`   |

### Cross-remote fragments it loads

- `Cart.tsx` — `mfe-header`, `mfe-recommendations`, `mfe-footer` (explore).
- `Checkout.tsx` — `mfe-store-picker`, `mfe-footer` (explore).
- `Thanks.tsx` — `mfe-header`, `mfe-footer` (explore).

### Events it speaks

- **Listens to** `store:selected` from explore — pre-fills the order's
  store field.
- **Emits** `nav:navigate` with intent `'checkout.thanks'` after a
  successful order.
- **No bus for the cart.** `<mfe-add-to-cart>` and `<mfe-mini-cart>`
  are both checkout elements from the same bundle, so they share the
  module-level store in `data/cart-store.ts` and always show the same
  count. A second tab is kept in sync through `storage` events.

---

## Cross-remote integration map

| Consumer                  | Pulls                                             | From     |
| ------------------------- | ------------------------------------------------- | -------- |
| explore (`mfe-header`)    | `mfe-mini-cart`                                   | checkout |
| decide (`mfe-product`)    | `mfe-header`, `mfe-footer`, `mfe-recommendations` | explore  |
| decide (`mfe-product`)    | `mfe-add-to-cart`                                 | checkout |
| checkout (`mfe-cart`)     | `mfe-header`, `mfe-footer`, `mfe-recommendations` | explore  |
| checkout (`mfe-checkout`) | `mfe-store-picker`, `mfe-footer`                  | explore  |
| checkout (`mfe-thanks`)   | `mfe-header`, `mfe-footer`                        | explore  |

## Cross-remote events

| Event            | Emitter                              | Subscriber                         |
| ---------------- | ------------------------------------ | ---------------------------------- |
| `nav:navigate`   | `<NavLink>` + direct emitters        | host (`createNavigation`)          |
| `nav:resolve`    | host (registers its resolver)        | `useNavIntent` in every remote     |
| `store:selected` | explore (`mfe-store-picker`)         | checkout (`mfe-checkout`)          |

## Contracts

The apps share no runtime code. What the teams agree on is one
types-only file, `libs/contracts/index.ts` (alias
`@tractor-store/contracts`):

| Type                                       | Used for                                                       |
| ------------------------------------------ | -------------------------------------------------------------- |
| `EnvironmentConfig`                        | the shape of every app's `env.config.json`                     |
| `RemoteElementModule`                      | what every exposed `mfe-*` module exports (`bootstrap`)        |
| `NavContribution`, `NavIntent`             | each remote's `nav-contribution.ts`                            |
| `NavPayload`, `NavResolver`, `RouteParams` | links in the remotes and params on routed elements             |
| `Events` and the payload types             | every event on the bus, plus the `window.__NF_REGISTRY__` type |
| `JSX.IntrinsicElements`                    | the embeddable `mfe-*` tags and their attributes               |

Everything else, including the bootstrap, the custom-element wrapper,
the remote loader, `<NavLink>` and the button, is written out in each
app that uses it. Each app's `sharedMappings` is `[]`.

## See also

- [Architecture](./architecture.md)
- [Navigation](./navigation.md)
