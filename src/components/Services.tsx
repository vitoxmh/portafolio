import Icon from './Icon'
import { SERVICES } from '../data'
import { useLanguage } from '../hooks/useLanguage'

export default function Services() {
  const { t, tList } = useLanguage()

  return (
    <section className="services" id="services">
      <div className="services__wrap">
        <div className="services__header">
          <h2 className="services__title">
            <span className="services__index">03.</span> {t(SERVICES.title)}
          </h2>
          <p className="services__subtitle">{t(SERVICES.subtitle)}</p>
        </div>
        <div className="services__grid">
          {SERVICES.list.map((service) => (
            <article
              key={t(service.title)}
              className={`services__card services__card--${service.color}`}
            >
              <div className="services__meta">
                <Icon name={service.icon} className="services__icon" />
              </div>
              <h3 className="services__card-title">{t(service.title)}</h3>
              <p className="services__desc">{t(service.desc)}</p>
              <ul className="services__features">
                {tList(service.features).map((feature) => (
                  <li key={feature} className="services__feature">
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
