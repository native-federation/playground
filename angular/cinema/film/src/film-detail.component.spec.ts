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
    expect(el.querySelector('mat-card')).toBeNull();
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
    el.querySelector<HTMLElement>('a[mat-button]')!.click();
    expect(navigations).toEqual([{ id: 'programme.list', payload: {} }]);
  });
});
