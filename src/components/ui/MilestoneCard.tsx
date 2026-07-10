import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'
import type { HistoryMilestone } from '../../types'

interface MilestoneCardProps {
  milestone: HistoryMilestone
  side: 'left' | 'right'
  isActive: boolean
  index: number
}

const statLabelKeys: Record<string, string> = {
  'Stories': 'common.stories',
  'Height': 'common.height',
  'Employees': 'common.employees',
  'Countries': 'about.countries',
  'Projects': 'common.projects',
  'Professionals': 'common.professionals',
}

export function MilestoneCard({
  milestone,
  side,
  isActive,
  index,
}: MilestoneCardProps) {
  const { t } = useTranslation()
  const hasStats = milestone.stats && milestone.stats.length > 0
  const hasImage = !!milestone.image
  const hasIcon = !!milestone.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`${side === 'right' ? 'md:text-end' : ''}`}
    >
      <div
        className={`bg-white rounded-2xl border border-border/60 shadow-sm transition-all duration-500 group w-full overflow-hidden ${
          isActive
            ? 'shadow-[0_8px_30px_rgba(65,157,240,0.08)] border-primary/10'
            : 'hover:shadow-lg hover:border-border'
        }`}
      >
        {hasImage && (
          <div className="relative h-36 md:h-44 overflow-hidden">
            <img
              src={milestone.image}
              alt={milestone.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}

        <div className="p-4 md:p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="text-2xl md:text-4xl font-extrabold text-primary leading-none tracking-tight">
              {milestone.year}
            </span>
            {hasIcon && (
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                <Icon
                  name={milestone.icon!}
                  size={20}
                  className="text-primary"
                />
              </div>
            )}
          </div>

          <div
            className={`flex flex-wrap items-start gap-2 mb-2 ${
              side === 'right' ? 'md:flex-row-reverse' : ''
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-title leading-snug">
              {t(`history.milestones.${milestone.id}.title`)}
            </h3>
            {milestone.achievement && (
              <span
                className={`self-start text-[11px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full whitespace-nowrap ${
                  side === 'right' ? 'md:mr-auto' : ''
                }`}
              >
                {t(`history.milestones.${milestone.id}.achievement`)}
              </span>
            )}
          </div>

          <p className="text-sm text-body leading-relaxed mb-3">
            {t(`history.milestones.${milestone.id}.description`)}
          </p>

          {milestone.highlight && (
            <div className="flex items-center gap-2 mb-3 py-2 px-3 bg-primary/5 rounded-lg border-s-2 border-primary">
              <Icon name="Star" size={14} className="text-primary shrink-0" />
              <span className="text-xs text-primary/80 font-medium leading-snug">
                {t(`history.milestones.${milestone.id}.highlight`)}
              </span>
            </div>
          )}

          {hasStats && (
            <div className="flex flex-wrap gap-3 pt-2 border-t border-border/60">
              {milestone.stats!.map((stat) => (
                <div key={stat.label} className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted">
                    {t(statLabelKeys[stat.label] || stat.label)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
