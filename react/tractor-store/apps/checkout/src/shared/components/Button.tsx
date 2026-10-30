import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { NavPayload } from '@tractor-store/contracts';
import { useStyles } from '../../app';
import { NavLink } from '../nav-intent';
import { buttonStyles } from './button-styles';

interface Look {
  readonly variant?: 'primary' | 'secondary';
  readonly size?: 'small' | 'normal';
  readonly rounded?: boolean;
  readonly className?: string;
}

const classes = ({ variant = 'secondary', size = 'normal', rounded, className }: Look): string =>
  [
    'c_Button',
    `c_Button--${variant}`,
    `c_Button--size-${size}`,
    rounded && 'c_Button--rounded',
    className,
  ]
    .filter(Boolean)
    .join(' ');

export function Button({
  variant,
  size,
  rounded,
  className,
  type = 'button',
  children,
  ...button
}: Look & ButtonHTMLAttributes<HTMLButtonElement>) {
  useStyles(buttonStyles);
  return (
    <button {...button} type={type} className={classes({ variant, size, rounded, className })}>
      <div className="c_Button__inner">{children}</div>
    </button>
  );
}

// A Button that opens a page by intent id.
export function ButtonLink({
  intent,
  payload,
  title,
  children,
  ...look
}: Look & {
  readonly intent: string;
  readonly payload?: NavPayload;
  readonly title?: string;
  readonly children?: ReactNode;
}) {
  useStyles(buttonStyles);
  return (
    <NavLink intent={intent} payload={payload} title={title} className={classes(look)}>
      <div className="c_Button__inner">{children}</div>
    </NavLink>
  );
}
