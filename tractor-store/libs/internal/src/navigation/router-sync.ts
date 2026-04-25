import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

/**
 * Each MFE (and the host) bootstraps its own Angular Router. They each call
 * history.pushState in isolation, so a navigation in one router is invisible
 * to the others. After every successful navigation we dispatch a synthetic
 * popstate so sibling routers re-sync to the current URL. With the default
 * onSameUrlNavigation: 'ignore' this is idempotent — a router whose internal
 * URL already matches the browser URL does nothing.
 */
export function provideRouterSync(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const router = inject(Router);
      router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      });
    }),
  ]);
}
