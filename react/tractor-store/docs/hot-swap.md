# Hot-swapping remotes

This store and the [Angular store](../../../angular/tractor-store/docs/hot-swap.md) are the same design built
twice. They share remote names, `mfe-*` tags, contracts and event bus
channels, so **any remote from either store runs under either host**.
The mix is free: Angular explore, React decide and Angular checkout under
the React host works the same as one store on its own.

This was verified from both stores' code and their build output (every
remote's `remoteEntry.json`). The [smoke-test matrix](#checking-a-mix)
below confirms it in your setup.

Paths and commands on this page start at the repository root, which
holds both stores: `angular/tractor-store` and `react/tractor-store`.

## Ports

| App      | Angular store | React store |
| -------- | ------------- | ----------- |
| host     | 4200          | 4300        |
| explore  | 4201          | 4301        |
| decide   | 4202          | 4302        |
| checkout | 4203          | 4303        |
| cdn      | 3000          | 3000        |

The ports don't overlap, so both stores can run at once. The CDN is the
exception: both serve the same files on `:3000`, so run only one.

## Swapping a remote

The host decides which remote serves a name, through its
`federation.manifest.json`:

| Host    | Manifest                                                   |
| ------- | ---------------------------------------------------------- |
| Angular | `angular/tractor-store/projects/host/public/federation.manifest.json` |
| React   | `react/tractor-store/apps/host/public/federation.manifest.json`       |

A remote's own manifest is only used when it runs standalone. Under a
host, remotes load the elements they embed through the host's `nf`, so
the host's manifest decides for nested elements too.

Both stores need their dependencies installed once:

```bash
cd angular/tractor-store && pnpm install && cd -
cd react/tractor-store && pnpm install && cd -
```

### React remote under the Angular host

In the Angular host's manifest, point decide at the React store:

```json
{
  "@tractor-store/explore": "http://localhost:4201/remoteEntry.json",
  "@tractor-store/decide": "http://localhost:4302/remoteEntry.json",
  "@tractor-store/checkout": "http://localhost:4203/remoteEntry.json"
}
```

Start the Angular store (with the CDN), and only the React remote:

```bash
cd angular/tractor-store
pnpm start:all

# second terminal: the remote only, not start:all (it starts a second CDN on :3000)
cd react/tractor-store
pnpm -F @tractor-store/decide start   # or explore / checkout
```

Open <http://localhost:4200>.

### Angular remote under the React host

In the React host's manifest, point decide at the Angular store:

```json
{
  "@tractor-store/explore": "http://localhost:4301/remoteEntry.json",
  "@tractor-store/decide": "http://localhost:4202/remoteEntry.json",
  "@tractor-store/checkout": "http://localhost:4303/remoteEntry.json"
}
```

Start the React store (with the CDN), and only the Angular remote:

```bash
cd react/tractor-store
pnpm start:all

# second terminal: the remote only, not start:all (it starts a second CDN on :3000)
cd angular/tractor-store
pnpm ng serve decide   # or explore / checkout
```

Open <http://localhost:4300>.

The manifest is fetched with `cache: 'no-cache'`, so after editing it a
reload picks up the change.

## The contract that makes it work

Every item below is the same in both stores. Each one is documented
where it lives; this list only says what must match.

- **Remote names and exposed keys.** `@tractor-store/explore`,
  `/decide` and `/checkout`, each exposing its `mfe-*` tags (the
  exposed key is the tag name) and `nav-contribution`. See
  [Features](./features.md).
- **The element module.** Every exposed `mfe-*` module exports
  `bootstrap(env, nf)` (`RemoteElementModule` in
  `libs/contracts/index.ts`), which defines the tag once and returns
  if it is already defined.
- **`nav-contribution`.** Each remote declares its intents: the same
  `basePath`, intent ids and paths in both stores. See
  [the contract](./navigation.md#the-contract-nav-contribution).
- **`nav:intents`.** The host's intent table: every intent's absolute
  path by full id, e.g. `'decide.product'` → `'/decide/product/{id}'`.
  Params are `{name}` placeholders. Keep each one a whole path segment:
  the host turns it into a `:name` route param, and neither router
  supports a param inside a segment. The host builds it from the
  contributions, freezes it and publishes it once. Every app, host
  included, fills in hrefs and URLs with the same `urlFor`, which
  looks ids up with `Object.hasOwn` and returns `null` for an unknown
  intent or a missing param.
- **`routeParams`.** The host sets one `routeParams` property on a
  routed element, before it connects and again on every change. Path
  params and query params are merged into it, path params winning; a
  repeated query key becomes an array. See
  [Why a single `routeParams` property](./architecture.md#why-a-single-routeparams-property-and-not-attributes).
- **Attributes.** `<mfe-add-to-cart sku>` and
  `<mfe-recommendations skus>` (comma-separated). Both treat an empty
  or missing `sku` as "nothing selected yet".
- **Event bus channels.** `nav:navigate` is a command: sent with
  `{ retain: false }`, and the host listens with `{ replay: false }`.
  `nav:intents` and `store:selected` are state: retained, so an
  element that renders later still gets them. See
  [The channels in use today](./architecture.md#the-channels-in-use-today).
- **The event bus package.** Version `4.0.0-next.2` in every app. Each
  app bundles its own copy (`skip` in `federation.config.mjs`), the
  host installs the one bus on `globalThis.__NF_BUS__`, and every copy
  uses it. See [The event bus](./architecture.md#2-the-event-bus-softarcnative-federation-communication).
- **The cart.** localStorage key `c_cart`, value `sku_qty|sku_qty`
  (`src/data/cart-storage.ts` in each store's checkout). Every cart
  element, the mini-cart included, comes from checkout, so the cart is
  never split between frameworks.
- **Environment and CDN.** The same `env.config.json` shape
  (`production`, `cdnUrl`) and the same files under `public/cdn`. Both
  hosts load `global.css`, the Raleway font and `helper.js` from it.

## Rules that keep it working

- **Nested elements keep their own shadow DOM.** An element that is
  embedded in another remote (`mfe-header`, `mfe-footer`,
  `mfe-recommendations`, `mfe-store-picker`, `mfe-mini-cart`,
  `mfe-add-to-cart`) can end up inside a React element's shadow root.
  Angular's emulated styles go to `document.head` and never reach
  inside it, so these Angular components use
  `ViewEncapsulation.ShadowDom`. Routed pages are mounted in the
  host's light DOM, so they don't need it.
- **One Native Federation version.** Both stores use Native Federation
  4.10.x (today both resolve `@softarc/native-federation` 4.10.1 and
  its orchestrator 4.10.2), which write and read the same
  `remoteEntry.json` format, so either host's orchestrator loads either
  store's remotes. Upgrade both stores together.
- **One event bus version.** Upgrade it in both stores together, host
  first (see [Multiple copies][nf-comm-copies]).
- **No shared singleton in common.** Angular remotes share `@angular/*`,
  `rxjs` and `tslib`; React remotes share `react` and `react-dom`.
  Because no package is shared by both, their `strictVersion` singletons
  never conflict. Adding a package to both sides' `shared` (instead of
  bundling it) brings that check back.
- **Contracts change together.** A new channel, intent, attribute or
  cart format goes into both stores' `libs/contracts/index.ts` and
  code in the same change. The same goes for `urlFor`: all copies stay
  identical.

## Known caveats

- **The cart is per origin.** localStorage belongs to the host's
  origin, so the cart under `:4200` is not the cart under `:4300`.
  Within one page, any mix shares it.
- **The React host listens for `nav:navigate` after its first render.**
  Its listener is a `useEffect` in `NavigationRoot`
  (`react/tractor-store/apps/host/src/app/navigation-root.tsx`), so a
  command sent while the first render is still committing would be
  lost (commands are not retained). Commands only come from clicks, so
  this doesn't happen today. The Angular host subscribes in
  `provideAppInitializer`, before the first route.

## Checking a mix

Run each row and check the list below it.

| Host    | explore | decide  | checkout |
| ------- | ------- | ------- | -------- |
| Angular | React   | React   | React    |
| React   | Angular | Angular | Angular  |
| Angular | React   | Angular | React    |
| React   | Angular | React   | Angular  |

- Every page renders with its styles, including the nested header,
  footer, recommendations, store picker, mini-cart and add-to-cart.
- Links show real `href`s, and a left click navigates without a full
  page reload.
- Add to cart updates the mini-cart; the cart page lists the item; a
  reload keeps it.
- Picking a store in the checkout's store picker fills the checkout
  form.
- The console shows no event bus warning about dropped calls, and no
  Native Federation version or singleton warnings.

[nf-comm-copies]: https://github.com/native-federation/communication/blob/main/docs/multiple-copies.md
