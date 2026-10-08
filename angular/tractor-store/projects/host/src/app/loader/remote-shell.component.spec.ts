import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  type ParamMap,
} from '@angular/router';
import { LOAD_REMOTE, type LoadRemote } from '@tractor-store/shared';
import { BehaviorSubject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RemoteShellComponent } from './remote-shell.component';

type RemoteElement = HTMLElement & { routeParams?: Record<string, unknown> };

const setup = async (opts: {
  remoteName?: string;
  element?: string;
  loadRemote?: LoadRemote;
  params?: Record<string, string>;
  query?: Record<string, string | string[]>;
}) => {
  const { remoteName = '@x/decide', element = 'mfe-decide-product' } = opts;
  const loadRemote = opts.loadRemote ?? vi.fn<LoadRemote>(async () => {});
  // ActivatedRoute's param maps are BehaviorSubject-like: they emit on subscribe.
  const params$ = new BehaviorSubject<ParamMap>(
    convertToParamMap(opts.params ?? {}),
  );
  const query$ = new BehaviorSubject<ParamMap>(
    convertToParamMap(opts.query ?? {}),
  );

  TestBed.configureTestingModule({
    imports: [RemoteShellComponent],
    providers: [
      { provide: LOAD_REMOTE, useValue: loadRemote },
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: params$.asObservable(),
          queryParamMap: query$.asObservable(),
        },
      },
    ],
  });

  const fixture = TestBed.createComponent(RemoteShellComponent);
  fixture.componentRef.setInput('remoteName', remoteName);
  fixture.componentRef.setInput('element', element);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  const root = fixture.nativeElement as HTMLElement;
  return {
    fixture,
    root,
    loadRemote,
    mounted: () => root.querySelector(element) as RemoteElement | null,
    setParams: async (p: Record<string, string>) => {
      params$.next(convertToParamMap(p));
      fixture.detectChanges();
      await fixture.whenStable();
    },
  };
};

describe('RemoteShellComponent', () => {
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => consoleError.mockRestore());

  it('loads the remote element and mounts it', async () => {
    const { loadRemote, mounted } = await setup({
      remoteName: '@x/explore',
      element: 'mfe-explore-home',
    });
    expect(loadRemote).toHaveBeenCalledWith('@x/explore', 'mfe-explore-home');
    expect(mounted()).not.toBeNull();
  });

  it('shows a spinner only while loading', async () => {
    let resolve!: () => void;
    const pending = new Promise<void>((r) => (resolve = r));
    TestBed.configureTestingModule({
      imports: [RemoteShellComponent],
      providers: [
        { provide: LOAD_REMOTE, useValue: () => pending },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: new BehaviorSubject(convertToParamMap({})),
            queryParamMap: new BehaviorSubject(convertToParamMap({})),
          },
        },
      ],
    });
    const fixture = TestBed.createComponent(RemoteShellComponent);
    fixture.componentRef.setInput('remoteName', '@x/explore');
    fixture.componentRef.setInput('element', 'mfe-explore-home');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ts-spinner')).not.toBeNull();

    resolve();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ts-spinner')).toBeNull();
  });

  it('renders an alert when the remote fails to load', async () => {
    const { root, mounted } = await setup({
      loadRemote: async () => {
        throw new Error('boom');
      },
    });
    expect(root.querySelector('[role="alert"]')?.textContent).toContain(
      '@x/decide',
    );
    expect(mounted()).toBeNull();
    expect(consoleError).toHaveBeenCalled();
  });

  it('passes path and query params as one routeParams property', async () => {
    const { mounted } = await setup({
      params: { id: 'CL-01' },
      query: { size: 'M' },
    });
    expect(mounted()?.routeParams).toEqual({ id: 'CL-01', size: 'M' });
  });

  it('lets path params win over query params with the same name', async () => {
    const { mounted } = await setup({
      params: { id: 'PATH' },
      query: { id: 'QUERY' },
    });
    expect(mounted()?.routeParams).toEqual({ id: 'PATH' });
  });

  it('keeps multi-value query params as arrays', async () => {
    const { mounted } = await setup({ query: { tag: ['a', 'b'] } });
    expect(mounted()?.routeParams).toEqual({ tag: ['a', 'b'] });
  });

  it('does not reassign routeParams when nothing changed', async () => {
    const { mounted, setParams } = await setup({ params: { id: 'CL-01' } });
    const first = mounted()?.routeParams;
    await setParams({ id: 'CL-01' });
    expect(mounted()?.routeParams).toBe(first);
  });

  it('reassigns routeParams when a param changes', async () => {
    const { mounted, setParams } = await setup({ params: { id: 'CL-01' } });
    await setParams({ id: 'CL-02' });
    expect(mounted()?.routeParams).toEqual({ id: 'CL-02' });
  });
});
