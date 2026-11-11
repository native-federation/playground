import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BOOKING_REF } from './booking-ref';
import type { Events, RouteParams } from './contracts';

const ticketPrice = 12;

// Deep links may carry anything: an unparsable value is an empty checkout
// (see docs/architecture.md § Intents).
const parseSeats = (seats = ''): readonly string[] => {
  const parts = seats.split(',');
  return seats && parts.every((seat) => /^[A-Z][0-9]+$/.test(seat)) ? parts : [];
};

@Component({
  selector: 'app-checkout',
  imports: [MatCardModule, MatButton],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  readonly routeParams = input<RouteParams>({});

  private readonly newBookingRef = inject(BOOKING_REF);

  protected readonly ticketPrice = ticketPrice;
  protected readonly screeningId = computed(() => this.routeParams()['screeningId'] ?? '');
  protected readonly seats = computed(() => parseSeats(this.routeParams()['seats']));
  protected readonly total = computed(() => this.seats().length * ticketPrice);
  private readonly hold = computed(
    () => `${this.screeningId()}/${this.routeParams()['seats'] ?? ''}`,
  );
  // A new hold starts unconfirmed; keyed on values, as the shell may re-set
  // equal params as a new object.
  protected readonly bookingRef = linkedSignal<string, string | null>({
    source: this.hold,
    computation: () => null,
  });

  protected confirm(): void {
    // Zoneless: the button only disappears on the next render, so a double-click lands twice.
    if (this.bookingRef()) return;
    const bookingRef = this.newBookingRef();
    this.bookingRef.set(bookingRef);
    window.__NF_REGISTRY__!.emit<Events['booking:confirmed']>('booking:confirmed', {
      bookingRef,
      ticketCount: this.seats().length,
    });
  }
}
