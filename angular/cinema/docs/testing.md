# Testing

The polyrepo constraint shapes the whole strategy. **No test may import
another repo.** Each repo proves its own side of every contract with
Vitest. The shell's smoke script checks the assembled runtime surface, and a
manual walkthrough checks that the sides agree.

| Layer | Where | Tool | When it runs |
|---|---|---|---|
| Unit, component and contract-side tests | every repo | Vitest + jsdom, `ng test --watch false` | per repo, on every change |
| Runtime smoke | `shell/scripts/smoke.mjs`, `npm run smoke` | plain Node `fetch`, no deps | manually before a demo; in a real setup, in the shell's deploy pipeline after the manifest is rewritten |
| Walkthrough | README script | a browser and a human | before a demo |

There is no CI in the first version, so nothing is a gate.

## Per repo: test your own side

**A fresh, real event bus per test.** Every repo except programme and account has
`src/testing/setup.ts`, copied from
[`tractor-store/projects/host/src/testing/setup.ts`](../../tractor-store/projects/host/src/testing/setup.ts),
listed in the `angular.json` test target's `setupFiles`. `createBus` comes
from `@softarc/native-federation-communication/setup`:

```ts
beforeEach(() => {
  vi.stubGlobal('__NF_BUS__', createBus());
  // The bus reports a throwing listener instead of rethrowing; rethrow so a failed expect fails the test.
  vi.stubGlobal('reportError', (error: unknown) => {
    throw error;
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});
```

`bus` reads `globalThis.__NF_BUS__` on every call, so specs emit and
observe through a real bus from `@softarc/native-federation-communication`,
and retain and replay behave as in the browser. A retained value reaches a
new listener before `bus.on` returns, so no spec waits for it. There is no
fake bus, and standalone `main.ts` never imports anything from
`src/testing/`. Programme and account never touch the bus, so they have no
setup file.

The spec names map onto the "pattern it demonstrates" column in the
[README](../README.md#mfe-catalogue).

| Repo | Specs |
|---|---|
| shell | Builds routes from contributions. **Survives a rejected contribution** (`allSettled`). Resolves intents to URLs, and **warns** on an unknown id or a missing param. Unknown URLs redirect to `programme`. Mounts the tag and writes `routeParams`. A fragment slot **renders empty when the loader rejects** (stub loader); `'overlay'` and `'footer'` are invalid slots. `declaredFragments` returns fragments with and without a slot; `defineFragments` calls a stub loader once per fragment, does not await, and a rejection logs and does not throw. With empty `sessionStorage`, `applyRemoteSelection(manifest)` loads every key. |
| programme | `nav-contribution` declares `list` with path `''`. Each card embeds `mfe-film-card` with `film-id` and `mfe-booking-start` with `screening-id`: the spec asserts those exact tag and attribute literals per screening. Each card's `aria-labelledby` points at ids that exist, and the group labels differ. |
| film | `nav-contribution` declares `detail` with path `{filmId}` and the fragment `mfe-film-card`. Renders the film for `routeParams = { filmId }`. An unknown id shows "not found". Through the custom element: after `bootstrap()`, `film-id="f-1"` renders the title, which links to `film.detail`; also when the attribute is set **before** the tag is defined (the real runtime order). |
| seating | `nav-contribution` declares `plan` with path `{screeningId}`. Renders taken seats deterministically for `screeningId`. Toggling A2 then A1 retains `seating:hold` equal to `seatHoldExample` (grid order, same key set). It retains an **empty** hold on first render, after releasing the last seat, on a new screening, and over an earlier visit's retained hold. Embeds `mfe-booking-summary` with `screening-id`: the spec asserts both literals. |
| booking | `nav-contribution` declares `checkout` with path `{screeningId}/{seats}` and the fragments `mfe-booking-start` and `mfe-booking-summary`. Through the custom element (attribute set before and after the define): `screening-id` gives a link that resolves to `seating.plan`, shows "€12", and a click emits `nav:navigate {id: 'seating.plan', payload: {screeningId}}`. Given `routeParams` with the decoded `seatsParamExample`, shows 2 tickets and €24. "Confirm" emits `booking:confirmed` with the **same key set** as `bookingConfirmedExample`, `bookingRef` matching `/^BR-[0-9A-F]{4}$/` and `ticketCount` equal to the number of seats. The ref generator is injected and stubbed, so the spec is deterministic. An empty or invalid `seats` shows an empty checkout and does not throw. The summary, through the custom element: shows a hold retained **before** the tag was defined; prices `seatHoldExample` as "2 tickets × €12 = €24"; Continue links to and asks for `booking.checkout` with `seatsParamExample`; follows picks and releases, with a disabled Continue for an empty hold; ignores a hold for another screening. `seats-param.spec.ts` round-trips `seatHoldExample.seats` and `seatsParamExample`. |
| loyalty | `nav-contribution` declares `points`. Emitting `bookingConfirmedExample` adds 20 points. The badge and the page read the same `PointsStore`. An event emitted **before** the store exists does not count (`replay: false`), even when it was retained. |
| account | `nav-contribution` declares `profile`. Renders the mock profile. |

Two more specs in every repo that has them:

- **`bootstrap()` defines exactly the exposed tags** (every remote). The spec
  imports the `exposes` keys from the repo's own `federation.config.mjs`,
  awaits `bootstrap()` twice, concurrently, before the assertions, and asserts
  `customElements.get(key)` for every key except `nav-contribution`.
  `bootstrap()` guards each `define` with `customElements.get` (jsdom throws
  on a second `define` of the same tag), so the tags and the app are created
  once per file. A remote whose app subscribes at start (loyalty) calls it in
  `beforeEach`, after `testing/setup.ts` has installed the bus.
- **`nav-intent.directive.spec.ts`** is copied together with the directive
  (shell, film, booking). It proves that an unresolved intent renders an
  inert link (`role="link"`, `aria-disabled`, no `href`), which the whole resilience table
  rests on.

## Contract matrix

| # | Contract | Producer side | Consumer side | Smoke | Walkthrough |
|---|---|---|---|---|---|
| 1 | Manifest | the checked-in dev manifest | shell loads it | every `remoteEntry.json` reachable; its `name` equals the manifest key | app loads |
| 2 | Exposed element | remote: bootstrap spec (exposed keys = defined tags); `nav-contribution.spec.ts`: every declared element and fragment is exposed (ADR-09) | shell: mounts the tag; fragment slot survives a rejected loader | every remote's `name` matches and it exposes `nav-contribution`; every exposed file returns HTTP 200 | pages and fragments render |
| 3 | `nav-contribution` | page owner: declares id + path | shell: routes + `nav:intents` from fixtures; caller: emits the exact id literal | every remote exposes `nav-contribution` | no `[nav]` warnings in the console |
| 4 | `routeParams` | caller: exact param names (booking's summary builds `seats`) | page: renders for given params; shell: writes `routeParams` | none | no `[nav]` warnings; pages show the right data |
| 5 | Bus channels | booking: `booking:confirmed` matches the example; seating: `seating:hold` matches `seatHoldExample`, including the empty holds | loyalty: consumes the example on a real bus; booking's summary: shows the example, ignores another screening | none | badge reaches 20; the summary fills and empties with the plan |
| 6 | Embedded fragment | film and booking: custom-element specs set the attribute literal (`film-id`, `screening-id`) and render | programme: asserts the tag and attribute literals per card; seating: asserts `mfe-booking-summary` with `screening-id` | none | each card shows film and Book; seating's page shows the summary (walkthrough step 1) |

**What nothing automated catches:** two copies of the same literal that
drift apart (an intent id, a param name, an event name, an example
payload, an embedded tag or attribute). Both sides' specs stay green against their own copy. No pull
request ever shows both copies, so no review catches it either. The
shell's `[nav]` warnings make id and param drift visible on navigation (a
drifted link just renders inert), and the
walkthrough is the only check for event and embed drift. A drifted embed
tag or attribute is the quietest: it renders nothing, exactly like an
absent remote. That is the honest cost of
copying contracts (ADR-03).

## Runtime smoke: `shell/scripts/smoke.mjs`

It lives in the shell because the shell owns the manifest. Plain Node, no
dependencies; it runs against the dev servers or a deployment.

1. Read `public/federation.manifest.json`, or a URL passed as an argument.
2. Fetch every `remoteEntry.json`. Fail if one cannot be reached, or if its
   `name` differs from its manifest key (a renamed federation name is the
   most likely polyrepo break).
3. Assert the exposes:
   - every remote exposes `nav-contribution`;
   - every exposed module's file URL returns HTTP 200 (catches a partial
     deploy).
4. Print a table with one line per remote.

## The remote-down / redeploy walkthrough (README script)

This is a manual demo script, and it is the clearest way to show
independence.

1. Start everything with `./start-all.sh`. The **Remotes** panel has all
   six ticked by default. Open the console: there are no `[nav]` or
   `[remote]` lines. Each programme card shows film's card and booking's
   Book link. Book two seats: booking's summary beside the plan follows
   each click (open **Events** to see `seating:hold`). Continue, go back
   to the same screening: the plan and the summary are both empty. Book
   again and watch the badge reach 20.
2. Stop `account`. Reload. The header account link disappears, and
   nothing else changes.
3. Change the profile text in `account`, then run `npm start` in `account`
   only. Reload (a hard reload if the browser cached `remoteEntry.json`; the
   shell fetches only the manifest with `no-cache`). The new text appears.
   No other repo was rebuilt, reinstalled or restarted.
4. Optional: stop `loyalty` and confirm a booking. It still confirms, the
   Points link and the badge are gone, and the producer never knew.
5. Untick `film` and Apply. The cards keep day, time and Book; the film
   area is empty. Tick it again, untick `booking` and Apply. There is no
   Book link, so the journey cannot start. Open `/seating/s-101` directly:
   the plan renders with no summary and no Continue. The console stays
   clean: a remote that is off logs nothing (ADR-12).
