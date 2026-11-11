import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import { createRemoteLoader, LOAD_REMOTE } from '../shared/remote-element';
import { App } from './app';
import { provideNavigation } from './navigation';

export const bootstrap = (
  nf: NativeFederationResult,
  manifest: FederationManifest,
) =>
  bootstrapApplication(App, {
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([], withComponentInputBinding()),
      provideNavigation(nf, manifest),
      { provide: LOAD_REMOTE, useValue: createRemoteLoader(nf) },
    ],
  });
