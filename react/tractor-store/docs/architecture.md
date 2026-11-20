# Architecture

This document explains the contract between the host and the remotes —
what each side owns, where the boundary sits, and how the three
decoupling mechanisms (custom elements, the event bus, intent-based
navigation) make runtime composition possible without coupling the apps
together. A short note on the contracts library closes it out.

## Why decoupling matters

Three teams ship three React applications into one page. The
architecture has one job: keep those teams independent. _Independent_
means a team can rename a route, swap an internal component, or roll a
backend change forward without coordinating with the other teams.

Whenever two MFEs talk to each other directly — by importing
components, sharing a router, or sharing a React context — they pick up
a hidden dependency that turns "deploy whenever you want" into "deploy
whenever the other team is ready". The architecture below avoids that
by inserting an explicit, stable contract at every place where the apps
meet.

> Michael Geers, _micro-frontends.org_: "_Isolate Team Code — Don't
> share a runtime, even if all teams use the same framework. Build
> independent apps that are self-contained._"

## The two-layer model

Two layers, with a small, explicit contract between them.

```mermaid
flowchart TD
    subgraph HostSide["HOST"]
        direction TB
        HA["Owns the URL<br/>(react-router)"]
        HB["Owns page chrome<br/>(layout, error UI)"]
        HC["Loads remotes via<br/>Native Federation"]
        HD["Publishes the<br/>intent table"]
    end

    subgraph RemoteSide["REMOTE (×3)"]
        direction TB
        RA["Self-contained<br/>React slice"]
        RB["Ships fragments as<br/>mfe-* custom elements"]
        RC["Declares routes via<br/>nav-contribution"]
        RD["Reads route data via<br/>routeParams prop"]
    end

    HostSide e1@==>|"federation.manifest.json"| RemoteSide
    HostSide e2@==>|"loads nav-contribution<br/>+ mfe-* elements"| RemoteSide
    RemoteSide e3@-->|"emits nav:navigate<br/>on the event bus"| HostSide

    e1@{animate: true}
    e2@{animate: true}
    e3@{animate: true}
```

The contract has exactly four touchpoints:

1. **`federation.manifest.json`** — the host's list of remote names →
   entry URLs, fetched at startup.
2. **`nav-contribution`** — a module each remote _exposes_ that
   declares its base path and the intents (routable destinations) it
   owns.
3. **`mfe-*` custom elements** — the actual UI fragments, also exposed
   via federation. The host instantiates them with
   `document.createElement`.
4. **`routeParams`** — a single property the host writes onto a
   mounted custom element, carrying parsed path and query parameters.

Nothing else is shared at the boundary. There is no `import` from a
remote in host code, no React context crossing the line, no shared
router state.

## The three decoupling mechanisms

### 1. Custom elements as the integration surface

A remote does not ship React components for the host to import. It
ships **custom elements** registered under stable `mfe-*` tags. Each
element owns a shadow root with its own React root inside.

Each remote creates its app in `app.tsx`, and every exposed element has
a `bootstrap.tsx` that defines its tag on top of that app:

```tsx
// apps/explore/src/app.tsx
let app: App | undefined;

export const getApp = (env: EnvironmentConfig, nf: NativeFederationResult): App =>
  (app ??= { env, loadRemote: createRemoteLoader(env, nf) });

// apps/explore/src/features/header/bootstrap.tsx
export const bootstrap = async (env: EnvironmentConfig, nf: NativeFederationResult): Promise<void> => {
  if (customElements.get('mfe-header')) return;
  customElements.define('mfe-header', createCustomElement(Header, getApp(env, nf)));
};
```

`createCustomElement` (also in `app.tsx`) is the React counterpart of
Angular's `createCustomElement` from `@angular/elements`: it returns an
`HTMLElement` subclass that attaches a shadow root on connect, renders
the component into it with `createRoot`, and re-renders when the host
writes `routeParams` or an observed attribute changes. The component
receives those as props; the `App` (env and remote loader) reaches it
through a React context.

This code is deliberately repeated in every remote rather than hidden
behind a shared helper. Open any `bootstrap.tsx` and the whole path from
"the host asked for `mfe-header`" to "the tag is defined" is on screen.

The browser's standard custom-element machinery does the integration.
Four consequences worth calling out:

- **Plain HTML is the contract.** A consumer drops `<mfe-cart>` in its
  JSX; nothing else is required. No component, hook or context crosses
  the boundary. The tags other teams may embed, and the attributes they
  read, are declared for JSX in `libs/contracts/index.ts`.
- **One app per remote.** `getApp` creates the remote's `App` on the
  first bootstrap and caches it in a module-level `let`. Every element of
  that remote shares it, and module state too: when explore's header
  shows `<mfe-mini-cart>` and decide's product page shows
  `<mfe-add-to-cart>`, both elements come from checkout's bundle and
  share one cart store.
- **Bootstrap is idempotent.** Each `bootstrap.tsx` checks
  `customElements.get(tag)`, and so does the remote loader. It is safe
  to request the same fragment from many places at once: only the first
  call defines the element.
- **Shadow DOM per element.** Every `mfe-*` element renders in its own
  shadow root. Components add their CSS with `useStyles(css)`, which
  adopts one shared `CSSStyleSheet` per stylesheet into that root.
  Global values such as `--outer-space` and the font come from the
  host's `global.css` and inherit into the shadow roots.

> Cam Jackson, _martinfowler.com_: "_Each micro frontend is to define
> an HTML custom element for the container to instantiate, instead of
> defining a global function for the container to call._"

#### Loading a fragment: `createRemoteLoader`

Every app that embeds another team's element has the same small loader:
`apps/host/src/app/load-remote.ts` in the host, and
`src/shared/remote-element.ts` in each remote.

```ts
export const createRemoteLoader =
  (env: EnvironmentConfig, nf: NativeFederationResult): LoadRemote =>
  async (remoteName, element) => {
    if (customElements.get(element)) return;
    const mod = await nf.loadRemoteModule<RemoteElementModule>(remoteName, element);
    await mod.bootstrap(env, nf);
  };
```

The host provides it through `LoadRemoteContext` in `app/bootstrap.tsx`;
each remote keeps it on its `App`. Components never call it by hand. In
the remotes they call `useRemoteElement` (also in
`shared/remote-element.ts`) with the remote and the tag they render:

```tsx
useRemoteElement('@tractor-store/explore', 'mfe-header');
// …
return <mfe-header></mfe-header>;
```

The loader hands `nf` (the federation runtime) to the remote's
bootstrap, and that remote builds its own loader from it. That is how
cross-remote loads work even when the host is not in the picture:
explore's header calls `useRemoteElement('@tractor-store/checkout',
'mfe-mini-cart')` and it just works.

#### Why a single `routeParams` property and not attributes

`HTMLElement` reserves a long list of property names (`id`, `slot`,
`title`, `hidden`, `style`, …). If the host wrote each route param as
its own attribute or property it would silently collide with
intrinsics. Instead, all params land under one well-known property
(`routeParams`, typed as `RouteParams` in `libs/contracts/index.ts`). A
routed page receives it as a prop,
`function Product({ routeParams = {} }: { routeParams?: RouteParams })`,
and reads the keys it needs. Clean separation, zero collisions.

#### How a route activation lands a custom element on the page

```mermaid
sequenceDiagram
    participant User
    participant Router as Host router
    participant Shell as Remote shell
    participant Explore as explore
    participant Element as mfe-category
    User->>Router: Open /explore/products/tractors
    Router->>Shell: Show mfe-category from explore
    Shell->>Explore: First visit only: load the code, start explore's app, register the tag
    Shell->>Element: Create the element
    Shell->>Element: Pass routeParams { category: tractors }
    Note over Shell,Element: routeParams stays in step with the URL
```

`RemoteShell` (`apps/host/src/app/remote-shell.tsx`) follows exactly
this script. `remoteName` and `element` come from the route that
`navigation.tsx` built. An effect calls the loader and appends the
element; while it is loading the shell shows a spinner, and if the load
fails it shows an error message. `useParams` + `useSearchParams` are
merged into one `routeParams` object, memoised on its JSON so the element
only sees a new object when a value actually changed.

### 2. The event bus (`@softarc/native-federation-communication`)

Custom elements solve composition: a remote can mount another remote's
UI. But the remotes also need to _talk_ to each other. They do that
through a small event bus, the
[`@softarc/native-federation-communication`][nf-comm] package. In
these docs it is always called _the event bus_.

The host installs it: the first import of
`apps/host/src/app/bootstrap.tsx` is
`import '@softarc/native-federation-communication/install'`, which puts
one bus on `globalThis.__NF_BUS__` before any remote loads. Every `bus`
call, from any app, uses that one; without an installed bus every call
is dropped, and the first one warns (once per copy). A remote's exposed modules never install. A
remote served standalone is its own host, so its `main.tsx` runs
`await import('@softarc/native-federation-communication/install')`
after `initFederation`, before it loads its first `bootstrap.tsx`.
Every app bundles its own copy of the package (it is listed in `skip`
in each `federation.config.mjs`, so Native Federation does not share
it, see [Contracts](#contracts-not-a-shared-library)); the copies
still find the one bus on the global (see
[Multiple copies][nf-comm-copies]).

A _channel_ is a string name. `bus.emit(channel, value)` delivers the
value to the channel's listeners and _retains_ it as the channel's
current state; `bus.on(channel, listener)` subscribes and returns
`off`; `bus.peek(channel)` reads the retained value (see the
[API][nf-comm-api]). The apps call `bus` directly; there is no wrapper
around it. What the teams agree on is the package's `Channels`
interface, which `libs/contracts/index.ts` augments with every channel
name and its value type:

```ts
// libs/contracts/index.ts
declare module '@softarc/native-federation-communication' {
  interface Channels {
    // Command (emit with { retain: false }): ask the host to navigate to an intent.
    'nav:navigate': NavigatePayload;
    // State: the host's NavIntents, retained for links that render later.
    'nav:intents': NavIntents;
    'store:selected': StoreSelectedPayload;
  }
}
```

Emitting and listening look the same in every app:

```tsx
// apps/explore/src/features/store-picker/StorePicker.tsx
bus.emit('store:selected', { id: store.id });

// apps/checkout/src/features/checkout/Checkout.tsx
useEffect(() => bus.on('store:selected', ({ id }) => setStoreId(id)), []);
```

`on` returns its unsubscribe function, which doubles as the effect's
cleanup. The listener gets the value itself. If the channel holds a
retained value, `on` delivers it synchronously, before it returns, then
every later emit. That suits state: `store:selected` and `nav:intents`
reach an element that renders after they were emitted. A navigation
request is a _command_ instead, which must never be replayed: every
remote emits `nav:navigate` with `{ retain: false }` (through its one
`navigateTo` helper in `shared/navigate.ts`), so it reaches only the
listeners subscribed at that moment, and the host also subscribes with
`{ replay: false }`.

[nf-comm]: https://github.com/native-federation/communication
[nf-comm-api]: https://github.com/native-federation/communication/blob/main/docs/api.md
[nf-comm-copies]: https://github.com/native-federation/communication/blob/main/docs/multiple-copies.md
[nf-comm-typing]: https://github.com/native-federation/communication/blob/main/docs/typing.md

With the augmentation, `bus.emit` and `bus.on` are typed without type
arguments: a value that doesn't match the contract is a compile-time
error, and a listener's parameter has the channel's type. In other
code, `ChannelValue<'store:selected'>` names that type. The channel
name itself is still a string; a misspelt one compiles as another,
untyped channel (see [what the types don't catch][nf-comm-typing]), so
keep names in `Channels` and search for them when you rename one.

> Cam Jackson, _martinfowler.com_: "_Custom events allow micro
> frontends to communicate indirectly, which is a good way to minimise
> direct coupling, though it does make it harder to determine and
> enforce the contract that exists between micro frontends._"

The `Channels` augmentation is the answer to Jackson's caveat: every
channel's contract is in one file that both ends import as a type.

#### The channels in use today

```mermaid
flowchart LR
    subgraph Host["host"]
        SN[Host navigation]
        NR[(intent table)]
    end
    subgraph Explore["explore"]
        SP[mfe-store-picker]
    end
    subgraph Decide["decide"]
        PD[mfe-product]
    end
    subgraph Checkout["checkout"]
        CO[mfe-checkout]
    end

    PD -- "nav:navigate" --> SN
    CO -- "nav:navigate" --> SN
    NR -- "nav:intents (state)" --> Explore
    NR -- "nav:intents (state)" --> Decide
    NR -- "nav:intents (state)" --> Checkout
    SP -- "store:selected" --> CO
```

| Channel          | Direction              | Purpose                                                                         |
| ---------------- | ---------------------- | ------------------------------------------------------------------------------- |
| `nav:navigate`   | remote → host (command) | Intent-based navigation requests (from `<NavLink>` or `navigateTo`)            |
| `nav:intents`    | host → remotes (state) | The `NavIntents` table (intent id → path template) so links render real `href`s |
| `store:selected` | explore → checkout (state) | Notify checkout when the user picks a pickup store                          |

State that stays inside one remote does not need the bus. All of
checkout's elements (`<mfe-cart>`, `<mfe-mini-cart>`,
`<mfe-add-to-cart>`, …) run from the same checkout bundle, so they share
one module-level cart store (`apps/checkout/src/data/cart-store.ts`)
and `useSyncExternalStore` keeps them in step. A second browser tab is
kept in sync by the store listening to the window's `storage` events.

### 3. Intent-based navigation

Custom elements compose UI. The event bus carries state. The
_navigation_ problem is bigger than either: every team wants to link
to pages owned by other teams, without hard-coding URLs that those
other teams may rename.

Each remote declares a `nav-contribution`
(`apps/<remote>/src/nav-contribution.ts`) listing its routable intents:

```ts
// apps/checkout/src/nav-contribution.ts
export const navContribution: NavContribution = {
  basePath: 'checkout',
  intents: [
    { id: 'cart', path: '/cart', element: 'mfe-cart' },
    { id: 'checkout', path: '/checkout', element: 'mfe-checkout' },
    { id: 'thanks', path: '/thanks', element: 'mfe-thanks' },
  ],
};
```

The remote owns relative intent IDs (`cart`, `checkout`, `thanks`).
The host prepends each contribution's `basePath` when it registers
them, producing the public IDs other teams link to (`checkout.cart`,
etc.). Remotes link by intent, never by URL, and each remote's
`<NavLink>` component makes that ergonomic in JSX. Full walkthrough in
[navigation.md](./navigation.md).

> Cam Jackson, _martinfowler.com_: "_Using the page URL for this
> purpose ticks many boxes … It's declarative, not imperative.
> I.e. 'this is where we are', rather than 'please do this thing'._"

The intent layer is what makes that declarative-URL model work
_without_ every team having to know every other team's URL scheme.

## The bootstrap chain

How a host page comes alive, end to end. First the host starts:

```mermaid
sequenceDiagram
    participant Browser
    participant Main as Host main
    participant Boot as Host bootstrap
    participant Bus
    participant Nav as Host navigation
    Browser->>Main: Load the page
    Main->>Main: Fetch env.config.json and federation.manifest.json
    Main->>Main: Start Native Federation (initFederation)
    Main->>Boot: Start the host
    Boot->>Bus: Install the bus (/install)
    Boot->>Boot: Load global.css, the font and helper.js
    Boot->>Nav: Start Host navigation
```

Then Host navigation builds the routes and the intent table, the same
startup step as in [navigation.md](./navigation.md#at-startup-each-team-declares-its-pages):

```mermaid
sequenceDiagram
    participant Nav as Host navigation
    participant Remotes as explore · decide · checkout
    participant Router as Host router
    participant Bus
    Nav->>Remotes: Which pages do you have?
    Remotes-->>Nav: nav-contribution, e.g. decide: product → /product/{id}
    Nav->>Router: One route per page, plus a fallback for unknown URLs
    Nav->>Bus: Share the intent table (nav:intents)
    Router->>Router: Show the first page
```

`bootstrap.tsx` awaits `createNavigation` before it renders. The
`nav:navigate` listener (`handleNavigateCommands`) is an effect of the
root `NavigationRoot` component, so it subscribes just after the first
render.

Every app's `main.tsx` does the same three steps; only the last line
differs. The host bootstraps its React app, a standalone remote
defines its default page with `bootstrap(env, nf)` (the tag is already
in its `index.html`). `main.tsx` statically imports only the
orchestrator: it runs before the import map exists, so React is only
reached through the dynamically imported bootstrap. That is also why
`build.mjs` bundles `main.tsx` with `splitting: true` and every shared
package external. Two artefacts drive everything, both fetched with
`cache: 'no-cache'`:

- **`env.config.json`** — per-environment values: `cdnUrl` and
  `production` (`EnvironmentConfig` in `libs/contracts/index.ts`).
  Same shape across all four apps.
- **`federation.manifest.json`** — the discovery file:

  ```json
  {
    "@tractor-store/explore": "http://localhost:4301/remoteEntry.json",
    "@tractor-store/decide": "http://localhost:4302/remoteEntry.json",
    "@tractor-store/checkout": "http://localhost:4303/remoteEntry.json"
  }
  ```

  `initFederation` merges every remote's `remoteEntry.json` into the
  page's import map so any subsequent
  `nf.loadRemoteModule(remoteName, exposedModule)` resolves to the
  right bundle.

The event bus is installed once `initFederation` has resolved: the
host's `bootstrap.tsx` imports `/install` first, and a standalone
remote's `main.tsx` imports it before its first `bootstrap.tsx`. So
`globalThis.__NF_BUS__` holds the bus before any remote code runs (see
[The event bus](#2-the-event-bus-softarcnative-federation-communication)).

## Native Federation vs. Module Federation

Native Federation is the standards-based alternative to webpack's
Module Federation. It implements the same mental model — remotes
publish a `remoteEntry`, the host imports modules from named remotes
at runtime — on top of ECMAScript Modules and Import Maps instead
of webpack runtime, so it works with esbuild, Vite or Rspack and needs
no framework-specific builder.

> Manfred Steyer, _Announcing Native Federation 1.0_: "_Native
> Federation brings the proven mental model of webpack Module
> Federation to the browser — built on ESM and Import Maps,
> independent of any specific build tool._"

This workspace uses
[`@softarc/native-federation-esbuild`](https://www.npmjs.com/package/@softarc/native-federation-esbuild)
(called from each app's `build.mjs`) plus
`@softarc/native-federation-orchestrator` (the runtime behind
`initFederation` and `loadRemoteModule`). The event bus is a separate
package, [`@softarc/native-federation-communication`][nf-comm].

## Contracts, not a shared library

The apps share **no runtime code**. Every piece of wiring (the
bootstrap, the custom-element wrapper, the remote loader, the link
component, the button) lives in the app that uses it, even when that
means three copies. That keeps each app readable on its own and lets
each team change its copy without coordinating a release with the
others. Third-party packages are dependencies, not team code: React is
shared through federation, and the event bus package is bundled into
each app.

What the teams _do_ agree on lives in one types-only file,
`libs/contracts/index.ts`, imported as `@tractor-store/contracts`
(a path alias in `tsconfig.base.json`):

| Type                                                | Agreed between                                     |
| --------------------------------------------------- | -------------------------------------------------- |
| `EnvironmentConfig`                                 | every app's `env.config.json`                      |
| `RemoteElementModule`                               | the loaders and every exposed `bootstrap.tsx`      |
| `NavContribution`, `NavIntent`                      | each remote's `nav-contribution.ts` and the host   |
| `NavPayload`, `NavIntents`, `RouteParams`           | the host's navigation and the remotes' pages/links |
| `Channels` augmentation (+ payload types)           | everyone on the event bus                          |
| `JSX.IntrinsicElements` for embeddable `mfe-*` tags | the owning team and every team embedding the tag   |

Because it is imported with `import type` only, it compiles away:
nothing from it exists at runtime and nothing needs to be shared
through federation. Each app's `federation.config.mjs` therefore has an
empty `sharedMappings` (`apps/host/federation.config.mjs`):

```js
shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })
  .patch(['react', 'react-dom'], { includeSecondaries: { keepAll: true } })
  .get(),
sharedMappings: [],
skip: [
  'react-dom/server',
  'react-dom/server.node',
  'react-dom/server.browser',
  'react-dom/test-utils',
  // Bundled into every app instead of shared: each copy finds the page's one bus on globalThis.__NF_BUS__.
  // A regex, because a string skips only the root entry and would leave /install shared.
  /^@softarc\/native-federation-communication(\/|$)/,
],
features: {
  denseChunking: true,
  denseExternals: true,
  integrityHashes: true,
},
```

What the flags mean:

- **`singleton: true` on every package dependency, React included.**
  Exactly one React on the page. Two copies would each have their own
  hooks dispatcher, and a component rendered by the wrong one throws
  "Invalid hook call". `strictVersion: true` makes a version mismatch
  fail loudly at load time.
- **`includeSecondaries: { keepAll: true }` on `react` and
  `react-dom`.** Publishes `react/jsx-runtime`, `react-dom/client`, … as
  shared too, so every remote gets the shared copy.
- **`sharedMappings: []`.** Left out, Native Federation would share
  every TypeScript path alias. There is nothing to share, so it is
  turned off explicitly.
- **`skip`** drops the server-only `react-dom` entry points. It also
  keeps the event bus package and its subpaths (`/install`) out of
  `shared`: every app bundles its own copy, so no app depends on
  another one's version of it, and all copies use the one bus on
  `globalThis.__NF_BUS__`.
- **`features`** are the same three as in the Angular store, so both
  stores' `remoteEntry.json` files have the same format and a remote
  can be swapped between them (see [Hot swap](./hot-swap.md)).
  `denseChunking` writes the shared chunks compactly, `denseExternals`
  groups every entry point of a shared package under one record, and
  `integrityHashes` adds a hash for every file. Since Native
  Federation 4.10, each exposed module also lists the chunks it reaches
  (`exposes[].chunks`), so a runtime can preload them.

> Cam Jackson, _martinfowler.com_: "_Be careful to ensure that your
> shared components contain only UI logic, and no business or domain
> logic._"

This demo goes one step further and doesn't even share the dumb
primitives: explore and checkout each have their own button. For a
demo, seeing every app's flow in one place is worth more than the saved
lines. A real product with a design system would publish it as a
versioned npm package and share it through `shared`, not through a path
alias.

## Team boundary visualisation

Each team has a colour:

| Team     | Hex       | Owns                      |
| -------- | --------- | ------------------------- |
| Explore  | `#FF5A54` | Catalog, header, footer   |
| Decide   | `#53FF90` | Product detail            |
| Checkout | `#FFDE54` | Cart, checkout, mini-cart |

The CDN ships a small overlay script (`public/cdn/js/helper.js`,
loaded by the host at bootstrap). It looks for `data-boundary` and
`data-boundary-page` attributes on rendered DOM and, when
`html.showBoundaries` is set, draws coloured boxes around each team's
contribution. The only _enforcement_ of team boundaries is the build:
each app compiles on its own, so a remote cannot import code from
another remote, only the types in `@tractor-store/contracts`.

## See also

- [Navigation](./navigation.md) — how the intent system makes the
  boundary navigable without coupling.
- [Features](./features.md) — concrete catalogue of what each remote
  ships and which channels it speaks.
- [Hot swap](./hot-swap.md) — swapping a remote between the Angular
  and React stores at runtime.
