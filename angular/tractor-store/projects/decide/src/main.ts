import { createSliceLoader } from '@internal/federation';
import {
  initFederation,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import {
  useShimImportMap,
  consoleLogger,
  globalThisStorageEntry,
} from '@softarc/native-federation-orchestrator/options';

let showErrors = false;

Promise.all([
  fetch('./env.config.json').then((resp) => resp.json()),
  fetch('./federation.manifest.json').then((resp) => resp.json()),
])
  .then(async ([env, manifest]) => {
    showErrors = !env.production;
    const nf: NativeFederationResult = await initFederation(manifest, {
      ...useShimImportMap({ shimMode: true }),
      logger: consoleLogger,
      storage: globalThisStorageEntry,
      hostRemoteEntry: './remoteEntry.json',
      logLevel: 'debug',
    });
    const loadRemoteSlice = createSliceLoader(env, nf, manifest);
    const product = await import('./features/product/bootstrap');
    await product.bootstrap(env, loadRemoteSlice);
  })
  .catch((err) => {
    console.error('Failed to load app!');
    if (showErrors) console.error(err);
  });
