import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, pairwise } from 'rxjs';
import { CartStore } from '../../data/cart-store';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-mini-cart',
  imports: [ButtonComponent],
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
  protected readonly quantity = inject(CartStore).totalQuantity;
  protected readonly highlight = signal(false);

  private frame = 0;
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    toObservable(this.quantity)
      .pipe(
        pairwise(),
        filter(([previous, current]) => current > previous),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.pulse());
    inject(DestroyRef).onDestroy(() => {
      cancelAnimationFrame(this.frame);
      clearTimeout(this.timer);
    });
  }

  private pulse(): void {
    // Restart the CSS animation even when adds land within 600ms: drop the class,
    // wait two frames so the browser paints without it, then re-apply.
    this.highlight.set(false);
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      this.frame = requestAnimationFrame(() => this.highlight.set(true));
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.highlight.set(false), 600);
  }
}
