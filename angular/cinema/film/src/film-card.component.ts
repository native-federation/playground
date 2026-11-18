import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { films } from './films';
import { PosterComponent } from './poster.component';
import { NavIntentDirective } from './shared/nav-intent.directive';

@Component({
  selector: 'app-film-card',
  imports: [NavIntentDirective, PosterComponent],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent {
  // Set by the host page as the film-id attribute.
  readonly filmId = input('');

  protected readonly film = computed(() => films.find((film) => film.filmId === this.filmId()));
}
