import { NavContribution } from '@internal/navigation';

export const navContribution: NavContribution = {
  source: '@tractor-store/checkout',
  basePath: 'checkout',
  intents: [
    { id: 'cart', path: '/cart', element: 'mfe-cart' },
    { id: 'checkout', path: '/checkout', element: 'mfe-checkout' },
    { id: 'thanks', path: '/thanks', element: 'mfe-thanks' },
  ],
};
