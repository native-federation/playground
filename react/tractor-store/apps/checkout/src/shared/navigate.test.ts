import { bus } from '@softarc/native-federation-communication';
import type { NavigatePayload } from '@tractor-store/contracts';
import { describe, expect, it } from 'vitest';
import { navigateTo, urlFor } from './navigate';

describe('navigateTo', () => {
  it('sends nav:navigate to the current listeners', () => {
    const received: NavigatePayload[] = [];
    bus.on('nav:navigate', (value) => received.push(value));
    navigateTo({ id: 'explore.home' });
    expect(received).toEqual([{ id: 'explore.home' }]);
  });

  // A command: a host that subscribes later must not replay an old navigation.
  it('retains nothing', () => {
    navigateTo({ id: 'explore.home' });
    expect(bus.peek('nav:navigate')).toBeUndefined();
  });
});

describe('urlFor', () => {
  const intents = {
    'explore.home': '/explore',
    'decide.product': '/decide/product/{id}',
  };

  it('returns the path of an intent without params', () => {
    expect(urlFor(intents, 'explore.home')).toBe('/explore');
  });

  it('fills path params and turns the other payload keys into the query', () => {
    expect(urlFor(intents, 'decide.product', { id: 'CL-01', sku: 'CL-01-GR' })).toBe(
      '/decide/product/CL-01?sku=CL-01-GR',
    );
  });

  it('puts the whole payload in the query of an intent without params', () => {
    expect(urlFor(intents, 'explore.home', { q: 'x', page: '2' })).toBe('/explore?q=x&page=2');
  });

  it('URL-encodes path params and query keys and values', () => {
    expect(urlFor(intents, 'decide.product', { id: 'a b', 'q&': 'x=y' })).toBe(
      '/decide/product/a%20b?q%26=x%3Dy',
    );
  });

  it('returns null for an unknown intent or a missing path param', () => {
    expect(urlFor(intents, 'nope.nothing')).toBeNull();
    expect(urlFor(intents, 'decide.product', { sku: 'X' })).toBeNull();
    expect(urlFor({}, 'explore.home')).toBeNull();
    expect(urlFor(intents, 'constructor')).toBeNull();
  });
});
