import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CART_STORAGE_KEY } from '../../services/cart.service';
import { MiniCartComponent } from './mini-cart';

describe('MiniCartComponent', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('creates with zero items', async () => {
    await TestBed.configureTestingModule({
      imports: [MiniCartComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(MiniCartComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.quantity()).toBe(0);
  });

  it('shows the total quantity from the cart service', async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, 'AU-03-RD_2|CL-01-GR_1');
    await TestBed.configureTestingModule({
      imports: [MiniCartComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(MiniCartComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.quantity()).toBe(3);
  });
});
