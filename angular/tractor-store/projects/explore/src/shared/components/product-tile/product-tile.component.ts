import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { Product } from '../../../data/category';
import { NavIntentDirective } from '../../nav-intent.directive';

@Component({
  selector: 'app-product-tile',
  imports: [NgOptimizedImage, NavIntentDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './product-tile.component.scss',
  template: `
    <li class="e_Product">
      <a
        class="e_Product_link"
        [navIntent]="product().link.intent"
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
        <span class="e_Product_price">{{ product().startPrice }},00 Ø</span>
      </a>
    </li>
  `,
})
export class ProductTileComponent {
  readonly product = input.required<Product>();
}
