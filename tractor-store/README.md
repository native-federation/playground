# The Tractor Store — Angular & Native Federation

A reference micro-frontend (MFE) implementation of [The Tractor Store][tractor-store],
built with Angular 21 (zoneless), [Native Federation v4][nf-v4], and Web
Components. It follows the [Tractor Store Blueprint][blueprint] so it can
be compared head-to-head with implementations in other frameworks.

**Live demo:** [native-federation.github.io/angular-examples](https://native-federation.github.io/angular-examples/)

[tractor-store]: https://micro-frontends.org/tractor-store/
[nf-v4]: https://www.npmjs.com/package/@angular-architects/native-federation-v4
[blueprint]: https://github.com/neuland/tractor-store-blueprint

## What this project demonstrates

Three teams ship three Angular applications into one page, deploy them
independently, and never import each other's code. Three ideas hold the
boundary in place:

- **Custom elements as the integration surface.** Every remote registers
  its UI as `<mfe-*>` web components. Other apps drop the tag into their
  HTML — no Angular type, RxJS Observable, or service crosses the line.
- **A central event bus on `window.__NF_REGISTRY__`.** Remotes publish
  and subscribe to small, stable, *typed* channels instead of calling
  each other directly. Navigation, store selection, and cart sync all
  ride on this bus, and every channel is defined the same way:
  `defineChannel<Payload>('channel:name')`.
- **Intent-based navigation.** A button in *decide* that should open the
  cart never types `'/checkout/cart'`. It emits the intent
  `'checkout.cart'` via the `[navigateTo]` directive; the host owns the
  URL.

Each idea is documented in detail under [`docs/`](./docs/) — start there
if you want the why and how.

## Documentation

| Document                                       | What's in it                                                                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [docs/README.md](./docs/README.md)             | Overview, mental model, and a "where does X live" index. **Start here.**                                           |
| [docs/architecture.md](./docs/architecture.md) | The host/remote contract and the three decoupling mechanisms (custom elements, the event bus, shared libraries).   |
| [docs/navigation.md](./docs/navigation.md)     | The intent-based navigation system — how `[navigateTo]` + a host-owned registry replace cross-MFE URL hard-coding. |
| [docs/features.md](./docs/features.md)         | Catalogue of what each team ships, the events they speak, and the cross-remote dependencies between them.          |

## Technologies at a glance

| Aspect                      | Solution                                                |
| --------------------------- | ------------------------------------------------------- |
| 🛠️ Frameworks, libraries    | [angular] (zoneless), [native-federation-v4][nf-v4]     |
| 📝 Rendering                | CSR (client-side rendering)                             |
| 🐚 Application shell        | Host app with route-based shell components              |
| 🧩 Client-side integration  | Custom elements ([@angular/elements]) loaded as remotes |
| 🧩 Server-side integration  | None (static hosting)                                   |
| 📣 Communication            | Typed event channels on `window.__NF_REGISTRY__`        |
| 🗺️ Navigation               | SPA inside host, intent IDs across remotes              |
| 🎨 Styling                  | Self-contained SCSS (one bundle per remote)             |
| 🍱 Design system            | Shared UI library (`@internal/ui`)                      |
| 🔮 Discovery                | Runtime manifest (`federation.manifest.json`)           |
| 🚚 Deployment               | Static (GitHub Pages, GitHub Actions)                   |
| 👩‍💻 Local development        | [angular-cli], [concurrently], [http-server]            |

[angular]: https://angular.dev/
[@angular/elements]: https://angular.dev/guide/elements
[angular-cli]: https://angular.dev/tools/cli
[concurrently]: https://github.com/open-cli-tools/concurrently
[http-server]: https://github.com/http-party/http-server

## Project structure

The workspace contains four Angular applications and four libraries:

```
tractor-store/
├── projects/
│   ├── host/         # Shell application — owns routing & remote loading
│   ├── explore/      # Catalog, recommendations, header/footer chrome
│   ├── decide/       # Product detail page
│   └── checkout/     # Cart, checkout flow, mini-cart, add-to-cart
├── libs/
│   ├── events/       # @internal/events     — event channels, NavigateToDirective, intent types, path/route helpers
│   ├── federation/   # @internal/federation — env config, CDN helper, slice loader factory
│   ├── logging/      # @internal/logging    — console logger service
│   └── ui/           # @internal/ui         — buttons, spinner
└── public/cdn/       # Static fonts and images (served at :3000 in dev)
```

Each remote exposes a handful of fragments (e.g. `mfe-cart`, `mfe-header`,
`mfe-mini-cart`) registered as custom elements via `@angular/elements`.
The host loads these on demand through Native Federation and renders them
inside route-based shell components.

## How to run locally

The workspace uses pnpm. Clone, install, and start everything:

```bash
git clone git@github.com:native-federation/angular-examples.git
cd angular-examples/tractor-store
pnpm install
pnpm start:all
```

`start:all` boots all four apps and the static CDN concurrently:

| Service         | Port |
| --------------- | ---- |
| host (shell)    | 4200 |
| explore         | 4201 |
| decide          | 4202 |
| checkout        | 4203 |
| cdn (fonts/img) | 3000 |

Open <http://localhost:4200> to see the integrated application. Each
remote can also be opened standalone on its own port — Native Federation
will load the sibling fragments it needs from the URLs declared in that
remote's `public/env.config.json`.

You can also serve a single app:

```bash
pnpm ng serve host       # or explore / decide / checkout
```

### Testing

Unit and component tests are written with [Vitest] using `jsdom`. Run the
full suite per project:

```bash
pnpm ng test host --watch=false
```

[Vitest]: https://vitest.dev/

## Deployment

The app is published to GitHub Pages by
[`.github/workflows/deploy-tractor-store.yml`](../.github/workflows/deploy-tractor-store.yml)
on every push to `main` that touches `tractor-store/**`. The workflow:

1. Builds the four apps with the appropriate `--base-href`.
2. Assembles a single `_site/` directory with `host` at the root and the
   remotes under `/explore`, `/decide`, `/checkout`.
3. Rewrites the `env.config.json` files so each app discovers its
   siblings via the deployed base path.
4. Pushes the result to the `gh-pages` branch.

Trigger a deploy manually from the **Actions** tab via _Run workflow_.

## Scope and limitations

This implementation focuses on the micro-frontend aspects. The backend is
mocked with in-memory fixtures, error boundaries are minimal, and
bundle-size or chunking optimisations are out of scope. In a real-world
project these aspects deserve more attention.

Open follow-ups:

- [ ] Web performance optimisations (preload critical remotes, deeper code splitting).
- [ ] Error boundaries / fallback UI when a remote fails to load.
- [ ] Wire a real backend instead of static fixtures.
- [ ] Revisit `[navigateTo]` accessibility — anchors currently rely on a click handler instead of a real `href`, so middle-click and copy-link do not yet work.

## About the authors

[The Native Federation team](https://native-federation.com/)
