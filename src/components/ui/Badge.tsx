import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'
  className?: string
}

export function Badge({
  children,
  variant = 'primary',
  className,
}: BadgeProps) {
  const variantStyles = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-[#B8860B]',
    outline: 'bg-transparent border border-border text-body',
  }

  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-semibold rounded-full',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
