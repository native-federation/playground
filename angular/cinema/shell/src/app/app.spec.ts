import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, type Routes } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { LOAD_REMOTE } from '../shared/remote-element';
import { App } from './app';
import { CONTRIBUTIONS, type RemoteContribution } from './contributions';

@Component({ template: '<p>routed page</p>' })
class RoutedPage {}

// Mirrors what the real remotes declare in their nav-contribution.
const contributionsByRemote: Record<string, RemoteContribution['contribution']> = {
  '@cinema/programme': {
    basePath: 'programme',
    intents: [{ id: 'list', path: '', element: 'mfe-programme-list', menuLabel: 'Programme' }],
  },
  '@cinema/film': {
    basePath: 'film',
    intents: [{ id: 'detail', path: '{filmId}', element: 'mfe-film-detail' }],
  },
  '@cinema/loyalty': {
    basePath: 'loyalty',
    intents: [{ id: 'points', path: '', element: 'mfe-loyalty-points', menuLabel: 'Points' }],
    fragments: [{ element: 'mfe-loyalty-badge', slot: 'header' }],
  },
  '@cinema/booking': {
    basePath: 'booking',
    intents: [{ id: 'checkout', path: '{screeningId}', element: 'mfe-booking-checkout' }],
    fragments: [{ element: 'mfe-booking-start' }],
  },
  '@cinema/account': {
    basePath: 'account',
    intents: [{ id: 'profile', path: '', element: 'mfe-account-profile', menuLabel: 'Account' }],
  },
};

const loaded = (...names: string[]): RemoteContribution[] =>
  names.map((remoteName) => ({ remoteName, contribution: contributionsByRemote[remoteName] }));

const render = (
  routes: Routes = [{ path: 'page', component: RoutedPage }],
  contributions = loaded(...Object.keys(contributionsByRemote)),
) => {
  TestBed.configureTestingModule({
    imports: [App],
    providers: [
      provideRouter(routes),
      { provide: CONTRIBUTIONS, useValue: contributions },
      // Loading succeeds at once, so each fragment mounts its element.
      { provide: LOAD_REMOTE, useValue: () => Promise.resolve() },
    ],
  });
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  const root = fixture.nativeElement as HTMLElement;
  // [navIntent] is a property binding, so links are identified by their label.
  const labels = (selector = 'nav a') =>
    [...root.querySelectorAll(selector)].map((a) => a.textContent?.trim());
  return { fixture, root, labels };
};

describe('App', () => {
  it('renders the active route', async () => {
    const { fixture } = render();
    await TestBed.inject(Router).navigateByUrl('/page');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('routed page');
  });

  it('builds the main menu from the menu labels, in manifest order', () => {
    const { root, labels } = render();
    // film's only intent needs a param and has no label, so it adds nothing.
    expect(labels()).toEqual(['Programme', 'Points', 'Account']);
    expect(root.querySelector('nav')?.getAttribute('aria-label')).toBe('Main');
  });

  it('marks the nav link of the current section', async () => {
    // Mirrors the routes navigation.ts builds: basePath/path plus the '**' fallback.
    const { fixture, labels } = render([
      { path: 'programme', component: RoutedPage },
      { path: 'account', component: RoutedPage },
      { path: 'film/:filmId', component: RoutedPage },
      { path: '**', redirectTo: 'programme' },
    ]);
    const router = TestBed.inject(Router);
    const visit = async (url: string) => {
      await router.navigateByUrl(url);
      await fixture.whenStable();
      return labels('nav a[aria-current="page"]');
    };

    expect(await visit('/programme')).toEqual(['Programme']);
    expect(await visit('/account')).toEqual(['Account']);
    // A page outside the main navigation marks nothing.
    expect(await visit('/film/f-1')).toEqual([]);
    // router.url is read after the redirect, so '/' lights Programme.
    expect(await visit('/')).toEqual(['Programme']);
  });

  it('mounts header fragments after their team links and leaves embedded ones to pages', async () => {
    const { fixture, root } = render();
    await fixture.whenStable();
    const badge = root.querySelector('nav mfe-loyalty-badge');
    expect(badge?.closest('app-remote-fragment')?.previousElementSibling?.textContent?.trim()).toBe('Points');
    expect(root.querySelector('mfe-booking-start')).toBeNull();
  });

  it('links the brand to the root, which falls back to the first page', () => {
    const { root } = render();
    expect(root.querySelector('a.brand')?.getAttribute('href')).toBe('/');
  });

  it('renders no link or fragment of a remote that did not load', () => {
    const { root, labels } = render(undefined, loaded('@cinema/programme'));
    expect(labels()).toEqual(['Programme']);
    expect(root.querySelector('app-remote-fragment')).toBeNull();
  });
});
