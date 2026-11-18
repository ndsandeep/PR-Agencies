import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Aurora, Img, Magnet, Noise, Reveal } from '../../components/Anim.jsx'
import { IMG } from '../../data'
import { AboutBlurText, AboutFoldText, advantageRevealAnimation, directionalRevealAnimation } from './AboutAnimations.js'
import TextPressure from './TextPressure.jsx'
import './About.css'

const Strands = lazy(() => import('./Strands.jsx'))
const ScrollReveal = lazy(() => import('./ScrollReveal.jsx'))

const aboutAdvantages = [
  {
    number: '01',
    title: 'Creative Thinking. Powerful Storytelling.',
    description: 'We turn fresh ideas into compelling brand experiences that capture attention.'
  },
  {
    number: '02',
    title: 'Your Brand. Our Priority.',
    description: 'Every strategy is shaped around your brand\'s identity, audience, and ambitions.'
  },
  {
    number: '03',
    title: 'Beyond Boundaries. Across Every Medium.',
    description: 'From print and electronic media to digital platforms, we help your message reach the right audience.'
  },
  {
    number: '04',
    title: 'Experience Meets Innovation.',
    description: 'Backed by 16 years of media experience, we combine industry knowledge with modern creative thinking.'
  },
  {
    number: '05',
    title: 'More Than Visibility. Lasting Impressions.',
    description: 'We focus on building brand recognition through consistent and meaningful communication.'
  }
]

function DirectionalReveal({ children, direction, image = false, delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion()

  return <motion.div
    className={`scroll-motion ${className}`.trim()}
    {...directionalRevealAnimation({ direction, image, reduceMotion, delay })}
  >
    {children}
  </motion.div>
}

export default function About() {
  const reduceMotion = useReducedMotion()

  return (<div className="about-page">
    <section className="hero sm about-page-hero"><div className="bg"><Img src={IMG.office} alt="" /></div><Aurora /><Noise />
      <div className="wrap">
        <AboutBlurText as="span" className="kicker" text="About us" />
        <div className="about-page-hero__pressure">
          <TextPressure
            text="About PR Agencies"
            flex
            alpha={false}
            stroke={false}
            width
            weight
            italic
            radius={0.5}
            smoothing={0.5}
            idle="wave"
            idleSpeed={1}
            clickRipple
            strokeColor="#ff5a1f"
            strokeWidth={3}
            minFontSize={36}
            scale={false}
          />
        </div>
        <Reveal delay={.5}><p className="lead" style={{ marginTop: 28 }}>Established in 2014, PR Agencies focuses on creative advertising, brand promotions and strategic media planning.</p></Reveal>
      </div>
    </section>

    <section className="sec about-founder"><div className="wrap about-founder__layout">
      <Reveal variant="slide-left"><figure className="about-founder__portrait">
        <Img src="/images/about/naresh-gupta.jpeg" alt="Naresh Gupta, founder of PR Agencies" />
        <figcaption className="about-founder__caption"><span>Founder</span><strong>Naresh Gupta</strong></figcaption>
      </figure></Reveal>
      <Reveal variant="slide-right" delay={.15}><div className="about-founder__content">
        <AboutBlurText as="span" className="kicker" text="Meet Our Founder" />
        <h2 className="h2 about-founder__name" aria-label="Naresh Gupta">
          <AboutFoldText
            as="span"
            className="about-founder__echo"
            text="Naresh Gupta"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 7rem)',
              fontWeight: 800,
              lineHeight: .9,
              letterSpacing: '-.04em',
              whiteSpace: 'normal',
              userSelect: 'none',
              fontKerning: 'normal',
              textRendering: 'geometricPrecision'
            }}
          />
        </h2>
        <p className="about-founder__role">Founder, PR Agencies</p>
        <Suspense fallback={<p className="about-founder__bio">Naresh Gupta, Founder of PR Agencies, brings 16 years of experience in the media industry. He established PR Agencies in 2014 with a focus on creative advertising, brand promotions, personal promotions and strategic media planning.</p>}>
          <ScrollReveal
            as="p"
            containerClassName="about-founder__bio"
            highlightColor=""
            mode="scrub"
            splitBy="words"
            effect="fade"
            stagger={0.05}
            duration={0.8}
            smoothing={0}
            baseOpacity={0.1}
            baseRotation={3}
            baseOffset={0}
            enableBlur
            blurStrength={4}
          >
            Naresh Gupta, Founder of PR Agencies, brings 16 years of experience in the media industry. He established PR Agencies in 2014 with a focus on creative advertising, brand promotions, personal promotions and strategic media planning.
          </ScrollReveal>
        </Suspense>
        <Suspense fallback={<p className="about-founder__bio">His experience spans electronic, print and digital media, helping businesses communicate their message and strengthen their brand presence.</p>}>
          <ScrollReveal
            as="p"
            containerClassName="about-founder__bio"
            highlightColor=""
            mode="scrub"
            splitBy="words"
            effect="fade"
            stagger={0.05}
            duration={0.8}
            smoothing={0}
            baseOpacity={0.1}
            baseRotation={3}
            baseOffset={0}
            enableBlur
            blurStrength={4}
          >
            His experience spans electronic, print and digital media, helping businesses communicate their message and strengthen their brand presence.
          </ScrollReveal>
        </Suspense>
        <div className="about-founder__highlights">
          <div className="about-founder__experience"><strong>16</strong><span>Years in Media</span></div>
          <div className="about-founder__established"><span>Established</span><strong>2014</strong></div>
        </div></div></Reveal>
    </div></section>

    <section className="sec paper about-story"><div className="wrap about-story__layout">
      <Reveal variant="blur-up"><div><AboutBlurText as="span" className="kicker" text="Our Journey" /><AboutFoldText
        className="h2 about-story__title"
        text="Established in 2014."
        style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}
      /></div></Reveal>
      <Reveal variant="slide-right" delay={.15}><div>
        <p className="lead">PR Agencies was established by Naresh Gupta in 2014 with a focus on creative advertising and media solutions.</p>
        <p className="about-story__copy">The agency’s work includes advertisement making, brand promotions, personal promotions and strategic media planning across electronic, print and digital media.</p>
      </div></Reveal>
    </div></section>

    <section className="sec about-advantage"><div className="wrap">
      <div className="about-advantage__intro">
        <AboutBlurText as="span" className="kicker" text="THE PR ADVANTAGE" />
        <AboutFoldText
          className="h2 about-advantage__title"
          text="WHY CHOOSE US ?"
        />
        <p className="about-advantage__lead">Every brand has a story. We bring it to life through creative ideas, strategic media planning, and meaningful communication that helps businesses stand out.</p>
      </div>
      <div className="about-advantage__grid">
        {aboutAdvantages.map((benefit, index) => (
          <motion.article
            className="about-advantage__card"
            key={benefit.number}
            {...advantageRevealAnimation(index, reduceMotion)}
          >
            <span className="about-advantage__number">{benefit.number}</span>
            <div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
            <span className="about-advantage__accent" aria-hidden="true" />
          </motion.article>
        ))}
      </div>
    </div></section>

    <section className="sec about-purpose"><div className="wrap">
      <AboutBlurText as="span" className="about-purpose__eyebrow" text="OUR VISION & MISSION" />
      <article className="about-purpose__section about-purpose__vision">
        <DirectionalReveal className="about-purpose__content" direction="right">
          <div className="about-purpose__heading"><span className="about-purpose__number" aria-hidden="true">01</span><span className="about-purpose__slash" aria-hidden="true">/</span><h2 aria-label="Our Vision"><AboutFoldText as="span" className="about-purpose__prefix" text="Our" /><span aria-hidden="true"> </span><AboutFoldText as="span" className="about-purpose__term" text="Vision" /></h2></div>
          <p className="about-purpose__description">To help brands build a strong and meaningful presence through creative advertising and effective media communication.</p>
          <span className="about-purpose__underline" aria-hidden="true" />
        </DirectionalReveal>
        <DirectionalReveal className="about-purpose__image-wrap" direction="left" image delay={.1}>
          <figure className="about-purpose__image"><img src="/images/about/vision-target.jpeg" alt="A dart hitting the center of a target" loading="lazy" decoding="async" /></figure>
        </DirectionalReveal>
      </article>
      <div className="about-purpose__curve" aria-hidden="true">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none"><path d="M0 48 C190 48 300 4 520 22 S865 76 1200 18" /></svg>
      </div>
      <article className="about-purpose__section about-purpose__mission">
        <DirectionalReveal className="about-purpose__content" direction="right">
          <div className="about-purpose__heading"><span className="about-purpose__number" aria-hidden="true">02</span><span className="about-purpose__slash" aria-hidden="true">/</span><h2 aria-label="Our Mission"><AboutFoldText as="span" className="about-purpose__prefix" text="Our" /><span aria-hidden="true"> </span><AboutFoldText as="span" className="about-purpose__term" text="Mission" /></h2></div>
          <p className="about-purpose__description">To deliver creative advertising solutions, impactful brand promotions, and strategic media planning that help businesses connect with their audiences.</p>
          <span className="about-purpose__underline" aria-hidden="true" />
        </DirectionalReveal>
        <DirectionalReveal className="about-purpose__image-wrap" direction="left" image delay={.1}>
          <figure className="about-purpose__image"><img src="/images/about/mission-mountain.jpeg" alt="A flag flying above a mountain summit at sunrise" loading="lazy" decoding="async" /></figure>
        </DirectionalReveal>
      </article>
    </div></section>

    <section className="sec cta about-cta">
      <div className="about-cta__strands" aria-hidden="true">
        <Suspense fallback={null}>
          <Strands
            colors={['#2563EB', '#38BDF8', '#93C5FD', '#93C5FD', '#38BDF8', '#2563EB', '#071B3A']}
            count={3}
            speed={0.7}
            amplitude={0.8}
            waviness={0.85}
            thickness={0.8}
            glow={0.4}
            spread={0.9}
            intensity={0.6}
            saturation={0.9}
            energy={0.5}
            opacity={0.7}
            glass={false}
            listening={false}
            interactive={false}
            clickPulse={false}
            maxDevicePixelRatio={1.5}
            className="about-cta__strands-canvas"
          />
        </Suspense>
      </div>
      <div className="wrap about-cta__content">
        <AboutBlurText as="span" className="kicker" text="Start a conversation" />
        <AboutFoldText
          as="h1"
          className="about-heading-split h1 about-cta__heading"
          text="Ready to be remembered?"
          style={{ display: 'block', width: '100%', overflow: 'visible' }}
        />
        <Reveal delay={.3}><Magnet><Link to="/contact" className="btn primary">Enquire about a campaign →</Link></Magnet></Reveal>
      </div>
    </section>
  </div>)
}