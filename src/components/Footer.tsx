import Icon from './Icon'
import { FOOTER, LINKS } from '../data'
import { useLanguage } from '../hooks/useLanguage'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer u-pb-safe">
      <div className="footer__inner">
        <div className="footer__info">
          <p className="footer__cta">{t(FOOTER.cta)}</p>
          <p className="footer__rights">© {year} {t(FOOTER.rights)}</p>
        </div>
        <div className="footer__socials">
          <a
            className="footer__link"
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="link" />
            <span>{t(FOOTER.linkedin)}</span>
          </a>
          <a
            className="footer__link"
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="code" />
            <span>{t(FOOTER.github)}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
