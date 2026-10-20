import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import type { Events } from '@tractor-store/contracts';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cdnImageLoader } from '../../app.config';
import { StoreService } from '../../data/store.service';
import { testEnv } from '../../testing/env.fixture';
import { fakeStoreService } from '../../testing/store-service.stub';
import { storeFixture } from '../../testing/store.fixture';
import { StorePickerComponent } from './store-picker.component';

describe('StorePickerComponent', () => {
  beforeEach(() => {
    // jsdom has no <dialog> behaviour.
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
    TestBed.configureTestingModule({
      providers: [
        { provide: StoreService, useValue: fakeStoreService() },
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
  });

  afterEach(() => {
    // @ts-expect-error restore the jsdom prototype
    delete HTMLDialogElement.prototype.showModal;
    // @ts-expect-error restore the jsdom prototype
    delete HTMLDialogElement.prototype.close;
  });

  async function render() {
    const fixture = TestBed.createComponent(StorePickerComponent);
    await fixture.whenStable();
    const root = (fixture.nativeElement as HTMLElement).shadowRoot!;
    return {
      fixture,
      root,
      dialog: root.querySelector('dialog')!,
      chooseButton: root.querySelector<HTMLButtonElement>(
        '.e_StorePicker_control button',
      )!,
      selectButtons: [
        ...root.querySelectorAll<HTMLButtonElement>(
          '.e_StorePicker_entry button',
        ),
      ],
    };
  }

  it('lists every store in the dialog', async () => {
    const { root } = await render();
    const entries = [...root.querySelectorAll('.e_StorePicker_entry')];
    expect(
      entries.map(
        (e) => e.querySelector('.e_StorePicker_address')?.textContent,
      ),
    ).toEqual(storeFixture.map((s) => expect.stringContaining(s.name)));
    expect(entries[0].querySelector('img')?.getAttribute('src')).toBe(
      testEnv.cdnUrl + storeFixture[0].image.replace('[size]', '200'),
    );
  });

  it('opens the dialog from the choose button', async () => {
    const { dialog, chooseButton } = await render();
    chooseButton.click();
    expect(dialog.showModal).toHaveBeenCalledOnce();
  });

  it('shows nothing selected initially', async () => {
    expect(
      (await render()).root.querySelector('.e_StorePicker_selected'),
    ).toBeNull();
  });

  it('selecting a store shows it, closes the dialog and announces it on the bus', async () => {
    const announced: Events['store:selected'][] = [];
    window.__NF_REGISTRY__!.on<Events['store:selected']>(
      'store:selected',
      ({ data }) => announced.push(data),
    );
    const { fixture, root, dialog, selectButtons } = await render();

    selectButtons[1].click();
    await fixture.whenStable();

    expect(dialog.close).toHaveBeenCalledOnce();
    expect(announced).toEqual([{ id: storeFixture[1].id }]);
    const selected = root.querySelector('.e_StorePicker_selected')!;
    expect(selected.textContent).toContain(storeFixture[1].name);
    expect(selected.textContent).toContain(storeFixture[1].street);
  });
});
