// @vitest-environment jsdom
import { bus } from '@softarc/native-federation-communication';
import { describe, expect, it, vi } from 'vitest';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import {
  createNavigation,
  handleNavigateCommands,
  toIntents,
  toRoutes,
  urlFor,
  type RemoteContribution,
} from './navigation';

// Same shapes as the real remotes' nav-contribution.ts files.
const explore: RemoteContribution = {
  remoteName: '@tractor-store/explore',
  contribution: {
    basePath: 'explore',
    intents: [
      { id: 'home', path: '/', element: 'mfe-home' },
      { id: 'products.category', path: '/products/{category}', element: 'mfe-category' },
    ],
  },
};

const decide: RemoteContribution = {
  remoteName: '@tractor-store/decide',
  contribution: {
    basePath: 'decide',
    intents: [
      { id: 'product', path: '/product/{id}', element: 'mfe-product' },
      { id: 'about', path: '/about' },
    ],
  },
};

describe('toRoutes', () => {
  it('turns every routed intent into an absolute route with :params', () => {
    expect(toRoutes([explore, decide]).map((route) => route.path)).toEqual([
      '/explore',
      '/explore/products/:category',
      '/decide/product/:id',
    ]);
  });

  it('skips link-only intents', () => {
    expect(toRoutes([decide]).map((route) => route.path)).not.toContain('/decide/about');
  });
});

describe('toIntents', () => {
  it('maps every intent, link-only ones included, to its full path', () => {
    expect(toIntents([explore, decide])).toEqual({
      'explore.home': '/explore',
      'explore.products.category': '/explore/products/{category}',
      'decide.product': '/decide/product/{id}',
      'decide.about': '/decide/about',
    });
  });

  it('warns when two remotes define the same intent and keeps the last', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const other: RemoteContribution = {
      remoteName: '@tractor-store/other',
      contribution: { basePath: 'explore', intents: [{ id: 'home', path: '/start' }] },
    };
    expect(toIntents([explore, other])['explore.home']).toBe('/explore/start');
    expect(warn).toHaveBeenCalledWith(
      '[nav] "@tractor-store/other" redefines intent "explore.home"; the last one wins',
    );
    warn.mockRestore();
  });
});

describe('urlFor', () => {
  const intents = toIntents([explore, decide]);

  it('fills and encodes path params', () => {
    expect(urlFor(intents, 'explore.products.category', { category: 'a b' })).toBe(
      '/explore/products/a%20b',
    );
  });

  it('puts leftover payload keys in the query string', () => {
    expect(urlFor(intents, 'decide.product', { id: 'CL-01', sku: 'CL-01-GR' })).toBe(
      '/decide/product/CL-01?sku=CL-01-GR',
    );
  });

  it('returns null for an unknown intent or a missing path param', () => {
    expect(urlFor(intents, 'checkout.cart')).toBeNull();
    expect(urlFor(intents, 'decide.product')).toBeNull();
  });
});

describe('handleNavigateCommands', () => {
  const intents = toIntents([explore, decide]);
  const listen = () => {
    const router = { navigate: vi.fn(() => Promise.resolve()) };
    return { router, off: handleNavigateCommands(router, intents) };
  };

  it('navigates to the resolved URL of a nav:navigate command', () => {
    const { router } = listen();
    bus.emit('nav:navigate', { id: 'decide.product', payload: { id: 'CL-01' } }, { retain: false });
    expect(router.navigate).toHaveBeenCalledWith('/decide/product/CL-01');
  });

  it('ignores a command that was retained before it subscribed', () => {
    bus.emit('nav:navigate', { id: 'explore.home' });
    const { router } = listen();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('logs an intent it cannot resolve instead of navigating', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { router } = listen();
    bus.emit('nav:navigate', { id: 'decide.product' }, { retain: false });
    expect(router.navigate).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith('[nav] cannot navigate to "decide.product"');
    error.mockRestore();
  });

  it('stops listening once unsubscribed', () => {
    const { router, off } = listen();
    off();
    bus.emit('nav:navigate', { id: 'explore.home' }, { retain: false });
    expect(router.navigate).not.toHaveBeenCalled();
  });
});

describe('createNavigation', () => {
  // Only loadRemoteModule is used: it hands out each remote's nav-contribution.
  const nf = {
    loadRemoteModule: async (remoteName: string) => ({
      navContribution: { [explore.remoteName]: explore, [decide.remoteName]: decide }[remoteName]
        ?.contribution,
    }),
  } as unknown as NativeFederationResult;
  const manifest = {
    [explore.remoteName]: 'http://localhost:4301/remoteEntry.json',
    [decide.remoteName]: 'http://localhost:4302/remoteEntry.json',
  };

  it('publishes its intents as retained nav:intents state', async () => {
    const { intents } = await createNavigation(nf, manifest);
    expect(bus.peek('nav:intents')).toBe(intents);
    expect(intents['decide.product']).toBe('/decide/product/{id}');
  });

  it('skips a remote whose nav-contribution fails to load', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { intents } = await createNavigation(nf, {
      ...manifest,
      '@tractor-store/missing': 'http://localhost:4399/remoteEntry.json',
    });
    expect(intents['explore.home']).toBe('/explore');
    expect(warn).toHaveBeenCalledWith('[nav] skipping a remote:', expect.any(Error));
    warn.mockRestore();
  });
});
