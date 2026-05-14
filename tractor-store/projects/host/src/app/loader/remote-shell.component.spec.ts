import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  convertToParamMap,
  ParamMap,
} from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { LoadRemoteSlice } from '@internal/federation';
import { RemoteShellComponent } from './remote-shell.component';
import { LOAD_REMOTE_SLICE } from '../env.config';

interface RouteFixture {
  readonly route: Partial<ActivatedRoute>;
  setParams(params: Record<string, string>): void;
  setQuery(params: Record<string, string | string[]>): void;
}

const flush = async () => {
  // Two microtask drains: one for the await in ngAfterViewInit, one for any
  // follow-up subscription work.
  await Promise.resolve();
  await Promise.resolve();
};

const buildRoute = (
  remoteName: string,
  element: string,
  initialParams: Record<string, string> = {},
  initialQuery: Record<string, string | string[]> = {},
): RouteFixture => {
  const params$ = new BehaviorSubject<ParamMap>(
    convertToParamMap(initialParams),
  );
  const query$ = new BehaviorSubject<ParamMap>(
    convertToParamMap(initialQuery),
  );

  const snapshot = {
    data: { remoteName, element },
    get paramMap() {
      return params$.value;
    },
    get queryParamMap() {
      return query$.value;
    },
  } as unknown as ActivatedRouteSnapshot;

  const route: Partial<ActivatedRoute> = {
    snapshot,
    paramMap: params$.asObservable(),
    queryParamMap: query$.asObservable(),
  };

  return {
    route,
    setParams(params) {
      params$.next(convertToParamMap(params));
    },
    setQuery(params) {
      query$.next(convertToParamMap(params));
    },
  };
};

const setup = (opts: {
  remoteName: string;
  element: string;
  loadRemoteSlice?: LoadRemoteSlice;
  initialParams?: Record<string, string>;
  initialQuery?: Record<string, string | string[]>;
}) => {
  const loader: LoadRemoteSlice =
    opts.loadRemoteSlice ?? (vi.fn(async () => {}) as LoadRemoteSlice);
  const fixture = buildRoute(
    opts.remoteName,
    opts.element,
    opts.initialParams,
    opts.initialQuery,
  );

  TestBed.configureTestingModule({
    imports: [RemoteShellComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: LOAD_REMOTE_SLICE, useValue: loader },
      { provide: ActivatedRoute, useValue: fixture.route },
    ],
  });

  const cmp = TestBed.createComponent(RemoteShellComponent);
  return { cmp, loader, route: fixture };
};

describe('RemoteShellComponent', () => {
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
    TestBed.resetTestingModule();
  });

  it('loads the configured remote slice and appends its custom element', async () => {
    const loadRemoteSlice = vi.fn(async () => {});
    const { cmp } = setup({
      remoteName: '@x/explore',
      element: 'mfe-explore-home',
      loadRemoteSlice,
    });

    cmp.detectChanges();
    await flush();
    cmp.detectChanges();

    expect(loadRemoteSlice).toHaveBeenCalledWith(
      '@x/explore',
      'mfe-explore-home',
    );
    const host = cmp.nativeElement.querySelector('div');
    expect(host?.firstElementChild?.tagName.toLowerCase()).toBe(
      'mfe-explore-home',
    );
  });

  it('hides the spinner once the remote is loaded', async () => {
    const { cmp } = setup({
      remoteName: '@x/explore',
      element: 'mfe-explore-home',
    });

    cmp.detectChanges();
    expect(cmp.nativeElement.querySelector('ts-spinner')).not.toBeNull();

    await flush();
    cmp.detectChanges();

    expect(cmp.nativeElement.querySelector('ts-spinner')).toBeNull();
  });

  it('renders an alert when the slice fails to load', async () => {
    const loadRemoteSlice = vi.fn(async () => {
      throw new Error('boom');
    });
    const { cmp } = setup({
      remoteName: '@x/decide',
      element: 'mfe-decide-product',
      loadRemoteSlice,
    });

    cmp.detectChanges();
    await flush();
    cmp.detectChanges();

    const alert = cmp.nativeElement.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain('@x/decide');
    expect(consoleError).toHaveBeenCalled();
  });

  it('forwards initial route params under a single routeParams property', async () => {
    const { cmp } = setup({
      remoteName: '@x/decide',
      element: 'mfe-decide-product',
      initialParams: { id: 'CL-01' },
      initialQuery: { size: 'M' },
    });

    cmp.detectChanges();
    await flush();
    cmp.detectChanges();

    const el = cmp.nativeElement.querySelector(
      'mfe-decide-product',
    ) as HTMLElement & { routeParams?: Record<string, unknown> };
    expect(el.routeParams).toEqual({ id: 'CL-01', size: 'M' });
  });

  it('lets path params win over collisions with query params', async () => {
    const { cmp } = setup({
      remoteName: '@x/decide',
      element: 'mfe-decide-product',
      initialParams: { id: 'PATH' },
      initialQuery: { id: 'QUERY' },
    });

    cmp.detectChanges();
    await flush();
    cmp.detectChanges();

    const el = cmp.nativeElement.querySelector(
      'mfe-decide-product',
    ) as HTMLElement & { routeParams?: Record<string, unknown> };
    expect(el.routeParams).toEqual({ id: 'PATH' });
  });

  it('does not reassign routeParams when the value is structurally unchanged', async () => {
    const { cmp, route } = setup({
      remoteName: '@x/decide',
      element: 'mfe-decide-product',
      initialParams: { id: 'CL-01' },
    });

    cmp.detectChanges();
    await flush();
    cmp.detectChanges();

    const el = cmp.nativeElement.querySelector(
      'mfe-decide-product',
    ) as HTMLElement & { routeParams?: Record<string, unknown> };

    const first = el.routeParams;
    route.setParams({ id: 'CL-01' });
    cmp.detectChanges();

    expect(el.routeParams).toBe(first);
  });

  it('reassigns routeParams when a param changes', async () => {
    const { cmp, route } = setup({
      remoteName: '@x/decide',
      element: 'mfe-decide-product',
      initialParams: { id: 'CL-01' },
    });

    cmp.detectChanges();
    await flush();
    cmp.detectChanges();

    const el = cmp.nativeElement.querySelector(
      'mfe-decide-product',
    ) as HTMLElement & { routeParams?: Record<string, unknown> };

    route.setParams({ id: 'CL-02' });
    cmp.detectChanges();

    expect(el.routeParams).toEqual({ id: 'CL-02' });
  });
});
