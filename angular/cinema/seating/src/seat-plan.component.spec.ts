import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Events, NavigatePayload, RouteParams } from './contracts';
import { SeatPlanComponent } from './seat-plan.component';
import { seatsParamExample } from './testing/contracts.examples';

describe('SeatPlanComponent', () => {
  let navigations: NavigatePayload[];

  beforeEach(() => {
    navigations = [];
    window.__NF_REGISTRY__!.on<Events['nav:navigate']>(
      'nav:navigate',
      ({ data }) => navigations.push(data),
      { replay: 0 },
    );
  });

  // The shell writes routeParams as an element property; setInput is the same input.
  const render = async (routeParams: RouteParams) => {
    const fixture = TestBed.createComponent(SeatPlanComponent);
    fixture.componentRef.setInput('routeParams', routeParams);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const seat = (id: string) => el.querySelector<HTMLButtonElement>(`[aria-label^="Seat ${id}"]`)!;
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
    const seats = [...el.querySelectorAll<HTMLButtonElement>('[aria-label^="Seat "]')];
    expect(seats).toHaveLength(40);
    // The fixed table in seats.ts for s-101.
    expect(seats.filter((b) => b.disabled).map((b) => b.textContent?.trim())).toEqual([
      'B3',
      'B4',
      'C5',
      'E1',
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
});
