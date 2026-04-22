import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { App } from './app';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { RecommendationsComponent } from './components/recommendations/recommendations';
import { StorePickerComponent } from './components/store-picker/store-picker';
import { appConfig } from './app.config';
import { EnvironmentConfig } from '../env.config';
import { setImageServer } from './utils/image';

let bootstrapped = false;

function defineOnce(name: string, ctor: CustomElementConstructor): void {
  if (!customElements.get(name)) {
    customElements.define(name, ctor);
  }
}

export async function bootstrap(env: EnvironmentConfig): Promise<void> {
  if (bootstrapped) return;
  bootstrapped = true;

  setImageServer(env.imageServer);

  const { injector } = await createApplication(appConfig(env));

  defineOnce('mfe-explore', createCustomElement(App, { injector }));
  defineOnce(
    'mfe-explore-header',
    createCustomElement(HeaderComponent, { injector }),
  );
  defineOnce(
    'mfe-explore-footer',
    createCustomElement(FooterComponent, { injector }),
  );
  defineOnce(
    'mfe-explore-recommendations',
    createCustomElement(RecommendationsComponent, { injector }),
  );
  defineOnce(
    'mfe-explore-store-picker',
    createCustomElement(StorePickerComponent, { injector }),
  );

  const router = injector.get(Router);
  router.initialNavigation();
}
