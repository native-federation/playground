import { Injectable, signal } from '@angular/core';

export type DevPanel = 'events' | 'remotes';

// The demo-tool panels share one dock, so only one is open at a time.
@Injectable({ providedIn: 'root' })
export class DevDock {
  private readonly current = signal<DevPanel | null>(null);
  readonly open = this.current.asReadonly();

  toggle(panel: DevPanel): void {
    this.current.update((open) => (open === panel ? null : panel));
  }

  close(): void {
    this.current.set(null);
  }
}
