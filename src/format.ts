import type { Language } from './i18n'

export function formatBlogDate(iso: string, language: Language): string {
  const date = new Date(`${iso}T00:00:00`)
  return date.toLocaleDateString(language === 'es' ? 'es-CL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}