import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { SpinnerComponent } from '@internal/ui';
import { RouteParams, sameRouteParams } from '@internal/events';
import { LOAD_REMOTE_SLICE } from '../env.config';

interface SliceRouteData {
  readonly remoteName: string;
  readonly element: string;
}

interface RemoteElement extends HTMLElement {
  routeParams?: RouteParams;
}

@Component({
  selector: 'app-remote-shell',
  imports: [SpinnerComponent],
  template: `
    <div #host></div>
    @if (error()) {
      <p role="alert" class="remote-shell__error">
        Failed to load <strong>{{ remoteName() }}</strong
        >. Please refresh.
      </p>
    } @else if (!loaded()) {
      <ts-spinner [label]="'Loading ' + remoteName() + '…'" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RemoteShellComponent implements AfterViewInit, OnDestroy {
  private readonly hostRef =
    viewChild.required<ElementRef<HTMLElement>>('host');
  private readonly loadRemoteSlice = inject(LOAD_REMOTE_SLICE);
  private readonly route = inject(ActivatedRoute);

  private paramSub?: Subscription;
  private applied?: RouteParams;

  protected readonly loaded = signal(false);
  protected readonly error = signal(false);
  protected readonly remoteName = signal<string>('');

  async ngAfterViewInit(): Promise<void> {
    const { remoteName, element } = this.route.snapshot.data as SliceRouteData;
    this.remoteName.set(remoteName);

    try {
      await this.loadRemoteSlice(remoteName, element);

      const el = document.createElement(element) as RemoteElement;
      this.hostRef().nativeElement.appendChild(el);

      // paramMap and queryParamMap emit synchronously on subscribe, so this
      // also drives the initial assignment. We forward all params under a
      // single `routeParams` property to avoid colliding with HTMLElement
      // intrinsics (`id`, `style`, `hidden`, …).
      this.paramSub = combineLatest([
        this.route.paramMap,
        this.route.queryParamMap,
      ]).subscribe(() => this.assignRouteParams(el));

      this.loaded.set(true);
    } catch (err) {
      console.error(`Failed to load remote ${remoteName}`, err);
      this.error.set(true);
    }
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }

  private assignRouteParams(el: RemoteElement): void {
    const next = buildRouteParams(this.route.snapshot);
    if (this.applied && sameRouteParams(this.applied, next)) return;
    el.routeParams = next;
    this.applied = next;
  }
}

const buildRouteParams = (snapshot: {
  paramMap: { keys: readonly string[]; getAll: (key: string) => string[] };
  queryParamMap: {
    keys: readonly string[];
    getAll: (key: string) => string[];
  };
}): RouteParams => {
  const out: Record<string, string | readonly string[]> = {};
  for (const key of snapshot.paramMap.keys) {
    const all = snapshot.paramMap.getAll(key);
    out[key] = all.length > 1 ? all : all[0];
  }
  for (const key of snapshot.queryParamMap.keys) {
    // Path params take precedence on name collision — the URL segment is
    // structurally part of the route, the query string is incidental.
    if (key in out) continue;
    const all = snapshot.queryParamMap.getAll(key);
    out[key] = all.length > 1 ? all : all[0];
  }
  return out;
};
