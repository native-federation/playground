import { TestBed } from '@angular/core/testing';
import type { Events, NavigatePayload } from '@tractor-store/contracts';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CartStore } from '../../data/cart-store';
import { CART_STORAGE_KEY } from '../../data/cart-storage';
import { LOAD_REMOTE } from '../../shared/remote-element';
import { CheckoutPage } from './checkout.page';

describe('CheckoutPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.configureTestingModule({
      providers: [{ provide: LOAD_REMOTE, useValue: () => Promise.resolve() }],
    });
  });

  function render() {
    const fixture = TestBed.createComponent(CheckoutPage);
    fixture.detectChanges();
    const root = (fixture.nativeElement as HTMLElement).shadowRoot!;
    const type = (id: string, value: string) => {
      const input = root.querySelector<HTMLInputElement>(`#${id}`)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    return {
      fixture,
      root,
      type,
      submit: root.querySelector<HTMLButtonElement>('button[type="submit"]')!,
    };
  }

  const selectStore = (id: string) =>
    window.__NF_REGISTRY__!.emit<Events['store:selected']>('store:selected', {
      id,
    });

  it('keeps place order disabled until the form is complete', async () => {
    const { fixture, type, submit } = render();
    expect(submit.disabled).toBe(true);

    type('c_firstname', 'Alice');
    type('c_lastname', 'Anderson');
    await fixture.whenStable();
    expect(submit.disabled).toBe(true);

    // Regression: the store id arrives from the bus, outside any template event,
    // and must still enable the button under zoneless change detection.
    selectStore('berlin');
    await fixture.whenStable();
    expect(submit.disabled).toBe(false);
  });

  it('fills the read-only store id from a store picked earlier', async () => {
    selectStore('hamburg');
    const { fixture, root } = render();
    // The bus replays the last event asynchronously.
    await vi.waitFor(async () => {
      await fixture.whenStable();
      expect(root.querySelector<HTMLInputElement>('#c_storeId')!.value).toBe(
        'hamburg',
      );
    });
  });

  it('clears the cart and asks the host to navigate to thanks on submit', async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, 'AU-03-RD_2');
    const navigations: NavigatePayload[] = [];
    window.__NF_REGISTRY__!.on<Events['nav:navigate']>(
      'nav:navigate',
      ({ data }) => navigations.push(data),
      { replay: 0 },
    );
    const { fixture, type, submit } = render();
    type('c_firstname', 'A');
    type('c_lastname', 'B');
    selectStore('hamburg');
    await fixture.whenStable();

    submit.click();

    expect(TestBed.inject(CartStore).lineItems()).toEqual([]);
    expect(navigations).toEqual([{ id: 'checkout.thanks' }]);
  });
});
