import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NavIntentDirective, type NavLink } from '../../nav-intent.directive';

export interface FilterItem {
  link: NavLink;
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-filter',
  imports: [NavIntentDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './filter.component.scss',
  template: `
    <div class="e_Filter">
      Filter:
      <ul>
        @for (f of filters(); track f.name) {
          @if (f.active) {
            <li class="e_Filter__filter--active">{{ f.name }}</li>
          } @else {
            <li>
              <a
                [navIntent]="f.link.intent"
                [navPayload]="f.link.params ?? {}"
                >{{ f.name }}</a
              >
            </li>
          }
        }
      </ul>
    </div>
  `,
})
export class FilterComponent {
  readonly filters = input.required<FilterItem[]>();
}
