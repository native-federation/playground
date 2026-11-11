import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatChip, MatChipAvatar, MatChipSet } from '@angular/material/chips';
import { PointsStore } from './points.store';

@Component({
  selector: 'app-badge',
  imports: [MatChipSet, MatChip, MatChipAvatar],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  protected readonly points = inject(PointsStore).points;
  protected readonly earned = computed(() => this.points() > 0);
}
