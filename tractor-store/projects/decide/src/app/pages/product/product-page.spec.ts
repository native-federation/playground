import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProductPage } from './product-page';

describe('ProductPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPage],
      providers: [provideRouter([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('creates the component and resolves a product by id', () => {
    const fixture = TestBed.createComponent(ProductPage);
    fixture.componentRef.setInput('id', 'CL-01');
    fixture.detectChanges();

    const cmp = fixture.componentInstance;
    expect(cmp).toBeTruthy();
    expect(cmp.product()?.name).toBe('Heritage Workhorse');
    expect(cmp.selectedSku()).toBe('CL-01-GR');
  });

  it('selects variant from ?sku query param when it matches', () => {
    const fixture = TestBed.createComponent(ProductPage);
    fixture.componentRef.setInput('id', 'CL-01');
    fixture.componentRef.setInput('sku', 'CL-01-GY');
    fixture.detectChanges();

    expect(fixture.componentInstance.selectedSku()).toBe('CL-01-GY');
  });

  it('falls back to first variant when sku does not match', () => {
    const fixture = TestBed.createComponent(ProductPage);
    fixture.componentRef.setInput('id', 'CL-01');
    fixture.componentRef.setInput('sku', 'nonexistent');
    fixture.detectChanges();

    expect(fixture.componentInstance.selectedSku()).toBe('CL-01-GR');
  });
});
