import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { initials, ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  const render = async () => {
    const fixture = TestBed.createComponent(ProfileComponent);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  };

  it('shows the name, the email and the member-since year', async () => {
    const el = await render();
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Account');
    // The name is the card's heading, not just somewhere in the text.
    expect(el.querySelector('h2')?.textContent?.trim()).toBe('Sam Moviegoer');
    expect(el.textContent).toContain('sam@example.com');
    expect(el.textContent).toContain('Member since');
    expect(el.textContent).toContain('2024');
  });

  it('shows the initials in a decorative avatar', async () => {
    const avatar = (await render()).querySelector('.avatar')!;
    expect(avatar.textContent?.trim()).toBe('SM');
    // the h2 already names the person
    expect(avatar.getAttribute('aria-hidden')).toBe('true');
  });

  // mat-list sets no list semantics itself, so the template adds them
  it('exposes the details as a list of two items', async () => {
    const list = (await render()).querySelector('mat-list')!;
    expect(list.getAttribute('role')).toBe('list');
    expect(list.querySelectorAll('mat-list-item[role="listitem"]')).toHaveLength(2);
  });
});

describe('initials', () => {
  it('takes the first letter of each word', () => {
    expect(initials('Alex Doe')).toBe('AD');
  });

  it('ignores extra spaces', () => {
    expect(initials(' Alex   Doe ')).toBe('AD');
  });

  it('gives one letter for one word', () => {
    expect(initials('Alex')).toBe('A');
  });

  it('keeps at most two letters', () => {
    expect(initials('Alex Jamie Doe')).toBe('AJ');
  });
});
