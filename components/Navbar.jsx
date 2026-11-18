import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV } from '../data'; import { Magnet } from './Anim.jsx'
export default function Navbar() {
  const [s, setS] = useState(false), [o, setO] = useState(false)
  useEffect(() => { const f = () => setS(scrollY > 40); f(); addEventListener('scroll', f); return () => removeEventListener('scroll', f) }, [])
  return (<>
    <header className={'nav' + (s ? ' solid' : '')}>
      <Link to="/" className="logo" onClick={() => setO(false)} aria-label="PR Agencies home">
        <img src="/images/logo/pr-agencies-logo.jpeg" alt="PR Agencies logo" />
      </Link>
      <nav className="links">{NAV.map(([l, p]) => <NavLink key={p} to={p} end className={({ isActive }) => 'l' + (isActive ? ' active' : '')}>{l}</NavLink>)}</nav>
      <div className="nav-cta"><Magnet><Link to="/contact" className="btn primary">Get in Touch</Link></Magnet></div>
      <button className="burger" onClick={() => setO(!o)} aria-expanded={o}>{o ? 'Close' : 'Menu'}</button>
    </header>
    <AnimatePresence>{o && <motion.div className="mobile" initial={{ clipPath: 'circle(0% at 90% 5%)' }} animate={{ clipPath: 'circle(150% at 90% 5%)' }} exit={{ clipPath: 'circle(0% at 90% 5%)' }} transition={{ duration: .6 }}>
      {NAV.map(([l, p]) => <Link key={p} to={p} onClick={() => setO(false)}>{l}</Link>)}</motion.div>}</AnimatePresence>
  </>)
}
