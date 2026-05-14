import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NavigateToDirective } from '@internal/events';

@Component({
  selector: 'app-variant-option',
  imports: [NavigateToDirective],
  template: `
    <li class="d_VariantOption" [style.--variant-color]="color()">
      <i class="d_VariantOption__color"></i>
      @if (selected()) {
        <strong>{{ name() }}</strong>
      } @else {
        <a [navigateTo]="'decide.product'" [navParams]="linkParams()">{{ name() }}</a>
      }
    </li>
  `,
  styleUrl: './variant-option.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantOption {
  readonly id = input.required<string>();
  readonly sku = input.required<string>();
  readonly name = input.required<string>();
  readonly color = input.required<string>();
  readonly selected = input<boolean>(false);

  readonly linkParams = computed(() => ({ id: this.id(), sku: this.sku() }));
}
