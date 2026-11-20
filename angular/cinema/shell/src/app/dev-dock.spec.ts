import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { DevDock } from './dev-dock';

describe('DevDock', () => {
  it('keeps at most one panel open', () => {
    const dock = TestBed.inject(DevDock);
    expect(dock.open()).toBeNull();
    dock.toggle('events');
    expect(dock.open()).toBe('events');
    dock.toggle('remotes');
    expect(dock.open()).toBe('remotes');
    dock.toggle('remotes');
    expect(dock.open()).toBeNull();
  });

  it('closes whatever is open', () => {
    const dock = TestBed.inject(DevDock);
    dock.toggle('events');
    dock.close();
    expect(dock.open()).toBeNull();
  });
});
