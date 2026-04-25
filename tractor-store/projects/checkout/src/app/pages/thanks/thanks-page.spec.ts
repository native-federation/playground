import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ThanksPage } from './thanks-page';

describe('ThanksPage', () => {
  it('creates', async () => {
    await TestBed.configureTestingModule({
      imports: [ThanksPage],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(ThanksPage);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Thanks for your order');
  });
});
