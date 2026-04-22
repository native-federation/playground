import {
  initFederation,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import {
  useShimImportMap,
  consoleLogger,
  globalThisStorageEntry,
} from '@softarc/native-federation-orchestrator/options';

const manifest = {
  '@tractor-store/explore': 'http://localhost:4201/remoteEntry.json',
  '@tractor-store/decide': 'http://localhost:4202/remoteEntry.json',
  '@tractor-store/checkout': 'http://localhost:4203/remoteEntry.json',
};

initFederation(manifest, {
  ...useShimImportMap({ shimMode: true }),
  logger: consoleLogger,
  storage: globalThisStorageEntry,
  hostRemoteEntry: './remoteEntry.json',
  logLevel: 'debug',
  profile: {
    latestSharedExternal: false,
    overrideCachedRemotesIfURLMatches: true,
  },
})
  .then((nf: NativeFederationResult) => {
    return import('./bootstrap').then((m: any) => m.bootstrap(nf));
  })
  .catch((err) => console.error(err));
