import { bus } from '@softarc/native-federation-communication';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bootstrap } from './bootstrap';
import type { NavigatePayload } from './contracts';
import { publishNavResolver } from './testing/nav-resolver.stub';

// Tested through the custom element, the way programme's page uses it: one screening-id attribute.
describe('<mfe-booking-start>', () => {
  let navigations: NavigatePayload[];

  beforeEach(() => {
    navigations = [];
    bus.on('nav:navigate', (value) => navigations.push(value), { replay: false });
    publishNavResolver((id, payload) =>
      id === 'seating.plan' ? `/seating/${payload?.['screeningId']}` : null,
    );
  });

  afterEach(() => document.body.replaceChildren());

  const append = (screeningId: string) => {
    const el = document.createElement('mfe-booking-start');
    el.setAttribute('screening-id', screeningId);
    document.body.append(el);
    return el;
  };

  const link = (el: HTMLElement) => el.querySelector<HTMLAnchorElement>('a');

  // Must run first: the shell does not await the load, so programme writes the
  // tag before booking defines it and the element upgrades later.
  it('links to its screening when the attribute was set before the tag was defined', async () => {
    expect(customElements.get('mfe-booking-start')).toBeUndefined();
    const el = append('s-102');
    await bootstrap();
    await vi.waitFor(() => expect(link(el)?.getAttribute('href')).toBe('/seating/s-102'));
  });

  it('is a real link that shows the price per seat', async () => {
    await bootstrap();
    const el = append('s-101');
    await vi.waitFor(() => expect(link(el)?.getAttribute('href')).toBe('/seating/s-101'));
    expect(el.querySelector('button')).toBeNull();
    expect(link(el)?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Book · €12 per seat');
  });

  it('asks the shell for the seating plan when clicked', async () => {
    await bootstrap();
    const el = append('s-101');
    await vi.waitFor(() => expect(link(el)?.getAttribute('href')).toBe('/seating/s-101'));
    link(el)!.click();
    expect(navigations).toEqual([{ id: 'seating.plan', payload: { screeningId: 's-101' } }]);
  });
});
