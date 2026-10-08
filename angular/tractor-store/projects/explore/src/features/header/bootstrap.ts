import { remoteApp } from '../../core/remote-app';
import { HeaderComponent } from './header.component';

export const bootstrap = remoteApp.expose('mfe-header', HeaderComponent);
