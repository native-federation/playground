# Cinema: a polyrepo of six tiny teams

> **Status: built and tested.**

A Native Federation (Angular 22 and 21, Angular Material) demo of a micro frontend architecture.
The business is a one-screen neighbourhood cinema. A moviegoer browses the
programme, reads about a film, picks seats, confirms a booking and earns
loyalty points.

The demo is about the **architecture, not the features**. Every micro
frontend (MFE) is deliberately tiny: one or two elements, inline mock data,
no backend. What it shows:

- **One programme card rendered by three teams on two Angular majors.**
  Programme (Angular 22) owns the card and its day and time, film (Angular
  21) renders the film inside it, and booking (Angular 22) renders the Book
  link with its price.
- **Six independent teams, seven repos.** Six remotes, one subdomain each,
  plus one shell.
- **Polyrepo.** Every MFE and the shell has its own `package.json`, its own
  lockfile and its own build, and can be deployed on its own. The tractor
  store next door is a pnpm workspace with a shared `libs/contracts`. This
  example deliberately is not.
- **Runtime composition only.** The shell discovers remotes through one
  `federation.manifest.json`, mounts `mfe-*` custom elements, routes by
  intent, and the remotes pass one domain event over the event bus.

The code style and mechanics follow
[`../tractor-store`](../tractor-store/docs/architecture.md): custom elements
via `@angular/elements`, `nav-contribution` and intent navigation. The event
bus is [`@softarc/native-federation-communication`](https://github.com/native-federation/communication).

## Documents

| File | What it covers |
|---|---|
| [docs/domain.md](docs/domain.md) | Domain story, actors, glossary, subdomain map (core/supporting/generic), pivotal event, bounded-context boundaries |
| [docs/architecture.md](docs/architecture.md) | Shell vs remotes, the six integration contracts, embedded fragments, intents and URLs, sharing contracts without a monorepo, local dev, deployment |
| [docs/testing.md](docs/testing.md) | Per-repo Vitest on a real bus, the contract matrix, the shell's smoke script, the walkthrough |
| [docs/decisions.md](docs/decisions.md) | Short ADRs (each rule stated once), the YAGNI cuts, parked ideas |

## MFE catalogue

Ports start at 4300 so the demo runs next to the other examples here
(4200–4203).

| # | Repo | Port | Angular | Federation name | Subdomain type | Exposes | The one tiny thing | Pattern it demonstrates |
|---|---|---|---|---|---|---|---|---|
| 0 | `shell` | 4300 | 22 | `@cinema/shell` | (app, not a subdomain) | none | Layout, router, manifest, bus, remote switcher, event log | The host: discovery, routing, intent resolution, the header slot, **defines every declared fragment** |
| 1 | `programme` | 4301 | 22 | `@cinema/programme` | supporting | page `mfe-programme-list` | Lists this week's screenings: day and time | Landing page. **A page assembled from other teams' fragments** |
| 2 | `film` | 4302 | 21 | `@cinema/film` | generic | page `mfe-film-detail`, fragment `mfe-film-card` | Poster, title, synopsis, runtime, age label | **Route params in** (`routeParams`), and an **embedded fragment** with an id attribute |
| 3 | `seating` | 4303 | 22 | `@cinema/seating` | **core** | page `mfe-seating-plan` | 5×8 seat grid, toggle seats, "Continue" | **The URL is the contract**: the hold travels as intent params |
| 4 | `booking` | 4304 | 22 | `@cinema/booking` | **core** | page `mfe-booking-checkout`, fragment `mfe-booking-start` | "Book · €12 per seat" on each card; the checkout shows the hold and a booking ref on "Confirm" | **The team that owns the conversion owns the call to action**, and **publishing a domain event** (`booking:confirmed`) |
| 5 | `loyalty` | 4305 | 22 | `@cinema/loyalty` | supporting | page `mfe-loyalty-points`, fragment `mfe-loyalty-badge` | +10 points per ticket. The badge shows the total | **Consuming an event**, a **fragment in the shell**, and **state inside one remote** (badge and page share one store) |
| 6 | `account` | 4307 | 21 | `@cinema/account` | generic | page `mfe-account-profile` | Mock profile | **The minimal remote** (template to copy) and the **remote-down / redeploy walkthrough** |

Port 4306 is retired: it belonged to the removed notifications remote
(ADR-10, ADR-15).

Every remote also exposes `nav-contribution`. The happy path is
`programme.list` → Book (booking's fragment) → `seating.plan` →
`booking.checkout`, with a side trip to `film.detail` from the film card.
When the booking is confirmed, booking publishes `booking:confirmed`, which
loyalty consumes.

## Polyrepo layout

```
angular/cinema/            example root: NOT a workspace (no package.json, no pnpm-workspace.yaml)
  README.md                this file
  start-all.sh             demo convenience: installs each repo in turn, then starts all seven
  docs/                    this plan
  shell/                   :4300   owns the ONLY federation.manifest.json and scripts/smoke.mjs
  programme/               :4301
  film/                    :4302
  seating/                 :4303
  booking/                 :4304
  loyalty/                 :4305
  account/                 :4307   (:4306 is retired)
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
  src/main.ts                         shell: manifest + initFederation
                                      remote: standalone only (empty manifest)
  src/bootstrap.ts                    remotes: bootstrap() → createCustomElement
  src/app.config.ts                   remotes: getAppInjector(), one app per remote
  src/nav-contribution.ts             remotes: { basePath, intents }
  src/contracts.ts                    types only; copied from shell, trimmed
  src/testing/setup.ts                fresh real bus per test (not in programme or account: they never touch the bus)
  src/testing/contracts.examples.ts   only if the repo uses an example (the shell keeps the reference copy)
  src/shared/nav-intent.directive.ts  + spec, only if the repo renders intent links
  README.md
```

> In real life these would be **seven git repositories**. Here they are
> plain folders inside the angular-examples git repository (not nested repos
> or submodules), so the demo can be cloned in one go. Nothing at the root
> is allowed to turn them back into a monorepo.

## The version rule

Every repo declares its major's `~` ranges, by convention only. Five repos
run Angular 22 and two (film, account) run Angular 21 on purpose: the
shell's Angular 22 serves the default scope, and the two Angular 21 remotes
share one Angular 21 through the `ng21` share scope. The ranges and what happens on
drift are in
[ADR-08](docs/decisions.md#adr-08-versions-are-aligned-by-convention).
Upgrading Angular means a pull request in every repo of that major, and
that is the honest cost of a polyrepo.

## How to run

```bash
./start-all.sh          # npm install in each repo in turn, then npm start in all seven
open http://localhost:4300
```

`start-all.sh` stops at once if a repo folder is missing, prefixes each dev
server's output with `[repo]`, and Ctrl-C stops all seven. Expect seven
`node_modules` folders and seven dev servers.

Every repo also works on its own:

| In a repo | Does |
|---|---|
| `npm start` | `ng serve` on its own port. A remote runs **standalone**: its own element with fixed mock params, links inert |
| `npm test` | Vitest + jsdom on a real event bus |
| `npm run build` | builds to `dist/<repo>` |
| `npm run smoke` (shell only) | checks every remote in the manifest: reachable `remoteEntry.json`, matching name, the `nav-contribution` expose, every exposed file served (that every declared fragment is exposed is checked by each remote's `nav-contribution.spec.ts`, ADR-09). Pass a manifest URL to check a deployment |

## How to demo it

1. `./start-all.sh` (seven repos) and open http://localhost:4300 with the
   console. The **Remotes** panel (bottom left) has all six remotes ticked.
   There are no `[nav]` or `[remote]` lines.
2. **Programme page.** Each card is one card rendered by three teams on two
   Angular majors: programme's day and time (22), film's poster, title,
   runtime and age label (21), and booking's "Book · €12 per seat" (22).
3. Click a film title to open `film.detail`, then "Back".
4. Click **Book** to open `seating.plan`, pick two seats, "Continue" to
   `booking.checkout`, then "Confirm". The header badge goes from 0 to 20
   pts without a reload (`booking:confirmed` → loyalty).
5. **Degrade.** Untick *film* and Apply: the cards keep day, time and Book,
   and the film area is empty. Tick it again, untick *booking* and Apply:
   there is no Book link, so the journey cannot start. That is intended;
   no fallback link is added.
6. **One team goes down, one team redeploys.**
   - Stop `account` (kill the process on port 4307; Ctrl-C in
     `start-all.sh` would stop all seven) and reload. The header
     **Account** link disappears. The console shows only the failed
     `remoteEntry.json` fetch and the orchestrator's `[NF][1]` line for it.
     Everything else loads, including film: its shared Angular 21 now comes
     from film itself (:4302).
   - Change the profile name in `account/src/profile.component.ts`, run
     `npm start` in `account` only, and reload `/account`. The new name
     appears. No other repo was rebuilt, reinstalled or restarted. (A
     browser that cached `remoteEntry.json` may need a hard reload; the
     shell fetches only the manifest with `no-cache`.)
   - Optional: stop `loyalty` and confirm a booking. It still confirms, the
     badge slot is empty, and booking never knew.

The same script, with what each step proves, is in
[docs/testing.md](docs/testing.md#the-remote-down--redeploy-walkthrough-readme-script).
