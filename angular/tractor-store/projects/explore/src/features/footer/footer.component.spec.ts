import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { cdnImageLoader } from '../../app.config';
import { testEnv } from '../../testing/env.fixture';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(FooterComponent);
    await fixture.whenStable();
    return (fixture.nativeElement as HTMLElement).shadowRoot!;
  }

  it('serves the neuland logo from the CDN', async () => {
    const img = (await render()).querySelector<HTMLImageElement>(
      '.e_Footer__initiative img',
    )!;
    expect(img.getAttribute('src')).toBe(
      `${testEnv.cdnUrl}/cdn/img/neulandlogo.svg`,
    );
    expect(img.getAttribute('alt')).toContain('neuland');
  });

  it('links to the upstream projects', async () => {
    const hrefs = [...(await render()).querySelectorAll('a')].map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual(
      expect.arrayContaining([
        'https://micro-frontends.org/tractor-store/',
        'https://neuland-bfi.de',
        'https://native-federation.com',
      ]),
    );
  });

  it('marks the explore boundary', async () => {
    expect((await render()).querySelector('footer')?.dataset['boundary']).toBe(
      'explore',
    );
  });
});
