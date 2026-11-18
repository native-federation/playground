import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Film } from './films';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrl: './poster.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.tertiary]': 'tint() === "tertiary"' },
})
export class PosterComponent {
  readonly poster = input.required<Film['poster']>();
  readonly tint = input<Film['tint']>('primary');
}
