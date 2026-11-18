import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProgrammeListComponent } from './programme-list.component';

// Film and booking are not loaded here, so their tags stay undefined: these specs check the
// literals programme writes. A drifted tag or attribute renders nothing at runtime, silently
// (docs/testing.md, contract #6).
describe('ProgrammeListComponent', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    const fixture = TestBed.createComponent(ProgrammeListComponent);
    await fixture.whenStable();
    el = fixture.nativeElement;
  });

  const groups = () => [...el.querySelectorAll('[role="group"]')];

  it('renders one card per screening with its day and time', () => {
    expect(groups()).toHaveLength(4);
    const when = groups()[0].querySelector('.when')!;
    expect(when.textContent).toContain('Mon');
    // plain strings from screenings.ts, so no locale or timezone dependence
    expect(when.querySelector('time')?.getAttribute('datetime')).toBe('19:30');
  });

  it("embeds film's card by the film-id attribute", () => {
    const cards = groups().map((group) => group.querySelector('mfe-film-card'));
    expect(cards.map((card) => card?.getAttribute('film-id'))).toEqual([
      'f-1',
      'f-2',
      'f-1',
      'f-3',
    ]);
  });

  it("embeds booking's start link by the screening-id attribute", () => {
    const starts = groups().map((group) => group.querySelector('mfe-booking-start'));
    expect(starts.map((start) => start?.getAttribute('screening-id'))).toEqual([
      's-101',
      's-102',
      's-103',
      's-104',
    ]);
  });

  it('labels each card by ids that programme owns, distinct per screening', () => {
    const labels = groups().map((group) => {
      const ids = group.getAttribute('aria-labelledby')!.split(' ');
      // the film card's host element and programme's own day/time element
      expect(ids.map((id) => el.querySelector(`#${id}`)?.tagName)).toEqual(['MFE-FILM-CARD', 'P']);
      return el.querySelector(`#${ids[1]}`)!.textContent!.replace(/\s+/g, ' ').trim();
    });
    // without film loaded the card is empty, so day and time alone must tell them apart,
    // including the two screenings of the same film
    expect(labels).toEqual(['Mon 19:30', 'Tue 20:00', 'Fri 21:15', 'Sat 14:00']);
  });
});
