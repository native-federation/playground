import type { FormEvent } from 'react';
import { useCdn, useStyles } from '../../app';
import { useCart } from '../../data/cart-store';
import { NavLink } from '../nav-intent';
import { Button } from './Button';
import { lineItemStyles } from './line-item-styles';

export interface LineItemView {
  readonly id: string;
  readonly name: string;
  readonly sku: string;
  readonly quantity: number;
  readonly total: number;
  readonly image: string;
}

export function LineItem({ item }: { item: LineItemView }) {
  useStyles(lineItemStyles);
  const cart = useCart();
  const cdn = useCdn();
  const payload = { id: item.id, sku: item.sku };

  const onRemove = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    cart.remove(item.sku);
  };

  return (
    <li className="c_LineItem" role="listitem">
      <NavLink intent="decide.product" payload={payload} className="c_LineItem__image">
        <img
          src={cdn.src(item.image, 200)}
          srcSet={cdn.srcSet(item.image, [200, 400])}
          sizes="200px"
          alt={item.name}
          width={200}
          height={200}
        />
      </NavLink>
      <div className="c_LineItem__details">
        <NavLink intent="decide.product" payload={payload} className="c_LineItem__name">
          <strong>{item.name}</strong>
          <br />
          {item.sku}
        </NavLink>
        <div className="c_LineItem__quantity">
          <span>{item.quantity}</span>
          <form onSubmit={onRemove}>
            <input type="hidden" name="sku" value={item.sku} />
            <Button
              type="submit"
              value="remove"
              variant="secondary"
              rounded
              size="small"
              title={`Remove ${item.name} from cart`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                height="20"
                width="20"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#000"
                  d="m40 5.172-16 16-16-16L5.171 8l16.001 16L5.171 40 8 42.828l16-16 16 16L42.828 40l-16-16 16-16L40 5.172Z"
                />
              </svg>
            </Button>
          </form>
        </div>
        <div className="c_LineItem__price">{item.total} Ø</div>
      </div>
    </li>
  );
}
