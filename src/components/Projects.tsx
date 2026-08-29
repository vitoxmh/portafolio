import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import Icon from './Icon'
import { PROJECTS } from '../data'
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

function ProjectCard({ project }: { project: (typeof PROJECTS.list)[number] }) {
  const { t } = useLanguage()

  return (
    <article
      className={`projects__card projects__card--${project.variant}`}
      {...cardProps(project.url, t(project.title), openOnEnter(project.url))}
    >
      <div className="projects__glow"></div>
      <div className="projects__media">
        <div className="projects__media-overlay"></div>
        <div
          className="projects__media-img"
          data-alt={t(project.alt)}
          style={{ backgroundImage: `url('${project.image}')` }}
        ></div>
      </div>
      <div className="projects__body">
        <div className="projects__top">
          <h3 className="projects__name">{t(project.title)}</h3>
          <div className="projects__links">
            {project.links.map((link) => (
              <a
                key={link.url}
                className="projects__link"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.title}
                onClick={(e) => e.stopPropagation()}
              >
                <Icon name={link.icon} />
              </a>
            ))}
          </div>
        </div>
        <p className="projects__desc">{t(project.description)}</p>
        <div className="projects__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="projects__tag">
              {tag}
            </span>
          ))}
        </div>
        <a
          className="projects__cta"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {t(PROJECTS.cta)} <Icon name="arrow_forward" className="projects__cta-icon" />
        </a>
      </div>
    </article>
  ) 
}

export default function Projects() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const isSlider = PROJECTS.list.length > 3

  return (
    <section className="projects" id="projects">
      <div className="projects__wrap">
        <div className="projects__header">
          <h2 className="projects__title">
            <span className="projects__index">04.</span> {t(PROJECTS.title)}
          </h2>
          <p className="projects__subtitle">{t(PROJECTS.subtitle)}</p>
        </div>
        {isSlider ? (
          <div className="projects__slider">
            <Swiper
              className="projects__swiper"
              modules={[Keyboard, A11y]}
              loop
              speed={600}
              grabCursor
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              keyboard={{ enabled: true, onlyInViewport: true }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
            >
              {PROJECTS.list.map((project) => (
                <SwiperSlide key={project.id} className="projects__slide">
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="projects__controls">
              <button
                type="button"
                className="projects__arrow"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label={t(PROJECTS.prev)}
              >
                <Icon name="chevron_left" />
              </button>
              <div className="projects__dots">
                {PROJECTS.list.map((project, i) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`projects__dot${i === current ? ' projects__dot--active' : ''}`}
                    onClick={() => swiperRef.current?.slideToLoop(i)}
                    aria-label={t(project.title)}
                    aria-current={i === current}
                  ></button>
                ))}
              </div>
              <button
                type="button"
                className="projects__arrow"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label={t(PROJECTS.next)}
              >
                <Icon name="chevron_right" />
              </button>
            </div>
          </div>
        ) : (
          <div className="projects__grid">
            {PROJECTS.list.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
