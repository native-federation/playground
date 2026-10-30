import { useStyles } from '../../app';
import { getStores } from '../../data/store';
import { StoreTile } from '../../shared/components/StoreTile';
import { useRemoteElement } from '../../shared/remote-element';
import { useAsync } from '../../shared/use-async';
import { storesStyles } from './stores-styles';

export function Stores() {
  useStyles(storesStyles);
  useRemoteElement('@tractor-store/explore', 'mfe-header');
  useRemoteElement('@tractor-store/explore', 'mfe-footer');

  const { value: stores, error } = useAsync(() => getStores(), []);

  return (
    <div data-boundary-page="explore">
      <mfe-header></mfe-header>
      <main className="e_StoresPage">
        <h2>Our Stores</h2>
        <p>
          Want to see our products in person? Visit one of our stores to see
          our products up close and talk to our experts. We have stores in the
          following locations:
        </p>
        {error ? (
          <p role="alert">Failed to load store list. Please refresh.</p>
        ) : (
          <ul className="e_StoresPage_list">
            {(stores ?? []).map((s) => (
              <StoreTile key={s.id} store={s} />
            ))}
          </ul>
        )}
      </main>
      <mfe-footer></mfe-footer>
    </div>
  );
}
