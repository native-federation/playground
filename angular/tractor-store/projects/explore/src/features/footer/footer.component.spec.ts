import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { provideEnv } from '@tractor-store/shared';
import { testEnv } from '../../testing/env.fixture';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideEnv(testEnv)],
    }).compileComponents();
  });

  it('renders the cdn-prefixed neuland logo with descriptive alt text', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const img = (
      fixture.nativeElement as HTMLElement
    ).shadowRoot!.querySelector(
      '.e_Footer__initiative img',
    ) as HTMLImageElement;
    expect(img.getAttribute('src')).toBe(
      'http://cdn.test/cdn/img/neulandlogo.svg',
    );
    expect(img.getAttribute('alt')).toContain('neuland');
  });

  it('marks the footer with the explore boundary attribute', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement)
        .shadowRoot!.querySelector('footer')
        ?.getAttribute('data-boundary'),
    ).toBe('explore');
  });

  it('renders attribution links pointing at upstream projects', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const hrefs = Array.from<HTMLAnchorElement>(
      (fixture.nativeElement as HTMLElement).shadowRoot!.querySelectorAll('a'),
    ).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('https://micro-frontends.org/tractor-store/');
    expect(hrefs).toContain('https://neuland-bfi.de');
    expect(hrefs).toContain('https://native-federation.com');
  });
});
