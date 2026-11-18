import { Link } from 'react-router-dom'
import { SplitText, Reveal, Magnet, SpotlightCard, Aurora, Noise, Img } from './Anim.jsx'
import { STEPS } from '../data'
export const PageHero = ({ kicker, title, sub, img, small = true }) => (
  <section className={'hero' + (small ? ' sm' : '')}><div className="bg"><Img src={img} /></div><Aurora /><Noise />
    <div className="wrap"><Reveal><span className="kicker">{kicker}</span></Reveal><SplitText className="h1" text={title} delay={.2} />
      {sub && <Reveal delay={.5}><p className="lead" style={{ marginTop: 28 }}>{sub}</p></Reveal>}</div></section>)
export const Approach = ({ paper = true }) => (
  <section className={'sec' + (paper ? ' paper' : '')}><div className="wrap"><Reveal><span className="kicker">Our approach</span><h2 className="h2" style={{ maxWidth: '14ch', marginBottom: 60 }}>Four steps. One clear outcome.</h2></Reveal>
    <div className="steps">{STEPS.map(([t, d], i) => <Reveal key={t} delay={i * .1}><div><b>0{i + 1}</b><h3>{t}</h3><p>{d}</p></div></Reveal>)}</div></div></section>)
export const CTA = () => (
  <section className="sec cta"><Aurora /><div className="wrap" style={{ position: 'relative' }}><Reveal><span className="kicker">Start a conversation</span></Reveal>
    <SplitText className="h1" text="Ready to be remembered?" /><Reveal delay={.3}><Magnet><Link to="/contact" className="btn primary">Enquire about a campaign →</Link></Magnet></Reveal></div></section>)
export { SpotlightCard }
