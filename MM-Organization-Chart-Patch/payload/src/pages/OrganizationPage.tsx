import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Icon } from '../components/ui/Icon'
import {
  countOrganizationRoles,
  organizationChairman,
  organizationDepartments,
  type OrganizationRole,
} from '../data/organization'

function RoleTree({
  nodes,
  isArabic,
  depth = 0,
}: {
  nodes: OrganizationRole[]
  isArabic: boolean
  depth?: number
}) {
  if (!nodes.length) return null

  return (
    <div className={depth === 0 ? 'space-y-3' : 'mt-3 ms-3 border-s border-primary/20 ps-5 space-y-3'}>
      {nodes.map((node) => (
        <div key={node.id} className="relative">
          {depth > 0 && (
            <span
              aria-hidden="true"
              className="absolute top-5 -start-5 h-px w-5 bg-primary/20"
            />
          )}
          <div
            className={
              depth === 0
                ? 'rounded-xl border border-border/80 bg-white px-4 py-3.5 shadow-sm'
                : 'rounded-xl border border-border/70 bg-surface/70 px-4 py-3'
            }
          >
            <p className="text-sm font-semibold leading-6 text-title">
              {isArabic ? node.titleAr : node.titleEn}
            </p>
          </div>
          {node.children && node.children.length > 0 && (
            <RoleTree nodes={node.children} isArabic={isArabic} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  )
}

export function OrganizationPage() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const roleCount = 1 + countOrganizationRoles(organizationDepartments)

  return (
    <div className="pt-20 md:pt-24 pb-24 bg-white">
      <section className="relative overflow-hidden bg-secondary py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -start-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-44 -end-24 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute top-1/2 start-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="content-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-primary backdrop-blur-sm"
          >
            <Icon name="Users" size={26} />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="inline-block text-accent font-semibold text-sm tracking-[0.18em] uppercase mb-4"
          >
            {t('organization.pageSubtitle')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5"
          >
            {t('organization.pageTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-base md:text-lg leading-8 text-white/70"
          >
            {t('organization.pageDescription')}
          </motion.p>
        </div>
      </section>

      <section className="content-container -mt-8 relative z-20">
        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
          <div className="rounded-2xl border border-border/70 bg-white p-5 md:p-6 text-center shadow-lg shadow-secondary/5">
            <p className="text-3xl md:text-4xl font-extrabold text-secondary">{organizationDepartments.length}</p>
            <p className="mt-1 text-sm font-medium text-body">{t('organization.departmentsCount')}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-white p-5 md:p-6 text-center shadow-lg shadow-secondary/5">
            <p className="text-3xl md:text-4xl font-extrabold text-primary">{roleCount}</p>
            <p className="mt-1 text-sm font-medium text-body">{t('organization.rolesCount')}</p>
          </div>
        </div>
      </section>

      <section className="content-container pt-16 md:pt-20">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">
            <Icon name="Check" size={14} />
            {t('organization.sourceBadge')}
          </span>

          <div className="mt-7 rounded-3xl bg-gradient-to-br from-secondary to-primary-dark p-[1px] shadow-xl shadow-secondary/10">
            <div className="rounded-[23px] bg-secondary px-6 py-7 md:px-10 md:py-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-primary">
                <Icon name={organizationChairman.icon ?? 'Building2'} size={23} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                {t('organization.chairmanLevel')}
              </p>
              <h2 className="mt-2 text-xl md:text-2xl font-bold text-white">
                {isArabic ? organizationChairman.titleAr : organizationChairman.titleEn}
              </h2>
            </div>
          </div>

          <div className="mx-auto h-10 w-px bg-gradient-to-b from-primary to-primary/20" aria-hidden="true" />
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-body shadow-sm">
            <Icon name="ChevronDown" size={15} className="text-primary" />
            {t('organization.departmentsLabel')}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {organizationDepartments.map((department, index) => (
            <motion.article
              key={department.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-secondary/5"
            >
              <div className="border-b border-border/60 bg-gradient-to-br from-secondary/[0.035] to-primary/[0.07] p-5 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary shadow-sm">
                    <Icon name={department.icon ?? 'Briefcase'} size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {t('organization.departmentLabel')}
                    </p>
                    <h3 className="mt-1 text-lg font-bold leading-7 text-title">
                      {isArabic ? department.titleAr : department.titleEn}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                {department.children && department.children.length > 0 ? (
                  <RoleTree nodes={department.children} isArabic={isArabic} />
                ) : (
                  <p className="text-sm text-muted">{t('organization.noDirectReports')}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 md:mt-12 rounded-2xl border border-primary/15 bg-primary/[0.035] p-5 md:p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon name="Check" size={18} />
            </div>
            <div>
              <p className="font-semibold text-title">{t('organization.sourceNoteTitle')}</p>
              <p className="mt-1 text-sm leading-6 text-body">{t('organization.sourceNote')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
