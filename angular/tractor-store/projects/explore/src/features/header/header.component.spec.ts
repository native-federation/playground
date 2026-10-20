import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cdnImageLoader } from '../../app.config';
import { LOAD_REMOTE } from '../../shared/remote-element';
import { testEnv } from '../../testing/env.fixture';
import { HeaderComponent } from './header.component';
import { publishNavResolver } from '../../testing/nav-resolver.stub';

describe('HeaderComponent', () => {
  let loadRemote: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    loadRemote = vi.fn().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      providers: [
        { provide: LOAD_REMOTE, useValue: loadRemote },
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
    await publishNavResolver((id) => id);
  });

  async function render() {
    const fixture = TestBed.createComponent(HeaderComponent);
    await fixture.whenStable();
    return (fixture.nativeElement as HTMLElement).shadowRoot!;
  }

  it('links the logo to the home page', async () => {
    const link = (await render()).querySelector('.e_Header__link')!;
    expect(link.getAttribute('href')).toBe('explore.home');
    expect(link.querySelector('img')?.getAttribute('src')).toBe(
      `${testEnv.cdnUrl}/cdn/img/logo.svg`,
    );
  });

  it('shows the navigation and the mini-cart from checkout', async () => {
    const root = await render();
    expect(root.querySelector('app-navigation')).not.toBeNull();
    expect(root.querySelector('mfe-mini-cart')).not.toBeNull();
    expect(loadRemote.mock.calls).toEqual([
      ['@tractor-store/checkout', 'mfe-mini-cart'],
    ]);
  });

  it('marks the explore boundary', async () => {
    expect((await render()).querySelector('header')?.dataset['boundary']).toBe(
      'explore',
    );
  });
});
