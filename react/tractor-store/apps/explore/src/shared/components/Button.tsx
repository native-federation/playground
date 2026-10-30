import type { ButtonHTMLAttributes } from 'react';
import { useStyles } from '../../app';
import { buttonStyles } from './button-styles';

export function Button({ children, type = 'button', ...button }: ButtonHTMLAttributes<HTMLButtonElement>) {
  useStyles(buttonStyles);
  return (
    <button {...button} type={type} className="c_Button c_Button--secondary c_Button--size-normal">
      <div className="c_Button__inner">{children}</div>
    </button>
  );
}
