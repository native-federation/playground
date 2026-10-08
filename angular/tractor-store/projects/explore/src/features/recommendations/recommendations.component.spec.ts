import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { RecommendationHttp } from '../../core/data/http/recommendation-http';
import { provideEnv } from '@tractor-store/shared';
import { testEnv } from '../../testing/env.fixture';
import { recommendationFixture } from '../../testing/recommendation.fixture';
import { fakeRecommendationHttp } from '../../testing/recommendation-http.stub';
import { RecommendationsComponent } from './recommendations.component';

describe('RecommendationsComponent', () => {
  let http: ReturnType<typeof fakeRecommendationHttp>;

  beforeEach(async () => {
    http = fakeRecommendationHttp([recommendationFixture]);
    await TestBed.configureTestingModule({
      imports: [RecommendationsComponent],
      providers: [
        provideRouter([]),
        provideEnv(testEnv),
        { provide: RecommendationHttp, useValue: http },
      ],
    }).compileComponents();
  });

  function create(skus: unknown = ['CL-01-GY']) {
    const fixture = TestBed.createComponent(RecommendationsComponent);
    fixture.componentRef.setInput('skus', skus);
    fixture.detectChanges();
    return fixture;
  }

  describe('skus input parsing', () => {
    it('accepts an already-parsed string array', () => {
      create(['CL-01-GY', 'AU-07-MT']);
      expect(http.lastSeedSkus()).toEqual(['CL-01-GY', 'AU-07-MT']);
    });

    it('parses a comma-separated string from an HTML attribute', () => {
      create('CL-01-GY, AU-07-MT , CL-02-RD');
      expect(http.lastSeedSkus()).toEqual(['CL-01-GY', 'AU-07-MT', 'CL-02-RD']);
    });

    it('drops empty entries from the comma-separated string', () => {
      create('CL-01-GY,, ,AU-07-MT');
      expect(http.lastSeedSkus()).toEqual(['CL-01-GY', 'AU-07-MT']);
    });

    it('falls back to an empty list for unsupported input shapes', () => {
      create(null);
      expect(http.lastSeedSkus()).toEqual([]);
      create(42);
      expect(http.lastSeedSkus()).toEqual([]);
    });
  });

  describe('rendering', () => {
    it('renders one recommendation per item from the http service', () => {
      const fixture = create(['CL-01-GY']);
      expect(
        (fixture.nativeElement as HTMLElement).shadowRoot!.querySelectorAll(
          'app-recommendation',
        ).length,
      ).toBe(1);
    });

    it('hides the panel entirely when the http service returns no items', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [RecommendationsComponent],
        providers: [
          provideRouter([]),
          provideEnv(testEnv),
          { provide: RecommendationHttp, useValue: fakeRecommendationHttp([]) },
        ],
      });
      const fixture = TestBed.createComponent(RecommendationsComponent);
      fixture.componentRef.setInput('skus', ['CL-01-GY']);
      fixture.detectChanges();
      expect(
        (fixture.nativeElement as HTMLElement).shadowRoot!.querySelector(
          '.e_Recommendations',
        ),
      ).toBeNull();
    });

    it('marks the panel with the explore boundary attribute', () => {
      const fixture = create(['CL-01-GY']);
      expect(
        (fixture.nativeElement as HTMLElement)
          .shadowRoot!.querySelector('.e_Recommendations')
          ?.getAttribute('data-boundary'),
      ).toBe('explore');
    });
  });
});
