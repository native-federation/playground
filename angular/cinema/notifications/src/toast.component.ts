import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { bus } from '@softarc/native-federation-communication';
import type { BookingConfirmed } from './contracts';

const visibleMs = 3000;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  protected readonly message = signal<string | null>(null);
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    // replay: false: a booking confirmed before the toast loaded is not shown
    // (see docs/decisions.md ADR-05).
    const stop = bus.on('booking:confirmed', (booking) => this.show(booking), {
      replay: false,
    });
    inject(DestroyRef).onDestroy(() => {
      stop();
      clearTimeout(this.timer);
    });
  }

  private show({ bookingRef }: BookingConfirmed): void {
    this.message.set(`Booking ${bookingRef} confirmed`);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.message.set(null), visibleMs);
  }
}
