import type { NavContribution } from '@tractor-store/contracts';

// Same shapes as the real remotes' nav-contribution.ts files.
export const exploreContribution: NavContribution = {
  basePath: 'explore',
  intents: [
    { id: 'home', path: '/', element: 'mfe-home' },
    {
      id: 'products.category',
      path: '/products/{category}',
      element: 'mfe-category',
    },
  ],
};

export const decideContribution: NavContribution = {
  basePath: 'decide',
  intents: [
    { id: 'product', path: '/product/{id}', element: 'mfe-product' },
    { id: 'about', path: '/about' },
  ],
};
