import { IMG } from '../../data'

// Contact-specific imports
import { ContactReveal, ContactFormAnimation } from './ContactAnim.jsx'
import { ContactInfoBlock, ContactMapPlaceholder, ContactHero, LetsBuildTogether } from './ContactComponents.jsx'
import ContactForm from './ContactForm.jsx'
import './Contact.css'
import './ContactResponsive.css'
import './ContactAnimations.css'

export default function Contact() {
  return (
    <>
      <ContactHero
        kicker="Contact"
        title="Let’s talk about your brand."
        sub="Tell us what you want to achieve. We’ll respond with a plan."
        img={IMG.office}
      />

      <section className="contact-page-section">
        <div className="contact-wrap">
          <div className="contact-split">
            <ContactReveal variant="slide-left">
              <ContactInfoBlock />
            </ContactReveal>

            <ContactReveal variant="slide-right" delay={0.15}>
              <div className="contact-form-container">
                <ContactFormAnimation>
                  <ContactForm />
                </ContactFormAnimation>
              </div>
            </ContactReveal>
          </div>
        </div>
      </section>

      {/* LET'S BUILD TOGETHER SECTION WITH GRID DISTORTION */}
      <ContactReveal variant="blur-up" delay={0.1}>
        <LetsBuildTogether />
      </ContactReveal>

      <section className="contact-map-section">
        <div className="contact-wrap">
          <ContactReveal variant="zoom" delay={0.1}>
            <ContactMapPlaceholder />
          </ContactReveal>
        </div>
      </section>
    </>
  )
}
