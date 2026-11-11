import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

const profile = { name: 'Sam Moviegoer', email: 'sam@example.com', memberSince: '2024' };

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatListModule],
  templateUrl: './profile.component.html',
  styles: 'mat-card { max-width: 40rem; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  protected readonly profile = profile;
}
