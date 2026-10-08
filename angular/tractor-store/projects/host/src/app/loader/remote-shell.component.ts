import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  resource,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, type ParamMap } from '@angular/router';
import {
  LOAD_REMOTE,
  type RouteParams,
  sameRouteParams,
  SpinnerComponent,
} from '@tractor-store/shared';

interface RemoteElement extends HTMLElement {
  routeParams?: RouteParams;
}

// Mounted by every remote route (see remote-routes.ts). `remoteName` and
// `element` are bound from the route data.
@Component({
  selector: 'app-remote-shell',
  imports: [SpinnerComponent],
  template: `
    <div #host></div>
    @if (remote.error()) {
      <p role="alert" class="remote-shell__error">
        Failed to load <strong>{{ remoteName() }}</strong
        >. Please refresh.
      </p>
    } @else if (remote.isLoading()) {
      <ts-spinner [label]="'Loading ' + remoteName() + '…'" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteShellComponent {
  readonly remoteName = input.required<string>();
  readonly element = input.required<string>();

  private readonly loadRemote = inject(LOAD_REMOTE);
  private readonly route = inject(ActivatedRoute);
  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');

  private readonly paramMap = toSignal(this.route.paramMap, {
    requireSync: true,
  });
  private readonly queryParamMap = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  // The custom element only sees a new object when a value actually changed.
  private readonly routeParams = computed(
    () => toRouteParams(this.paramMap(), this.queryParamMap()),
    { equal: sameRouteParams },
  );

  protected readonly remote = resource({
    params: () => ({ remoteName: this.remoteName(), element: this.element() }),
    loader: async ({ params: { remoteName, element } }) => {
      try {
        await this.loadRemote(remoteName, element);
      } catch (err) {
        console.error(`Failed to load remote ${remoteName}`, err);
        throw err;
      }
      return document.createElement(element) as RemoteElement;
    },
  });

  constructor() {
    effect(() => {
      if (!this.remote.hasValue()) return;
      const el = this.remote.value();
      el.routeParams = this.routeParams();
      if (!el.isConnected) this.host().nativeElement.appendChild(el);
    });
  }
}

const toRouteParams = (params: ParamMap, query: ParamMap): RouteParams => {
  const out: Record<string, string | readonly string[]> = {};
  // Query first, so path params win on a name collision.
  for (const map of [query, params]) {
    for (const key of map.keys) {
      const all = map.getAll(key);
      out[key] = all.length > 1 ? all : all[0];
    }
  }
  return out;
};
