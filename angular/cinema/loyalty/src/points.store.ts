import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import type { Events } from './contracts';

export const pointsPerTicket = 10;

@Injectable({ providedIn: 'root' })
export class PointsStore {
  private readonly total = signal(0);
  readonly points = this.total.asReadonly();

  constructor() {
    // replay 0: a booking confirmed before loyalty loaded is not counted
    // (see docs/decisions.md ADR-05).
    const stop = window.__NF_REGISTRY__!.on<Events['booking:confirmed']>(
      'booking:confirmed',
      ({ data }) => this.total.update((points) => points + data.ticketCount * pointsPerTicket),
      { replay: 0 },
    );
    inject(DestroyRef).onDestroy(stop);
  }
}
