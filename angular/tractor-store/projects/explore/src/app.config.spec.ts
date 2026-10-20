import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { describe, expect, it } from 'vitest';
import { getAppInjector } from './app.config';
import { bootstrap as bootstrapFooter } from './features/footer/bootstrap';
import { bootstrap as bootstrapHeader } from './features/header/bootstrap';
import { testEnv } from './testing/env.fixture';

const nf = {} as NativeFederationResult;

describe('app.config', () => {
  it('creates one application for all elements of this remote', async () => {
    expect(await getAppInjector(testEnv, nf)).toBe(
      await getAppInjector(testEnv, nf),
    );
  });

  it('defines each exposed element once, also when bootstrapped concurrently', async () => {
    await Promise.all([
      bootstrapHeader(testEnv, nf),
      bootstrapHeader(testEnv, nf),
      bootstrapFooter(testEnv, nf),
    ]);
    expect(customElements.get('mfe-header')).toBeDefined();
    expect(customElements.get('mfe-footer')).toBeDefined();
  });
});
