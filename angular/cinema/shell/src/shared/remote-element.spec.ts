import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { describe, expect, it, vi } from 'vitest';
import { createRemoteLoader } from './remote-element';

describe('createRemoteLoader', () => {
  const fakeNf = (bootstrap = vi.fn(async () => {})) => {
    const loadRemoteModule = vi.fn(async () => ({ bootstrap }));
    return {
      nf: { loadRemoteModule } as unknown as NativeFederationResult,
      loadRemoteModule,
      bootstrap,
    };
  };

  it('loads the exposed module and bootstraps it', async () => {
    const { nf, loadRemoteModule, bootstrap } = fakeNf();
    await createRemoteLoader(nf)('@cinema/loyalty', 'mfe-not-yet-defined');
    expect(loadRemoteModule).toHaveBeenCalledWith(
      '@cinema/loyalty',
      'mfe-not-yet-defined',
    );
    expect(bootstrap).toHaveBeenCalledWith();
  });

  it('skips elements that are already defined', async () => {
    customElements.define('mfe-already-defined', class extends HTMLElement {});
    const { nf, loadRemoteModule } = fakeNf();
    await createRemoteLoader(nf)('@cinema/loyalty', 'mfe-already-defined');
    expect(loadRemoteModule).not.toHaveBeenCalled();
  });
});
