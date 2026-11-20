import { TestBed } from '@angular/core/testing';
import { bus } from '@softarc/native-federation-communication';
import { describe, expect, it } from 'vitest';
import { DevDock } from '../app/dev-dock';
import { EventLogPanel } from './event-log-panel';

const render = () => {
  const fixture = TestBed.createComponent(EventLogPanel);
  fixture.detectChanges();
  const root = fixture.nativeElement as HTMLElement;
  const launcher = () => root.querySelector('button[aria-controls="event-log"]')!;
  const headerButton = (label: string) =>
    [...root.querySelectorAll('header button')].find((b) => b.textContent?.includes(label))!;
  const rows = () => [...root.querySelectorAll<HTMLButtonElement>('li button.row')];
  const click = (el: Element | null) => {
    (el as HTMLElement).click();
    fixture.detectChanges();
  };
  const emitBooking = () => {
    bus.emit('booking:confirmed', { bookingRef: 'BR-1', ticketCount: 2 }, { retain: false });
    fixture.detectChanges();
  };
  return { fixture, root, launcher, headerButton, rows, click, emitBooking };
};

describe('EventLogPanel', () => {
  it('starts closed and counts events', () => {
    const { root, launcher, emitBooking } = render();
    expect(launcher().textContent).toContain('Events 0');
    expect(launcher().getAttribute('aria-expanded')).toBe('false');
    expect(root.querySelector('aside')).toBeNull();

    emitBooking();
    expect(launcher().textContent).toContain('Events 1');
  });

  it('shows each event collapsed: channel, kind and a one-line preview', () => {
    const { root, launcher, rows, click, emitBooking } = render();
    emitBooking();
    click(launcher());

    expect(launcher().getAttribute('aria-expanded')).toBe('true');
    const [row] = rows();
    expect(row.querySelector('.channel')?.textContent).toBe('booking:confirmed');
    expect(row.querySelector('.kind')?.textContent).toBe('command');
    expect(row.querySelector('.preview')?.textContent).toBe('{"bookingRef":"BR-1","ticketCount":2}');
    expect(row.getAttribute('aria-expanded')).toBe('false');
    expect(root.querySelector('pre')).toBeNull();
  });

  it('expands a row to the pretty-printed value', () => {
    const { root, launcher, rows, click, emitBooking } = render();
    emitBooking();
    click(launcher());
    click(rows()[0]);

    expect(rows()[0].getAttribute('aria-expanded')).toBe('true');
    const pre = root.querySelector('pre')!;
    expect(rows()[0].getAttribute('aria-controls')).toBe(pre.id);
    expect(pre.textContent).toContain('"bookingRef": "BR-1"');

    click(rows()[0]);
    expect(root.querySelector('pre')).toBeNull();
  });

  it('expands and collapses all rows', () => {
    const { root, launcher, headerButton, click, emitBooking } = render();
    emitBooking();
    emitBooking();
    click(launcher());

    click(headerButton('Expand all'));
    expect(root.querySelectorAll('pre')).toHaveLength(2);
    click(headerButton('Collapse all'));
    expect(root.querySelectorAll('pre')).toHaveLength(0);
  });

  it('highlights only events that arrive while it is open', () => {
    const { root, launcher, click, emitBooking } = render();
    emitBooking();
    click(launcher());
    emitBooking();
    const fresh = [...root.querySelectorAll('li')].map((li) => li.classList.contains('fresh'));
    expect(fresh).toEqual([true, false]);
  });

  it('clears the list', () => {
    const { root, launcher, headerButton, click, emitBooking } = render();
    emitBooking();
    click(launcher());
    click(headerButton('Clear'));
    expect(root.querySelector('li')).toBeNull();
    expect(root.querySelector('.empty')?.textContent).toContain('No events yet.');
  });

  it('closes when another dock panel opens', () => {
    const { fixture, root, launcher, click } = render();
    click(launcher());
    TestBed.inject(DevDock).toggle('remotes');
    fixture.detectChanges();
    expect(root.querySelector('aside')).toBeNull();
  });
});
