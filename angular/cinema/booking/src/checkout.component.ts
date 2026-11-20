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
import { parseSeats } from './seats-param';
import { priceLine, ticketsText, totalPrice } from './ticket-price';

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
  protected readonly total = computed(() => totalPrice(this.seats().length));
  protected readonly lineText = computed(() => priceLine(this.seats().length));
  protected readonly summary = computed(() =>
    [
      `Screening ${this.screeningId()}`,
      `Seats ${this.seats().join(', ')}`,
      ticketsText(this.seats().length),
      `€${this.total()}`,
    ].join(' · '),
  );
  private readonly holdKey = computed(
    () => `${this.screeningId()}/${this.routeParams()['seats'] ?? ''}`,
  );
  // A new hold starts unconfirmed; keyed on values, as the shell may re-set
  // equal params as a new object.
  protected readonly bookingRef = linkedSignal<string, string | null>({
    source: this.holdKey,
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
