import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NavIntentDirective } from './shared/nav-intent.directive';
import { TICKET_PRICE } from './ticket-price';

// Booking's call to action on another team's page: it knows the price and where a booking starts.
@Component({
  selector: 'app-booking-start',
  imports: [MatButton, NavIntentDirective],
  template: `
    <a matButton="tonal" navIntent="seating.plan" [navPayload]="{ screeningId: screeningId() }"
      >Book · €{{ price }} per seat</a
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingStartComponent {
  // Set by the host page as the screening-id attribute.
  readonly screeningId = input('');

  protected readonly price = TICKET_PRICE;
}
