import { initFederation } from '@softarc/native-federation-orchestrator';
import {
  consoleLogger,
  globalThisStorageEntry,
  useShimImportMap,
} from '@softarc/native-federation-orchestrator/options';
import { createRegistry } from '@softarc/native-federation-orchestrator/registry';
import type { RouteParams } from './contracts';

// The event bus must exist before any remote code runs.
window.__NF_REGISTRY__ ??= Object.freeze(
  createRegistry({ maxStreams: 20, maxEvents: 1, removePercentage: 0.25 })(),
);

// Standalone only: no shell, so Continue emits nav:navigate but nothing navigates.
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
    const { bootstrap } = await import('./bootstrap');
    await bootstrap();
  })
  .catch((err) => console.error('Failed to load app!', err));
