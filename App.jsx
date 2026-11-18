import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'; import Footer from './components/Footer.jsx'
import Home from './pages/Home/Home.jsx'; import About from './pages/About/About.jsx'
import Services from './pages/Services/Services.jsx'; import Contact from './pages/Contact/Contact.jsx'
import { IMG } from './data'
export default function App() {
  const loc = useLocation(); const [loading, setLoading] = useState(true)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), reduceMotion ? 500 : 2200)
    return () => clearTimeout(t)
  }, [reduceMotion])
  useEffect(() => { window.scrollTo(0, 0) }, [loc.pathname])
  useEffect(() => {
    if (reduceMotion) return undefined

    let previousY = window.scrollY
    let frame = 0
    const updateDirection = () => {
      frame = 0
      const currentY = window.scrollY
      if (Math.abs(currentY - previousY) < 3) return

      document.documentElement.dataset.scrollDirection = currentY < previousY ? 'up' : 'down'
      previousY = currentY
    }
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDirection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
      delete document.documentElement.dataset.scrollDirection
    }
  }, [reduceMotion])
  return (<>
    <AnimatePresence>{loading && (
      <motion.div
        className="loader"
        role="dialog"
        aria-label="PR Agencies opening"
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          event.currentTarget.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 18}px`)
          event.currentTarget.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 18}px`)
        }}
        exit={{ clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: reduceMotion ? .2 : 1.1, ease: [.76, 0, .24, 1] }}
      >
        <motion.div
          className="loader__background"
          style={{ backgroundImage: `url("${IMG.hero}")` }}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 2.2, ease: [.16, 1, .3, 1] }}
        />
        <div className="loader__panels" aria-hidden="true">
          <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: reduceMotion ? 0 : .9, delay: .05, ease: [.76, 0, .24, 1] }} />
          <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: reduceMotion ? 0 : .9, delay: .16, ease: [.76, 0, .24, 1] }} />
          <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: reduceMotion ? 0 : .9, delay: .27, ease: [.76, 0, .24, 1] }} />
        </div>
        <motion.div className="loader__content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: reduceMotion ? 0 : .55 }}>
          <span className="loader__eyebrow">Established 2014</span>
          <div className="loader__brand" aria-label="PR Agencies">
            <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: reduceMotion ? 0 : .85, delay: .58, ease: [.16, 1, .3, 1] }}>PR</motion.span>
            <motion.i initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: reduceMotion ? 0 : .85, delay: .68, ease: [.16, 1, .3, 1] }}>Agencies</motion.i>
          </div>
          <div className="loader__focus" aria-label="Creative advertising, brand promotion and media planning">
            <span>Creative advertising</span>
            <span>Brand promotion</span>
            <span>Media planning</span>
          </div>
        </motion.div>
        <button className="loader__skip" type="button" onClick={() => setLoading(false)} aria-label="Skip opening animation">
          Skip <span aria-hidden="true">↗</span>
        </button>
        <motion.div className="loader__progress" aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduceMotion ? .1 : 2.15, ease: 'linear' }} />
      </motion.div>
    )}</AnimatePresence>
    <Navbar />
    <AnimatePresence mode="wait">
      <motion.main key={loc.pathname} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .45 }}>
        <Routes location={loc}><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/contact" element={<Contact/>}/></Routes>
      </motion.main>
    </AnimatePresence>
    <Footer />
  </>)
}
