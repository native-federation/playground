import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { bus } from '@softarc/native-federation-communication';
import type { SeatHold } from './contracts';
import { formatSeats } from './seats-param';
import { NavIntentDirective } from './shared/nav-intent.directive';
import { priceLine, totalPrice } from './ticket-price';

// ADR-16
@Component({
  selector: 'app-booking-summary',
  imports: [MatButton, MatChipSet, MatChip, NavIntentDirective],
  templateUrl: './booking-summary.component.html',
  styleUrl: './booking-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingSummaryComponent {
  // Set by seating's page as the screening-id attribute.
  readonly screeningId = input('');

  private readonly hold = signal<SeatHold | undefined>(undefined);
  // The retained hold may belong to a screening seating showed earlier.
  protected readonly seats = computed(() => {
    const hold = this.hold();
    return hold?.screeningId === this.screeningId() ? hold.seats : [];
  });
  protected readonly seatsParam = computed(() => formatSeats(this.seats()));
  protected readonly statusText = computed(() => {
    const count = this.seats().length;
    return count ? `${priceLine(count)} = €${totalPrice(count)}` : 'Pick one or more free seats.';
  });

  constructor() {
    inject(DestroyRef).onDestroy(bus.on('seating:hold', (hold) => this.hold.set(hold)));
  }
}
