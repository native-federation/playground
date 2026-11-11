import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { BadgeComponent } from './badge.component';
import type { Events } from './contracts';
import { PointsPageComponent } from './points-page.component';
import { PointsStore } from './points.store';
import { bookingConfirmedExample } from './testing/contracts.examples';

describe('badge and points page', () => {
  it('both show 0 before any booking', async () => {
    const badge = TestBed.createComponent(BadgeComponent);
    const page = TestBed.createComponent(PointsPageComponent);
    await Promise.all([badge.whenStable(), page.whenStable()]);

    expect(badge.nativeElement.textContent).toContain('0 points');
    expect(page.nativeElement.textContent).toContain('0 points');
  });

  // Both elements read one root store, as they do in one createApplication in the browser.
  it('both show the points of one booking', async () => {
    const badge = TestBed.createComponent(BadgeComponent);
    const page = TestBed.createComponent(PointsPageComponent);
    await Promise.all([badge.whenStable(), page.whenStable()]);

    window.__NF_REGISTRY__!.emit<Events['booking:confirmed']>('booking:confirmed', bookingConfirmedExample);
    await Promise.all([badge.whenStable(), page.whenStable()]);

    expect(badge.nativeElement.textContent).toContain('20 points');
    expect(page.nativeElement.textContent).toContain('20 points');
    expect(badge.nativeElement.querySelector('[aria-live="polite"]')).not.toBeNull();
    // Not just equal numbers: one instance, as one createApplication gives both elements in the browser.
    expect(badge.componentRef.injector.get(PointsStore)).toBe(page.componentRef.injector.get(PointsStore));
  });
});
