# Tractor Store — Documentation

The Tractor Store is a four-app micro-frontend (MFE) system: a thin
**host** shell plus three independently-deployed **remotes**, each
owned by a separate team. The host owns the URL and the page chrome;
the remotes ship UI as web components and link to each other through
_intent IDs_ instead of hard-coded URLs. All composition happens at
runtime — there is no build-time wiring between apps.

The runtime is [Native Federation][nf]. It is built on ECMAScript
Modules and Import Maps, so what we ship is plain browser-native code
with a small orchestration layer on top.

[nf]: https://native-federation.com/

## New to micro-frontends?

A micro-frontend architecture splits a single web application into
smaller apps that can be built, tested, and deployed independently.
Each team owns its slice end-to-end and the browser composes them at
runtime.

This project follows the [Tractor Store Blueprint][blueprint] — a
reference scenario for comparing MFE techniques across frameworks.
The teams are named for what they do in the customer journey
(**Explore**, **Decide**, **Checkout**), not for technical layers.
That vertical split is the canonical micro-frontends decomposition
described on [micro-frontends.org][mfo].

Three ideas carry the weight in this repo:

1. **Custom elements** (web components). Every UI fragment a remote
   exposes is registered as a `<mfe-*>` HTML tag. The host (or any
   other remote) places that tag in the DOM and the browser does the
   rest. The contract is plain HTML — no Angular import crosses team
   boundaries.
2. **A central event bus** (`window.__NF_REGISTRY__`). Remotes
   publish and subscribe to small, _typed_ events instead of calling
   each other directly. Each event's payload type is listed once in
   the `Events` interface in `libs/contracts/index.ts`; emitter and
   listener then share the same compile-time contract. Navigation and
   store selection ride on this bus.
3. **Intent-based navigation.** A button in the _decide_ micro frontend that should
   open the cart never types `'/checkout/cart'`. It uses the
   `[navIntent]` directive with the intent `'checkout.cart'`,
   and the host translates that to a URL. A team can rename its
   routes without touching anyone else's code.

Together these three keep the apps decoupled. The apps share no
runtime code at all: each one writes out its own bootstrap, loader
and directives, so its flow can be read in its own folder. The rest
of this doc set explains how each piece is implemented.

[blueprint]: https://github.com/neuland/tractor-store-blueprint
[mfo]: https://micro-frontends.org/

## At a glance

```mermaid
flowchart LR
    subgraph Host["Host (4200) — shell"]
        H[App + Router]
        M[(federation.manifest.json)]
    end

    subgraph Explore["@tractor-store/explore (4201)"]
        E[mfe-home, mfe-category,<br/>mfe-header, mfe-footer, …]
    end

    subgraph Decide["@tractor-store/decide (4202)"]
        D[mfe-product]
    end

    subgraph Checkout["@tractor-store/checkout (4203)"]
        C[mfe-cart, mfe-checkout,<br/>mfe-mini-cart, mfe-add-to-cart, …]
    end

    H -- reads --> M
    M -- "remoteEntry.json URLs" --> Explore
    M -- "remoteEntry.json URLs" --> Decide
    M -- "remoteEntry.json URLs" --> Checkout

    Decide -. "loads mfe-header / mfe-footer" .-> Explore
    Decide -. "loads mfe-add-to-cart" .-> Checkout
    Explore -. "loads mfe-mini-cart" .-> Checkout
```

The manifest is the only static "wiring": every app fetches it at
startup and uses it to locate the others. The dotted lines are
_cross-remote fragment loads_ — a remote can mount another remote's
custom element inside its own page without going through the host.

## Read next

- **[Architecture](./architecture.md)** — what the host owns, what
  each remote owns, and the three decoupling mechanisms (custom
  elements, the event bus, intent-based navigation) plus why only
  types are shared.
- **[Navigation](./navigation.md)** — the intent-based navigation
  system and why it is the load-bearing piece of the host/remote
  decoupling.
- **[Features](./features.md)** — what each team ships, the
  fragments they expose, the events they emit, and the cross-remote
  dependencies between them.

## Where does X live?

| Concern                                      | File / module                                                                 |
| -------------------------------------------- | ----------------------------------------------------------------------------- |
| Bootstrap & federation init (every app)      | `projects/<app>/src/main.ts`                                                  |
| Host providers, CDN assets, Angular bootstrap | `projects/host/src/app/bootstrap.ts`                                         |
| Loading contributions, routes, resolver, `nav:navigate` | `projects/host/src/app/navigation.ts` (`provideNavigation`)        |
| Host route → element mount                   | `projects/host/src/app/remote-shell.component.ts`                             |
| Loading a remote's custom element            | `projects/host/src/app/load-remote.ts`, `projects/<remote>/src/shared/remote-element.ts` (`createRemoteLoader`) |
| Embedding a foreign `mfe-*` element          | `projects/<remote>/src/shared/remote-element.ts` (`[mfeRemote]`)              |
| Per-remote Angular application, CDN image loader | `projects/<remote>/src/app.config.ts` (`getAppInjector`, `cdnImageLoader`) |
| Remote bootstrap (custom element)            | `projects/<remote>/src/features/<feature>/bootstrap.ts`                       |
| Remote nav contribution                      | `projects/<remote>/src/nav-contribution.ts`                                   |
| Cross-MFE link directive (`[navIntent]`)     | `projects/<remote>/src/shared/nav-intent.directive.ts`                        |
| Shared types: env, contributions, params, `Events` | `libs/contracts/index.ts`                                               |
| Cart state & cross-tab sync                  | `projects/checkout/src/data/cart-store.ts`                                    |
| Mock backend data                            | `projects/<remote>/src/data/<entity>.data.ts`                                 |
| Event bus for tests (real registry)          | `projects/<app>/src/testing/setup.ts`                                         |
| Federation config (per app)                  | `projects/<app>/federation.config.mjs`                                        |
| Runtime remote discovery                     | `projects/<app>/public/federation.manifest.json`                              |
| Per-environment values                       | `projects/<app>/public/env.config.json`                                       |
| Team boundary visualisation overlay          | `public/cdn/js/helper.js`                                                     |
