import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { LOAD_REMOTE } from '../../shared/remote-element';
import { ThanksPage } from './thanks.page';

describe('ThanksPage', () => {
  it('thanks the customer and warns, rather than fails, when confetti cannot load', async () => {
    // The confetti module comes from a CDN, which the test environment can't import.
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    TestBed.configureTestingModule({
      providers: [{ provide: LOAD_REMOTE, useValue: () => Promise.resolve() }],
    });
    const fixture = TestBed.createComponent(ThanksPage);
    await fixture.whenStable();

    const root = (fixture.nativeElement as HTMLElement).shadowRoot!;
    expect(root.textContent).toContain('Thanks for your order');
    await vi.waitFor(() =>
      expect(warn).toHaveBeenCalledWith(
        '[thanks] confetti failed to load',
        expect.anything(),
      ),
    );
    warn.mockRestore();
  });
});
