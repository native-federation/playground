import {
  ApplicationConfig,
  InjectionToken,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import { EnvironmentConfig, createSliceLoader } from '@internal/federation';
import { ENV, LOAD_REMOTE_SLICE } from './env.config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideShellNav } from './nav/provide-shell-nav';

export const appConfig = (
  nf: NativeFederationResult,
  env: EnvironmentConfig,
  manifest: FederationManifest,
): ApplicationConfig => ({
  providers: [
    { provide: ENV, useValue: env },
    {
      provide: LOAD_REMOTE_SLICE,
      useValue: createSliceLoader(nf, env, manifest),
    },
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection(),
    provideRouter([], withComponentInputBinding()),
    provideShellNav(nf, manifest),
  ],
});
