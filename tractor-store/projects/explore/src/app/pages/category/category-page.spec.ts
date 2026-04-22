import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { CategoryPage } from './category-page';

describe('CategoryPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(CategoryPage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
