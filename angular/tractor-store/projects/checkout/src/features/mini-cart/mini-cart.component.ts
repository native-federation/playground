import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NavigateToDirective } from '@internal/navigation';
import { CartStore } from '../../core/data/store/cart-store';

@Component({
  selector: 'app-mini-cart',
  imports: [NavigateToDirective],
  templateUrl: './mini-cart.component.html',
  styleUrl: './mini-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  host: {
    'data-boundary': 'checkout',
    class: 'c_MiniCart',
    '[class.c_MiniCart--highlight]': 'highlight()',
  },
})
export class MiniCartComponent {
  private readonly cart = inject(CartStore);
  readonly quantity = this.cart.totalQuantity;
  readonly highlight = signal(false);
  private lastQuantity: number | null = null;

  constructor() {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let rafId = 0;
    effect((onCleanup) => {
      const q = this.quantity();
      const prev = this.lastQuantity;
      this.lastQuantity = q;
      if (prev !== null && q > prev) {
        // Force CSS animation restart even when adds land inside the 600ms
        // window: drop the class, wait two frames so the browser paints
        // without it, then re-apply.
        this.highlight.set(false);
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          rafId = requestAnimationFrame(() => this.highlight.set(true));
        });
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => this.highlight.set(false), 600);
      }
      onCleanup(() => {
        if (timer) clearTimeout(timer);
        cancelAnimationFrame(rafId);
      });
    });
  }
}
