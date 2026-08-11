import Icon from './Icon'
import { useLanguage } from '../hooks/useLanguage'

export default function Experience() {
  const { t, tList } = useLanguage()

  return (
    <section className="experience" id="experience">
      <div className="experience__wrap">
        <div className="experience__header">
          <h2 className="experience__title">
            <span className="experience__index">02.</span> {t('exp.title')}
          </h2>
          <p className="experience__subtitle">{t('exp.subtitle')}</p>
        </div>
        <div className="experience__timeline">
          <div className="experience__line"></div>
          <div className="experience__items">
            <div className="experience__item">
              <span className="experience__mobile-dot"></span>
              <div className="experience__job">
                <h3 className="experience__job-title">{t('exp.job1.title')}</h3>
                <div className="experience__company">
                  <Icon name="business" className="experience__company-icon" />{' '}
                  {t('exp.job1.company')}
                </div>
                <span className="experience__period">{t('exp.job1.period')}</span>
              </div>
              <div className="experience__marker">
                <div className="experience__marker-dot"></div>
              </div>
              <div className="experience__card">
                <ul className="experience__desc">
                  {tList('exp.job1.desc').map((item) => (
                    <li key={item} className="experience__desc-item">
                      <span className="experience__bullet"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="experience__tech">
                  <span className="experience__tag">HTML 5</span>
                  <span className="experience__tag">JavaScript</span>
                  <span className="experience__tag">CSS3</span>
                  <span className="experience__tag">PHP</span>
                  <span className="experience__tag">GIT</span>
                  <span className="experience__tag">DOCKER</span>
                  <span className="experience__tag">WORDPRESS</span>
                  <span className="experience__tag">HUGO</span>
                </div>
              </div>
            </div>
            <div className="experience__item experience__item--reversed">
              <span className="experience__mobile-dot"></span>
              <div className="experience__job">
                <h3 className="experience__job-title">{t('exp.job2.title')}</h3>
                <div className="experience__company">
                  <Icon name="business" className="experience__company-icon" />{' '}
                  {t('exp.job2.company')}
                </div>
                <span className="experience__period">{t('exp.job2.period')}</span>
              </div>
              <div className="experience__marker">
                <div className="experience__marker-dot"></div>
              </div>
              <div className="experience__card">
                <ul className="experience__desc">
                  {tList('exp.job2.desc').map((item) => (
                    <li key={item} className="experience__desc-item">
                      <span className="experience__bullet"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="experience__tech">
                  <span className="experience__tag">JavaScript</span>
                  <span className="experience__tag">PHP</span>
                  <span className="experience__tag">HTML</span>
                  <span className="experience__tag">CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
