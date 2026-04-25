import { createCustomElement } from '@angular/elements';
import { ComponentBootstrap, LoadRemoteModule } from '@internal/federation';
import { EnvironmentConfig } from '../env.config';
import { App } from './app';
import { getApp } from './app-instance';

let registered = false;

export const bootstrap: ComponentBootstrap['bootstrap'] = async (
  env: EnvironmentConfig,
  loadRemoteModule: LoadRemoteModule,
): Promise<void> => {
  if (registered) return;
  registered = true;

  await Promise.all([
    loadRemoteModule<ComponentBootstrap>(
      '@tractor-store/explore',
      './Header',
    ).then((m) => m.bootstrap(env, loadRemoteModule)),
    loadRemoteModule<ComponentBootstrap>(
      '@tractor-store/explore',
      './Footer',
    ).then((m) => m.bootstrap(env, loadRemoteModule)),
    loadRemoteModule<ComponentBootstrap>(
      '@tractor-store/explore',
      './Recommendations',
    ).then((m) => m.bootstrap(env, loadRemoteModule)),
    loadRemoteModule<ComponentBootstrap>(
      '@tractor-store/checkout',
      './AddToCart',
    ).then((m) => m.bootstrap(env, loadRemoteModule)),
  ]);

  const { injector } = await getApp(env);

  if (!customElements.get('mfe-decide')) {
    customElements.define('mfe-decide', createCustomElement(App, { injector }));
  }
};
