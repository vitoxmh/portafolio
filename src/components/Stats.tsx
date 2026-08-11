import { useLanguage } from '../hooks/useLanguage'

export default function Stats() {
  const { t } = useLanguage()

  return (
    <section className="stats">
      <div className="stats__grid">
        <div className="stats__card">
          <span className="stats__value">17+</span>
          <span className="stats__label">{t('stats.years')}</span>
        </div>
        <div className="stats__card">
          <span className="stats__value stats__value--secondary">50+</span>
          <span className="stats__label">{t('stats.projects')}</span>
        </div>
      </div>
    </section>
  )
}
