import type { NavContribution } from './contracts';

export const navContribution: NavContribution = {
  basePath: 'programme',
  intents: [{ id: 'list', path: '', element: 'mfe-programme-list' }],
};
