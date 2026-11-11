import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { PointsStore } from './points.store';

@Component({
  selector: 'app-badge',
  imports: [MatChipSet, MatChip],
  template: `
    <span aria-live="polite">
      <mat-chip-set>
        <mat-chip>{{ points() }} points</mat-chip>
      </mat-chip-set>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  protected readonly points = inject(PointsStore).points;
}
