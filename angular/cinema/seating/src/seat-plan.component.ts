import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import type { Events, RouteParams } from './contracts';
import { allSeats, numbers, rows, takenSeats } from './seats';

@Component({
  selector: 'app-seat-plan',
  imports: [MatButton],
  templateUrl: './seat-plan.component.html',
  styleUrl: './seat-plan.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatPlanComponent {
  readonly routeParams = input<RouteParams>({});

  protected readonly rows = rows;
  protected readonly numbers = numbers;
  protected readonly screeningId = computed(() => this.routeParams()['screeningId'] ?? '');
  protected readonly taken = computed(() => takenSeats(this.screeningId()));
  // A new screening starts with an empty hold.
  protected readonly held = linkedSignal<string, readonly string[]>({
    source: this.screeningId,
    computation: () => [],
  });
  protected readonly seatsParam = computed(() =>
    allSeats.filter((seat) => this.held().includes(seat)).join(','),
  );

  protected toggle(seat: string): void {
    this.held.update((held) =>
      held.includes(seat) ? held.filter((s) => s !== seat) : [...held, seat],
    );
  }

  protected continue(): void {
    window.__NF_REGISTRY__!.emit<Events['nav:navigate']>('nav:navigate', {
      id: 'booking.checkout',
      payload: { screeningId: this.screeningId(), seats: this.seatsParam() },
    });
  }
}
