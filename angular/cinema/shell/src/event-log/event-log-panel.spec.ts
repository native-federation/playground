import { TestBed } from '@angular/core/testing';
import { bus } from '@softarc/native-federation-communication';
import { describe, expect, it } from 'vitest';
import { EventLogPanel } from './event-log-panel';

const render = () => {
  const fixture = TestBed.createComponent(EventLogPanel);
  fixture.detectChanges();
  const root = fixture.nativeElement as HTMLElement;
  const launcher = () => root.querySelector('button[aria-controls]')!;
  const click = (el: Element | null) => {
    (el as HTMLElement).click();
    fixture.detectChanges();
  };
  return { fixture, root, launcher, click };
};

describe('EventLogPanel', () => {
  it('starts closed and counts events', () => {
    const { fixture, root, launcher } = render();
    expect(launcher().textContent).toContain('Events 0');
    expect(launcher().getAttribute('aria-expanded')).toBe('false');
    expect(root.querySelector('aside')).toBeNull();

    bus.emit('nav:navigate', { id: 'programme.list' }, { retain: false });
    fixture.detectChanges();
    expect(launcher().textContent).toContain('Events 1');
  });

  it('opens to show each event with channel, kind and value', () => {
    const { root, launcher, click } = render();
    bus.emit('booking:confirmed', { bookingRef: 'BR-1', ticketCount: 2 }, { retain: false });
    click(launcher());

    expect(launcher().getAttribute('aria-expanded')).toBe('true');
    const items = root.querySelectorAll('li');
    expect(items).toHaveLength(1);
    expect(items[0].querySelector('.channel')?.textContent).toBe('booking:confirmed');
    expect(items[0].textContent).toContain('command');
    expect(items[0].querySelector('pre')?.textContent).toContain('"bookingRef": "BR-1"');
  });

  it('clears the list', () => {
    const { root, launcher, click } = render();
    bus.emit('nav:navigate', { id: 'programme.list' }, { retain: false });
    click(launcher());
    click(root.querySelector('aside .bar button'));
    expect(root.querySelector('li')).toBeNull();
    expect(root.querySelector('.empty')?.textContent).toContain('No events yet.');
  });
});
