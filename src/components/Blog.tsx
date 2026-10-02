import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import Icon from './Icon'
import { BLOG } from '../data'
import { useLanguage } from '../hooks/useLanguage'
import { blogPostHref } from '../hooks/useRoute'
import { formatBlogDate } from '../format'

const VARIANTS = ['primary', 'secondary', 'tertiary'] as const

function BlogCard({ post, index }: { post: (typeof BLOG.list)[number]; index: number }) {
  const { t, language } = useLanguage()

  return (
    <a
      className={`blog__card blog__card--${VARIANTS[index % VARIANTS.length]}`}
      href={blogPostHref(post.slug)}
    >
      <div className="blog__meta">
        <Icon name="article" className="blog__meta-icon" />
        <span className="blog__date">{formatBlogDate(post.date, language)}</span>
      </div>
      <h3 className="blog__card-title">{t(post.title)}</h3>
      <p className="blog__excerpt">{t(post.excerpt)}</p>
      <div className="blog__footer">
        <div className="blog__tags">
          {post.tags.map((tag) => (
            <span key={tag} className="blog__tag">
              {tag}
            </span>
          ))}
        </div>
        <span className="blog__read-more">
          {t(BLOG.readMore)}
          <Icon name="arrow_forward" className="blog__read-more-icon" />
        </span>
      </div>
    </a>
  )
}

export default function Blog() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section className="blog" id="blog">
      <div className="blog__wrap">
        <div className="blog__header">
          <h2 className="blog__title">
            <span className="blog__index">08.</span> {t(BLOG.title)}
          </h2>
          <p className="blog__subtitle">{t(BLOG.subtitle)}</p>
        </div>
        <div className="blog__slider">
          <Swiper
            className="blog__swiper"
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
            {BLOG.list.map((post, i) => (
              <SwiperSlide key={post.slug} className="blog__slide">
                <BlogCard post={post} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="blog__controls">
            <button
              type="button"
              className="blog__arrow"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label={t(BLOG.prev)}
            >
              <Icon name="chevron_left" />
            </button>
            <div className="blog__dots">
              {BLOG.list.map((post, i) => (
                <button
                  key={post.slug}
                  type="button"
                  className={`blog__dot${i === current ? ' blog__dot--active' : ''}`}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  aria-label={t(post.title)}
                  aria-current={i === current}
                ></button>
              ))}
            </div>
            <button
              type="button"
              className="blog__arrow"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label={t(BLOG.next)}
            >
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}