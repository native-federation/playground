import { useEffect } from 'react';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type {
  EnvironmentConfig,
  RemoteElementModule,
} from '@tractor-store/contracts';
import { useApp } from '../app';

export type LoadRemote = (remoteName: string, element: string) => Promise<void>;

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

// Loads and defines an `mfe-*` element from its remote, so the component can render the tag:
// useRemoteElement('@tractor-store/explore', 'mfe-header'); … <mfe-header />
export const useRemoteElement = (remoteName: string, element: string): void => {
  const { loadRemote } = useApp();
  useEffect(() => {
    loadRemote(remoteName, element).catch((err) =>
      console.error(`[remote] failed to load <${element}> from "${remoteName}"`, err),
    );
  }, [loadRemote, remoteName, element]);
};
