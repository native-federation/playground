import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import { navIntents, navigateTo, type IntentMap } from '@tractor-store/shared';
import { installFakeRegistry } from '@tractor-store/shared/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  decideContribution,
  exploreContribution,
} from '../../testing/nav-contribution.fixture';
import { testManifest } from '../../testing/manifest.fixture';
import { fakeNfByRemote } from '../../testing/native-federation.stub';
import { buildIntentMap, provideRemoteNavigation } from './remote-navigation';

describe('buildIntentMap', () => {
  it('prefixes each intent id with its contribution base path', () => {
    const intents = buildIntentMap([
      { remoteName: '@tractor-store/decide', contribution: decideContribution },
    ]);
    expect([...intents]).toEqual([
      ['decide.product', { basePath: 'decide', path: '/product/{id}' }],
    ]);
  });

  it('warns when two contributions declare the same intent id', () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    buildIntentMap([
      { remoteName: 'a', contribution: decideContribution },
      { remoteName: 'b', contribution: decideContribution },
    ]);
    expect(consoleWarn).toHaveBeenCalledWith(
      expect.stringContaining('decide.product'),
    );
    consoleWarn.mockRestore();
  });
});

describe('provideRemoteNavigation', () => {
  let consoleWarn: ReturnType<typeof vi.spyOn>;
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    installFakeRegistry();
    consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarn.mockRestore();
    consoleError.mockRestore();
  });

  async function setup(
    nf: NativeFederationResult,
    manifest: FederationManifest = testManifest,
    fallbackRedirect?: string,
  ) {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideRemoteNavigation(nf, manifest, fallbackRedirect),
      ],
    });
    await TestBed.inject(ApplicationInitStatus).donePromise;
    const router = TestBed.inject(Router);
    const navigateByUrl = vi
      .spyOn(router, 'navigateByUrl')
      .mockResolvedValue(true);
    return { router, navigateByUrl };
  }

  const bothRemotes = () =>
    fakeNfByRemote({
      '@tractor-store/explore': { navContribution: exploreContribution },
      '@tractor-store/decide': { navContribution: decideContribution },
    });

  it('registers one route per routed intent plus a wildcard redirect', async () => {
    const { router } = await setup(bothRemotes());
    expect(router.config.map((r) => r.path)).toEqual([
      'explore',
      'explore/products',
      'decide/product/:id',
      '**',
    ]);
    expect(router.config.at(-1)?.redirectTo).toBe('explore');
  });

  it('uses the configured fallback redirect', async () => {
    const { router } = await setup(
      bothRemotes(),
      testManifest,
      'somewhere-else',
    );
    expect(router.config.at(-1)?.redirectTo).toBe('somewhere-else');
  });

  it('publishes the intent map for links in the remotes', async () => {
    await setup(bothRemotes());
    let intents: IntentMap | undefined;
    navIntents.on((map) => (intents = map));
    expect([...intents!.keys()]).toEqual([
      'explore.home',
      'explore.products',
      'decide.product',
    ]);
  });

  it('resolves nav:navigate events to router navigations', async () => {
    const { navigateByUrl } = await setup(bothRemotes());
    navigateTo.emit({
      id: 'decide.product',
      payload: { id: 'CL-01', sku: 'X' },
    });
    expect(navigateByUrl).toHaveBeenCalledWith('/decide/product/CL-01?sku=X');
  });

  it('logs unknown intents and unresolvable payloads instead of navigating', async () => {
    const { navigateByUrl } = await setup(bothRemotes());
    navigateTo.emit({ id: 'nope.nothing' });
    navigateTo.emit({ id: 'decide.product' });
    expect(navigateByUrl).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('nope.nothing'),
    );
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('missing required param'),
    );
  });

  it('keeps working when one remote fails to load its contribution', async () => {
    const nf = fakeNfByRemote({
      '@tractor-store/explore': { navContribution: exploreContribution },
    });
    const { router } = await setup(nf);
    expect(router.config).toHaveLength(3);
    expect(consoleWarn).toHaveBeenCalled();
  });
});
