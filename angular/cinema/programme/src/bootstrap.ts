import { createCustomElement } from '@angular/elements';
import { getAppInjector } from './app.config';
import { ProgrammeListComponent } from './programme-list.component';

const tag = 'mfe-programme-list';

export const bootstrap = async (): Promise<void> => {
  const injector = await getAppInjector();
  if (customElements.get(tag)) return;
  customElements.define(
    tag,
    createCustomElement(ProgrammeListComponent, { injector }),
  );
};
