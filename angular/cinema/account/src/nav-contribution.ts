import type { NavContribution } from './contracts';

export const navContribution: NavContribution = {
  basePath: 'account',
  intents: [{ id: 'profile', path: '', element: 'mfe-account-profile' }],
};
