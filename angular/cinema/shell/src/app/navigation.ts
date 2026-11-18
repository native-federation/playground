import {
  DestroyRef,
  type EnvironmentProviders,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { Router, type Routes } from '@angular/router';
import { bus } from '@softarc/native-federation-communication';
import type { NavResolver } from '../contracts';
import type { RemoteContribution } from './contributions';

const PARAM = /^\{(\w+)\}$/;

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

    const resolve = createResolver(contributions);
    bus.emit('nav:resolve', resolve);

    // replay: false ignores a stale command if a remote emitted it without retain: false.
    destroyRef.onDestroy(
      bus.on(
        'nav:navigate',
        ({ id, payload }) => {
          // An unresolvable intent was already warned about by the resolver, if it is drift.
          const url = resolve(id, payload);
          if (url !== null) void router.navigateByUrl(url);
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
        path: segments(basePath, intent.path)
          .map((segment) => segment.replace(PARAM, ':$1'))
          .join('/'),
        loadComponent: () =>
          import('./remote-shell.component').then(
            (m) => m.RemoteShellComponent,
          ),
        data: { remoteName, element: intent.element },
      })),
  );

// Payload keys fill the `{param}` segments; the rest become the query string.
const createResolver = (
  contributions: readonly RemoteContribution[],
): NavResolver => {
  const templates = new Map<string, string[]>();
  for (const { remoteName, contribution } of contributions) {
    for (const intent of contribution.intents) {
      const id = `${contribution.basePath}.${intent.id}`;
      if (templates.has(id)) {
        console.warn(
          `[nav] "${remoteName}" redefines intent "${id}"; the last one wins`,
        );
      }
      templates.set(id, segments(contribution.basePath, intent.path));
    }
  }

  const loadedTeams = new Set(
    contributions.map(({ contribution }) => contribution.basePath),
  );

  return (id, payload = {}) => {
    const template = templates.get(id);
    if (!template) {
      // A whole team being absent is normal (ADR-12); an unknown id inside a loaded team is drift.
      if (loadedTeams.has(id.split('.')[0])) {
        console.warn(`[nav] unknown intent "${id}"`);
      }
      return null;
    }

    const query: Record<string, string> = { ...payload };
    const path: string[] = [];
    for (const segment of template) {
      const name = PARAM.exec(segment)?.[1];
      if (name === undefined) {
        path.push(segment);
        continue;
      }
      if (payload[name] === undefined) {
        console.warn(`[nav] intent "${id}" is missing param "${name}"`);
        return null;
      }
      path.push(encodeURIComponent(payload[name]));
      delete query[name];
    }

    const search = Object.entries(query)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    return `/${path.join('/')}${search ? `?${search}` : ''}`;
  };
};

const segments = (basePath: string, path: string): string[] =>
  `${basePath}/${path}`.split('/').filter((segment) => segment !== '');
