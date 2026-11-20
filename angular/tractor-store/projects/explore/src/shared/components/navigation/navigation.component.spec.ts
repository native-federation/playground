import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { NavigationComponent } from './navigation.component';
import { publishNavIntents } from '../../../testing/nav-intents.stub';

describe('NavigationComponent', () => {
  it('links to the machines and stores pages', async () => {
    publishNavIntents({
      'explore.products': '/explore/products',
      'explore.stores': '/explore/stores',
    });
    const fixture = TestBed.createComponent(NavigationComponent);
    await fixture.whenStable();
    const links = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll('a'),
    ];
    expect(links.map((a) => [a.textContent, a.getAttribute('href')])).toEqual([
      ['Machines', '/explore/products'],
      ['Stores', '/explore/stores'],
    ]);
  });
});
