import Icon from './Icon'
import { EDUCATION } from '../data'
import { useLanguage } from '../hooks/useLanguage'

export default function Education() {
  const { t } = useLanguage()

  return (
    <section className="education" id="education">
      <div className="education__wrap">
        <div className="education__header">
          <h2 className="education__title">
            <span className="education__index">06.</span> {t(EDUCATION.title)}
          </h2>
          <p className="education__subtitle">{t(EDUCATION.subtitle)}</p>
        </div>
        <div className="education__grid">
          {EDUCATION.items.map((edu) => (
            <div key={t(edu.degree)} className={`education__card education__card--${edu.color}`}>
              <div className="education__meta">
                <Icon name={edu.icon} className="education__icon" />
                <span className="education__period">{t(edu.period)}</span>
              </div>
              <h3 className="education__card-title">{t(edu.degree)}</h3>
              <p className="education__university">{t(edu.university)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
