import { IMAGES } from '../portfolioData'
import { useLanguage } from '../hooks/useLanguage'

export default function About() {
  const { t } = useLanguage()

  return (
    <section className="about" id="about">
      <div className="about__grid">
        <div className="about__media">
          <div className="about__media-glow"></div>
          <div
            className="about__portrait"
            data-alt="A stylized, cinematic portrait of a developer working in a dark, cyberpunk-inspired room illuminated by cyan and purple neon lights, typing code on multiple floating holographic screens, depth of field, high contrast."
            style={{ backgroundImage: `url('${IMAGES.aboutPortrait}')` }}
          >
            <div className="about__portrait-overlay"></div>
            <div className="about__terminal">
              <span className="material-symbols-outlined">terminal</span>
            </div>
          </div>
        </div>
        <div className="about__content">
          <h2 className="about__title">
            <span className="about__index">01.</span> {t('about.title')}
          </h2>
          <div className="about__card">
            <div className="about__card-accent"></div>
            <p className="about__text">{t('about.p1')}</p>
            <p className="about__text">{t('about.p2')}</p>
          </div>
          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-value">17+</span>
              <span className="about__stat-label">{t('about.yearsExp')}</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-value about__stat-value--secondary">50+</span>
              <span className="about__stat-label">{t('about.projects')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
