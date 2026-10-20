import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { cdnImageLoader } from '../../../app.config';
import { testEnv } from '../../../testing/env.fixture';
import { storeFixture } from '../../../testing/store.fixture';
import { StoreTileComponent } from './store-tile.component';

const [store] = storeFixture;

describe('StoreTileComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(StoreTileComponent);
    fixture.componentRef.setInput('store', store);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the store address', async () => {
    const text = (await render()).textContent;
    expect(text).toContain(store.name);
    expect(text).toContain(store.street);
    expect(text).toContain(store.city);
  });

  it('serves the image from the CDN with a 1x/2x srcset', async () => {
    const img = (await render()).querySelector('img')!;
    const at = (size: number) =>
      testEnv.cdnUrl + store.image.replace('[size]', String(size));
    expect(img.getAttribute('src')).toBe(at(200));
    expect(img.getAttribute('srcset')).toBe(`${at(200)} 1x, ${at(400)} 2x`);
  });
});
