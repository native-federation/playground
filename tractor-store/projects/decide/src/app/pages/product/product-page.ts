import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  inject,
  input,
} from '@angular/core';
import { VariantOption } from '../../components/variant-option/variant-option';
import { DecideDataService } from '../../services/decide-data.service';
import { src, srcset } from '../../utils/image';

@Component({
  selector: 'app-product-page',
  imports: [VariantOption],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    'data-boundary-page': 'decide',
  },
})
export class ProductPage {
  private readonly data = inject(DecideDataService);

  readonly id = input.required<string>();
  readonly sku = input<string>();

  readonly product = computed(() => this.data.getProduct(this.id()));

  readonly variants = computed(() => this.product()?.variants ?? []);

  readonly highlights = computed(() => this.product()?.highlights ?? []);

  readonly selectedVariant = computed(() => {
    const variants = this.variants();
    if (variants.length === 0) return undefined;
    const skuParam = this.sku();
    return variants.find((v) => v.sku === skuParam) ?? variants[0];
  });

  readonly selectedSku = computed(() => this.selectedVariant()?.sku ?? '');

  readonly productImage = computed(() => {
    const variant = this.selectedVariant();
    if (!variant) return '';
    return src(variant.image, 400);
  });

  readonly productSrcset = computed(() => {
    const variant = this.selectedVariant();
    if (!variant) return '';
    return srcset(variant.image, [400, 800]);
  });

  readonly productAlt = computed(() => {
    const product = this.product();
    const variant = this.selectedVariant();
    if (!product || !variant) return '';
    return `${product.name} - ${variant.name}`;
  });

  isSelected(sku: string): boolean {
    return this.selectedVariant()?.sku === sku;
  }
}
