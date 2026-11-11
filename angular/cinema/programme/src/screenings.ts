export interface Screening {
  readonly screeningId: string;
  readonly filmId: string;
  readonly title: string;
  readonly startsAt: string;
}

export const screenings: readonly Screening[] = [
  { screeningId: 's-101', filmId: 'f-1', title: 'The Quiet Harbour', startsAt: 'Mon 19:30' },
  { screeningId: 's-102', filmId: 'f-2', title: 'Paper Moons', startsAt: 'Tue 20:00' },
  { screeningId: 's-103', filmId: 'f-1', title: 'The Quiet Harbour', startsAt: 'Fri 21:15' },
  { screeningId: 's-104', filmId: 'f-3', title: 'Owl Street', startsAt: 'Sat 14:00' },
];
