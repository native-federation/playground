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
import type { RouteParams } from '../contracts';
import { LOAD_REMOTE } from '../shared/remote-element';

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
      <p role="alert">
        Failed to load <strong>{{ remoteName() }}</strong>. Please refresh.
      </p>
    } @else if (remote.isLoading()) {
      <p role="status">Loading {{ remoteName() }}…</p>
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
  // The custom element only sees a new object when a value actually changed.
  private readonly routeParams = computed(
    () => toRouteParams(this.paramMap()),
    { equal: (a, b) => JSON.stringify(a) === JSON.stringify(b) },
  );

  protected readonly remote = resource({
    params: () => ({ remoteName: this.remoteName(), element: this.element() }),
    loader: async ({ params: { remoteName, element } }) => {
      try {
        await this.loadRemote(remoteName, element);
      } catch (err) {
        // The template only shows that it failed; keep the cause for developers.
        console.error(
          `[remote] failed to load <${element}> from "${remoteName}"`,
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

const toRouteParams = (params: ParamMap): RouteParams =>
  Object.fromEntries(params.keys.map((key) => [key, params.get(key)!]));
