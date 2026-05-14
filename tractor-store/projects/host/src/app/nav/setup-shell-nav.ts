import { Routes } from '@angular/router';
import {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import { navigateTo, NavigatePayload } from '@internal/events';
import { loadContributions } from './load-contributions';
import { NavBarEntry, NavRegistry } from './nav-registry';
import { buildRemoteRoutes } from './remote-routes';

export interface ShellRouter {
  resetConfig(routes: Routes): void;
  navigateByUrl(url: string): Promise<boolean>;
}

export interface SetupShellNavigationDeps {
  readonly router: ShellRouter;
  readonly nf: NativeFederationResult;
  readonly manifest: FederationManifest;
  readonly onNavigate?: (
    handler: (payload: NavigatePayload) => void,
  ) => () => void;
  readonly fallbackRedirect?: string;
}

export const setupShellNavigation = async ({
  router,
  nf,
  manifest,
  onNavigate = (handler) => navigateTo.on(handler),
  fallbackRedirect = 'explore',
}: SetupShellNavigationDeps): Promise<void> => {
  const loaded = await loadContributions(nf, manifest);

  const registry = new NavRegistry((url) => router.navigateByUrl(url));
  for (const { contribution } of loaded) {
    registry.register(contribution);
  }

  onNavigate(({ id, payload }) => {
    void registry.navigate(id, payload).catch((err) => {
      console.error(`[nav] navigation to intent "${id}" failed`, err);
    });
  });

  router.resetConfig([
    ...buildRemoteRoutes(loaded),
    { path: '**', redirectTo: fallbackRedirect },
  ]);
};
