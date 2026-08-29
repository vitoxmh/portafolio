import { useRef } from 'react'
import Icon from './Icon'
import { CONTACT } from '../data'
import { useContactForm } from '../hooks/useContactForm'
import { useLanguage } from '../hooks/useLanguage'
import { useRecaptcha } from '../hooks/useRecaptcha'

const inputClasses = (hasError: boolean) =>
  `contact__input${hasError ? ' contact__input--error' : ''}`

export default function Contact() {
  const { t } = useLanguage()
  const { values, errors, status, errorMessage, handleChange, submit } = useContactForm()
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const { enabled, token, reset } = useRecaptcha(recaptchaRef)

  const handleSubmit = async (event: React.FormEvent) => {
    const ok = await submit(event, {
      recaptchaToken: token,
      recaptchaRequired: enabled,
    })
    if (ok) {
      reset()
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__wrap">
        <div className="contact__header">
          <h2 className="contact__title">
            <span className="contact__index">08.</span> {t(CONTACT.title)}
          </h2>
          <p className="contact__subtitle">{t(CONTACT.subtitle)}</p>
        </div>
        <div className="contact__grid">
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="name" className="contact__label">
                  {t(CONTACT.name)}
                </label>
                <input
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange('name')}
                  placeholder={t(CONTACT.namePlaceholder)}
                  autoComplete="name"
                  className={inputClasses(Boolean(errors.name))}
                />
                {errors.name && <span className="contact__error">{errors.name}</span>}
              </div>
              <div className="contact__field">
                <label htmlFor="email" className="contact__label">
                  {t(CONTACT.email)}
                </label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  placeholder={t(CONTACT.emailPlaceholder)}
                  autoComplete="email"
                  className={inputClasses(Boolean(errors.email))}
                />
                {errors.email && <span className="contact__error">{errors.email}</span>}
              </div>
            </div>
            <div className="contact__field">
              <label htmlFor="subject" className="contact__label">
                {t(CONTACT.subject)}
              </label>
              <input
                id="subject"
                type="text"
                value={values.subject}
                onChange={handleChange('subject')}
                placeholder={t(CONTACT.subjectPlaceholder)}
                className={inputClasses(Boolean(errors.subject))}
              />
              {errors.subject && <span className="contact__error">{errors.subject}</span>}
            </div>
            <div className="contact__field">
              <label htmlFor="message" className="contact__label">
                {t(CONTACT.message)}
              </label>
              <textarea
                id="message"
                rows={6}
                value={values.message}
                onChange={handleChange('message')}
                placeholder={t(CONTACT.messagePlaceholder)}
                className={inputClasses(Boolean(errors.message))}
              />
              {errors.message && <span className="contact__error">{errors.message}</span>}
            </div>
            {enabled && <div className="contact__recaptcha" ref={recaptchaRef}></div>}
            {errorMessage && <p className="contact__error contact__error--global">{errorMessage}</p>}
            {status === 'success' && (
              <div className="contact__success">
                <Icon name="check_circle" className="contact__success-icon" />
                <p>{t(CONTACT.success)}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="contact__submit"
            >
              <Icon name="send" />
              {status === 'submitting' ? t(CONTACT.sending) : t(CONTACT.send)}
            </button>
          </form>
          <div className="contact__sidebar">
            <div className="contact__card">
              <div className="contact__card-head contact__card-head--primary">
                <Icon name="mail" />
                <span className="contact__card-label">{t(CONTACT.email)}</span>
              </div>
              <p className="contact__card-value">{CONTACT.emailAddress}</p>
            </div>
            <div className="contact__card">
              <div className="contact__card-head contact__card-head--secondary">
                <Icon name="link" />
                <span className="contact__card-label">{t(CONTACT.methods.linkedin)}</span>
              </div>
              <a
                href={CONTACT.linkedin.url}
                className="contact__card-value"
              >
                {CONTACT.linkedin.handle}
              </a>
            </div>
            <div className="contact__card">
              <div className="contact__card-head contact__card-head--tertiary">
                <Icon name="code" />
                <span className="contact__card-label">{t(CONTACT.methods.github)}</span>
              </div>
              <a href={CONTACT.github.url} className="contact__card-value">
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
      </div>
    </section>
  )
}
