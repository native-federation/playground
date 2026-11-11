import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Events, NavigatePayload, RouteParams } from './contracts';
import { FilmDetailComponent } from './film-detail.component';
import { publishNavResolver } from './testing/nav-resolver.stub';

describe('FilmDetailComponent', () => {
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
    const fixture = TestBed.createComponent(FilmDetailComponent);
    fixture.componentRef.setInput('routeParams', routeParams);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    return { fixture, el };
  };

  it('renders the film named by routeParams.filmId', async () => {
    const { el } = await render({ filmId: 'f-2' });
    expect(el.querySelector('h1')?.textContent).toContain('Paper Moons');
    expect(el.textContent).toContain('95 min');
  });

  it('says the film is not found for an unknown filmId', async () => {
    const { el } = await render({ filmId: 'f-404' });
    expect(el.querySelector('[role="status"]')?.textContent).toContain('Film not found.');
    expect(el.querySelector('article')).toBeNull();
    // the way back is always offered, even when the film is unknown
    expect(el.querySelector('a[navIntent="programme.list"]')).not.toBeNull();
  });

  it('lists runtime and age as a labelled list of chips', async () => {
    const { el } = await render({ filmId: 'f-2' });
    // mat-chip-set defaults to role="presentation"; the template sets list/listitem explicitly
    const list = el.querySelector('mat-chip-set')!;
    expect(list.getAttribute('role')).toBe('list');
    expect(list.getAttribute('aria-label')).toBe('Film details');
    const items = [...list.querySelectorAll('[role="listitem"]')];
    expect(items.map((item) => item.textContent?.trim())).toEqual(['95 min', 'All ages']);
    // matChipAvatar sets role="img" without a name, so the decorative icons are hidden
    const avatars = [...list.querySelectorAll('[matChipAvatar]')];
    expect(avatars).toHaveLength(2);
    expect(avatars.every((a) => a.getAttribute('aria-hidden') === 'true')).toBe(true);
  });

  it('re-renders when routeParams change', async () => {
    const { fixture, el } = await render({ filmId: 'f-1' });
    fixture.componentRef.setInput('routeParams', { filmId: 'f-3' });
    await fixture.whenStable();
    expect(el.querySelector('h1')?.textContent).toContain('Owl Street');
  });

  it('asks the shell for the programme from the back link', async () => {
    // Any non-null URL makes the link live; the shell's real resolver is tested there.
    await publishNavResolver((id) => `/${id}`);
    const { el } = await render({ filmId: 'f-1' });
    el.querySelector<HTMLElement>('a[navIntent="programme.list"]')!.click();
    expect(navigations).toEqual([{ id: 'programme.list', payload: {} }]);
  });
});
