import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NavigateToDirective } from '@internal/events';
import { beforeEach, describe, expect, it } from 'vitest';
import { VariantOption } from './variant-option';

interface Inputs {
  id: string;
  sku: string;
  name: string;
  color: string;
  selected?: boolean;
}

const baseInputs: Inputs = {
  id: 'AU-03',
  sku: 'AU-03-RD',
  name: 'Scarlet Dynamo',
  color: '#FF2400',
  selected: false,
};

describe('VariantOption', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantOption],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function create(overrides: Partial<Inputs> = {}) {
    const inputs = { ...baseInputs, ...overrides };
    const fixture = TestBed.createComponent(VariantOption);
    fixture.componentRef.setInput('id', inputs.id);
    fixture.componentRef.setInput('sku', inputs.sku);
    fixture.componentRef.setInput('name', inputs.name);
    fixture.componentRef.setInput('color', inputs.color);
    fixture.componentRef.setInput('selected', inputs.selected);
    fixture.detectChanges();
    return fixture;
  }

  it('renders a navigable link with the variant name when not selected', () => {
    const el: HTMLElement = create({ selected: false }).nativeElement;
    const link = el.querySelector('a');
    expect(link).toBeTruthy();
    expect(el.querySelector('strong')).toBeFalsy();
    expect(link?.textContent).toContain('Scarlet Dynamo');
  });

  it('renders a strong tag (no link) when selected', () => {
    const el: HTMLElement = create({ selected: true }).nativeElement;
    expect(el.querySelector('strong')?.textContent).toContain('Scarlet Dynamo');
    expect(el.querySelector('a')).toBeFalsy();
  });

  it('defaults selected to false when the input is omitted', () => {
    const fixture = TestBed.createComponent(VariantOption);
    fixture.componentRef.setInput('id', baseInputs.id);
    fixture.componentRef.setInput('sku', baseInputs.sku);
    fixture.componentRef.setInput('name', baseInputs.name);
    fixture.componentRef.setInput('color', baseInputs.color);
    fixture.detectChanges();

    expect(fixture.componentInstance.selected()).toBe(false);
    expect(fixture.nativeElement.querySelector('a')).toBeTruthy();
  });

  it('exposes the color through the --variant-color custom property', () => {
    const fixture = create({ color: '#123456' });
    const li = fixture.nativeElement.querySelector('li') as HTMLElement;
    expect(li.style.getPropertyValue('--variant-color')).toBe('#123456');
  });

  it('passes the navigation intent and {id, sku} params to NavigateToDirective', () => {
    const fixture = create({
      id: 'CL-01',
      sku: 'CL-01-GR',
      selected: false,
    });
    const dir = fixture.debugElement
      .query(By.directive(NavigateToDirective))
      .injector.get(NavigateToDirective);
    expect(dir.navigateTo()).toBe('decide.product');
    expect(dir.navParams()).toEqual({ id: 'CL-01', sku: 'CL-01-GR' });
  });

  it('linkParams reflects current id and sku inputs', () => {
    const fixture = create({ id: 'AU-02', sku: 'AU-02-BL' });
    expect(fixture.componentInstance.linkParams()).toEqual({
      id: 'AU-02',
      sku: 'AU-02-BL',
    });
  });

  it('updates the rendered link params when inputs change', () => {
    const fixture = create({ id: 'AU-02', sku: 'AU-02-BL', selected: false });
    fixture.componentRef.setInput('sku', 'AU-02-OG');
    fixture.detectChanges();

    const dir = fixture.debugElement
      .query(By.directive(NavigateToDirective))
      .injector.get(NavigateToDirective);
    expect(dir.navParams()).toEqual({ id: 'AU-02', sku: 'AU-02-OG' });
  });
});
