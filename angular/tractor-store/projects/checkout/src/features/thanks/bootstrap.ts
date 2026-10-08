import { remoteApp } from '../../core/remote-app';
import { ThanksPage } from './thanks.page';

export const bootstrap = remoteApp.expose('mfe-thanks', ThanksPage);
