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
    const { bootstrap } = await import('./app/bootstrap');
    await bootstrap(env, nf, manifest);
  })
  .catch((err) => {
    console.error('Failed to load app!');
    if (showErrors) console.error(err);
  });
