import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { screenings } from './screenings';

@Component({
  selector: 'app-programme-list',
  imports: [MatCard, MatCardContent, MatCardActions],
  // mfe-film-card and mfe-booking-start belong to other teams; the shell defines them (ADR-15).
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './programme-list.component.html',
  styleUrl: './programme-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammeListComponent {
  protected readonly screenings = screenings;
}
