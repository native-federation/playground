import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ButtonComponent } from './button.component';

@Component({
  imports: [ButtonComponent],
  template: `<app-button>choose</app-button
    ><app-button type="submit">send</app-button>`,
})
class HostComponent {}

describe('ButtonComponent', () => {
  it('renders a native button that is not a submit button by default', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const buttons = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll('button'),
    ];
    expect(buttons.map((b) => [b.textContent?.trim(), b.type])).toEqual([
      ['choose', 'button'],
      ['send', 'submit'],
    ]);
  });
});
