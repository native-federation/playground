import { TestBed } from '@angular/core/testing';
import { bus } from '@softarc/native-federation-communication';
import { describe, expect, it } from 'vitest';
import type { RouteParams } from './contracts';
import { SeatPlanComponent } from './seat-plan.component';
import { seatHoldExample } from './testing/contracts.examples';

describe('SeatPlanComponent', () => {
  // The shell writes routeParams as an element property; setInput is the same input.
  const render = async (routeParams: RouteParams) => {
    const fixture = TestBed.createComponent(SeatPlanComponent);
    fixture.componentRef.setInput('routeParams', routeParams);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const seat = (id: string) => el.querySelector<HTMLButtonElement>(`button[aria-label^="Seat ${id}"]`)!;
    const click = async (button: HTMLElement) => {
      button.click();
      await fixture.whenStable();
    };
    const setScreening = async (screeningId: string) => {
      fixture.componentRef.setInput('routeParams', { screeningId });
      await fixture.whenStable();
    };
    return { fixture, el, seat, click, setScreening };
  };

  const retainedHold = () => bus.peek('seating:hold');

  it('renders 40 seats with the taken ones of s-101 disabled', async () => {
    const { el } = await render({ screeningId: 's-101' });
    const seats = [...el.querySelectorAll<HTMLButtonElement>('button[aria-label^="Seat "]')];
    expect(seats).toHaveLength(40);
    // The fixed table in seats.ts for s-101.
    expect(seats.filter((b) => b.disabled).map((b) => b.getAttribute('aria-label'))).toEqual([
      'Seat B3, taken',
      'Seat B4, taken',
      'Seat C5, taken',
      'Seat E1, taken',
    ]);
  });

  it('marks a toggled seat as pressed and releases it on a second click', async () => {
    const { seat, click } = await render({ screeningId: 's-101' });
    await click(seat('A1'));
    expect(seat('A1').getAttribute('aria-pressed')).toBe('true');
    await click(seat('A1'));
    expect(seat('A1').getAttribute('aria-pressed')).toBe('false');
  });

  it('retains an empty hold on first render', async () => {
    await render({ screeningId: 's-101' });
    expect(retainedHold()).toEqual({ screeningId: 's-101', seats: [] });
  });

  it('retains the hold in grid order, matching the contract example', async () => {
    const { seat, click } = await render({ screeningId: 's-101' });
    // Picked out of order on purpose: the hold must still read A1, A2.
    await click(seat('A2'));
    await click(seat('A1'));
    expect(retainedHold()).toEqual(seatHoldExample);
    expect(Object.keys(retainedHold()!)).toEqual(Object.keys(seatHoldExample));
  });

  it('retains an empty hold after releasing the last seat', async () => {
    const { seat, click } = await render({ screeningId: 's-101' });
    await click(seat('A1'));
    await click(seat('A1'));
    expect(retainedHold()).toEqual({ screeningId: 's-101', seats: [] });
  });

  it('keeps the hold when routeParams is re-set with the same screening', async () => {
    const { seat, click, setScreening } = await render({ screeningId: 's-101' });
    await click(seat('A1'));
    // The shell writes a fresh object on every param change; same values must not reset the hold.
    await setScreening('s-101');
    expect(seat('A1').getAttribute('aria-pressed')).toBe('true');
    expect(retainedHold()).toEqual({ screeningId: 's-101', seats: ['A1'] });
  });

  it('clears the hold, on the bus too, when the screening changes', async () => {
    const { seat, click, setScreening } = await render({ screeningId: 's-101' });
    await click(seat('A1'));
    await setScreening('s-102');
    expect(seat('A1').getAttribute('aria-pressed')).toBe('false');
    expect(retainedHold()).toEqual({ screeningId: 's-102', seats: [] });
  });

  it("replaces an earlier visit's retained hold when the page renders again", async () => {
    // Back from checkout to the same screening: the plan starts empty, so the bus must too.
    bus.emit('seating:hold', seatHoldExample);
    await render({ screeningId: 's-101' });
    expect(retainedHold()).toEqual({ screeningId: 's-101', seats: [] });
  });

  it("embeds booking's summary for its screening", async () => {
    const { el } = await render({ screeningId: 's-101' });
    const summary = el.querySelector('mfe-booking-summary');
    expect(summary?.getAttribute('screening-id')).toBe('s-101');
  });
});
