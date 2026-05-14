import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NavigateToDirective } from '@internal/events';
import { beforeEach, describe, expect, it } from 'vitest';
import { ENV } from '../../../env.config';
import { testEnv } from '../../../testing/env.fixture';
import { recommendationFixture } from '../../../testing/recommendation.fixture';
import { RecommendationComponent } from './recommendation';

describe('RecommendationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationComponent],
      providers: [provideRouter([]), { provide: ENV, useValue: testEnv }],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(RecommendationComponent);
    fixture.componentRef.setInput('item', recommendationFixture);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the recommendation name', () => {
    expect(
      (create().nativeElement as HTMLElement).querySelector(
        '.e_Recommendation_name',
      )?.textContent,
    ).toContain('TerraFirma Silver');
  });

  it('builds cdn-prefixed src and srcset from the [size] template', () => {
    const img = create().nativeElement.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe(
      'http://cdn.test/img/200/AU-01-SI.webp',
    );
    expect(img.getAttribute('srcset')).toBe(
      'http://cdn.test/img/200/AU-01-SI.webp 200w, ' +
        'http://cdn.test/img/400/AU-01-SI.webp 400w',
    );
  });

  it('passes the navigation intent and params to the navigateTo directive', () => {
    const dir = create()
      .debugElement.query(By.directive(NavigateToDirective))
      .injector.get(NavigateToDirective);
    expect(dir.navigateTo()).toBe('decide.product');
    expect(dir.navParams()).toEqual({ id: 'AU-01', sku: 'AU-01-SI' });
  });
});
