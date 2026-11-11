import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatList,
  MatListItem,
  MatListItemLine,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';
import { screenings } from './screenings';
import { NavIntentDirective } from './shared/nav-intent.directive';

@Component({
  selector: 'app-programme-list',
  imports: [
    MatList,
    MatListItem,
    MatListItemTitle,
    MatListItemLine,
    MatListItemMeta,
    MatButton,
    NavIntentDirective,
  ],
  templateUrl: './programme-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammeListComponent {
  protected readonly screenings = screenings;
}
