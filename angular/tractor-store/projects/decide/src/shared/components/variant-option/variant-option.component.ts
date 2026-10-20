import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NavIntentDirective } from '../../nav-intent.directive';

@Component({
  selector: 'app-variant-option',
  imports: [NavIntentDirective],
  template: `
    <li class="d_VariantOption" [style.--variant-color]="color()">
      <i class="d_VariantOption__color"></i>
      @if (selected()) {
        <strong>{{ name() }}</strong>
      } @else {
        <a [navIntent]="'decide.product'" [navPayload]="linkPayload()">{{
          name()
        }}</a>
      }
    </li>
  `,
  styleUrl: './variant-option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantOptionComponent {
  readonly id = input.required<string>();
  readonly sku = input.required<string>();
  readonly name = input.required<string>();
  readonly color = input.required<string>();
  readonly selected = input(false);

  protected readonly linkPayload = computed(() => ({
    id: this.id(),
    sku: this.sku(),
  }));
}
