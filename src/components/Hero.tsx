import Icon from './Icon'
import { HERO } from '../data'
import { useLanguage } from '../hooks/useLanguage'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                opacity="0.3"
                stroke="#00dbe9"
                strokeWidth="0.5"
              ></path>
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%"></rect>
          <circle cx="50%" cy="40%" fill="url(#glow)" opacity="0.5" r="60%"></circle>
          <radialGradient cx="50%" cy="50%" id="glow" r="50%">
            <stop offset="0%" stopColor="#00dbe9" stopOpacity="0.2"></stop>
            <stop offset="100%" stopColor="#131318" stopOpacity="0"></stop>
          </radialGradient>
        </svg>
      </div>
      <div className="hero__glow"></div>

      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot"></span>
          <span className="hero__badge-text">{t(HERO.badge)}</span>
        </div>
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line"></span>
          <span className="hero__eyebrow-text">{t(HERO.eyebrow)}</span>
        </div>
        <h1 className="hero__title">
          <span className="hero__title-mobile">
            {t(HERO.title1Mobile)} <br />
            <span className="hero__title-gradient">{t(HERO.title2Mobile)}</span>
            <br />
            {t(HERO.title3Mobile)}
          </span>
          <span className="hero__title-desktop">
            {t(HERO.title1)} <br />
            <span className="hero__title-gradient">{t(HERO.title2)}</span>
          </span>
        </h1>
        <p className="hero__subtitle hero__subtitle--mobile">{t(HERO.subtitleMobile)}</p>
        <p className="hero__subtitle hero__subtitle--desktop">{t(HERO.subtitle)}</p>
        <div className="hero__cta">
          <a className="hero__btn hero__btn--primary hero__btn--mobile" href="#projects">
            <Icon name="play_arrow" className="hero__btn-icon" />
            {t(HERO.viewWork)}
          </a>
          <a className="hero__btn hero__btn--primary hero__btn--desktop" href="#projects">
            {t(HERO.viewProjects)}
          </a>
          <a className="hero__btn hero__btn--outline hero__btn--mobile" href="#contact">
            {t(HERO.contactMe)}
          </a>
          <a className="hero__btn hero__btn--outline hero__btn--desktop" href="#contact">
            {t(HERO.contactMe)}
          </a>
        </div>
      </div>
      <div className="hero__scroll">
        <span className="hero__scroll-label">{t(HERO.scroll)}</span>
        <Icon name="arrow_downward" />
      </div>
    </section>
  )
}
