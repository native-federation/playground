# Cinema: a polyrepo of seven tiny teams

> **Status: in progress.** The shell, programme, film and seating are built,
> booking is next, and the other remotes follow.

A Native Federation (Angular 22 and 21, Angular Material) demo of a micro frontend architecture.
The business is a one-screen neighbourhood cinema. A moviegoer browses the
programme, reads about a film, picks seats, confirms a booking, earns
loyalty points and gets a toast.

The demo is about the **architecture, not the features**. Every micro
frontend (MFE) is deliberately tiny: one or two elements, inline mock data,
no backend. What it shows:

- **Seven independent teams, eight repos.** Seven remotes, one subdomain
  each, plus one shell.
- **Polyrepo.** Every MFE and the shell has its own `package.json`, its own
  lockfile and its own build, and can be deployed on its own. The tractor
  store next door is a pnpm workspace with a shared `libs/contracts`. This
  example deliberately is not.
- **Runtime composition only.** The shell discovers remotes through one
  `federation.manifest.json`, mounts `mfe-*` custom elements, routes by
  intent, and the remotes pass one domain event over the event bus.

The code style and mechanics follow
[`../tractor-store`](../tractor-store/docs/architecture.md): custom elements
via `@angular/elements`, `nav-contribution`, intent navigation, and
`window.__NF_REGISTRY__`.

## Documents

| File | What it covers |
|---|---|
| [docs/domain.md](docs/domain.md) | Domain story, actors, glossary, subdomain map (core/supporting/generic), pivotal event, bounded-context boundaries |
| [docs/architecture.md](docs/architecture.md) | Shell vs remotes, the five integration contracts, intents and URLs, sharing contracts without a monorepo, local dev, deployment |
| [docs/testing.md](docs/testing.md) | Per-repo Vitest on a real bus, the contract matrix, the shell's smoke script, the walkthrough |
| [docs/decisions.md](docs/decisions.md) | Short ADRs (each rule stated once), the YAGNI cuts, parked ideas |

## MFE catalogue

Ports start at 4300 so the demo runs next to the other examples here
(4200–4203).

| # | Repo | Port | Angular | Federation name | Subdomain type | Exposes | The one tiny thing | Pattern it demonstrates |
|---|---|---|---|---|---|---|---|---|
| 0 | `shell` | 4300 | 22 | `@cinema/shell` | (app, not a subdomain) | none | Layout, router, manifest, bus | The host: discovery, routing, intent resolution, fragment slots |
| 1 | `programme` | 4301 | 22 | `@cinema/programme` | supporting | page `mfe-programme-list` | Lists this week's screenings | Landing page. **Outgoing intent links with params** |
| 2 | `film` | 4302 | 21 | `@cinema/film` | generic | page `mfe-film-detail` | Synopsis, runtime, age rating | **Route params in**: `routeParams` written by the shell |
| 3 | `seating` | 4303 | 22 | `@cinema/seating` | **core** | page `mfe-seating-plan` | 5×8 seat grid, toggle seats, "Continue" | **The URL is the contract**: the hold travels as intent params |
| 4 | `booking` | 4304 | 22 | `@cinema/booking` | **core** | page `mfe-booking-checkout` | Shows the hold at a flat €12 per ticket. "Confirm" shows a booking ref | **Publishing a domain event** (`booking:confirmed`) |
| 5 | `loyalty` | 4305 | 22 | `@cinema/loyalty` | supporting | page `mfe-loyalty-points`, fragment `mfe-loyalty-badge` | +10 points per ticket. The badge shows the total | **Consuming an event**, a **fragment in the shell**, and **state inside one remote** (badge and page share one store) |
| 6 | `notifications` | 4306 | 21 | `@cinema/notifications` | generic | fragment `mfe-notifications-toast` | Shows "Booking BR-… confirmed" for 3 s | **A fragment with no page and no intents** that only reacts to events |
| 7 | `account` | 4307 | 21 | `@cinema/account` | generic | page `mfe-account-profile` | Mock profile | **The minimal remote** (template to copy) and the **remote-down / redeploy walkthrough** |

Every remote also exposes `nav-contribution`. The happy path is
`programme.list` → `seating.plan` → `booking.checkout`, with a side trip to
`film.detail`. When the booking is confirmed, `booking:confirmed` fans out
to loyalty and notifications.

## Polyrepo layout

```
angular/cinema/            example root: NOT a workspace (no package.json, no pnpm-workspace.yaml)
  README.md                this file
  start-all.sh             demo convenience: installs each repo in turn, then starts all eight
  docs/                    this plan
  shell/                   :4300   owns the ONLY federation.manifest.json and scripts/smoke.mjs
  programme/               :4301
  film/                    :4302
  seating/                 :4303
  booking/                 :4304
  loyalty/                 :4305
  notifications/           :4306
  account/                 :4307
```

Each repo folder is meant to look like a real repo of its own:

```
<repo>/
  package.json, package-lock.json     npm, own lockfile, "type": "module"
  angular.json                        one project, own port, test setupFiles
  tsconfig*.json                      no ../ paths; include src/contracts.ts
  federation.config.mjs               see decisions.md ADR-08
  src/index.html                      standalone mode: mounts this repo's own element
  public/                             this repo's own static assets
  src/main.ts                         shell: bus + manifest + initFederation
                                      remote: standalone only (empty manifest)
  src/bootstrap.ts                    remotes: bootstrap() → createCustomElement
  src/app.config.ts                   remotes: getAppInjector(), one app per remote
  src/nav-contribution.ts             remotes: { basePath, intents }
  src/contracts.ts                    types only; copied from shell, trimmed
  src/testing/setup.ts                fresh real registry per test
  src/testing/contracts.examples.ts   only if the repo uses an example (the shell keeps the reference copy)
  src/shared/nav-intent.directive.ts  + spec, only if the repo renders intent links
  README.md
```

> In real life these would be **eight git repositories**. Here they are
> plain folders inside the angular-examples git repository (not nested repos
> or submodules), so the demo can be cloned in one go. Nothing at the root
> is allowed to turn them back into a monorepo.

## The version rule

Every repo declares its major's `~` ranges, by convention only. Five repos
run Angular 22 and three (film, notifications, account) run Angular 21 on
purpose: the shell's Angular 22 serves the default scope, and the three
Angular 21 remotes share one Angular 21 through the `ng21` share scope. The ranges and what happens on
drift are in
[ADR-08](docs/decisions.md#adr-08-versions-are-aligned-by-convention).
Upgrading Angular means a pull request in every repo of that major, and
that is the honest cost of a polyrepo.

## How to run (planned)

```bash
./start-all.sh          # npm install in each repo in turn, then npm start in all eight
open http://localhost:4300
```

Or run any single remote with `npm start` and open its own port to see it in
standalone mode. Expect eight `node_modules` folders and eight dev servers.
