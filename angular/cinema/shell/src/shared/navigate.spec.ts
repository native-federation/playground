import { bus } from '@softarc/native-federation-communication';
import { describe, expect, it } from 'vitest';
import type { NavigatePayload } from '../contracts';
import { navigateTo, urlFor } from './navigate';

describe('navigateTo', () => {
  it('sends nav:navigate to the current listeners', () => {
    const received: NavigatePayload[] = [];
    bus.on('nav:navigate', (value) => received.push(value));
    navigateTo({ id: 'programme.list', payload: { a: 'b' } });
    expect(received).toEqual([{ id: 'programme.list', payload: { a: 'b' } }]);
  });

  // A command: a shell that subscribes later must not replay an old navigation.
  it('retains nothing', () => {
    navigateTo({ id: 'programme.list' });
    expect(bus.peek('nav:navigate')).toBeUndefined();
  });
});

describe('urlFor', () => {
  const intents = {
    'programme.list': '/programme',
    'booking.checkout': '/booking/{screeningId}/{seats}',
  };

  it('returns the path of an intent without params', () => {
    expect(urlFor(intents, 'programme.list')).toBe('/programme');
  });

  it('fills path params and turns the other payload keys into the query', () => {
    expect(
      urlFor(intents, 'booking.checkout', { screeningId: 's1', seats: 'A1,A2', promo: 'x' }),
    ).toBe('/booking/s1/A1%2CA2?promo=x');
  });

  it('puts the whole payload in the query of an intent without params', () => {
    expect(urlFor(intents, 'programme.list', { day: 'fri', page: '2' })).toBe(
      '/programme?day=fri&page=2',
    );
  });

  it('URL-encodes path params and query keys and values', () => {
    expect(urlFor(intents, 'booking.checkout', { screeningId: 'a b', seats: 'A1', 'q&': 'x=y' })).toBe(
      '/booking/a%20b/A1?q%26=x%3Dy',
    );
  });

  it('returns null for an unknown intent or a missing path param', () => {
    expect(urlFor(intents, 'nope.nothing')).toBeNull();
    expect(urlFor(intents, 'booking.checkout', { screeningId: 's1' })).toBeNull();
    expect(urlFor({}, 'programme.list')).toBeNull();
    expect(urlFor(intents, 'constructor')).toBeNull();
  });
});
