import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideZonelessChangeDetection, ApplicationRef } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';
import { provideShellNav } from './provide-shell-nav';
import {
  decideContribution,
  exploreContribution,
} from '../../testing/nav-contribution.fixture';
import { testManifest } from '../../testing/manifest.fixture';
import { fakeNfByRemote } from '../../testing/native-federation.stub';

describe('provideShellNav', () => {
  it('registers an app initializer that wires the Router resetConfig', async () => {
    const nf = fakeNfByRemote({
      '@tractor-store/explore': { navContribution: exploreContribution },
      '@tractor-store/decide': { navContribution: decideContribution },
    });

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideShellNav(nf, testManifest),
      ],
    });

    // Initializers run when the injector resolves ApplicationRef.
    const appRef = TestBed.inject(ApplicationRef);
    await appRef.whenStable();

    const router = TestBed.inject(Router);
    // resetConfig has run via setupShellNavigation, so the router holds the
    // generated routes (3 intents + the wildcard redirect).
    expect(router.config.length).toBeGreaterThanOrEqual(4);
    expect(router.config.at(-1)).toEqual({
      path: '**',
      redirectTo: 'explore',
    });
  });

  it('logs a warning when no remotes are available', async () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const nf = fakeNfByRemote({});

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideShellNav(nf, {}),
      ],
    });

    const appRef = TestBed.inject(ApplicationRef);
    await appRef.whenStable();

    const router = TestBed.inject(Router);
    // Only the wildcard route survives when no contributions load.
    expect(router.config).toEqual([{ path: '**', redirectTo: 'explore' }]);
    consoleWarn.mockRestore();
  });
});
