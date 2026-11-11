import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { BOOKING_REF } from './booking-ref';
import { CheckoutComponent } from './checkout.component';
import type { BookingConfirmed, Events, RouteParams } from './contracts';
import { bookingConfirmedExample, seatsParamExample } from './testing/contracts.examples';

describe('CheckoutComponent', () => {
  let confirmations: BookingConfirmed[];

  beforeEach(() => {
    confirmations = [];
    window.__NF_REGISTRY__!.on<Events['booking:confirmed']>(
      'booking:confirmed',
      ({ data }) => confirmations.push(data),
      { replay: 0 },
    );
    TestBed.configureTestingModule({
      providers: [{ provide: BOOKING_REF, useValue: () => 'BR-0001' }],
    });
  });

  // The shell writes routeParams as an element property; setInput is the same input.
  const render = async (routeParams: RouteParams) => {
    const fixture = TestBed.createComponent(CheckoutComponent);
    fixture.componentRef.setInput('routeParams', routeParams);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const confirmButton = () =>
      [...el.querySelectorAll('button')].find((b) => b.textContent?.trim() === 'Confirm booking');
    return { fixture, el, confirmButton };
  };

  it('prices the hold at €12 per ticket', async () => {
    const { el } = await render({ screeningId: 's-101', seats: seatsParamExample });
    expect(el.querySelector('dd.value')?.textContent?.trim()).toBe('s-101');
    const chips = el.querySelectorAll('[role="list"][aria-label="Seats"] [role="listitem"]');
    expect([...chips].map((c) => c.textContent?.trim())).toEqual([
      'A1',
      'A2',
    ]);
    expect(el.textContent).toContain('2 tickets × €12');
    expect(el.querySelector('.total dd')?.textContent?.trim()).toBe('€24');
  });

  it('publishes booking:confirmed once and shows the ref', async () => {
    const { fixture, el, confirmButton } = await render({
      screeningId: 's-101',
      seats: seatsParamExample,
    });
    confirmButton()!.click();
    await fixture.whenStable();

    // The payload is the contract: exactly the example's keys, nothing extra.
    expect(Object.keys(confirmations[0]).sort()).toEqual(
      Object.keys(bookingConfirmedExample).sort(),
    );
    expect(confirmations).toEqual([{ bookingRef: 'BR-0001', ticketCount: 2 }]);
    const status = el.querySelector('[role="status"]')?.textContent;
    expect(status).toContain('BR-0001');
    expect(status).toContain('Screening s-101 · Seats A1, A2 · 2 tickets · €24');
    // The button is removed, so focus moves to the result heading instead of <body>.
    expect(document.activeElement?.tagName).toBe('H2');
    expect(document.activeElement?.textContent?.trim()).toBe('Booking confirmed');
    expect(confirmButton()).toBeUndefined();
  });

  it('emits once when Confirm is clicked twice before a render', async () => {
    const { fixture, confirmButton } = await render({
      screeningId: 's-101',
      seats: seatsParamExample,
    });
    // Same task, no whenStable in between: the button is still in the DOM.
    const button = confirmButton()!;
    button.click();
    button.click();
    await fixture.whenStable();
    expect(confirmations).toEqual([{ bookingRef: 'BR-0001', ticketCount: 2 }]);
  });

  it.each(['', 'A1,,x', 'a1', 'A1;A2'])('treats seats %j as an empty checkout', async (seats) => {
    const { el, confirmButton } = await render({ screeningId: 's-101', seats });
    expect(el.textContent).toContain('No seats selected.');
    expect(confirmButton()).toBeUndefined();
  });

  it('treats missing params as an empty checkout', async () => {
    const { el, confirmButton } = await render({});
    expect(el.textContent).toContain('No seats selected.');
    expect(confirmButton()).toBeUndefined();
  });

  it('keeps the confirmation when the shell re-sets the same values as a new object', async () => {
    const { fixture, el, confirmButton } = await render({
      screeningId: 's-101',
      seats: seatsParamExample,
    });
    confirmButton()!.click();
    await fixture.whenStable();
    fixture.componentRef.setInput('routeParams', {
      screeningId: 's-101',
      seats: seatsParamExample,
    });
    await fixture.whenStable();
    expect(el.textContent).toContain('BR-0001');
    expect(confirmButton()).toBeUndefined();
  });

  it('clears the confirmation when the hold changes', async () => {
    const { fixture, el, confirmButton } = await render({
      screeningId: 's-101',
      seats: seatsParamExample,
    });
    confirmButton()!.click();
    await fixture.whenStable();
    // Same screening, other seats: proves the seats are part of the reset key.
    fixture.componentRef.setInput('routeParams', { screeningId: 's-101', seats: 'B1' });
    await fixture.whenStable();
    expect(el.textContent).not.toContain('BR-0001');
    expect(el.textContent).toContain('1 ticket ×');
    expect(el.querySelector('.total dd')?.textContent?.trim()).toBe('€12');
    expect(confirmButton()).toBeDefined();
  });
});
