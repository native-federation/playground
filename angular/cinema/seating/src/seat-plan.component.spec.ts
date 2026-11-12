import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import type { NavigatePayload, RouteParams } from './contracts';
import { SeatPlanComponent } from './seat-plan.component';
import { seatsParamExample } from './testing/contracts.examples';
import { bus } from '@softarc/native-federation-communication';

describe('SeatPlanComponent', () => {
  let navigations: NavigatePayload[];

  beforeEach(() => {
    navigations = [];
    bus.on(
      'nav:navigate',
      (value) => navigations.push(value),
      { replay: false },
    );
  });

  // The shell writes routeParams as an element property; setInput is the same input.
  const render = async (routeParams: RouteParams) => {
    const fixture = TestBed.createComponent(SeatPlanComponent);
    fixture.componentRef.setInput('routeParams', routeParams);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const seat = (id: string) => el.querySelector<HTMLButtonElement>(`button[aria-label^="Seat ${id}"]`)!;
    const continueButton = () =>
      [...el.querySelectorAll('button')].find((b) => b.textContent?.trim() === 'Continue')!;
    const click = async (button: HTMLElement) => {
      button.click();
      await fixture.whenStable();
    };
    return { fixture, el, seat, continueButton, click };
  };

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
    expect(el.querySelector('[aria-label="Seat B3, taken"]')).not.toBeNull();
  });

  it('marks a toggled seat as pressed and releases it on a second click', async () => {
    const { seat, click } = await render({ screeningId: 's-101' });
    await click(seat('A1'));
    expect(seat('A1').getAttribute('aria-pressed')).toBe('true');
    await click(seat('A1'));
    expect(seat('A1').getAttribute('aria-pressed')).toBe('false');
  });

  it('keeps Continue disabled without a hold', async () => {
    const { continueButton } = await render({ screeningId: 's-101' });
    expect(continueButton().disabled).toBe(true);
  });

  it('asks the shell for booking.checkout with the seats in grid order', async () => {
    const { seat, continueButton, click } = await render({ screeningId: 's-101' });
    // Picked out of order on purpose: the payload must still read A1,A2.
    await click(seat('A2'));
    await click(seat('A1'));
    await click(continueButton());
    expect(navigations).toEqual([
      { id: 'booking.checkout', payload: { screeningId: 's-101', seats: seatsParamExample } },
    ]);
  });

  it('keeps the hold when routeParams is re-set with the same screening', async () => {
    const { fixture, seat, click } = await render({ screeningId: 's-101' });
    await click(seat('A1'));
    // The shell writes a fresh object on every param change; same values must not reset the hold.
    fixture.componentRef.setInput('routeParams', { screeningId: 's-101' });
    await fixture.whenStable();
    expect(seat('A1').getAttribute('aria-pressed')).toBe('true');
  });

  it('clears the hold when the screening changes', async () => {
    const { fixture, seat, continueButton, click } = await render({ screeningId: 's-101' });
    await click(seat('A1'));
    fixture.componentRef.setInput('routeParams', { screeningId: 's-102' });
    await fixture.whenStable();
    expect(seat('A1').getAttribute('aria-pressed')).toBe('false');
    expect(continueButton().disabled).toBe(true);
  });

  it('lists the held seats as chips with a count in the aside', async () => {
    const { el, seat, click } = await render({ screeningId: 's-101' });
    const chips = () => [...el.querySelectorAll('aside mat-chip')].map((c) => c.textContent?.trim());
    const count = () => el.querySelector('aside .count')?.textContent?.trim();
    expect(count()).toBe('No seats held');

    await click(seat('A2'));
    await click(seat('A1'));
    // grid order, not click order
    expect(chips()).toEqual(['A1', 'A2']);
    expect(count()).toBe('2 seats held');

    await click(seat('A2'));
    expect(chips()).toEqual(['A1']);
    expect(count()).toBe('1 seat held');

    // a static chip list, and the count is the live region so releases are announced too
    expect(el.querySelector('aside mat-chip-set')?.getAttribute('role')).toBe('list');
    expect(el.querySelector('aside mat-chip')?.getAttribute('role')).toBe('listitem');
    expect(el.querySelector('aside .count')?.getAttribute('aria-live')).toBe('polite');
  });
});
