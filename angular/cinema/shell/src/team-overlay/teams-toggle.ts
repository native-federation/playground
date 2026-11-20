import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

export const TEAMS_KEY = 'cinema:show-teams';

// Shows which team serves which part of the page; the styles are in styles.scss.
@Component({
  selector: 'app-teams-toggle',
  imports: [MatButton],
  template: `
    <button matButton="tonal" [attr.aria-pressed]="on()" (click)="on.set(!on())">Teams</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsToggle {
  protected readonly on = signal(readSetting());

  constructor() {
    const root = inject(DOCUMENT).documentElement;
    effect(() => {
      root.classList.toggle('show-teams', this.on());
      saveSetting(this.on());
    });
  }
}

// On unless switched off; storage can be blocked, which just means the default.
const readSetting = (): boolean => {
  try {
    return localStorage.getItem(TEAMS_KEY) !== 'off';
  } catch {
    return true;
  }
};

const saveSetting = (on: boolean): void => {
  try {
    localStorage.setItem(TEAMS_KEY, on ? 'on' : 'off');
  } catch {
    // Not remembered; the toggle still works for this visit.
  }
};
