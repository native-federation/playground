import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface FilterItem {
  url: string;
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-filter',
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
            <li><a [href]="f.url">{{ f.name }}</a></li>
          }
        }
      </ul>
    </div>
  `,
})
export class FilterComponent {
  readonly filters = input.required<FilterItem[]>();
}
