import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { MilestoneCard } from '../components/ui/MilestoneCard'
import { CheckpointNode } from '../components/ui/CheckpointNode'
import {
  JourneyRoad,
  MILESTONE_COORDS,
} from '../components/ui/JourneyRoad'
import { milestones } from '../data/history'

const items = [...milestones].sort((a, b) => a.order - b.order)

function BackgroundPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="bpGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#419DF0" strokeWidth="0.4" opacity="0.04" />
        </pattern>
        <pattern id="bpDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="1" fill="#419DF0" opacity="0.035" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bpGrid)" />
      <rect width="100%" height="100%" fill="url(#bpDots)" />
    </svg>
  )
}

export function CompanyHistory() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const roadProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const observers = rowRefs.current.map((ref, i) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex((prev) => Math.max(prev, i))
          }
        },
        { threshold: 0.3, rootMargin: '-60px 0px' }
      )
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((o) => o?.disconnect())
    }
  }, [])

  return (
    <section
      id="history"
      className="relative py-16 md:py-32 bg-section overflow-hidden"
      ref={containerRef}
    >
      <BackgroundPattern />

      <div className="content-container mb-10 md:mb-16 relative z-10">
        <SectionTitle
          subtitle={t('history.subtitle')}
          title={t('history.title')}
          description={t('history.description')}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <div className="absolute inset-0 z-0 hidden md:block">
          <JourneyRoad progress={roadProgress} className="w-full h-full" />
        </div>

        <div className="relative z-10">
          {items.map((milestone, index) => {
            const coord = MILESTONE_COORDS[index]
            const isActive = index <= activeIndex
            const isLeft = coord.x < 100

            return (
              <div
                key={milestone.id}
                ref={(el) => { rowRefs.current[index] = el }}
                className="relative"
              >
                <div className="hidden md:flex items-start min-h-[420px] relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 z-20"
                    style={{ left: `${(coord.x / 200) * 100}%` }}
                  >
                    <CheckpointNode active={isActive} index={index} />
                  </div>

                  {isLeft ? (
                    <div
                      className="w-[38%]"
                      style={{ marginInlineStart: `${(coord.x / 200) * 100 + 5}%` }}
                    >
                      <MilestoneCard
                        milestone={milestone}
                        side="left"
                        isActive={isActive}
                        index={index}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-[38%] ms-auto"
                      style={{ marginInlineEnd: `${(200 - coord.x) / 2 + 5}%` }}
                    >
                      <MilestoneCard
                        milestone={milestone}
                        side="right"
                        isActive={isActive}
                        index={index}
                      />
                    </div>
                  )}
                </div>

                <div className="md:hidden">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0 w-10">
                      <div className="pt-3">
                        <CheckpointNode active={isActive} index={index} />
                      </div>
                      {index < items.length - 1 && (
                        <div
                          className={`w-[2px] flex-1 min-h-[24px] transition-colors duration-700 ${
                            index < activeIndex ? 'bg-primary' : 'bg-border/60'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pb-6">
                      <MilestoneCard
                        milestone={milestone}
                        side="left"
                        isActive={isActive}
                        index={index}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
