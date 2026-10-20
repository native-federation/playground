import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { stores } from './store.data';
import { StoreService } from './store.service';

describe('StoreService', () => {
  it('lists the whole catalog', async () => {
    const ref = TestBed.runInInjectionContext(() =>
      TestBed.inject(StoreService).list(),
    );
    await TestBed.inject(ApplicationRef).whenStable();
    expect(ref.value()).toEqual(stores);
  });
});
