import type { NavContribution } from '../contracts';

export const programmeContribution: NavContribution = {
  basePath: 'programme',
  intents: [{ id: 'list', path: '', element: 'mfe-programme-list' }],
};

export const seatingContribution: NavContribution = {
  basePath: 'seating',
  intents: [{ id: 'plan', path: '{screeningId}', element: 'mfe-seating-plan' }],
};
