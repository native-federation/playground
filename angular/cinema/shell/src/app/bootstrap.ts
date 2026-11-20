// The shell is the host: it installs the page's one bus before anything uses it.
import '@softarc/native-federation-communication/install';
import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import { createRemoteLoader, LOAD_REMOTE } from '../shared/remote-element';
import { App } from './app';
import { CONTRIBUTIONS, defineFragments, loadContributions } from './contributions';
import { provideNavigation } from './navigation';

export const bootstrap = async (
  nf: NativeFederationResult,
  manifest: FederationManifest,
) => {
  const contributions = await loadContributions(nf, manifest);
  const load = createRemoteLoader(nf);
  defineFragments(contributions, load);
  return bootstrapApplication(App, {
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([], withComponentInputBinding()),
      { provide: CONTRIBUTIONS, useValue: contributions },
      provideNavigation(contributions),
      { provide: LOAD_REMOTE, useValue: load },
    ],
  });
};
