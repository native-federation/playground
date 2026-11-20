// @vitest-environment jsdom
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { bus } from '@softarc/native-federation-communication';
import type { NavigatePayload, NavIntents } from '@tractor-store/contracts';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { NavLink } from './nav-intent';

// Stand-in for the host's intents: two of them, and the product needs {id}.
const intents: NavIntents = { 'explore.home': '/', 'decide.product': '/product/{id}' };

// Tells React the tests wrap updates in act().
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('NavLink', () => {
  let container: HTMLElement;
  let root: Root;
  let navigations: NavigatePayload[];

  beforeEach(() => {
    container = document.body.appendChild(document.createElement('div'));
    root = createRoot(container);
    navigations = [];
    bus.on('nav:navigate', (value) => navigations.push(value), { replay: false });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  const render = () => {
    act(() =>
      root.render(
        <>
          <NavLink intent="explore.home">home</NavLink>
          <NavLink intent="decide.product" payload={{ id: 'CL-01' }}>product</NavLink>
          <NavLink intent="decide.product">no id</NavLink>
        </>,
      ),
    );
    return [...container.querySelectorAll('a')];
  };

  it('renders the resolved URL as href', () => {
    bus.emit('nav:intents', intents);
    const [home, product] = render();
    expect(home.getAttribute('href')).toBe('/');
    expect(product.getAttribute('href')).toBe('/product/CL-01');
  });

  it('picks up intents the host publishes after the first render', () => {
    const [home] = render();
    expect(home.hasAttribute('href')).toBe(false);
    act(() => bus.emit('nav:intents', intents));
    expect(home.getAttribute('href')).toBe('/');
  });

  it('emits nav:navigate with the intent and payload when clicked', () => {
    bus.emit('nav:intents', intents);
    const [home, product] = render();
    act(() => home.click());
    act(() => product.click());
    expect(navigations).toEqual([
      { id: 'explore.home', payload: {} },
      { id: 'decide.product', payload: { id: 'CL-01' } },
    ]);
  });

  it('leaves modified clicks to the browser', () => {
    bus.emit('nav:intents', intents);
    const [home] = render();
    act(() => {
      home.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true }));
    });
    expect(navigations).toEqual([]);
  });

  it('is aria-disabled and does not navigate when a path param is missing', () => {
    bus.emit('nav:intents', intents);
    const [, , noId] = render();
    expect(noId.getAttribute('aria-disabled')).toBe('true');
    act(() => noId.click());
    expect(navigations).toEqual([]);
  });
});
