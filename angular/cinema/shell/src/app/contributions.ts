import { InjectionToken } from '@angular/core';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import type { NavContribution, NavFragment } from '../contracts';

export interface RemoteContribution {
  readonly remoteName: string;
  readonly contribution: NavContribution;
}

// The contributions of the remotes that loaded, in manifest order (ADR-12).
export const CONTRIBUTIONS = new InjectionToken<readonly RemoteContribution[]>(
  'CONTRIBUTIONS',
);

// A remote the orchestrator did not initialise (switched off, or down) is
// skipped silently: asking for it anyway makes the orchestrator log [NF][6].
// One that loaded but exposes something invalid is skipped with a warning.
export const loadContributions = async (
  nf: NativeFederationResult,
  manifest: FederationManifest,
): Promise<RemoteContribution[]> => {
  const present = Object.keys(manifest).filter((remoteName) =>
    nf.adapters.remoteInfoRepo.contains(remoteName),
  );
  const settled = await Promise.allSettled(
    present.map(async (remoteName) => {
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

export interface FragmentRef {
  readonly remoteName: string;
  readonly element: string;
}

export interface MenuEntry {
  readonly basePath: string;
  readonly links: readonly { readonly id: string; readonly label: string }[];
  readonly fragments: readonly FragmentRef[];
}

// Contributions are remote data: a malformed fragment or an unknown slot is ignored.
export const declaredFragments = (
  contributions: readonly RemoteContribution[],
): (FragmentRef & Pick<NavFragment, 'slot'>)[] =>
  contributions.flatMap(({ remoteName, contribution: { fragments } }) =>
    (Array.isArray(fragments) ? fragments : [])
      .filter(
        (f) => typeof f?.element === 'string' && (f.slot === undefined || f.slot === 'header'),
      )
      .map(({ element, slot }) => ({ remoteName, element, slot })),
  );

export const fragmentsIn = (
  contributions: readonly RemoteContribution[],
  slot: 'header',
): FragmentRef[] =>
  declaredFragments(contributions)
    .filter((f) => f.slot === slot)
    .map(({ remoteName, element }) => ({ remoteName, element }));

// Defines every declared fragment so pages can embed its tag; not awaited, so a
// slow or broken remote never holds up the shell (ADR-15).
export const defineFragments = (
  contributions: readonly RemoteContribution[],
  load: (remoteName: string, element: string) => Promise<void>,
): void => {
  for (const { remoteName, element } of declaredFragments(contributions)) {
    load(remoteName, element).catch((err) =>
      console.error(`[remote] failed to load <${element}> from "${remoteName}"`, err),
    );
  }
};

// One entry per team that contributes a menu link or a header fragment, in
// manifest order. Intents with `{params}` can't be menu links.
export const menuEntries = (
  contributions: readonly RemoteContribution[],
): MenuEntry[] =>
  contributions
    .map((remote) => {
      const { basePath, intents } = remote.contribution;
      return {
        basePath,
        links: intents
          .filter((i) => typeof i.menuLabel === 'string' && !i.path.includes('{'))
          .map((i) => ({ id: `${basePath}.${i.id}`, label: i.menuLabel! })),
        fragments: fragmentsIn([remote], 'header'),
      };
    })
    .filter((entry) => entry.links.length > 0 || entry.fragments.length > 0);
