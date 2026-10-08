import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEnv, LOAD_REMOTE } from '@tractor-store/shared';
import type { FederationContext } from '@tractor-store/start';
import { provideRemoteNavigation } from './nav/remote-navigation';

export const appConfig = ({
  env,
  nf,
  manifest,
  loadRemote,
}: FederationContext): ApplicationConfig => ({
  providers: [
    provideEnv(env),
    { provide: LOAD_REMOTE, useValue: loadRemote },
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection(),
    provideRouter([], withComponentInputBinding()),
    provideRemoteNavigation(nf, manifest),
  ],
});
