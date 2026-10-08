import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { provideEnv } from '@tractor-store/shared';
import { testEnv } from '../../../testing/env.fixture';
import { storeFixture } from '../../../testing/store.fixture';
import { StoreTileComponent } from './store-tile';

describe('StoreTileComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreTileComponent],
      providers: [provideEnv(testEnv)],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(StoreTileComponent);
    fixture.componentRef.setInput('store', storeFixture[0]);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the store name, street and city', () => {
    const text = (create().nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Aurora Flagship Store');
    expect(text).toContain('Astronaut Way 1');
    expect(text).toContain('Arlington');
  });

  it('builds the cdn-prefixed src and a 1x/2x srcset from the [size] template', () => {
    const img = (create().nativeElement as HTMLElement).querySelector(
      'img',
    ) as HTMLImageElement;
    expect(img.getAttribute('src')).toBe(
      'http://cdn.test/img/200/store-1.webp',
    );
    expect(img.getAttribute('srcset')).toBe(
      'http://cdn.test/img/200/store-1.webp 1x, ' +
        'http://cdn.test/img/400/store-1.webp 2x',
    );
  });
});
