import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type {
  EnvironmentConfig,
  LoadRemote,
  RemoteElementModule,
} from '@tractor-store/shared';

export const createRemoteLoader = (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): LoadRemote => {
  // Passes itself to the remote so that remote can load further remotes.
  const loadRemote: LoadRemote = async (remoteName, element) => {
    if (customElements.get(element)) return;
    const mod = await nf.loadRemoteModule<RemoteElementModule>(
      remoteName,
      element,
    );
    await mod.bootstrap(env, loadRemote);
  };
  return loadRemote;
};
