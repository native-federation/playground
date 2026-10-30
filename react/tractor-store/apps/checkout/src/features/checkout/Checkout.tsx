import { useEffect, useState, type FormEvent } from 'react';
import type { Events } from '@tractor-store/contracts';
import { useStyles } from '../../app';
import { useCart } from '../../data/cart-store';
import { Button, ButtonLink } from '../../shared/components/Button';
import { CompactHeader } from '../../shared/components/CompactHeader';
import { useRemoteElement } from '../../shared/remote-element';
import { checkoutStyles } from './checkout-styles';

export function Checkout() {
  useStyles(checkoutStyles);
  useRemoteElement('@tractor-store/explore', 'mfe-store-picker');
  useRemoteElement('@tractor-store/explore', 'mfe-footer');

  const cart = useCart();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [storeId, setStoreId] = useState('');

  useEffect(
    () =>
      window.__NF_REGISTRY__!.on<Events['store:selected']>('store:selected', ({ data }) =>
        setStoreId(data.id),
      ),
    [],
  );

  const isReady = Boolean(firstname && lastname && storeId);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!isReady) return;
    cart.clear();
    window.__NF_REGISTRY__!.emit<Events['nav:navigate']>('nav:navigate', {
      id: 'checkout.thanks',
    });
  };

  return (
    <div data-boundary-page="checkout">
      <CompactHeader />
      <main className="c_Checkout">
        <h2>Checkout</h2>
        <form className="c_Checkout__form" onSubmit={onSubmit}>
          <h3>Personal Data</h3>
          <fieldset className="c_Checkout__name">
            <div>
              <label className="c_Checkout__label" htmlFor="c_firstname">
                First name
              </label>
              <input
                className="c_Checkout__input"
                type="text"
                id="c_firstname"
                name="firstname"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label className="c_Checkout__label" htmlFor="c_lastname">
                Last name
              </label>
              <input
                className="c_Checkout__input"
                type="text"
                id="c_lastname"
                name="lastname"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </fieldset>

          <h3>Store Pickup</h3>
          <fieldset>
            <div className="c_Checkout__store">
              <mfe-store-picker></mfe-store-picker>
            </div>
            <label className="c_Checkout__label" htmlFor="c_storeId">
              Store ID
            </label>
            <input
              className="c_Checkout__input"
              type="text"
              id="c_storeId"
              name="storeId"
              readOnly
              required
              value={storeId}
            />
          </fieldset>

          <div className="c_Checkout__buttons">
            <Button type="submit" variant="primary" disabled={!isReady}>
              place order
            </Button>
            <ButtonLink variant="secondary" intent="checkout.cart">
              back to cart
            </ButtonLink>
          </div>
        </form>
      </main>
      <mfe-footer></mfe-footer>
    </div>
  );
}
