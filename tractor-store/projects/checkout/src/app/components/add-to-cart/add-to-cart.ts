import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@tractor-store/ui';
import { findVariant } from '../../data/database';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-boundary': 'checkout' },
})
export class AddToCartComponent {
  private readonly cart = inject(CartService);

  readonly sku = input.required<string>();

  readonly variant = computed(() => findVariant(this.sku()));
  readonly outOfStock = computed(() => (this.variant()?.inventory ?? 0) === 0);
  readonly confirmed = signal(false);

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.outOfStock()) return;
    this.cart.add(this.sku());
    this.confirmed.set(true);
  }
}
