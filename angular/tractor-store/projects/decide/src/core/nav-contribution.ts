import { NavContribution } from '@tractor-store/shared';

export const navContribution: NavContribution = {
  basePath: 'decide',
  intents: [{ id: 'product', path: '/product/{id}', element: 'mfe-product' }],
};
