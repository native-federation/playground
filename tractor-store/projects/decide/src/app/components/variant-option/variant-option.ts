import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-variant-option',
  imports: [RouterLink],
  template: `
    <li class="d_VariantOption" [style.--variant-color]="color()">
      <i class="d_VariantOption__color"></i>
      @if (selected()) {
        <strong>{{ name() }}</strong>
      } @else {
        <a [routerLink]="[]" [queryParams]="{ sku: sku() }">{{ name() }}</a>
      }
    </li>
  `,
  styleUrl: './variant-option.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantOption {
  readonly sku = input.required<string>();
  readonly name = input.required<string>();
  readonly color = input.required<string>();
  readonly selected = input<boolean>(false);
}
