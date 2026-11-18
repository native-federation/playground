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
    `Channels` augmentation of `@softarc/native-federation-communication`,
    trimmed to what it touches.
    Example values live in `src/testing/contracts.examples.ts`.
  - The shell's copy is the reference.
  - Optional fields live only in the copies that set them (`menuLabel`,
    `fragments`, ADR-13). That knowingly lets the copies drift further.
  - Helpers are copied from the tractor store only where used:
    `nav-intent.directive.ts` with its spec, `nav-resolver.stub.ts`, and
    `testing/setup.ts` (a fresh real bus per test, in every repo except
    account, which never touches the bus).
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

## ADR-05: One domain event, sent as a command, shell-mounted consumers only

- **Decision.**
  - `booking:confirmed { bookingRef, ticketCount }` is the only domain
    event. Its consumer is loyalty. (Until ADR-14, notifications consumed
    it too.)
  - Booking emits it with `{ retain: false }`, so the bus keeps nothing for
    a listener that subscribes later. Both consumers still subscribe with
    `{ replay: false }`, as a guard against a producer that forgets.
  - **Rule:** a domain event may only be consumed by elements the shell
    mounts at startup. Pages get cross-team data from the URL.
- **Why.**
  - One event shows publish/subscribe to a consumer the producer does not
    know; adding a second consumer needs no change to booking.
  - The payload is a snapshot, so no consumer calls back.
  - Replaying an additive fact would double-count points.
- **Cost.** "Mounted at startup" really means "loaded before the first
  booking". A fragment that loads after a booking misses it. That window is
  accepted and not tested.

## ADR-06: Cross-team fragments are in, but exactly two, placed only by the shell

- **Decision.**
  - `mfe-loyalty-badge` (shows state) and `mfe-notifications-toast` (takes
    commands). Since ADR-13 their remotes declare them, and the shell
    places them in one of its two closed slots, `header` and `overlay`.
    Adding a slot is a shell decision.
  - No remote embeds another remote. There are no header or footer remotes.
- **Why.**
  - Fragments are the most instructive MFE mechanic, so they are kept.
  - Remote-in-remote embedding is cut: it gives a remote a runtime
    dependency, a loader and a manifest it otherwise does not need. The
    tractor store already shows it. Without it, remote `bootstrap()` takes
    no arguments.
  - A failed fragment renders an empty slot. A fragment of a remote that
    did not load is not rendered at all (ADR-12).
- **Rejected.** Snacks embedded in booking's page: a double coupling that
  needs three servers to verify.

## ADR-07: The shell owns the only manifest. No CDN, no env config.

- **Decision.**
  - `shell/public/federation.manifest.json` is the single deploy-time file.
    Remotes have none; standalone mode passes an inline empty manifest.
  - There is no `env.config.json`, no CDN server and no image loader. The
    UI is stock Angular Material; the shell's global `styles.scss` holds the
    one M3 theme.
  - One font: Roboto 400/500/700, self-hosted by the shell from
    `shell/public/roboto` via `@font-face`. No other font; remotes ship
    none (standalone mode falls back to the system font).
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

  The orchestrator is in every repo (`initFederation` in `main.ts`). The
  bus, [`@softarc/native-federation-communication`](https://github.com/native-federation/communication), is a runtime
  dependency of every repo except account, pinned to `4.0.0-next.0` while
  it is a prerelease, and listed in `skip` in `federation.config.mjs`: each
  repo bundles its own copy, so its version never has to align across
  repos (architecture.md § Shared dependencies and versions).

  The federation config is the tractor-store style in every repo (the Angular 21 repos import it from
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
    components. Verified with all three loaded: the scopes for :4302, :4306
    and :4307 map `@angular/core` (and every other shared package) to the
    same file, so Angular 21 loads once. Which ng21 remote serves it is not
    fixed (film in one run, account in another), and when that remote is
    down another one takes over (account stopped → :4302).
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
  - Vitest per repo on a real bus, against its own example values.
  - `shell/scripts/smoke.mjs` checks every `remoteEntry.json`: name, the
    `nav-contribution` expose, and that each exposed file is served. That
    every declared element and fragment is exposed is checked by each
    remote's `nav-contribution.spec.ts`.
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

## ADR-11: A remote switcher in the shell, applied by reload

- **Decision.**
  - `shell/src/remote-switcher/` is demo tooling: a draggable panel with one
    checkbox per remote. `main.ts` filters the fetched manifest before
    `initFederation`.
  - The selection lives in `sessionStorage['cinema.remotes']`. The default is
    programme, seating, booking and loyalty: the happy path plus the event
    consumer, all on Angular 22.
  - Apply reloads the page, both to enable and to disable a remote.
- **Why.**
  - The manifest stays complete (ADR-07); filtering at runtime keeps smoke
    and `start-all.sh` unchanged.
  - A remote cannot be removed from a live page: there is no public API, and
    `customElements.define` cannot be undone. Enabling live would need
    re-runnable routes in `navigation.ts`, so both directions reload.
  - A disabled remote behaves exactly like a remote that is down.
- **Cost.** Removing the tool means deleting the folder and three
  one-line touch points in `main.ts`, `app.ts` and `app.html`.

## ADR-12: An absent remote is silent, a broken one logs

- **Decision.**
  - `bootstrap.ts` loads the nav contributions before Angular starts, and
    only of the remotes the orchestrator initialised
    (`nf.adapters.remoteInfoRepo.contains`). The result is provided as the
    immutable `CONTRIBUTIONS` value: it is the one notion of "present".
  - The shell renders header links and fragment slots only for present
    remotes. The brand links to `/`, and `**` falls back to the first
    parameterless page in manifest order.
  - The resolver warns about an unknown intent only when its team (the part
    before the dot) loaded. `nav:navigate` to an unresolvable intent is a
    silent no-op.
- **Why.** With the switcher (ADR-11), a remote being off is a normal
  state, not an incident. Warnings are kept for what a developer can fix:
  drift inside a loaded team, a missing param, an invalid contribution, a
  fragment that fails although its remote loaded. A down remote still shows
  the orchestrator's `[NF][1]` line: that is the outage signal.
- **Cost.** `remoteInfoRepo` is reached through the orchestrator's `adapters`, which
  is on the public `NativeFederationResult` type.

## ADR-13: The shell names no remote

- **Decision.**
  - A remote declares its main-menu entry with `menuLabel` on a
    parameterless intent, and its fragments with
    `fragments: [{ element, slot }]` in its `nav-contribution`.
  - The shell builds the menu and the slots from the present contributions
    (ADR-12), in manifest order. Remote names appear only in the manifest.
  - Malformed fields are ignored, like an invalid contribution.
- **Why.** A new remote can add a menu entry or a fragment without a shell
  release, and a remote that is off simply contributes nothing. The copied
  `NavIntentDirective` stays unchanged: links are hidden by not generating
  them.
- **Cost.**
  - Deploy order: a remote that declares the fields works with an older
    shell, which ignores them. A shell that relies on them drops the menu
    entry and fragment of a remote that does not declare them yet. Remotes
    deploy first.
  - No `order`, icon or home flag: manifest order decides, and the brand
    links to `/`.

## ADR-14: Notifications shows messages, it knows no domain

- **Decision.**
  - Notifications listens to one command, `notify:show { message }`, and
    shows the message as given for 3 s. It no longer consumes
    `booking:confirmed`.
  - The team that owns the fact words the message: booking emits
    `notify:show` with "Booking BR-… confirmed" next to its domain event.
  - Like `booking:confirmed`, it is emitted with `{ retain: false }` and
    subscribed with `{ replay: false }`: a stale message is never shown.
- **Why.**
  - A notifications team that consumes every team's events must learn
    every team's language, and every new toast needs a release in its
    repo. That is slicing by technical capability: a bottleneck coupled to
    everyone.
  - It makes the difference between the two kinds of messages visible.
    Loyalty applies its own rule to a domain event (+10 points per ticket).
    Notifications just does what a command tells it.
- **Cost.**
  - Booking now emits twice on confirm, and `booking:confirmed` has only
    one consumer, so the demo no longer shows fan-out to two consumers.
  - A remote that only renders a toast is too thin for a real MFE. In
    production this is a shell capability or a shared component. It stays
    a remote here because it shows a fragment that takes commands.

## YAGNI: deliberately left out

| Cut | Why it does not earn its place |
|---|---|
| Shared contracts npm package | Publishing overhead. Copies are enough (ADR-03). |
| Root `package.json` or workspace | It would quietly undo the polyrepo (ADR-02). |
| Version-sync tooling (syncpack, Renovate groups) | A convention is enough for 8 repos (ADR-08). |
| Discovery service | Replacing one manifest file per environment is enough (ADR-07). |
| Manifests in remotes, remote→remote embeds, `env`/`nf` on `bootstrap` | No remote needs to find another remote (ADR-06). |
| CDN server, `env.config.json`, image loader, fonts besides the shell's Roboto | Each repo serves its own `public/` (ADR-07). |
| `seats-held` and `snack-added` events | Timing and replay bugs. URL instead (ADR-04, ADR-01). |
| `screeningId` in `booking:confirmed` | Neither consumer uses it (ADR-05). |
| `account:signed-in` and any auth | Its only consumer would be cosmetic. |
| Backend, HTTP, persistence, points history | Inline mock data. A reload resets the booking and the points. |
| Real payment, seat-hold expiry, staff/admin actor | Features, not architecture. |
| Cross-tab `storage` sync | A tractor-store nicety with no architectural lesson. |
| Query strings in intents | The copied resolver supports them; the demo does not use them. |
| A "not available" page | `**` redirects to a page that loaded, as in the tractor store. |
| A fake bus | Specs use a real one (`createBus()`) through `testing/setup.ts` (ADR-03). |
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
- **Making the header hide links of a remote that is down by changing the
  directive.** Resolved differently by ADR-13: the shell's header links of
  an absent remote are never generated, and the copied directive still
  renders an inert link for remote-rendered links. (Fixes to the directive, such as `role="link"` on the inert
  link, go into the tractor-store original too, so it stays a copy.)
