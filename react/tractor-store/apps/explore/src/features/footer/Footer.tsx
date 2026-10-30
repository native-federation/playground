import { useCdn, useStyles } from '../../app';
import { footerStyles } from './footer-styles';

export function Footer() {
  useStyles(footerStyles);
  const cdn = useCdn();

  return (
    <footer className="e_Footer" data-boundary="explore">
      <div className="e_Footer__cutter">
        <div className="e_Footer__inner">
          <div className="e_Footer__initiative">
            <img
              src={cdn.src('/cdn/img/neulandlogo.svg')}
              alt="neuland - Büro für Informatik"
              width={45}
              height={40}
            />
            <p>
              based on{' '}
              <a href="https://micro-frontends.org/tractor-store/" target="_blank" rel="noreferrer">
                the tractor store 2.0
              </a>
              <br />
              a{' '}
              <a href="https://neuland-bfi.de" target="_blank" rel="noreferrer">
                neuland
              </a>{' '}
              project
            </p>
          </div>

          <div className="e_Footer__credits">
            <h3>techstack</h3>
            <p>React 18, native federation, custom elements, hooks</p>
            <p className="e_Footer__buildBy">
              <span>build by</span>
              <img
                src="https://native-federation.com/images/logo-neu3.png"
                alt="Native federation logo"
                width={25}
                height={25}
              />
              <a href="https://native-federation.com" target="_blank" rel="noreferrer">
                Native federation
              </a>
              <span>/</span>
              <a
                href="https://github.com/native-federation/angular-examples"
                target="_blank"
                rel="noreferrer"
              >
                github
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
