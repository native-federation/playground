import { createCustomElement } from '@angular/elements';
import { getAppInjector } from './app.config';
import { FilmDetailComponent } from './film-detail.component';

const tag = 'mfe-film-detail';

export const bootstrap = async (): Promise<void> => {
  const injector = await getAppInjector();
  if (customElements.get(tag)) return;
  customElements.define(
    tag,
    createCustomElement(FilmDetailComponent, { injector }),
  );
};
