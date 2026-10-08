import { remoteApp } from '../../core/remote-app';
import { HomePage } from './home.page';

export const bootstrap = remoteApp.expose('mfe-home', HomePage);
