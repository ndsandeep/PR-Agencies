// React Bits–style animation primitives (SplitText, SplitFlapText, RotatingText, Magnet, SpotlightCard, CountUp, ShinyText, Aurora), themed via CSS variables.
import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform, animate, AnimatePresence, useReducedMotion } from 'framer-motion'

export function SplitText({ text, className = '', delay = 0, as: T = 'h1', style = {}, ...props }) {
  const M = motion[T]
  return (
    <M
      className={`scroll-motion ${className}`.trim()}
      aria-label={text}
      initial="h"
      whileInView="v"
      viewport={{ once: true, margin: '-20px' }}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
      style={style}
      {...props}
    >
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '.08em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ h: { y: '110%', opacity: 0 }, v: { y: '0%', opacity: 1 } }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </M>
  )
}

export function SplitFlapText({ text, className = '', style = {}, speed = 0.04 }) {
  const chars = Array.from(text)
  return (
    <span
      className={`split-flap-wrap ${className}`}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '2px',
        ...style,
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="split-flap-char"
          style={{
            display: 'inline-block',
            perspective: '1000px',
            lineHeight: 1,
          }}
        >
          <motion.span
            initial={{ rotateX: 90, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * speed,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              display: 'inline-block',
              transformOrigin: '50% 50%',
              backfaceVisibility: 'hidden',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function RotatingText({
  texts = ['Our Services', '360° Campaigns', 'Media Planning', 'Brand Growth'],
  className = '',
  style = {},
  interval = 2500,
}) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % texts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        height: '1.15em',
        ...style,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const revealFrom = (variant, y) => ({
  rise: { opacity: 0, y },
  'slide-left': { opacity: 0, x: -72 },
  'slide-right': { opacity: 0, x: 72 },
  'blur-up': { opacity: 0, y: 28, filter: 'blur(12px)' },
  zoom: { opacity: 0, scale: .82 },
  'flip-left': { opacity: 0, x: -38, rotateY: -24 },
  'flip-right': { opacity: 0, x: 38, rotateY: 24 }
}[variant] || { opacity: 0, y })

export function Reveal({ children, delay = 0, className = '', y = 40, style = {}, variant = 'rise', once = true }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={`scroll-motion ${className}`.trim()}
      style={style}
      initial={reduceMotion ? false : revealFrom(variant, y)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-20px', amount: .16 }}
      transition={{ duration: reduceMotion ? 0 : .8, delay: reduceMotion ? 0 : delay, ease: [.2, .8, .2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Magnet({ children, strength = .3 }) {
  const r = useRef(); const [p, setP] = useState({ x: 0, y: 0 })
  const move = e => { const b = r.current.getBoundingClientRect(); setP({ x: (e.clientX - b.left - b.width / 2) * strength, y: (e.clientY - b.top - b.height / 2) * strength }) }
  return <motion.span ref={r} style={{ display: 'inline-block' }} onMouseMove={move} onMouseLeave={() => setP({ x: 0, y: 0 })} animate={p} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>{children}</motion.span>
}

export function SpotlightCard({ children, className = '' }) {
  const move = e => { const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--x', e.clientX - b.left + 'px'); e.currentTarget.style.setProperty('--y', e.clientY - b.top + 'px') }
  return <div className={'spot ' + className} onMouseMove={move}>{children}</div>
}

export function CountUp({ to, suffix = '', label }) {
  const r = useRef(); const v = useInView(r, { once: true }); const [n, setN] = useState(0)
  useEffect(() => { if (v) { const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: x => setN(Math.round(x)) }); return () => c.stop() } }, [v, to])
  return <div className="stat" ref={r}><b>{n}{suffix}</b><span>{label}</span></div>
}

export const ShinyText = ({ children, className = '', style = {} }) => <span className={`shiny ${className}`} style={style}>{children}</span>

export function ScrollExpand({ children, className = '', style = {} }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.4'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const borderRadius = useTransform(scrollYProgress, [0, 1], [32, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 1])

  return (
    <motion.section
      ref={ref}
      className={className}
      style={{
        scale,
        borderRadius,
        opacity,
        overflow: 'hidden',
        transformOrigin: 'center top',
        willChange: 'transform, opacity, border-radius',
        ...style,
      }}
    >
      {children}
    </motion.section>
  )
}

export const Aurora = () => <div className="aurora"><b /><b /></div>
export const Noise = () => <div className="noise" />
export function Img({ src, alt = '' }) {
  const [bad, setBad] = useState(false)
  return bad ? <div className="ph" style={{ width: '100%', height: '100%' }} /> : <img className="scroll-motion" src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />
}