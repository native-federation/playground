import { describe, expect, it, vi } from 'vitest';
import { createResolver, toRoutes, type RemoteContribution } from './navigation';

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

describe('createResolver', () => {
  const resolve = createResolver([explore, decide]);

  it('prefixes the basePath', () => {
    expect(resolve('explore.home')).toBe('/explore');
  });

  it('fills and encodes path params', () => {
    expect(resolve('explore.products.category', { category: 'a b' })).toBe(
      '/explore/products/a%20b',
    );
  });

  it('puts leftover payload keys in the query string', () => {
    expect(resolve('decide.product', { id: 'CL-01', sku: 'CL-01-GR' })).toBe(
      '/decide/product/CL-01?sku=CL-01-GR',
    );
  });

  it('resolves link-only intents', () => {
    expect(resolve('decide.about')).toBe('/decide/about');
  });

  it('returns null for an unknown intent', () => {
    expect(resolve('checkout.cart')).toBeNull();
  });

  it('returns null when a path param is missing', () => {
    expect(resolve('decide.product')).toBeNull();
  });

  it('warns when two remotes define the same intent', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    createResolver([explore, { ...explore, remoteName: '@tractor-store/other' }]);
    expect(warn).toHaveBeenCalledWith(
      '[nav] "@tractor-store/other" redefines intent "explore.home"; the last one wins',
    );
    warn.mockRestore();
  });
});
