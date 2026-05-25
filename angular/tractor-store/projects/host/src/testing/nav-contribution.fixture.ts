import type { NavContribution } from '@internal/navigation';

export const exploreContribution: NavContribution = {
  source: '@tractor-store/explore',
  basePath: 'explore',
  intents: [
    { id: 'explore.home', path: '/', element: 'mfe-explore-home' },
    {
      id: 'explore.products',
      path: '/products',
      element: 'mfe-explore-list',
    },
  ],
};

export const decideContribution: NavContribution = {
  source: '@tractor-store/decide',
  basePath: 'decide',
  intents: [
    {
      id: 'decide.product',
      path: '/product/:id',
      element: 'mfe-decide-product',
    },
  ],
};
