import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cdnImageLoader } from '../../app.config';
import { TeaserService } from '../../data/teaser.service';
import { LOAD_REMOTE } from '../../shared/remote-element';
import { testEnv } from '../../testing/env.fixture';
import { fakeTeaserService } from '../../testing/teaser-service.stub';
import { teaserFixture } from '../../testing/teaser.fixture';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let loadRemote: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    loadRemote = vi.fn().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      providers: [
        { provide: TeaserService, useValue: fakeTeaserService() },
        { provide: LOAD_REMOTE, useValue: loadRemote },
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    return {
      fixture,
      root: (fixture.nativeElement as HTMLElement).shadowRoot!,
    };
  }

  it('shows a teaser per category with a 500px image from the CDN', async () => {
    const teasers = [
      ...(await render()).root.querySelectorAll('.e_HomePage__categoryLink'),
    ];
    expect(teasers.map((t) => t.textContent?.trim())).toEqual(
      teaserFixture.map((t) => t.title),
    );

    const at = (size: number) =>
      testEnv.cdnUrl + teaserFixture[0].image.replace('[size]', String(size));
    const img = teasers[0].querySelector('img')!;
    expect(img.getAttribute('src')).toBe(at(500));
    expect(img.getAttribute('srcset')).toBe(
      `${at(500)} 500w, ${at(1000)} 1000w`,
    );
  });

  it('seeds the recommendations with a CSV of skus', async () => {
    const reco = (await render()).root.querySelector('mfe-recommendations')!;
    expect(reco.getAttribute('skus')).toBe('CL-01-GY,AU-07-MT');
  });

  it('loads the header, footer and recommendations and marks the explore page boundary', async () => {
    const { fixture } = await render();
    expect(loadRemote.mock.calls).toEqual(
      expect.arrayContaining([
        ['@tractor-store/explore', 'mfe-header'],
        ['@tractor-store/explore', 'mfe-footer'],
        ['@tractor-store/explore', 'mfe-recommendations'],
      ]),
    );
    expect((fixture.nativeElement as HTMLElement).dataset['boundaryPage']).toBe(
      'explore',
    );
  });
});
