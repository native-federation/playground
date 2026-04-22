import { Routes } from '@angular/router';

export const getRoutes = (): Routes => [
  {
    path: 'checkout/cart',
    loadComponent: () =>
      import('./pages/cart/cart-page').then((m) => m.CartPage),
  },
  {
    path: 'checkout/checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout-page').then((m) => m.CheckoutPage),
  },
  {
    path: 'checkout/thanks',
    loadComponent: () =>
      import('./pages/thanks/thanks-page').then((m) => m.ThanksPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/empty/empty.component').then((m) => m.EmptyPage),
  },
];
