import type { ReactNode } from 'react';
import { useCdn, useStyles } from '../../app';
import type { Store } from '../../data/store';
import { storeTileStyles } from './store-tile-styles';

export function StoreTile({ store, children }: { store: Store; children?: ReactNode }) {
  useStyles(storeTileStyles);
  const cdn = useCdn();

  return (
    <li className="e_Store">
      <div className="e_Store_content">
        <img
          className="e_Store_image"
          src={cdn.src(store.image, 200)}
          srcSet={cdn.srcSet(store.image, [200, 400])}
          width={200}
          height={200}
          alt=""
        />
        <p className="e_Store_address">
          {store.name}
          <br />
          {store.street}
          <br />
          {store.city}
        </p>
      </div>
      {children}
    </li>
  );
}
