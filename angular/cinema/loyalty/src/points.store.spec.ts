import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PointsStore } from './points.store';
import { bookingConfirmedExample } from './testing/contracts.examples';
import { bus } from '@softarc/native-federation-communication';

// As booking emits it: a command (ADR-05).
const confirm = () =>
  bus.emit('booking:confirmed', bookingConfirmedExample, { retain: false });

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

  // replay: false (ADR-05): even a value retained by a producer that forgot retain: false
  // would double-count. The bus replays synchronously, inside on().
  it('ignores a booking confirmed before it existed', () => {
    bus.emit('booking:confirmed', bookingConfirmedExample);
    const store = TestBed.inject(PointsStore);
    expect(store.points()).toBe(0);
  });
});
