import { cn } from '@/utils/tailwind'
import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'default';
type ButtonMode = 'default' | 'icon';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: ButtonVariant;
  mode?: ButtonMode;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  default: 'bg-white text-secondary',
}

const buttonModes: Record<ButtonMode, string> = {
  'default': 'w-full rounded',
  'icon': 'rounded-full'
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    variant = 'secondary',
    mode = 'default',
    ...restProps
  } = props;

  return (
    <button className={cn(`p-2 text-white text-sm transition-all hover:bg-opacity-90 ${buttonVariants[variant]} ${buttonModes[mode]}`, className)} {...restProps}>
      {children}
    </button>
  )
}

export default Button
