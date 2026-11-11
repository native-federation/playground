export interface Film {
  readonly filmId: string;
  readonly title: string;
  readonly synopsis: string;
  readonly runtimeMinutes: number;
  readonly ageRating: string;
  readonly poster: string;
}

export const films: readonly Film[] = [
  {
    filmId: 'f-1',
    title: 'The Quiet Harbour',
    synopsis: 'A lighthouse keeper finds a message that should have arrived forty years ago.',
    runtimeMinutes: 112,
    ageRating: '12',
    poster: '⚓',
  },
  {
    filmId: 'f-2',
    title: 'Paper Moons',
    synopsis: 'Two rival puppeteers stage one last show in a town that has stopped dreaming.',
    runtimeMinutes: 95,
    ageRating: 'AL',
    poster: '🌙',
  },
  {
    filmId: 'f-3',
    title: 'Owl Street',
    synopsis: 'A night-shift courier and a curious owl follow the same mysterious parcel.',
    runtimeMinutes: 88,
    ageRating: '6',
    poster: '🦉',
  },
];
