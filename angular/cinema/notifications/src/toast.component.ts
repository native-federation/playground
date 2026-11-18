import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { bus } from '@softarc/native-federation-communication';
import type { NotifyMessage } from './contracts';

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
    // replay: false: a message sent before the toast loaded is stale (ADR-14).
    const stop = bus.on('notify:show', (notification) => this.show(notification), {
      replay: false,
    });
    inject(DestroyRef).onDestroy(() => {
      stop();
      clearTimeout(this.timer);
    });
  }

  private show({ message }: NotifyMessage): void {
    this.message.set(message);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.message.set(null), visibleMs);
  }
}
