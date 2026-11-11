import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import type { Events } from './contracts';
import { PointsStore } from './points.store';
import { bookingConfirmedExample } from './testing/contracts.examples';

const confirm = () =>
  window.__NF_REGISTRY__!.emit<Events['booking:confirmed']>('booking:confirmed', bookingConfirmedExample);

describe('PointsStore', () => {
  it('earns 10 points per ticket', () => {
    const store = TestBed.inject(PointsStore);
    confirm();
    expect(store.points()).toBe(20);
  });

  it('adds up every booking', () => {
    const store = TestBed.inject(PointsStore);
    confirm();
    confirm();
    expect(store.points()).toBe(40);
  });

  // replay 0 (ADR-05): the registry keeps the last event, but replaying it would double-count.
  // The registry delivers a replay asynchronously, so wait one task before asserting.
  it('ignores a booking confirmed before it existed', async () => {
    confirm();
    const store = TestBed.inject(PointsStore);
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.points()).toBe(0);
  });
});
