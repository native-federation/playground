import { InjectionToken } from '@angular/core';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type {
  EnvironmentConfig,
  RemoteElementModule,
} from '@tractor-store/contracts';

// Loads an exposed `mfe-*` element from a remote and defines it on the page.
export type LoadRemote = (remoteName: string, element: string) => Promise<void>;

export const LOAD_REMOTE = new InjectionToken<LoadRemote>('LOAD_REMOTE');

export const createRemoteLoader =
  (env: EnvironmentConfig, nf: NativeFederationResult): LoadRemote =>
  async (remoteName, element) => {
    if (customElements.get(element)) return;
    const mod = await nf.loadRemoteModule<RemoteElementModule>(
      remoteName,
      element,
    );
    await mod.bootstrap(env, nf);
  };
