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

**A fresh, real event bus per test.** Every repo has
`src/testing/setup.ts`, copied from
[`tractor-store/projects/host/src/testing/setup.ts`](../../tractor-store/projects/host/src/testing/setup.ts),
listed in the `angular.json` test target's `setupFiles`:

```ts
beforeEach(() => {
  window.__NF_REGISTRY__ = createRegistry({ maxStreams: 20, maxEvents: 1 })();
});
```

Specs emit and observe through the real registry from
`@softarc/native-federation-orchestrator/registry`, so replay and `onReady`
behave as in the browser. Every repo therefore has the orchestrator in its
`package.json` (ADR-08). There is no fake registry, and standalone
`main.ts` never imports anything from `src/testing/`.

The spec names map onto the "pattern it demonstrates" column in the
[README](../README.md#mfe-catalogue).

| Repo | Specs |
|---|---|
| shell | Builds routes from contributions. **Survives a rejected contribution** (`allSettled`). Resolves intents to URLs, and **warns** on an unknown id or a missing param. Unknown URLs redirect to `programme`. Mounts the tag and writes `routeParams`. A fragment slot **renders empty when the loader rejects** (stub loader). |
| programme | `nav-contribution` declares `list` with path `''`. Rows link to `film.detail {filmId}` and `seating.plan {screeningId}`: the spec asserts those exact id and param-name literals. |
| film | `nav-contribution` declares `detail` with path `{filmId}`. Renders the film for `routeParams = { filmId }`. An unknown id shows "not found". |
| seating | `nav-contribution` declares `plan` with path `{screeningId}`. Renders taken seats deterministically for `screeningId`. Toggling A2 then A1 and pressing "Continue" emits `nav:navigate` with id `booking.checkout` and payload `{ screeningId, seats: seatsParamExample }` (`'A1,A2'`, sorted). "Continue" is disabled with no seats held. |
| booking | `nav-contribution` declares `checkout` with path `{screeningId}/{seats}`. Given `routeParams` with the decoded `seatsParamExample`, shows 2 tickets and €24. "Confirm" emits `booking:confirmed` with the **same key set** as `bookingConfirmedExample`, `bookingRef` matching `/^BR-[0-9A-F]{4}$/` and `ticketCount` equal to the number of seats. The ref generator is injected and stubbed, so the spec is deterministic. An empty or invalid `seats` shows an empty checkout and does not throw. |
| loyalty | `nav-contribution` declares `points`. Emitting `bookingConfirmedExample` adds 20 points. The badge and the page read the same `PointsStore`. An event emitted **before** the store exists does not count (`replay: 0`). |
| notifications | `nav-contribution` declares no intents. Emitting `bookingConfirmedExample` shows a toast containing the `bookingRef`. It disappears after 3 s (fake timers). |
| account | `nav-contribution` declares `profile`. Renders the mock profile. |

Two more specs in every repo that has them:

- **`bootstrap()` defines exactly the exposed tags** (every remote). The spec
  imports the `exposes` keys from the repo's own `federation.config.mjs`,
  calls `bootstrap()` once in `beforeAll`, and asserts
  `customElements.get(key)` for every key except `nav-contribution`. jsdom
  throws on a second `define` of the same tag in one worker, so tags are
  registered once per spec file.
- **`nav-intent.directive.spec.ts`** is copied together with the directive
  (shell, programme, film). It proves that an unresolved intent renders an
  inert link (`aria-disabled`, no `href`), which the whole resilience table
  rests on.

## Contract matrix

| # | Contract | Producer side | Consumer side | Smoke | Walkthrough |
|---|---|---|---|---|---|
| 1 | Manifest | the checked-in dev manifest | shell loads it | every `remoteEntry.json` reachable; its `name` equals the manifest key | app loads |
| 2 | Exposed element | remote: bootstrap spec (exposed keys = defined tags) | shell: mounts the tag; fragment slot survives a rejected loader | the two fragment tags exposed; every exposed file returns HTTP 200 | pages and fragments render |
| 3 | `nav-contribution` | page owner: declares id + path | shell: routes + resolver from fixtures; caller: emits the exact id literal | every remote exposes `nav-contribution` | no `[nav]` warnings in the console |
| 4 | `routeParams` | caller: exact param names (and sorted `seats`) | page: renders for given params; shell: writes `routeParams` | none | no `[nav]` warnings; pages show the right data |
| 5 | Bus events | booking: payload matches the example | loyalty, notifications: consume the example on a real bus | none | badge reaches 20, toast shows the ref |

**What nothing automated catches:** two copies of the same literal that
drift apart (an intent id, a param name, an event name, an example
payload). Both sides' specs stay green against their own copy. No pull
request ever shows both copies, so no review catches it either. The
resolver's `[nav]` warnings make id and param drift visible, and the
walkthrough is the only check for event drift. That is the honest cost of
copying contracts (ADR-03).

## Runtime smoke: `shell/scripts/smoke.mjs`

It lives in the shell because the shell owns the manifest. Plain Node, no
dependencies; it runs against the dev servers or a deployment.

1. Read `public/federation.manifest.json`, or a URL passed as an argument.
2. Fetch every `remoteEntry.json`. Fail if one cannot be reached, or if its
   `name` differs from its manifest key (a renamed federation name is the
   most likely polyrepo break).
3. Assert the exposes:
   - every remote exposes `nav-contribution` (notifications' has no
     intents, see architecture.md § A remote);
   - `@cinema/loyalty` exposes `mfe-loyalty-badge` and
     `@cinema/notifications` exposes `mfe-notifications-toast` (the two tags
     the shell's layout hard-codes);
   - every exposed module's file URL returns HTTP 200 (catches a partial
     deploy).
4. Print a table with one line per remote.

## The remote-down / redeploy walkthrough (README script)

This is a manual demo script, and it is the clearest way to show
independence.

1. Start everything with `./start-all.sh`. Open the console: there are no
   `[nav]` warnings. Book two seats and watch the toast and the badge
   reach 20.
2. Stop `account`. Reload. The header account link turns inert, and
   nothing else changes.
3. Change the profile text in `account`, then run `npm start` in `account`
   only. Reload (a hard reload if the browser cached `remoteEntry.json`; the
   shell fetches only the manifest with `no-cache`). The new text appears.
   No other repo was rebuilt, reinstalled or restarted.
4. Optional: stop `loyalty` and confirm a booking. The toast still appears,
   the badge slot is empty, and the producer never knew.
