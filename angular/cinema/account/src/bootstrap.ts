import { createCustomElement } from '@angular/elements';
import { getAppInjector } from './app.config';
import { ProfileComponent } from './profile.component';

const tag = 'mfe-account-profile';

export const bootstrap = async (): Promise<void> => {
  const injector = await getAppInjector();
  if (customElements.get(tag)) return;
  customElements.define(
    tag,
    createCustomElement(ProfileComponent, { injector }),
  );
};
