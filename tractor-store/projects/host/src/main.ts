import { EnvironmentConfig } from '@internal/federation';
import {
  initFederation,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import {
  useShimImportMap,
  consoleLogger,
  globalThisStorageEntry,
} from '@softarc/native-federation-orchestrator/options';

fetch('./env.config.json')
  .then((resp) => resp.json())
  .then(
    async (env: EnvironmentConfig & { manifest: Record<string, string> }) => {
      const nf: NativeFederationResult = await initFederation(env.manifest, {
        ...useShimImportMap({ shimMode: true }),
        logger: consoleLogger,
        storage: globalThisStorageEntry,
        hostRemoteEntry: './remoteEntry.json',
        logLevel: 'debug',
        profile: {
          latestSharedExternal: false,
          overrideCachedRemotesIfURLMatches: true,
        },
      });
      return import('./bootstrap').then((m: any) => m.bootstrap(nf, env));
    },
  );
