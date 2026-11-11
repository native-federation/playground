import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { describe, expect, it, vi } from 'vitest';
import {
  createRemoteLoader,
  LOAD_REMOTE,
  RemoteElementDirective,
} from './remote-element';

@Component({
  imports: [RemoteElementDirective],
  template: `<mfe-loyalty-badge mfeRemote="@cinema/loyalty"></mfe-loyalty-badge>`,
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
  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
};

describe('RemoteElementDirective', () => {
  it('loads its own tag from the named remote', () => {
    const loadRemote = vi.fn(async () => {});
    render(loadRemote);
    expect(loadRemote).toHaveBeenCalledWith('@cinema/loyalty', 'mfe-loyalty-badge');
  });

  it('leaves the slot empty and logs instead of throwing when the remote fails to load', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const root = render(async () => {
      throw new Error('boom');
    });
    // Give the rejected load a full macrotask to reach the directive's catch.
    await new Promise((resolve) => setTimeout(resolve));
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('<mfe-loyalty-badge> from "@cinema/loyalty"'),
      expect.any(Error),
    );
    expect(root.querySelector('mfe-loyalty-badge')?.childNodes.length).toBe(0);
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
