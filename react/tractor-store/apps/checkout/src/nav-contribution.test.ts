import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { navContribution } from './nav-contribution';

// The host loads a routed intent's element with loadRemoteModule(remote, element),
// so every element must be an `exposes` key. A typo would only fail at runtime.
const federationConfig = readFileSync(new URL('../federation.config.mjs', import.meta.url), 'utf8');
const exposedKeys = [...federationConfig.matchAll(/^\s*'([\w-]+)':\s*'\.\//gm)].map(([, key]) => key);

describe('nav-contribution', () => {
  it('is itself exposed', () => {
    expect(exposedKeys).toContain('nav-contribution');
  });

  it.each(navContribution.intents.flatMap(({ element }) => (element ? [element] : [])))(
    'exposes the routed element <%s>',
    (element) => {
      expect(exposedKeys).toContain(element);
    },
  );
});
