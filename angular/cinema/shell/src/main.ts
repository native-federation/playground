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

// Always revalidate: the manifest differs per deployment.
fetch('./federation.manifest.json', { cache: 'no-cache' })
  .then((resp) => resp.json())
  .then(async (manifest) => {
    const nf = await initFederation(manifest, {
      ...useShimImportMap({ shimMode: true }),
      logger: consoleLogger,
      storage: globalThisStorageEntry,
      hostRemoteEntry: './remoteEntry.json',
      logLevel: 'debug',
    });
    const { bootstrap } = await import('./app/bootstrap');
    await bootstrap(nf, manifest);
  })
  .catch((err) => console.error('Failed to load app!', err));
