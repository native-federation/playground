import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import type {
  NavContribution,
} from '../contracts';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { testManifest } from '../testing/manifest.fixture';
import { fakeNfByRemote } from '../testing/native-federation.stub';
import {
  programmeContribution,
  seatingContribution,
} from '../testing/nav-contribution.fixture';
import { loadContributions } from './contributions';
import { provideNavigation } from './navigation';
import { bus, type ChannelValue } from '@softarc/native-federation-communication';

const bothRemotes = () =>
  fakeNfByRemote({
    '@cinema/programme': { navContribution: programmeContribution },
    '@cinema/seating': { navContribution: seatingContribution },
  });

// One remote with an unusual contribution, to exercise the path handling.
const onlyRemote = (navContribution: NavContribution) => ({
  nf: fakeNfByRemote({ '@x/only': { navContribution } }),
  manifest: { '@x/only': 'http://x/remoteEntry.json' },
});

const setup = async (
  nf: NativeFederationResult,
  manifest: FederationManifest = testManifest,
) => {
  // Spy before init so a navigation during start-up is caught too.
  const navigateByUrl = vi
    .spyOn(Router.prototype, 'navigateByUrl')
    .mockResolvedValue(true);
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      provideNavigation(await loadContributions(nf, manifest)),
    ],
  });
  await TestBed.inject(ApplicationInitStatus).donePromise;
  const router = TestBed.inject(Router);

  const resolve = bus.peek('nav:resolve')!;
  const navigate = (data: ChannelValue<'nav:navigate'>) =>
    bus.emit('nav:navigate', data, { retain: false });

  return { router, navigateByUrl, resolve, navigate };
};

describe('provideNavigation', () => {
  let consoleWarn: ReturnType<typeof vi.spyOn>;
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => vi.restoreAllMocks());

  describe('routes', () => {
    it('registers one route per routed intent plus a redirect to the first page', async () => {
      const { router } = await setup(bothRemotes());
      expect(router.config.map((r) => r.path)).toEqual([
        'programme',
        'seating/:screeningId',
        '**',
      ]);
      expect(router.config.at(-1)?.redirectTo).toBe('programme');
    });

    it('falls back to the first page without params, in manifest order', async () => {
      const nf = fakeNfByRemote({
        '@cinema/seating': { navContribution: seatingContribution },
        '@x/account': {
          navContribution: {
            basePath: 'account',
            intents: [{ id: 'profile', path: '', element: 'mfe-account' }],
          },
        },
      });
      const { router } = await setup(nf, {
        '@cinema/seating': 'http://seating/remoteEntry.json',
        '@x/account': 'http://account/remoteEntry.json',
      });
      // seating's only page needs a :screeningId, so it can't be the fallback.
      expect(router.config.at(-1)).toEqual({
        path: '**',
        redirectTo: 'account',
      });
    });

    it('still ends with a catch-all when no page without params loaded', async () => {
      const nf = fakeNfByRemote({
        '@cinema/seating': { navContribution: seatingContribution },
      });
      const { router } = await setup(nf, {
        '@cinema/seating': 'http://seating/remoteEntry.json',
      });
      // Without it, every unknown URL throws NG04002.
      expect(router.config.at(-1)).toEqual({ path: '**', children: [] });
    });

    it('binds the remote and element as route data for the shell', async () => {
      const { router } = await setup(bothRemotes());
      const plan = router.config.find(
        (r) => r.path === 'seating/:screeningId',
      );
      expect(plan?.data).toEqual({
        remoteName: '@cinema/seating',
        element: 'mfe-seating-plan',
      });
      expect(typeof plan?.loadComponent).toBe('function');
    });

    it('normalises slashes, converts every {param} and skips link-only intents', async () => {
      const { nf, manifest } = onlyRemote({
        basePath: '/git/',
        intents: [
          {
            id: 'issue',
            path: '/{org}/{repo}/issues/{num}/',
            element: 'mfe-i',
          },
          { id: 'external', path: '/somewhere' },
        ],
      });
      const { router } = await setup(nf, manifest);
      // Its only page needs params, so the catch-all has nothing to redirect to.
      expect(router.config.map((r) => r.path)).toEqual([
        'git/:org/:repo/issues/:num',
        '**',
      ]);
    });
  });

  describe('nav:resolve', () => {
    it('publishes a resolver for links in the remotes', async () => {
      const { resolve } = await setup(bothRemotes());
      expect(resolve('programme.list')).toBe('/programme');
      expect(resolve('seating.plan', { screeningId: 's1' })).toBe(
        '/seating/s1',
      );
    });

    it('fills path params and turns the other payload keys into the query', async () => {
      const { resolve } = await setup(bothRemotes());
      expect(resolve('seating.plan', { screeningId: 's1', row: 'A' })).toBe(
        '/seating/s1?row=A',
      );
    });

    it('URL-encodes path params and query keys and values', async () => {
      const { resolve } = await setup(bothRemotes());
      expect(resolve('seating.plan', { screeningId: 'a b', 'q&': 'x=y' })).toBe(
        '/seating/a%20b?q%26=x%3Dy',
      );
    });

    it('resolves link-only intents too', async () => {
      const { nf, manifest } = onlyRemote({
        basePath: 'git',
        intents: [{ id: 'external', path: '/somewhere' }],
      });
      const { resolve } = await setup(nf, manifest);
      expect(resolve('git.external')).toBe('/git/somewhere');
    });

    it('warns when two remotes define the same intent id and keeps the last', async () => {
      const nf = fakeNfByRemote({
        '@x/a': {
          navContribution: {
            basePath: 'shop',
            intents: [{ id: 'home', path: '/a' }],
          },
        },
        '@x/b': {
          navContribution: {
            basePath: 'shop',
            intents: [{ id: 'home', path: '/b' }],
          },
        },
      });
      const { resolve } = await setup(nf, {
        '@x/a': 'http://a/remoteEntry.json',
        '@x/b': 'http://b/remoteEntry.json',
      });
      expect(resolve('shop.home')).toBe('/shop/b');
      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('"shop.home"'),
      );
    });

    it('returns null and warns for an unknown intent in a loaded team or a missing path param', async () => {
      const { resolve } = await setup(bothRemotes());
      expect(resolve('programme.nothing')).toBeNull();
      expect(resolve('seating.plan')).toBeNull();
      expect(resolve('seating.plan', { row: 'A' })).toBeNull();
      expect(consoleWarn).toHaveBeenCalledWith(
        '[nav] unknown intent "programme.nothing"',
      );
      expect(consoleWarn).toHaveBeenCalledWith(
        '[nav] intent "seating.plan" is missing param "screeningId"',
      );
    });

    it('returns null silently for an intent of a team that did not load', async () => {
      const { resolve } = await setup(bothRemotes());
      expect(resolve('film.detail', { filmId: 'f-1' })).toBeNull();
      expect(consoleWarn).not.toHaveBeenCalled();
    });
  });

  describe('nav:navigate', () => {
    it('navigates to the resolved URL', async () => {
      const { navigate, navigateByUrl } = await setup(bothRemotes());
      navigate({ id: 'seating.plan', payload: { screeningId: 's1' } });
      expect(navigateByUrl).toHaveBeenCalledWith('/seating/s1');
    });

    it('does nothing when the target team did not load', async () => {
      const { navigate, navigateByUrl } = await setup(bothRemotes());
      navigate({ id: 'booking.checkout', payload: { seats: 'A1' } });
      expect(navigateByUrl).not.toHaveBeenCalled();
      expect(consoleWarn).not.toHaveBeenCalled();
      expect(consoleError).not.toHaveBeenCalled();
    });

    it('does not replay a command emitted before the shell listened', async () => {
      // A stale command a remote emitted without retain: false must not trigger a navigation on start-up.
      bus.emit('nav:navigate', { id: 'programme.list' });
      const { navigateByUrl } = await setup(bothRemotes());
      expect(navigateByUrl).not.toHaveBeenCalled();
    });
  });
});
