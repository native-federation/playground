import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Events, NavigatePayload } from './contracts';
import { ProgrammeListComponent } from './programme-list.component';
import { publishNavResolver } from './testing/nav-resolver.stub';

describe('ProgrammeListComponent', () => {
  let navigations: NavigatePayload[];
  let el: HTMLElement;

  beforeEach(async () => {
    navigations = [];
    window.__NF_REGISTRY__!.on<Events['nav:navigate']>(
      'nav:navigate',
      ({ data }) => navigations.push(data),
      { replay: 0 },
    );
    // Any non-null URL makes the links live; the shell's real resolver is tested there.
    await publishNavResolver((id) => `/${id}`);

    const fixture = TestBed.createComponent(ProgrammeListComponent);
    await fixture.whenStable();
    el = fixture.nativeElement;
  });

  it('renders one row per screening', () => {
    expect(el.querySelectorAll('mat-list-item')).toHaveLength(4);
    expect(el.querySelector('mat-list-item')?.textContent).toContain('The Quiet Harbour');
    expect(el.querySelector('mat-list-item')?.textContent).toContain('Mon 19:30');
  });

  it('asks the shell for the film page when a title is clicked', () => {
    el.querySelector<HTMLElement>('[matListItemTitle]')!.click();
    expect(navigations).toEqual([{ id: 'film.detail', payload: { filmId: 'f-1' } }]);
  });

  it('asks the shell for the seating plan when Seats is clicked', () => {
    el.querySelector<HTMLElement>('[mat-button]')!.click();
    expect(navigations).toEqual([
      { id: 'seating.plan', payload: { screeningId: 's-101' } },
    ]);
  });
});
