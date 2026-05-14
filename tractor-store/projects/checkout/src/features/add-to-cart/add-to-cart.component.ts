import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { NavigateToDirective } from '@internal/events';
import { ButtonComponent } from '@internal/ui';
import { VariantHttp } from '../../core/data/http/variant-http';
import { CartStore } from '../../core/data/store/cart-store';

@Component({
  selector: 'app-add-to-cart',
  imports: [ButtonComponent, NavigateToDirective],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-boundary': 'checkout' },
})
export class AddToCartComponent {
  private readonly cart = inject(CartStore);
  private readonly variantHttp = inject(VariantHttp);

  readonly sku = input.required<string>();

  private readonly variantResource = this.variantHttp.getBySku(this.sku);
  readonly variant = this.variantResource.value;
  readonly isLoading = this.variantResource.isLoading;
  readonly outOfStock = computed(() => (this.variant()?.inventory ?? 0) === 0);
  readonly confirmed = signal(false);

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.outOfStock()) return;
    this.cart.add(this.sku());
    this.confirmed.set(true);
  }
}
