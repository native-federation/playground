import { bus } from '@softarc/native-federation-communication';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bootstrap } from './bootstrap';
import type { NavigatePayload } from './contracts';
import { seatHoldExample, seatsParamExample } from './testing/contracts.examples';
import { publishNavIntents } from './testing/nav-intents.stub';

// Tested through the custom element, the way seating's page uses it: one screening-id attribute,
// and seating's hold on the bus.
describe('<mfe-booking-summary>', () => {
  let navigations: NavigatePayload[];

  beforeEach(() => {
    navigations = [];
    bus.on('nav:navigate', (value) => navigations.push(value), { replay: false });
    publishNavIntents({ 'booking.checkout': '/booking/{screeningId}/{seats}' });
  });

  afterEach(() => document.body.replaceChildren());

  const append = async (screeningId: string) => {
    await bootstrap();
    const el = document.createElement('mfe-booking-summary');
    el.setAttribute('screening-id', screeningId);
    document.body.append(el);
    return el;
  };

  const price = (el: HTMLElement) => el.querySelector('.price')?.textContent?.trim();
  const chips = (el: HTMLElement) =>
    [...el.querySelectorAll('mat-chip')].map((chip) => chip.textContent?.trim());
  const continueLink = (el: HTMLElement) => el.querySelector<HTMLAnchorElement>('a');

  // Must run first: seating's effect emits before booking's element upgrades, so the card must pick
  // up the hold that was retained before it existed.
  it('shows a hold retained before the tag was defined', async () => {
    expect(customElements.get('mfe-booking-summary')).toBeUndefined();
    bus.emit('seating:hold', seatHoldExample);
    const el = await append('s-101');
    await vi.waitFor(() => expect(chips(el)).toEqual(['A1', 'A2']));
  });

  it('prices the hold and links Continue to checkout', async () => {
    const el = await append('s-101');
    bus.emit('seating:hold', seatHoldExample);
    await vi.waitFor(() => expect(price(el)).toBe('2 tickets × €12 = €24'));
    // urlFor encodes path params; the router shows the comma unescaped once it navigates.
    expect(continueLink(el)?.getAttribute('href')).toBe('/booking/s-101/A1%2CA2');
  });

  it('asks the shell for checkout with the seats as booking writes them in the URL', async () => {
    const el = await append('s-101');
    bus.emit('seating:hold', seatHoldExample);
    await vi.waitFor(() => expect(continueLink(el)).not.toBeNull());
    continueLink(el)!.click();
    expect(navigations).toEqual([
      { id: 'booking.checkout', payload: { screeningId: 's-101', seats: seatsParamExample } },
    ]);
  });

  it('follows the hold as seats are picked and released', async () => {
    const el = await append('s-101');
    bus.emit('seating:hold', { screeningId: 's-101', seats: ['A1'] });
    await vi.waitFor(() => expect(price(el)).toBe('1 ticket × €12 = €12'));
    bus.emit('seating:hold', { screeningId: 's-101', seats: [] });
    await vi.waitFor(() => expect(price(el)).toBe('Pick one or more free seats.'));
    expect(chips(el)).toEqual([]);
    expect(continueLink(el)).toBeNull();
    expect(el.querySelector<HTMLButtonElement>('button')?.disabled).toBe(true);
  });

  it('ignores a hold for another screening', async () => {
    // Retained from a screening seating showed earlier.
    bus.emit('seating:hold', { screeningId: 's-102', seats: ['C3'] });
    const el = await append('s-101');
    await vi.waitFor(() => expect(price(el)).toBe('Pick one or more free seats.'));
    expect(chips(el)).toEqual([]);
  });
});
