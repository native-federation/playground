import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  linkedSignal,
  viewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { BOOKING_REF } from './booking-ref';
import { bus } from '@softarc/native-federation-communication';
import type { RouteParams } from './contracts';

const ticketPrice = 12;

// Deep links may carry anything: an unparsable value is an empty checkout
// (see docs/architecture.md § Intents).
const parseSeats = (seats = ''): readonly string[] => {
  const parts = seats.split(',');
  return seats && parts.every((seat) => /^[A-Z][0-9]+$/.test(seat)) ? parts : [];
};

@Component({
  selector: 'app-checkout',
  imports: [MatCard, MatButton, MatChipSet, MatChip, MatDivider],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  readonly routeParams = input<RouteParams>({});

  private readonly newBookingRef = inject(BOOKING_REF);
  private readonly injector = inject(Injector);
  private readonly heading = viewChild<ElementRef<HTMLElement>>('confirmedHeading');

  protected readonly screeningId = computed(() => this.routeParams()['screeningId'] ?? '');
  protected readonly seats = computed(() => parseSeats(this.routeParams()['seats']));
  protected readonly total = computed(() => this.seats().length * ticketPrice);
  private readonly ticketsText = computed(() => {
    const count = this.seats().length;
    return count === 1 ? '1 ticket' : `${count} tickets`;
  });
  protected readonly lineText = computed(() => `${this.ticketsText()} × €${ticketPrice}`);
  protected readonly summary = computed(() =>
    [
      `Screening ${this.screeningId()}`,
      `Seats ${this.seats().join(', ')}`,
      this.ticketsText(),
      `€${this.total()}`,
    ].join(' · '),
  );
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
    // retain: false: a remote that loads later must not count this booking (see docs/decisions.md ADR-05).
    bus.emit(
      'booking:confirmed',
      { bookingRef, ticketCount: this.seats().length },
      { retain: false },
    );
    // The Confirm button is gone after this render; move focus to the result instead of <body>.
    afterNextRender(() => this.heading()?.nativeElement.focus(), { injector: this.injector });
  }
}
