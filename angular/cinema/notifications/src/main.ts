import { initFederation } from '@softarc/native-federation-orchestrator';
import {
  consoleLogger,
  globalThisStorageEntry,
  useShimImportMap,
} from '@softarc/native-federation-orchestrator/options';
import { createRegistry } from '@softarc/native-federation-orchestrator/registry';

// The event bus must exist before any remote code runs.
window.__NF_REGISTRY__ ??= Object.freeze(
  createRegistry({ maxStreams: 20, maxEvents: 1, removePercentage: 0.25 })(),
);

// Standalone only: nobody emits booking:confirmed, so the toast stays empty.
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
