import { remoteApp } from '../../core/remote-app';
import { CategoryPage } from './category.page';

export const bootstrap = remoteApp.expose('mfe-category', CategoryPage);
