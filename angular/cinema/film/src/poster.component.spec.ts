import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import type { Film } from './films';
import { PosterComponent } from './poster.component';

describe('PosterComponent', () => {
  const render = async (poster: Film['poster'], tint?: Film['tint']) => {
    const fixture = TestBed.createComponent(PosterComponent);
    fixture.componentRef.setInput('poster', poster);
    if (tint) fixture.componentRef.setInput('tint', tint);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  };

  it('draws the icon named by poster, hidden from assistive tech', async () => {
    const el = await render('moon');
    const svg = el.querySelector('svg')!;
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    // the moon is a single path; the anchor and feather draw more shapes
    expect(svg.children).toHaveLength(1);
  });

  it('draws a different icon for another poster', async () => {
    const el = await render('anchor');
    expect(el.querySelector('svg circle')).not.toBeNull();
  });

  it('uses the tertiary tint only when asked', async () => {
    expect((await render('anchor')).classList.contains('tertiary')).toBe(false);
    expect((await render('anchor', 'tertiary')).classList.contains('tertiary')).toBe(true);
  });
});
