import { remoteApp } from '../../core/remote-app';
import { MiniCartComponent } from './mini-cart.component';

export const bootstrap = remoteApp.expose('mfe-mini-cart', MiniCartComponent);
