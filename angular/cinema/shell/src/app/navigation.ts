import {
  DestroyRef,
  type EnvironmentProviders,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { Router, type Routes } from '@angular/router';
import { bus } from '@softarc/native-federation-communication';
import type { NavIntents } from '../contracts';
import { urlFor } from '../shared/navigate';
import type { RemoteContribution } from './contributions';

// Runs as an app initializer so the routes exist before the first navigation.
export const provideNavigation = (
  contributions: readonly RemoteContribution[],
): EnvironmentProviders =>
  provideAppInitializer(() => {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);

    const routes = toRoutes(contributions);
    // Unknown URLs go to the first page without params in manifest order, else an empty page (no NG04002).
    const fallback = routes.find((route) => !route.path?.includes(':'));
    router.resetConfig([
      ...routes,
      fallback
        ? { path: '**', redirectTo: fallback.path }
        : { path: '**', children: [] },
    ]);

    const intents = toIntents(contributions);
    bus.emit('nav:intents', intents);

    // replay: false ignores a stale command if a remote emitted it without retain: false.
    destroyRef.onDestroy(
      bus.on(
        'nav:navigate',
        ({ id, payload }) => {
          const url = urlFor(intents, id, payload);
          if (url !== null) void router.navigateByUrl(url);
          // A whole team being absent is normal (ADR-12); a miss inside a loaded team is drift.
          else if (isLoadedTeam(intents, id)) console.warn(`[nav] cannot navigate to "${id}"`);
        },
        { replay: false },
      ),
    );
  });

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

const isLoadedTeam = (intents: NavIntents, id: string): boolean => {
  const team = `${id.split('.')[0]}.`;
  return Object.keys(intents).some((key) => key.startsWith(team));
};

const PARAM = /\{(\w+)\}/g;

const segments = (basePath: string, path: string): string[] =>
  `${basePath}/${path}`.split('/').filter((segment) => segment !== '');
