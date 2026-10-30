import { useCdn, useStyles } from '../../app';
import { NavLink } from '../nav-intent';
import { compactHeaderStyles } from './compact-header-styles';

export function CompactHeader() {
  useStyles(compactHeaderStyles);
  const cdn = useCdn();

  return (
    <header className="c_CompactHeader" role="banner">
      <div className="c_CompactHeader__inner">
        <NavLink intent="explore.home" className="c_CompactHeader__link">
          <img
            className="c_CompactHeader__logo"
            src={cdn.src('/cdn/img/logo.svg')}
            alt="Micro Frontends - Tractor Store"
          />
        </NavLink>
      </div>
    </header>
  );
}
