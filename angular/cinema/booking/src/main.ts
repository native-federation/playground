import { initFederation } from '@softarc/native-federation-orchestrator';
import {
  consoleLogger,
  globalThisStorageEntry,
  useShimImportMap,
} from '@softarc/native-federation-orchestrator/options';
import type { RouteParams } from './contracts';

// Standalone only: no shell, so Confirm emits booking:confirmed but nobody listens.
initFederation({}, {
  ...useShimImportMap({ shimMode: true }),
  logger: consoleLogger,
  storage: globalThisStorageEntry,
  hostRemoteEntry: './remoteEntry.json',
  logLevel: 'debug',
})
  .then(async () => {
    // Plays the shell's part: a fixed hold (see docs/architecture.md § Local development).
    // Set before the upgrade, so the first render already has it.
    const el = document.querySelector<HTMLElement & { routeParams?: RouteParams }>(
      'mfe-booking-checkout',
    )!;
    el.routeParams = { screeningId: 's-101', seats: 'A1,A2' };
    const { bootstrap } = await import('./bootstrap');
    await bootstrap();
  })
  .catch((err) => console.error('Failed to load app!', err));
