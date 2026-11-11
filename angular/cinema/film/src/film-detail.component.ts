import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import type { RouteParams } from './contracts';
import { films } from './films';
import { NavIntentDirective } from './shared/nav-intent.directive';

@Component({
  selector: 'app-film-detail',
  imports: [MatCardModule, MatButton, NavIntentDirective],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailComponent {
  readonly routeParams = input<RouteParams>({});

  protected readonly film = computed(() =>
    films.find((film) => film.filmId === this.routeParams()['filmId']),
  );
}
