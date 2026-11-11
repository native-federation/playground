import { describe, expect, it } from 'vitest';
import { getAppInjector } from './app.config';

describe('app.config', () => {
  it('creates one application for all elements of this remote', async () => {
    expect(await getAppInjector()).toBe(await getAppInjector());
  });
});
