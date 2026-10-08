import { remoteApp } from '../../core/remote-app';
import { ProductPage } from './product.page';

export const bootstrap = remoteApp.expose('mfe-product', ProductPage);
