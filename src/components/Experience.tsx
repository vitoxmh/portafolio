import Icon from './Icon'
import { EXPERIENCE } from '../data'
import { useLanguage } from '../hooks/useLanguage'

export default function Experience() {
  const { t, tList } = useLanguage()

  return (
    <section className="experience" id="experience">
      <div className="experience__wrap">
        <div className="experience__header">
          <h2 className="experience__title">
            <span className="experience__index">02.</span> {t(EXPERIENCE.title)}
          </h2>
          <p className="experience__subtitle">{t(EXPERIENCE.subtitle)}</p>
        </div>
        <div className="experience__timeline">
          <div className="experience__line"></div>
          <div className="experience__items">
            {EXPERIENCE.jobs.map((job) => (
              <div
                key={job.id}
                className={`experience__item${job.reversed ? ' experience__item--reversed' : ''}`}
              >
                <span className="experience__mobile-dot"></span>
                <div className="experience__job">
                  <h3 className="experience__job-title">{t(job.title)}</h3>
                  <div className="experience__company">
                    <Icon name="business" className="experience__company-icon" />{' '}
                    {t(job.company)}
                  </div>
                  <span className="experience__period">{t(job.period)}</span>
                </div>
                <div className="experience__marker">
                  <div className="experience__marker-dot"></div>
                </div>
                <div className="experience__card">
                  <ul className="experience__desc">
                    {tList(job.desc).map((item) => (
                      <li key={item} className="experience__desc-item">
                        <span className="experience__bullet"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="experience__tech">
                    {job.tech.map((tag) => (
                      <span key={tag} className="experience__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
