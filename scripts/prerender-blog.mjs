import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const indexHtml = join(distDir, 'index.html')
const blogJson = join(root, 'src', 'data', 'blog.json')

const CANONICAL_BASE = 'https://vmh.cl'
const AUTHOR = 'Victor Hugo Morales Herrera'
const BRAND = 'MORALES'

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const escAttr = (s) => esc(s)

const textValue = (value) => (typeof value === 'string' ? value : value.es)

function blocksHtml(blocks) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading':
          return `<h2>${esc(textValue(block.text))}</h2>`
        case 'list':
          return `<ul>${block.items.es.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`
        case 'code':
          return `<pre><code>${esc(block.text)}</code></pre>`
        case 'quote':
          return `<blockquote>${esc(textValue(block.text))}</blockquote>`
        case 'paragraph':
        default:
          return `<p>${esc(textValue(block.text))}</p>`
      }
    })
    .join('')
}

function postPageHtml(base, post) {
  const url = `${CANONICAL_BASE}/blog/${encodeURIComponent(post.slug)}/`
  const title = `${esc(post.title.es)} — ${BRAND}`
  const description = escAttr(post.excerpt.es)
  const iso = `${post.date}T00:00:00`
  const dateLabel = new Date(iso).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const minutes = String(Math.max(1, Math.round(post.content.es.length * 0.6)))

  const back = 'Volver al blog'
  const tags = post.tags.map((tag) => `<span class="blog-post__tag">${esc(tag)}</span>`).join('')
  const body = `
<article class="blog-post">
  <a class="blog-post__back" href="/#blog">${esc(back)}</a>
  <header class="blog-post__header">
    <h1 class="blog-post__title">${esc(post.title.es)}</h1>
    <div class="blog-post__meta">
      <span class="blog-post__date">${esc(dateLabel)}</span>
      <span class="blog-post__readtime">${minutes} min</span>
    </div>
    <div class="blog-post__tags">${tags}</div>
  </header>
  <div class="blog-post__body">
${blocksHtml(post.content.es)}
  </div>
</article>
`

  const jsonLd = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title.es,
      description: post.excerpt.es,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: 'es',
      keywords: post.tags.join(', '),
      author: { '@type': 'Person', name: AUTHOR, url: CANONICAL_BASE },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
    null,
    2,
  )

  const breadcrumbJsonLd = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: CANONICAL_BASE },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CANONICAL_BASE}/#blog` },
        { '@type': 'ListItem', position: 3, name: post.title.es, item: url },
      ],
    },
    null,
    2,
  )

  const headInsert = `
    <meta property="article:published_time" content="${post.date}" />
    <meta property="article:modified_time" content="${post.date}" />
    <meta property="article:section" content="${escAttr(post.tags[0] || 'Blog')}" />
    ${post.tags.map((tag) => `<meta property="article:tag" content="${escAttr(tag)}" />`).join('\n    ')}
    <link rel="alternate" hreflang="en" href="${url}" />
    <link rel="alternate" hreflang="es" href="${url}" />
    <link rel="alternate" hreflang="x-default" href="${url}" />
    <script type="application/ld+json">
${breadcrumbJsonLd}
    </script>
    <script type="application/ld+json">
${jsonLd}
    </script>
    </head>`

  let html = base
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  html = html.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${description}$2`,
  )
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${url}$2`,
  )
  html = html.replace(
    /(<meta property="og:type" content=")[^"]*(")/,
    `$1article$2`,
  )
  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${escAttr(title)}$2`,
  )
  html = html.replace(
    /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
    `$1${description}$2`,
  )
  html = html.replace(/<html lang="[^"]*"/, '<html lang="es"')
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${url}" />`,
  )
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${escAttr(title)}$2`,
  )
  html = html.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${description}$2`,
  )
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  html = html.replace('</head>', headInsert)
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
    (match) => (match.includes('"@type": "FAQPage"') ? '' : match),
  )
  return html
}

function sitemapXml() {
  const posts = blog.list
  const latestDate = posts.reduce((max, post) => (post.date > max ? post.date : max), '')
  const homeLastmod = latestDate || new Date().toISOString().slice(0, 10)
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
  const home = `${CANONICAL_BASE}/`
  lines.push(`  <url>`)
  lines.push(`    <loc>${home}</loc>`)
  lines.push(`    <lastmod>${homeLastmod}</lastmod>`)
  lines.push(`    <changefreq>monthly</changefreq>`)
  lines.push(`    <priority>1.0</priority>`)
  lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${home}" />`)
  lines.push(`    <xhtml:link rel="alternate" hreflang="es" href="${home}" />`)
  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${home}" />`)
  lines.push(`  </url>`)
  for (const post of posts) {
    const url = `${CANONICAL_BASE}/blog/${encodeURIComponent(post.slug)}/`
    lines.push(`  <url>`)
    lines.push(`    <loc>${url}</loc>`)
    lines.push(`    <lastmod>${post.date}</lastmod>`)
    lines.push(`    <changefreq>monthly</changefreq>`)
    lines.push(`    <priority>0.8</priority>`)
    lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${url}" />`)
    lines.push(`    <xhtml:link rel="alternate" hreflang="es" href="${url}" />`)
    lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />`)
    lines.push(`  </url>`)
  }
  lines.push('</urlset>')
  return lines.join('\n')
}

if (!readFileSync(indexHtml, 'utf8').includes('</head>')) {
  console.error('dist/index.html no encontrado. Ejecuta primero `vite build`.')
  process.exit(1)
}

const base = readFileSync(indexHtml, 'utf8')
const blog = JSON.parse(readFileSync(blogJson, 'utf8'))

for (const post of blog.list) {
  const dir = join(distDir, 'blog', post.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), postPageHtml(base, post))
  console.log(`  ✓ dist/blog/${post.slug}/index.html`)
}

writeFileSync(join(distDir, 'sitemap.xml'), sitemapXml())
console.log('  ✓ dist/sitemap.xml')
console.log(`Se generaron ${blog.list.length} publicaciones estáticas.`)