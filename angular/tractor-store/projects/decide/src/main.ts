import { initFederation } from '@softarc/native-federation-orchestrator';
import {
  consoleLogger,
  globalThisStorageEntry,
  useShimImportMap,
} from '@softarc/native-federation-orchestrator/options';

// Always revalidate: these files differ per deployment.
const fetchJson = (url: string) =>
  fetch(url, { cache: 'no-cache' }).then((resp) => resp.json());

let showErrors = false;

Promise.all([
  fetchJson('./env.config.json'),
  fetchJson('./federation.manifest.json'),
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
    const product = await import('./features/product/bootstrap');
    await product.bootstrap(env, nf);
    // Standalone dev has no host to set routeParams from the URL, so show a fixed product.
    Object.assign(document.querySelector('mfe-product')!, {
      routeParams: { id: 'CL-01' },
    });
  })
  .catch((err) => {
    console.error('Failed to load app!');
    if (showErrors) console.error(err);
  });
