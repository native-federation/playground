import type { RouteParams } from '@tractor-store/contracts';
import { useCdn, useStyles } from '../../app';
import { getProductById } from '../../data/product';
import { useRemoteElement } from '../../shared/remote-element';
import { useAsync } from '../../shared/use-async';
import { VariantOption } from './VariantOption';
import { productStyles } from './product-styles';

const param = (params: RouteParams, key: string) =>
  typeof params[key] === 'string' ? params[key] : undefined;

export function Product({ routeParams = {} }: { routeParams?: RouteParams }) {
  useStyles(productStyles);
  useRemoteElement('@tractor-store/explore', 'mfe-header');
  useRemoteElement('@tractor-store/checkout', 'mfe-add-to-cart');
  useRemoteElement('@tractor-store/explore', 'mfe-recommendations');
  useRemoteElement('@tractor-store/explore', 'mfe-footer');
  const cdn = useCdn();

  const id = param(routeParams, 'id');
  const sku = param(routeParams, 'sku');

  const { value: product, isLoading, error } = useAsync(() => getProductById(id), [id]);

  if (error || !product) {
    return (
      <div data-boundary-page="decide">
        <mfe-header></mfe-header>
        <main className="d_ProductPage">
          {error ? (
            <p role="alert">Failed to load this product. Please refresh.</p>
          ) : isLoading ? (
            <p>Loading…</p>
          ) : (
            <p>Product not found.</p>
          )}
        </main>
        <mfe-footer></mfe-footer>
      </div>
    );
  }

  const selected = product.variants.find((v) => v.sku === sku) ?? product.variants[0];

  return (
    <div data-boundary-page="decide">
      <mfe-header></mfe-header>
      <main className="d_ProductPage">
        <div className="d_ProductPage__details">
          <img
            className="d_ProductPage__productImage"
            src={selected ? cdn.src(selected.image, 400) : ''}
            srcSet={selected ? cdn.srcSet(selected.image, [400, 800]) : undefined}
            sizes="400px"
            width={400}
            height={400}
            alt={selected ? `${product.name} - ${selected.name}` : ''}
          />
          <div className="d_ProductPage__productInformation">
            <h2 className="d_ProductPage__title">{product.name}</h2>
            <ul className="d_ProductPage__highlights">
              {product.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <ul className="d_ProductPage__variants">
              {product.variants.map((v) => (
                <VariantOption
                  key={v.sku}
                  id={product.id}
                  sku={v.sku}
                  name={v.name}
                  color={v.color}
                  selected={v.sku === selected?.sku}
                />
              ))}
            </ul>
            <mfe-add-to-cart sku={selected?.sku ?? ''}></mfe-add-to-cart>
          </div>
        </div>
        <mfe-recommendations skus={selected?.sku ?? ''}></mfe-recommendations>
      </main>
      <mfe-footer></mfe-footer>
    </div>
  );
}
