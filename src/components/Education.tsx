import Icon from './Icon'
import { useLanguage } from '../hooks/useLanguage'
import type { TranslationKey } from '../i18n'

const EDUCATION: {
  icon: string
  color: 'primary' | 'secondary'
  degreeKey: TranslationKey
  universityKey: TranslationKey
  periodKey: TranslationKey
}[] = [
  {
    icon: 'account_balance',
    color: 'primary',
    degreeKey: 'education.item1.degree',
    universityKey: 'education.item1.university',
    periodKey: 'education.item1.period',
  },
  {
    icon: 'school',
    color: 'secondary',
    degreeKey: 'education.item2.degree',
    universityKey: 'education.item2.university',
    periodKey: 'education.item2.period',
  },
]

export default function Education() {
  const { t } = useLanguage()

  return (
    <section className="education" id="education">
      <div className="education__wrap">
        <div className="education__header">
          <h2 className="education__title">
            <span className="education__index">05.</span> {t('education.title')}
          </h2>
          <p className="education__subtitle">{t('education.subtitle')}</p>
        </div>
        <div className="education__grid">
          {EDUCATION.map((edu) => (
            <div key={edu.degreeKey} className={`education__card education__card--${edu.color}`}>
              <div className="education__meta">
                <Icon name={edu.icon} className="education__icon" />
                <span className="education__period">{t(edu.periodKey)}</span>
              </div>
              <h3 className="education__card-title">{t(edu.degreeKey)}</h3>
              <p className="education__university">{t(edu.universityKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
