import Header from './Header'
import Hero from './Hero'
import Stats from './Stats'
import About from './About'
import Experience from './Experience'
import Projects from './Projects'
import Skills from './Skills'
import Education from './Education'
import Certifications from './Certifications'
import Contact from './Contact'
import Footer from './Footer'
import BottomNav from './BottomNav'
import ShaderCanvas from './ShaderCanvas'

export default function Site() {
  return (
    <>
      <Header />
      <main className="site">
        <div className="site__content">
          <div className="site__bg">
            <ShaderCanvas />
          </div>
          <div className="site__sections">
            <Hero />
            <Stats />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Certifications />
          </div>
        </div>
      </main>
      <Contact />
      <Footer />
      <BottomNav />
    </>
  )
}
