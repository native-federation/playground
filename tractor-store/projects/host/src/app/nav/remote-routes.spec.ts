import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { NavContribution } from '@internal/events';
import { buildRemoteRoutes } from './remote-routes';

const loaded = (contribution: NavContribution) => ({
  remoteName: contribution.source,
  contribution,
});

describe('buildRemoteRoutes', () => {
  let consoleWarn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarn.mockRestore();
  });

  it('builds one route per routed intent', () => {
    const routes = buildRemoteRoutes([
      loaded({
        source: '@x/explore',
        basePath: 'explore',
        intents: [
          { id: 'explore.home', path: '/', element: 'mfe-home' },
          { id: 'explore.products', path: '/products', element: 'mfe-list' },
        ],
      }),
    ]);

    expect(routes).toHaveLength(2);
    expect(routes[0].path).toBe('explore');
    expect(routes[0].data).toEqual({
      remoteName: '@x/explore',
      element: 'mfe-home',
    });
    expect(routes[1].path).toBe('explore/products');
    expect(routes[1].data).toEqual({
      remoteName: '@x/explore',
      element: 'mfe-list',
    });
  });

  it('attaches a lazy loadComponent to each route', () => {
    const routes = buildRemoteRoutes([
      loaded({
        source: '@x/explore',
        basePath: 'explore',
        intents: [{ id: 'a', path: '/', element: 'mfe-a' }],
      }),
    ]);
    expect(typeof routes[0].loadComponent).toBe('function');
  });

  it('skips intents without an element (link-only intents)', () => {
    const routes = buildRemoteRoutes([
      loaded({
        source: '@x/decide',
        basePath: 'decide',
        intents: [
          { id: 'decide.product', path: '/product/:id', element: 'mfe-p' },
          // link-only intent — no element
          { id: 'decide.link-only', path: '/external' },
        ],
      }),
    ]);

    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe('decide/product/:id');
  });

  it('warns and skips contributions with no routed intents', () => {
    const routes = buildRemoteRoutes([
      loaded({
        source: '@x/link-only',
        basePath: 'l',
        intents: [{ id: 'l.go', path: '/go' }],
      }),
    ]);

    expect(routes).toEqual([]);
    expect(consoleWarn).toHaveBeenCalledWith(
      expect.stringContaining('@x/link-only'),
    );
  });

  it('returns an empty list for an empty input', () => {
    expect(buildRemoteRoutes([])).toEqual([]);
  });
});
