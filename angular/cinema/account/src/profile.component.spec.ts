import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  it('shows the name, the email and the member-since year', async () => {
    const fixture = TestBed.createComponent(ProfileComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    // The name is the card's heading, not just somewhere in the text.
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Sam Moviegoer');
    expect(el.textContent).toContain('sam@example.com');
    expect(el.textContent).toContain('Member since');
    expect(el.textContent).toContain('2024');
  });
});
