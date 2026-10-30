import { useEffect } from 'react';
import { useStyles } from '../../app';
import { ButtonLink } from '../../shared/components/Button';
import { useRemoteElement } from '../../shared/remote-element';
import { thanksStyles } from './thanks-styles';

type ConfettiFn = (options: Record<string, unknown>) => void;

const CONFETTI_URL = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/+esm';

export function Thanks() {
  useStyles(thanksStyles);
  useRemoteElement('@tractor-store/explore', 'mfe-header');
  useRemoteElement('@tractor-store/explore', 'mfe-footer');

  useEffect(() => {
    // `new Function(...)` keeps the URL a runtime string so esbuild won't
    // try to resolve it as a build dep.
    let cancelled = false;
    (
      new Function('u', 'return import(u)') as (u: string) => Promise<{
        default: ConfettiFn;
      }>
    )(CONFETTI_URL)
      .then((mod) => {
        if (cancelled) return;
        const confetti = mod.default;
        const end = Date.now() + 1000;
        const settings = {
          particleCount: 3,
          scalar: 1.5,
          colors: ['#FFDE54', '#FF5A54', '#54FF90'],
          spread: 70,
        };
        const frame = () => {
          confetti({ ...settings, angle: 60, origin: { x: 0 } });
          confetti({ ...settings, angle: 120, origin: { x: 1 } });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div data-boundary-page="checkout">
      <mfe-header></mfe-header>
      <main className="c_Thanks">
        <h2 className="c_Thanks__title">Thanks for your order!</h2>
        <p className="c_Thanks__text">We'll notify you, when its ready for pickup.</p>
        <ButtonLink variant="secondary" intent="explore.home">
          Continue Shopping
        </ButtonLink>
      </main>
      <mfe-footer></mfe-footer>
    </div>
  );
}
