import { Routes } from '@angular/router';

export const getRoutes = (): Routes => [
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product/product-page').then((m) => m.ProductPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/empty/empty.component').then((m) => m.EmptyPage),
  },
];
