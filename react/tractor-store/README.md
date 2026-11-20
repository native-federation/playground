# The Tractor Store — React & Native Federation

A reference micro-frontend (MFE) implementation of [The Tractor Store][tractor-store],
built with React 18, [Native Federation][nf], and Web Components. It
follows the [Tractor Store Blueprint][blueprint] so it can be compared
head-to-head with implementations in other frameworks — in particular
with the [Angular version](../../angular/tractor-store/), which has the
same architecture file for file.

[tractor-store]: https://micro-frontends.org/tractor-store/
[nf]: https://www.npmjs.com/package/@softarc/native-federation
[blueprint]: https://github.com/neuland/tractor-store-blueprint

## What this project demonstrates

Three teams ship three React applications into one page, deploy them
independently, and never import each other's code. Three ideas hold the
boundary in place:

- **Custom elements as the integration surface.** Every remote registers
  its UI as `<mfe-*>` web components. Other apps drop the tag into their
  JSX — no React component, hook, or context crosses the line.
- **A central event bus ([`@softarc/native-federation-communication`][nf-comm]).**
  Remotes publish and subscribe to small, stable, *typed* channels
  instead of calling each other directly. Navigation and store
  selection ride on this bus; every channel's value type is declared
  once, in the package's `Channels` interface, from `libs/contracts`.
- **Intent-based navigation.** A link in *decide* that should open the
  cart never types `'/checkout/cart'`. It renders
  `<NavLink intent="checkout.cart">`; the host owns the URL.

The apps share **no runtime code**: only a types-only contracts file.
Every app's bootstrap, remote loader and link component is written out
in that app, so you can follow the whole flow without leaving its
folder. The bus is a third-party package that every app bundles its
own copy of; the copies find one bus per page on
`globalThis.__NF_BUS__`.

Each idea is documented in detail under [`docs/`](./docs/) — start there
if you want the why and how.

## Documentation

| Document                                       | What's in it                                                                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [docs/README.md](./docs/README.md)             | Overview, mental model, and a "where does X live" index. **Start here.**                                           |
| [docs/architecture.md](./docs/architecture.md) | The host/remote contract, the three decoupling mechanisms (custom elements, event bus, intent navigation), and the contracts-only sharing policy. |
| [docs/navigation.md](./docs/navigation.md)     | The intent-based navigation system — how `<NavLink>` + a host-published intent table replace cross-MFE URL hard-coding.   |
| [docs/features.md](./docs/features.md)         | Catalogue of what each team ships, the channels they speak, and the cross-remote dependencies between them.          |
| [docs/hot-swap.md](./docs/hot-swap.md)         | Swapping a remote between the Angular and React stores at runtime — same remote names, contracts and `mfe-*` tags.  |

## Technologies at a glance

| Aspect                      | Solution                                                  |
| --------------------------- | --------------------------------------------------------- |
| 🛠️ Frameworks, libraries    | [React 18][react], [native-federation][nf] 4.10           |
| 📝 Rendering                | CSR (client-side rendering)                               |
| 🐚 Application shell        | Host app; every route mounts a remote shell (react-router) |
| 🧩 Client-side integration  | Custom elements wrapping React roots, loaded as remotes   |
| 🧩 Server-side integration  | None (static hosting)                                     |
| 📣 Communication            | Typed channels on one bus ([native-federation-communication][nf-comm]) |
| 🗺️ Navigation               | SPA inside host, intent IDs across remotes                |
| 🎨 Styling                  | CSS strings adopted into each element's shadow root       |
| 🍱 Design system            | None shared: each remote owns its components              |
| 🔮 Discovery                | Runtime manifest (`federation.manifest.json`)             |
| 👩‍💻 Local development        | [esbuild], [concurrently], [http-server]                  |

[react]: https://react.dev/
[esbuild]: https://esbuild.github.io/
[concurrently]: https://github.com/open-cli-tools/concurrently
[http-server]: https://github.com/http-party/http-server
[nf-comm]: https://github.com/native-federation/communication

## Project structure

The workspace contains four React applications and one types-only
contracts file:

```
tractor-store/
├── apps/
│   ├── host/         # Shell application — owns routing & remote loading
│   ├── explore/      # Catalog, recommendations, header/footer chrome
│   ├── decide/       # Product detail page
│   └── checkout/     # Cart, checkout flow, mini-cart, add-to-cart
├── libs/
│   └── contracts/    # @tractor-store/contracts — types the teams agree on
└── public/cdn/       # Static fonts and images (served at :3000 in dev)
```

The three remotes share one layout:

```
src/
├── main.tsx                   # standalone dev entry (installs the event bus after initFederation)
├── app.tsx                    # getApp(), createCustomElement(), useStyles(), useCdn()
├── nav-contribution.ts        # the routes/intents this remote offers the host
├── features/<name>/
│   ├── bootstrap.tsx          # defines the <mfe-name> custom element
│   └── <Name>.tsx             # the page or fragment component (+ its styles)
├── shared/                    # useRemoteElement, NavLink, navigateTo, useAsync, local components
├── testing/                   # setup.ts (real event bus per test)
└── data/                      # <entity>.ts, <entity>.data.ts
```

The host reads `main.tsx → app/bootstrap.tsx → app/navigation.tsx →
app/navigation-root.tsx → app/remote-shell.tsx`.

## How to run locally

The workspace uses pnpm. Clone, install, and start everything:

```bash
git clone git@github.com:native-federation/playground.git
cd playground/react/tractor-store
pnpm install
pnpm start:all
```

`start:all` boots all four apps and the static CDN concurrently:

| Service         | Port |
| --------------- | ---- |
| host (shell)    | 4300 |
| explore         | 4301 |
| decide          | 4302 |
| checkout        | 4303 |
| cdn (fonts/img) | 3000 |

Open <http://localhost:4300> to see the integrated application. Each
remote can also be opened standalone on its own port — Native Federation
will load the sibling fragments it needs from the URLs declared in that
remote's `public/federation.manifest.json`. Only the host loads the CDN's
global stylesheet and font, so a standalone remote looks plainer than the
integrated store.

The ports deliberately differ from the [Angular store](../../angular/tractor-store/)
(4200–4203), so both can run side by side. They share the same remote
names, contracts and `mfe-*` tags, so you can hot-swap a remote: point
`@tractor-store/explore` in one host's `public/federation.manifest.json`
at the other store's explore (`:4201` ↔ `:4301`). See
[docs/hot-swap.md](./docs/hot-swap.md).

You can also start a single app:

```bash
pnpm -F @tractor-store/host start          # or explore / decide / checkout
```

Each app is built by its own `build.mjs`: the Native Federation esbuild
builder emits the remote entry, shared packages and exposed modules, and
a second esbuild pass bundles `src/main.tsx` with every shared package
marked external.

### Testing

Unit and component tests are written with [Vitest]; component tests use
`jsdom`. Run every app's suite, or type-check:

```bash
pnpm test
pnpm typecheck
```

Every app's `src/testing/setup.ts` (wired up in its `vitest.config.mjs`)
puts a fresh, real event bus from `createBus()`
(`@softarc/native-federation-communication/setup`) on
`globalThis.__NF_BUS__` before each test, so no test sees another
test's retained values. It also rethrows errors from bus listeners, so a
failed `expect` inside a listener fails the test.

[Vitest]: https://vitest.dev/

## Scope and limitations

This implementation focuses on the micro-frontend aspects. The backend is
mocked with in-memory fixtures, error boundaries are minimal, and
bundle-size or chunking optimisations are out of scope. In a real-world
project these aspects deserve more attention.

## About the authors

[The Native Federation team](https://native-federation.com/)
