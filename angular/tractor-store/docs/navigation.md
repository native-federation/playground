# Navigation

The Tractor Store has *one* router (in the host) and *zero* hard-coded
cross-team URLs in the remotes. A click in `decide` that should land
on the cart never mentions `/checkout/cart` — it emits the **intent**
`checkout.cart` and lets the host figure out the URL.

This document walks through how that works, why the intent system is
the load-bearing piece of the host/remote decoupling, and how a click
in one remote becomes a route activation in another.

## The problem with the obvious solutions

In a naïve micro-frontend setup, remote A linking to remote B picks
one of two bad options:

- **Hard-code the URL.** Now A breaks every time B reorganises its
  routes, and renaming `/checkout` becomes a coordinated multi-team
  migration.
- **Import B's routing module.** Now A and B are build-time coupled,
  share a router instance, and can't deploy independently.

Both options leak B's URL scheme into A. The intent system removes
the leak entirely by letting each remote keep ownership of its URLs
while exposing a stable, public name (the intent) to the rest of the
world.

If you're familiar with Android's deep-link Intents, the model is the
same: the caller names *what* it wants to reach, the platform decides
*where* that lives.

## The contract: `nav-contribution`

Each remote *exposes* (via `federation.config.mjs`) a
`nav-contribution` module. It is a single object describing what the
remote routes (`projects/explore/src/core/nav-contribution.ts`):

```ts
export const navContribution: NavContribution = {
  basePath: 'explore',
  intents: [
    { id: 'home',              path: '/',                    element: 'mfe-home' },
    { id: 'products',          path: '/products',            element: 'mfe-category' },
    { id: 'products.category', path: '/products/{category}', element: 'mfe-category' },
    { id: 'stores',            path: '/stores',              element: 'mfe-stores' },
  ],
};
```

The shape (`libs/shared/src/nav/contribution.ts`) carries no remote
name; the host already knows it from the manifest key:

- `basePath` — the URL prefix the host will mount the remote under
  (`/explore`, `/decide`, `/checkout`).
- `intents[]` — every routable destination the remote owns:
  - `id` — the public name *relative to the remote*. The host prepends
    `basePath` when it registers each intent, so `explore`'s
    `{ id: 'home' }` becomes the public `explore.home`. Other remotes
    link to the full ID, never to a URL.
  - `path` — the path *inside* `basePath`, with optional `{param}`
    segments (RFC 6570 URI Template syntax — the host's `toRoutePath`
    converts these to Angular's `:param` form when registering routes,
    so the contribution stays framework-neutral).
  - `element` — the `mfe-*` custom element to render at that path.

The full intent ID is the only thing that crosses team boundaries.
URLs and element tags are an implementation detail of the owning
team.

## Boot-time wiring

When the host starts, it loads every remote's `nav-contribution` in
parallel and uses them to build its router config and an _intent map_.

Two names to keep apart: `window.__NF_REGISTRY__` is _the event bus_
(see [architecture.md](./architecture.md#2-the-event-bus-window__nf_registry__));
the host's table of public intent ID → `{ basePath, path }` is _the
intent map_ (`IntentMap` / `IntentTarget` in
`libs/shared/src/nav/contribution.ts`).

The orchestration
(`projects/host/src/app/nav/remote-navigation.ts`) is small enough to
read in full:

```ts
export const provideRemoteNavigation = (
  nf: NativeFederationResult,
  manifest: FederationManifest,
  fallbackRedirect = 'explore',
): EnvironmentProviders =>
  provideAppInitializer(async () => {
    const router = inject(Router);
    const loaded = await loadContributions(nf, manifest);
    const intents = buildIntentMap(loaded);

    navIntents.publish(intents);
    navigateTo.on(({ id, payload }) => {
      const target = intents.get(id);
      if (!target) {
        console.error(`[nav] unknown intent "${id}"`);
        return;
      }
      try {
        void router.navigateByUrl(resolveIntentUrl(target, payload));
      } catch (err) {
        console.error(
          `[nav] cannot navigate to intent "${id}": ${(err as Error).message}`,
        );
      }
    });

    router.resetConfig([
      ...buildRemoteRoutes(loaded),
      { path: '**', redirectTo: fallbackRedirect },
    ]);
  });
```

It does five things:

1. **Loads contributions.** `loadContributions` (`projects/host/src/app/nav/load-contributions.ts`)
   uses `Promise.allSettled` so a broken remote does not break the
   whole shell — it just disappears from the intent map with a
   console warning.
2. **Builds the intent map.** `buildIntentMap` (same file) prefixes
   each intent ID with its contribution's `basePath` and warns about
   duplicates. It is a plain function with no Angular dependency, so it
   is trivially unit-testable.
3. **Publishes the intent map on `nav:intents`.** The channel is a
   resource, so a `NavigateToDirective` that renders later still gets
   the map synchronously. The directive uses it to render real `href`
   attributes on anchor tags (so middle-click, "copy link", and
   screen-reader URL announcements work).
4. **Subscribes to `nav:navigate`** and listens for click intents.
   Every `[appNavigateTo]` click in any remote lands here, is resolved
   by `resolveIntentUrl`, and finally hits the Router.
5. **Resets the Angular Router config** with one route per intent
   that has an `element`. Every route lazy-loads the same
   `RemoteShellComponent`; only the route data differs
   (`projects/host/src/app/nav/remote-routes.ts`):

   ```ts
   routes.push({
     path: toRoutePath(contribution.basePath, intent.path),
     loadComponent: loadRemoteShell,
     data: { remoteName, element: intent.element },
   });
   ```

Because all of this runs in one `provideAppInitializer`, by the time
the user sees the first frame the intent map is published and routing
is wired.

## The intent map as a hub

```mermaid
flowchart TB
    Reg[("Intent map<br/>(intent ID → URL template)")]

    subgraph Contributions["Boot-time: contributions in"]
        EC[explore<br/>nav-contribution]
        DC[decide<br/>nav-contribution]
        CC[checkout<br/>nav-contribution]
    end

    subgraph Resolution["Run-time: intents in, URLs out"]
        EL["[appNavigateTo]<br/>in explore"]
        DL["[appNavigateTo]<br/>in decide"]
        CL["[appNavigateTo]<br/>in checkout"]
    end

    EC --> Reg
    DC --> Reg
    CC --> Reg

    Reg -- "nav:intents resource<br/>(rendering real href)" --> EL
    Reg -- "nav:intents resource" --> DL
    Reg -- "nav:intents resource" --> CL

    EL -- "emits 'nav:navigate'" --> Reg
    DL -- "emits 'nav:navigate'" --> Reg
    CL -- "emits 'nav:navigate'" --> Reg
    Reg -- "Router.navigateByUrl" --> Router((Angular<br/>Router))
```

Contributions flow into the intent map once, at startup. The host
then publishes it to the remotes so their directives can render real
anchors. After that, every click in every remote routes through the
single host-owned listener. Remotes only ever speak the public intent
ID; they read the map but never change it.

## Linking from a remote: `[appNavigateTo]`

Remotes never type a URL and never inject `Router`. They use a
directive shipped from `@tractor-store/shared`:

```html
<a [appNavigateTo]="'checkout.cart'">Cart</a>

<button
  [appNavigateTo]="'decide.product'"
  [navPayload]="{ id: product.id }">
  See details
</button>
```

The directive
(`libs/shared/src/nav/navigate-to.directive.ts`) does three
things on top of "emit on click":

```ts
@Directive({
  selector: '[appNavigateTo]',
  host: {
    '[attr.href]': 'href()',
    '[attr.aria-disabled]': 'url() === null ? "true" : null',
    '(click)': 'onClick($event)',
  },
})
export class NavigateToDirective {
  readonly appNavigateTo = input.required<string>();
  readonly navPayload = input<NavPayload>({});

  // 1. Receives the intent map from the nav:intents resource.
  private readonly intents = signal<IntentMap>(new Map());

  // 2. Resolves the intent + payload to a real URL (path and query).
  protected readonly url = computed(() => { /* resolveIntentUrl(…) or null */ });

  // 3. Binds the URL to [attr.href] on anchors so href-y features work.
  protected readonly href = computed(() => (this.isAnchor ? this.url() : null));

  constructor() {
    listenTo(navIntents, (intents) => this.intents.set(intents));
  }

  protected onClick(event: MouseEvent): void {
    // Leave new-tab and new-window clicks on real links to the browser.
    if (this.isAnchor && isModifiedClick(event)) return;

    const id = this.appNavigateTo();
    // … return if the intent is unknown or a path param is missing …
    event.preventDefault();
    navigateTo.emit({ id, payload: this.navPayload() });
  }
}
```

That listener-side resolution is what makes anchors behave naturally.
A plain left-click is intercepted and converted into a `nav:navigate`
event (no full reload). A middle-click, `Ctrl+click`, or "Copy link
address" is *not* intercepted — the real `href` is on the element, so
the browser does the right thing.

A `[appNavigateTo]` to an unknown intent emits nothing, and the
element gets `aria-disabled="true"` so it is announced as unavailable
(it stays visible). A subscriber-side mistake — an unknown intent
making it to the host — is logged by the host listener:
`[nav] unknown intent "…"`. A half-deployed system fails *visibly in
the console* rather than silently in the URL bar.

## Reading params on the receiving end

Once the host's route activates, `RemoteShellComponent` mounts the
right custom element and writes a `routeParams` object onto it. The
remote component reads it through Angular's component-input binding:

```ts
// projects/decide/src/features/product/product.page.ts
readonly routeParams = input<RouteParams>({});

readonly id  = computed(() => param(this.routeParams(), 'id'));
readonly sku = computed(() => param(this.routeParams(), 'sku'));
```

`param`, `requiredParam`, `paramList`, and `sameRouteParams` are tiny
helpers from `libs/shared/src/nav/route-params.ts`. They handle the
single-value-vs-array shape (multi-value query params come through as
arrays) and throw helpful errors for missing required params.

## End-to-end: a click in `decide` becomes a URL change

```mermaid
sequenceDiagram
    participant U as User
    participant DV as decide button<br/>([appNavigateTo]="checkout.cart")
    participant ND as NavigateToDirective<br/>(@tractor-store/shared)
    participant Bus as window.__NF_REGISTRY__<br/>("nav:navigate" channel)
    participant SN as provideRemoteNavigation<br/>(host listener)
    participant AR as Angular Router (host)
    participant RS as RemoteShellComponent
    participant SL as createRemoteLoader
    participant CC as <mfe-cart>

    U->>DV: click (left, no modifier)
    DV->>ND: onClick(event)
    ND->>ND: url() = '/checkout/cart' (from nav:intents)
    ND->>Bus: emit('nav:navigate', {id: 'checkout.cart'})
    Bus->>SN: deliver event (via navigateTo.on)
    SN->>SN: resolveIntentUrl(intents.get('checkout.cart')) → '/checkout/cart'
    SN->>AR: navigateByUrl('/checkout/cart')
    AR->>RS: activate route, inputs: {remoteName, element: 'mfe-cart'}
    RS->>SL: loadRemote('@tractor-store/checkout', 'mfe-cart')
    SL-->>RS: resolved
    RS->>CC: createElement + el.routeParams = {…}
```

Notice what *isn't* in the diagram: no import from `decide` to
`checkout`, no shared `Router` instance, no string `'/checkout/cart'`
typed anywhere inside `decide`'s code. The only thing crossing the
boundary is the literal `'checkout.cart'`.

## Programmatic navigation: emit directly

`[appNavigateTo]` is for templates. From TypeScript, a remote
navigates by importing the same channel handle and emitting through
it:

```ts
// projects/checkout/src/features/checkout/checkout.page.ts
import { navigateTo } from '@tractor-store/shared';

onSubmit(event: Event): void {
  event.preventDefault();
  if (!this.isReady()) return;
  this.cart.clear();
  navigateTo.emit({ id: 'checkout.thanks' });
}
```

This is the same channel the directive uses, so any future
intent-related feature (param validation, deep-link auditing,
analytics) only needs to be added once at the host listener.

## Resolving params and query strings

Two kinds of parameters can travel with an intent:

- **Path params** — placeholders in the intent's `path`, e.g.
  `/product/{id}`. They are filled in from `navPayload`.
- **Query params** — anything in `navPayload` that wasn't consumed by
  a placeholder gets appended as a query string.

The split happens in `resolveIntentUrl`
(`libs/shared/src/nav/intent-url.ts`):

```ts
export const resolveIntentUrl = (
  target: IntentTarget,
  payload: NavPayload = {},
): string => {
  const path = joinPath(target.basePath, resolveTemplate(target.path, payload));
  const pathParams = new Set(splitIntentParams(target.path));
  const query = Object.fromEntries(
    Object.entries(payload).filter(([key]) => !pathParams.has(key)),
  );
  return appendQueryString(path, query);
};
```

So an emit like

```ts
navigateTo.emit({
  id: 'decide.product',
  payload: { id: '123', sku: 'BLUE-XL' },
});
```

with the contribution `{ id: 'product', path: '/product/{id}', element: 'mfe-product' }`
resolves to `/decide/product/123?sku=BLUE-XL`. The remote then reads
`id` and `sku` off `routeParams` on its custom element.

`joinPath`, `resolveTemplate`, `splitIntentParams`, and
`appendQueryString` are internal helpers in `libs/shared/src/nav/`
(`path-template.ts`, `query.ts`). `resolveIntentUrl` is shared because
both the host (navigating) and the directive (rendering anchors) need
to apply the *same* template logic — so an anchor's `href` includes
the query string too.

## What this design buys you

Several payoffs fall out of the design:

- **Independent deploys.** A team can rename `/checkout/cart` to
  `/cart` by editing one path in their own `nav-contribution.ts`. No
  other remote needs to know — `checkout.cart` still resolves, just
  to a different URL.
- **No router import in remotes.** Remotes don't depend on
  `@angular/router` for navigation. The directive ships in a small
  shared library; the actual Router lives only in the host.
- **The host owns zero remote-specific knowledge.** It iterates over
  the contributions it loaded and builds routes generically — there
  is no `if (remoteName === 'checkout')` anywhere in the host code.
- **Testable in isolation.** Each remote runs standalone on its own
  port with the same `federation.manifest.json`. When `decide` boots
  on `:4202` it loads `mfe-header` from `:4201` (explore) and
  `mfe-add-to-cart` from `:4203` (checkout) just like the host would.
- **Standards-friendly.** All cross-app messaging goes through one
  tiny global (`window.__NF_REGISTRY__`). The bus is plain pub/sub;
  the only Angular-specific piece, `NavigateToDirective`, is ~70
  lines.

The intent system is what turns "three Angular apps loaded into one
page" into "three independently-evolving products that happen to
share a shell".

## See also

- [Architecture](./architecture.md) — the runtime and custom-element
  bridge that the navigation layer rides on top of.
- [Features](./features.md) — the full list of intents per team.
