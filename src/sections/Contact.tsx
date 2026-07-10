import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { COMPANY } from '../constants'
import type { ContactFormData } from '../types'

export function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    honeypot: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.honeypot) return

    const googleFormUrl = `https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?usp=pp_url`
    window.open(googleFormUrl, '_blank')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="contact" className="py-24 md:py-32 bg-white">
        <div className="content-container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Icon name="Check" size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-title mb-4">
              {t('contact.thankYou')}
            </h2>
            <p className="text-lg text-body">
              {t('contact.thankYouMessage')}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal direction="left">
            <SectionTitle
              subtitle={t('contact.subtitle')}
              title={t('contact.title')}
              description=""
              align="left"
              className="mb-8"
            />

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon name="MapPin" size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-title mb-1">{t('contact.officeAddress')}</h4>
                  <p className="text-body">{COMPANY.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon name="Phone" size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-title mb-1">{t('contact.phone')}</h4>
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="text-body hover:text-primary transition-colors"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon name="Mail" size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-title mb-1">{t('contact.email')}</h4>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-body hover:text-primary transition-colors"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon name="Clock" size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-title mb-1">{t('contact.workingHours')}</h4>
                  <p className="text-body">
                    {t('contact.workingHoursValue')}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <form
              onSubmit={handleSubmit}
              className="bg-surface p-8 md:p-10 rounded-xl border border-border"
              noValidate
            >
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-title mb-2">
                    {t('contact.formName')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-title focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-title mb-2">
                    {t('contact.formEmail')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-title focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-title mb-2">
                    {t('contact.formPhone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-title focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder={t('contact.phonePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-title mb-2">
                    {t('contact.formCompany')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-title focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder={t('contact.companyPlaceholder')}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="subject" className="block text-sm font-semibold text-title mb-2">
                  {t('contact.formSubject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-title focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={t('contact.subjectPlaceholder')}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-title mb-2">
                  {t('contact.formMessage')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-title focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Icon name="Send" size={20} />
                {t('contact.sendMessage')}
              </Button>

              <p className="text-muted text-xs mt-4 text-center">
                {t('contact.formRedirect')}
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
