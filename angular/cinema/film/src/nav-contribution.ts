import type { NavContribution } from './contracts';

export const navContribution: NavContribution = {
  basePath: 'film',
  intents: [{ id: 'detail', path: '{filmId}', element: 'mfe-film-detail' }],
};
