import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Events } from './contracts';
import { ToastComponent } from './toast.component';
import { bookingConfirmedExample } from './testing/contracts.examples';

const confirm = (bookingRef = bookingConfirmedExample.bookingRef) =>
  window.__NF_REGISTRY__!.emit<Events['booking:confirmed']>('booking:confirmed', {
    ...bookingConfirmedExample,
    bookingRef,
  });

// Under fake timers, whenStable() would hang on the zoneless scheduler's own timer,
// so these specs render with detectChanges().
describe('ToastComponent', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const render = () => {
    const fixture = TestBed.createComponent(ToastComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const toast = () => {
      fixture.detectChanges();
      return el.querySelector('.toast')?.textContent?.trim() ?? null;
    };
    return { fixture, el, toast };
  };

  it('has a live region even when empty, so the change is announced', () => {
    const { el, toast } = render();
    expect(el.querySelector('[role="status"]')).not.toBeNull();
    expect(toast()).toBeNull();
  });

  it('shows the booking ref for 3 s', () => {
    const { toast } = render();
    confirm();
    expect(toast()).toBe('Booking BR-7F3A confirmed');
    vi.advanceTimersByTime(2999);
    expect(toast()).toBe('Booking BR-7F3A confirmed');
    vi.advanceTimersByTime(1);
    expect(toast()).toBeNull();
  });

  // The first booking's timer must not hide the second toast early.
  it('restarts the 3 s for a second booking', () => {
    const { toast } = render();
    confirm('BR-0001');
    vi.advanceTimersByTime(2000);
    confirm('BR-0002');
    expect(toast()).toBe('Booking BR-0002 confirmed');
    vi.advanceTimersByTime(2999);
    expect(toast()).toBe('Booking BR-0002 confirmed');
    vi.advanceTimersByTime(1);
    expect(toast()).toBeNull();
  });

  // replay 0 (ADR-05): the registry keeps the last event, but replaying it would show a stale toast.
  // The registry delivers a replay in a microtask, so flush pending work before asserting.
  it('ignores a booking confirmed before it existed', async () => {
    confirm();
    const { toast } = render();
    await vi.advanceTimersByTimeAsync(0);
    expect(toast()).toBeNull();
  });

  // A destroyed toast leaves no pending timer and no bus listener behind.
  it('cleans up its timer and subscription on destroy', async () => {
    const { fixture } = render();
    confirm();
    // Lets the zoneless scheduler's pending render timers run, so only the 3 s timer is left.
    await vi.advanceTimersByTimeAsync(0);
    expect(vi.getTimerCount()).toBe(1);
    fixture.destroy();
    expect(vi.getTimerCount()).toBe(0);
    confirm();
    expect(vi.getTimerCount()).toBe(0);
  });
});
