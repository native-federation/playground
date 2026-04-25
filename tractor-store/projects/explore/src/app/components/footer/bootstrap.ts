import { createCustomElement } from '@angular/elements';
import { ComponentBootstrap, LoadRemoteModule } from '@internal/federation';
import { EnvironmentConfig } from '../../../env.config';
import { getApp } from '../../app-instance';
import { FooterComponent } from './footer';

let registered = false;

export const bootstrap: ComponentBootstrap['bootstrap'] = async (
  env: EnvironmentConfig,
  _loadRemoteModule: LoadRemoteModule,
): Promise<void> => {
  if (registered) return;
  registered = true;

  const { injector } = await getApp(env);

  if (!customElements.get('mfe-explore-footer')) {
    customElements.define(
      'mfe-explore-footer',
      createCustomElement(FooterComponent, { injector }),
    );
  }
};
