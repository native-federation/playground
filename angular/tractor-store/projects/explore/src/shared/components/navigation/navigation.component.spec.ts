import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { NavigationComponent } from './navigation.component';
import { publishNavResolver } from '../../../testing/nav-resolver.stub';

describe('NavigationComponent', () => {
  it('links to the machines and stores pages', async () => {
    await publishNavResolver((id) => id);
    const fixture = TestBed.createComponent(NavigationComponent);
    await fixture.whenStable();
    const links = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll('a'),
    ];
    expect(links.map((a) => [a.textContent, a.getAttribute('href')])).toEqual([
      ['Machines', 'explore.products'],
      ['Stores', 'explore.stores'],
    ]);
  });
});
