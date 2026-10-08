import { remoteApp } from '../../core/remote-app';
import { StorePickerComponent } from './store-picker.component';

export const bootstrap = remoteApp.expose(
  'mfe-store-picker',
  StorePickerComponent,
);
