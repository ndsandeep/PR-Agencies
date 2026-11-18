// Contact-specific Framer Motion animation components
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/**
 * ContactReveal – scroll-triggered reveal for Contact page sections
 * Uses unique naming to avoid conflicts with shared Reveal component
 */
export function ContactReveal({ children, delay = 0, className = '', y = 40, style = {}, variant = 'rise' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const prefersReducedMotion = useReducedMotion()
  const initial = {
    rise: { opacity: 0, y },
    'slide-left': { opacity: 0, x: -72 },
    'slide-right': { opacity: 0, x: 72 },
    'blur-up': { opacity: 0, y: 28, filter: 'blur(12px)' },
    zoom: { opacity: 0, scale: .82 },
    'flip-left': { opacity: 0, x: -38, rotateY: -24 },
    'flip-right': { opacity: 0, x: 38, rotateY: 24 }
  }[variant] || { opacity: 0, y }

  return (
    <motion.div
      ref={ref}
      className={`scroll-motion ${className}`.trim()}
      style={style}
      initial={prefersReducedMotion ? false : initial}
      animate={prefersReducedMotion || isInView ? { opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0, filter: 'blur(0px)' } : undefined}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ContactStagger – staggers children's entrance with a uniform delay
 */
export function ContactStagger({ children, className = '', staggerDelay = 0.1 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={`scroll-motion ${className}`.trim()}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/** Individual stagger child item */
export function ContactStaggerItem({ children, className = '' }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.2, 0.8, 0.2, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ContactFormAnimation – wraps the form with a scale-up entrance
 */
export function ContactFormAnimation({ children, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={`scroll-motion ${className}`.trim()}
      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : undefined}
      transition={{
        duration: 0.7,
        delay: 0.15,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  )
}


/**
 * DecryptedText – React component that decrypts text with scrambling hacker glyphs
 * into the clear text string when scrolled into view or hovered.
 */
const DECRYPT_GLYPHS = '!@#$%^&*()_+-=<>?/~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function DecryptedText({
  text = '',
  speed = 28,
  revealDelay = 120,
  className = '',
  as: Component = 'p',
  style = {},
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isDecrypted, setIsDecrypted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const prefersReducedMotion = useReducedMotion()

  const startDecryption = () => {
    if (prefersReducedMotion) {
      setDisplayText(text)
      setIsDecrypted(true)
      return
    }

    let currentIndex = 0
    setIsDecrypted(false)

    const interval = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(interval)
        setDisplayText(text)
        setIsDecrypted(true)
        return
      }

      // Generate string with revealed letters + scrambled glyphs
      let scrambled = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' '
        } else if (i < currentIndex) {
          scrambled += text[i]
        } else if (i < currentIndex + 4) {
          const rand = Math.floor(Math.random() * DECRYPT_GLYPHS.length)
          scrambled += DECRYPT_GLYPHS[rand]
        } else {
          scrambled += text[i]
        }
      }

      setDisplayText(scrambled)
      currentIndex++
    }, speed)

    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => {
      startDecryption()
    }, revealDelay)
    return () => clearTimeout(timer)
  }, [isInView, text, speed, revealDelay, prefersReducedMotion])

  return (
    <Component
      ref={ref}
      className={`contact-decrypted-text ${isDecrypted ? 'is-decrypted' : ''} ${className}`}
      onMouseEnter={() => !prefersReducedMotion && startDecryption()}
      style={style}
    >
      <span className="contact-decrypted-content">{displayText}</span>
    </Component>
  )
}


/**
 * Hyperspeed – High-speed 3D Cyber Highway & Neon Light Trails
 * React Bits style component simulating a fast-moving 3D perspective warp-speed highway
 * spanning the full screen width with curving distortion, neon streaks, and hover boost.
 */
export function Hyperspeed({
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: '80px' })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId
    let w = 0
    let h = 0
    let isHovered = false

    const MAX_Z = 1200
    const FOV = 360
    const NUM_STREAKS = 140
    const NUM_DASHES = 36
    const NUM_OVERHEAD = 32

    let streaks = []
    let dashes = []
    let overheadRays = []

    // Neon palettes matching React Bits Hyperspeed presets
    const leftColors = ['#ff007f', '#e024c3', '#c026d3', '#a855f7', '#7c74ff', '#f43f5e']
    const rightColors = ['#00f5ff', '#00d2ff', '#06b6d4', '#0ea5e9', '#38bdf8', '#3b82f6']

    const initEntities = () => {
      if (w === 0) return
      streaks = []
      dashes = []
      overheadRays = []

      const roadWidth = w * 0.95

      // Ground traffic streaks (left = magenta/pink, right = cyan/blue)
      for (let i = 0; i < NUM_STREAKS; i++) {
        const isLeft = i % 2 === 0
        const side = isLeft ? -1 : 1
        const laneOffset = 45 + Math.random() * (roadWidth * 0.44)
        const colors = isLeft ? leftColors : rightColors
        streaks.push({
          x: side * laneOffset,
          y: 75 + (Math.random() - 0.5) * 22,
          z: Math.random() * MAX_Z,
          len: 80 + Math.random() * 160,
          speed: 14 + Math.random() * 18,
          width: 1.8 + Math.random() * 2.4,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }

      // Overhead / lateral high-speed light rails (framing the outer canvas)
      for (let i = 0; i < NUM_OVERHEAD; i++) {
        const isLeft = i % 2 === 0
        const side = isLeft ? -1 : 1
        const xOffset = w * 0.32 + Math.random() * (w * 0.38)
        const yOffset = -80 - Math.random() * 140
        overheadRays.push({
          x: side * xOffset,
          y: yOffset,
          z: Math.random() * MAX_Z,
          len: 90 + Math.random() * 180,
          speed: 18 + Math.random() * 16,
          width: 1.5 + Math.random() * 2,
          color: isLeft ? '#ec4899' : '#00d2ff',
        })
      }

      // Center broken dashed lane stripes
      for (let i = 0; i < NUM_DASHES; i++) {
        dashes.push({
          z: (i / NUM_DASHES) * MAX_Z,
          len: 20,
        })
      }
    }

    const resize = () => {
      if (!container) return
      w = canvas.width = container.offsetWidth
      h = canvas.height = container.offsetHeight
      initEntities()
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseEnter = () => {
      isHovered = true
    }
    const handleMouseLeave = () => {
      isHovered = false
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    let time = 0
    let currentSpeedMult = 1

    const render = () => {
      if (!isInView) {
        animId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, w, h)
      time += 0.024

      // Speed transition on hover
      const targetMult = isHovered ? 2.0 : 1
      currentSpeedMult += (targetMult - currentSpeedMult) * 0.08

      const baseSpeed = 12 * currentSpeedMult
      const cx = w / 2
      const cy = h * 0.42

      // Curving road function
      const getCurve = (z) => {
        const factor = Math.pow(z / MAX_Z, 1.8)
        const curveX = Math.sin(time * 0.7 + z * 0.003) * (w * 0.16) * factor
        const curveY = Math.cos(time * 0.5 + z * 0.002) * (h * 0.06) * factor
        return { curveX, curveY }
      }

      const project = (x, y, z) => {
        const { curveX, curveY } = getCurve(z)
        const scale = FOV / (z + FOV)
        return {
          x: cx + (x + curveX) * scale,
          y: cy + (y + curveY) * scale,
          scale,
        }
      }

      const roadWidth = w * 0.95

      // 1. Perspective Road Bed
      ctx.beginPath()
      const pNearL = project(-roadWidth * 0.55, 75, 20)
      const pNearR = project(roadWidth * 0.55, 75, 20)
      const pFarR = project(roadWidth * 0.55, 75, MAX_Z)
      const pFarL = project(-roadWidth * 0.55, 75, MAX_Z)

      ctx.moveTo(pNearL.x, pNearL.y)
      ctx.lineTo(pNearR.x, pNearR.y)
      ctx.lineTo(pFarR.x, pFarR.y)
      ctx.lineTo(pFarL.x, pFarL.y)
      ctx.closePath()

      const roadGrad = ctx.createLinearGradient(0, cy, 0, h)
      roadGrad.addColorStop(0, 'rgba(5, 7, 18, 0.4)')
      roadGrad.addColorStop(0.5, 'rgba(6, 8, 22, 0.75)')
      roadGrad.addColorStop(1, 'rgba(4, 5, 14, 0.95)')
      ctx.fillStyle = roadGrad
      ctx.fill()

      // 2. Glowing Road Edges
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(224, 36, 195, 0.5)'
      ctx.beginPath()
      ctx.moveTo(pNearL.x, pNearL.y)
      ctx.lineTo(pFarL.x, pFarL.y)
      ctx.stroke()

      ctx.strokeStyle = 'rgba(0, 210, 255, 0.5)'
      ctx.beginPath()
      ctx.moveTo(pNearR.x, pNearR.y)
      ctx.lineTo(pFarR.x, pFarR.y)
      ctx.stroke()

      // 3. Center Dashes
      for (const d of dashes) {
        d.z -= baseSpeed * 1.4
        if (d.z < 20) d.z += MAX_Z

        const p1 = project(0, 75, d.z)
        const p2 = project(0, 75, Math.min(MAX_Z, d.z + d.len))
        if (p1.scale > 0 && p2.scale > 0) {
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(201, 206, 216, ${p1.scale * 0.7})`
          ctx.lineWidth = Math.max(1, 4 * p1.scale)
          ctx.stroke()
        }
      }

      // 4. Ground Neon Car Light Streaks (Left & Right Lanes)
      for (const s of streaks) {
        s.z -= s.speed * currentSpeedMult
        if (s.z < 20) {
          s.z += MAX_Z
          s.len = 80 + Math.random() * 160
        }

        const pHead = project(s.x, s.y, s.z)
        const pTail = project(s.x, s.y, Math.min(MAX_Z, s.z + s.len * currentSpeedMult))

        if (pHead.scale > 0 && pTail.scale > 0) {
          const alpha = Math.min(1, pHead.scale * 2.2)
          const grad = ctx.createLinearGradient(pTail.x, pTail.y, pHead.x, pHead.y)
          grad.addColorStop(0, 'rgba(255,255,255,0)')
          grad.addColorStop(0.3, s.color)
          grad.addColorStop(1, '#ffffff')

          ctx.beginPath()
          ctx.moveTo(pTail.x, pTail.y)
          ctx.lineTo(pHead.x, pHead.y)
          ctx.strokeStyle = grad
          ctx.lineWidth = Math.max(1.2, s.width * pHead.scale * (isHovered ? 1.5 : 1.2))
          ctx.shadowColor = s.color
          ctx.shadowBlur = 12 * pHead.scale
          ctx.stroke()
          ctx.shadowBlur = 0
        }
      }

      // 5. Overhead / Lateral Warp Streaks (framing outer canvas edges)
      for (const o of overheadRays) {
        o.z -= o.speed * currentSpeedMult
        if (o.z < 20) {
          o.z += MAX_Z
          o.len = 90 + Math.random() * 180
        }

        const pHead = project(o.x, o.y, o.z)
        const pTail = project(o.x, o.y, Math.min(MAX_Z, o.z + o.len * currentSpeedMult))

        if (pHead.scale > 0 && pTail.scale > 0) {
          const alpha = Math.min(0.85, pHead.scale * 1.8)
          const grad = ctx.createLinearGradient(pTail.x, pTail.y, pHead.x, pHead.y)
          grad.addColorStop(0, 'rgba(255,255,255,0)')
          grad.addColorStop(0.4, o.color)
          grad.addColorStop(1, '#ffffff')

          ctx.beginPath()
          ctx.moveTo(pTail.x, pTail.y)
          ctx.lineTo(pHead.x, pHead.y)
          ctx.strokeStyle = grad
          ctx.lineWidth = Math.max(1, o.width * pHead.scale)
          ctx.shadowColor = o.color
          ctx.shadowBlur = 8 * pHead.scale
          ctx.stroke()
          ctx.shadowBlur = 0
        }
      }

      // 6. Horizon Glow at Vanishing Point
      const hPoint = project(0, 0, MAX_Z)
      const glowGrad = ctx.createRadialGradient(hPoint.x, hPoint.y, 2, hPoint.x, hPoint.y, w * 0.35)
      glowGrad.addColorStop(0, 'rgba(0, 210, 255, 0.18)')
      glowGrad.addColorStop(0.3, 'rgba(124, 116, 255, 0.12)')
      glowGrad.addColorStop(1, 'rgba(4, 5, 14, 0)')
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, w, h)

      animId = requestAnimationFrame(render)
    }

    if (!prefersReducedMotion) {
      render()
    }

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isInView, prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className={`contact-hyperspeed-wrap ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="contact-hyperspeed-canvas" />
    </div>
  )
}
