import { useCdn, useStyles } from '../../app';
import type { Product } from '../../data/category';
import { NavLink } from '../../shared/nav-intent';
import { productTileStyles } from './product-tile-styles';

export function ProductTile({ product }: { product: Product }) {
  useStyles(productTileStyles);
  const cdn = useCdn();

  return (
    <li className="e_Product">
      <NavLink
        intent={product.link.intent}
        payload={product.link.params}
        className="e_Product_link"
      >
        <img
          className="e_Product_image"
          src={cdn.src(product.image, 200)}
          srcSet={cdn.srcSet(product.image, [200, 400, 800])}
          sizes="300px"
          width={200}
          height={200}
          alt=""
        />
        <span className="e_Product_name">{product.name}</span>
        <span className="e_Product_price">{product.startPrice},00 Ø</span>
      </NavLink>
    </li>
  );
}
