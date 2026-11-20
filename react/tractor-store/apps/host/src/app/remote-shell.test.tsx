// @vitest-environment jsdom
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import type { RouteParams } from '@tractor-store/contracts';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LoadRemoteContext, type LoadRemote } from './load-remote';
import { RemoteShell } from './remote-shell';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

type RemoteElement = HTMLElement & { routeParams?: RouteParams };

// These cases mirror the Angular host's remote-shell spec: routeParams is a
// cross-framework contract, so both hosts must build it the same way.
describe('RemoteShell routeParams', () => {
  let container: HTMLElement;
  let root: Root;

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  const setup = async (url: string) => {
    const loadRemote = vi.fn<LoadRemote>(async () => {});
    const router = createMemoryRouter(
      [{ path: '/decide/product/:id?', element: <RemoteShell remoteName="@x/decide" element="mfe-product" /> }],
      { initialEntries: [url] },
    );
    container = document.body.appendChild(document.createElement('div'));
    root = createRoot(container);
    // An async act lets loadRemote resolve, so the element is mounted.
    await act(async () =>
      root.render(
        <LoadRemoteContext.Provider value={loadRemote}>
          <RouterProvider router={router} />
        </LoadRemoteContext.Provider>,
      ),
    );
    return {
      mounted: () => container.querySelector<RemoteElement>('mfe-product'),
      navigate: (to: string) => act(async () => void (await router.navigate(to))),
    };
  };

  it('passes path and query params as one routeParams property', async () => {
    const { mounted } = await setup('/decide/product/CL-01?size=M');
    expect(mounted()?.routeParams).toEqual({ id: 'CL-01', size: 'M' });
  });

  it('lets path params win over query params with the same name', async () => {
    const { mounted } = await setup('/decide/product/PATH?id=QUERY');
    expect(mounted()?.routeParams).toEqual({ id: 'PATH' });
  });

  it('keeps multi-value query params as arrays', async () => {
    const { mounted } = await setup('/decide/product?tag=a&tag=b');
    expect(mounted()?.routeParams).toEqual({ tag: ['a', 'b'] });
  });

  it('does not reassign routeParams when nothing changed', async () => {
    const { mounted, navigate } = await setup('/decide/product/CL-01');
    const first = mounted()?.routeParams;
    // A new location (the hash differs) re-renders the shell with equal params.
    await navigate('/decide/product/CL-01#again');
    expect(mounted()?.routeParams).toBe(first);
  });

  it('reassigns routeParams when a param changes', async () => {
    const { mounted, navigate } = await setup('/decide/product/CL-01');
    const element = mounted();
    await navigate('/decide/product/CL-02');
    // Same element, new value: the remote re-renders instead of remounting.
    expect(mounted()).toBe(element);
    expect(mounted()?.routeParams).toEqual({ id: 'CL-02' });
  });
});
