import { ABOUT, IMAGES } from '../data'
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
            data-alt={ABOUT.portraitAlt}
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
            <span className="about__index">01.</span> {t(ABOUT.title)}
          </h2>
          <div className="about__card">
            <div className="about__card-accent"></div>
            {ABOUT.paragraphs.map((paragraph, i) => (
              <p key={i} className="about__text">
                {t(paragraph)}
              </p>
            ))}
          </div>
          <div className="about__stats">
            {ABOUT.stats.map((stat, i) => (
              <div key={i} className="about__stat">
                <span
                  className={`about__stat-value${stat.variant ? ` about__stat-value--${stat.variant}` : ''}`}
                >
                  {stat.value}
                </span>
                <span className="about__stat-label">{t(stat.label)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
