import { initFederation } from '@softarc/native-federation-orchestrator';
import {
  useShimImportMap,
  consoleLogger,
  globalThisStorageEntry,
} from '@softarc/native-federation-orchestrator/options';

let showErrors = false;

fetch('./env.config.json')
  .then((resp) => resp.json())
  .then(async (cfg) => {
    showErrors = !cfg.production;
    await initFederation(
      {},
      {
        ...useShimImportMap({ shimMode: true }),
        logger: consoleLogger,
        storage: globalThisStorageEntry,
        hostRemoteEntry: './remoteEntry.json',
        logLevel: 'debug',
      },
    );
    return import('./app/bootstrap').then((m: any) => m.bootstrap(cfg));
  })

  .catch((err) => {
    console.error('Failed to load app!');
    if (showErrors) console.error(err);
  });
