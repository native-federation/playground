import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { cdnImageLoader } from '../../../app.config';
import { testEnv } from '../../../testing/env.fixture';
import { recommendationFixture } from '../../../testing/recommendation.fixture';
import { RecommendationComponent } from './recommendation.component';
import { publishNavResolver } from '../../../testing/nav-resolver.stub';

const [item] = recommendationFixture;

describe('RecommendationComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
    await publishNavResolver(
      (id, payload) => `/${id}?${new URLSearchParams(payload)}`,
    );
  });

  async function render() {
    const fixture = TestBed.createComponent(RecommendationComponent);
    fixture.componentRef.setInput('item', item);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('links the name to the recommended variant', async () => {
    const link = (await render()).querySelector('a')!;
    expect(link.textContent).toContain(item.name);
    expect(link.getAttribute('href')).toBe(
      '/decide.product?id=AU-01&sku=AU-01-SI',
    );
  });

  it('serves the image from the CDN in two sizes', async () => {
    const img = (await render()).querySelector('img')!;
    const at = (size: number) =>
      testEnv.cdnUrl + item.image.replace('[size]', String(size));
    expect(img.getAttribute('src')).toBe(at(200));
    expect(img.getAttribute('srcset')).toBe(`${at(200)} 200w, ${at(400)} 400w`);
  });
});
