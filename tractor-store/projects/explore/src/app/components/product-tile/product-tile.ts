import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Product } from '../../services/explore-data.service';
import { fmtPrice, imgSrc, imgSrcset } from '../../utils/image';

@Component({
  selector: 'app-product-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './product-tile.scss',
  template: `
    <li class="e_Product">
      <a class="e_Product_link" [href]="product().url">
        <img
          class="e_Product_image"
          [src]="imgSrc()"
          [srcset]="imgSrcset()"
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
  readonly product = input.required<Product>();
  readonly imgSrc = computed(() => imgSrc(this.product().image, 200));
  readonly imgSrcset = computed(() =>
    imgSrcset(this.product().image, [200, 400, 800]),
  );
  readonly price = computed(() => fmtPrice(this.product().startPrice));
}
