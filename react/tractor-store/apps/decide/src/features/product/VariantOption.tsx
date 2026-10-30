import type { CSSProperties } from 'react';
import { useStyles } from '../../app';
import { NavLink } from '../../shared/nav-intent';
import { variantOptionStyles } from './variant-option-styles';

interface Props {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly color: string;
  readonly selected?: boolean;
}

export function VariantOption({ id, sku, name, color, selected = false }: Props) {
  useStyles(variantOptionStyles);

  // React's CSSProperties has no custom properties.
  const style = { '--variant-color': color } as CSSProperties;

  return (
    <li className="d_VariantOption" style={style}>
      <i className="d_VariantOption__color"></i>
      {selected ? (
        <strong>{name}</strong>
      ) : (
        <NavLink intent="decide.product" payload={{ id, sku }}>
          {name}
        </NavLink>
      )}
    </li>
  );
}
