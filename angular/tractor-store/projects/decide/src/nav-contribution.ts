import type { NavContribution } from '@tractor-store/contracts';

export const navContribution: NavContribution = {
  basePath: 'decide',
  intents: [{ id: 'product', path: '/product/{id}', element: 'mfe-product' }],
};
