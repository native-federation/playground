import { remoteApp } from '../../core/remote-app';
import { AddToCartElement } from './add-to-cart-element';

export const bootstrap = remoteApp.expose('mfe-add-to-cart', AddToCartElement);
