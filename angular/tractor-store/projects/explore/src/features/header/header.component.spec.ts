import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LOAD_REMOTE, provideEnv } from '@tractor-store/shared';
import { testEnv } from '../../testing/env.fixture';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let loader: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    loader = vi.fn().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        provideEnv(testEnv),
        { provide: LOAD_REMOTE, useValue: loader },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('renders the cdn-prefixed logo', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const img = (
      fixture.nativeElement as HTMLElement
    ).shadowRoot!.querySelector('.e_Header__logo') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('http://cdn.test/cdn/img/logo.svg');
    expect(img.getAttribute('alt')).toBe('Micro Frontends - Tractor Store');
  });

  it('embeds the navigation and mini-cart slices', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const el: ShadowRoot = (fixture.nativeElement as HTMLElement).shadowRoot!;
    expect(el.querySelector('app-navigation')).not.toBeNull();
    expect(el.querySelector('mfe-mini-cart')).not.toBeNull();
  });

  it('marks the header with the explore boundary attribute', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement)
        .shadowRoot!.querySelector('header')
        ?.getAttribute('data-boundary'),
    ).toBe('explore');
  });

  it('eagerly preloads the cross-team mini-cart slice from checkout', () => {
    TestBed.createComponent(HeaderComponent);
    expect(loader).toHaveBeenCalledTimes(1);
    expect(loader).toHaveBeenCalledWith(
      '@tractor-store/checkout',
      'mfe-mini-cart',
    );
  });
});
