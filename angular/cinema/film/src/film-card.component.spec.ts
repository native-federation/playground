import { bus } from '@softarc/native-federation-communication';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bootstrap } from './bootstrap';
import type { NavigatePayload } from './contracts';
import { publishNavResolver } from './testing/nav-resolver.stub';

// Tested through the custom element, the way programme's page uses it: one film-id attribute.
describe('<mfe-film-card>', () => {
  let navigations: NavigatePayload[];

  beforeEach(() => {
    navigations = [];
    bus.on('nav:navigate', (value) => navigations.push(value), { replay: false });
    publishNavResolver((id, payload) =>
      id === 'film.detail' ? `/film/${payload?.['filmId']}` : null,
    );
  });

  afterEach(() => document.body.replaceChildren());

  const append = (filmId: string) => {
    const el = document.createElement('mfe-film-card');
    el.setAttribute('film-id', filmId);
    document.body.append(el);
    return el;
  };

  const titleLink = (el: HTMLElement) => el.querySelector<HTMLAnchorElement>('h2 a');

  // Must run first: the shell does not await the load, so programme writes the
  // tag before film defines it and the element upgrades later.
  it('renders the film when the attribute was set before the tag was defined', async () => {
    expect(customElements.get('mfe-film-card')).toBeUndefined();
    const el = append('f-2');
    await bootstrap();
    await vi.waitFor(() => expect(titleLink(el)?.textContent).toBe('Paper Moons'));
  });

  it('renders poster, title, runtime and age label for its film-id', async () => {
    await bootstrap();
    const el = append('f-1');
    await vi.waitFor(() => expect(titleLink(el)?.getAttribute('href')).toBe('/film/f-1'));
    expect(titleLink(el)?.textContent).toBe('The Quiet Harbour');
    expect(el.querySelector('app-poster svg')?.getAttribute('aria-hidden')).toBe('true');
    expect(el.querySelector('.facts')?.textContent).toBe('112 min · Age 12');
  });

  it('asks the shell for the film page when the title is clicked', async () => {
    await bootstrap();
    const el = append('f-3');
    await vi.waitFor(() => expect(titleLink(el)?.getAttribute('href')).toBe('/film/f-3'));
    titleLink(el)!.click();
    expect(navigations).toEqual([{ id: 'film.detail', payload: { filmId: 'f-3' } }]);
  });

  it('renders nothing for an unknown film-id', async () => {
    await bootstrap();
    const known = append('f-1');
    const unknown = append('f-404');
    await vi.waitFor(() => expect(titleLink(known)).not.toBeNull());
    expect(unknown.children).toHaveLength(0);
  });
});
