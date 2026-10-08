import { remoteApp } from '../../core/remote-app';
import { StoresPage } from './stores.page';

export const bootstrap = remoteApp.expose('mfe-stores', StoresPage);
