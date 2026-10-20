import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { teasers } from './teaser.data';
import { TeaserService } from './teaser.service';

describe('TeaserService', () => {
  it('lists the whole catalog', async () => {
    const ref = TestBed.runInInjectionContext(() =>
      TestBed.inject(TeaserService).list(),
    );
    await TestBed.inject(ApplicationRef).whenStable();
    expect(ref.value()).toEqual(teasers);
  });
});
