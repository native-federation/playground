import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { StoresPage } from './stores-page';

describe('StoresPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoresPage],
      providers: [provideRouter([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(StoresPage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
