import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  type ParamMap,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { LOAD_REMOTE } from '../shared/remote-element';
import { RemoteShellComponent } from './remote-shell.component';

type LoadRemote = (remoteName: string, element: string) => Promise<void>;

type RemoteElement = HTMLElement & { routeParams?: Record<string, unknown> };

const setup = async (opts: {
  remoteName?: string;
  element?: string;
  loadRemote?: LoadRemote;
  params?: Record<string, string>;
}) => {
  const { remoteName = '@cinema/seating', element = 'mfe-seating-plan' } = opts;
  const loadRemote = opts.loadRemote ?? vi.fn<LoadRemote>(async () => {});
  // ActivatedRoute's param maps are BehaviorSubject-like: they emit on subscribe.
  const params$ = new BehaviorSubject<ParamMap>(
    convertToParamMap(opts.params ?? {}),
  );

  TestBed.configureTestingModule({
    imports: [RemoteShellComponent],
    providers: [
      { provide: LOAD_REMOTE, useValue: loadRemote },
      {
        provide: ActivatedRoute,
        useValue: { paramMap: params$.asObservable() },
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
  it('loads the remote element and mounts it', async () => {
    const { loadRemote, mounted } = await setup({
      remoteName: '@cinema/programme',
      element: 'mfe-programme-list',
    });
    expect(loadRemote).toHaveBeenCalledWith('@cinema/programme', 'mfe-programme-list');
    expect(mounted()).not.toBeNull();
  });

  it('shows a loading status only while loading', async () => {
    let resolve!: () => void;
    const pending = new Promise<void>((r) => (resolve = r));
    TestBed.configureTestingModule({
      imports: [RemoteShellComponent],
      providers: [
        { provide: LOAD_REMOTE, useValue: () => pending },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: new BehaviorSubject(convertToParamMap({})) },
        },
      ],
    });
    const fixture = TestBed.createComponent(RemoteShellComponent);
    fixture.componentRef.setInput('remoteName', '@cinema/programme');
    fixture.componentRef.setInput('element', 'mfe-programme-list');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[role="status"]')?.textContent,
    ).toContain('Loading @cinema/programme');

    resolve();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeNull();
  });

  it('renders an alert and logs the cause when the remote fails to load', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { root, mounted } = await setup({
      loadRemote: async () => {
        throw new Error('boom');
      },
    });
    expect(root.querySelector('[role="alert"]')?.textContent).toContain(
      '@cinema/seating',
    );
    expect(mounted()).toBeNull();
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining('@cinema/seating'),
      expect.objectContaining({ message: 'boom' }),
    );
    error.mockRestore();
  });

  it('passes the path params as the routeParams property', async () => {
    const { mounted } = await setup({ params: { screeningId: 's1' } });
    expect(mounted()?.routeParams).toEqual({ screeningId: 's1' });
  });

  it('does not reassign routeParams when nothing changed', async () => {
    const { mounted, setParams } = await setup({ params: { screeningId: 's1' } });
    const first = mounted()?.routeParams;
    await setParams({ screeningId: 's1' });
    expect(mounted()?.routeParams).toBe(first);
  });

  it('reassigns routeParams when a param changes', async () => {
    const { mounted, setParams } = await setup({ params: { screeningId: 's1' } });
    await setParams({ screeningId: 's2' });
    expect(mounted()?.routeParams).toEqual({ screeningId: 's2' });
  });
});
