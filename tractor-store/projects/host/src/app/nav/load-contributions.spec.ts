import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { NavContribution } from '@internal/events';
import {
  NAV_CONTRIBUTION_MODULE,
  loadContributions,
} from './load-contributions';
import {
  decideContribution,
  exploreContribution,
} from '../../testing/nav-contribution.fixture';
import { testManifest } from '../../testing/manifest.fixture';
import { fakeNfByRemote } from '../../testing/native-federation.stub';

describe('loadContributions', () => {
  let consoleWarn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarn.mockRestore();
  });

  it('loads contributions from every remote in the manifest', async () => {
    const nf = fakeNfByRemote({
      '@tractor-store/explore': { navContribution: exploreContribution },
      '@tractor-store/decide': { navContribution: decideContribution },
    });

    const loaded = await loadContributions(nf, testManifest);

    expect(loaded).toEqual([
      {
        remoteName: '@tractor-store/explore',
        contribution: exploreContribution,
      },
      {
        remoteName: '@tractor-store/decide',
        contribution: decideContribution,
      },
    ]);
  });

  it('accepts a default export when navContribution is absent', async () => {
    const nf = fakeNfByRemote({
      '@tractor-store/explore': { default: exploreContribution },
      '@tractor-store/decide': { navContribution: decideContribution },
    });

    const loaded = await loadContributions(nf, testManifest);

    expect(loaded[0].contribution).toBe(exploreContribution);
  });

  it('requests the well-known module name', async () => {
    const loadRemoteModule = vi.fn(async () => ({
      navContribution: exploreContribution,
    }));
    const nf = { loadRemoteModule } as unknown as Parameters<
      typeof loadContributions
    >[0];

    await loadContributions(nf, {
      '@tractor-store/explore': 'http://x/remoteEntry.json',
    });

    expect(loadRemoteModule).toHaveBeenCalledWith(
      '@tractor-store/explore',
      NAV_CONTRIBUTION_MODULE,
    );
  });

  it('skips remotes whose load fails and warns', async () => {
    const nf = fakeNfByRemote({
      '@tractor-store/explore': { navContribution: exploreContribution },
      // decide is missing → fakeNfByRemote throws
    });

    const loaded = await loadContributions(nf, testManifest);

    expect(loaded).toEqual([
      {
        remoteName: '@tractor-store/explore',
        contribution: exploreContribution,
      },
    ]);
    expect(consoleWarn).toHaveBeenCalledWith(
      expect.stringContaining('@tractor-store/decide'),
      expect.anything(),
    );
  });

  it('rejects exports that are not a valid NavContribution', async () => {
    const nf = fakeNfByRemote({
      '@tractor-store/explore': { navContribution: { not: 'valid' } },
      '@tractor-store/decide': { navContribution: decideContribution },
    });

    const loaded = await loadContributions(nf, testManifest);

    expect(loaded.map((l) => l.remoteName)).toEqual(['@tractor-store/decide']);
    expect(consoleWarn).toHaveBeenCalled();
  });

  it('rejects when the contribution has no intents array', async () => {
    const invalid = {
      source: '@tractor-store/explore',
      basePath: 'explore',
    } as unknown as NavContribution;
    const nf = fakeNfByRemote({
      '@tractor-store/explore': { navContribution: invalid },
    });

    const loaded = await loadContributions(nf, {
      '@tractor-store/explore': 'http://x/remoteEntry.json',
    });

    expect(loaded).toEqual([]);
    expect(consoleWarn).toHaveBeenCalled();
  });

  it('returns an empty list when the manifest is empty', async () => {
    const nf = fakeNfByRemote({});
    const loaded = await loadContributions(nf, {});
    expect(loaded).toEqual([]);
  });
});
