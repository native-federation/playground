import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import type { BookingConfirmed, Events } from './contracts';

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
    // replay 0: a booking confirmed before the toast loaded is not shown
    // (see docs/decisions.md ADR-05).
    const stop = window.__NF_REGISTRY__!.on<Events['booking:confirmed']>(
      'booking:confirmed',
      ({ data }) => this.show(data),
      { replay: 0 },
    );
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
