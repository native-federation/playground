import type { NavContribution } from './contracts';

export const navContribution: NavContribution = {
  basePath: 'notifications',
  intents: [],
  fragments: [{ element: 'mfe-notifications-toast', slot: 'overlay' }],
};
