import type { Store } from '../../api/stores';
import { useScopedStyles } from '@react-internal/mfe-runtime';
import { useCdnBase } from '@react-internal/mfe-runtime';
import { imgSrc, imgSrcset } from '@react-internal/mfe-runtime';
import { storeTileStyles } from './store-tile-styles';

export function StoreTile({ store }: { store: Store }) {
  useScopedStyles('explore-store-tile', storeTileStyles);
  const base = useCdnBase();

  return (
    <li className="e_Store">
      <div className="e_Store_content">
        <img
          className="e_Store_image"
          src={imgSrc(store.image, 200, base)}
          srcSet={imgSrcset(store.image, [200, 400], base)}
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
    </li>
  );
}
