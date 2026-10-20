import { createRegistry } from '@softarc/native-federation-orchestrator/registry';
import { beforeEach } from 'vitest';

// Every test gets a fresh, real event bus, just like main.ts installs in the browser.
beforeEach(() => {
  window.__NF_REGISTRY__ = createRegistry({ maxStreams: 20, maxEvents: 1 })();
});
