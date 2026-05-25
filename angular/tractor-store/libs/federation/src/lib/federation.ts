import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';

export interface EnvironmentConfig {
  production: boolean;
  apiUrl: string;
  scope: string;
  cdnUrl: string;
}

// Closure handed to every remote so it can mount slices from other remotes
// without knowing each remote's EnvironmentConfig. The shell binds the env
// map and the raw federation loader; remotes just call
// `loadRemoteSlice(name, element)`.
export type LoadRemoteSlice = (
  remoteName: string,
  exposedModule: string,
) => Promise<void>;

export type ComponentBootstrap = {
  bootstrap: (
    env: EnvironmentConfig,
    loadRemoteSlice: LoadRemoteSlice,
  ) => Promise<void>;
};

export function toCdnUrl(path: string, cdnUrl: string): string {
  const base = cdnUrl.replace(/\/+$/, '');
  const rel = path.startsWith('/') ? path : `/${path}`;
  return `${base}${rel}`;
}

export const createSliceLoader = (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
  manifest: FederationManifest,
): LoadRemoteSlice => {
  const envForRemote = (remoteName: string): EnvironmentConfig => {
    const entry = manifest[remoteName];
    const remoteEntryUrl = typeof entry === 'string' ? entry : entry.url;
    return { ...env, scope: remoteEntryUrl.replace('/remoteEntry.json', '') };
  };

  const loadRemoteSlice: LoadRemoteSlice = async (
    remoteName,
    exposedModule,
  ) => {
    if (customElements.get(exposedModule)) return;
    const mod = await nf.loadRemoteModule<ComponentBootstrap>(
      remoteName,
      exposedModule,
    );
    await mod.bootstrap(envForRemote(remoteName), loadRemoteSlice);
  };
  return loadRemoteSlice;
};
