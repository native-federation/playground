import { initFederation } from '@softarc/native-federation-orchestrator';
import {
  consoleLogger,
  globalThisStorageEntry,
  useShimImportMap,
} from '@softarc/native-federation-orchestrator/options';
import type { RouteParams } from './contracts';

// Standalone only: no booking, so the hold is retained on the bus but no summary shows it.
initFederation({}, {
  ...useShimImportMap({ shimMode: true }),
  logger: consoleLogger,
  storage: globalThisStorageEntry,
  hostRemoteEntry: './remoteEntry.json',
  logLevel: 'debug',
})
  .then(async () => {
    // Plays the shell's part: a fixed screening (see docs/architecture.md § Local development).
    // Set before the upgrade, so the first render already has it.
    const el = document.querySelector<HTMLElement & { routeParams?: RouteParams }>(
      'mfe-seating-plan',
    )!;
    el.routeParams = { screeningId: 's-101' };
    // Standalone, this app is its own host; its exposed modules never install.
    await import('@softarc/native-federation-communication/install');
    const { bootstrap } = await import('./bootstrap');
    await bootstrap();
  })
  .catch((err) => console.error('Failed to load app!', err));
