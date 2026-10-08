import { remoteApp } from '../../core/remote-app';
import { CheckoutPage } from './checkout.page';

export const bootstrap = remoteApp.expose('mfe-checkout', CheckoutPage);
