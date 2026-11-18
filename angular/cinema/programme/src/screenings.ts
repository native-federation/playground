export interface Screening {
  readonly screeningId: string;
  readonly filmId: string;
  readonly day: string;
  readonly time: string;
}

export const screenings: readonly Screening[] = [
  { screeningId: 's-101', filmId: 'f-1', day: 'Mon', time: '19:30' },
  { screeningId: 's-102', filmId: 'f-2', day: 'Tue', time: '20:00' },
  { screeningId: 's-103', filmId: 'f-1', day: 'Fri', time: '21:15' },
  { screeningId: 's-104', filmId: 'f-3', day: 'Sat', time: '14:00' },
];
