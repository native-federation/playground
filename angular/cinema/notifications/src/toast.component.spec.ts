import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastComponent } from './toast.component';
import { bookingConfirmedExample } from './testing/contracts.examples';
import { bus } from '@softarc/native-federation-communication';

// As booking emits it: a command (ADR-05).
const confirm = (bookingRef = bookingConfirmedExample.bookingRef) =>
  bus.emit('booking:confirmed', { ...bookingConfirmedExample, bookingRef }, { retain: false });

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

  // replay: false (ADR-05): even a value retained by a producer that forgot retain: false
  // would show a stale toast. The bus replays synchronously, inside on().
  it('ignores a booking confirmed before it existed', () => {
    bus.emit('booking:confirmed', bookingConfirmedExample);
    const { toast } = render();
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
