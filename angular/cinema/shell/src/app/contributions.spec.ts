import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { testManifest } from '../testing/manifest.fixture';
import { fakeNfByRemote } from '../testing/native-federation.stub';
import {
  programmeContribution,
  seatingContribution,
} from '../testing/nav-contribution.fixture';
import {
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
  it('turns labelled intents and header fragments into one entry per team', () => {
    const entries = menuEntries([
      remote('@x/loyalty', {
        basePath: 'loyalty',
        intents: [{ id: 'points', path: '', menuLabel: 'Points' }],
        fragments: [
          { element: 'mfe-badge', slot: 'header' },
          { element: 'mfe-toast', slot: 'overlay' },
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

describe('fragmentsIn', () => {
  it('ignores malformed fragments and unknown slots from remote data', () => {
    const broken = {
      basePath: 'b',
      intents: [],
      fragments: [{ element: 42, slot: 'overlay' }, { element: 'mfe-x', slot: 'footer' }, null],
    } as unknown as RemoteContribution['contribution'];
    const notAnArray = {
      basePath: 'c',
      intents: [],
      fragments: 'mfe-y',
    } as unknown as RemoteContribution['contribution'];
    expect(
      fragmentsIn(
        [
          remote('@x/a', { basePath: 'a', intents: [], fragments: [{ element: 'mfe-ok', slot: 'overlay' }] }),
          remote('@x/b', broken),
          remote('@x/c', notAnArray),
        ],
        'overlay',
      ),
    ).toEqual([{ remoteName: '@x/a', element: 'mfe-ok' }]);
  });
});
