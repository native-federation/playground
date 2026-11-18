import type { FederationManifest } from '@softarc/native-federation-orchestrator';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  applyRemoteSelection,
  availableRemotes,
  loadedRemotes,
  pick,
  readSelection,
  sameNames,
  saveSelection,
  SELECTION_KEY,
} from './remote-selection';

// One descriptor in object form, to prove `pick` passes descriptors through untouched.
const manifest: FederationManifest = {
  '@cinema/programme': 'http://localhost:4301/remoteEntry.json',
  '@cinema/film': { url: 'http://localhost:4302/remoteEntry.json', integrity: 'sha384-x' },
  '@cinema/seating': 'http://localhost:4303/remoteEntry.json',
};

beforeEach(() => sessionStorage.clear());

describe('readSelection', () => {
  it('is null when nothing is stored', () => {
    expect(readSelection()).toBeNull();
  });

  it.each([['not json'], ['[]'], ['{"a":1}'], ['[1,2]']])('is null for %s', (stored) => {
    sessionStorage.setItem(SELECTION_KEY, stored);
    expect(readSelection()).toBeNull();
  });

  it('round-trips a saved selection', () => {
    saveSelection(['@cinema/film']);
    expect(readSelection()).toEqual(['@cinema/film']);
  });
});

describe('pick', () => {
  it('keeps only the named remotes, descriptors unchanged', () => {
    expect(pick(manifest, ['@cinema/film', '@cinema/gone'])).toEqual({
      '@cinema/film': manifest['@cinema/film'],
    });
  });
});

describe('sameNames', () => {
  it.each([
    [[], [], true],
    [['a', 'b'], ['b', 'a'], true],
    [['a'], ['a', 'b'], false],
    [['a', 'b'], ['a', 'c'], false],
  ])('%j vs %j -> %s', (a, b, expected) => {
    expect(sameNames(a, b)).toBe(expected);
  });
});

describe('applyRemoteSelection', () => {
  it('filters the manifest and records available and loaded remotes', () => {
    const filtered = applyRemoteSelection(manifest, ['@cinema/seating', '@cinema/gone']);

    expect(filtered).toEqual({ '@cinema/seating': manifest['@cinema/seating'] });
    expect(availableRemotes()).toEqual(Object.keys(manifest));
    expect(loadedRemotes()).toEqual(['@cinema/seating']);
  });

  it('loads every remote, Angular 21 ones included, when nothing is stored', () => {
    expect(Object.keys(applyRemoteSelection(manifest))).toEqual(Object.keys(manifest));
    expect(loadedRemotes()).toEqual(Object.keys(manifest));
  });

  it('reads the stored selection by default', () => {
    saveSelection(['@cinema/programme']);
    expect(Object.keys(applyRemoteSelection(manifest))).toEqual(['@cinema/programme']);
  });
});
