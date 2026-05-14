import { Routes } from '@angular/router';
import { LoadedContribution } from './load-contributions';
import { toRoutePath } from '@internal/events';

const loadRemoteShell = () =>
  import('../loader/remote-shell.component').then(
    (m) => m.RemoteShellComponent,
  );

/**
 * Builds the host's lazy-loaded routes from the remotes' navigation
 * contributions. Each routed intent (one with an `element`) becomes a route
 * that mounts the `RemoteShellComponent`, which in turn instantiates the
 * remote's custom element. Non-routed intents (link-only) are intentionally
 * skipped — they exist purely so other apps can deep-link into them.
 */
export const buildRemoteRoutes = (
  loaded: readonly LoadedContribution[],
): Routes => {
  const routes: Routes = [];
  for (const { contribution } of loaded) {
    const remoteName = contribution.source;
    const routedIntents = contribution.intents.filter(
      (i) => typeof i.element === 'string',
    );
    if (routedIntents.length === 0) {
      console.warn(
        `[nav] contribution from "${remoteName}" has no intents with an \`element\` — skipping route registration`,
      );
      continue;
    }
    for (const intent of routedIntents) {
      routes.push({
        path: toRoutePath(contribution.basePath, intent.path),
        loadComponent: loadRemoteShell,
        data: { remoteName, element: intent.element },
      });
    }
  }
  return routes;
};
