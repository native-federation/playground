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
import type { RouteParams } from '@tractor-store/contracts';
import { LOAD_REMOTE } from './load-remote';

interface RemoteElement extends HTMLElement {
  routeParams?: RouteParams;
}

// Mounted by every remote route (see navigation.ts). `remoteName` and
// `element` are bound from the route data.
@Component({
  selector: 'app-remote-shell',
  template: `
    <div #host></div>
    @if (remote.error()) {
      <p role="alert" class="remote-shell__error">
        Failed to load <strong>{{ remoteName() }}</strong
        >. Please refresh.
      </p>
    } @else if (remote.isLoading()) {
      <div class="spinner" role="status" [attr.aria-label]="loadingLabel()">
        <span class="spinner__circle" aria-hidden="true"></span>
        <span class="spinner__label">{{ loadingLabel() }}</span>
      </div>
    }
  `,
  styles: `
    .spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 4rem 1rem;
      min-height: 50vh;
      color: #ff5a55;
    }

    .spinner__circle {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(255, 90, 85, 0.15);
      border-top-color: #ff5a55;
      border-radius: 50%;
      animation: spinner-spin 0.8s linear infinite;
    }

    .spinner__label {
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.85;
    }

    @keyframes spinner-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .spinner__circle {
        animation-duration: 2.4s;
      }
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
    { equal: (a, b) => JSON.stringify(a) === JSON.stringify(b) },
  );

  protected readonly loadingLabel = computed(
    () => `Loading ${this.remoteName()}…`,
  );

  protected readonly remote = resource({
    params: () => ({ remoteName: this.remoteName(), element: this.element() }),
    loader: async ({ params: { remoteName, element } }) => {
      try {
        await this.loadRemote(remoteName, element);
      } catch (err) {
        // The template only shows that it failed; keep the cause for developers.
        console.error(
          `[host] failed to load <${element}> from "${remoteName}"`,
          err,
        );
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
