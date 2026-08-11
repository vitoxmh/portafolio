import Icon from './Icon'
import { useContactForm } from '../hooks/useContactForm'
import { useLanguage } from '../hooks/useLanguage'

const inputClasses = (hasError: boolean) =>
  `contact__input${hasError ? ' contact__input--error' : ''}`

export default function Contact() {
  const { t } = useLanguage()
  const { values, errors, status, errorMessage, handleChange, submit } = useContactForm()

  return (
    <section className="contact" id="contact">
      <div className="contact__wrap">
        <div className="contact__header">
          <h2 className="contact__title">
            <span className="contact__index">07.</span> {t('contact.title')}
          </h2>
          <p className="contact__subtitle">{t('contact.subtitle')}</p>
        </div>
        <div className="contact__grid">
          <form className="contact__form" onSubmit={submit} noValidate>
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="name" className="contact__label">
                  {t('contact.name')}
                </label>
                <input
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange('name')}
                  placeholder={t('contact.namePlaceholder')}
                  autoComplete="name"
                  className={inputClasses(Boolean(errors.name))}
                />
                {errors.name && <span className="contact__error">{errors.name}</span>}
              </div>
              <div className="contact__field">
                <label htmlFor="email" className="contact__label">
                  {t('contact.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  placeholder={t('contact.emailPlaceholder')}
                  autoComplete="email"
                  className={inputClasses(Boolean(errors.email))}
                />
                {errors.email && <span className="contact__error">{errors.email}</span>}
              </div>
            </div>
            <div className="contact__field">
              <label htmlFor="subject" className="contact__label">
                {t('contact.subject')}
              </label>
              <input
                id="subject"
                type="text"
                value={values.subject}
                onChange={handleChange('subject')}
                placeholder={t('contact.subjectPlaceholder')}
                className={inputClasses(Boolean(errors.subject))}
              />
              {errors.subject && <span className="contact__error">{errors.subject}</span>}
            </div>
            <div className="contact__field">
              <label htmlFor="message" className="contact__label">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                rows={6}
                value={values.message}
                onChange={handleChange('message')}
                placeholder={t('contact.messagePlaceholder')}
                className={inputClasses(Boolean(errors.message))}
              />
              {errors.message && <span className="contact__error">{errors.message}</span>}
            </div>
            {errorMessage && <p className="contact__error contact__error--global">{errorMessage}</p>}
            {status === 'success' && (
              <div className="contact__success">
                <Icon name="check_circle" className="contact__success-icon" />
                <p>{t('contact.success')}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="contact__submit"
            >
              <Icon name="send" />
              {status === 'submitting' ? t('contact.sending') : t('contact.send')}
            </button>
          </form>
          <div className="contact__sidebar">
            <div className="contact__card">
              <div className="contact__card-head contact__card-head--primary">
                <Icon name="mail" />
                <span className="contact__card-label">{t('contact.email')}</span>
              </div>
              <p className="contact__card-value">contacto@vmh.cl</p>
            </div>
            <div className="contact__card">
              <div className="contact__card-head contact__card-head--secondary">
                <Icon name="link" />
                <span className="contact__card-label">{t('contact.methods.linkedin')}</span>
              </div>
              <a
                href="https://www.linkedin.com/in/victor-hugo-morales-herrera-601a96103/"
                className="contact__card-value"
              >
                in/victor-hugo-morales-herrera-
              </a>
            </div>
            <div className="contact__card">
              <div className="contact__card-head contact__card-head--tertiary">
                <Icon name="code" />
                <span className="contact__card-label">{t('contact.methods.github')}</span>
              </div>
              <a href="https://github.com/vitoxmh/" className="contact__card-value">
                github.com/vitoxmh/
              </a>
            </div>
            <div className="contact__card contact__card--availability">
              <div className="contact__availability-glow"></div>
              <span className="contact__availability-label">{t('contact.availability')}</span>
              <p className="contact__availability-text">{t('contact.availabilityText')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
