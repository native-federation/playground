import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TEAMS_KEY, TeamsToggle } from './teams-toggle';

const render = async () => {
  const fixture = TestBed.createComponent(TeamsToggle);
  await fixture.whenStable();
  const button = (fixture.nativeElement as HTMLElement).querySelector('button')!;
  const click = async () => {
    button.click();
    await fixture.whenStable();
  };
  return { button, click };
};

const shown = () => document.documentElement.classList.contains('show-teams');

describe('TeamsToggle', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => document.documentElement.classList.remove('show-teams'));

  it('shows the teams by default', async () => {
    const { button } = await render();
    expect(shown()).toBe(true);
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('switches them off and remembers it', async () => {
    const { button, click } = await render();
    await click();
    expect(shown()).toBe(false);
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(localStorage.getItem(TEAMS_KEY)).toBe('off');
  });

  it('starts off when it was switched off before', async () => {
    localStorage.setItem(TEAMS_KEY, 'off');
    await render();
    expect(shown()).toBe(false);
  });
});
