import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { BadgeComponent } from './badge.component';
import { PointsPageComponent } from './points-page.component';
import { PointsStore } from './points.store';
import { bookingConfirmedExample } from './testing/contracts.examples';
import { bus } from '@softarc/native-federation-communication';

const text = (el: Element | null) => el?.textContent?.replace(/\s+/g, ' ').trim();
const liveText = (badge: HTMLElement) => text(badge.querySelector('[aria-live="polite"]'));
const pageTotal = (page: HTMLElement) => text(page.querySelector('.total'));

describe('badge and points page', () => {
  it('both show 0 before any booking', async () => {
    const badge = TestBed.createComponent(BadgeComponent);
    const page = TestBed.createComponent(PointsPageComponent);
    await Promise.all([badge.whenStable(), page.whenStable()]);

    // Exact matches: toContain('0 points') would also accept '20 points'.
    expect(liveText(badge.nativeElement)).toBe('0 points');
    expect(pageTotal(page.nativeElement)).toBe('0 points');
  });

  // Both elements read one root store, as they do in one createApplication in the browser.
  it('both show the points of one booking', async () => {
    const badge = TestBed.createComponent(BadgeComponent);
    const page = TestBed.createComponent(PointsPageComponent);
    await Promise.all([badge.whenStable(), page.whenStable()]);

    bus.emit('booking:confirmed', bookingConfirmedExample, { retain: false });
    await Promise.all([badge.whenStable(), page.whenStable()]);

    // The live region itself carries the new text, so screen readers announce it.
    expect(liveText(badge.nativeElement)).toBe('20 points');
    expect(pageTotal(page.nativeElement)).toBe('20 points');
    // Not just equal numbers: one instance, as one createApplication gives both elements in the browser.
    expect(badge.componentRef.injector.get(PointsStore)).toBe(page.componentRef.injector.get(PointsStore));
  });
});
