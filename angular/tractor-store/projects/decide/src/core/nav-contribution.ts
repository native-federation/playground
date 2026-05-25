import { NavContribution } from '@internal/navigation';

export const navContribution: NavContribution = {
  source: '@tractor-store/decide',
  basePath: 'decide',
  intents: [
    { id: 'product', path: '/product/:id', element: 'mfe-product' },
  ],
};
