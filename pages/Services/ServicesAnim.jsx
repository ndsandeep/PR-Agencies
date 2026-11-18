// Services-specific Framer Motion animation components
import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'

/**
 * ElasticMesh – React Bits inspired canvas animation
 * Renders a responsive elastic mesh / spring-grid in the background of the
 * "Brands We're Associated With" heading. Pure canvas, zero deps.
 */
export function ElasticMesh({ className = '', style = {} }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const animRef = useRef(null)
  const meshRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const COLS = 18
    const ROWS = 7
    const SPRING = 0.08
    const DAMPING = 0.76
    const MOUSE_RADIUS = 90
    const MOUSE_FORCE = 0.28

    let w = 0, h = 0

    const buildGrid = () => {
      const pts = []
      for (let r = 0; r <= ROWS; r++) {
        pts[r] = []
        for (let c = 0; c <= COLS; c++) {
          const ox = (c / COLS) * w
          const oy = (r / ROWS) * h
          pts[r][c] = { ox, oy, x: ox, y: oy, vx: 0, vy: 0 }
        }
      }
      return pts
    }

    const resize = () => {
      w = canvas.width = container.offsetWidth
      h = canvas.height = container.offsetHeight
      meshRef.current = buildGrid()
    }

    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      const pts = meshRef.current
      if (!pts) { animRef.current = requestAnimationFrame(render); return }
      const mx = mouseRef.current.x, my = mouseRef.current.y

      // Spring physics update
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const p = pts[r][c]
          const dx = mx - p.x, dy = my - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE
            p.vx -= dx * force * 0.06
            p.vy -= dy * force * 0.06
          }
          p.vx += (p.ox - p.x) * SPRING
          p.vy += (p.oy - p.y) * SPRING
          p.vx *= DAMPING
          p.vy *= DAMPING
          p.x += p.vx
          p.y += p.vy
        }
      }

      // Draw horizontal mesh lines
      for (let r = 0; r <= ROWS; r++) {
        ctx.beginPath()
        for (let c = 0; c <= COLS; c++) {
          const p = pts[r][c]
          c === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        }
        const alpha = 0.09 + (r / ROWS) * 0.07
        ctx.strokeStyle = `rgba(124, 116, 255, ${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      // Draw vertical mesh lines
      for (let c = 0; c <= COLS; c++) {
        ctx.beginPath()
        for (let r = 0; r <= ROWS; r++) {
          const p = pts[r][c]
          r === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        }
        const alpha = 0.07 + (c / COLS) * 0.06
        ctx.strokeStyle = `rgba(96, 86, 240, ${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      // Intersection dots
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const p = pts[r][c]
          const distO = Math.sqrt((p.x - p.ox) ** 2 + (p.y - p.oy) ** 2)
          const glow = Math.min(1, distO / 12)
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.4 + glow * 1.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(160, 148, 255, ${0.18 + glow * 0.5})`
          ctx.fill()
        }
      }

      animRef.current = requestAnimationFrame(render)
    }

    if (!prefersReducedMotion) render()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [prefersReducedMotion])

  return (
    <div ref={containerRef} className={`services-elastic-mesh-wrap ${className}`} style={style}>
      <canvas ref={canvasRef} className="services-elastic-mesh-canvas" />
    </div>
  )
}

/**
 * ServicesScrollExpand – A genuine scroll-triggered expand component
 * Uses Framer Motion useScroll + useTransform for smooth viewport-based animation
 */
export function ServicesScrollExpand({ children, className = '', style = {} }) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.35'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0.88, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], prefersReducedMotion ? [1, 1] : [0.5, 1])
  const borderRadius = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [36, 0])

  return (
    <motion.section
      ref={ref}
      className={className}
      style={{
        scale,
        opacity,
        borderRadius,
        overflow: 'hidden',
        transformOrigin: 'center top',
        willChange: prefersReducedMotion ? 'auto' : 'transform, opacity, border-radius',
        ...style,
      }}
    >
      {children}
    </motion.section>
  )
}

/**
 * TextPressure – Interactive variable-font heading with pressure effect.
 * Requires a variable font with wght axis.
 * Uses "Big Shoulders Display" loaded via @font-face in ServicesAnimations.css
 */
export function TextPressure({
  text = 'OUR APPROACH',
  className = '',
  fontFamily = "'Big Shoulders Display', 'Space Grotesk', sans-serif",
  minWeight = 100,
  maxWeight = 900,
  style = {},
}) {
  const containerRef = useRef(null)
  const [spans, setSpans] = useState([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const chars = Array.from(text)
    setSpans(chars.map((char, i) => ({ char, id: i, weight: minWeight })))
  }, [text, minWeight])

  const handlePointerMove = useCallback(
    (e) => {
      if (prefersReducedMotion) return
      const container = containerRef.current
      if (!container) return
      const spanEls = container.querySelectorAll('.services-pressure-char')
      if (!spanEls.length) return

      const mouseX = e.clientX
      const mouseY = e.clientY

      setSpans((prev) =>
        prev.map((s, i) => {
          const el = spanEls[i]
          if (!el) return s
          const rect = el.getBoundingClientRect()
          const charCX = rect.left + rect.width / 2
          const charCY = rect.top + rect.height / 2
          const dist = Math.sqrt((mouseX - charCX) ** 2 + (mouseY - charCY) ** 2)
          const maxDist = 220
          const proximity = Math.max(0, 1 - dist / maxDist)

          return {
            ...s,
            weight: Math.round(minWeight + (maxWeight - minWeight) * proximity),
          }
        })
      )
    },
    [prefersReducedMotion, minWeight, maxWeight]
  )

  const handlePointerLeave = useCallback(() => {
    setSpans((prev) => prev.map((s) => ({ ...s, weight: minWeight })))
  }, [minWeight])

  return (
    <div
      ref={containerRef}
      className={`services-pressure-wrap ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        cursor: 'default',
        fontFamily,
        lineHeight: 1.05,
        ...style,
      }}
    >
      {spans.map((s) => (
        <span
          key={s.id}
          className="services-pressure-char"
          style={{
            display: 'inline-block',
            fontVariationSettings: `"wght" ${s.weight}`,
            transition: prefersReducedMotion ? 'none' : 'font-variation-settings 0.15s ease-out',
            whiteSpace: s.char === ' ' ? 'pre' : 'normal',
          }}
        >
          {s.char === ' ' ? '\u00A0' : s.char}
        </span>
      ))}
    </div>
  )
}

/**
 * TextType – React component that dynamically types out text character-by-character
 * when scrolled into view, featuring an animated cursor.
 */
export function TextType({
  text = '',
  speed = 26,
  delay = 200,
  cursor = true,
  cursorChar = '|',
  className = '',
  style = {},
  as: Component = 'p',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const prefersReducedMotion = useReducedMotion()
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text)
      setIsTypingComplete(true)
      return
    }

    if (!isInView) return

    let currentIndex = 0
    let timeoutId

    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
          timeoutId = setTimeout(typeNextChar, speed)
        } else {
          setIsTypingComplete(true)
        }
      }
      typeNextChar()
    }

    timeoutId = setTimeout(startTyping, delay)

    return () => clearTimeout(timeoutId)
  }, [isInView, text, speed, delay, prefersReducedMotion])

  return (
    <Component ref={ref} className={`services-text-type ${className}`} style={style}>
      <span>{displayedText}</span>
      {cursor && !isTypingComplete && (
        <span className="services-text-type-cursor" aria-hidden="true">
          {cursorChar}
        </span>
      )}
    </Component>
  )
}

/**
 * FoldText – 3D origami paper fold text animation component
 * Unfolds words along a 3D perspective fold axis with dynamic facet lighting.
 */
export function FoldText({
  text = '',
  className = '',
  style = {},
  as: Tag = 'h1',
  delay = 0.15,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()

  const words = text.split(' ')

  return (
    <Tag
      ref={ref}
      className={`services-fold-text-wrap ${className}`}
      style={style}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="services-fold-word-container">
          <motion.span
            className="services-fold-word"
            initial={
              prefersReducedMotion
                ? { opacity: 1, rotateX: 0, y: 0 }
                : { opacity: 0, rotateX: -80, y: 30 }
            }
            animate={
              isInView
                ? { opacity: 1, rotateX: 0, y: 0 }
                : undefined
            }
            transition={{
              duration: 0.85,
              delay: delay + i * 0.07,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <span className="services-fold-facet-top">{word}&nbsp;</span>
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * SplitFlapText – Mechanical departure-board split-flap text component
 * Characters flip mechanically through rapid cycles before settling into place.
 */
const FLAP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function SplitFlapText({
  text = 'WHAT WE DO',
  className = '',
  style = {},
  speed = 38,
  flipCycles = 6,
}) {
  const chars = Array.from(text)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      ref={ref}
      className={`services-split-flap-board ${className}`}
      style={style}
      aria-label={text}
    >
      {chars.map((char, i) => {
        if (char === ' ') {
          return <span key={i} className="services-split-flap-space" />
        }
        return (
          <SplitFlapTile
            key={i}
            targetChar={char}
            index={i}
            isInView={isInView}
            speed={speed}
            flipCycles={flipCycles}
            prefersReducedMotion={prefersReducedMotion}
          />
        )
      })}
    </div>
  )
}

function SplitFlapTile({
  targetChar,
  index,
  isInView,
  speed,
  flipCycles,
  prefersReducedMotion,
}) {
  const [currentChar, setCurrentChar] = useState(
    prefersReducedMotion ? targetChar : ' '
  )
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentChar(targetChar)
      return
    }

    if (!isInView) return

    let cycle = 0
    let timer = null
    const initialDelay = index * 70

    const delayTimer = setTimeout(() => {
      setIsFlipping(true)
      const flip = () => {
        cycle++
        if (cycle >= flipCycles) {
          setCurrentChar(targetChar)
          setIsFlipping(false)
        } else {
          const randIdx = Math.floor(Math.random() * FLAP_CHARS.length)
          setCurrentChar(FLAP_CHARS[randIdx])
          timer = setTimeout(flip, speed + cycle * 8)
        }
      }
      flip()
    }, initialDelay)

    return () => {
      clearTimeout(delayTimer)
      if (timer) clearTimeout(timer)
    }
  }, [isInView, targetChar, index, speed, flipCycles, prefersReducedMotion])

  return (
    <div className={`services-split-flap-tile ${isFlipping ? 'is-flipping' : ''}`}>
      <div className="services-split-flap-card">
        <span className="services-split-flap-char">{currentChar}</span>
        <div className="services-split-flap-seam" />
        <div className="services-split-flap-hinge-left" />
        <div className="services-split-flap-hinge-right" />
      </div>
    </div>
  )
}


/**
 * GlitchText – React component with digital cyberpunk chromatic glitch effect.
 * Renders full width and features chromatic aberration with continuous and interactive glitch triggers.
 */
export function GlitchText({
  children,
  text,
  className = '',
  as: Component = 'div',
  continuous = true,
  style = {},
}) {
  const content = text || children
  const [isGlitching, setIsGlitching] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <Component
      className={`services-glitch-container ${continuous ? 'is-continuous' : ''} ${isGlitching ? 'is-glitching' : ''} ${className}`}
      data-text={typeof content === 'string' ? content : undefined}
      onMouseEnter={() => !prefersReducedMotion && setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
      style={style}
    >
      <span className="services-glitch-content">{content}</span>
      {!prefersReducedMotion && (
        <>
          <span className="services-glitch-slice services-glitch-slice-red" aria-hidden="true">
            {content}
          </span>
          <span className="services-glitch-slice services-glitch-slice-cyan" aria-hidden="true">
            {content}
          </span>
        </>
      )}
    </Component>
  )
}

/**
 * LightTunnel – Hyperspace Warp / Star Wars jump-to-lightspeed canvas animation
 * Pure black background with white/silver straight radial streak lines firing from centre outward.
 * No colour tints, no rotation, no rings — only bright white starlines.
 */
export function LightTunnel({ className = '', style = {} }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: '100px' })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId
    let w = 0
    let h = 0

    const resize = () => {
      const c = containerRef.current
      if (!c) return
      w = canvas.width = c.offsetWidth
      h = canvas.height = c.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const NUM_STARS = 220
    const stars = Array.from({ length: NUM_STARS }, () => ({
      angle: Math.random() * Math.PI * 2,
      // Spread initial positions across the whole canvas so it's dense at start
      distance: Math.random() * 160 + 10,
      speed: 3.5 + Math.random() * 9,
      width: 0.4 + Math.random() * 1.8,
    }))

    const render = () => {
      // Solid black background — no glow, no fill gradients
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2
      const maxDist = Math.sqrt(cx * cx + cy * cy) + 80

      for (const star of stars) {
        // Accelerate as the star moves further out (perspective effect)
        star.distance += star.speed * (1 + star.distance / 200)

        if (star.distance > maxDist) {
          // Reset to a tight cluster near the centre vanishing point
          star.distance = 4 + Math.random() * 18
          star.angle = Math.random() * Math.PI * 2
        }

        // Fade in as the star leaves the centre
        const alpha = Math.min(1, star.distance / (maxDist * 0.35))

        // Tail length grows with distance (depth perspective)
        const tailLen = star.speed * (1 + star.distance / 70) * 3.5

        const x1 = cx + Math.cos(star.angle) * star.distance
        const y1 = cy + Math.sin(star.angle) * star.distance
        const x2 = cx + Math.cos(star.angle) * Math.max(1, star.distance - tailLen)
        const y2 = cy + Math.sin(star.angle) * Math.max(1, star.distance - tailLen)

        // White gradient streak: transparent at tail → bright at tip
        const grad = ctx.createLinearGradient(x2, y2, x1, y1)
        grad.addColorStop(0, 'rgba(255,255,255,0)')
        grad.addColorStop(0.6, `rgba(220,220,255,${alpha * 0.5})`)
        grad.addColorStop(1, `rgba(255,255,255,${alpha})`)

        ctx.beginPath()
        ctx.moveTo(x2, y2)
        ctx.lineTo(x1, y1)
        ctx.strokeStyle = grad
        ctx.lineWidth = star.width * (0.6 + star.distance / 400)
        ctx.stroke()
      }

      animId = requestAnimationFrame(render)
    }

    if (!prefersReducedMotion) render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [isInView, prefersReducedMotion])

  return (
    <div ref={containerRef} className={`services-light-tunnel-wrap ${className}`} style={style}>
      <canvas ref={canvasRef} className="services-light-tunnel-canvas" />
    </div>
  )
}


/**
 * TrueFocus – React Bits inspired "focus blur" word-by-word heading effect.
 * Each word blurs out except the currently focused one, which is sharp and
 * framed by a glowing rectangular focus box that slides from word to word.
 */
export function TrueFocus({
  text = '',
  className = '',
  pauseMs = 1800,
  blurAmount = 6,
  borderColor = '#7c74ff',
  glowColor = 'rgba(124, 116, 255, 0.55)',
}) {
  const words = text.split(' ')
  const [activeIdx, setActiveIdx] = useState(0)
  const [boxStyle, setBoxStyle] = useState({})
  const wordRefs = useRef([])
  const containerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // Cycle through words automatically
  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % words.length)
    }, pauseMs)
    return () => clearInterval(id)
  }, [words.length, pauseMs, prefersReducedMotion])

  // Move the focus box to the active word
  useEffect(() => {
    const el = wordRefs.current[activeIdx]
    const container = containerRef.current
    if (!el || !container) return
    const eRect = el.getBoundingClientRect()
    const cRect = container.getBoundingClientRect()
    setBoxStyle({
      left: eRect.left - cRect.left - 6,
      top: eRect.top - cRect.top - 4,
      width: eRect.width + 12,
      height: eRect.height + 8,
    })
  }, [activeIdx])

  return (
    <div ref={containerRef} className={`services-truefocus-wrap ${className}`}>
      {/* Sliding focus rectangle */}
      <span
        className="services-truefocus-box"
        style={{
          ...boxStyle,
          borderColor,
          boxShadow: `0 0 0 2px ${glowColor}, 0 0 24px ${glowColor}`,
        }}
        aria-hidden="true"
      />

      {/* Words */}
      {words.map((word, i) => {
        const isActive = i === activeIdx
        return (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el }}
            className={`services-truefocus-word ${isActive ? 'is-active' : ''}`}
            style={{
              filter: prefersReducedMotion
                ? 'none'
                : isActive
                  ? 'blur(0px)'
                  : `blur(${blurAmount}px)`,
              opacity: prefersReducedMotion ? 1 : isActive ? 1 : 0.35,
              transition: 'filter 0.5s ease, opacity 0.5s ease',
            }}
          >
            {word}
          </span>
        )
      })}
    </div>
  )
}
