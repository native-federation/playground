import { initFederation } from '@softarc/native-federation-orchestrator';
import {
  useShimImportMap,
  consoleLogger,
  globalThisStorageEntry,
} from '@softarc/native-federation-orchestrator/options';
import {
  createRegistry,
  NFEventRegistry,
} from '@softarc/native-federation-orchestrator/registry';

declare global {
  interface Window {
    __NF_REGISTRY__: NFEventRegistry;
  }
}

(function (): void {
  const registry = createRegistry({
    maxStreams: 20,
    maxEvents: 1,
    removePercentage: 0.25,
  });
  window.__NF_REGISTRY__ = Object.freeze(registry());
})();

let showErrors = false;
Promise.all([
  fetch('./env.config.json').then((resp) => resp.json()),
  fetch('./federation.manifest.json').then((resp) => resp.json()),
])
  .then(async ([env, manifest]) => {
    showErrors = !env.production;
    const nf = await initFederation(manifest, {
      ...useShimImportMap({ shimMode: true }),
      logger: consoleLogger,
      storage: globalThisStorageEntry,
      hostRemoteEntry: './remoteEntry.json',
      logLevel: 'debug',
    });
    return import('./app/bootstrap').then((m) =>
      m.bootstrap(env, nf, manifest),
    );
  })
  .catch((err) => {
    console.error('Failed to load app!');
    if (showErrors) console.error(err);
  });
