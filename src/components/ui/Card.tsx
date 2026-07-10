import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({
  children,
  className,
  hover = false,
  padding = 'md',
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={cn(
        'bg-white border border-border rounded-lg overflow-hidden transition-all duration-300',
        hover && 'hover:shadow-lg hover:-translate-y-1',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
