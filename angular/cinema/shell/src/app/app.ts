import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { NavIntentDirective } from '../shared/nav-intent.directive';
import { RemoteFragment } from '../shared/remote-fragment';
import { EventLogPanel } from '../event-log/event-log-panel';
import { RemoteSwitcher } from '../remote-switcher/remote-switcher';
import { TeamsToggle } from '../team-overlay/teams-toggle';
import { CONTRIBUTIONS, menuEntries } from './contributions';
import { DevDock } from './dev-dock';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbar,
    MatButton,
    NavIntentDirective,
    RemoteFragment,
    RemoteSwitcher,
    EventLogPanel,
    TeamsToggle,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'dock.close()' },
})
export class App {
  protected readonly dock = inject(DevDock);
  private readonly router = inject(Router);
  private readonly contributions = inject(CONTRIBUTIONS);
  protected readonly menu = menuEntries(this.contributions);
  private readonly section = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url.split(/[/?#]/)[1]),
    ),
    { initialValue: '' },
  );

  // first URL segment = section; routes are basePath/'' (see navigation.ts toRoutes)
  protected isCurrent(basePath: string): boolean {
    return basePath === this.section();
  }
}
