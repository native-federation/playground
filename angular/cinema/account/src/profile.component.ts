import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemTitle,
} from '@angular/material/list';

const profile = { name: 'Sam Moviegoer', email: 'sam@example.com', memberSince: '2024' };

export const initials = (name: string) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2);

@Component({
  selector: 'app-profile',
  imports: [MatCard, MatList, MatListItem, MatListItemIcon, MatListItemTitle, MatListItemLine],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  protected readonly profile = profile;
  protected readonly initials = initials(profile.name);
}
