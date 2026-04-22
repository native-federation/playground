import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { App } from './app';
import { appConfig } from './app.config';
import { EnvironmentConfig } from '../env.config';
import { Router } from '@angular/router';
import { setImageServer } from './utils/image';

let registered = false;

export async function bootstrap(env: EnvironmentConfig): Promise<void> {
  if (registered) return;
  registered = true;

  setImageServer(env.imageServer);

  await createApplication(appConfig(env)).then(({ injector }) => {
    if (!customElements.get('mfe-decide')) {
      customElements.define(
        'mfe-decide',
        createCustomElement(App, { injector }),
      );
    }

    const router = injector.get(Router);
    router.initialNavigation();
  });
}
