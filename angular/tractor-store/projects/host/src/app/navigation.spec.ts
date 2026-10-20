import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import type {
  Events,
  NavContribution,
  NavResolver,
} from '@tractor-store/contracts';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { testManifest } from '../testing/manifest.fixture';
import { fakeNfByRemote } from '../testing/native-federation.stub';
import {
  decideContribution,
  exploreContribution,
} from '../testing/nav-contribution.fixture';
import { provideNavigation } from './navigation';

const bothRemotes = () =>
  fakeNfByRemote({
    '@tractor-store/explore': { navContribution: exploreContribution },
    '@tractor-store/decide': { navContribution: decideContribution },
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
    providers: [provideRouter([]), provideNavigation(nf, manifest)],
  });
  await TestBed.inject(ApplicationInitStatus).donePromise;
  const router = TestBed.inject(Router);

  let resolve!: NavResolver;
  window.__NF_REGISTRY__!.onReady<Events['nav:resolve']>(
    'nav:resolve',
    (r) => (resolve = r),
  );
  const navigate = (data: Events['nav:navigate']) =>
    window.__NF_REGISTRY__!.emit<Events['nav:navigate']>('nav:navigate', data);

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

  describe('loading contributions', () => {
    it("requests every manifest remote's nav-contribution module", async () => {
      const nf = bothRemotes();
      await setup(nf);
      expect(nf.loadRemoteModule).toHaveBeenCalledWith(
        '@tractor-store/explore',
        'nav-contribution',
      );
      expect(nf.loadRemoteModule).toHaveBeenCalledWith(
        '@tractor-store/decide',
        'nav-contribution',
      );
    });

    it('skips a remote that fails to load and warns', async () => {
      // fakeNfByRemote throws for decide, which is in the manifest but not here.
      const nf = fakeNfByRemote({
        '@tractor-store/explore': { navContribution: exploreContribution },
      });
      const { router } = await setup(nf);
      expect(router.config.map((r) => r.path)).toEqual([
        'explore',
        'explore/products',
        '**',
      ]);
      expect(consoleWarn).toHaveBeenCalled();
    });

    it('skips a remote whose export is not a valid contribution', async () => {
      const nf = fakeNfByRemote({
        '@tractor-store/explore': { default: exploreContribution },
        '@tractor-store/decide': { navContribution: { basePath: 'decide' } },
      });
      const { router } = await setup(nf);
      expect(router.config.map((r) => r.path)).toEqual(['**']);
      expect(consoleWarn).toHaveBeenCalledTimes(2);
    });
  });

  describe('routes', () => {
    it('registers one route per routed intent plus a redirect to explore', async () => {
      const { router } = await setup(bothRemotes());
      expect(router.config.map((r) => r.path)).toEqual([
        'explore',
        'explore/products',
        'decide/product/:id',
        '**',
      ]);
      expect(router.config.at(-1)?.redirectTo).toBe('explore');
    });

    it('binds the remote and element as route data for the shell', async () => {
      const { router } = await setup(bothRemotes());
      const product = router.config.find(
        (r) => r.path === 'decide/product/:id',
      );
      expect(product?.data).toEqual({
        remoteName: '@tractor-store/decide',
        element: 'mfe-decide-product',
      });
      expect(typeof product?.loadComponent).toBe('function');
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
      expect(router.config.map((r) => r.path)).toEqual([
        'git/:org/:repo/issues/:num',
        '**',
      ]);
    });
  });

  describe('nav:resolve', () => {
    it('publishes a resolver for links in the remotes', async () => {
      const { resolve } = await setup(bothRemotes());
      expect(resolve('explore.home')).toBe('/explore');
      expect(resolve('explore.products')).toBe('/explore/products');
    });

    it('fills path params and turns the other payload keys into the query', async () => {
      const { resolve } = await setup(bothRemotes());
      expect(resolve('decide.product', { id: 'CL-01', sku: 'CL-01-GR' })).toBe(
        '/decide/product/CL-01?sku=CL-01-GR',
      );
    });

    it('URL-encodes path params and query keys and values', async () => {
      const { resolve } = await setup(bothRemotes());
      expect(resolve('decide.product', { id: 'a b', 'q&': 'x=y' })).toBe(
        '/decide/product/a%20b?q%26=x%3Dy',
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

    it('returns null for an unknown intent or a missing path param', async () => {
      const { resolve } = await setup(bothRemotes());
      expect(resolve('nope.nothing')).toBeNull();
      expect(resolve('decide.product')).toBeNull();
      expect(resolve('decide.product', { sku: 'X' })).toBeNull();
    });
  });

  describe('nav:navigate', () => {
    it('navigates to the resolved URL', async () => {
      const { navigate, navigateByUrl } = await setup(bothRemotes());
      navigate({ id: 'decide.product', payload: { id: 'CL-01', sku: 'X' } });
      expect(navigateByUrl).toHaveBeenCalledWith('/decide/product/CL-01?sku=X');
    });

    it('logs instead of navigating when the intent cannot be resolved', async () => {
      const { navigate, navigateByUrl } = await setup(bothRemotes());
      navigate({ id: 'nope.nothing' });
      navigate({ id: 'decide.product' });
      expect(navigateByUrl).not.toHaveBeenCalled();
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('nope.nothing'),
      );
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('decide.product'),
      );
    });

    it('does not replay a command emitted before the host listened', async () => {
      // A stale command (e.g. from a previous page) must not trigger a navigation on start-up.
      window.__NF_REGISTRY__!.emit<Events['nav:navigate']>('nav:navigate', {
        id: 'explore.products',
      });
      const { navigateByUrl } = await setup(bothRemotes());
      expect(navigateByUrl).not.toHaveBeenCalled();
    });
  });
});
