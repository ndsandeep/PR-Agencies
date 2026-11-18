import { createElement, useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { BlurText as ReactBitsBlurText, SplitText as ReactBitsSplitText } from '../../components/AnimatedText.jsx'

export function AboutFoldText({
  text,
  as = 'h2',
  className = '',
  duration = .9,
  stagger = .08,
  style = {}
}) {
  const rootRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const pieces = useMemo(() => text.split(/(\s+)/).map((part, index) => (
    /^\s+$/.test(part)
      ? part
      : createElement('span', { className: 'about-fold-text__segment', key: index },
        createElement('span', { className: 'about-fold-text__piece' }, part))
  )), [text])

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduceMotion || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    if (typeof IntersectionObserver === 'undefined') return undefined

    const animatedPieces = Array.from(root.querySelectorAll('.about-fold-text__piece'))
    if (!animatedPieces.length || !animatedPieces.every(piece => typeof piece.animate === 'function')) return undefined

    const animations = []
    let fallbackTimer = null
    let hasEntered = false

    const resetAnimation = () => {
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer)
      fallbackTimer = null
      animations.forEach(animation => animation.cancel())
      animations.length = 0
    }

    const playAnimation = () => {
      resetAnimation()
      try {
        animatedPieces.forEach((piece, index) => {
          const animation = piece.animate(
            [{ transform: 'rotateX(-86deg)' }, { transform: 'rotateX(0deg)' }],
            {
              duration: duration * 1000,
              delay: stagger * index * 1000,
              easing: 'cubic-bezier(.2,.8,.2,1)',
              fill: 'both'
            }
          )
          animation.onfinish = () => {
            animation.cancel()
            const animationIndex = animations.indexOf(animation)
            if (animationIndex >= 0) animations.splice(animationIndex, 1)
            if (!animations.length && fallbackTimer !== null) {
              window.clearTimeout(fallbackTimer)
              fallbackTimer = null
            }
          }
          animations.push(animation)
        })
        fallbackTimer = window.setTimeout(resetAnimation, (duration + stagger * animatedPieces.length + 1) * 1000)
      } catch (error) {
        resetAnimation()
        console.error('About Fold Text animation failed; keeping the heading visible.', error)
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        hasEntered = true
        playAnimation()
      } else if (hasEntered) {
        resetAnimation()
      }
    }, { threshold: .2 })

    observer.observe(root)
    return () => {
      observer.disconnect()
      resetAnimation()
    }
  }, [duration, reduceMotion, stagger, text])

  return createElement(as, {
    ref: rootRef,
    className: `about-fold-text ${className}`.trim(),
    style,
    'aria-label': as === 'span' ? undefined : text,
    'aria-hidden': as === 'span' ? true : undefined
  }, createElement('span', { className: 'about-fold-text__visual', 'aria-hidden': true }, pieces))
}

export function AboutBlurText({ text, as = 'h2', className = '', delay = 40, style = {} }) {
  const reduceMotion = useReducedMotion()
  const from = reduceMotion ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: .8, filter: 'blur(.5px)', y: 2 }
  const to = { opacity: 1, filter: 'blur(0px)', y: 0 }

  return createElement(ReactBitsBlurText, {
    text,
    as,
    className: `about-heading-blur ${className}`.trim(),
    animateBy: 'words',
    direction: 'bottom',
    delay: reduceMotion ? 0 : delay,
    stepDuration: reduceMotion ? 0 : .28,
    blur: 1,
    distance: 4,
    effect: 'blur',
    trigger: reduceMotion || as === 'h1' ? 'load' : 'view',
    animationFrom: from,
    animationTo: [to],
    style: {
      display: as === 'span'
        ? (className.includes('kicker') || className.includes('about-purpose__eyebrow') ? undefined : 'inline-flex')
        : 'flex',
      flexWrap: 'wrap',
      textAlign: 'left',
      width: as === 'span' ? 'auto' : '100%',
      ...style
    }
  })
}

export function AboutSplitText({ text, tag = 'h2', className = '', delay = 20, trigger, triggerOnce = true, style = {} }) {
  return createElement(ReactBitsSplitText, {
    text,
    tag,
    className: `about-heading-split ${className}`.trim(),
    splitType: 'words',
    effect: 'rise',
    trigger: trigger || (tag === 'h1' ? 'load' : 'view'),
    delay,
    duration: .55,
    threshold: .16,
    rootMargin: '0px',
    triggerOnce,
    textAlign: 'left',
    from: { opacity: tag === 'h1' ? .8 : .25, y: tag === 'h1' ? 5 : 12 },
    to: { opacity: 1, y: 0 },
    style: {
      display: tag === 'span' ? 'inline-block' : 'block',
      width: tag === 'span' ? 'auto' : '100%',
      overflow: 'visible',
      ...style
    }
  })
}

export function directionalRevealAnimation({ direction, image, reduceMotion, delay }) {
  const hidden = reduceMotion
    ? { opacity: 1, x: 0, scale: 1 }
    : { opacity: 0, x: direction === 'left' ? -42 : 42, scale: image ? .97 : 1 }

  return {
    initial: hidden,
    whileInView: { opacity: 1, x: 0, scale: 1 },
    viewport: { once: false, amount: .25 },
    transition: { duration: reduceMotion ? 0 : .75, delay: reduceMotion ? 0 : delay, ease: [.2, .8, .2, 1] }
  }
}

export function advantageRevealAnimation(index, reduceMotion) {
  return {
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .2 },
    transition: {
      duration: reduceMotion ? 0 : .65,
      delay: reduceMotion ? 0 : index * .08,
      ease: [.2, .8, .2, 1]
    }
  }
}
