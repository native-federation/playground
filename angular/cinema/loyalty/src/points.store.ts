import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { bus } from '@softarc/native-federation-communication';

export const pointsPerTicket = 10;

@Injectable({ providedIn: 'root' })
export class PointsStore {
  private readonly total = signal(0);
  readonly points = this.total.asReadonly();

  constructor() {
    // replay: false: a booking confirmed before loyalty loaded is not counted
    // (see docs/decisions.md ADR-05).
    const stop = bus.on(
      'booking:confirmed',
      ({ ticketCount }) => this.total.update((points) => points + ticketCount * pointsPerTicket),
      { replay: false },
    );
    inject(DestroyRef).onDestroy(stop);
  }
}
