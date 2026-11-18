import type { FederationManifest } from '@softarc/native-federation-orchestrator';

export const SELECTION_KEY = 'cinema.remotes';
export const DEFAULT_REMOTES: readonly string[] = [
  '@cinema/programme',
  '@cinema/seating',
  '@cinema/booking',
  '@cinema/loyalty',
];

// Filled by applyRemoteSelection in main.ts, before Angular bootstraps.
let available: readonly string[] = [];
let loaded: readonly string[] = [];

export const availableRemotes = (): readonly string[] => available;
export const loadedRemotes = (): readonly string[] => loaded;

const isNameList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.length > 0 && value.every((n) => typeof n === 'string');

export const readSelection = (): readonly string[] => {
  try {
    const stored: unknown = JSON.parse(sessionStorage.getItem(SELECTION_KEY) ?? 'null');
    return isNameList(stored) ? stored : DEFAULT_REMOTES;
  } catch {
    return DEFAULT_REMOTES;
  }
};

export const saveSelection = (names: readonly string[]): void =>
  sessionStorage.setItem(SELECTION_KEY, JSON.stringify(names));

export const pick = (manifest: FederationManifest, names: readonly string[]): FederationManifest =>
  Object.fromEntries(Object.entries(manifest).filter(([name]) => names.includes(name)));

export const sameNames = (a: readonly string[], b: readonly string[]): boolean =>
  a.length === b.length && a.every((n) => b.includes(n));

export const applyRemoteSelection = (
  manifest: FederationManifest,
  selected: readonly string[] = readSelection(),
): FederationManifest => {
  available = Object.keys(manifest);
  loaded = available.filter((n) => selected.includes(n));
  return pick(manifest, loaded);
};
