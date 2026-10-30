import { useCdn, useStyles } from '../../app';
import { HOME_SEED_SKUS } from '../../data/recommendation';
import { getTeasers } from '../../data/teaser';
import { NavLink } from '../../shared/nav-intent';
import { useRemoteElement } from '../../shared/remote-element';
import { useAsync } from '../../shared/use-async';
import { homeStyles } from './home-styles';

export function Home() {
  useStyles(homeStyles);
  useRemoteElement('@tractor-store/explore', 'mfe-header');
  useRemoteElement('@tractor-store/explore', 'mfe-recommendations');
  useRemoteElement('@tractor-store/explore', 'mfe-footer');
  const cdn = useCdn();

  const { value: teasers, error } = useAsync(() => getTeasers(), []);

  return (
    <div data-boundary-page="explore">
      <mfe-header></mfe-header>
      <main className="e_HomePage">
        {error ? (
          <p role="alert">Failed to load teasers. Please refresh.</p>
        ) : (
          (teasers ?? []).map((t) => (
            <NavLink
              key={t.title}
              intent={t.link.intent}
              payload={t.link.params}
              className="e_HomePage__categoryLink"
            >
              <img
                src={cdn.src(t.image, 500)}
                srcSet={cdn.srcSet(t.image, [500, 1000])}
                sizes="100vw, (min-width: 500px) 50vw"
                alt=""
              />
              {t.title}
            </NavLink>
          ))
        )}
        <div className="e_HomePage__recommendations">
          <mfe-recommendations skus={HOME_SEED_SKUS.join(',')}></mfe-recommendations>
        </div>
      </main>
      <mfe-footer></mfe-footer>
    </div>
  );
}
