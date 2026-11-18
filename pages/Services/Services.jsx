import { Link } from 'react-router-dom'
import { Reveal, SplitText, RotatingText, ScrollExpand, SpotlightCard, Magnet, Img } from '../../components/Anim.jsx'
import { IMG, SERVICES } from '../../data'
import mediaPlanImg from '../../assets/media-planning.jpg'
import indPromoBg from '../../assets/ind-promo-bg.jpg'

// Services-specific imports (all inside Services folder)
import { ServicesScrollExpand, TextPressure, TextType, FoldText, SplitFlapText, GlitchText } from './ServicesAnim.jsx'
import { ApproachDepthCarousel, ServicesHero, ServicesCTA, ClientsMarquee, WaitingForSection } from './ServicesComponents.jsx'
import { APPROACH_CAROUSEL_ITEMS } from './ServicesData.js'
import './Services.css'
import './ServicesResponsive.css'
import './ServicesAnimations.css'

const Pts = ({ p }) => <ul>{p.map(x => <li key={x}>{x}</li>)}</ul>
const Enq = () => <Magnet><Link to="/contact" className="btn primary">Enquire about this →</Link></Magnet>

export default function Services() {
  const [a, ...media] = SERVICES
  return (<>
    <ServicesHero
      kicker=""
      title="Advertising that goes everywhere your audience does."
      sub="We bring brands and audiences together through creative advertising, strategic media planning and impactful promotional solutions."
      img={IMG.cinema}
    />

    {/* WHAT WE DO SECTION */}
    <ScrollExpand className="sec what-we-do" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(74,63,224,0.12), transparent)', padding: 'clamp(36px, 5vw, 56px) 0' }}>
      <div className="wrap">
        <div style={{ marginBottom: 22 }}>
          <SplitFlapText text="WHAT WE DO" />
        </div>
        <Reveal delay={0.1}>
          <h3
            className="h2 services-wwd-glitch-heading"
            style={{
              maxWidth: '100%',
              width: '100%',
              lineHeight: 1.15,
              fontSize: 'clamp(32px, 4.2vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 36,
              color: '#ffffff',
            }}
          >
            <GlitchText as="span" text="Every Brand Has a Story. We Help It Reach Further." continuous={true} />
          </h3>
        </Reveal>

        {/* Creative receipt / paper card centered in middle */}
        <Reveal delay={0.25}>
          <div className="services-receipt-center-wrap">
            <div className="services-receipt-card">
              <div className="services-receipt-header">
                <h4 className="services-receipt-brand">PR AGENCIES</h4>
                <span className="services-receipt-subtitle">Full-Spectrum Brand &amp; Media Solutions</span>
                <span className="services-receipt-tag">Hyderabad · Nationwide Reach</span>
              </div>
              <div className="services-receipt-divider dashed" />
              <div className="services-receipt-body">
                <div className="services-receipt-row">
                  <span className="services-receipt-label">1. Individual Promotion</span>
                  <span className="services-receipt-value">01 / Strategy</span>
                </div>
                <div className="services-receipt-row">
                  <span className="services-receipt-label">2. Media Planning</span>
                  <span className="services-receipt-value">02 / Omnichannel</span>
                </div>
                <div className="services-receipt-row">
                  <span className="services-receipt-label">3. 360° Advertising</span>
                  <span className="services-receipt-value">03 / Prime-time</span>
                </div>
                <div className="services-receipt-row">
                  <span className="services-receipt-label">4. Electronic Media</span>
                  <span className="services-receipt-value">04 / TV & Screens</span>
                </div>
                <div className="services-receipt-row">
                  <span className="services-receipt-label">5. Print Media</span>
                  <span className="services-receipt-value">05 / Publications</span>
                </div>
                <div className="services-receipt-row">
                  <span className="services-receipt-label">6. Digital Media</span>
                  <span className="services-receipt-value">06 / Online & Social</span>
                </div>
                <div className="services-receipt-row">
                  <span className="services-receipt-label">7. FM Advertising</span>
                  <span className="services-receipt-value">07 / Radio Reach</span>
                </div>
              </div>
              <div className="services-receipt-divider dashed" />
              <div className="services-receipt-tagline-wrap">
                <p className="services-receipt-tagline">
                  Your Brand, Our Vision, Greater Impact.
                </p>
              </div>
              <p className="services-receipt-note">
                From creating compelling advertisements to selecting the right media platforms, we help businesses and individuals communicate their message, strengthen their presence and connect with the audiences that matter.
              </p>
              <div className="services-receipt-punch-row" />
              <div className="services-receipt-tear" />
            </div>
          </div>
        </Reveal>
      </div>
    </ScrollExpand>

    {/* OUR SERVICES HEADER */}
    <section className="our-services-heading" style={{ paddingTop: 36, paddingBottom: 16 }}>
      <div className="wrap">
        <span
          className="kicker"
          style={{
            color: 'var(--indigo-soft)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: 10,
            display: 'block',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          WHAT WE OFFER
        </span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RotatingText
            className="h1"
            texts={['Advertisement Creation', 'Individual Promotion', 'Company Promotion', 'PR & Brand Promotion', 'Electronic Media', 'Print Media', 'Digital Media', 'FM Media']}
            interval={2600}
            style={{
              color: '#ffffff',
              fontWeight: 800,
              fontSize: 'clamp(48px, 6.5vw, 86px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: 0,
            }}
          />
        </div>
      </div>
    </section>

    {/* 01 · INDIVIDUAL PROMOTION */}
    <section className="svc full ind-promo" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="photo">
        <img
          src={indPromoBg}
          alt="Individual Promotion background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.65) contrast(1.15)',
            opacity: 1,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(8,10,22,0.85) 0%, rgba(8,10,22,0.45) 50%, rgba(8,10,22,0.75) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div className="wrap">
        <div className="in" style={{ position: 'relative', zIndex: 1, padding: 'clamp(50px, 7vw, 90px) 0', maxWidth: '820px', textShadow: '0 2px 24px rgba(0,0,0,0.9)' }}>
          <Reveal>
            <span
              className="kicker"
              style={{
                color: 'var(--indigo-soft)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: 14,
                display: 'inline-block',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              01 · Individual Promotion
            </span>
          </Reveal>

          <SplitText
            as="h2"
            className="h1"
            text="Every Name Has a Story. Let's Make Yours Recognised."
            delay={0.08}
            style={{
              color: '#ffffff',
              fontSize: 'clamp(42px, 5.5vw, 76px)',
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              marginBottom: 20,
            }}
          />

          <Reveal delay={0.16}>
            <p
              className="lead"
              style={{
                fontSize: 'clamp(21px, 1.5vw, 24px)',
                lineHeight: 1.7,
                color: 'var(--text)',
                opacity: 0.96,
                margin: '20px 0 24px',
                maxWidth: '64ch',
              }}
            >
              We turn your story, achievements and personality into a distinctive personal brand through creative promotion and strategic communication that gets you noticed.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="pill-badges" style={{ margin: '0 0 28px' }}>
              <span className="pill-badge" style={{ fontSize: 14, padding: '8px 18px' }}>Personal Brand Strategy</span>
              <span className="pill-badge" style={{ fontSize: 14, padding: '8px 18px' }}>Executive Presence</span>
              <span className="pill-badge" style={{ fontSize: 14, padding: '8px 18px' }}>Public Relations & Features</span>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <Enq />
          </Reveal>
        </div>
      </div>
    </section>

    {/* 02 · MEDIA PLANNING */}
    <section className="svc-editorial media-planning" style={{ background: 'var(--surface)' }}>
      <div className="wrap">
        <div className="editorial-grid reverse">
          <Reveal className="editorial-text" variant="slide-right">
            <Reveal>
              <span
                className="kicker"
                style={{
                  color: 'var(--indigo-soft)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                  display: 'inline-block',
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                02 · Media Planning
              </span>
            </Reveal>

            <SplitText
              as="h2"
              className="h1"
              text="Your Audience Is Everywhere. Your Advertising Should Be Too."
              delay={0.08}
              style={{
                color: '#ffffff',
                fontSize: 'clamp(40px, 5.2vw, 74px)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: 20,
              }}
            />

            <Reveal delay={0.16}>
              <p
                className="lead"
                style={{
                  fontSize: 'clamp(21px, 1.5vw, 24px)',
                  lineHeight: 1.7,
                  color: 'var(--text)',
                  opacity: 0.95,
                  maxWidth: '56ch',
                }}
              >
                We put your brand in the right places through thoughtfully planned TV, print, digital and FM advertising that reaches the audiences that matter.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="pill-badges">
                <span className="pill-badge" style={{ fontSize: 14, padding: '8px 18px' }}>TV & Broadcast</span>
                <span className="pill-badge" style={{ fontSize: 14, padding: '8px 18px' }}>Print Publications</span>
                <span className="pill-badge" style={{ fontSize: 14, padding: '8px 18px' }}>Digital Growth</span>
                <span className="pill-badge" style={{ fontSize: 14, padding: '8px 18px' }}>FM Radio</span>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <Enq />
            </Reveal>
          </Reveal>

          <div className="editorial-visual">
            <Reveal variant="slide-left" delay={0.15}>
              <div className="bento-frame">
                <img src={mediaPlanImg} alt="Media Planning - Omnichannel Advertising" loading="lazy" />
                <div className="float-pill" style={{ bottom: 20, left: -12 }}>
                  <span style={{ color: 'var(--indigo-soft)' }}>✦</span>
                  <span>02 · Media Planning</span>
                </div>
                <div className="float-card" style={{ top: 20, right: -12 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.14em', display: 'block' }}>Strategy</span>
                  <b style={{ color: '#fff', fontSize: 17, fontFamily: 'var(--font-head)' }}>Thoughtfully Planned</b>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    {/* 03 · 360° ADVERTISING */}
    <section className="svc hero1">
      <div className="wrap">
        <Reveal><span className="kicker" style={{ marginTop: 20 }}>03 · 360° Advertising</span></Reveal>
        <Reveal variant="zoom"><div className="photo"><Img src={a.img} /></div></Reveal>
        <Reveal className="split" variant="slide-right">
          <div>
            <SplitText as="h2" className="h1" text="360° Advertising" delay={0.08} style={{ color: '#ffffff', fontSize: 'clamp(40px, 5.2vw, 74px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 14 }} />
            <p style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', color: 'var(--silver)', fontWeight: 600, marginBottom: 18 }}>{a.short}</p>
          </div>
          <div>
            <Reveal><p className="lead" style={{ fontSize: 'clamp(20px, 1.4vw, 22px)', lineHeight: 1.7, marginBottom: 20 }}>{a.text}</p></Reveal>
            <Reveal delay={0.2}><Enq /></Reveal>
          </div>
        </Reveal>
      </div>
    </section>

    {/* 04 · ELECTRONIC MEDIA */}
    <section className={'svc ' + media[0].layout}>
      <div className="wrap split">
        <Reveal variant="slide-left"><div className="photo"><Img src={media[0].img} /></div></Reveal>
        <Reveal variant="blur-up" delay={.15}>
          <span className="kicker">04 · Electronic Media</span>
          <SplitText as="h2" className="h1" text={media[0].title} delay={0.08} style={{ color: '#ffffff', fontSize: 'clamp(40px, 5.2vw, 74px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 14 }} />
          <p style={{ fontSize: 'clamp(20px, 2vw, 28px)', color: 'var(--silver)', fontWeight: 600, marginBottom: 16 }}>{media[0].short}</p>
          <p className="lead" style={{ fontSize: 'clamp(20px, 1.4vw, 22px)', lineHeight: 1.7, marginTop: 14 }}>{media[0].text}</p>
          <Pts p={media[0].points} />
          <Enq />
        </Reveal>
      </div>
    </section>

    {/* 05 · PRINT MEDIA */}
    <section className={'svc ' + media[1].layout}>
      <div className="wrap split">
        <Reveal variant="flip-left"><div className="photo"><Img src={media[1].img} /></div></Reveal>
        <Reveal variant="slide-right" delay={.15}>
          <span className="kicker">05 · Print Media</span>
          <SplitText as="h2" className="h1" text={media[1].title} delay={0.08} style={{ color: '#ffffff', fontSize: 'clamp(40px, 5.2vw, 74px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 14 }} />
          <p style={{ fontSize: 'clamp(20px, 2vw, 28px)', color: 'var(--silver)', fontWeight: 600, marginBottom: 16 }}>{media[1].short}</p>
          <p className="lead" style={{ fontSize: 'clamp(20px, 1.4vw, 22px)', lineHeight: 1.7, marginTop: 14 }}>{media[1].text}</p>
          <Pts p={media[1].points} />
          <Enq />
        </Reveal>
      </div>
    </section>

    {/* 06 · DIGITAL MEDIA */}
    <section className="svc full">
      <div className="photo"><Img src={media[2].img} /></div>
      <div className="wrap">
        <div className="in">
          <Reveal variant="blur-up">
            <span className="kicker">06 · Digital Media</span>
            <SplitText as="h2" className="h1" text={media[2].title} delay={0.08} style={{ color: '#ffffff', fontSize: 'clamp(48px, 8.5vw, 110px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: 14 }} />
            <p style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', color: 'var(--silver)', fontWeight: 600, marginBottom: 16 }}>{media[2].short}</p>
            <p className="lead" style={{ fontSize: 'clamp(20px, 1.4vw, 22px)', lineHeight: 1.7, margin: '18px 0' }}>{media[2].text}</p>
            <Pts p={media[2].points} />
            <Enq />
          </Reveal>
        </div>
      </div>
    </section>

    {/* 07 · FM ADVERTISING */}
    <section className={'svc ' + media[3].layout}>
      <div className="wrap split">
        <Reveal variant="slide-left"><div className="photo"><Img src={media[3].img} /></div></Reveal>
        <Reveal variant="flip-right" delay={.15}>
          <span className="kicker">07 · FM Advertising</span>
          <SplitText as="h2" className="h1" text={media[3].title} delay={0.08} style={{ color: '#ffffff', fontSize: 'clamp(40px, 5.2vw, 74px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 14 }} />
          <p style={{ fontSize: 'clamp(20px, 2vw, 28px)', color: 'var(--silver)', fontWeight: 600, marginBottom: 16 }}>{media[3].short}</p>
          <p className="lead" style={{ fontSize: 'clamp(20px, 1.4vw, 22px)', lineHeight: 1.7, marginTop: 14 }}>{media[3].text}</p>
          <Pts p={media[3].points} />
          <Enq />
        </Reveal>
      </div>
    </section>

    {/* ═══════════════════════════════════════════════════════
        OUR APPROACH: 3D DEPTH CAROUSEL
        Placed AFTER FM Advertising (service 07) and BEFORE CTA
        Uses ServicesScrollExpand + TextPressure + ApproachDepthCarousel
       ═══════════════════════════════════════════════════════ */}
    <ServicesScrollExpand className="services-approach-section">
      <div className="services-approach-wrap">
        <div className="services-approach-heading">
          <span className="services-approach-kicker"></span>
          <div className="services-approach-title-wrap">
            <TextPressure
              text="OUR APPROACH"
              minWeight={100}
              maxWeight={900}
            />
          </div>
          <TextType
            as="p"
            className="services-approach-subtitle"
            text="A continuous cycle of excellence. From audience discovery to nationwide promotion, our proven four-stage methodology powers relentless brand growth."
            speed={24}
            delay={250}
          />
        </div>

        {/* 3D Depth Carousel with multiple continuous cards */}
        <ApproachDepthCarousel items={APPROACH_CAROUSEL_ITEMS} />
      </div>
    </ServicesScrollExpand>

    <ClientsMarquee />

    <WaitingForSection />

    <ServicesCTA />
  </>)
}
