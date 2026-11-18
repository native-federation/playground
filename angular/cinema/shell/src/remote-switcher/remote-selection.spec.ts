import type { FederationManifest } from '@softarc/native-federation-orchestrator';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  applyRemoteSelection,
  availableRemotes,
  DEFAULT_REMOTES,
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
  it('falls back to the default when nothing is stored', () => {
    expect(readSelection()).toEqual(DEFAULT_REMOTES);
  });

  it.each([['not json'], ['[]'], ['{"a":1}'], ['[1,2]']])(
    'falls back to the default for %s',
    (stored) => {
      sessionStorage.setItem(SELECTION_KEY, stored);
      expect(readSelection()).toEqual(DEFAULT_REMOTES);
    },
  );

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

  it('reads the stored selection by default', () => {
    saveSelection(['@cinema/programme']);
    expect(Object.keys(applyRemoteSelection(manifest))).toEqual(['@cinema/programme']);
  });
});
