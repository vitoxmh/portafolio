import Icon from './Icon'
import { LINKS } from '../portfolioData'
import { useLanguage } from '../hooks/useLanguage'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer u-pb-safe">
      <div className="footer__inner">
        <div className="footer__info">
          <p className="footer__cta">{t('footer.cta')}</p>
          <p className="footer__rights">© {year} {t('footer.rights')}</p>
        </div>
        <div className="footer__socials">
          <a
            className="footer__link"
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="link" />
            <span>{t('footer.linkedin')}</span>
          </a>
          <a
            className="footer__link"
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="code" />
            <span>{t('footer.github')}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
