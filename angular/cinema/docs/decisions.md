# Decisions

These are short ADRs. Each one states what was decided, why, and what it
costs. The guiding test for every one is: **does this concept earn its place
in a demo whose only job is to show the architecture?** Each rule is stated
here once; the other documents link to it.

## ADR-01: A cinema with seven MFEs, one subdomain each

- **Decision.**
  - Seven remotes: programme, film, seating, booking, loyalty,
    notifications and account. Plus a shell, which is not a subdomain:
    eight repos.
  - Slices follow subdomains, never pages.
- **Why.**
  - Everyone knows the domain, and all three subdomain types occur
    naturally.
  - The generic subdomains make up the count while staying almost empty,
    which is itself the lesson: a remote can be tiny.
- **Alternatives considered.**
  - *concessions* (snacks) was dropped. It needed an additive event into
    booking (`snack-added`), which either loses snacks when booking is not
    listening yet or duplicates them on replay.
  - An 8th *help* remote was dropped. `account` already plays the minimal
    remote.
  - Separate *basket* and *confirmation* pages were folded into one
    checkout page that has a confirmed state.
- **Naming.** `notifications` stays plural: the team owns all
  notifications, and `notify` would be the only verb among noun team names.

## ADR-02: Polyrepo with no root workspace

- **Decision.**
  - Each of the eight folders has its own `package.json` (`"type": "module"`),
    its own `package-lock.json`, an `angular.json` with one project, and its
    own tsconfig without `../` paths. All use Node 24, as the repository's CI
    does.
  - They are plain folders inside this git repository, not nested repos or
    submodules.
  - The example root has no `package.json` and no workspace file.
  - The package manager is **npm**, although every other example here uses
    pnpm.
- **Why.**
  - It is the point of the example. The tractor store shows the monorepo
    variant.
  - npm needs no per-repo `pnpm-workspace.yaml`. The tractor store's
    esbuild override is not needed either: `@angular/build` 22.2.0 pins
    esbuild 0.28.2, which satisfies Native Federation's `^0.28.0`, so npm
    dedupes it.
- **Cost.** Eight installs and eight `node_modules` folders; version
  alignment becomes a convention (ADR-08); `start-all.sh` exists only for
  convenience.

## ADR-03: Contracts are copied per repo, not published

- **Decision.**
  - Each repo has its own `src/contracts.ts`: types only, plus the
    `Window.__NF_REGISTRY__` augmentation, trimmed to what it touches.
    Example values live in `src/testing/contracts.examples.ts`.
  - The shell's copy is the reference.
  - Helpers are copied from the tractor store only where used:
    `nav-intent.directive.ts` with its spec, `nav-resolver.stub.ts`, and
    `testing/setup.ts` (a fresh real registry per test, in every repo).
- **Why.**
  - The runtime contract is strings. The types only document them.
  - A published npm package needs a registry, a release flow and version
    skew handling.
  - The small, visible duplication *is* the polyrepo lesson.
- **Cost.** Drift between copies is caught by no automated check, only by
  the resolver's `[nav]` warnings and the walkthrough (testing.md).
- **Production note.** Use a types-only npm package as a devDependency.
  Never share contracts through federation.

## ADR-04: The hold travels in the URL, not on the bus

- **Decision.**
  - Seating navigates by intent to `booking.checkout` with
    `{ screeningId, seats: 'A1,A2' }`. The `seats` format is defined in
    architecture.md § Intents.
  - There is no `seats-held` event.
- **Why.**
  - A URL survives a reload, and booking can be tested by setting one
    `routeParams` input.
  - There is no timing dependency on whether booking was already listening.
    That was the main hidden bug in the event-based variant.
- **Cost.** The `seats` string is an implicit contract, pinned down only by
  `seatsParamExample`.

## ADR-05: One domain event, replay 0, shell-mounted consumers only

- **Decision.**
  - `booking:confirmed { bookingRef, ticketCount }` is the only domain
    event. Its consumers are loyalty and notifications.
  - It is subscribed with `replay: 0`.
  - **Rule:** a domain event may only be consumed by elements the shell
    mounts at startup. Pages get cross-team data from the URL.
- **Why.**
  - One event shows publish/subscribe and fan-out to two consumers the
    producer does not know.
  - The payload is a snapshot, so no consumer calls back.
  - Replaying an additive fact would double-count points.
- **Cost.** "Mounted at startup" really means "loaded before the first
  booking". A fragment that loads after a booking misses it. That window is
  accepted and not tested.

## ADR-06: Cross-team fragments are in, but exactly two, placed only by the shell

- **Decision.**
  - `mfe-loyalty-badge` (shows state) and `mfe-notifications-toast` (reacts
    to events) sit in the shell layout.
  - No remote embeds another remote. There are no header or footer remotes.
- **Why.**
  - Fragments are the most instructive MFE mechanic, so they are kept.
  - Remote-in-remote embedding is cut: it gives a remote a runtime
    dependency, a loader and a manifest it otherwise does not need. The
    tractor store already shows it. Without it, remote `bootstrap()` takes
    no arguments.
  - A failed fragment renders an empty slot.
- **Rejected.** Snacks embedded in booking's page: a double coupling that
  needs three servers to verify.

## ADR-07: The shell owns the only manifest. No CDN, no env config.

- **Decision.**
  - `shell/public/federation.manifest.json` is the single deploy-time file.
    Remotes have none; standalone mode passes an inline empty manifest.
  - There is no `env.config.json`, no CDN server, no image loader and no
    custom font. The UI is stock Angular Material; the shell's global
    `styles.scss` holds the one M3 theme.
- **Why.** There is exactly one place where repos meet at deploy time.
  Every asset is served by the repo that owns it.

## ADR-08: Versions are aligned by convention

- **Decision.** One rule: every range uses `~`, never `^`, and every repo
  declares its major's ranges exactly. There are two majors on purpose.
  - **Angular 22**: shell, programme, seating, booking, loyalty (the
    tractor store's ranges).
  - **Angular 21**: film, notifications and account. The generic,
    "bought-in" subdomains lag one major behind.

  | Package | Angular 22 repos | Angular 21 repos |
  |---|---|---|
  | `@angular/*` | `~22.2.0` | `~21.2.24` |
  | `@angular/material`, `@angular/cdk` (own patch numbers) | `~22.2.0` | `~21.2.0` |
  | `rxjs` | `~7.8.0` | `~7.8.0` |
  | Federation builder | `@angular-architects/native-federation` `~22.2.4` | `@angular-architects/native-federation-v4` `~21.2.17` |
  | `@softarc/native-federation` | `~4.9.0` | (comes with the builder) |
  | `@softarc/native-federation-orchestrator` | `~4.9.0` | `~4.9.0` |
  | `typescript` | `~6.0.0` | `~5.9.0` |

  The orchestrator is in every repo (runtime in `main.ts`, the bus,
  `testing/setup.ts`). The federation config is the tractor-store style in
  every repo (the Angular 21 repos import it from
  `@angular-architects/native-federation-v4/config`):
  `fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })`,
  `.patch(['@angular/*'], { includeSecondaries: { keepAll: true } }).get()`,
  `sharedMappings: []`, `features: { denseExternals: true }`. The Angular 21
  repos add `shareScope: 'ng21'` (as in `angular/simple/ng21`).
  `@angular/material` and `@angular/cdk` match `@angular/*`, so they are
  shared like the rest of Angular.
- **Verified behaviour (orchestrator 4.9.0, default config).** The shell
  passes `hostRemoteEntry`, so its versions are marked as the host's and
  are preferred.
  - Patch drift is harmless: every `~22.2` range accepts the shell's
    version.
  - The three Angular 21 remotes share their own Angular 21 through the
    `ng21` share scope: one second copy for the three of them, loaded
    without warnings. This is **intended**: it shows what a lagging team
    costs (a second Angular download) and that the page still works.
    Verified with film: the import map gets a scope for the first ng21
    remote's origin (`http://localhost:4302/`), so `@angular/core` loads
    twice (22 from the shell, 21 from film). The scope covers *every*
    shared package, so `rxjs`, `tslib` and the used Material/CDK parts load
    twice too. No version warning appears, because the two scopes are never
    compared. The shell's Material 22 theme tokens style the Material 21
    components. Verified with film and notifications both loaded: the
    scopes for `http://localhost:4302/` and `http://localhost:4306/` map
    `@angular/core` (and every other shared package) to the same file on
    :4302, so Angular 21 loads once. Film's copy is used even though the
    toast mounts first; notifications serves only its own exposes.
  - Tooling cost: the `-v4` builder depends on
    `@angular-devkit/build-angular` (webpack), so the Angular 21 repos
    install it and a second esbuild. That is not a mistake in the repo, so
    it is not overridden.
  - Unplanned minor or major drift in the default scope is loud: a remote
    whose strict range rejects the shell's version logs a warning and loads
    its own copy of Angular. (With the orchestrator's
    `strictExternalCompatibility` option it would throw instead.)
- **Why.** A README line is cheaper than syncpack or Renovate groups. Two
  majors make the drift visible instead of hypothetical.
- **Cost.** An Angular upgrade means a pull request in every repo of that
  major, and the Angular 21 repos pay for one shared Angular 21 at
  runtime.

## ADR-09: Test your own side, plus one runtime smoke

- **Decision.**
  - Vitest per repo on a real registry, against its own example values.
  - `shell/scripts/smoke.mjs` checks every `remoteEntry.json`: name,
    exposes, and that each exposed file is served.
  - A manual walkthrough checks that the sides agree.
- **Why.** No test can import another repo. Smoke checks the real runtime
  surface cheaply, and it belongs to the repo that owns the manifest.
- **Rejected.** Pact or a contract broker: heavy, and no standard pattern
  for browser bus events. A browser end-to-end test: it repeats the
  walkthrough and ties the shell repo to seven other servers.

## ADR-10: Ports 4300 to 4307

- **Decision.** The shell runs on 4300 and the remotes on 4301 to 4307.
- **Why.** The other examples in this repository use 4200 to 4203, so the
  demo can run next to them without port collisions.

## YAGNI: deliberately left out

| Cut | Why it does not earn its place |
|---|---|
| Shared contracts npm package | Publishing overhead. Copies are enough (ADR-03). |
| Root `package.json` or workspace | It would quietly undo the polyrepo (ADR-02). |
| Version-sync tooling (syncpack, Renovate groups) | A convention is enough for 8 repos (ADR-08). |
| Discovery service | Replacing one manifest file per environment is enough (ADR-07). |
| Manifests in remotes, remote→remote embeds, `env`/`nf` on `bootstrap` | No remote needs to find another remote (ADR-06). |
| CDN server, `env.config.json`, image loader, custom font | Each repo serves its own `public/` (ADR-07). |
| `seats-held` and `snack-added` events | Timing and replay bugs. URL instead (ADR-04, ADR-01). |
| `screeningId` in `booking:confirmed` | Neither consumer uses it (ADR-05). |
| `account:signed-in` and any auth | Its only consumer would be cosmetic. |
| Backend, HTTP, persistence, points history | Inline mock data. A reload resets the booking and the points. |
| Real payment, seat-hold expiry, staff/admin actor | Features, not architecture. |
| Cross-tab `storage` sync | A tractor-store nicety with no architectural lesson. |
| Query strings in intents | The copied resolver supports them; the demo does not use them. |
| A "not available" page | `**` redirects to a page that loaded, as in the tractor store. |
| A fake registry | Specs use the real one through `testing/setup.ts` (ADR-03). |
| `integrityHashes`, `denseChunking` | Production hardening that is noise in a demo. |
| SSR, i18n, locales | Out of scope. |
| CI pipeline | Not in the first version (architecture.md § Deployment). |

## Parked, to pick up only if asked

- A README section that shows a remote drifting by a **minor** version: what
  the console prints and what the scoped copy costs.
- A GitHub Pages assembly workflow, labelled as a stand-in for per-repo
  pipelines.
- Keyboard-toggled team-colour outlines (`helper.js`) in the shell.
- One browser end-to-end test of the happy path, at the example root.

## Review items not applied

- **A `--copies` mode in smoke that compares each repo's `contracts.ts` with
  the shell's.** It would make the shell repo read its siblings' source, which
  a polyrepo cannot do; copy drift is documented as uncaught instead.
- **A grep that checks `shell/src` contains no `booking:`.** A negative rule
  for one string; enforced by review.
- **Renaming `mfe-booking-checkout` to `mfe-booking-summary`.** "checkout"
  was added to the glossary instead.
- **Making the header hide links of a remote that is down.** The copied
  directive renders an inert link; changing it would make it a fork rather
  than a copy.
