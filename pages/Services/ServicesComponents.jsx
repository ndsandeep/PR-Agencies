// Services-specific reusable UI components
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Magnet, Reveal, Aurora, Noise, Img, SplitText } from '../../components/Anim.jsx'
import { FoldText, LightTunnel, ElasticMesh, TrueFocus } from './ServicesAnim.jsx'

// ─── Client Logo Imports ──────────────────────────────────────────────────────
import logo01 from './assets/clients/client-01-rainbow.jpg'
import logo02 from './assets/clients/client-02-am-construction.jpg'
import logo03 from './assets/clients/client-03-live-nature.jpg'
import logo04 from './assets/clients/client-04-nri-projects.jpg'
import logo05 from './assets/clients/client-05-vineeth-jewellers.jpg'
import logo06 from './assets/clients/client-06-kalinga-dairy.jpg'
import logo07 from './assets/clients/client-07-bekaert.jpg'
import logo08 from './assets/clients/client-08-mother-dairy.jpg'
import logo09 from './assets/clients/client-09-telemart.jpg'
import logo10 from './assets/clients/client-10-ssvpds.jpg'
import logo11 from './assets/clients/client-11-ssvpd.jpg'

const CLIENT_LOGOS = [
  { src: logo01, name: 'Rainbow Realtors & Agro Farms' },
  { src: logo02, name: 'AM Construction' },
  { src: logo03, name: 'Live in Nature for Healthy Future' },
  { src: logo04, name: 'NRI Projects' },
  { src: logo05, name: 'Vineeth Jewellers' },
  { src: logo06, name: 'Kalinga Dairy' },
  { src: logo07, name: 'Bekaert' },
  { src: logo08, name: 'Mother Dairy' },
  { src: logo09, name: 'Telemart' },
  { src: logo10, name: "SSVPD's" },
  { src: logo11, name: 'SSVPD.' },
]

/** Services Hero section featuring the FoldText style heading */
export function ServicesHero({ kicker, title, sub, img, small = true }) {
  return (
    <section className={'hero' + (small ? ' sm' : '') + ' services-hero-custom'}>
      <div className="bg">
        <Img src={img} alt="Services hero background" />
      </div>
      <Aurora />
      <Noise />
      <div className="wrap">
        {kicker && (
          <Reveal>
            <span className="kicker">{kicker}</span>
          </Reveal>
        )}
        <FoldText text={title} className="h1 services-hero-fold-title" />
        {sub && (
          <Reveal delay={0.4}>
            <p className="lead" style={{ marginTop: 28 }}>
              {sub}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

/** Services CTA section featuring the Light Tunnel Animation */
export function ServicesCTA() {
  return (
    <section className="sec cta services-cta-section">
      <LightTunnel className="services-cta-light-tunnel" />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <SplitText
          as="p"
          text="Start a conversation"
          className="services-cta-kicker-large"
          delay={0}
        />
        <SplitText className="h1" text="Ready to be remembered?" />
        <Reveal delay={0.3}>
          <Magnet>
            <Link to="/contact" className="btn primary">
              Enquire about a campaign →
            </Link>
          </Magnet>
        </Reveal>
      </div>
    </section>
  )
}

/** Services section heading with kicker + title */
export function ServicesSectionHeading({ kicker, title, children }) {
  return (
    <div className="services-section-heading">
      {kicker && <span className="services-kicker">{kicker}</span>}
      {title && <h2 className="services-section-title">{title}</h2>}
      {children}
    </div>
  )
}

/** Enquiry button for each service section */
export function ServicesEnquiry() {
  return (
    <Magnet>
      <Link to="/contact" className="btn primary">
        Enquire about this →
      </Link>
    </Magnet>
  )
}

/** Points list used across service sections */
export function ServicesPointsList({ points }) {
  return (
    <ul className="services-points-list">
      {points.map((point) => (
        <li key={point} className="services-point-item">
          {point}
        </li>
      ))}
    </ul>
  )
}

/**
 * ApproachDepthCarousel – 3D Rotating Carousel
 * - Continuous, perpetual automatic rotation (loops repeatedly)
 * - Distinct vibrant colors per card
 * - Clean indicator pills (no numbers at the bottom)
 */
export function ApproachDepthCarousel({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const timerRef = useRef(null)
  const containerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const total = items.length

  // Start / restart the continuous auto-rotation interval
  const startAutoRotation = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (total <= 1) return
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 3200)
  }, [total])

  // Continuous auto-rotation runs perpetually and wraps repeatedly
  useEffect(() => {
    startAutoRotation()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startAutoRotation])

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
    startAutoRotation()
  }, [total, startAutoRotation])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
    startAutoRotation()
  }, [total, startAutoRotation])

  const goToIndex = useCallback(
    (index) => {
      setActiveIndex(index)
      startAutoRotation()
    },
    [startAutoRotation]
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrev()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrev, goToNext])

  // Touch swipe support
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchEndX - touchStartX
      if (diff > 40) {
        goToPrev()
      } else if (diff < -40) {
        goToNext()
      }
      setTouchStartX(null)
    }
  }

  // 3D Rotation coordinates for cylindrical carousel effect
  const getCardStyle = (index) => {
    if (total === 0) return {}

    let offset = index - activeIndex
    if (offset > Math.floor(total / 2)) {
      offset -= total
    } else if (offset < -Math.floor(total / 2)) {
      offset += total
    }

    const isActive = offset === 0

    if (prefersReducedMotion) {
      return {
        x: `${offset * 105}%`,
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : Math.abs(offset) === 1 ? 0.6 : 0,
        zIndex: 10 - Math.abs(offset),
        rotateY: 0,
        filter: isActive ? 'brightness(1)' : 'brightness(0.6)',
        pointerEvents: Math.abs(offset) > 1 ? 'none' : 'auto',
      }
    }

    // Cylindrical 3D perspective with realistic curved rotation
    const xDistance = offset * 56 // percentage shift
    const zTranslate = -Math.abs(offset) * 180 // deep depth translation
    const rotateY = -offset * 30 // distinct 3D rotation angle
    const scale = isActive ? 1.04 : Math.max(0.64, 1 - Math.abs(offset) * 0.17)
    const opacity = isActive ? 1 : Math.abs(offset) === 1 ? 0.72 : Math.abs(offset) === 2 ? 0.32 : 0

    return {
      x: `${xDistance}%`,
      z: zTranslate,
      scale,
      rotateY,
      opacity,
      zIndex: 10 - Math.abs(offset),
      filter: isActive ? 'brightness(1)' : 'brightness(0.55)',
      pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto',
    }
  }

  return (
    <div
      ref={containerRef}
      className="services-depth-carousel-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Our Approach Methodology Carousel"
    >
      {/* 3D Rotating Stage Container */}
      <div className="services-depth-stage">
        {items.map((item, index) => {
          const style = getCardStyle(index)
          const isActive = index === activeIndex

          return (
            <motion.div
              key={item.id}
              className={`services-depth-card ${isActive ? 'is-active' : ''}`}
              animate={style}
              transition={{
                duration: prefersReducedMotion ? 0.3 : 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => {
                if (!isActive) {
                  goToIndex(index)
                }
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${item.stageNumber} ${item.heading}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <div
                className="services-depth-card-inner"
                style={{
                  background: item.bgGradient,
                  borderColor: isActive ? item.borderColor : 'rgba(201, 206, 216, 0.16)',
                  boxShadow: isActive
                    ? `0 24px 70px -10px ${item.glowColor}, 0 0 35px ${item.glowColor}`
                    : '0 16px 45px -10px rgba(0, 0, 0, 0.65)',
                }}
              >
                {/* Image Banner */}
                <div className="services-depth-card-media">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="services-depth-card-img"
                    loading="lazy"
                  />
                  <div className="services-depth-card-media-overlay" />

                  {/* Badges with Individual Card Colors */}
                  <div className="services-depth-badge-row">
                    <span
                      className="services-depth-number-badge"
                      style={{
                        color: item.color,
                        borderColor: item.borderColor,
                      }}
                    >
                      {item.stageNumber}
                    </span>
                    <span
                      className="services-depth-category-badge"
                      style={{
                        background: item.glowColor,
                        borderColor: item.borderColor,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content with Dynamic Color Highlights */}
                <div className="services-depth-card-body">
                  <span
                    className="services-depth-card-kicker"
                    style={{ color: item.color }}
                  >
                    Stage {item.stageNumber}
                  </span>
                  <h3 className="services-depth-card-title">{item.heading}</h3>
                  <p
                    className="services-depth-card-tagline"
                    style={{ color: item.color }}
                  >
                    {item.tagline}
                  </p>
                  <p className="services-depth-card-desc">{item.description}</p>
                </div>

                {/* Glow Border Overlay */}
                <div
                  className="services-depth-card-glow"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${item.glowColor}, transparent 70%)`,
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Carousel Navigation Controls */}
      <div className="services-depth-controls">
        <button
          type="button"
          className="services-depth-arrow services-depth-prev"
          onClick={goToPrev}
          aria-label="Previous approach stage"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Clean Pagination Indicators (No Numbers) */}
        <div className="services-depth-pagination" role="tablist" aria-label="Carousel pagination">
          {items.map((item, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={item.id}
                type="button"
                className={`services-depth-dot ${isActive ? 'is-active' : ''}`}
                onClick={() => goToIndex(idx)}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to stage ${item.stageNumber} ${item.heading}`}
              >
                <span
                  className="services-depth-dot-pill"
                  style={
                    isActive
                      ? {
                          backgroundColor: item.color,
                          boxShadow: `0 0 12px ${item.glowColor}`,
                        }
                      : undefined
                  }
                />
              </button>
            )
          })}
        </div>

        <button
          type="button"
          className="services-depth-arrow services-depth-next"
          onClick={goToNext}
          aria-label="Next approach stage"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/**
 * ClientsMarquee – "Brands We're Associated With" section
 * - ElasticMesh canvas heading background
 * - Infinite right-to-left CSS marquee with 11 square logo cards
 * - All card names in white; Pauses on hover; violet/purple card outlines; white card bg
 */
export function ClientsMarquee() {
  // Duplicate for seamless loop
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section className="services-clients-section" aria-label="Brands We're Associated With">

      {/* ── OUR CLIENTS: giant SplitText kicker ── */}
      <div className="services-clients-kicker-wrap">
        <SplitText
          as="p"
          text="OUR CLIENTS"
          className="services-clients-split-kicker"
          delay={0}
        />
      </div>

      {/* ── "Brands We're Associated With" heading with Elastic Mesh bg ── */}
      <div className="services-clients-heading-wrap">
        <ElasticMesh className="services-clients-mesh-bg" />
        <div className="services-clients-heading-inner">
          <Reveal delay={0.1}>
            <h2 className="services-clients-title">
              Brands We&apos;re{' '}
              <span className="services-clients-title-accent">Associated With.</span>
            </h2>
          </Reveal>
        </div>
      </div>

      {/* ── Marquee track ── */}
      <div className="services-clients-marquee-outer">
        <div className="services-clients-marquee-track">
          {doubled.map((client, i) => (
            <div
              key={i}
              className="services-clients-card"
              title={client.name}
            >
              <div className="services-clients-card-img-wrap">
                <img
                  src={client.src}
                  alt={client.name}
                  className="services-clients-card-img"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <p className="services-clients-card-name">{client.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * WaitingForSection – "What are you waiting for?" pre-CTA section
 * Uses TrueFocus to animate the heading word by word.
 */
export function WaitingForSection() {
  return (
    <section className="services-waiting-section">
      <div className="services-waiting-inner">
        <TrueFocus
          text="What are you waiting for?"
          className="services-waiting-truefocus"
        />
        <SplitText
          as="p"
          text="Your brand's next chapter starts with a single conversation. Let's write it together."
          className="services-waiting-sub"
          delay={0.05}
        />
      </div>
    </section>
  )
}
