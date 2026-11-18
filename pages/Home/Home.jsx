import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CountUp, Reveal, Magnet, ShinyText, Aurora, Noise, Img } from '../../components/Anim.jsx'
import { IMG } from '../../data'
import { HomeBlurText, HomeShinyText, HomeShuffle, HomeSplitText, approachDotAnimation, approachTrackAnimation } from './HomeAnimations.js'
import CircularCarousel from './CircularCarousel.jsx'
import Lightfall from './Lightfall.jsx'
import './Home.css'

const DecryptedText = lazy(() => import('./DecryptedText.jsx'))
const CrystalizedBall = lazy(() => import('./CrystalizedBall.jsx'))
const StrokeText = lazy(() => import('./StrokeText.jsx'))

const expertise = [
  { number: '01', title: 'Advertisement Making' },
  { number: '02', title: 'Brand Promotions' },
  { number: '03', title: 'Personal Promotions' },
  { number: '04', title: 'Media Planning' },
  { number: '05', title: 'Electronic Media' },
  { number: '06', title: 'Print Media' },
  { number: '07', title: 'Digital Media' },
  { number: '08', title: 'FM Radio Advertising' }
]

const renderExpertiseCard = (service, _index, { back = false } = {}) => (
  <Link
    to="/services"
    className="home-service-carousel-card"
    aria-label={`${service.title} services`}
    tabIndex={back ? -1 : undefined}
  >
    <span className="home-service-carousel-card__number">{service.number}</span>
    <h3 className="home-service-carousel-card__title">{service.title}</h3>
    <span className="home-service-carousel-card__action">Explore service <span aria-hidden="true">→</span></span>
  </Link>
)

const brandAssociations = [
  { name: 'SSVPD Taking You Forward', logo: '/images/home/brands/ssvpd-taking-you-forward.jpeg' },
  { name: "SSVPD's The Joy of Living", logo: '/images/home/brands/ssvpd-joy-of-living.jpeg' },
  { name: 'Bekaert', logo: '/images/home/brands/bekaert.jpeg' },
  { name: 'Mother Dairy', logo: '/images/home/brands/mother-dairy-partner.jpeg' },
  { name: 'Karimnagar Dairy', logo: '/images/home/brands/karimnagar-dairy-partner.jpeg' },
  { name: 'Telemart', logo: '/images/home/brands/telemart.jpeg' },
  { name: 'Vineeth Jewellers', logo: '/images/home/brands/vineeth-jewellers.jpeg' },
  { name: 'AM Construction', logo: '/images/home/brands/am-construction.jpeg' },
  { name: 'NRI Projects', logo: '/images/home/brands/nri-projects.jpeg' },
  { name: 'Rainbow Realtors & Agro Farms', logo: '/images/home/brands/rainbow-realtors.jpeg' },
  { name: 'Live in Nature for Healthy Future', logo: '/images/home/brands/live-in-nature.jpeg' }
]

const approachSteps = [
  { number: '01', title: 'Understand', description: "Explore the brand's goals, message and target audience." },
  { number: '02', title: 'Create', description: 'Develop creative ideas and advertising concepts.' },
  { number: '03', title: 'Plan', description: 'Choose appropriate media channels for the campaign.' },
  { number: '04', title: 'Connect', description: 'Bring the message to audiences across relevant platforms.' }
]

const heroHeadingLines = ['Your Brand.', 'Our Vision.', 'Greater Impact.']

const getHeroStrokeFontSize = width => Math.min(80, Math.max(34, width * .095))

const handleIntroAnimationComplete = () => {
  console.log('Animation completed!')
}

const introHeadingAnimation = {
  effect: 'blur',
  animateBy: 'words',
  direction: 'top',
  staggerFrom: 'start',
  trigger: 'view',
  delay: 200,
  stepDuration: .35,
  blur: 10,
  distance: 50,
  loop: false,
  loopDelay: 2,
  focusOnHover: false,
  usePresetEffect: true
}

export default function Home() {
  const heroHeadingRef = useRef(null)
  const [heroStrokeFontSize, setHeroStrokeFontSize] = useState(80)

  useLayoutEffect(() => {
    const heading = heroHeadingRef.current
    if (!heading) return undefined

    const updateHeroStrokeFontSize = () => setHeroStrokeFontSize(getHeroStrokeFontSize(heading.clientWidth))
    const observer = new ResizeObserver(updateHeroStrokeFontSize)
    window.addEventListener('resize', updateHeroStrokeFontSize)
    observer.observe(heading)
    updateHeroStrokeFontSize()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateHeroStrokeFontSize)
    }
  }, [])

  return (<div className="home-page">
    <section className="hero home-hero"><div className="bg"><Img src={IMG.hero} alt="" /></div><Aurora /><Noise />
      <div className="wrap"><Reveal><span className="kicker"><ShinyText>Creative Advertising · Media Solutions</ShinyText></span></Reveal>
        <h1 ref={heroHeadingRef} className="h1 home-heading" aria-label="Your Brand. Our Vision. Greater Impact.">
          <Suspense fallback={heroHeadingLines.map(line => (
            <span className="home-heading__line" aria-hidden="true" key={line}>{line}</span>
          ))}>
            {heroHeadingLines.map(line => (
              <span className="home-heading__line" aria-hidden="true" key={line}>
                <StrokeText
                  text={line}
                  strokeColor="#7C74FF"
                  fillColor="#EDEEF5"
                  strokeWidth={1.6}
                  drawDuration={1.2}
                  fillDelay={.15}
                  stagger={.035}
                  fontSize={heroStrokeFontSize}
                  fontWeight={700}
                  fontFamily="'Space Grotesk', system-ui, sans-serif"
                  letterSpacing={-2}
                />
              </span>
            ))}
          </Suspense>
        </h1>
        <Reveal delay={.5}><p className="lead" style={{ marginTop: 28 }}>PR Agencies creates advertising and media solutions to help businesses communicate their message and strengthen their brand presence.</p></Reveal>
        <div className="row home-hero__actions">
          <Magnet><Link to="/about" className="btn">About PR Agencies</Link></Magnet>
          <Magnet><Link to="/services" className="btn">Explore Services</Link></Magnet>
          <Magnet><Link to="/contact" className="btn primary">Start a Conversation →</Link></Magnet>
        </div>
      </div>
    </section>

    <section className="sec home-intro"><div className="wrap home-intro__layout">
      <div><HomeBlurText as="span" className="kicker" text="Welcome to PR Agencies" />
        <h2 className="h2 home-intro__title">
          <HomeBlurText as="span" text="Building Brand Presence" {...introHeadingAnimation} onAnimationComplete={handleIntroAnimationComplete} />
          <span className="grad"> <HomeBlurText as="span" text="Since 2014." {...introHeadingAnimation} /></span>
        </h2>
      </div>
      <Reveal delay={.15}><div>
        <p className="lead">Established in 2014 by founder Naresh Gupta, PR Agencies focuses on creative advertising, brand promotions, personal promotions and strategic media planning. Naresh brings 16 years of experience in the media industry.</p>
        <div className="home-intro__stats">
          <CountUp to={2014} label="PR Agencies established" />
          <CountUp to={16} label="Founder’s years in media" />
        </div>
      </div></Reveal>
    </div></section>

    <section className="sec home-approach"><div className="wrap">
      <HomeBlurText as="span" className="kicker" text="OUR APPROACH" />
      <HomeShuffle className="h2 home-approach__title" text="From an Idea to an Impactful Campaign." />
      <Reveal delay={.15}><p className="lead home-approach__intro">Every brand has a story worth telling. Discover how creative thinking and thoughtful media planning can bring that story to the right audience.</p></Reveal>
      <Reveal delay={.2}>
        <p className="home-approach__note">Illustrative stages, not a formally documented PR Agencies process.</p>
      </Reveal>
      <div className="home-approach__timeline" aria-label="Illustrative campaign stages">
        <motion.span className="home-approach__track" aria-hidden="true" {...approachTrackAnimation} />
        {approachSteps.map((step, i) => <Reveal key={step.number} className="home-approach__step" delay={i * .1}>
          <div className="home-approach__node" aria-hidden="true"><motion.span className="home-approach__dot" {...approachDotAnimation(i * .08)} /></div>
          <span className="home-approach__number">{step.number}</span>
          <HomeBlurText as="h3" text={step.title} />
          <p>{step.description}</p>
        </Reveal>)}
      </div>
    </div></section>

    <section className="sec home-services">
      <Lightfall
        className="home-services__lightfall"
        colors={['#ffffff']}
        backgroundColor="#080A16"
        speed={0.3}
        streakCount={2}
        streakWidth={0.8}
        twinkle={0.3}
        backgroundGlow={0.1}
        headGlow={0.6}
        bloom={0.35}
        mouseInteraction
        holdToWarp
        intro
        streakLength={1}
        density={0.6}
        glow={1}
        depth={0.5}
        zoom={3}
        mouseStrength={0.4}
        mouseRadius={0.45}
        lens={0.5}
        fade={0}
        lightMode={false}
      />
      <div className="wrap">
        <HomeBlurText as="span" className="kicker" text="What we do" />
        <h2 className="h2 home-services__title" style={{ maxWidth: '14ch', marginBottom: 52 }}>
          <HomeShinyText text="Advertising and media expertise." />
        </h2>
        <div className="home-services__carousel">
          <CircularCarousel
            items={expertise}
            renderItem={renderExpertiseCard}
            ariaLabel="Advertising and media services"
            preset="cylinder"
            intro="rise"
            cardWidth={320}
            aspectRatio={1}
            speed={14}
            captions={false}
            gap={25}
            tilt={-5}
            curve={1}
            perspective={2500}
            fitToWidth={false}
            autoplay="drift"
            interval={3}
            direction="left"
            momentum={0.6}
            snap
            pauseOnHover
            focusOnClick
            draggable
            parallax={0.3}
            stretch={0.5}
            fadeColor="#000000"
            depthFade={0.55}
            innerShade={0.6}
            cornerRadius={12}
          />
        </div>
      </div>
    </section>

    <section className="sec home-brands"><div className="wrap">
      <HomeBlurText as="span" className="kicker" text="Brand associations" />
      <h2 className="h2 home-brands__title" style={{ marginBottom: 44 }}>
        <Suspense fallback="Brands we’re associated with.">
          <DecryptedText
            text="Brands we’re associated with."
            animateOn="inViewHover"
            effect="scramble"
            sequential
            revealDirection="start"
            speed={60}
            maxIterations={10}
            hoverRadius={100}
            scrambleColor="#2bb673"
            loop={false}
            loopDelay={2000}
            useOriginalCharsOnly={false}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
            className="revealed"
            encryptedClassName="encrypted"
            clickMode="once"
          />
        </Suspense>
      </h2>
      <div className="home-brands__viewport" aria-label="Brand logos">
        <div className="home-brands__track">
          {[false, true].map(isDuplicate => <div
            className="home-brands__group"
            key={String(isDuplicate)}
            aria-hidden={isDuplicate}
          >
            {brandAssociations.map(brand => <div className="home-brand home-brand--logo scroll-motion" key={brand.name}>
              <img src={brand.logo} alt={isDuplicate ? '' : brand.name} />
            </div>)}
          </div>)}
        </div>
      </div>
    </div></section>

    <section className="sec cta home-cta">
      <div className="home-cta__orb" aria-hidden="true">
        <Suspense fallback={null}>
          <CrystalizedBall
            preset="plasma"
            color="#2563EB"
            theme="dark"
            size={0.9}
            crackle={0.85}
            fill={0.5}
            interactive
            hoverStrength={0.7}
            strands={6}
            flares={0.65}
            glow={0.9}
            sparks={0.6}
            particleCount={15000}
            motion="rise"
            particleShape="square"
            depth={0.6}
            sway={0.5}
            twinkle={0.5}
            haze={0.7}
            dustSpeed={1}
            speed={1}
            intro
            paused={false}
          />
        </Suspense>
      </div>
      <div className="home-cta__kicker">
        <HomeBlurText as="span" className="kicker" text="Let’s work together" />
      </div>
      <div className="wrap home-cta__content">
        <HomeSplitText tag="h1" className="h1 home-cta__heading" text="Make your next move count." trigger="view" />
        <Reveal delay={.25}><Magnet><Link to="/contact" className="btn primary">Get in Touch →</Link></Magnet></Reveal>
      </div>
    </section>
  </div>)
}