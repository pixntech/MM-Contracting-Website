import { useMemo, memo } from 'react'
import { cn } from '../../utils/cn'

interface MarqueeProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  direction: 'left' | 'right'
  speed?: number
  className?: string
  maskEdges?: boolean
  getItemKey?: (item: T, index: number) => string
}

function MarqueeInner<T>({
  items,
  renderItem,
  direction,
  speed = 30,
  className,
  maskEdges = false,
  getItemKey = (_item, i) => String(i),
}: MarqueeProps<T>) {
  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right'

  const duration = useMemo(() => Math.max(10, 60 - speed * 55), [speed])
  const loopItems = useMemo(
    () => [...items, ...items, ...items],
    [items]
  )

  return (
    <div
      dir="ltr"
      className={cn(
        'w-full max-w-full overflow-hidden select-none scrollbar-none',
        maskEdges && '[mask-image:linear-gradient(to_right,transparent_3%,black_12%,black_88%,transparent_97%)]',
        className
      )}
      role="list"
      aria-label={
        direction === 'left'
          ? 'Scrolling content right to left'
          : 'Scrolling content left to right'
      }
    >
      <div
        dir="ltr"
        className="flex flex-row flex-nowrap w-max whitespace-nowrap hover:[animation-play-state:paused]"
        style={{
          animationName,
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          willChange: 'transform',
        }}
      >
        {loopItems.map((item, i) => {
          const originalIndex = i % items.length

          return (
            <div
              key={`${Math.floor(i / items.length)}-${getItemKey(item, originalIndex)}`}
              className="shrink-0"
              dir="auto"
            >
              {renderItem(item, originalIndex)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Marquee = memo(MarqueeInner) as typeof MarqueeInner
