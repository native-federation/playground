import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NavigateToDirective, provideEnv } from '@tractor-store/shared';
import { beforeEach, describe, expect, it } from 'vitest';
import { testEnv } from '../../../testing/env.fixture';
import { CompactHeaderComponent } from './compact-header';

describe('CompactHeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompactHeaderComponent],
      providers: [provideRouter([]), provideEnv(testEnv)],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(CompactHeaderComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the logo with cdn src and accessible alt text', () => {
    const img = (create().nativeElement as HTMLElement).querySelector(
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
    expect(dir.appNavigateTo()).toBe('explore.home');
  });

  it('marks the host with the banner role', () => {
    const host: HTMLElement = create().nativeElement;
    expect(host.getAttribute('role')).toBe('banner');
  });
});
