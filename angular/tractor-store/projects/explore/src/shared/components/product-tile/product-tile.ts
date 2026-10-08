import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NavigateToDirective } from '@tractor-store/shared';
import type { ProductModel } from '../../../core/data/contracts/models/product.model';
import { fmtPrice } from '../../utils/price';

@Component({
  selector: 'app-product-tile',
  imports: [NgOptimizedImage, NavigateToDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './product-tile.scss',
  template: `
    <li class="e_Product">
      <a
        class="e_Product_link"
        [appNavigateTo]="product().link.intent"
        [navPayload]="product().link.params ?? {}"
      >
        <img
          class="e_Product_image"
          [ngSrc]="product().image"
          ngSrcset="200w, 400w, 800w"
          sizes="300px"
          width="200"
          height="200"
          alt=""
        />
        <span class="e_Product_name">{{ product().name }}</span>
        <span class="e_Product_price">{{ price() }}</span>
      </a>
    </li>
  `,
})
export class ProductTileComponent {
  readonly product = input.required<ProductModel>();
  readonly price = computed(() => fmtPrice(this.product().startPrice));
}
