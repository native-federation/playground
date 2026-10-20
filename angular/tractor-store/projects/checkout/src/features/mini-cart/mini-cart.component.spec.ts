import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CartStore } from '../../data/cart-store';
import { CART_STORAGE_KEY } from '../../data/cart-storage';
import { MiniCartComponent } from './mini-cart.component';

describe('MiniCartComponent', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => vi.useRealTimers());

  function render() {
    const fixture = TestBed.createComponent(MiniCartComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const quantity = () =>
      host.shadowRoot!.querySelector('.c_MiniCart__quantity')!.textContent;
    return { fixture, host, quantity };
  }

  it('shows no badge for an empty cart', () => {
    expect(render().quantity()).toBe('');
  });

  it('shows the total quantity from the cart store', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, 'AU-03-RD_2|CL-01-GR_1');
    expect(render().quantity()).toBe('3');
  });

  it('pulses briefly when the quantity goes up, not when it goes down', () => {
    vi.useFakeTimers({
      toFake: ['setTimeout', 'requestAnimationFrame', 'cancelAnimationFrame'],
    });
    const { fixture, host, quantity } = render();
    const cart = TestBed.inject(CartStore);

    cart.add('AU-03-RD');
    fixture.detectChanges();
    expect(quantity()).toBe('1');
    // The class is re-applied two frames later so the CSS animation restarts.
    vi.advanceTimersToNextFrame();
    vi.advanceTimersToNextFrame();
    fixture.detectChanges();
    expect(host.classList).toContain('c_MiniCart--highlight');

    vi.advanceTimersByTime(600);
    fixture.detectChanges();
    expect(host.classList).not.toContain('c_MiniCart--highlight');

    cart.remove('AU-03-RD');
    fixture.detectChanges();
    vi.advanceTimersByTime(600);
    fixture.detectChanges();
    expect(host.classList).not.toContain('c_MiniCart--highlight');
  });
});
