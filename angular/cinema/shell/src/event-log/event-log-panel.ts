import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DevDock } from '../app/dev-dock';
import { EventLog } from './event-log';

@Component({
  selector: 'app-event-log-panel',
  imports: [CdkDrag, CdkDragHandle, DatePipe, MatButton],
  templateUrl: './event-log-panel.html',
  styleUrl: './event-log-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventLogPanel {
  protected readonly log = inject(EventLog);
  private readonly dock = inject(DevDock);
  protected readonly open = computed(() => this.dock.open() === 'events');
  private readonly expanded = signal<ReadonlySet<number>>(new Set());
  // Rows from before the panel opened don't flash; only ones that arrive while you watch.
  protected readonly firstFreshId = signal(0);
  protected readonly allExpanded = computed(() => {
    const events = this.log.events();
    return events.length > 0 && events.every((event) => this.expanded().has(event.id));
  });

  protected toggleOpen(): void {
    this.firstFreshId.set((this.log.events()[0]?.id ?? -1) + 1);
    this.dock.toggle('events');
  }

  protected isExpanded(id: number): boolean {
    return this.expanded().has(id);
  }

  protected toggle(id: number): void {
    this.expanded.update((ids) => {
      const next = new Set(ids);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  }

  protected toggleAll(): void {
    this.expanded.set(
      this.allExpanded() ? new Set() : new Set(this.log.events().map((event) => event.id)),
    );
  }

  protected clear(): void {
    this.log.clear();
    this.expanded.set(new Set());
  }
}
