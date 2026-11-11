import { beforeAll, describe, expect, it } from 'vitest';
// @ts-expect-error -- the build's text loader hands us the config as a string
import federationConfig from '../federation.config.mjs' with { loader: 'text' };
import { bootstrap } from './bootstrap';

// Every exposed key except nav-contribution is an element tag the shell mounts.
const exposedTags = [
  ...(federationConfig as string).matchAll(/^\s*'([\w-]+)':\s*'\.\//gm),
]
  .map(([, key]) => key)
  .filter((key) => key !== 'nav-contribution');

describe('bootstrap', () => {
  // Twice at once: the shell's badge slot and a route can both load the same
  // module; customElements.define would throw on the second call.
  beforeAll(() => Promise.all([bootstrap(), bootstrap()]));

  it('exposes one element', () => {
    expect(exposedTags).toEqual(['mfe-film-detail']);
  });

  it.each(exposedTags)('defines exactly the exposed tag <%s>', (tag) => {
    expect(customElements.get(tag)).toBeDefined();
  });
});
