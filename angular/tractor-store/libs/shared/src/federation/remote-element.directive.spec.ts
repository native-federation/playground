import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { RemoteElementDirective } from './remote-element.directive';
import { LOAD_REMOTE, type LoadRemote } from './remote-loader';

@Component({
  imports: [RemoteElementDirective],
  template: `<mfe-header mfeRemote="@x/explore"></mfe-header>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class HostComponent {}

const render = (loadRemote: LoadRemote) => {
  TestBed.configureTestingModule({
    imports: [HostComponent],
    providers: [{ provide: LOAD_REMOTE, useValue: loadRemote }],
  });
  TestBed.createComponent(HostComponent).detectChanges();
};

describe('RemoteElementDirective', () => {
  it('loads its own tag from the named remote', () => {
    const loadRemote = vi.fn<LoadRemote>(async () => {});
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
