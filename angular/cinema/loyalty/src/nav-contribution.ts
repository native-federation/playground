import type { NavContribution } from './contracts';

export const navContribution: NavContribution = {
  basePath: 'loyalty',
  intents: [
    { id: 'points', path: '', element: 'mfe-loyalty-points', menuLabel: 'Points' },
  ],
  fragments: [{ element: 'mfe-loyalty-badge', slot: 'header' }],
};
