// @vitest-environment jsdom
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { bus } from '@softarc/native-federation-communication';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Checkout } from './Checkout';

// jsdom has no adoptedStyleSheets, and the embedded explore elements are never loaded here.
vi.mock('../../app', () => ({
  useStyles: () => {},
  useCdn: () => ({ src: (path: string) => path, srcSet: () => '' }),
  useApp: () => ({
    env: { production: false, cdnUrl: '' },
    loadRemote: () => Promise.resolve(),
  }),
}));

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('Checkout', () => {
  let container: HTMLElement;
  let root: Root;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement('div'));
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  const storeField = () => container.querySelector<HTMLInputElement>('#c_storeId')!;

  it('fills the store field from store:selected', () => {
    act(() => root.render(<Checkout />));
    expect(storeField().value).toBe('');
    act(() => bus.emit('store:selected', { id: 'store-b' }));
    expect(storeField().value).toBe('store-b');
  });

  // The bus retains state, so a pick made before checkout rendered still arrives.
  it('picks up a store that was selected before it rendered', () => {
    bus.emit('store:selected', { id: 'store-a' });
    act(() => root.render(<Checkout />));
    expect(storeField().value).toBe('store-a');
  });
});
