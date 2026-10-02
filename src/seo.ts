import type { Language, LocalizedString } from './i18n'
import { BLOG, SITE } from './data'
import type { BlogPost } from './data'

const CANONICAL_BASE = 'https://vmh.cl'
const PORTRAIT = SITE.images.aboutPortrait
const AUTHOR = 'Victor Hugo Morales Herrera'
const BRAND = 'MORALES'

type HeadSnapshot = Record<string, string>

function captureHead(): HeadSnapshot {
  const snapshot: HeadSnapshot = { title: document.title }
  document.querySelectorAll<HTMLMetaElement>('meta').forEach((meta) => {
    const key = meta.getAttribute('name') ?? meta.getAttribute('property')
    if (key) snapshot[`meta:${key}`] = meta.getAttribute('content') ?? ''
  })
  document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]').forEach((link) => {
    snapshot['canonical'] = link.getAttribute('href') ?? ''
  })
  return snapshot
}

const snapshot = captureHead()

function resolve(value: LocalizedString, language: Language): string {
  return typeof value === 'string' ? value : value[language]
}

function metaBy(attribute: 'name' | 'property', key: string): HTMLMetaElement {
  const selector = `meta[${attribute}="${key}"]`
  const existing = document.querySelector<HTMLMetaElement>(selector)
  if (existing) return existing
  const el = document.createElement('meta')
  el.setAttribute(attribute, key)
  el.setAttribute('data-seo-created', 'true')
  document.head.appendChild(el)
  return el
}

function metaContent(meta: HTMLMetaElement, value: string) {
  meta.content = value
}

function setPostSeo(post: BlogPost) {
  const url = `${CANONICAL_BASE}/blog/${encodeURIComponent(post.slug)}/`
  const title = `${resolve(post.title, 'es')} — ${BRAND}`
  const description = resolve(post.excerpt, 'es')

  document.title = title
  metaContent(metaBy('name', 'description'), description)

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) canonical.setAttribute('href', url)

  metaContent(metaBy('property', 'og:type'), 'article')
  metaContent(metaBy('property', 'og:site_name'), `${BRAND} — Blog`)
  metaContent(metaBy('property', 'og:title'), title)
  metaContent(metaBy('property', 'og:description'), description)
  metaContent(metaBy('property', 'og:url'), url)
  metaContent(metaBy('property', 'og:image'), PORTRAIT)
  metaContent(metaBy('property', 'og:image:alt'), title)

  metaContent(metaBy('property', 'article:published_time'), post.date)
  metaContent(metaBy('property', 'article:modified_time'), post.date)
  metaContent(metaBy('property', 'article:section'), 'Blog')
  metaContent(metaBy('property', 'article:author'), CANONICAL_BASE)
  document
    .querySelectorAll<HTMLMetaElement>('meta[property="article:tag"][data-seo-created]')
    .forEach((el) => el.remove())
  post.tags.forEach((tag) => {
    const el = document.createElement('meta')
    el.setAttribute('property', 'article:tag')
    el.setAttribute('content', tag)
    el.setAttribute('data-seo-created', 'true')
    document.head.appendChild(el)
  })

  metaContent(metaBy('name', 'twitter:title'), title)
  metaContent(metaBy('name', 'twitter:description'), description)
  metaContent(metaBy('name', 'twitter:image'), PORTRAIT)
  metaContent(metaBy('name', 'twitter:image:alt'), title)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: resolve(post.title, 'es'),
    description: description,
    image: PORTRAIT,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'es',
    keywords: post.tags.join(', '),
    author: {
      '@type': 'Person',
      name: AUTHOR,
      url: CANONICAL_BASE,
      image: PORTRAIT,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: CANONICAL_BASE,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${CANONICAL_BASE}/#blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: resolve(post.title, 'es'),
        item: url,
      },
    ],
  }

  const upsertLdJson = (kind: string, data: unknown) => {
    const selector = `script[data-seo-ldjson="${kind}"]`
    const existing = document.querySelector<HTMLScriptElement>(selector)
    const el =
      existing ??
      (() => {
        const created = document.createElement('script')
        created.setAttribute('type', 'application/ld+json')
        created.setAttribute('data-seo-ldjson', kind)
        document.head.appendChild(created)
        return created
      })()
    el.textContent = JSON.stringify(data)
  }

  upsertLdJson('post', jsonLd)
  upsertLdJson('breadcrumb', breadcrumbJsonLd)
}

function resetPostSeo() {
  document.querySelectorAll<HTMLScriptElement>('script[data-seo-ldjson]').forEach((el) => el.remove())
  document.querySelectorAll<HTMLMetaElement>('meta[data-seo-created]').forEach((el) => el.remove())

  document.title = snapshot.title ?? ''

  for (const [key, value] of Object.entries(snapshot)) {
    if (key === 'title' || key === 'canonical') continue
    const prefix = 'meta:'
    if (!key.startsWith(prefix)) continue
    const attribute = key.slice(prefix.length)
    const el = document.querySelector<HTMLMetaElement>(
      `meta[name="${attribute}"], meta[property="${attribute}"]`,
    )
    if (el) {el.content = value }
  }

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) canonical.setAttribute('href', snapshot.canonical ?? '/')
}

export function applyBlogSeo(slug: string | null) {
  if (typeof document === 'undefined') return
  if (slug !== null) {
    const post = BLOG.list.find((item) => item.slug === slug)
    if (post) {
      setPostSeo(post)
      return
    }
  }
  resetPostSeo()
}

export function blogSeoFormatter(iso: string, language: Language): string {
  return new Intl.DateTimeFormat(language === 'es' ? 'es-CL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${iso}T00:00:00`))
}