import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StoreHttp } from '../../core/data/http/store-http';
import { provideEnv } from '@tractor-store/shared';
import { testEnv } from '../../testing/env.fixture';
import { fakeListHttp } from '../../testing/list-http.stub';
import { storeFixture } from '../../testing/store.fixture';
import { StorePickerComponent } from './store-picker.component';
import { installFakeRegistry } from '@tractor-store/shared/testing';

describe('StorePickerComponent', () => {
  let bus: ReturnType<typeof installFakeRegistry>;

  beforeEach(async () => {
    bus = installFakeRegistry();
    await TestBed.configureTestingModule({
      imports: [StorePickerComponent],
      providers: [
        provideRouter([]),
        provideEnv(testEnv),
        { provide: StoreHttp, useValue: fakeListHttp(storeFixture) },
      ],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(StorePickerComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders one entry per store with cdn-prefixed image src/srcset', () => {
    const fixture = create();
    const entries = (
      fixture.nativeElement as HTMLElement
    ).shadowRoot!.querySelectorAll('.e_StorePicker_entry');
    expect(entries.length).toBe(2);

    const firstImg = entries[0].querySelector('img') as HTMLImageElement;
    expect(firstImg.getAttribute('src')).toBe(
      'http://cdn.test/img/200/store-1.webp',
    );
    expect(firstImg.getAttribute('srcset')).toBe(
      'http://cdn.test/img/200/store-1.webp 1x, ' +
        'http://cdn.test/img/400/store-1.webp 2x',
    );
  });

  it('does not render any entry when the stores list is undefined', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [StorePickerComponent],
      providers: [
        provideRouter([]),
        provideEnv(testEnv),
        { provide: StoreHttp, useValue: fakeListHttp(undefined) },
      ],
    });
    const fixture = TestBed.createComponent(StorePickerComponent);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).shadowRoot!.querySelectorAll(
        '.e_StorePicker_entry',
      ).length,
    ).toBe(0);
  });

  it('hides the selected display until select() is called', () => {
    const fixture = create();
    expect(
      (fixture.nativeElement as HTMLElement).shadowRoot!.querySelector(
        '.e_StorePicker_selected',
      ),
    ).toBeNull();
  });

  it('select() stores the model, renders the selected display and emits store:selected on the bus', () => {
    const fixture = create();
    const cmp = fixture.componentInstance;

    const seen = vi.fn();
    bus.on('store:selected', (event) => seen(event.data));

    cmp.select(storeFixture[1]);
    fixture.detectChanges();

    expect(cmp.selected()).toEqual(storeFixture[1]);
    expect(seen).toHaveBeenCalledWith({ id: 'store-b' });

    const selectedDisplay = (
      fixture.nativeElement as HTMLElement
    ).shadowRoot!.querySelector('.e_StorePicker_selected') as HTMLElement;
    expect(selectedDisplay).not.toBeNull();
    expect(selectedDisplay.textContent).toContain('Big Micro');
    expect(selectedDisplay.textContent).toContain('Broadway 2');
    expect(selectedDisplay.textContent).toContain('Burlington');

    const selectedImg = selectedDisplay.querySelector(
      'img',
    ) as HTMLImageElement;
    expect(selectedImg.getAttribute('src')).toBe(
      'http://cdn.test/img/200/store-2.webp',
    );
  });

  it('open() invokes showModal on the underlying dialog element', () => {
    const fixture = create();
    const dialog = fixture.componentInstance.dialogRef().nativeElement;
    const showModal = vi.fn();
    Object.defineProperty(dialog, 'showModal', {
      configurable: true,
      value: showModal,
    });
    fixture.componentInstance.open();
    expect(showModal).toHaveBeenCalledTimes(1);
  });

  it('select() invokes close on the underlying dialog element', () => {
    const fixture = create();
    const dialog = fixture.componentInstance.dialogRef().nativeElement;
    const close = vi.fn();
    Object.defineProperty(dialog, 'close', {
      configurable: true,
      value: close,
    });
    fixture.componentInstance.select(storeFixture[0]);
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('open() is a no-op when the runtime dialog has no showModal method', () => {
    const fixture = create();
    const dialog = fixture.componentInstance.dialogRef().nativeElement;
    Object.defineProperty(dialog, 'showModal', {
      configurable: true,
      value: undefined,
    });
    expect(() => fixture.componentInstance.open()).not.toThrow();
  });
});
