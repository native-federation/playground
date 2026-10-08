# Features

A catalogue of what each team ships, the fragments they expose, the
events they speak, and the cross-remote dependencies between them.
Use this document as a map when you need to find where something
lives or what would break if you renamed an `mfe-*` tag.

## Teams at a glance

| Team       | Remote name              | Port | Colour    | Owns                               |
| ---------- | ------------------------ | ---- | --------- | ---------------------------------- |
| Explore    | `@tractor-store/explore` | 4201 | `#FF5A54` | Catalog, recommendations, chrome   |
| Decide     | `@tractor-store/decide`  | 4202 | `#53FF90` | Product detail                     |
| Checkout   | `@tractor-store/checkout`| 4203 | `#FFDE54` | Cart, checkout flow, mini-cart     |

The host runs on port 4200 and owns the URL. Colours are used by the
boundary-overlay debugging script described in
[architecture.md](./architecture.md#team-boundary-visualisation).

The team names come from the [Tractor Store Blueprint][blueprint] and
are deliberately *verbs from the customer journey*, not technical
layers. Explore helps the user browse, Decide helps them choose a
product, Checkout takes them through the purchase. That vertical
split — feature, not framework layer — is the textbook MFE team
decomposition.

[blueprint]: https://github.com/neuland/tractor-store-blueprint

---

## Explore — catalog & chrome

Explore is the largest remote: it owns the catalog *and* the page
chrome (header, footer) that every other remote pulls in. It also
ships the "recommendations" carousel and the in-store-picker UI.

**Source:** `projects/explore/`

### Exposed fragments

| `mfe-*` tag           | Component                                                            | Purpose                                          |
| --------------------- | -------------------------------------------------------------------- | ------------------------------------------------ |
| `mfe-home`            | `features/home/home.page.ts`                                         | Landing page (full route)                        |
| `mfe-category`        | `features/category/category.page.ts`                                 | Category listing (full route)                    |
| `mfe-stores`          | `features/stores/stores.page.ts`                                     | Store finder (full route)                        |
| `mfe-header`          | `features/header/header.component.ts`                                | Top nav, logo, mini-cart slot                    |
| `mfe-footer`          | `features/footer/footer.component.ts`                                | Page footer                                      |
| `mfe-recommendations` | `features/recommendations/recommendations.component.ts`              | "You might also like" carousel                   |
| `mfe-store-picker`    | `features/store-picker/store-picker.component.ts`                    | Store selector (used inside checkout)            |

### Routed intents

The remote's `nav-contribution.ts` declares intent IDs *relative* to
the remote; the host prepends `basePath` ("explore") to form the
public IDs.

| Public intent ID              | Path                          | Renders          |
| ----------------------------- | ----------------------------- | ---------------- |
| `explore.home`                | `/explore/`                   | `mfe-home`       |
| `explore.products`            | `/explore/products`           | `mfe-category`   |
| `explore.products.category`   | `/explore/products/{category}` | `mfe-category`   |
| `explore.stores`              | `/explore/stores`             | `mfe-stores`     |

### Cross-remote fragments it loads

- `mfe-mini-cart` from `@tractor-store/checkout`
  (`projects/explore/src/features/header/header.component.html:18`) —
  the header reserves a slot for the mini-cart shipped by checkout.

That is the only cross-team dependency explore consumes; everything
else under `mfe-header`, `mfe-footer`, and `mfe-recommendations` is
its own.

### Events it emits

- `store:selected` — when the user picks a pickup store inside
  `mfe-store-picker`
  (`projects/explore/src/features/store-picker/store-picker.component.ts:47`).
  Defined as a typed channel in
  `libs/shared/src/bus/store-channels.ts` and consumed by
  `mfe-checkout` to pre-fill the order's store field.

---

## Decide — product detail

Decide owns one page: the product detail view. It has the smallest
surface area and the most cross-remote integration.

**Source:** `projects/decide/`

### Exposed fragments

| `mfe-*` tag    | Component                              | Purpose                  |
| -------------- | -------------------------------------- | ------------------------ |
| `mfe-product`  | `features/product/product.page.ts`     | Product detail (route)   |

### Routed intents

| Public intent ID   | Path                       | Renders        |
| ------------------ | -------------------------- | -------------- |
| `decide.product`   | `/decide/product/{id}`     | `mfe-product`  |

The page reads `id` from the path and an optional `sku` query parameter
from `routeParams`, e.g. `/decide/product/123?sku=BLUE-XL`.

### Cross-remote fragments it loads

`features/product/product.page.html` drops four foreign custom
elements into its markup. The `mfeRemote` attribute
(`RemoteElementDirective`) names the remote each one is loaded from:

```html
<mfe-header mfeRemote="@tractor-store/explore"></mfe-header>
<mfe-add-to-cart mfeRemote="@tractor-store/checkout" [attr.sku]="selectedSku()"></mfe-add-to-cart>
<mfe-recommendations mfeRemote="@tractor-store/explore" [attr.skus]="selectedSku()"></mfe-recommendations>
<mfe-footer mfeRemote="@tractor-store/explore"></mfe-footer>
```

Each is a custom element, so HTML is the only contract.

---

## Checkout — cart & purchase flow

Checkout owns the entire purchase journey plus the mini-cart and
add-to-cart widgets that other teams embed.

**Source:** `projects/checkout/`

### Exposed fragments

| `mfe-*` tag         | Component                                       | Purpose                              |
| ------------------- | ----------------------------------------------- | ------------------------------------ |
| `mfe-cart`          | `features/cart/cart.page.ts`                    | Shopping cart (full route)           |
| `mfe-checkout`      | `features/checkout/checkout.page.ts`            | Checkout form (full route)           |
| `mfe-thanks`        | `features/thanks/thanks.page.ts`                | Order confirmation (full route)      |
| `mfe-mini-cart`     | `features/mini-cart/mini-cart.component.ts`     | Header cart icon + count             |
| `mfe-add-to-cart`   | `features/add-to-cart/add-to-cart.component.ts` | "Add to cart" button (used by decide)|

### Routed intents

| Public intent ID      | Path                  | Renders         |
| --------------------- | --------------------- | --------------- |
| `checkout.cart`       | `/checkout/cart`      | `mfe-cart`      |
| `checkout.checkout`   | `/checkout/checkout`  | `mfe-checkout`  |
| `checkout.thanks`     | `/checkout/thanks`    | `mfe-thanks`    |

### Cross-remote fragments it loads

- `cart.page.ts` — `mfe-header`, `mfe-footer`, `mfe-recommendations`
  (all from explore).
- `checkout.page.ts` — `mfe-store-picker`, `mfe-footer` (from explore).
  Notably, the checkout page reuses explore's store picker instead of
  duplicating store data inside checkout.
- `thanks.page.ts` — `mfe-header`, `mfe-footer` (from explore).

`mfe-mini-cart` and `mfe-add-to-cart` are exposed *for* other remotes
but load no foreign fragments themselves.

### Events it speaks

- **Listens to** `store:selected` from explore — pre-fills the order's
  store field when the user picks a store
  (`projects/checkout/src/features/checkout/checkout.page.ts`).
- **Emits** `nav:navigate` after a successful submission, with intent
  `'checkout.thanks'`, to ask the host to route to the confirmation
  page. This is the same channel that powers `[appNavigateTo]`; the
  page just uses it directly from TypeScript.
- **No bus for the cart.** `<mfe-add-to-cart>` (inside decide's
  product page) and `<mfe-mini-cart>` (inside explore's header) are
  both checkout elements, so they share checkout's single `CartStore`
  and always show the same count. A second tab is kept in sync by
  `CartStore` itself, which listens to the browser's `storage` events.

---

## Cross-remote integration map

A condensed view of who pulls what from whom:

| Consumer                          | Pulls                                              | From      |
| --------------------------------- | -------------------------------------------------- | --------- |
| explore (`mfe-header`)            | `mfe-mini-cart`                                    | checkout  |
| decide (`mfe-product`)            | `mfe-header`, `mfe-footer`, `mfe-recommendations`  | explore   |
| decide (`mfe-product`)            | `mfe-add-to-cart`                                  | checkout  |
| checkout (`mfe-cart`)             | `mfe-header`, `mfe-footer`, `mfe-recommendations`  | explore   |
| checkout (`mfe-checkout`)         | `mfe-store-picker`, `mfe-footer`                   | explore   |
| checkout (`mfe-thanks`)           | `mfe-header`, `mfe-footer`                         | explore   |

Two heuristics fall out of the table:

- **Explore is the chrome layer.** Every other remote's full-page
  views pull in `mfe-header` + `mfe-footer` from explore, so the
  chrome stays consistent without being duplicated three times.
- **Checkout exposes interaction primitives.** `mfe-mini-cart` and
  `mfe-add-to-cart` are not full pages — they are small interactive
  widgets that other teams drop into their own templates wherever the
  user might add or peek at the cart.

## Cross-remote events

Every channel that travels on `window.__NF_REGISTRY__`:

| Channel          | Defined in                                                       | Emitter                                | Subscriber                              |
| ---------------- | ---------------------------------------------------------------- | -------------------------------------- | --------------------------------------- |
| `nav:navigate`   | `libs/shared/src/bus/nav-channels.ts`                            | `[appNavigateTo]` + direct emitters    | host (`provideRemoteNavigation`)        |
| `nav:intents`    | `libs/shared/src/bus/nav-channels.ts`                            | host (publishes the intent map)        | `NavigateToDirective` in every remote   |
| `store:selected` | `libs/shared/src/bus/store-channels.ts`                          | explore (`mfe-store-picker`)           | checkout (`mfe-checkout`)               |

All three are declared in `@tractor-store/shared`'s bus helpers
(`defineChannel`, or `defineResource` for `nav:intents`), so the
emitter and subscriber import the same typed handle — one channel
name, one payload type, both ends in sync.

## Shared library

One TypeScript library lives under `libs/shared/src/`, imported as
`@tractor-store/shared`. Each folder has a single responsibility; none
contain business code.

| Folder        | What it provides                                                                                                                              |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `bus/`        | `defineChannel`, `defineResource`, `listenTo`, channel declarations (`navigateTo`, `navIntents`, `storeSelected`) and their payload types      |
| `nav/`        | `NavigateToDirective`, `NavContribution`/`NavIntent`/`NavTarget`/`IntentMap`/`IntentTarget` types, `resolveIntentUrl`, `toRoutePath`, `RouteParams` helpers (`param`, `requiredParam`, `paramList`, `sameRouteParams`), `NavPayload` type |
| `federation/` | `EnvironmentConfig`, `ENV`, `provideEnv`, `toCdnUrl`, `LoadRemote`/`LOAD_REMOTE`, `createRemoteLoader`, `defineRemoteApp`, `RemoteElementDirective`               |
| `ui/`         | Design-system primitives (`Button`, `Spinner`), `provideCdnImageLoader` for `NgOptimizedImage`                                               |
| `testing/`    | `createFakeRegistry`, `installFakeRegistry` (alias `@tractor-store/shared/testing`)                                                           |

`@tractor-store/shared` is the single entry in each app's
`sharedMappings`, so the host and remotes share a single instance —
same `NavigateToDirective`, same channel handles, same `instanceof`
identity.

## See also

- [Architecture](./architecture.md) — how custom elements, the event
  bus, and shared deps make this composition possible.
- [Navigation](./navigation.md) — how the intent system makes the
  cross-remote loads in this catalogue possible without coupling.
