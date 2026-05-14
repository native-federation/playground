import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { NavigatePayload } from '@internal/events';
import { setupShellNavigation } from './setup-shell-nav';
import {
  decideContribution,
  exploreContribution,
} from '../../testing/nav-contribution.fixture';
import { testManifest } from '../../testing/manifest.fixture';
import { fakeNfByRemote } from '../../testing/native-federation.stub';
import { fakeRouter } from '../../testing/router.stub';

describe('setupShellNavigation', () => {
  let consoleWarn: ReturnType<typeof vi.spyOn>;
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarn.mockRestore();
    consoleError.mockRestore();
  });

  const captureOnNavigate = () => {
    let captured: ((payload: NavigatePayload) => void) | undefined;
    const onNavigate = vi.fn((handler: (p: NavigatePayload) => void) => {
      captured = handler;
      return () => {};
    });
    return {
      onNavigate,
      fire: (payload: NavigatePayload) => captured?.(payload),
    };
  };

  it('registers routes built from all loaded contributions', async () => {
    const router = fakeRouter();
    const nf = fakeNfByRemote({
      '@tractor-store/explore': { navContribution: exploreContribution },
      '@tractor-store/decide': { navContribution: decideContribution },
    });
    const { onNavigate } = captureOnNavigate();

    await setupShellNavigation({ router, nf, manifest: testManifest, onNavigate });

    // 2 explore intents + 1 decide intent + 1 wildcard
    expect(router.routes).toHaveLength(4);
    expect(router.routes.at(-1)).toEqual({
      path: '**',
      redirectTo: 'explore',
    });
  });

  it('uses the configured fallbackRedirect', async () => {
    const router = fakeRouter();
    const nf = fakeNfByRemote({
      '@tractor-store/explore': { navContribution: exploreContribution },
    });
    const { onNavigate } = captureOnNavigate();

    await setupShellNavigation({
      router,
      nf,
      manifest: { '@tractor-store/explore': 'x' },
      onNavigate,
      fallbackRedirect: 'somewhere-else',
    });

    expect(router.routes.at(-1)).toEqual({
      path: '**',
      redirectTo: 'somewhere-else',
    });
  });

  it('routes nav events through the registry to the router', async () => {
    const router = fakeRouter();
    const nf = fakeNfByRemote({
      '@tractor-store/decide': { navContribution: decideContribution },
    });
    const { onNavigate, fire } = captureOnNavigate();

    await setupShellNavigation({
      router,
      nf,
      manifest: { '@tractor-store/decide': 'x' },
      onNavigate,
    });

    fire({ id: 'decide.product', payload: { id: 'CL-01' } });
    // navigate is async; let microtasks drain
    await Promise.resolve();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/decide/product/CL-01');
  });

  it('logs and swallows errors thrown by the navigator', async () => {
    const router = fakeRouter();
    router.navigateByUrl.mockRejectedValueOnce(new Error('boom'));
    const nf = fakeNfByRemote({
      '@tractor-store/explore': { navContribution: exploreContribution },
    });
    const { onNavigate, fire } = captureOnNavigate();

    await setupShellNavigation({
      router,
      nf,
      manifest: { '@tractor-store/explore': 'x' },
      onNavigate,
    });

    fire({ id: 'explore.home' });
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('explore.home'),
      expect.any(Error),
    );
  });

  it('continues when a remote contribution fails to load', async () => {
    const router = fakeRouter();
    const nf = fakeNfByRemote({
      '@tractor-store/explore': { navContribution: exploreContribution },
      // decide will throw
    });
    const { onNavigate } = captureOnNavigate();

    await setupShellNavigation({
      router,
      nf,
      manifest: testManifest,
      onNavigate,
    });

    // only explore's 2 intents + wildcard
    expect(router.routes).toHaveLength(3);
    expect(consoleWarn).toHaveBeenCalled();
  });
});
