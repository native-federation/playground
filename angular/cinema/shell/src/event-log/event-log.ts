import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { bus, type Envelope } from '@softarc/native-federation-communication';

export interface LoggedEvent {
  readonly id: number;
  readonly at: number;
  readonly channel: string;
  readonly kind: 'state' | 'command';
  readonly value: string;
  // The value on one line, for the collapsed row.
  readonly preview: string;
}

const LIMIT = 200;

// Every emit on the page's bus, from the shell and every remote, newest first.
@Injectable({ providedIn: 'root' })
export class EventLog {
  private readonly log = signal<readonly LoggedEvent[]>([]);
  readonly events = this.log.asReadonly();
  private nextId = 0;

  constructor() {
    // A tap sees every channel; replay() adds what was retained before it opened (e.g. nav:intents).
    const tap = bus.tap?.('shell:event-log', (envelope) => this.add(envelope));
    tap?.replay();
    inject(DestroyRef).onDestroy(() => tap?.close());
  }

  clear(): void {
    this.log.set([]);
  }

  private add({ channel, value, retain }: Envelope): void {
    const event: LoggedEvent = {
      id: this.nextId++,
      at: Date.now(),
      channel,
      kind: retain ? 'state' : 'command',
      value: stringify(value, 2),
      preview: stringify(value),
    };
    this.log.update((events) => [event, ...events].slice(0, LIMIT));
  }
}

// Stringified on arrival, so a value mutated later still shows what was sent.
const stringify = (value: unknown, indent?: number): string => {
  try {
    return JSON.stringify(value, null, indent) ?? String(value);
  } catch {
    return String(value);
  }
};
