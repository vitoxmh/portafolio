import { useEffect } from 'react'
import Header from './Header'
import Hero from './Hero'
import Stats from './Stats'
import About from './About'
import Experience from './Experience'
import Services from './Services'
import Projects from './Projects'
import Skills from './Skills'
import Education from './Education'
import Certifications from './Certifications'
import Blog from './Blog'
import BlogPost from './BlogPost'
import Contact from './Contact'
import Footer from './Footer'
import BottomNav from './BottomNav'
import ShaderCanvas from './ShaderCanvas'
import {
  navigateToBlogSection,
  navigateToPost,
  useRoute,
} from '../hooks/useRoute'

function isPlainClick(event: MouseEvent): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}

export default function Site() {
  const route = useRoute()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!isPlainClick(event)) return
      const anchor = (event.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href') || ''
      const isOnBlogPath = window.location.pathname.startsWith('/blog/')

      if (href.startsWith('/blog/') && !href.startsWith('/blog/?')) {
        const raw = href
          .slice('/blog/'.length)
          .split('?')[0]
          .replace(/\/+$/, '')
        const slug = decodeURIComponent(raw)
        if (slug) {
          event.preventDefault()
          navigateToPost(slug)
        }
        return
      }

      if (isOnBlogPath && (href.startsWith('#') || href.startsWith('/#'))) {
        const id = decodeURIComponent(href.replace(/^\/?#/, '').split('?')[0])
        event.preventDefault()
        navigateToBlogSection(id)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <Header />
      <main className="site">
        <div className="site__content">
          <div className="site__bg">
            <ShaderCanvas />
          </div>
          <div className="site__sections">
            {route.view === 'post' ? (
              <BlogPost slug={route.slug} />
            ) : (
              <>
                <Hero />
                <Stats />
                <About />
                <Experience />
                <Services />
                <Projects />
                <Skills />
                <Education />
                <Certifications />
                <Blog />
              </>
            )}
          </div>
        </div>
      </main>
      <Contact />
      <Footer />
      <BottomNav />
    </>
  )
}