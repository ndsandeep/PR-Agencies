import { createElement } from 'react'
import { useReducedMotion } from 'framer-motion'
import {
  BlurText as ReactBitsBlurText,
  ShinyText as ReactBitsShinyText,
  ShuffleText as ReactBitsShuffle,
  SplitText as ReactBitsSplitText
} from '../../components/AnimatedText.jsx'

export function HomeShinyText({ text, className = '', style = {} }) {
  const props = {
    text,
    className: `home-heading-shiny ${className}`.trim(),
    color: '#b5b5b5',
    shineColor: '#ffffff',
    speed: 2,
    shineWidth: 40,
    softness: .8,
    trigger: 'loop',
    delay: 0,
    angle: 120,
    bands: 1,
    glow: 0,
    direction: 'left',
    easing: 'smooth',
    yoyo: false,
    followPointer: false,
    pauseOnHover: false,
    disabled: false,
    style
  }
  return createElement(ReactBitsShinyText, props)
}

export function HomeBlurText({
  text,
  as = 'h2',
  className = '',
  delay = 40,
  stepDuration = .28,
  blur = 1,
  distance = 4,
  animateBy = 'words',
  direction = 'bottom',
  staggerFrom = 'start',
  effect = 'blur',
  trigger,
  loop = false,
  loopDelay = 2,
  focusOnHover = false,
  threshold = .1,
  rootMargin = '0px',
  onAnimationComplete,
  usePresetEffect = false,
  style = {}
}) {
  const reduceMotion = useReducedMotion()
  const from = reduceMotion ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: .8, filter: 'blur(.5px)', y: 2 }
  const to = { opacity: 1, filter: 'blur(0px)', y: 0 }

  return createElement(ReactBitsBlurText, {
    text,
    as,
    className: `home-heading-blur ${className}`.trim(),
    animateBy,
    direction,
    delay: reduceMotion ? 0 : delay,
    stepDuration: reduceMotion ? 0 : stepDuration,
    blur,
    distance,
    effect,
    staggerFrom,
    trigger: reduceMotion || as === 'h1' ? 'load' : trigger || 'view',
    loop,
    loopDelay,
    focusOnHover,
    threshold,
    rootMargin,
    onAnimationComplete,
    animationFrom: usePresetEffect ? undefined : from,
    animationTo: usePresetEffect ? undefined : [to],
    style: {
      display: as === 'span'
        ? (className.includes('kicker') ? undefined : 'inline-flex')
        : 'flex',
      flexWrap: 'wrap',
      textAlign: 'left',
      width: as === 'span' ? 'auto' : '100%',
      ...style
    }
  })
}

export function HomeShuffle({ text, className = '', style = {} }) {
  const props = {
    text,
    tag: 'h2',
    className: `home-heading-shuffle ${className}`.trim(),
    effect: 'slide',
    shuffleDirection: 'right',
    duration: .35,
    animationMode: 'evenodd',
    shuffleTimes: 1,
    ease: 'power3.out',
    stagger: .03,
    threshold: .1,
    triggerOnce: true,
    triggerOnHover: true,
    hoverRadius: 0,
    motionBlur: false,
    respectReducedMotion: true,
    maxDelay: 0,
    scrambleCharset: '',
    loop: false,
    loopDelay: 0,
    textAlign: 'left',
    style: {
      display: 'block',
      width: '100%',
      ...style
    }
  }
  return createElement(ReactBitsShuffle, props)
}

export function HomeSplitText({
  text,
  tag = 'h2',
  className = '',
  delay = 20,
  duration = .55,
  splitType = 'words',
  staggerFrom = 'start',
  trigger,
  hoverEffect = 'none',
  loop = false,
  loopDelay = 1.5,
  mask = false,
  threshold = .16,
  rootMargin = '0px',
  textAlign = 'left',
  onLetterAnimationComplete,
  style = {}
}) {
  return createElement(ReactBitsSplitText, {
    text,
    tag,
    className: `home-heading-split ${className}`.trim(),
    splitType,
    effect: 'rise',
    trigger: trigger || (tag === 'h1' ? 'load' : 'view'),
    delay,
    duration,
    staggerFrom,
    hoverEffect,
    loop,
    loopDelay,
    mask,
    threshold,
    rootMargin,
    textAlign,
    onLetterAnimationComplete,
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

export const approachTrackAnimation = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: .35 },
  transition: { duration: 1.2, ease: [.2, .8, .2, 1] }
}

export const approachDotAnimation = delay => ({
  initial: { scale: 0 },
  whileInView: { scale: 1 },
  viewport: { once: true, amount: .6 },
  transition: { duration: .45, delay, ease: [.2, .8, .2, 1] }
})
