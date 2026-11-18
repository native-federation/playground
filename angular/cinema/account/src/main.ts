import { initFederation } from '@softarc/native-federation-orchestrator';
import {
  consoleLogger,
  globalThisStorageEntry,
  useShimImportMap,
} from '@softarc/native-federation-orchestrator/options';
// Standalone only: shows the mock profile card with shared deps from its own remoteEntry.json;
// the header and other remotes need the shell.
initFederation({}, {
  ...useShimImportMap({ shimMode: true }),
  logger: consoleLogger,
  storage: globalThisStorageEntry,
  hostRemoteEntry: './remoteEntry.json',
  logLevel: 'debug',
})
  .then(async () => {
    const { bootstrap } = await import('./bootstrap');
    await bootstrap();
  })
  .catch((err) => console.error('Failed to load app!', err));
