import type { FederationManifest } from '@softarc/native-federation-orchestrator';

export const SELECTION_KEY = 'cinema.remotes';

// Filled by applyRemoteSelection in main.ts, before Angular bootstraps.
let available: readonly string[] = [];
let loaded: readonly string[] = [];

export const availableRemotes = (): readonly string[] => available;
export const loadedRemotes = (): readonly string[] => loaded;

const isNameList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.length > 0 && value.every((n) => typeof n === 'string');

// null: nothing valid is stored, so every remote in the manifest loads.
export const readSelection = (): readonly string[] | null => {
  try {
    const stored: unknown = JSON.parse(sessionStorage.getItem(SELECTION_KEY) ?? 'null');
    return isNameList(stored) ? stored : null;
  } catch {
    return null;
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
  selected: readonly string[] | null = readSelection(),
): FederationManifest => {
  available = Object.keys(manifest);
  loaded = selected ? available.filter((n) => selected.includes(n)) : available;
  return pick(manifest, loaded);
};
