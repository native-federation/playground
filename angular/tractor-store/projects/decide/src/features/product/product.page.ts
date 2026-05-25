import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { param, RouteParams } from '@internal/url';
import { ProductHttp } from '../../core/data/http/product-http';
import { VariantOption } from '../../shared/components/variant-option/variant-option';
import { ResourceService } from '../../shared/utils/resource.service';
import { LOADER } from '../../core/remote-loader';

@Component({
  selector: 'app-product',
  imports: [VariantOption],
  templateUrl: './product.page.html',
  styleUrl: './product.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    'data-boundary-page': 'decide',
  },
})
export class ProductPage {
  private readonly productHttp = inject(ProductHttp);
  private readonly image = inject(ResourceService);
  private loader = inject(LOADER);

  constructor() {
    void this.loader('@tractor-store/explore', 'mfe-header');
    void this.loader('@tractor-store/explore', 'mfe-footer');
    void this.loader('@tractor-store/explore', 'mfe-recommendations');
    void this.loader('@tractor-store/checkout', 'mfe-add-to-cart');
  }

  readonly routeParams = input<RouteParams>({});

  readonly id = computed(() => param(this.routeParams(), 'id'));
  readonly sku = computed(() => param(this.routeParams(), 'sku'));

  private readonly productResource = this.productHttp.getById(this.id);
  readonly product = this.productResource.value;
  readonly isLoading = this.productResource.isLoading;

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
    return this.image.imgSrc(variant.image, 400);
  });

  readonly productSrcset = computed(() => {
    const variant = this.selectedVariant();
    if (!variant) return '';
    return this.image.imgSrcset(variant.image, [400, 800]);
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
