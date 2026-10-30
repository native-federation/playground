import type { NavContribution } from '@react-internal/navigation';

export const navContribution: NavContribution = {
  source: '@tractor-store/explore',
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
  chromeElements: ['mfe-header', 'mfe-footer', 'mfe-recommendations', 'mfe-store-picker'],
};
