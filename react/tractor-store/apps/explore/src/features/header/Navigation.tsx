import { useStyles } from '../../app';
import { NavLink } from '../../shared/nav-intent';
import { navigationStyles } from './navigation-styles';

export function Navigation() {
  useStyles(navigationStyles);
  return (
    <nav className="e_Navigation">
      <ul className="e_Navigation__list">
        <li className="e_Navigation__item">
          <NavLink intent="explore.products">Machines</NavLink>
        </li>
        <li className="e_Navigation__item">
          <NavLink intent="explore.stores">Stores</NavLink>
        </li>
      </ul>
    </nav>
  );
}
