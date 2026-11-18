import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { testManifest } from '../testing/manifest.fixture';
import { fakeNfByRemote } from '../testing/native-federation.stub';
import {
  programmeContribution,
  seatingContribution,
} from '../testing/nav-contribution.fixture';
import {
  declaredFragments,
  defineFragments,
  fragmentsIn,
  loadContributions,
  menuEntries,
  type RemoteContribution,
} from './contributions';

describe('loadContributions', () => {
  let consoleWarn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => vi.restoreAllMocks());

  it("loads every initialised remote's nav-contribution, in manifest order", async () => {
    const nf = fakeNfByRemote({
      '@cinema/seating': { navContribution: seatingContribution },
      '@cinema/programme': { navContribution: programmeContribution },
    });
    expect(await loadContributions(nf, testManifest)).toEqual([
      { remoteName: '@cinema/programme', contribution: programmeContribution },
      { remoteName: '@cinema/seating', contribution: seatingContribution },
    ]);
  });

  it('silently skips a remote the orchestrator did not initialise (off or down)', async () => {
    // seating is in the manifest but was never initialised.
    const nf = fakeNfByRemote({
      '@cinema/programme': { navContribution: programmeContribution },
    });
    const contributions = await loadContributions(nf, testManifest);
    expect(contributions.map((c) => c.remoteName)).toEqual(['@cinema/programme']);
    // Asking anyway would make the real orchestrator log [NF][6].
    expect(nf.loadRemoteModule).not.toHaveBeenCalledWith('@cinema/seating', 'nav-contribution');
    expect(consoleWarn).not.toHaveBeenCalled();
  });

  it('warns about an initialised remote whose module fails to load', async () => {
    const nf = fakeNfByRemote(
      { '@cinema/programme': { navContribution: programmeContribution } },
      ['@cinema/programme', '@cinema/seating'],
    );
    expect(await loadContributions(nf, testManifest)).toHaveLength(1);
    expect(consoleWarn).toHaveBeenCalledWith('[nav] skipping a remote:', expect.any(Error));
  });

  it('warns about and skips an export that is not a valid contribution', async () => {
    const nf = fakeNfByRemote({
      '@cinema/programme': { default: programmeContribution },
      '@cinema/seating': { navContribution: { basePath: 'seating' } },
    });
    expect(await loadContributions(nf, testManifest)).toEqual([]);
    expect(consoleWarn).toHaveBeenCalledTimes(2);
  });
});

const remote = (
  remoteName: string,
  contribution: RemoteContribution['contribution'],
): RemoteContribution => ({ remoteName, contribution });

describe('menuEntries', () => {
  it('turns labelled intents and header fragments into one entry per team, without embeds', () => {
    const entries = menuEntries([
      remote('@x/loyalty', {
        basePath: 'loyalty',
        intents: [{ id: 'points', path: '', menuLabel: 'Points' }],
        fragments: [
          { element: 'mfe-badge', slot: 'header' },
          { element: 'mfe-embed' },
        ],
      }),
    ]);
    expect(entries).toEqual([
      {
        basePath: 'loyalty',
        links: [{ id: 'loyalty.points', label: 'Points' }],
        fragments: [{ remoteName: '@x/loyalty', element: 'mfe-badge' }],
      },
    ]);
  });

  it('ignores a label on an intent with params and drops teams with nothing to show', () => {
    expect(
      menuEntries([
        remote('@x/film', {
          basePath: 'film',
          intents: [{ id: 'detail', path: '{filmId}', menuLabel: 'Film' }],
        }),
        remote('@x/booking', { basePath: 'booking', intents: [{ id: 'checkout', path: '' }] }),
      ]),
    ).toEqual([]);
  });
});

// Remote data the contract does not allow: a non-string element, slots the shell
// does not have ('overlay' was retired by ADR-15), a null entry, and a non-array.
const broken = remote('@x/b', {
  basePath: 'b',
  intents: [],
  fragments: [
    { element: 42, slot: 'header' },
    { element: 'mfe-x', slot: 'footer' },
    { element: 'mfe-y', slot: 'overlay' },
    null,
  ],
} as unknown as RemoteContribution['contribution']);
const notAnArray = remote('@x/c', {
  basePath: 'c',
  intents: [],
  fragments: 'mfe-z',
} as unknown as RemoteContribution['contribution']);
const valid = remote('@x/a', {
  basePath: 'a',
  intents: [],
  fragments: [{ element: 'mfe-badge', slot: 'header' }, { element: 'mfe-card' }],
});

describe('declaredFragments', () => {
  it('returns header and slot-less fragments and ignores malformed ones', () => {
    expect(declaredFragments([valid, broken, notAnArray])).toEqual([
      { remoteName: '@x/a', element: 'mfe-badge', slot: 'header' },
      { remoteName: '@x/a', element: 'mfe-card', slot: undefined },
    ]);
  });
});

describe('fragmentsIn', () => {
  it('keeps only the fragments placed in the slot', () => {
    expect(fragmentsIn([valid, broken, notAnArray], 'header')).toEqual([
      { remoteName: '@x/a', element: 'mfe-badge' },
    ]);
  });
});

describe('defineFragments', () => {
  afterEach(() => vi.restoreAllMocks());

  it('loads every declared fragment once and returns without waiting', () => {
    const load = vi.fn(() => new Promise<void>(() => {}));
    expect(defineFragments([valid, broken], load)).toBeUndefined();
    expect(load.mock.calls).toEqual([
      ['@x/a', 'mfe-badge'],
      ['@x/a', 'mfe-card'],
    ]);
  });

  it('logs a failed load and does not throw', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('boom');
    defineFragments([valid], () => Promise.reject(err));
    await Promise.resolve();
    await Promise.resolve();
    expect(consoleError).toHaveBeenCalledWith('[remote] failed to load <mfe-card> from "@x/a"', err);
    expect(consoleError).toHaveBeenCalledTimes(2);
  });
});
