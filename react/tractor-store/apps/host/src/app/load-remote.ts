import { createContext } from 'react';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type {
  EnvironmentConfig,
  RemoteElementModule,
} from '@tractor-store/contracts';

export type LoadRemote = (remoteName: string, element: string) => Promise<void>;

export const LoadRemoteContext = createContext<LoadRemote | null>(null);

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
