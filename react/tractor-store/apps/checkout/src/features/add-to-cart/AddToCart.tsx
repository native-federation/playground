import { useState, type FormEvent } from 'react';
import { useStyles } from '../../app';
import { useCart } from '../../data/cart-store';
import { getVariantBySku } from '../../data/variant';
import { Button } from '../../shared/components/Button';
import { NavLink } from '../../shared/nav-intent';
import { useAsync } from '../../shared/use-async';
import { addToCartStyles } from './add-to-cart-styles';

// The element can connect before its `sku` attribute is set. Keying on the sku
// also resets the "Tractor was added" message when another variant is picked.
export function AddToCart({ sku }: { sku?: string }) {
  return sku ? <Inner key={sku} sku={sku} /> : null;
}

function Inner({ sku }: { sku: string }) {
  useStyles(addToCartStyles);

  const cart = useCart();
  const { value: variant, isLoading, error } = useAsync(() => getVariantBySku(sku), [sku]);
  const [confirmed, setConfirmed] = useState(false);

  if (error) {
    return (
      <p className="c_AddToCart__loading" role="alert">
        Unable to load this variant. Please refresh.
      </p>
    );
  }

  if (!variant) {
    return isLoading ? (
      <p className="c_AddToCart__loading" aria-live="polite">Loading…</p>
    ) : null;
  }

  const outOfStock = variant.inventory === 0;

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (outOfStock) return;
    cart.add(sku);
    setConfirmed(true);
  };

  return (
    <form className="c_AddToCart" data-boundary="checkout" onSubmit={onSubmit}>
      <input type="hidden" name="sku" value={sku} />
      <div className="c_AddToCart__information">
        <p>{variant.price} Ø</p>
        {variant.inventory > 0 ? (
          <p className="c_AddToCart__stock c_AddToCart__stock--ok">
            {variant.inventory} in stock, free shipping
          </p>
        ) : (
          <p className="c_AddToCart__stock c_AddToCart__stock--empty">out of stock</p>
        )}
      </div>
      <Button type="submit" variant="primary" className="c_AddToCart__button" disabled={outOfStock}>
        add to basket
      </Button>
      <div
        className={
          confirmed
            ? 'c_AddToCart__confirmed'
            : 'c_AddToCart__confirmed c_AddToCart__confirmed--hidden'
        }
        aria-live="polite"
      >
        <p>Tractor was added.</p>
        <NavLink intent="checkout.cart" className="c_AddToCart__link">
          View in basket.
        </NavLink>
      </div>
    </form>
  );
}
