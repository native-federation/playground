import { TestBed } from '@angular/core/testing';
import type { FederationManifest } from '@softarc/native-federation-orchestrator';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { applyRemoteSelection, SELECTION_KEY } from './remote-selection';
import { RemoteSwitcher } from './remote-switcher';

const manifest: FederationManifest = {
  '@cinema/programme': 'http://localhost:4301/remoteEntry.json',
  '@cinema/film': 'http://localhost:4302/remoteEntry.json',
  '@cinema/seating': 'http://localhost:4303/remoteEntry.json',
};

const render = () => {
  const fixture = TestBed.createComponent(RemoteSwitcher);
  fixture.detectChanges();
  const root = fixture.nativeElement as HTMLElement;
  const click = (el: Element | null) => {
    (el as HTMLElement).click();
    fixture.detectChanges();
  };
  const launcher = () => root.querySelector('button[aria-controls]')!;
  const applyButton = () => root.querySelector<HTMLButtonElement>('aside button')!;
  const checkbox = (name: string) =>
    [...root.querySelectorAll('mat-checkbox')].find((c) => c.textContent?.includes(name))!;
  return { root, click, launcher, applyButton, checkbox };
};

beforeEach(() => {
  sessionStorage.clear();
  // Module state persists within this file, so set it per test as main.ts would.
  applyRemoteSelection(manifest, ['@cinema/programme', '@cinema/seating']);
});

describe('RemoteSwitcher', () => {
  it('starts closed and opens with one checkbox per remote, loaded ones ticked', () => {
    const { root, click, launcher } = render();
    expect(launcher().textContent).toContain('Remotes 2/3');
    expect(launcher().getAttribute('aria-expanded')).toBe('false');
    expect(root.querySelector('aside')).toBeNull();

    click(launcher());

    expect(launcher().getAttribute('aria-expanded')).toBe('true');
    const ticked = [...root.querySelectorAll<HTMLInputElement>('input[type=checkbox]')].map(
      (input) => input.checked,
    );
    expect(ticked).toEqual([true, false, true]);
  });

  it('disables Apply when nothing changed or nothing is ticked', () => {
    const { click, launcher, applyButton, checkbox } = render();
    click(launcher());
    expect(applyButton().disabled).toBe(true);

    click(checkbox('@cinema/programme').querySelector('input'));
    expect(applyButton().disabled).toBe(false);

    click(checkbox('@cinema/seating').querySelector('input'));
    expect(applyButton().disabled).toBe(true);
  });

  it('saves the selection and reloads on Apply', () => {
    const reload = vi.fn();
    vi.stubGlobal('location', { reload });
    const { click, launcher, applyButton, checkbox } = render();
    click(launcher());

    click(checkbox('@cinema/film').querySelector('input'));
    click(applyButton());

    expect(JSON.parse(sessionStorage.getItem(SELECTION_KEY)!)).toEqual([
      '@cinema/programme',
      '@cinema/seating',
      '@cinema/film',
    ]);
    expect(reload).toHaveBeenCalledOnce();
  });
});
