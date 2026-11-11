import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { BOOKING_REF } from './booking-ref';

describe('BOOKING_REF', () => {
  it('makes a BR- ref with four upper-case hex digits', () => {
    const nextRef = TestBed.inject(BOOKING_REF);
    expect(nextRef()).toMatch(/^BR-[0-9A-F]{4}$/);
  });
});
