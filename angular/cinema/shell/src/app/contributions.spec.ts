import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { testManifest } from '../testing/manifest.fixture';
import { fakeNfByRemote } from '../testing/native-federation.stub';
import {
  programmeContribution,
  seatingContribution,
} from '../testing/nav-contribution.fixture';
import { loadContributions } from './contributions';

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
