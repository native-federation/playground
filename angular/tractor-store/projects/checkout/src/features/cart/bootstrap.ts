import { remoteApp } from '../../core/remote-app';
import { CartPage } from './cart.page';

export const bootstrap = remoteApp.expose('mfe-cart', CartPage);
