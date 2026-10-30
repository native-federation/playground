import { type FormEvent } from 'react';
import { NavigateLink } from '@react-internal/navigation';
import { Button } from '@react-internal/ui';
import { useScopedStyles } from '@react-internal/mfe-runtime';
import { useCdnBase } from '@react-internal/mfe-runtime';
import { useCart } from '../../cart/use-cart';
import { imgSrc, imgSrcset } from '@react-internal/mfe-runtime';
import { lineItemStyles } from './line-item-styles';

export interface LineItemView {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  total: number;
  image: string;
}

export function LineItem({ item }: { item: LineItemView }) {
  useScopedStyles('checkout-line-item', lineItemStyles);
  const cart = useCart();
  const base = useCdnBase();
  const params = { id: item.id, sku: item.sku };

  const onRemove = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    cart.remove(item.sku);
  };

  return (
    <li className="c_LineItem" role="listitem">
      <NavigateLink intent="decide.product" params={params} className="c_LineItem__image">
        <img
          src={imgSrc(item.image, 200, base)}
          srcSet={imgSrcset(item.image, [200, 400], base)}
          sizes="200px"
          alt={item.name}
          width={200}
          height={200}
        />
      </NavigateLink>
      <div className="c_LineItem__details">
        <NavigateLink intent="decide.product" params={params} className="c_LineItem__name">
          <strong>{item.name}</strong>
          <br />
          {item.sku}
        </NavigateLink>
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
