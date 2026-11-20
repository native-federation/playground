import {
  DestroyRef,
  type EnvironmentProviders,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { Router, type Routes } from '@angular/router';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import { bus } from '@softarc/native-federation-communication';
import type {
  NavContribution,
  NavIntents,
  NavPayload,
} from '@tractor-store/contracts';

interface RemoteContribution {
  readonly remoteName: string;
  readonly contribution: NavContribution;
}

// Before the first route activates: load every remote's nav-contribution, turn
// it into routes, publish the intents for links in the remotes and handle
// their `nav:navigate` commands.
export const provideNavigation = (
  nf: NativeFederationResult,
  manifest: FederationManifest,
): EnvironmentProviders =>
  provideAppInitializer(async () => {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);
    const contributions = await loadContributions(nf, manifest);

    const routes = toRoutes(contributions);
    // Unknown URLs go to the store's home, or to any page that still loaded when explore is down.
    const fallback =
      routes.find((route) => route.path === 'explore') ??
      routes.find((route) => !route.path?.includes(':'));
    router.resetConfig(
      fallback
        ? [...routes, { path: '**', redirectTo: fallback.path }]
        : routes,
    );

    const intents = toIntents(contributions);
    bus.emit('nav:intents', intents);

    destroyRef.onDestroy(handleNavigateCommands(router, intents));
  });

// Handles the remotes' `nav:navigate` commands; returns the unsubscribe function.
export const handleNavigateCommands = (
  router: Pick<Router, 'navigateByUrl'>,
  intents: NavIntents,
): (() => void) =>
  // replay: false ignores a stale command if a remote emitted it without retain: false.
  bus.on(
    'nav:navigate',
    ({ id, payload }) => {
      const url = urlFor(intents, id, payload);
      if (url === null) console.error(`[nav] cannot navigate to "${id}"`);
      else void router.navigateByUrl(url);
    },
    { replay: false },
  );

// A remote that fails to load or exposes something invalid is skipped, so the
// rest of the store keeps working.
const loadContributions = async (
  nf: NativeFederationResult,
  manifest: FederationManifest,
): Promise<RemoteContribution[]> => {
  const settled = await Promise.allSettled(
    Object.keys(manifest).map(async (remoteName) => {
      const { navContribution } = await nf.loadRemoteModule<{
        navContribution?: NavContribution;
      }>(remoteName, 'nav-contribution');
      if (
        typeof navContribution?.basePath !== 'string' ||
        !Array.isArray(navContribution.intents)
      ) {
        throw new Error(
          `"${remoteName}" does not export a valid navContribution`,
        );
      }
      return { remoteName, contribution: navContribution };
    }),
  );

  return settled.flatMap((result) => {
    if (result.status === 'fulfilled') return [result.value];
    console.warn('[nav] skipping a remote:', result.reason);
    return [];
  });
};

// Every intent with an element becomes a route that mounts it through the
// remote shell; `{id}` segments become `:id`.
const toRoutes = (contributions: readonly RemoteContribution[]): Routes =>
  contributions.flatMap(({ remoteName, contribution: { basePath, intents } }) =>
    intents
      .filter((intent) => intent.element !== undefined)
      .map((intent) => ({
        path: segments(basePath, intent.path).join('/').replace(PARAM, ':$1'),
        loadComponent: () =>
          import('./remote-shell.component').then(
            (m) => m.RemoteShellComponent,
          ),
        data: { remoteName, element: intent.element },
      })),
  );

const toIntents = (contributions: readonly RemoteContribution[]): NavIntents => {
  const intents: Record<string, string> = {};
  for (const { remoteName, contribution } of contributions) {
    for (const intent of contribution.intents) {
      const id = `${contribution.basePath}.${intent.id}`;
      if (Object.hasOwn(intents, id)) {
        console.warn(
          `[nav] "${remoteName}" redefines intent "${id}"; the last one wins`,
        );
      }
      intents[id] = `/${segments(contribution.basePath, intent.path).join('/')}`;
    }
  }
  // Frozen: every remote gets this same object from the bus.
  return Object.freeze(intents);
};

// The same function as each remote's shared/navigate.ts, so an href and a navigation never differ.
// Payload keys fill the path's `{param}` segments; the rest become the query string.
export const urlFor = (
  intents: NavIntents,
  id: string,
  payload: NavPayload = {},
): string | null => {
  // hasOwn, so an id like 'constructor' doesn't hit Object.prototype.
  const path = Object.hasOwn(intents, id) ? intents[id] : undefined;
  if (path === undefined) return null;
  const params = [...path.matchAll(PARAM)].map(([, name]) => name);
  if (params.some((name) => payload[name] === undefined)) return null;

  const url = path.replace(PARAM, (_, name: string) =>
    encodeURIComponent(payload[name]),
  );
  const query = Object.entries(payload)
    .filter(([key]) => !params.includes(key))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return query ? `${url}?${query}` : url;
};

const PARAM = /\{(\w+)\}/g;

const segments = (basePath: string, path: string): string[] =>
  `${basePath}/${path}`.split('/').filter((segment) => segment !== '');
