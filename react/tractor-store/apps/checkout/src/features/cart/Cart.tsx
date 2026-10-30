import { useStyles } from '../../app';
import { useCart } from '../../data/cart-store';
import { getVariantsBySkus } from '../../data/variant';
import { ButtonLink } from '../../shared/components/Button';
import { LineItem, type LineItemView } from '../../shared/components/LineItem';
import { useRemoteElement } from '../../shared/remote-element';
import { useAsync } from '../../shared/use-async';
import { cartStyles } from './cart-styles';

export function Cart() {
  useStyles(cartStyles);
  useRemoteElement('@tractor-store/explore', 'mfe-header');
  useRemoteElement('@tractor-store/explore', 'mfe-recommendations');
  useRemoteElement('@tractor-store/explore', 'mfe-footer');

  const { lineItems } = useCart();
  const skus = lineItems.map((item) => item.sku);
  // Only the skus decide which variants to load, not the quantities.
  const { value: variants, error } = useAsync(() => getVariantsBySkus(skus), [skus.join(',')]);

  const bySku = new Map((variants ?? []).map((v) => [v.sku, v]));
  const items: LineItemView[] = lineItems.flatMap(({ sku, quantity }) => {
    const variant = bySku.get(sku);
    if (!variant) return [];
    return [
      {
        id: variant.id,
        name: variant.name,
        sku: variant.sku,
        image: variant.image,
        quantity,
        total: variant.price * quantity,
      },
    ];
  });

  const total = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div data-boundary-page="checkout">
      <mfe-header></mfe-header>
      <main className="c_CartPage">
        <h2>Basket</h2>
        {error ? <p role="alert">Failed to load basket items. Please refresh.</p> : null}
        <ul className="c_CartPage__lineItems" role="list">
          {items.map((item) => (
            <LineItem key={item.sku} item={item} />
          ))}
        </ul>
        <hr />
        <p className="c_CartPage__total">Total: {total} Ø</p>
        <div className="c_CartPage__buttons">
          <ButtonLink variant="primary" intent="checkout.checkout">
            Checkout
          </ButtonLink>
          <ButtonLink variant="secondary" intent="explore.home">
            Continue Shopping
          </ButtonLink>
        </div>
        <mfe-recommendations skus={items.map((item) => item.sku).join(',')}></mfe-recommendations>
      </main>
      <mfe-footer></mfe-footer>
    </div>
  );
}
