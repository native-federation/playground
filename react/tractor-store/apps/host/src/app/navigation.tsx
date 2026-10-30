import {
  createBrowserRouter,
  redirect,
  type RouteObject,
} from 'react-router-dom';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import type {
  Events,
  NavContribution,
  NavResolver,
} from '@tractor-store/contracts';
import { RemoteShell } from './remote-shell';

export interface RemoteContribution {
  readonly remoteName: string;
  readonly contribution: NavContribution;
}

const PARAM = /^\{(\w+)\}$/;

// Before the first render: load every remote's nav-contribution, turn it into
// routes, publish the resolver for links in the remotes and handle their
// `nav:navigate` commands.
export const createNavigation = async (
  nf: NativeFederationResult,
  manifest: FederationManifest,
) => {
  const registry = window.__NF_REGISTRY__!;
  const contributions = await loadContributions(nf, manifest);

  const routes = toRoutes(contributions);
  // Unknown URLs go to the store's home, or to any page that still loaded when explore is down.
  const fallback =
    routes.find((route) => route.path === '/explore') ??
    routes.find((route) => !route.path?.includes(':'));
  const router = createBrowserRouter(
    fallback
      ? [...routes, { path: '*', loader: () => redirect(fallback.path!) }]
      : routes,
  );

  const resolve = createResolver(contributions);
  // see Events['nav:resolve']
  await registry.register<Events['nav:resolve']>('nav:resolve', () => resolve);

  registry.on<Events['nav:navigate']>(
    'nav:navigate',
    ({ data: { id, payload } }) => {
      const url = resolve(id, payload);
      if (url === null) console.error(`[nav] cannot navigate to "${id}"`);
      else void router.navigate(url);
    },
    { replay: 0 },
  );

  return router;
};

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
export const toRoutes = (
  contributions: readonly RemoteContribution[],
): RouteObject[] =>
  contributions.flatMap(({ remoteName, contribution: { basePath, intents } }) =>
    intents.flatMap(({ path, element }) =>
      element === undefined
        ? []
        : [
            {
              path:
                '/' +
                segments(basePath, path)
                  .map((segment) => segment.replace(PARAM, ':$1'))
                  .join('/'),
              element: <RemoteShell remoteName={remoteName} element={element} />,
            },
          ],
    ),
  );

// Payload keys fill the `{param}` segments; the rest become the query string.
export const createResolver = (
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
    if (!template) return null;

    const query: Record<string, string> = { ...payload };
    const path: string[] = [];
    for (const segment of template) {
      const name = PARAM.exec(segment)?.[1];
      if (name === undefined) {
        path.push(segment);
        continue;
      }
      if (payload[name] === undefined) return null;
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
