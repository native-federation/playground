import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface FilterItem {
  url: string;
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-filter',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './filter.scss',
  template: `
    <div class="e_Filter">
      Filter:
      <ul>
        @for (f of filters(); track f.url) {
          @if (f.active) {
            <li class="e_Filter__filter--active">{{ f.name }}</li>
          } @else {
            <li><a [routerLink]="f.url">{{ f.name }}</a></li>
          }
        }
      </ul>
    </div>
  `,
})
export class FilterComponent {
  readonly filters = input.required<FilterItem[]>();
}
