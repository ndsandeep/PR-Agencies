import { createElement, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const splitText = (text, splitType) => {
  const pattern = splitType === 'chars'
    ? /(\s+|[\s\S])/gu
    : /(\s+|[^\s]+)/g
  return String(text).match(pattern) || []
}

function AnimatedText({
  text,
  tag = 'h2',
  className = '',
  splitType = 'words',
  trigger = 'view',
  delay = 0,
  duration = .55,
  threshold = .16,
  rootMargin = '0px',
  triggerOnce = true,
  from,
  to = { opacity: 1, y: 0 },
  style = {},
  onAnimationComplete
}) {
  const reduceMotion = useReducedMotion()
  const pieces = useMemo(() => splitText(text, splitType), [text, splitType])
  const Element = motion[tag]
  const initial = reduceMotion ? false : (from || { opacity: 0, y: 12 })
  const viewProps = trigger === 'view'
    ? { whileInView: to, viewport: { once: triggerOnce, amount: threshold, margin: rootMargin } }
    : { animate: to }

  return createElement(Element, {
    className: `scroll-motion ${className}`.trim(),
    'aria-label': text,
    style,
    initial,
    ...viewProps,
    onAnimationComplete
  }, createElement('span', { 'aria-hidden': true }, pieces.map((piece, index) => (
    /^\s+$/.test(piece)
      ? piece
      : createElement(motion.span, {
        key: index,
        style: { display: 'inline-block' },
        initial: reduceMotion ? false : { opacity: 0, y: 12 },
        ...(trigger === 'view' ? { whileInView: { opacity: 1, y: 0 } } : { animate: { opacity: 1, y: 0 } }),
        viewport: { once: triggerOnce, amount: threshold, margin: rootMargin },
        transition: { duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay / 1000 + index * .025 }
      }, piece)
  ))))
}

export function BlurText({
  text,
  as = 'h2',
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  delay = 40,
  stepDuration = .28,
  blur = 1,
  distance = 4,
  trigger = 'view',
  animationFrom,
  animationTo = [{ opacity: 1, filter: 'blur(0px)', y: 0 }],
  style = {},
  onAnimationComplete
}) {
  const reduceMotion = useReducedMotion()
  const pieces = useMemo(() => splitText(text, animateBy), [text, animateBy])
  const Element = motion[as]
  const from = reduceMotion
    ? false
    : (animationFrom || {
      opacity: .8,
      filter: `blur(${blur}px)`,
      y: direction === 'top' ? -distance : distance
    })
  const to = reduceMotion
    ? { opacity: 1, filter: 'blur(0px)', y: 0 }
    : (animationTo[0] || { opacity: 1, filter: 'blur(0px)', y: 0 })
  const animationProps = trigger === 'view'
    ? { whileInView: to, viewport: { once: true, amount: .1 } }
    : { animate: to }

  return createElement(Element, {
    className: `scroll-motion ${className}`.trim(),
    'aria-label': text,
    style,
    initial: from,
    ...animationProps,
    onAnimationComplete
  }, createElement('span', { 'aria-hidden': true }, pieces.map((piece, index) => (
    /^\s+$/.test(piece)
      ? piece
      : createElement(motion.span, {
        key: index,
        style: { display: 'inline-block' },
        initial: reduceMotion ? false : from,
        ...(trigger === 'view' ? { whileInView: to } : { animate: to }),
        viewport: { once: true, amount: .1 },
        transition: {
          duration: reduceMotion ? 0 : stepDuration,
          delay: reduceMotion ? 0 : delay / 1000 + index * .035
        }
      }, piece)
  ))))
}

export function SplitText({
  text,
  tag = 'h2',
  className = '',
  splitType = 'words',
  trigger = 'view',
  delay = 0,
  duration = .55,
  threshold = .16,
  rootMargin = '0px',
  triggerOnce = true,
  from,
  to,
  style = {},
  onLetterAnimationComplete
}) {
  return createElement(AnimatedText, {
    text,
    tag,
    className,
    splitType,
    trigger,
    delay,
    duration,
    threshold,
    rootMargin,
    triggerOnce,
    from,
    to,
    style,
    onAnimationComplete: onLetterAnimationComplete
  })
}

export function ShuffleText({
  text,
  tag = 'h2',
  className = '',
  delay = 0,
  duration = .35,
  threshold = .1,
  triggerOnce = true,
  textAlign = 'left',
  style = {}
}) {
  return createElement(SplitText, {
    text,
    tag,
    className,
    splitType: 'words',
    trigger: 'view',
    delay,
    duration,
    threshold,
    triggerOnce,
    style: { textAlign, ...style }
  })
}

export function ShinyText({ text, className = '', style = {} }) {
  return createElement('span', { className: `scroll-motion shiny ${className}`.trim(), style }, text)
}
