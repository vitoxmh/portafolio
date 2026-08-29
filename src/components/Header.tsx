import { useLanguage } from '../hooks/useLanguage'
import { NAVIGATION, SITE } from '../data'

export default function Header() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="header u-pt-safe">
      <div className="header__inner">
        <div className="header__brand">
          <span className="header__logo">
            <span className="material-symbols-outlined">terminal</span>
          </span>
          <span className="header__name">
            {SITE.brandInitials}
            <span className="header__name-accent">.</span>
            {SITE.brandName}
          </span>
        </div>
        <nav
          className="header__nav"
          data-active-classes="header__nav-link--active"
        >
          {NAVIGATION.header.map((item) => (
            <a
              key={item.path}
              aria-current={item.active ? 'page' : undefined}
              className={`header__nav-link${item.active ? ' header__nav-link--active' : ''}`}
              data-path={item.path}
              href={item.href}
            >
              {t(item.label)}
            </a>
          ))}
        </nav>
        <div className="header__actions">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            aria-label={t(SITE.langSwitch)}
            className="header__lang"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
          <button className="header__menu-btn" aria-label="Menu">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="header__avatar">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </div>
    </header>
  )
}
