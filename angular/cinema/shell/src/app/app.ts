import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { NavIntentDirective } from '../shared/nav-intent.directive';
import { RemoteElementDirective } from '../shared/remote-element';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatButton,
    NavIntentDirective,
    RemoteElementDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly section = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url.split(/[/?#]/)[1]),
    ),
    { initialValue: '' },
  );

  // first URL segment = section; routes are basePath/'' (see navigation.ts toRoutes)
  protected isCurrent(intent: string): boolean {
    return intent.split('.')[0] === this.section();
  }
}
