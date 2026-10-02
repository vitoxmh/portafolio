import { useEffect } from 'react'
import Icon from './Icon'
import { BLOG } from '../data'
import type { BlogBlock } from '../data'
import { useLanguage } from '../hooks/useLanguage'
import { formatBlogDate } from '../format'
import { applyBlogSeo } from '../seo'

function BlogBlockView({ block }: { block: BlogBlock }) {
  const { t, tList } = useLanguage()

  switch (block.type) {
    case 'heading':
      return <h3 className="blog-post__heading">{t(block.text)}</h3>
    case 'list':
      return (
        <ul className="blog-post__list">
          {tList(block.items).map((item, i) => (
            <li key={i} className="blog-post__item">
              {item}
            </li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <pre className="blog-post__code">
          <code>{block.text}</code>
        </pre>
      )
    case 'quote':
      return <blockquote className="blog-post__quote">{t(block.text)}</blockquote>
    case 'paragraph':
    default:
      return <p className="blog-post__paragraph">{t(block.text)}</p>
  }
}

export default function BlogPost({ slug }: { slug: string }) {
  const { t, language } = useLanguage()
  const post = BLOG.list.find((item) => item.slug === slug)

  useEffect(() => {
    const root = document.documentElement
    const prev = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    root.style.scrollBehavior = prev
  }, [])

  useEffect(() => {
    applyBlogSeo(post?.slug ?? null)
  }, [post?.slug])

  return (
    <article className="blog-post">
      <a className="blog-post__back" href="/#blog" aria-label={t(BLOG.back)}>
        <Icon name="arrow_back" className="blog-post__back-icon" />
        {t(BLOG.back)}
      </a>
      {post ? (
        <>
          <header className="blog-post__header">
            <h1 className="blog-post__title">{t(post.title)}</h1>
            <div className="blog-post__meta">
              <span className="blog-post__date">
                <Icon name="calendar_today" className="blog-post__meta-icon" />
                {formatBlogDate(post.date, language)}
              </span>
              <span className="blog-post__readtime">
                <Icon name="schedule" className="blog-post__meta-icon" />
                {Math.max(1, Math.round(post.content[language].length * 0.6))} min
              </span>
            </div>
            <div className="blog-post__tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-post__tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>
          <div className="blog-post__body">
            {post.content[language].map((block, i) => (
              <BlogBlockView key={i} block={block} />
            ))}
          </div>
        </>
      ) : (
        <p className="blog-post__missing">{t(BLOG.postNotFound)}</p>
      )}
    </article>
  )
}