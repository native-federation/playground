import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { cdnImageLoader } from '../../app.config';
import type { Recommendation } from '../../data/recommendation';
import { RecommendationService } from '../../data/recommendation.service';
import { testEnv } from '../../testing/env.fixture';
import { recommendationFixture } from '../../testing/recommendation.fixture';
import { fakeRecommendationService } from '../../testing/recommendation-service.stub';
import { RecommendationsComponent } from './recommendations.component';

describe('RecommendationsComponent', () => {
  let service: ReturnType<typeof fakeRecommendationService>;

  function configure(items: Recommendation[]) {
    service = fakeRecommendationService(items);
    TestBed.configureTestingModule({
      providers: [
        { provide: RecommendationService, useValue: service },
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
  }

  beforeEach(() => configure(recommendationFixture));

  async function render(skus: string) {
    const fixture = TestBed.createComponent(RecommendationsComponent);
    fixture.componentRef.setInput('skus', skus);
    await fixture.whenStable();
    return (fixture.nativeElement as HTMLElement).shadowRoot!;
  }

  it('seeds the recommendations with the comma-separated skus', async () => {
    await render('CL-01-GY, AU-07-MT ,,');
    expect(service.seeds).toEqual([['CL-01-GY', 'AU-07-MT']]);
  });

  it('shows one tile per recommendation', async () => {
    const root = await render('CL-01-GY');
    expect(root.querySelectorAll('app-recommendation')).toHaveLength(
      recommendationFixture.length,
    );
    expect(
      root.querySelector('.e_Recommendations')?.getAttribute('data-boundary'),
    ).toBe('explore');
  });

  it('hides the panel when there is nothing to recommend', async () => {
    TestBed.resetTestingModule();
    configure([]);
    expect(
      (await render('CL-01-GY')).querySelector('.e_Recommendations'),
    ).toBeNull();
  });
});
