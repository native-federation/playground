export interface Film {
  readonly filmId: string;
  readonly title: string;
  readonly synopsis: string;
  readonly runtimeMinutes: number;
  readonly ageLabel: string;
  readonly poster: 'anchor' | 'moon' | 'feather';
  readonly tint: 'primary' | 'tertiary';
}

export const films: readonly Film[] = [
  {
    filmId: 'f-1',
    title: 'The Quiet Harbour',
    synopsis: 'A lighthouse keeper finds a message that should have arrived forty years ago.',
    runtimeMinutes: 112,
    ageLabel: 'Age 12',
    poster: 'anchor',
    tint: 'primary',
  },
  {
    filmId: 'f-2',
    title: 'Paper Moons',
    synopsis: 'Two rival puppeteers stage one last show in a town that has stopped dreaming.',
    runtimeMinutes: 95,
    ageLabel: 'All ages',
    poster: 'moon',
    tint: 'tertiary',
  },
  {
    filmId: 'f-3',
    title: 'Owl Street',
    synopsis: 'A night-shift courier and a curious owl follow the same mysterious parcel.',
    runtimeMinutes: 88,
    ageLabel: 'Age 6',
    poster: 'feather',
    tint: 'primary',
  },
];
