import {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import { NavContribution } from '@internal/events';

export const NAV_CONTRIBUTION_MODULE = 'nav-contribution';

export interface LoadedContribution {
  readonly remoteName: string;
  readonly contribution: NavContribution;
}

const isNavContribution = (v: unknown): v is NavContribution => {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o['source'] === 'string' &&
    typeof o['basePath'] === 'string' &&
    Array.isArray(o['intents'])
  );
};

const loadContribution = async (
  nf: NativeFederationResult,
  remoteName: string,
): Promise<LoadedContribution> => {
  const mod = await nf.loadRemoteModule<{
    navContribution?: NavContribution;
    default?: NavContribution;
  }>(remoteName, NAV_CONTRIBUTION_MODULE);
  const contribution = mod.navContribution ?? mod.default;
  if (!isNavContribution(contribution)) {
    throw new Error(
      `[nav] remote "${remoteName}" exposed "${NAV_CONTRIBUTION_MODULE}" but its export is not a valid NavContribution`,
    );
  }
  return { remoteName, contribution };
};

export const loadContributions = async (
  nf: NativeFederationResult,
  manifest: FederationManifest,
): Promise<readonly LoadedContribution[]> => {
  const remoteNames = Object.keys(manifest);
  const settled = await Promise.allSettled(
    remoteNames.map((name) => loadContribution(nf, name)),
  );

  const loaded: LoadedContribution[] = [];
  for (let i = 0; i < settled.length; i += 1) {
    const result = settled[i];
    if (result.status === 'fulfilled') {
      loaded.push(result.value);
    } else {
      console.warn(
        `[nav] failed to load contribution from "${remoteNames[i]}":`,
        result.reason,
      );
    }
  }
  return loaded;
};
