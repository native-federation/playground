import { useCdn, useStyles } from '../../app';
import { NavLink } from '../../shared/nav-intent';
import { useRemoteElement } from '../../shared/remote-element';
import { Navigation } from './Navigation';
import { headerStyles } from './header-styles';

export function Header() {
  useStyles(headerStyles);
  useRemoteElement('@tractor-store/checkout', 'mfe-mini-cart');
  const cdn = useCdn();

  return (
    <header className="e_Header" data-boundary="explore">
      <div className="e_Header__cutter">
        <div className="e_Header__inner">
          <NavLink intent="explore.home" className="e_Header__link">
            <img
              className="e_Header__logo"
              src={cdn.src('/cdn/img/logo.svg')}
              alt="Micro Frontends - Tractor Store"
            />
          </NavLink>
          <div className="e_Header__navigation">
            <Navigation />
          </div>
          <div className="e_Header__cart">
            <mfe-mini-cart></mfe-mini-cart>
          </div>
        </div>
      </div>
    </header>
  );
}
