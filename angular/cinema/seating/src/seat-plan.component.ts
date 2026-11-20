import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  input,
  linkedSignal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { bus } from '@softarc/native-federation-communication';
import type { RouteParams } from './contracts';
import { allSeats, numbers, rows, takenSeats } from './seats';

@Component({
  selector: 'app-seat-plan',
  imports: [MatButton, MatCard],
  // mfe-booking-summary belongs to booking; the shell defines it (ADR-15).
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  private readonly sortedHeld = computed(() => allSeats.filter((seat) => this.held().includes(seat)));

  constructor() {
    // An effect, not toggle(): a screening change or revisit resets the hold too (ADR-16).
    effect(() =>
      bus.emit('seating:hold', { screeningId: this.screeningId(), seats: this.sortedHeld() }),
    );
  }

  protected toggle(seat: string): void {
    this.held.update((held) =>
      held.includes(seat) ? held.filter((s) => s !== seat) : [...held, seat],
    );
  }
}
