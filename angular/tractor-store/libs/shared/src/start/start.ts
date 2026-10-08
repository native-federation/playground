import {
  initFederation,
  type FederationManifest,
  type NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import {
  consoleLogger,
  globalThisStorageEntry,
  useShimImportMap,
} from '@softarc/native-federation-orchestrator/options';
import {
  createRegistry,
  type NFEventRegistry,
} from '@softarc/native-federation-orchestrator/registry';
import type { EnvironmentConfig, LoadRemote } from '@tractor-store/shared';
import { createRemoteLoader } from './remote-loader';

declare global {
  interface Window {
    __NF_REGISTRY__: NFEventRegistry;
  }
}

export interface FederationContext {
  readonly env: EnvironmentConfig;
  readonly nf: NativeFederationResult;
  readonly manifest: FederationManifest;
  readonly loadRemote: LoadRemote;
}

// Always revalidate: these files differ per deployment and dev servers cache them aggressively.
const fetchJson = async <T>(url: string): Promise<T> =>
  (await fetch(url, { cache: 'no-cache' })).json() as Promise<T>;

// Shared main.ts for host and remotes. The bus is installed before anything
// else so channel handles always find it, also when a remote runs standalone.
export const startFederation = async (
  run: (ctx: FederationContext) => Promise<unknown>,
): Promise<void> => {
  window.__NF_REGISTRY__ ??= Object.freeze(
    createRegistry({ maxStreams: 20, maxEvents: 1, removePercentage: 0.25 })(),
  );

  let env: EnvironmentConfig | undefined;
  try {
    const [loadedEnv, manifest] = await Promise.all([
      fetchJson<EnvironmentConfig>('./env.config.json'),
      fetchJson<FederationManifest>('./federation.manifest.json'),
    ]);
    env = loadedEnv;
    const nf = await initFederation(manifest, {
      ...useShimImportMap({ shimMode: true }),
      logger: consoleLogger,
      storage: globalThisStorageEntry,
      hostRemoteEntry: './remoteEntry.json',
      logLevel: 'debug',
    });
    await run({ env, nf, manifest, loadRemote: createRemoteLoader(env, nf) });
  } catch (err) {
    console.error('Failed to load app!');
    if (!env?.production) console.error(err);
  }
};
