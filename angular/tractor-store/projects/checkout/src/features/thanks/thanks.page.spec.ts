import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LOAD_REMOTE } from '@tractor-store/shared';
import { ThanksPage } from './thanks.page';

describe('ThanksPage', () => {
  it('creates', async () => {
    await TestBed.configureTestingModule({
      imports: [ThanksPage],
      providers: [
        provideRouter([]),
        { provide: LOAD_REMOTE, useValue: () => Promise.resolve() },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(ThanksPage);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    const text = (fixture.nativeElement as HTMLElement).shadowRoot!
      .textContent as string;
    expect(text).toContain('Thanks for your order');
  });
});
