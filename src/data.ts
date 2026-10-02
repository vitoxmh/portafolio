import portfolio from './data/portfolio.json'
import blog from './data/blog.json'
import type { LocalizedList, LocalizedString } from './i18n'

export const SITE = portfolio.site
export const IMAGES = portfolio.site.images
export const LINKS = portfolio.site.links
export const NAVIGATION = portfolio.navigation
export const STATS = portfolio.stats
export const HERO = portfolio.hero
export const ABOUT = portfolio.about
export const EXPERIENCE = portfolio.experience
export const SKILLS = portfolio.skills
export const EDUCATION = portfolio.education
export const CERTIFICATIONS = portfolio.certifications
export const CONTACT = portfolio.contact
export const FOOTER = portfolio.footer

export interface ProjectLink {
  icon: string
  url: string
  title?: string
}

export interface Project {
  id: string
  variant: string
  image: string
  url: string
  alt: LocalizedString
  title: LocalizedString
  description: LocalizedString
  tags: string[]
  links: ProjectLink[]
}

export interface Service {
  icon: string
  color: string
  title: LocalizedString
  desc: LocalizedString
  features: LocalizedList
}

export interface ServicesSection {
  title: LocalizedString
  subtitle: LocalizedString
  list: Service[]
}

export const SERVICES = portfolio.services as ServicesSection

export interface ProjectsSection {
  title: LocalizedString
  subtitle: LocalizedString
  prev: LocalizedString
  next: LocalizedString
  cta: LocalizedString
  list: Project[]
}

export const PROJECTS = portfolio.projects as ProjectsSection

interface BlogParagraph {
  type: 'paragraph'
  text: LocalizedString
}

interface BlogHeading {
  type: 'heading'
  text: LocalizedString
}

interface BlogList {
  type: 'list'
  items: LocalizedList
}

interface BlogCode {
  type: 'code'
  text: string
}

interface BlogQuote {
  type: 'quote'
  text: LocalizedString
}

export type BlogBlock = BlogParagraph | BlogHeading | BlogList | BlogCode | BlogQuote

export interface BlogPost {
  slug: string
  date: string
  tags: string[]
  title: LocalizedString
  excerpt: LocalizedString
  content: { en: BlogBlock[]; es: BlogBlock[] }
}

export interface BlogSection {
  title: LocalizedString
  subtitle: LocalizedString
  readMore: LocalizedString
  prev: LocalizedString
  next: LocalizedString
  back: LocalizedString
  postNotFound: LocalizedString
  list: BlogPost[]
}

export const BLOG = blog as BlogSection
