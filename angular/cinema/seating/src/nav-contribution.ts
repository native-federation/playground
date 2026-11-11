import type { NavContribution } from './contracts';

export const navContribution: NavContribution = {
  basePath: 'seating',
  intents: [{ id: 'plan', path: '{screeningId}', element: 'mfe-seating-plan' }],
};
