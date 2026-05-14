import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { NavigateToDirective } from '@internal/events';
import type { ProductModel } from '../../../core/data/contracts/models/product.model';
import { ResourceService } from '../../utils/resource.service';
import { fmtPrice } from '../../utils/price';

@Component({
  selector: 'app-product-tile',
  imports: [NavigateToDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './product-tile.scss',
  template: `
    <li class="e_Product">
      <a class="e_Product_link" [navigateTo]="product().link.intent" [navParams]="product().link.params ?? {}">
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
  private readonly image = inject(ResourceService);

  readonly product = input.required<ProductModel>();
  readonly imgSrc = computed(() => this.image.imgSrc(this.product().image, 200));
  readonly imgSrcset = computed(() =>
    this.image.imgSrcset(this.product().image, [200, 400, 800]),
  );
  readonly price = computed(() => fmtPrice(this.product().startPrice));
}
