import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import {
  createRemoteLoader,
  type EnvironmentConfig,
  LOAD_REMOTE,
  provideEnv,
} from '@tractor-store/shared';
import { provideRemoteNavigation } from './nav/remote-navigation';

export const appConfig = (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
  manifest: FederationManifest,
): ApplicationConfig => ({
  providers: [
    provideEnv(env),
    { provide: LOAD_REMOTE, useValue: createRemoteLoader(env, nf) },
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection(),
    provideRouter([], withComponentInputBinding()),
    provideRemoteNavigation(nf, manifest),
  ],
});
