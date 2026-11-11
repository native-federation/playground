import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { screenings } from './screenings';
import { NavIntentDirective } from './shared/nav-intent.directive';

@Component({
  selector: 'app-programme-list',
  imports: [MatCard, MatCardContent, MatCardActions, MatButton, NavIntentDirective],
  templateUrl: './programme-list.component.html',
  styleUrl: './programme-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammeListComponent {
  protected readonly screenings = screenings;
}
