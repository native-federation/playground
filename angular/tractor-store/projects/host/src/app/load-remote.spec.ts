import { describe, expect, it, vi } from 'vitest';
import { testEnv } from '../testing/env.fixture';
import { fakeNf } from '../testing/native-federation.stub';
import { createRemoteLoader } from './load-remote';

describe('createRemoteLoader', () => {
  it("loads the element's module and bootstraps it with env and nf", async () => {
    const bootstrap = vi.fn(async () => {});
    const loadRemoteModule = vi.fn(async () => ({ bootstrap }));
    const nf = fakeNf(loadRemoteModule as never);

    await createRemoteLoader(testEnv, nf)('@x/decide', 'mfe-loader-new');

    expect(loadRemoteModule).toHaveBeenCalledWith(
      '@x/decide',
      'mfe-loader-new',
    );
    expect(bootstrap).toHaveBeenCalledWith(testEnv, nf);
  });

  it('skips elements that are already defined', async () => {
    customElements.define('mfe-loader-defined', class extends HTMLElement {});
    const loadRemoteModule = vi.fn();

    await createRemoteLoader(testEnv, fakeNf(loadRemoteModule as never))(
      '@x/decide',
      'mfe-loader-defined',
    );

    expect(loadRemoteModule).not.toHaveBeenCalled();
  });
});
