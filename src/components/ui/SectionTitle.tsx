import { cn } from '../../utils/cn'

interface SectionTitleProps {
  subtitle?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({
  subtitle,
  title,
  description,
  align = 'center',
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'max-w-3xl mb-16',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {subtitle && (
        <span className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-title mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-body text-lg md:text-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
