import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EventLog } from './event-log';

@Component({
  selector: 'app-event-log-panel',
  imports: [CdkDrag, CdkDragHandle, DatePipe, MatButton],
  templateUrl: './event-log-panel.html',
  styles: `
    :host {
      position: fixed;
      right: 16px;
      bottom: 16px;
      z-index: 1000;
    }
    aside {
      position: absolute;
      right: 0;
      bottom: 48px;
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 8px;
      width: min(440px, calc(100vw - 32px));
      max-height: min(560px, calc(100vh - 96px));
      padding: 12px 16px;
      box-sizing: border-box;
      border-radius: 16px;
      background: var(--mat-sys-surface-container-high);
      box-shadow: var(--mat-sys-level3);
    }
    .bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: move;
    }
    h2 {
      margin: 0;
      font: var(--mat-sys-title-small);
    }
    ol {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: auto;
    }
    li {
      padding: 8px 0;
      border-top: 1px solid var(--mat-sys-outline-variant);
    }
    .meta {
      display: flex;
      gap: 8px;
      align-items: baseline;
      font: var(--mat-sys-body-small);
      color: var(--mat-sys-on-surface-variant);
    }
    .channel {
      font: var(--mat-sys-label-large);
      color: var(--mat-sys-on-surface);
    }
    pre {
      margin: 4px 0 0;
      max-height: 160px;
      overflow: auto;
      font-size: 12px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .empty {
      margin: 0;
      font: var(--mat-sys-body-small);
      color: var(--mat-sys-on-surface-variant);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventLogPanel {
  protected readonly log = inject(EventLog);
  protected readonly open = signal(false);
}
