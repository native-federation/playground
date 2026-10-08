import {
  type EnvironmentProviders,
  type Injector,
  type Provider,
  type Type,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import type { EnvironmentConfig } from './env';
import { provideEnv } from './provide-env';
import {
  LOAD_REMOTE,
  type LoadRemote,
  type RemoteElementModule,
} from './remote-loader';

export interface RemoteApp {
  expose(
    tag: string,
    component: Type<unknown>,
  ): RemoteElementModule['bootstrap'];
}

// Call once per remote. Every element it exposes shares one Angular application.
// The cache lives in this closure, not at module level, because this lib is a
// federation singleton shared by all remotes.
export const defineRemoteApp = (
  providers: (Provider | EnvironmentProviders)[] = [],
): RemoteApp => {
  let injector: Promise<Injector> | undefined;

  const getInjector = (env: EnvironmentConfig, loadRemote: LoadRemote) =>
    (injector ??= createApplication({
      providers: [
        provideEnv(env),
        { provide: LOAD_REMOTE, useValue: loadRemote },
        provideZonelessChangeDetection(),
        provideHttpClient(withFetch()),
        ...providers,
      ],
    }).then((app) => app.injector));

  return {
    expose: (tag, component) => async (env, loadRemote) => {
      const elementInjector = await getInjector(env, loadRemote);
      if (customElements.get(tag)) return;
      customElements.define(
        tag,
        createCustomElement(component, { injector: elementInjector }),
      );
    },
  };
};
