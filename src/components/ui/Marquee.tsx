import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'
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

export function Marquee<T>({
  items,
  renderItem,
  direction,
  speed = 0.1,
  className,
  maskEdges = false,
  getItemKey = (_item, i) => String(i),
}: MarqueeProps<T>) {
  const [paused, setPaused] = useState(false)
  const x = useMotionValue(0)
  const setWidthRef = useRef(0)
  const timeRef = useRef(0)
  const innerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = useCallback(() => setPaused(true), [])
  const handleMouseLeave = useCallback(() => setPaused(false), [])

  useEffect(() => {
    if (innerRef.current) {
      const w = innerRef.current.scrollWidth / 2
      setWidthRef.current = w
      if (direction === 'right') {
        x.set(-w)
      }
    }
  }, [items, direction, x])

  useAnimationFrame((time) => {
    if (timeRef.current === 0) timeRef.current = time
    const delta = time - timeRef.current
    timeRef.current = time

    if (!paused && setWidthRef.current > 0) {
      const move = direction === 'left' ? -speed : speed
      const next = x.get() + move * (delta / 16.67)
      x.set(next)

      if (direction === 'left' && next <= -setWidthRef.current) {
        x.set(next + setWidthRef.current)
      } else if (direction === 'right' && next >= 0) {
        x.set(next - setWidthRef.current)
      }
    }
  })

  return (
    <div
      className={cn(
        'overflow-hidden select-none',
        maskEdges &&
          '[mask-image:linear-gradient(to_right,transparent_3%,black_12%,black_88%,transparent_97%)]',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="list"
      aria-label={
        direction === 'left'
          ? 'Scrolling content right to left'
          : 'Scrolling content left to right'
      }
    >
      <motion.div
        ref={innerRef}
        className="flex"
        style={{ x, willChange: 'transform' }}
        aria-hidden={false}
      >
        <div className="flex shrink-0">{items.map((item, i) => (
          <div key={`a-${getItemKey(item, i)}`} className="shrink-0">
            {renderItem(item, i)}
          </div>
        ))}</div>
        <div className="flex shrink-0" aria-hidden="true">{items.map((item, i) => (
          <div key={`b-${getItemKey(item, i)}`} className="shrink-0">
            {renderItem(item, i)}
          </div>
        ))}</div>
      </motion.div>
    </div>
  )
}
