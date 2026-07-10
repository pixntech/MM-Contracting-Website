import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  ariaLabel?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  external,
  onClick,
  type = 'button',
  disabled = false,
  className,
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer border-2 border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'

  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-primary-hover active:bg-primary-dark',
    secondary:
      'bg-secondary text-white hover:bg-[#0A1F33] active:bg-[#061524]',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  }

  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className)

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && 'opacity-50 cursor-not-allowed')}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
