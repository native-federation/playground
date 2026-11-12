import { describe, expect, it } from 'vitest';
import { getAppInjector } from './app.config';
import { PointsStore } from './points.store';
import { bookingConfirmedExample } from './testing/contracts.examples';
import { bus } from '@softarc/native-federation-communication';

describe('app.config', () => {
  // One test on purpose: the app is created once per file, and its store subscribes to the bus
  // that testing/setup.ts installed for the test that created it.
  it('creates one application that subscribes the points store at start', async () => {
    const injector = await getAppInjector();
    expect(await getAppInjector()).toBe(injector);

    // No component has asked for the store yet: the environment initializer created it,
    // otherwise the badge would miss bookings made before the page first opens.
    bus.emit('booking:confirmed', bookingConfirmedExample, { retain: false });
    expect(injector.get(PointsStore).points()).toBe(20);
  });
});
