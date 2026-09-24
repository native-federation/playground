# TestSsr

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.1.

## Development server

To run the **full federated stack** under `ng serve` (host + both remotes), use:

```bash
npm run start:dev
```

This launches all three dev servers and exits them together on `Ctrl+C`. Like
`start:ssr`, it enforces boot order — see [`scripts/start-dev.mjs`](./scripts/start-dev.mjs).

> **Boot order matters in dev too.** Under `ng serve` the host initialises
> federation **lazily on the first remote load** (the first SSR render of a
> federated route), once, and memoises the result. If that first render happens
> before the remotes are serving their `remoteEntry.json`, init fails, every
> federated region renders the `RemoteUnavailable` placeholder, and it stays that
> way until the dev server is **restarted** (the failure is memoised; a file save
> won't re-init). `start:dev` removes that footgun by waiting for each remote's
> `remoteEntry.json` before starting the host. (The previous `concurrently`-based
> `start:dev` started all three at once and couldn't gate on readiness, so an
> early hit on the host exposed the race.)
>
> **`/healthz` is prod-only.** It reports `__NF_FEDERATION_STATUS__`, which only
> the prod `--import` preload publishes; under `ng serve` there is no eager
> federation status (init is lazy), so `/healthz` returns **503** in dev on every
> app. Use it as a production readiness probe; gate dev startup on the remotes'
> `remoteEntry.json` instead (which is what `start:dev` does).

> **Requires the dev-SSR fix in `@angular-architects/native-federation`.** A
> version that injects the dev host-instance bridge into a *remote* without the
> lazy/bounded init deadlocks the remote's SSR dev server (every request hangs).
> This example assumes a build with that fix; if a fresh `npm install` pins an
> older build and `ng serve <remote>` hangs, that's the cause.

To run a single app's dev server (no federation guarantees), use `ng serve <project>`
or the `serve:dev:*` scripts, then open `http://localhost:4200/`. The application
reloads automatically whenever you modify source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Running the federated SSR servers

Build each app, then start the servers:

```bash
ng build host && ng build mfe1 && ng build mfe2
npm run start:ssr
```

`start:ssr` (see [`scripts/start-all.mjs`](./scripts/start-all.mjs)) starts the
servers **in the order they must boot** and exits them all together on `Ctrl+C`:

| Server | URL |
|---|---|
| host | http://localhost:4200 |
| mfe1 (remote) | http://localhost:4201 |
| mfe2 (remote) | http://localhost:4202 |

Each server is launched through the SSR preload
(`node --import @angular-architects/native-federation/node-preload dist/<app>/server/server.mjs`),
which registers the federation loader before Angular evaluates. The `serve:ssr:*` npm
scripts (and `start:ssr`) already include this flag.

**Boot order is load-bearing.** The host's `initNodeFederation` fetches each
remote's `remoteEntry.json` over HTTP at start-up, so the **remotes must be
listening before the host boots**. If a remote isn't reachable at boot it is skipped
(`strictRemoteEntry` defaults to `false`), so only *that* remote's federated regions
render empty — and because the route-level `.catch(() => RemoteUnavailable)` swallows
it, that is otherwise silent. The preload publishes a status on
`globalThis.__NF_FEDERATION_STATUS__` (set `NF_REQUIRE_REMOTES` to fail readiness
instead of rendering empty), and `start:ssr` waits for each remote's `remoteEntry.json`
before starting the host, which removes the footgun in local dev.

The remote ports (4201/4202) are pinned by
[`projects/host/public/federation.manifest.json`](./projects/host/public/federation.manifest.json);
if you start a remote on a different port, update the manifest to match.

## Federated routes under SSR

This workspace is a host (`host`) that server-renders two federated remotes
(`mfe1`, `mfe2`) via Native Federation. There is one sharp edge worth knowing
about when combining **federation**, **`loadChildren`**, and **SSR deep-links**.

### The constraint

Angular's SSR build derives a **route manifest** by statically crawling the
host's router config, and `AngularNodeAppEngine` only renders URLs present in
that manifest. A federated **`loadChildren`** callback cannot be resolved during
that build-time crawl (the server federation loader isn't initialised then), so
its child routes — e.g. `/todos/:id` — never enter the manifest. The result: the
list at `/todos` renders, but a **direct** request to `/todos/:id` returns a
404 from Express, even though client-side navigation to it works.

Note this is about discovering the route *shape*, not enumerating ids: a
server-rendered `:id` is stored in the manifest as a single wildcard pattern, so
once the route is known, any id renders on demand. The problem is purely that a
federated `loadChildren` is invisible to the build.

See [`load-children-deeplink-bug.md`](./load-children-deeplink-bug.md) for the
full investigation, symptoms, and the experiments that don't work.

### What this repo does (host owns the route shape)

`projects/host/src/app/app.routes.ts` mounts the feature with **`loadComponent`
children** instead of a federated `loadChildren`:

```ts
{
  path: 'todos',
  children: [
    { path: '',    loadComponent: () => loadRemote('mfe1', './List')   },
    { path: ':id', loadComponent: () => loadRemote('mfe1', './Detail') },
  ],
}
```

A `loadComponent` path is registered statically (the callback isn't invoked at
build time), so both `/todos` and `/todos/:id` land in the manifest and
server-render on direct request — the same reason `/insights` (a `loadComponent`
leaf) already worked. mfe1 exposes the two components (`./List`, `./Detail`); the
nested empty-path + `:id` shape mirrors mfe1's own routing so the components'
relative `routerLink`s resolve unchanged, and `:id` is bound to
`TodoDetailComponent.id` via `withComponentInputBinding()`.

**Trade-off:** the host now declares the URL structure, so the remote owns the
*components* but not its *route shape*. Adding a nested child later requires a
host change.

### Long-term fix (not implemented here)

The architecturally "correct" fix keeps the federated `loadChildren` (remote
owns its routes) and instead makes the federated child routes visible to the
build. The least-fragile variant is a **manifest merge**: each remote already
emits its own `angular-app-manifest.mjs` (mfe1's, for example, contains `/` and
`/*`), so a post-build step can read the remote's manifest, prefix its routes
(`/` → `/todos`, `/*` → `/todos/*`), and merge them into the host manifest. That
avoids both hooking Angular's route-extraction internals and executing remote
code at build time, at the cost of coupling to the manifest format. It belongs
upstream in the Native Federation adapter (where Angular-version drift is owned),
not in an example app — which is why this repo ships the host-owned route shape
instead.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
