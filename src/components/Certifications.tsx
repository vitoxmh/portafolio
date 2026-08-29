import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import Icon from './Icon'
import { CERTIFICATIONS } from '../data'
import { useLanguage } from '../hooks/useLanguage'

function CertCard({ cert }: { cert: (typeof CERTIFICATIONS.items)[number] }) {
  const { t } = useLanguage()

  return (
    <a
      href={cert.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`certs__card certs__card--${cert.color}`}
    >
      <div className="certs__meta">
        <Icon name={cert.icon} />
        <span className="certs__year">{cert.year}</span>
      </div>
      <h3 className="certs__card-title">{t(cert.title)}</h3>
      <p className="certs__issuer">{t(cert.issuer)}</p>
      <span className="certs__verify">
        <Icon name="open_in_new" className="certs__verify-icon" />
        {t(CERTIFICATIONS.verify)}
      </span>
    </a>
  )
}

export default function Certifications() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const isSlider = CERTIFICATIONS.items.length > 3

  return (
    <section className="certs" id="certifications">
      <div className="certs__wrap">
        <div className="certs__header">
          <h2 className="certs__title">
            <span className="certs__index">07.</span> {t(CERTIFICATIONS.title)}
          </h2>
          <p className="certs__subtitle">{t(CERTIFICATIONS.subtitle)}</p>
        </div>
        {isSlider ? (
          <div className="certs__slider">
            <Swiper
              className="certs__swiper"
              modules={[Keyboard, A11y]}
              loop
              speed={600}
              grabCursor
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 3 },
              }}
              keyboard={{ enabled: true, onlyInViewport: true }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
            >
              {CERTIFICATIONS.items.map((cert) => (
                <SwiperSlide key={t(cert.title)} className="certs__slide">
                  <CertCard cert={cert} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="certs__controls">
              <button
                type="button"
                className="certs__arrow"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label={t(CERTIFICATIONS.prev)}
              >
                <Icon name="chevron_left" />
              </button>
              <div className="certs__dots">
                {CERTIFICATIONS.items.map((cert, i) => (
                  <button
                    key={t(cert.title)}
                    type="button"
                    className={`certs__dot${i === current ? ' certs__dot--active' : ''}`}
                    onClick={() => swiperRef.current?.slideToLoop(i)}
                    aria-label={t(cert.title)}
                    aria-current={i === current}
                  ></button>
                ))}
              </div>
              <button
                type="button"
                className="certs__arrow"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label={t(CERTIFICATIONS.next)}
              >
                <Icon name="chevron_right" />
              </button>
            </div>
          </div>
        ) : (
          <div className="certs__grid">
            {CERTIFICATIONS.items.map((cert) => (
              <CertCard key={t(cert.title)} cert={cert} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
