import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { CartStore } from '../../data/cart-store';
import { VariantService } from '../../data/variant.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { NavIntentDirective } from '../../shared/nav-intent.directive';

@Component({
  selector: 'app-add-to-cart',
  imports: [ButtonComponent, NavIntentDirective],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  host: { 'data-boundary': 'checkout' },
})
export class AddToCartComponent {
  private readonly cart = inject(CartStore);

  // Optional: @angular/elements runs the first change detection before the sku attribute arrives.
  readonly sku = input<string>();

  private readonly variantResource = inject(VariantService).getBySku(this.sku);
  protected readonly variant = this.variantResource.value;
  protected readonly isLoading = this.variantResource.isLoading;
  protected readonly outOfStock = computed(
    () => (this.variant()?.inventory ?? 0) === 0,
  );
  protected readonly confirmed = signal(false);

  protected add(sku: string): void {
    this.cart.add(sku);
    this.confirmed.set(true);
  }
}
