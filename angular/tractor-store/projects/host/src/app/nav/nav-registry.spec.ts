import { describe, expect, it, vi } from 'vitest';
import type { NavContribution } from '@ng-internal/navigation';
import { NavRegistry } from './nav-registry';
import {
  decideContribution,
  exploreContribution,
} from '../../testing/nav-contribution.fixture';

describe('NavRegistry', () => {
  const makeRegistry = () => {
    const navigator = vi.fn(async () => true);
    const registry = new NavRegistry(navigator);
    return { navigator, registry };
  };

  describe('navigate', () => {
    it('resolves a routed intent to a URL and forwards it to the navigator', async () => {
      const { navigator, registry } = makeRegistry();
      registry.register(exploreContribution);

      const ok = await registry.navigate('explore.home');

      expect(ok).toBe(true);
      expect(navigator).toHaveBeenCalledWith('/explore');
    });

    it('substitutes path params from the payload', async () => {
      const { navigator, registry } = makeRegistry();
      registry.register(decideContribution);

      await registry.navigate('decide.product', { id: 'CL-01' });

      expect(navigator).toHaveBeenCalledWith('/decide/product/CL-01');
    });

    it('places non-path payload entries into the query string', async () => {
      const { navigator, registry } = makeRegistry();
      registry.register(decideContribution);

      await registry.navigate('decide.product', {
        id: 'CL-01',
        size: 'M',
      });

      expect(navigator).toHaveBeenCalledWith(
        '/decide/product/CL-01?size=M',
      );
    });

    it('returns false and does not navigate for an unknown intent', async () => {
      const consoleError = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const { navigator, registry } = makeRegistry();
      registry.register(exploreContribution);

      const ok = await registry.navigate('nope');

      expect(ok).toBe(false);
      expect(navigator).not.toHaveBeenCalled();
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringMatching(
          /\[nav\] cannot navigate to intent "nope".*not available/,
        ),
      );
      consoleError.mockRestore();
    });

    it('returns false and names the missing param when a required path param is absent', async () => {
      const consoleError = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const { navigator, registry } = makeRegistry();
      registry.register(decideContribution);

      const ok = await registry.navigate('decide.product', {});

      expect(ok).toBe(false);
      expect(navigator).not.toHaveBeenCalled();
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringMatching(
          /\[nav\] cannot navigate to intent "decide\.product".*missing required param "\{id\}"/,
        ),
      );
      consoleError.mockRestore();
    });
  });

  describe('getNavBar', () => {
    it('builds entries from contributions that declare a navBar', () => {
      const { registry } = makeRegistry();
      const contribution: NavContribution = {
        source: '@x/explore',
        basePath: 'explore',
        intents: [
          { id: 'home', path: '/', element: 'mfe-home' },
          { id: 'products', path: '/products', element: 'mfe-list' },
        ],
        navBar: [
          { intentId: 'products', label: 'Products', order: 2 },
          { intentId: 'home', label: 'Home', order: 1 },
        ],
      };
      registry.register(contribution);

      const entries = registry.getNavBar();

      expect(entries).toEqual([
        {
          source: '@x/explore',
          intentId: 'explore.home',
          label: 'Home',
          path: '/explore',
          order: 1,
        },
        {
          source: '@x/explore',
          intentId: 'explore.products',
          label: 'Products',
          path: '/explore/products',
          order: 2,
        },
      ]);
    });

    it('skips navBar entries whose intentId is not declared', () => {
      const { registry } = makeRegistry();
      registry.register({
        source: '@x/explore',
        basePath: 'explore',
        intents: [{ id: 'home', path: '/', element: 'mfe-home' }],
        navBar: [
          { intentId: 'home', label: 'Home' },
          { intentId: 'missing', label: 'Missing' },
        ],
      });

      const entries = registry.getNavBar();

      expect(entries).toHaveLength(1);
      expect(entries[0].intentId).toBe('explore.home');
    });

    it('defaults order to MAX_SAFE_INTEGER when omitted', () => {
      const { registry } = makeRegistry();
      registry.register({
        source: '@x/explore',
        basePath: 'explore',
        intents: [{ id: 'a', path: '/a', element: 'mfe-a' }],
        navBar: [{ intentId: 'a', label: 'A' }],
      });

      const entries = registry.getNavBar();

      expect(entries[0].order).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('returns an empty list when no contribution declares a navBar', () => {
      const { registry } = makeRegistry();
      registry.register(exploreContribution);
      expect(registry.getNavBar()).toEqual([]);
    });
  });
});
