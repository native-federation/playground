import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NavigateToDirective } from '@internal/events';
import { beforeEach, describe, expect, it } from 'vitest';
import { ENV } from '../../../env.config';
import { testEnv } from '../../../testing/env.fixture';
import { CompactHeaderComponent } from './compact-header';

describe('CompactHeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompactHeaderComponent],
      providers: [provideRouter([]), { provide: ENV, useValue: testEnv }],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(CompactHeaderComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('exposes a cdn-prefixed logo url', () => {
    expect(create().componentInstance.logoUrl).toBe(
      'http://cdn.test/cdn/img/logo.svg',
    );
  });

  it('renders the logo with cdn src and accessible alt text', () => {
    const img = create().nativeElement.querySelector(
      'img',
    ) as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('http://cdn.test/cdn/img/logo.svg');
    expect(img.getAttribute('alt')).toBe('Micro Frontends - Tractor Store');
  });

  it('points the logo link at the explore home intent', () => {
    const fixture = create();
    const dir = fixture.debugElement
      .query(By.directive(NavigateToDirective))
      .injector.get(NavigateToDirective);
    expect(dir.navigateTo()).toBe('explore.home');
  });

  it('marks the host with the banner role', () => {
    const host: HTMLElement = create().nativeElement;
    expect(host.getAttribute('role')).toBe('banner');
  });
});
