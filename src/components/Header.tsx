import { useLanguage } from '../hooks/useLanguage'

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
            VH<span className="header__name-accent">.</span>MORALES
          </span>
        </div>
        <nav
          className="header__nav"
          data-active-classes="header__nav-link--active"
        >
          <a aria-current="page" className="header__nav-link header__nav-link--active" data-path="home" href="#home">
            {t('nav.home')}
          </a>
          <a className="header__nav-link" data-path="about" href="#about">
            {t('nav.about')}
          </a>
          <a className="header__nav-link" data-path="experience" href="#experience">
            {t('nav.experience')}
          </a>
          <a className="header__nav-link" data-path="projects" href="#projects">
            {t('nav.projects')}
          </a>
          <a className="header__nav-link" data-path="skills" href="#skills">
            {t('nav.skills')}
          </a>
          <a className="header__nav-link" data-path="education" href="#education">
            {t('nav.education')}
          </a>
          <a className="header__nav-link" data-path="certifications" href="#certifications">
            {t('nav.certifications')}
          </a>
          <a className="header__nav-link" data-path="contact" href="#contact">
            {t('nav.contact')}
          </a>
        </nav>
        <div className="header__actions">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            aria-label={t('lang.switch')}
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
