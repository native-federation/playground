import { NavigateLink } from '@react-internal/navigation';
import { useScopedStyles } from '@react-internal/mfe-runtime';
import { useCdnBase } from '@react-internal/mfe-runtime';
import { cdnUrl } from '@react-internal/mfe-runtime';
import { compactHeaderStyles } from './compact-header-styles';

export function CompactHeader() {
  useScopedStyles('checkout-compact-header', compactHeaderStyles);
  const base = useCdnBase();

  return (
    <header className="c_CompactHeader" role="banner">
      <div className="c_CompactHeader__inner">
        <NavigateLink intent="explore.home" className="c_CompactHeader__link">
          <img
            className="c_CompactHeader__logo"
            src={cdnUrl('/cdn/img/logo.svg', base)}
            alt="Micro Frontends - Tractor Store"
          />
        </NavigateLink>
      </div>
    </header>
  );
}
