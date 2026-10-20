import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { CartStore } from '../../data/cart-store';
import { VariantService } from '../../data/variant.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import {
  LineItemComponent,
  type LineItemView,
} from '../../shared/components/line-item/line-item.component';
import { RemoteElementDirective } from '../../shared/remote-element';

@Component({
  selector: 'app-cart',
  imports: [RemoteElementDirective, ButtonComponent, LineItemComponent],
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'checkout' },
})
export class CartPage {
  private readonly cart = inject(CartStore);

  private readonly skus = computed(() =>
    this.cart.lineItems().map((i) => i.sku),
  );
  private readonly variants = inject(VariantService).getBySkus(this.skus).value;

  protected readonly lineItems = computed<LineItemView[]>(() => {
    const bySku = new Map((this.variants() ?? []).map((v) => [v.sku, v]));
    return this.cart.lineItems().flatMap(({ sku, quantity }) => {
      const variant = bySku.get(sku);
      if (!variant) return [];
      return [
        {
          id: variant.id,
          name: variant.name,
          sku: variant.sku,
          image: variant.image,
          quantity,
          total: variant.price * quantity,
        },
      ];
    });
  });

  protected readonly total = computed(() =>
    this.lineItems().reduce((sum, item) => sum + item.total, 0),
  );

  protected readonly skusCsv = computed(() =>
    this.lineItems()
      .map((i) => i.sku)
      .join(','),
  );
}
