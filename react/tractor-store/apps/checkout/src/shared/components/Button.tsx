import { useSyncExternalStore, type ReactNode, type MouseEvent } from 'react';
import { navigateTo } from '@react-internal/event-bus';
import {
  getNavIntents,
  resolveIntent,
  subscribeNavIntents,
} from '@react-internal/navigation';
import type { NavPayload } from '@react-internal/url';
import { useScopedStyles } from '../shadow-root-context';
import { buttonStyles } from './button-styles';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'normal';

export interface ButtonProps {
  readonly type?: 'button' | 'submit' | 'reset';
  readonly value?: string;
  readonly disabled?: boolean;
  readonly rounded?: boolean;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly dataId?: string;
  readonly title?: string;
  readonly extraClass?: string;
  readonly navigateTo?: string;
  readonly navParams?: NavPayload;
  readonly onClick?: (event: MouseEvent<HTMLElement>) => void;
  readonly children?: ReactNode;
}

const buildClass = (
  variant: ButtonVariant,
  size: ButtonSize,
  rounded: boolean,
  extra?: string,
): string => {
  const classes = ['c_Button', `c_Button--${variant}`, `c_Button--size-${size}`];
  if (rounded) classes.push('c_Button--rounded');
  if (extra) classes.push(extra);
  return classes.join(' ');
};

export function Button(props: ButtonProps) {
  useScopedStyles('ui-button', buttonStyles);
  // Keep href in sync with the host's `nav:intents` broadcast — without this
  // a Button rendered before the map arrives stays at href="#".
  useSyncExternalStore(subscribeNavIntents, getNavIntents, getNavIntents);
  const {
    type = 'button',
    value,
    disabled = false,
    rounded = false,
    variant = 'secondary',
    size = 'normal',
    dataId,
    title,
    extraClass,
    navigateTo: navIntent,
    navParams,
    onClick,
    children,
  } = props;

  const className = buildClass(variant, size, rounded, extraClass);
  const inner = <div className="c_Button__inner">{children}</div>;

  if (navIntent) {
    const href = resolveIntent(navIntent, navParams) ?? '#';
    const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigateTo.emit({ id: navIntent, payload: navParams ?? {} });
      onClick?.(event);
    };
    return (
      <a
        className={className}
        href={href}
        data-id={dataId}
        title={title}
        onClick={handleClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      className={className}
      type={type}
      data-id={dataId}
      title={title}
      value={value}
      disabled={disabled}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
