import { vi } from 'vitest';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';

/** Wraps a `loadRemoteModule` implementation in a `NativeFederationResult`.
 *  `initialised` plays the orchestrator's remoteInfoRepo: the remotes it fetched. */
export const fakeNf = (
  loadRemoteModule: NativeFederationResult['loadRemoteModule'],
  initialised: (remoteName: string) => boolean = () => true,
): NativeFederationResult =>
  ({
    loadRemoteModule,
    adapters: { remoteInfoRepo: { contains: initialised } },
  }) as unknown as NativeFederationResult;

/** Builds a `NativeFederationResult` whose `loadRemoteModule` returns the
 *  module registered for the requested remote, throwing for unknown remotes.
 *  By default exactly the registered remotes count as initialised. */
export const fakeNfByRemote = (
  byRemote: Record<string, unknown>,
  initialised: readonly string[] = Object.keys(byRemote),
): NativeFederationResult =>
  fakeNf(
    vi.fn(async (remoteName: string) => {
      if (!(remoteName in byRemote)) throw new Error(`unknown ${remoteName}`);
      return byRemote[remoteName];
    }) as unknown as NativeFederationResult['loadRemoteModule'],
    (remoteName) => initialised.includes(remoteName),
  );
