import { Routes } from '@angular/router';

export const getRoutes = (): Routes => [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'stores',
    loadComponent: () =>
      import('./pages/stores/stores-page').then((m) => m.StoresPage),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/category/category-page').then((m) => m.CategoryPage),
  },
  {
    path: 'products/:category',
    loadComponent: () =>
      import('./pages/category/category-page').then((m) => m.CategoryPage),
  },
  {
    // Catch-all for URLs owned by other teams (e.g. /product/:id, /checkout/*).
    // Renders nothing — the host router decides which MFE is active via shell components.
    path: '**',
    loadComponent: () =>
      import('./pages/empty/empty.component').then((m) => m.EmptyPage),
  },
];
