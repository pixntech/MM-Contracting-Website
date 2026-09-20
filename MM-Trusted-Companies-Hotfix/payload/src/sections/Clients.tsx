import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { clients } from '../data/clients'
import type { Client } from '../types'

function ClientLogo({ client, label }: { client: Client; label: string }) {
  const [failed, setFailed] = useState(false)

  if (!client.logo || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center px-4 text-center">
        <span className="text-base md:text-lg font-extrabold tracking-tight text-title/75">
          {label}
        </span>
      </div>
    )
  }

  return (
    <img
      src={client.logo}
      alt={label}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="max-h-14 max-w-[150px] md:max-h-16 md:max-w-[170px] object-contain"
    />
  )
}

export function Clients() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.resolvedLanguage?.startsWith('ar') ?? false

  return (
    <section id="clients" className="py-24 md:py-32 bg-section overflow-hidden">
      <div className="content-container">
        <SectionTitle
          subtitle={t('clients.subtitle')}
          title={t('clients.title')}
          description={t('clients.description')}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {clients.map((client, index) => {
            const label = isArabic && client.nameAr ? client.nameAr : client.name

            return (
              <ScrollReveal key={client.id} delay={index * 0.05}>
                <div className="group relative h-32 md:h-36 rounded-2xl border border-border/80 bg-white px-4 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-300 group-hover:via-primary/45" />

                  <div className="h-[68px] md:h-[76px] flex items-center justify-center">
                    <ClientLogo client={client} label={label} />
                  </div>

                  <p className="mt-2 truncate text-center text-xs md:text-sm font-semibold text-muted transition-colors group-hover:text-title">
                    {label}
                  </p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
