import { createCustomElement } from '@angular/elements';
import { getAppInjector } from './app.config';
import { ToastComponent } from './toast.component';

const tag = 'mfe-notifications-toast';

export const bootstrap = async (): Promise<void> => {
  const injector = await getAppInjector();
  if (customElements.get(tag)) return;
  customElements.define(
    tag,
    createCustomElement(ToastComponent, { injector }),
  );
};
