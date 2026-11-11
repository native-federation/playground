import { vi } from 'vitest';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';

/** Wraps a `loadRemoteModule` implementation in a `NativeFederationResult`. */
export const fakeNf = (
  loadRemoteModule: NativeFederationResult['loadRemoteModule'],
): NativeFederationResult =>
  ({ loadRemoteModule }) as unknown as NativeFederationResult;

/** Builds a `NativeFederationResult` whose `loadRemoteModule` returns the
 *  module registered for the requested remote, throwing for unknown remotes. */
export const fakeNfByRemote = (
  byRemote: Record<string, unknown>,
): NativeFederationResult =>
  fakeNf(
    vi.fn(async (remoteName: string) => {
      if (!(remoteName in byRemote)) throw new Error(`unknown ${remoteName}`);
      return byRemote[remoteName];
    }) as unknown as NativeFederationResult['loadRemoteModule'],
  );
