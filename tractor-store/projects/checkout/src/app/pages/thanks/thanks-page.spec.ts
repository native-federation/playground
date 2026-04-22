import { TestBed } from '@angular/core/testing';
import { ThanksPage } from './thanks-page';

describe('ThanksPage', () => {
  it('creates', async () => {
    await TestBed.configureTestingModule({
      imports: [ThanksPage],
    }).compileComponents();
    const fixture = TestBed.createComponent(ThanksPage);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Thanks for your order');
  });
});
