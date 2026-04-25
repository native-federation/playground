import { createCustomElement } from '@angular/elements';
import { ComponentBootstrap, LoadRemoteModule } from '@internal/federation';
import { EnvironmentConfig } from '../../../env.config';
import { getApp } from '../../app-instance';
import { HeaderComponent } from './header';

let registered = false;

export const bootstrap: ComponentBootstrap['bootstrap'] = async (
  env: EnvironmentConfig,
  loadRemoteModule: LoadRemoteModule,
): Promise<void> => {
  if (registered) return;
  registered = true;

  await loadRemoteModule<ComponentBootstrap>(
    '@tractor-store/checkout',
    './MiniCart',
  ).then((m) => m.bootstrap(env, loadRemoteModule));

  const { injector } = await getApp(env);

  if (!customElements.get('mfe-explore-header')) {
    customElements.define(
      'mfe-explore-header',
      createCustomElement(HeaderComponent, { injector }),
    );
  }
};
