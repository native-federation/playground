import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { VariantOption } from './variant-option';

describe('VariantOption', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantOption],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders a link when not selected', () => {
    const fixture = TestBed.createComponent(VariantOption);
    fixture.componentRef.setInput('sku', 'AU-03-RD');
    fixture.componentRef.setInput('name', 'Scarlet Dynamo');
    fixture.componentRef.setInput('color', '#FF2400');
    fixture.componentRef.setInput('selected', false);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('a')).toBeTruthy();
    expect(el.querySelector('strong')).toBeFalsy();
    expect(el.textContent).toContain('Scarlet Dynamo');
  });

  it('renders a strong tag when selected', () => {
    const fixture = TestBed.createComponent(VariantOption);
    fixture.componentRef.setInput('sku', 'AU-03-RD');
    fixture.componentRef.setInput('name', 'Scarlet Dynamo');
    fixture.componentRef.setInput('color', '#FF2400');
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('strong')).toBeTruthy();
    expect(el.querySelector('a')).toBeFalsy();
  });
});
