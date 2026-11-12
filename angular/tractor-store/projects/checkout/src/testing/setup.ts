import { createBus } from '@softarc/native-federation-communication';
import { afterEach, beforeEach, vi } from 'vitest';

// Every test gets a fresh, real event bus: `bus` reads globalThis.__NF_BUS__ on every call.
beforeEach(() => {
  vi.stubGlobal('__NF_BUS__', createBus());
  // The bus reports a throwing listener instead of rethrowing; rethrow so a failed expect fails the test.
  vi.stubGlobal('reportError', (error: unknown) => {
    throw error;
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});
