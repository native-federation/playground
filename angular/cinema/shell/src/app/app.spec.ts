import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, type Routes } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { LOAD_REMOTE } from '../shared/remote-element';
import { App } from './app';

@Component({ template: '<p>routed page</p>' })
class RoutedPage {}

const render = (routes: Routes = [{ path: 'page', component: RoutedPage }]) => {
  TestBed.configureTestingModule({
    imports: [App],
    providers: [
      provideRouter(routes),
      // The fragments never load here, so their slots stay empty.
      { provide: LOAD_REMOTE, useValue: () => Promise.resolve() },
    ],
  });
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  return { fixture, root: fixture.nativeElement as HTMLElement };
};

describe('App', () => {
  it('renders the active route', async () => {
    const { fixture } = render();
    await TestBed.inject(Router).navigateByUrl('/page');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('routed page');
  });

  it('links the main navigation by intent', () => {
    const { root } = render();
    const intents = [...root.querySelectorAll('nav a')].map((a) =>
      a.getAttribute('navIntent'),
    );
    expect(intents).toEqual([
      'programme.list',
      'loyalty.points',
      'account.profile',
    ]);
    expect(root.querySelector('nav')?.getAttribute('aria-label')).toBe('Main');
  });

  it('marks the nav link of the current section', async () => {
    // Mirrors the routes navigation.ts builds: basePath/path plus the '**' fallback.
    const { fixture, root } = render([
      { path: 'programme', component: RoutedPage },
      { path: 'account', component: RoutedPage },
      { path: 'film/:filmId', component: RoutedPage },
      { path: '**', redirectTo: 'programme' },
    ]);
    const router = TestBed.inject(Router);
    const current = () =>
      [...root.querySelectorAll('nav a[aria-current="page"]')].map((a) =>
        a.getAttribute('navIntent'),
      );
    const visit = async (url: string) => {
      await router.navigateByUrl(url);
      await fixture.whenStable();
      return current();
    };

    expect(await visit('/programme')).toEqual(['programme.list']);
    expect(await visit('/account')).toEqual(['account.profile']);
    // A page outside the main navigation marks nothing.
    expect(await visit('/film/f-1')).toEqual([]);
    // router.url is read after the redirect, so '/' lights Programme.
    expect(await visit('/')).toEqual(['programme.list']);
  });

  it('places both cross-team fragments', () => {
    const { root } = render();
    expect(root.querySelector('mfe-loyalty-badge')).not.toBeNull();
    expect(root.querySelector('mfe-notifications-toast')).not.toBeNull();
  });
});
