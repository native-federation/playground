import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { describe, expect, it, vi } from 'vitest';
import { testEnv } from '../testing/env.fixture';
import {
  createRemoteLoader,
  LOAD_REMOTE,
  RemoteElementDirective,
} from './remote-element';

@Component({
  imports: [RemoteElementDirective],
  template: `<mfe-header mfeRemote="@x/explore"></mfe-header>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class HostComponent {}

const render = (
  loadRemote: (remote: string, element: string) => Promise<void>,
) => {
  TestBed.configureTestingModule({
    imports: [HostComponent],
    providers: [{ provide: LOAD_REMOTE, useValue: loadRemote }],
  });
  TestBed.createComponent(HostComponent).detectChanges();
};

describe('RemoteElementDirective', () => {
  it('loads its own tag from the named remote', () => {
    const loadRemote = vi.fn(async () => {});
    render(loadRemote);
    expect(loadRemote).toHaveBeenCalledWith('@x/explore', 'mfe-header');
  });

  it('logs instead of throwing when the remote fails to load', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(async () => {
      throw new Error('boom');
    });
    await Promise.resolve();
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('<mfe-header> from "@x/explore"'),
      expect.any(Error),
    );
    consoleError.mockRestore();
  });
});

describe('createRemoteLoader', () => {
  const fakeNf = (bootstrap = vi.fn(async () => {})) => {
    const loadRemoteModule = vi.fn(async () => ({ bootstrap }));
    return {
      nf: { loadRemoteModule } as unknown as NativeFederationResult,
      loadRemoteModule,
      bootstrap,
    };
  };

  it('loads the exposed module and bootstraps it with env and nf', async () => {
    const { nf, loadRemoteModule, bootstrap } = fakeNf();
    await createRemoteLoader(testEnv, nf)('@x/explore', 'mfe-not-yet-defined');
    expect(loadRemoteModule).toHaveBeenCalledWith(
      '@x/explore',
      'mfe-not-yet-defined',
    );
    expect(bootstrap).toHaveBeenCalledWith(testEnv, nf);
  });

  it('skips elements that are already defined', async () => {
    customElements.define('mfe-already-defined', class extends HTMLElement {});
    const { nf, loadRemoteModule } = fakeNf();
    await createRemoteLoader(testEnv, nf)('@x/explore', 'mfe-already-defined');
    expect(loadRemoteModule).not.toHaveBeenCalled();
  });
});
