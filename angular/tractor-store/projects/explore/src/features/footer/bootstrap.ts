import { remoteApp } from '../../core/remote-app';
import { FooterComponent } from './footer.component';

export const bootstrap = remoteApp.expose('mfe-footer', FooterComponent);
