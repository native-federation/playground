import { describe, expect, it } from 'vitest';
// @ts-expect-error -- the build's text loader hands us the config as a string
import federationConfig from '../federation.config.mjs' with { loader: 'text' };
import { navContribution } from './nav-contribution';

// The host loads a routed intent's element with loadRemoteModule(remote, element),
// so every element must be an `exposes` key. A typo would only fail at runtime.
const exposedKeys = [
  ...(federationConfig as string).matchAll(/^\s*'([\w-]+)':\s*'\.\//gm),
].map(([, key]) => key);

describe('nav-contribution', () => {
  it('is itself exposed', () => {
    expect(exposedKeys).toContain('nav-contribution');
  });

  it.each(
    navContribution.intents.flatMap(({ element }) =>
      element ? [element] : [],
    ),
  )('exposes the routed element <%s>', (element) => {
    expect(exposedKeys).toContain(element);
  });
});
