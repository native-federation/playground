import { NavContribution } from '@tractor-store/shared';

export const navContribution: NavContribution = {
  basePath: 'explore',
  intents: [
    { id: 'home', path: '/', element: 'mfe-home' },
    { id: 'products', path: '/products', element: 'mfe-category' },
    {
      id: 'products.category',
      path: '/products/{category}',
      element: 'mfe-category',
    },
    { id: 'stores', path: '/stores', element: 'mfe-stores' },
  ],
};
