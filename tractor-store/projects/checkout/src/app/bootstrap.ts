import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { App } from './app';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart';
import { MiniCartComponent } from './components/mini-cart/mini-cart';
import { appConfig } from './app.config';
import { EnvironmentConfig } from '../env.config';
import { setImageServer } from './utils/image';

let bootstrapped = false;

export async function bootstrap(env: EnvironmentConfig): Promise<void> {
  if (bootstrapped) return;
  bootstrapped = true;

  setImageServer(env.imageServer);

  const { injector } = await createApplication(appConfig(env));

  customElements.define('mfe-checkout', createCustomElement(App, { injector }));
  customElements.define(
    'mfe-checkout-mini-cart',
    createCustomElement(MiniCartComponent, { injector }),
  );
  customElements.define(
    'mfe-checkout-add-to-cart',
    createCustomElement(AddToCartComponent, { injector }),
  );

  const router = injector.get(Router);
  router.initialNavigation();
}
