import { CdkDrag } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { availableRemotes, loadedRemotes, sameNames, saveSelection } from './remote-selection';

@Component({
  selector: 'app-remote-switcher',
  imports: [CdkDrag, MatButton, MatCheckbox],
  templateUrl: './remote-switcher.html',
  styles: `
    :host {
      position: fixed;
      left: 16px;
      bottom: 16px;
      z-index: 1000;
    }
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
      cursor: move;
    }
    h2 {
      margin: 0;
      font: var(--mat-sys-title-small);
    }
    fieldset {
      display: grid;
      margin: 0;
      padding: 0;
      border: 0;
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
  protected readonly open = signal(false);
  protected readonly draft = signal<readonly string[]>(this.loaded);
  protected readonly canApply = computed(
    () => this.draft().length > 0 && !sameNames(this.draft(), this.loaded),
  );

  protected toggleOpen(): void {
    this.draft.set(this.loaded);
    this.open.update((isOpen) => !isOpen);
  }

  protected toggle(name: string, checked: boolean): void {
    this.draft.update((names) => (checked ? [...names, name] : names.filter((n) => n !== name)));
  }

  protected apply(): void {
    saveSelection(this.draft());
    location.reload();
  }
}
