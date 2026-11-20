import { describe, expect, it } from 'vitest';
import { formatSeats, parseSeats } from './seats-param';
import { seatHoldExample, seatsParamExample } from './testing/contracts.examples';

describe('seats param', () => {
  it('turns a hold into the URL segment and back', () => {
    expect(formatSeats(seatHoldExample.seats)).toBe(seatsParamExample);
    expect(parseSeats(seatsParamExample)).toEqual(seatHoldExample.seats);
  });

  it('reads an empty, missing or invalid segment as no seats', () => {
    expect(parseSeats('')).toEqual([]);
    expect(parseSeats()).toEqual([]);
    expect(parseSeats('A1,,A2')).toEqual([]);
    expect(parseSeats('a1')).toEqual([]);
  });
});
