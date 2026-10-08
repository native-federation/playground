import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StoreHttp } from '../../core/data/http/store-http';
import { LOAD_REMOTE, provideEnv } from '@tractor-store/shared';
import { testEnv } from '../../testing/env.fixture';
import { fakeListHttp } from '../../testing/list-http.stub';
import { storeFixture } from '../../testing/store.fixture';
import { StoresPage } from './stores.page';

describe('StoresPage', () => {
  let loader: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    loader = vi.fn().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({
      imports: [StoresPage],
      providers: [
        provideEnv(testEnv),
        { provide: LOAD_REMOTE, useValue: loader },
        { provide: StoreHttp, useValue: fakeListHttp(storeFixture) },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('renders one store tile per loaded store', () => {
    const fixture = TestBed.createComponent(StoresPage);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).shadowRoot!.querySelectorAll(
        'app-store-tile',
      ).length,
    ).toBe(2);
  });

  it('renders the page heading', () => {
    const fixture = TestBed.createComponent(StoresPage);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).shadowRoot!.querySelector('h2')
        ?.textContent,
    ).toBe('Our Stores');
  });

  it('renders no tiles when the store list is empty', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [StoresPage],
      providers: [
        provideEnv(testEnv),
        {
          provide: LOAD_REMOTE,
          useValue: vi.fn().mockResolvedValue(undefined),
        },
        { provide: StoreHttp, useValue: fakeListHttp(undefined) },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    const fixture = TestBed.createComponent(StoresPage);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).shadowRoot!.querySelectorAll(
        'app-store-tile',
      ).length,
    ).toBe(0);
  });

  it('eagerly preloads the header and footer slices', () => {
    TestBed.createComponent(StoresPage);
    expect(loader).toHaveBeenCalledWith('@tractor-store/explore', 'mfe-header');
    expect(loader).toHaveBeenCalledWith('@tractor-store/explore', 'mfe-footer');
  });

  it('marks the host with the explore boundary attribute', () => {
    const fixture = TestBed.createComponent(StoresPage);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).getAttribute('data-boundary-page'),
    ).toBe('explore');
  });
});
