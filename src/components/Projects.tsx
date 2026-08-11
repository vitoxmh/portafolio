import Icon from './Icon'
import { IMAGES, LINKS } from '../portfolioData'
import { useLanguage } from '../hooks/useLanguage'

const openExternal = (url: string) => {
  if (!url || url === '#') return
  window.open(url, '_blank', 'noopener,noreferrer')
}

const cardProps = (
  url: string,
  label: string,
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void,
) => ({
  role: 'link' as const,
  tabIndex: 0,
  'aria-label': label,
  onClick: () => openExternal(url),
  onKeyDown,
})

const openOnEnter = (url: string) => (e: React.KeyboardEvent<HTMLElement>) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    openExternal(url)
  }
}

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section className="projects" id="projects">
      <div className="projects__wrap">
        <div className="projects__header">
          <h2 className="projects__title">
            <span className="projects__index">03.</span> {t('projects.title')}
          </h2>
          <p className="projects__subtitle">{t('projects.subtitle')}</p>
        </div>
        <div className="projects__grid">
          <article
            className="projects__card projects__card--primary"
            {...cardProps(LINKS.pacman, t('projects.pacman.title'), openOnEnter(LINKS.pacman))}
          >
            <div className="projects__glow"></div>
            <div className="projects__media">
              <div className="projects__media-overlay"></div>
              <div
                className="projects__media-img"
                data-alt="A stylized retro arcade screen showing a glowing cyan and magenta version of a classic maze game similar to Pac-Man, with neon grid lines, dark background, cyberpunk aesthetic, high contrast."
                style={{ backgroundImage: `url('${IMAGES.pacmanDesktop}')` }}
              ></div>
            </div>
            <div className="projects__body">
              <div className="projects__top">
                <h3 className="projects__name">{t('projects.pacman.title')}</h3>
                <a
                  className="projects__link"
                  href={LINKS.pacman}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon name="open_in_new" />
                </a>
              </div>
              <p className="projects__desc">{t('projects.pacman.desc')}</p>
              <div className="projects__tags">
                <span className="projects__tag">JavaScript</span>
                <span className="projects__tag">HTML5 Canvas</span>
              </div>
              <a
                className="projects__cta"
                href={LINKS.pacman}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {t('mprojects.cta')} <Icon name="arrow_forward" className="projects__cta-icon" />
              </a>
            </div>
          </article>

          <article
            className="projects__card projects__card--secondary"
            {...cardProps(LINKS.cv, t('projects.cv.title'), openOnEnter(LINKS.cv))}
          >
            <div className="projects__glow"></div>
            <div className="projects__media">
              <div className="projects__media-overlay"></div>
              <div
                className="projects__media-img"
                data-alt="A sleek, modern web application dashboard interface floating in a dark void, showcasing elegant typography, data visualizations in neon purple and cyan, glassmorphic UI elements."
                style={{ backgroundImage: `url('${IMAGES.cvDesktop}')` }}
              ></div>
            </div>
            <div className="projects__body">
              <div className="projects__top">
                <h3 className="projects__name">{t('projects.cv.title')}</h3>
                <div className="projects__links">
                  <a
                    className="projects__link"
                    href={LINKS.cvGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="code" />
                  </a>
                  <a
                    className="projects__link"
                    href={LINKS.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Demo"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="open_in_new" />
                  </a>
                </div>
              </div>
              <p className="projects__desc">{t('projects.cv.desc')}</p>
              <div className="projects__tags">
                <span className="projects__tag">React</span>
                <span className="projects__tag">Tailwind</span>
              </div>
              <a
                className="projects__cta"
                href={LINKS.cv}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {t('mprojects.cta')} <Icon name="arrow_forward" className="projects__cta-icon" />
              </a>
            </div>
          </article>

          <article
            className="projects__card projects__card--tertiary"
            {...cardProps(LINKS.pang, t('projects.pang.title'), openOnEnter(LINKS.pang))}
          >
            <div className="projects__glow"></div>
            <div className="projects__media">
              <div className="projects__media-overlay"></div>
              <div
                className="projects__media-img"
                data-alt="A dynamic, explosive action shot from a 2D arcade shooter game developed in Unity, featuring glowing neon green projectiles hitting vibrant stylized bubbles, dark background with subtle grid overlay."
                style={{ backgroundImage: `url('${IMAGES.pangDesktop}')` }}
              ></div>
            </div>
            <div className="projects__body">
              <div className="projects__top">
                <h3 className="projects__name">{t('projects.pang.title')}</h3>
                <a
                  className="projects__link"
                  href={LINKS.pang}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon name="play_arrow" />
                </a>
              </div>
              <p className="projects__desc">{t('projects.pang.desc')}</p>
              <div className="projects__tags">
                <span className="projects__tag">Unity</span>
                <span className="projects__tag">C#</span>
              </div>
              <a
                className="projects__cta"
                href={LINKS.pang}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {t('mprojects.cta')} <Icon name="arrow_forward" className="projects__cta-icon" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
