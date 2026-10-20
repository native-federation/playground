import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { categories } from './category.data';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  it('lists the whole catalog', async () => {
    const ref = TestBed.runInInjectionContext(() =>
      TestBed.inject(CategoryService).list(),
    );
    await TestBed.inject(ApplicationRef).whenStable();
    expect(ref.value()).toEqual(categories);
  });
});
