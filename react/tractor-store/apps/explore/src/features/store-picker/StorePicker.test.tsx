// @vitest-environment jsdom
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { bus } from '@softarc/native-federation-communication';
import type { StoreSelectedPayload } from '@tractor-store/contracts';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StorePicker } from './StorePicker';

// jsdom has no adoptedStyleSheets, and the CDN only matters for image URLs.
vi.mock('../../app', () => ({
  useStyles: () => {},
  useCdn: () => ({ src: (path: string) => path, srcSet: () => '' }),
}));

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('StorePicker', () => {
  let container: HTMLElement;
  let root: Root;

  beforeEach(() => {
    // jsdom does not implement <dialog> methods.
    HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
      this.removeAttribute('open');
    };
    container = document.body.appendChild(document.createElement('div'));
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('emits store:selected with the picked store and retains it for a later subscriber', async () => {
    // An async act lets getStores() resolve, so the list has rendered.
    await act(async () => root.render(<StorePicker />));
    const received: StoreSelectedPayload[] = [];
    bus.on('store:selected', (value) => received.push(value));

    const select = [...container.querySelectorAll('li button')][1] as HTMLButtonElement;
    act(() => select.click());

    expect(received).toEqual([{ id: 'store-b' }]);
    expect(bus.peek('store:selected')).toEqual({ id: 'store-b' });
  });
});
