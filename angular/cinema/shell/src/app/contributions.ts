import { InjectionToken } from '@angular/core';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import type { NavContribution } from '../contracts';

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
