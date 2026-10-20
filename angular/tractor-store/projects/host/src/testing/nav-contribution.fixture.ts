import type { NavContribution } from '@tractor-store/contracts';

export const exploreContribution: NavContribution = {
  basePath: 'explore',
  intents: [
    { id: 'home', path: '/', element: 'mfe-explore-home' },
    {
      id: 'products',
      path: '/products',
      element: 'mfe-explore-list',
    },
  ],
};

export const decideContribution: NavContribution = {
  basePath: 'decide',
  intents: [
    {
      id: 'product',
      path: '/product/{id}',
      element: 'mfe-decide-product',
    },
  ],
};
