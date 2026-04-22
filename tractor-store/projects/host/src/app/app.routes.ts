import { Routes } from '@angular/router';
import { ExploreShell } from './shell/explore-shell.component';
import { DecideShell } from './shell/decide-shell.component';
import { CheckoutShell } from './shell/checkout-shell.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: ExploreShell },
  { path: 'products', component: ExploreShell },
  { path: 'products/:category', component: ExploreShell },
  { path: 'stores', component: ExploreShell },
  { path: 'product/:id', component: DecideShell },
  { path: 'checkout/cart', component: CheckoutShell },
  { path: 'checkout/checkout', component: CheckoutShell },
  { path: 'checkout/thanks', component: CheckoutShell },
];
