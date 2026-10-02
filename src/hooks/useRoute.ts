import { useEffect, useState } from 'react'

export type Route = { view: 'home' } | { view: 'post'; slug: string }

const BLOG_PREFIX = '/blog/'
const LEGACY_HASH_PREFIX = '#/blog/'

export const blogPostHref = (slug: string) => `${BLOG_PREFIX}${encodeURIComponent(slug)}/`

function slugFromPathname(pathname: string): string | null {
  if (!pathname.startsWith(BLOG_PREFIX)) return null
  const rest = pathname.slice(BLOG_PREFIX.length).replace(/\/+$/, '')
  if (!rest) return null
  const slug = decodeURIComponent(rest.split('/')[0])
  return slug || null
}

function slugFromLegacyHash(hash: string): string | null {
  if (!hash.startsWith(LEGACY_HASH_PREFIX)) return null
  const slug = decodeURIComponent(hash.slice(LEGACY_HASH_PREFIX.length))
  return slug || null
}

export function parseRoute(): Route {
  const pathname = window.location.pathname
  const hash = window.location.hash

  const fromPath = slugFromPathname(pathname)
  if (fromPath) return { view: 'post', slug: fromPath }

  const legacy = slugFromLegacyHash(hash)
  if (legacy) return { view: 'post', slug: legacy }

  return { view: 'home' }
}

type Listener = (route: Route) => void
const listeners = new Set<Listener>()

function dispatch(route: Route) {
  listeners.forEach((listener) => listener(route))
}

export function navigateToPost(slug: string) {
  const url = blogPostHref(slug)
  if (window.location.pathname !== url) {
    window.history.pushState({}, '', url)
  }
  dispatch(parseRoute())
}

export function navigateToBlogSection(id: string) {
  if (window.location.pathname !== '/') {
    window.history.pushState({}, '', '/')
  }
  dispatch(parseRoute())
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView()
    })
  })
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseRoute)

  useEffect(() => {
    const subscribe: Listener = (next) => setRoute(next)
    const onBrowserNav = () => setRoute(parseRoute())
    listeners.add(subscribe)
    window.addEventListener('popstate', onBrowserNav)
    window.addEventListener('hashchange', onBrowserNav)
    return () => {
      listeners.delete(subscribe)
      window.removeEventListener('popstate', onBrowserNav)
      window.removeEventListener('hashchange', onBrowserNav)
    }
  }, [])

  return route
}