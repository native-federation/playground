import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NavigateToDirective, NavTarget } from '@internal/events';

export interface FilterItem {
  link: NavTarget;
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-filter',
  imports: [NavigateToDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './filter.scss',
  template: `
    <div class="e_Filter">
      Filter:
      <ul>
        @for (f of filters(); track f.name) {
          @if (f.active) {
            <li class="e_Filter__filter--active">{{ f.name }}</li>
          } @else {
            <li><a [navigateTo]="f.link.intent" [navParams]="f.link.params ?? {}">{{ f.name }}</a></li>
          }
        }
      </ul>
    </div>
  `,
})
export class FilterComponent {
  readonly filters = input.required<FilterItem[]>();
}
