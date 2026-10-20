import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { publishNavResolver } from '../../../testing/nav-resolver.stub';
import { CompactHeaderComponent } from './compact-header.component';

function create() {
  const fixture = TestBed.createComponent(CompactHeaderComponent);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('CompactHeaderComponent', () => {
  it('renders the logo with accessible alt text', () => {
    const img = create().querySelector('img')!;
    expect(img.getAttribute('src')).toBe('/cdn/img/logo.svg');
    expect(img.getAttribute('alt')).toBe('Micro Frontends - Tractor Store');
  });

  it('links the logo to the explore home intent', async () => {
    await publishNavResolver((id) => (id === 'explore.home' ? '/' : null));
    expect(create().querySelector('a')?.getAttribute('href')).toBe('/');
  });

  it('marks the host with the banner role', () => {
    expect(create().getAttribute('role')).toBe('banner');
  });
});
