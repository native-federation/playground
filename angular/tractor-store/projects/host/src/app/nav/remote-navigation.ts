import {
  type EnvironmentProviders,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { Router } from '@angular/router';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import {
  type IntentMap,
  type IntentTarget,
  navIntents,
  navigateTo,
  resolveIntentUrl,
} from '@tractor-store/shared';
import {
  loadContributions,
  type RemoteRouteContribution,
} from './load-contributions';
import { buildRemoteRoutes } from './remote-routes';

export const buildIntentMap = (
  loaded: readonly RemoteRouteContribution[],
): IntentMap => {
  const intents = new Map<string, IntentTarget>();
  for (const { remoteName, contribution } of loaded) {
    for (const intent of contribution.intents) {
      const id = `${contribution.basePath}.${intent.id}`;
      if (intents.has(id)) {
        console.warn(
          `[nav] duplicate intent id "${id}"; "${remoteName}" overwrites the earlier one`,
        );
      }
      intents.set(id, { basePath: contribution.basePath, path: intent.path });
    }
  }
  return intents;
};

// Loads every remote's nav-contribution before the first route activates, then:
// registers their routes, publishes the intent map for links in the remotes, and
// turns `nav:navigate` events into router navigations.
export const provideRemoteNavigation = (
  nf: NativeFederationResult,
  manifest: FederationManifest,
  fallbackRedirect = 'explore',
): EnvironmentProviders =>
  provideAppInitializer(async () => {
    const router = inject(Router);
    const loaded = await loadContributions(nf, manifest);
    const intents = buildIntentMap(loaded);

    navIntents.publish(intents);
    navigateTo.on(({ id, payload }) => {
      const target = intents.get(id);
      if (!target) {
        console.error(`[nav] unknown intent "${id}"`);
        return;
      }
      try {
        void router.navigateByUrl(resolveIntentUrl(target, payload));
      } catch (err) {
        console.error(
          `[nav] cannot navigate to intent "${id}": ${(err as Error).message}`,
        );
      }
    });

    router.resetConfig([
      ...buildRemoteRoutes(loaded),
      { path: '**', redirectTo: fallbackRedirect },
    ]);
  });
