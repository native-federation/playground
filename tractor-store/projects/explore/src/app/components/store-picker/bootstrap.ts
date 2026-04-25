import { createCustomElement } from '@angular/elements';
import { ComponentBootstrap, LoadRemoteModule } from '@internal/federation';
import { EnvironmentConfig } from '../../../env.config';
import { getApp } from '../../app-instance';
import { StorePickerComponent } from './store-picker';

let registered = false;

export const bootstrap: ComponentBootstrap['bootstrap'] = async (
  env: EnvironmentConfig,
  _loadRemoteModule: LoadRemoteModule,
): Promise<void> => {
  if (registered) return;
  registered = true;

  const { injector } = await getApp(env);

  if (!customElements.get('mfe-explore-store-picker')) {
    customElements.define(
      'mfe-explore-store-picker',
      createCustomElement(StorePickerComponent, { injector }),
    );
  }
};
