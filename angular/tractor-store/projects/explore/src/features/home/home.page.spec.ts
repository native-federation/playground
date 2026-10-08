import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TeaserHttp } from '../../core/data/http/teaser-http';
import { LOAD_REMOTE, provideEnv } from '@tractor-store/shared';
import { testEnv } from '../../testing/env.fixture';
import { fakeListHttp } from '../../testing/list-http.stub';
import { teaserFixture } from '../../testing/teaser.fixture';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let loader: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    loader = vi.fn().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideRouter([]),
        provideEnv(testEnv),
        { provide: LOAD_REMOTE, useValue: loader },
        { provide: TeaserHttp, useValue: fakeListHttp(teaserFixture) },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('renders one link per teaser with title and cdn-prefixed image', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const links = (
      fixture.nativeElement as HTMLElement
    ).shadowRoot!.querySelectorAll('.e_HomePage__categoryLink');
    expect(links.length).toBe(2);
    expect(links[0].textContent).toContain('Classic Tractors');

    const img = links[0].querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe(
      'http://cdn.test/img/500/classics.webp',
    );
    expect(img.getAttribute('srcset')).toBe(
      'http://cdn.test/img/500/classics.webp 500w, ' +
        'http://cdn.test/img/1000/classics.webp 1000w',
    );
  });

  it('renders an empty teaser list while teasers are not loaded', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideRouter([]),
        provideEnv(testEnv),
        {
          provide: LOAD_REMOTE,
          useValue: vi.fn().mockResolvedValue(undefined),
        },
        { provide: TeaserHttp, useValue: fakeListHttp(undefined) },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).shadowRoot!.querySelectorAll(
        '.e_HomePage__categoryLink',
      ).length,
    ).toBe(0);
  });

  it('eagerly preloads the header, footer and recommendations slices', () => {
    TestBed.createComponent(HomePage);
    expect(loader).toHaveBeenCalledWith('@tractor-store/explore', 'mfe-header');
    expect(loader).toHaveBeenCalledWith('@tractor-store/explore', 'mfe-footer');
    expect(loader).toHaveBeenCalledWith(
      '@tractor-store/explore',
      'mfe-recommendations',
    );
  });

  it('embeds the header, footer and recommendations custom elements', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const el: ShadowRoot = (fixture.nativeElement as HTMLElement).shadowRoot!;
    expect(el.querySelector('mfe-header')).not.toBeNull();
    expect(el.querySelector('mfe-footer')).not.toBeNull();
    expect(el.querySelector('mfe-recommendations')).not.toBeNull();
  });

  it('passes the configured seed skus to the recommendations slice', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const reco = (
      fixture.nativeElement as HTMLElement
    ).shadowRoot!.querySelector('mfe-recommendations') as HTMLElement;
    expect((reco as unknown as { skus: string[] }).skus).toEqual([
      'CL-01-GY',
      'AU-07-MT',
    ]);
  });

  it('marks the host with the explore boundary attribute', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).getAttribute('data-boundary-page'),
    ).toBe('explore');
  });
});
