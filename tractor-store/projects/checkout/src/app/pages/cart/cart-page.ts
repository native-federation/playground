import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  inject,
} from '@angular/core';
import { ButtonComponent } from '@tractor-store/ui';
import { CartService } from '../../services/cart.service';
import { findVariant } from '../../data/database';
import { LineItemComponent, LineItemView } from '../../components/line-item/line-item';

@Component({
  selector: 'app-cart-page',
  imports: [ButtonComponent, LineItemComponent],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'checkout' },
})
export class CartPage {
  private readonly cart = inject(CartService);

  readonly lineItems = computed<LineItemView[]>(() => {
    return this.cart
      .lineItems()
      .reduce<LineItemView[]>((acc, { sku, quantity }) => {
        const variant = findVariant(sku);
        if (variant) {
          acc.push({
            id: variant.id,
            name: variant.name,
            sku: variant.sku,
            image: variant.image,
            quantity,
            total: variant.price * quantity,
          });
        }
        return acc;
      }, []);
  });

  readonly total = computed(() =>
    this.lineItems().reduce((sum, item) => sum + item.total, 0),
  );

  readonly skusCsv = computed(() =>
    this.lineItems()
      .map((i) => i.sku)
      .join(','),
  );
}
