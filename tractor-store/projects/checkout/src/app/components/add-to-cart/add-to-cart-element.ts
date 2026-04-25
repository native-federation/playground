import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AddToCartComponent } from './add-to-cart';

// Custom-element entrypoint for AddToCartComponent. The inner component has a
// required `sku` input, but @angular/elements runs the first CD before dynamic
// attribute bindings are applied, so a required input on the boundary always
// trips NG0950. This wrapper accepts an optional sku and only mounts the inner
// component once a value has arrived.
@Component({
  selector: 'app-add-to-cart-element',
  imports: [AddToCartComponent],
  template: `
    @if (sku(); as s) {
      <app-add-to-cart [sku]="s" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class AddToCartElement {
  readonly sku = input<string>();
}
