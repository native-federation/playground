import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LOAD_REMOTE } from './remote-element';
import { RemoteFragment } from './remote-fragment';

@Component({
  imports: [RemoteFragment],
  template: `<app-remote-fragment remoteName="@cinema/loyalty" element="mfe-loyalty-badge" />`,
})
class HostComponent {}

const render = async (loadRemote: (remote: string, element: string) => Promise<void>) => {
  TestBed.configureTestingModule({
    imports: [HostComponent],
    providers: [{ provide: LOAD_REMOTE, useValue: loadRemote }],
  });
  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  // Give the load a full macrotask to settle.
  await new Promise((resolve) => setTimeout(resolve));
  return fixture.nativeElement as HTMLElement;
};

describe('RemoteFragment', () => {
  afterEach(() => vi.restoreAllMocks());

  it('loads the element from its remote and mounts it', async () => {
    const loadRemote = vi.fn(async () => {});
    const root = await render(loadRemote);
    expect(loadRemote).toHaveBeenCalledWith('@cinema/loyalty', 'mfe-loyalty-badge');
    expect(root.querySelector('app-remote-fragment > mfe-loyalty-badge')).not.toBeNull();
  });

  it('stays empty and logs once when a present remote fails to load it', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const root = await render(async () => {
      throw new Error('boom');
    });
    expect(root.querySelector('mfe-loyalty-badge')).toBeNull();
    expect(consoleError).toHaveBeenCalledOnce();
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('<mfe-loyalty-badge> from "@cinema/loyalty"'),
      expect.any(Error),
    );
  });
});
