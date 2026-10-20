import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { publishNavResolver } from '../../../testing/nav-resolver.stub';
import { ButtonComponent } from './button.component';

function render(inputs: Record<string, unknown> = {}) {
  const fixture = TestBed.createComponent(ButtonComponent);
  for (const [name, value] of Object.entries(inputs)) {
    fixture.componentRef.setInput(name, value);
  }
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('ButtonComponent', () => {
  it('renders a plain button that does not submit forms by default', () => {
    const button = render().querySelector('button')!;
    expect(button.type).toBe('button');
    expect(button.className).toBe(
      'c_Button c_Button--secondary c_Button--size-normal',
    );
  });

  it('applies type, variant, size, rounded, title and disabled', () => {
    const button = render({
      type: 'submit',
      variant: 'primary',
      size: 'small',
      rounded: true,
      title: 'Remove',
      disabled: true,
    }).querySelector('button')!;
    expect(button.type).toBe('submit');
    expect([...button.classList].sort()).toEqual([
      'c_Button',
      'c_Button--primary',
      'c_Button--rounded',
      'c_Button--size-small',
    ]);
    expect(button.title).toBe('Remove');
    expect(button.disabled).toBe(true);
  });

  it('renders a link to the intent when navIntent is set', async () => {
    await publishNavResolver((id) => (id === 'checkout.cart' ? '/cart' : null));
    const el = render({ navIntent: 'checkout.cart' });
    expect(el.querySelector('button')).toBeNull();
    expect(el.querySelector('a')?.getAttribute('href')).toBe('/cart');
  });
});
