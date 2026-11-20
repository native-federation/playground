import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DevDock } from '../app/dev-dock';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { availableRemotes, loadedRemotes, sameNames, saveSelection } from './remote-selection';

@Component({
  selector: 'app-remote-switcher',
  imports: [CdkDrag, CdkDragHandle, MatButton, MatCheckbox],
  templateUrl: './remote-switcher.html',
  styles: `
    aside {
      position: absolute;
      left: 0;
      bottom: 48px;
      display: grid;
      gap: 8px;
      min-width: 240px;
      padding: 12px 16px;
      border-radius: 16px;
      background: var(--mat-sys-surface-container-high);
      box-shadow: var(--mat-sys-level3);
    }
    h2 {
      margin: 0;
      cursor: move;
      font: var(--mat-sys-title-small);
    }
    fieldset {
      display: grid;
      margin: 0;
      padding: 0;
      border: 0;
    }
    .team-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-inline-end: 8px;
      border-radius: 50%;
    }
    legend {
      padding: 0;
      font: var(--mat-sys-body-small);
      color: var(--mat-sys-on-surface-variant);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteSwitcher {
  protected readonly remotes = availableRemotes();
  protected readonly loaded = loadedRemotes();
  private readonly dock = inject(DevDock);
  protected readonly open = computed(() => this.dock.open() === 'remotes');
  protected readonly draft = signal<readonly string[]>(this.loaded);
  protected readonly canApply = computed(
    () => this.draft().length > 0 && !sameNames(this.draft(), this.loaded),
  );

  // '@cinema/film' → the shell's --team-film; a remote without a colour gets no dot.
  protected teamColor(name: string): string {
    return `var(--team-${name.split('/').pop()}, transparent)`;
  }

  protected toggleOpen(): void {
    this.draft.set(this.loaded);
    this.dock.toggle('remotes');
  }

  protected toggle(name: string, checked: boolean): void {
    this.draft.update((names) => (checked ? [...names, name] : names.filter((n) => n !== name)));
  }

  protected apply(): void {
    saveSelection(this.draft());
    location.reload();
  }
}
