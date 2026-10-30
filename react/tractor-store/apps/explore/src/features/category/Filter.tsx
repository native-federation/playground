import { useStyles } from '../../app';
import type { NavLink as Link } from '../../data/nav-link';
import { NavLink } from '../../shared/nav-intent';
import { filterStyles } from './filter-styles';

export interface FilterItem {
  readonly link: Link;
  readonly name: string;
  readonly active: boolean;
}

export function Filter({ filters }: { filters: readonly FilterItem[] }) {
  useStyles(filterStyles);
  return (
    <div className="e_Filter">
      Filter:
      <ul>
        {filters.map((f) =>
          f.active ? (
            <li key={f.name} className="e_Filter__filter--active">
              {f.name}
            </li>
          ) : (
            <li key={f.name}>
              <NavLink intent={f.link.intent} payload={f.link.params}>
                {f.name}
              </NavLink>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
