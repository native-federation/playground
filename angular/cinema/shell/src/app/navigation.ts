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
  NavResolver,
} from '../contracts';

interface RemoteContribution {
  readonly remoteName: string;
  readonly contribution: NavContribution;
}

const PARAM = /^\{(\w+)\}$/;

// Runs as an app initializer so the routes exist before the first navigation.
export const provideNavigation = (
  nf: NativeFederationResult,
  manifest: FederationManifest,
): EnvironmentProviders =>
  provideAppInitializer(async () => {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);
    const contributions = await loadContributions(nf, manifest);

    const routes = toRoutes(contributions);
    // Unknown URLs go to the programme, else any page without params, else an empty page (no NG04002).
    const fallback =
      routes.find((route) => route.path === 'programme') ??
      routes.find((route) => !route.path?.includes(':'));
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
          const url = resolve(id, payload);
          if (url === null) console.error(`[nav] cannot navigate to "${id}"`);
          else void router.navigateByUrl(url);
        },
        { replay: false },
      ),
    );
  });

// A remote that fails to load or exposes something invalid is skipped, so the
// rest of the cinema keeps working.
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

  return (id, payload = {}) => {
    const template = templates.get(id);
    if (!template) {
      console.warn(`[nav] unknown intent "${id}"`);
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
