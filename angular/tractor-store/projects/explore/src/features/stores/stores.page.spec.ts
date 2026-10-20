import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cdnImageLoader } from '../../app.config';
import { StoreService } from '../../data/store.service';
import { LOAD_REMOTE } from '../../shared/remote-element';
import { testEnv } from '../../testing/env.fixture';
import { fakeStoreService } from '../../testing/store-service.stub';
import { storeFixture } from '../../testing/store.fixture';
import { StoresPage } from './stores.page';

describe('StoresPage', () => {
  let loadRemote: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    loadRemote = vi.fn().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      providers: [
        { provide: StoreService, useValue: fakeStoreService() },
        { provide: LOAD_REMOTE, useValue: loadRemote },
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(StoresPage);
    await fixture.whenStable();
    return {
      fixture,
      root: (fixture.nativeElement as HTMLElement).shadowRoot!,
    };
  }

  it('shows a tile per store', async () => {
    const { root } = await render();
    expect(root.querySelector('h2')?.textContent).toBe('Our Stores');
    expect(root.querySelectorAll('app-store-tile')).toHaveLength(
      storeFixture.length,
    );
  });

  it('loads the header and footer and marks the explore page boundary', async () => {
    const { fixture } = await render();
    expect(loadRemote.mock.calls).toEqual([
      ['@tractor-store/explore', 'mfe-header'],
      ['@tractor-store/explore', 'mfe-footer'],
    ]);
    expect((fixture.nativeElement as HTMLElement).dataset['boundaryPage']).toBe(
      'explore',
    );
  });
});
