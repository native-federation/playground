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
  '@tractor-store/checkout': 'http://localhost:4203/remoteEntry.json',
};

let showErrors = false;

fetch('./env.config.json')
  .then((resp) => resp.json())
  .then(async (cfg) => {
    showErrors = !cfg.production;
    const nf: NativeFederationResult = await initFederation(manifest, {
      ...useShimImportMap({ shimMode: true }),
      logger: consoleLogger,
      storage: globalThisStorageEntry,
      hostRemoteEntry: './remoteEntry.json',
      logLevel: 'debug',
    });
    return import('./app/bootstrap').then((m: any) =>
      m.bootstrap(cfg, nf.loadRemoteModule),
    );
  })

  .catch((err) => {
    console.error('Failed to load app!');
    if (showErrors) console.error(err);
  });
