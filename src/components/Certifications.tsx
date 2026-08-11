import Icon from './Icon'
import { useLanguage } from '../hooks/useLanguage'
import type { TranslationKey } from '../i18n'

const CERTIFICATIONS: {
  icon: string
  color: 'primary' | 'secondary' | 'tertiary'
  year: string
  titleKey: TranslationKey
  issuerKey: TranslationKey
  href: string
}[] = [
  {
    icon: 'school',
    color: 'primary',
    year: '2026',
    titleKey: 'certs.item1.title',
    issuerKey: 'certs.item1.issuer',
    href: '#',
  },
  {
    icon: 'verified',
    color: 'secondary',
    year: '2026',
    titleKey: 'certs.item2.title',
    issuerKey: 'certs.item2.issuer',
    href: '#',
  },
  {
    icon: 'groups',
    color: 'tertiary',
    year: '2026',
    titleKey: 'certs.item3.title',
    issuerKey: 'certs.item3.issuer',
    href: '#',
  },
]

export default function Certifications() {
  const { t } = useLanguage()

  return (
    <section className="certs" id="certifications">
      <div className="certs__wrap">
        <div className="certs__header">
          <h2 className="certs__title">
            <span className="certs__index">06.</span> {t('certs.title')}
          </h2>
          <p className="certs__subtitle">{t('certs.subtitle')}</p>
        </div>
        <div className="certs__grid">
          {CERTIFICATIONS.map((cert) => (
            <a
              key={cert.titleKey}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`certs__card certs__card--${cert.color}`}
            >
              <div className="certs__meta">
                <Icon name={cert.icon} />
                <span className="certs__year">{cert.year}</span>
              </div>
              <h3 className="certs__card-title">{t(cert.titleKey)}</h3>
              <p className="certs__issuer">{t(cert.issuerKey)}</p>
              <span className="certs__verify">
                <Icon name="open_in_new" className="certs__verify-icon" />
                {t('certs.verify')}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
