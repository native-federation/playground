import { useRef, useState } from 'react';
import type { Events } from '@tractor-store/contracts';
import { useCdn, useStyles } from '../../app';
import { getStores, type Store } from '../../data/store';
import { Button } from '../../shared/components/Button';
import { StoreTile } from '../../shared/components/StoreTile';
import { useAsync } from '../../shared/use-async';
import { storePickerStyles } from './store-picker-styles';

export function StorePicker() {
  useStyles(storePickerStyles);
  const cdn = useCdn();
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Store>();

  const { value: stores, error } = useAsync(() => getStores(), []);

  const select = (store: Store): void => {
    setSelected(store);
    dialog.current?.close();
    window.__NF_REGISTRY__!.emit<Events['store:selected']>('store:selected', { id: store.id });
  };

  return (
    <div className="e_StorePicker">
      <div className="e_StorePicker_control" data-boundary="explore">
        {selected && (
          <div className="e_StorePicker_selected">
            <img
              className="e_StorePicker_image"
              src={cdn.src(selected.image, 200)}
              srcSet={cdn.srcSet(selected.image, [200, 400])}
              width={200}
              height={200}
              alt=""
            />
            <p className="e_StorePicker_address">
              {selected.name}
              <br />
              {selected.street}
              <br />
              {selected.city}
            </p>
          </div>
        )}
        <Button onClick={() => dialog.current?.showModal()}>choose a store</Button>
      </div>
      <dialog ref={dialog} className="e_StorePicker_dialog" data-boundary="explore">
        <div className="e_StorePicker_wrapper">
          <h2>Stores</h2>
          {error ? <p role="alert">Failed to load stores. Please refresh.</p> : null}
          <ul className="e_StorePicker_list">
            {(stores ?? []).map((s) => (
              <StoreTile key={s.id} store={s}>
                <Button onClick={() => select(s)}>select</Button>
              </StoreTile>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
}
