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

  await Promise.all(
    (
      [
        './Header',
        './Footer',
        './Recommendations',
        './StorePicker',
      ] as const
    ).map((key) =>
      loadRemoteModule<ComponentBootstrap>('@tractor-store/explore', key).then(
        (m) => m.bootstrap(env, loadRemoteModule),
      ),
    ),
  );

  const { injector } = await getApp(env);

  if (!customElements.get('mfe-checkout')) {
    customElements.define('mfe-checkout', createCustomElement(App, { injector }));
  }
};
