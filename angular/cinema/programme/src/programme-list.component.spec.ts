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

  it('renders one card per screening', () => {
    expect(el.querySelectorAll('mat-card')).toHaveLength(4);
    const first = el.querySelector('mat-card')!;
    expect(first.textContent).toContain('Mon');
    expect(first.textContent).toContain('19:30');
    expect(first.textContent).toContain('The Quiet Harbour');
    // plain strings from screenings.ts, so no locale or timezone dependence
    expect(first.querySelector('time')?.getAttribute('datetime')).toBe('19:30');
  });

  it('asks the shell for the film page when a title is clicked', () => {
    el.querySelector<HTMLElement>('a.title')!.click();
    expect(navigations).toEqual([{ id: 'film.detail', payload: { filmId: 'f-1' } }]);
  });

  it('asks the shell for the seating plan when Choose seats is clicked', () => {
    el.querySelector<HTMLElement>('a[navIntent="seating.plan"]')!.click();
    expect(navigations).toEqual([
      { id: 'seating.plan', payload: { screeningId: 's-101' } },
    ]);
  });

  it('describes each Choose seats link by its film title and start time', () => {
    const seats = [...el.querySelectorAll('a[navIntent="seating.plan"]')];
    const descriptions = seats.map((link) =>
      link
        .getAttribute('aria-describedby')!
        .split(' ')
        .map((id) => el.querySelector(`#${id}`)!.textContent!.replace(/\s+/g, ' ').trim())
        .join(' '),
    );
    // the four links share the name "Choose seats"; title + day/time tells them apart,
    // including the two screenings of The Quiet Harbour
    expect(descriptions).toEqual([
      'The Quiet Harbour Mon 19:30',
      'Paper Moons Tue 20:00',
      'The Quiet Harbour Fri 21:15',
      'Owl Street Sat 14:00',
    ]);
    expect(new Set(descriptions).size).toBe(4);
  });
});
