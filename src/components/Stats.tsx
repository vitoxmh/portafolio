import { STATS } from '../data'
import { useLanguage } from '../hooks/useLanguage'

export default function Stats() {
  const { t } = useLanguage()

  return (
    <section className="stats">
      <div className="stats__grid">
        {STATS.map((stat, i) => (
          <div key={i} className="stats__card">
            <span className={`stats__value${stat.variant ? ` stats__value--${stat.variant}` : ''}`}>
              {stat.value}
            </span>
            <span className="stats__label">{t(stat.label)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
