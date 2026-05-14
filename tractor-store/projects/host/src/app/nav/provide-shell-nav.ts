import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import { setupShellNavigation } from './setup-shell-nav';

export const provideShellNav = (
  nf: NativeFederationResult,
  manifest: FederationManifest,
): EnvironmentProviders =>
  makeEnvironmentProviders([
    provideAppInitializer(() =>
      setupShellNavigation({
        router: inject(Router),
        nf,
        manifest,
      }),
    ),
  ]);
