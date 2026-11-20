# Decisions

These are short ADRs. Each one states what was decided, why, and what it
costs. The guiding test for every one is: **does this concept earn its place
in a demo whose only job is to show the architecture?** Each rule is stated
here once; the other documents link to it.

## ADR-01: A cinema with six MFEs, one subdomain each

- **Decision.**
  - Six remotes: programme, film, seating, booking, loyalty and account.
    Plus a shell, which is not a subdomain: seven repos.
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
  - A 7th *notifications* remote was built and removed again (ADR-15): a
    toast is shared UI, not a subdomain.

## ADR-02: Polyrepo with no root workspace

- **Decision.**
  - Each of the seven folders has its own `package.json` (`"type": "module"`),
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
- **Cost.** Seven installs and seven `node_modules` folders; version
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
    `nav-intent.directive.ts` and `navigate.ts` with their specs, `nav-intents.stub.ts`, and
    `testing/setup.ts` (a fresh real bus per test, in every repo except
    programme and account, which never touch the bus).
- **Why.**
  - The runtime contract is strings. The types only document them.
  - A published npm package needs a registry, a release flow and version
    skew handling.
  - The small, visible duplication *is* the polyrepo lesson.
- **Cost.** Drift between copies is caught by no automated check, only by
  the shell's `[nav]` warnings and the walkthrough (testing.md).
- **Production note.** Use a types-only npm package as a devDependency.
  Never share contracts through federation.

## ADR-04: The hold travels in the URL, not on the bus

**Amended by ADR-16:** the hold is also shared as state on the bus, for
booking's summary on seating's page; the handoff to checkout is unchanged.

- **Decision.**
  - Seating navigates by intent to `booking.checkout` with
    `{ screeningId, seats: 'A1,A2' }` (since ADR-16, booking's summary does).
    The `seats` format is defined in
    architecture.md § Intents.
  - There is no `seats-held` event: no one-shot fact that checkout depends
    on. ADR-16's `seating:hold` is retained state for display only.
- **Why.**
  - A URL survives a reload, and booking can be tested by setting one
    `routeParams` input.
  - There is no timing dependency on whether booking was already listening.
    That was the main hidden bug in the event-based variant.
- **Cost.** The `seats` string was an implicit contract between seating and
  booking, pinned down only by `seatsParamExample`. Since ADR-16 booking
  both writes and reads it.

## ADR-05: One domain event, sent as a command, shell-mounted consumers only

**Narrowed by ADR-16:** the shell-mounted rule is for domain facts and
commands; a page's fragment may read retained state.

- **Decision.**
  - `booking:confirmed { bookingRef, ticketCount }` is the only domain
    event. Its consumer is loyalty.
  - Booking emits it with `{ retain: false }`, so the bus keeps nothing for
    a listener that subscribes later. The consumer still subscribes with
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

**Superseded by ADR-15.** Kept for history.

- **Decision.**
  - `mfe-loyalty-badge` (shows state) and `mfe-notifications-toast` (takes
    commands; removed with its remote in ADR-15). Since ADR-13 their remotes declare them, and the shell
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
  - **Angular 21**: film and account. The generic, "bought-in" subdomains
    lag one major behind.

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
  dependency of every repo except programme and account, pinned to `4.0.0-next.2` while
  it is a prerelease, and skipped with a regex (the package and its subpaths) in `federation.config.mjs`: each
  repo bundles its own copy, so its version never has to align across
  repos (architecture.md § Shared dependencies and versions).

  The federation config is the tractor-store style in every repo (the Angular 21 repos import it from
  `@angular-architects/native-federation-v4/config`):
  `fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })`,
  `.patch(['@angular/*'], { includeSecondaries: { keepAll: true } }).get()`,
  `sharedMappings: []`, `features: { denseExternals: true, denseChunking: true }`. The Angular 21
  repos add `shareScope: 'ng21'` (as in `angular/simple/ng21`).
  `@angular/material` and `@angular/cdk` match `@angular/*`, so they are
  shared like the rest of Angular.
- **Verified behaviour (orchestrator 4.9.0, default config).** The shell
  passes `hostRemoteEntry`, so its versions are marked as the host's and
  are preferred.
  - Patch drift is harmless: every `~22.2` range accepts the shell's
    version.
  - The Angular 21 remotes share their own Angular 21 through the
    `ng21` share scope: one second copy for all of them, loaded
    without warnings. This is **intended**: it shows what a lagging team
    costs (a second Angular download) and that the page still works.
    Verified with film: the import map gets a scope for the first ng21
    remote's origin (`http://localhost:4302/`), so `@angular/core` loads
    twice (22 from the shell, 21 from film). The scope covers *every*
    shared package, so `rxjs`, `tslib` and the used Material/CDK parts load
    twice too. No version warning appears, because the two scopes are never
    compared. The shell's Material 22 theme tokens style the Material 21
    components. Verified with all Angular 21 remotes loaded (then still
    including notifications on :4306): the scopes for :4302 and :4307 map
    `@angular/core` (and every other shared package) to the same file, so
    Angular 21 loads once. Which ng21 remote serves it is not
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
  walkthrough and ties the shell repo to six other servers.

## ADR-10: Ports 4300 to 4307

- **Decision.** The shell runs on 4300 and the remotes on 4301 to 4307.
  **:4306 is retired** (it was notifications, ADR-15). Account keeps :4307.
- **Why.** The other examples in this repository use 4200 to 4203, so the
  demo can run next to them without port collisions. Renumbering account is
  churn, and a stale notifications server left on :4306 would answer for
  `@cinema/account`.

## ADR-11: A remote switcher in the shell, applied by reload

- **Decision.**
  - `shell/src/remote-switcher/` is demo tooling: a draggable panel with one
    checkbox per remote. `main.ts` filters the fetched manifest before
    `initFederation`.
  - The selection lives in `sessionStorage['cinema.remotes']`. The default is
    **every remote in the manifest**: `readSelection()` returns `null` when
    nothing valid is stored, and `applyRemoteSelection` treats `null` as
    every manifest key. There is no `DEFAULT_REMOTES` list, so the Angular
    21 remotes show on first load and ADR-13 holds.
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
  - The shell warns about a `nav:navigate` it cannot fill in only when the
    intent's team (the part before the dot) loaded. One for an absent team
    is a silent no-op.
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
    `fragments: [{ element, slot? }]` in its `nav-contribution` (ADR-15).
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

Superseded by ADR-15: notifications removed.

## ADR-15: Pages may embed declared fragments; the shell defines them

**Amended by ADR-16:** another embeddable fragment, `mfe-booking-summary`,
placed by seating, reads seating's retained `seating:hold`.

- **Decision.**
  - **Notifications is removed.** The `notifications` repo, its manifest
    entry, the `overlay` slot, the `notify:show` channel and
    `NotifyMessage` are gone.
  - **Film owns `mfe-film-card`** (poster, title linking to `film.detail`,
    runtime, age label; input `film-id`). **Booking owns
    `mfe-booking-start`** ("Book · €12 per seat", a link to
    `seating.plan`; input `screening-id`). Programme's landing page embeds
    both in its own screening card and keeps only *when*: screening id, day
    and time. It drops its film title snapshot and links to no other team.
  - `NavFragment.slot` becomes optional and only `'header'`. The shell
    *defines* every declared fragment; `slot` only says where the shell also
    *places* it. A fragment without a slot is embeddable by pages.
  - The shell defines every declared fragment at startup and does not await
    it: `defineFragments(contributions, load)` in `contributions.ts`, called
    from `bootstrap.ts`. Remotes still get no loader and no manifest, and
    `bootstrap()` still takes no arguments.
  - Rules for embedded fragments: inputs are **ids only, as attributes**;
    the expose key **equals the tag**; an embedded fragment **emits and
    consumes no domain events** (ADR-05 still holds).
  - The booking ↔ seating intent cycle is intended: booking owns the
    journey and decides it starts at `seating.plan`; seating supplies the
    hold as one step and hands back to `booking.checkout`. It is not a
    reason to merge the two.
- **Why.**
  - A toast has no actor goal, no vocabulary, no data and no pivotal event,
    so it is shared UI, not a subdomain. Its only sender was booking, whose
    checkout already shows a `role="status"` confirmation with the ref. The
    "element that takes commands" idea is already shown by `nav:navigate`.
  - Programme's card was a hand-made copy of film content, against
    programme's own boundary. Film rendering the list instead would make
    film know showtimes. Embedding keeps both boundaries: one team owns the
    page and assembles it from other teams' fragments (the tractor-store
    pattern).
  - A link to another team's page is normally just an intent. A fragment is
    justified here because booking shows something only it knows (the
    price) and decides where its journey starts. The team that owns the
    conversion owns the call to action.
  - Ids only, as attributes: the tag stays usable from plain HTML, and the
    attribute name is the contract both sides assert.
- **Cost.**
  - Film's and booking's apps start at shell startup on every route. Fine,
    because programme is the landing page.
  - A drifted tag or attribute renders nothing, silently, exactly like an
    absent remote (testing.md, contract #6).
  - Apart from the shell, nothing in the demo takes commands any more.
  - Without booking there is no Book link, so the journey cannot start. No
    fallback link is added.
- **Choices made along the way.**
  - `slot?: 'header'` rather than a `'embed'` slot: defining and placing
    stay apart, and the union gets no literal that means "nowhere".
  - `mfe-booking-start`, not `-button`: it renders an `<a>` and starts a
    booking.
  - Identical "Book" links get their accessible name from the card: each
    card is `role="group"` with `aria-labelledby` on ids programme owns
    (the `<mfe-film-card>` host id and its own day/time element).
  - The define code is one named, un-awaited function, so it has one place
    to read and test and does not block the first paint.
  - The switcher defaults to every manifest remote and `DEFAULT_REMOTES` is
    deleted, so the shell names no remote (ADR-11, ADR-13).
  - Programme's copies of `nav-intent` and `navigate` are deleted: it no
    longer links anywhere. Booking takes copies.
  - Account keeps :4307 (ADR-10).

## ADR-16: Seating's hold is shared state; the handoff stays in the URL

Amends ADR-04, ADR-05 and ADR-15.

- **Decision.**
  - **The "Your seats" card moves to booking** as the declared fragment
    `mfe-booking-summary` (input `screening-id`). Seating's page embeds it
    beside the plan. It shows the held seats, the price ("2 tickets × €12 =
    €24") and Continue, a `[navIntent]` link to `booking.checkout`.
  - **Seating publishes its hold** on the retained channel
    `seating:hold { screeningId, seats: readonly string[] }`, seats in grid
    order. It emits from **one `effect()`** on the hold, so the empty hold on
    first render and on a new screening replaces whatever is retained.
    Without that, coming back to a screening would replay an earlier visit's
    seats while the plan shows none.
  - The summary subscribes with replay and **ignores a hold for another
    screening**.
  - **The handoff stays in the URL** (ADR-04): Continue navigates to
    `/booking/{screeningId}/{seats}` and checkout reads only `routeParams`,
    never the bus. The `seats` string is now booking's own: the summary
    writes it, checkout reads it (`seats-param.ts`).
  - **Rule: micro-frontends communicate over the bus.** Attributes and URL
    params stay where they fit: configuring an element (an id attribute,
    `routeParams`) and handing off between pages (the checkout URL).
    Everything else one micro-frontend tells another is a bus channel, also
    between two elements on the same page. No DOM `CustomEvent`s between
    teams.
  - ADR-05's rule "consumed only by elements the shell mounts at startup"
    applies to domain facts and commands. Retained state may be read by a
    page's fragments. ADR-15's "an embedded fragment emits and consumes no
    domain events" gets this one exception.
- **Why.**
  - Ownership: booking owns the price and the call to action that starts a
    booking (domain.md). The card showed both concerns on seating's page,
    and seating had to know booking's intent id and URL format. Now seating
    only knows seats.
  - Why the bus and not a `seats` attribute or a DOM event: **one uniform
    way to communicate**. Attributes and DOM events are just as
    framework-agnostic, and seating does place the summary, so either would
    work here. But each would be a second mechanism that only works
    between a parent and its child, with its own contract style and
    nothing to watch it. With one mechanism every cross-team message is a
    typed `Channels` entry, shows in the shell's Events panel, and works
    the same whether the other side is a child, a sibling or the shell.
    It also makes the hold state any team can read without seating
    changing (a header basket, analytics).
  - Retained, not a command: the summary and the plan mount in no fixed
    order, and replaying a hold is harmless, unlike `booking:confirmed`.
- **Cost.**
  - Between a parent and its child the bus is the long way round: the value
    goes out to the whole page, and the child filters it (`screening-id`).
    That is the price of one mechanism.
  - The contract between the two teams is now a channel name, a payload key
    set and a tag, all strings. A drifted tag or channel leaves seating's
    page without Continue, so the journey dead-ends, quieter than a
    drifted `seats` string, which showed an empty checkout.
  - The retained hold outlives seating's page. The effect and the
    screening filter keep it harmless; nothing clears it.
  - Seating standalone, or with booking off, shows the plan with no summary
    and no Continue.
  - The empty-hold rule is a discipline seating must keep; its spec pins it.
- **Choices made along the way.**
  - `seating:hold`, a noun: it is state, named like `nav:intents`, not a
    past-tense fact. "Hold" is seating's word (domain.md).
  - `seats` is an array, not `'A1,A2'`: the comma string is a URL format and
    stays inside booking.
  - Continue is a link when seats are held and a disabled button when none
    are, because a link cannot be disabled.
  - No "hold cleared" command, no handshake, no per-screening store.

## YAGNI: deliberately left out

| Cut | Why it does not earn its place |
|---|---|
| Shared contracts npm package | Publishing overhead. Copies are enough (ADR-03). |
| Root `package.json` or workspace | It would quietly undo the polyrepo (ADR-02). |
| Version-sync tooling (syncpack, Renovate groups) | A convention is enough for 7 repos (ADR-08). |
| Discovery service | Replacing one manifest file per environment is enough (ADR-07). |
| Manifests in remotes, a loader or registry for embeds, `env`/`nf` on `bootstrap` | The shell defines every declared fragment, so no remote needs to find another remote (ADR-15). |
| CDN server, `env.config.json`, image loader, fonts besides the shell's Roboto | Each repo serves its own `public/` (ADR-07). |
| A `seats-held` fact and a `snack-added` event | Timing and replay bugs. URL instead (ADR-04, ADR-01). The hold is shared only as retained state (ADR-16). |
| `screeningId` in `booking:confirmed` | Neither consumer uses it (ADR-05). |
| `account:signed-in` and any auth | Its only consumer would be cosmetic. |
| Backend, HTTP, persistence, points history | Inline mock data. A reload resets the booking and the points. |
| Real payment, seat-hold expiry, staff/admin actor | Features, not architecture. |
| Cross-tab `storage` sync | A tractor-store nicety with no architectural lesson. |
| Query strings in intents | The copied `urlFor()` supports them; the demo does not use them. |
| A "not available" page | `**` redirects to a page that loaded, as in the tractor store. |
| A fake bus | Specs use a real one (`createBus()`) through `testing/setup.ts` (ADR-03). |
| `integrityHashes` | Production hardening that is noise in a demo. |
| A toast in the shell (`notify:show`, `overlay` slot) | It would repeat booking's own confirmation (ADR-15). |
| Renumbering account to :4306 | Churn, and a stale server could answer on :4306 (ADR-10). |
| A fallback film title, `:not(:defined)` placeholder or any fragment input besides one id | Brings film content back into programme, or widens the contract (ADR-15). |
| Lazy or retry loading of embeds, typed wrappers around embedded tags | One un-awaited define at startup is enough (ADR-15). |
| SSR, i18n, locales | Out of scope. |
| CI pipeline | Not in the first version (architecture.md § Deployment). |

## Parked, to pick up only if asked

- A README section that shows a remote drifting by a **minor** version: what
  the console prints and what the scoped copy costs.
- A GitHub Pages assembly workflow, labelled as a stand-in for per-repo
  pipelines.
- Team-colour outlines in the shell: if ever added, one CSS rule, not
  `helper.js`.
- A reverse embed: showtimes or Book on `film.detail`.
- A seating availability call to action ("23 seats left"). A card gets one
  call to action.
- A readable screening label on the seating and checkout pages.
- Confirmed bookings marking seats as taken.
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
