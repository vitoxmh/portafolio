import Icon from './Icon'
import { CONTACT } from '../data'
import { useLanguage } from '../hooks/useLanguage'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section className="contact" id="contact">
      <div className="contact__wrap">
        <div className="contact__header">
          <h2 className="contact__title">
            <span className="contact__index">09.</span> {t(CONTACT.title)}
          </h2>
          <p className="contact__subtitle">{t(CONTACT.subtitle)}</p>
        </div>
        <div className="contact__grid">
          <div className="contact__card">
            <div className="contact__card-head contact__card-head--primary">
              <Icon name="mail" />
              <span className="contact__card-label">{t(CONTACT.email)}</span>
            </div>
            <a href={`mailto:${CONTACT.emailAddress}`} className="contact__card-value">
              {CONTACT.emailAddress}
            </a>
          </div>
          <div className="contact__card">
            <div className="contact__card-head contact__card-head--secondary">
              <Icon name="link" />
              <span className="contact__card-label">{t(CONTACT.methods.linkedin)}</span>
            </div>
            <a
              href={CONTACT.linkedin.url}
              className="contact__card-value"
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTACT.linkedin.handle}
            </a>
          </div>
          <div className="contact__card">
            <div className="contact__card-head contact__card-head--tertiary">
              <Icon name="code" />
              <span className="contact__card-label">{t(CONTACT.methods.github)}</span>
            </div>
            <a
              href={CONTACT.github.url}
              className="contact__card-value"
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTACT.github.handle}
            </a>
          </div>
          <div className="contact__card contact__card--availability">
            <div className="contact__availability-glow"></div>
            <span className="contact__availability-label">{t(CONTACT.availability)}</span>
            <p className="contact__availability-text">{t(CONTACT.availabilityText)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
