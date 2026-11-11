import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PointsStore, pointsPerTicket } from './points.store';

@Component({
  selector: 'app-points-page',
  imports: [MatCardModule],
  templateUrl: './points-page.component.html',
  styleUrl: './points-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PointsPageComponent {
  protected readonly points = inject(PointsStore).points;
  protected readonly pointsPerTicket = pointsPerTicket;
}
