// Contact-specific reusable UI components
import { CONTACT_INFO, SOCIAL_LINKS } from './ContactData.js'
import { Img, Aurora, Noise, Reveal, SplitText, Magnet } from '../../components/Anim.jsx'
import { DecryptedText, Hyperspeed } from './ContactAnim.jsx'

/** Contact Hero section featuring the DecryptedText component with enlarged typography */
export function ContactHero({ kicker = 'Contact', title = 'Let’s talk about your brand.', sub, img, small = true }) {
  return (
    <section className={'hero' + (small ? ' sm' : '') + ' contact-hero-custom'}>
      <div className="bg">
        <Img src={img} alt="Contact hero background" />
      </div>
      <Aurora />
      <Noise />
      <div className="wrap">
        {kicker && (
          <Reveal>
            <span className="kicker">{kicker}</span>
          </Reveal>
        )}
        <SplitText className="h1" text={title} delay={0.2} />
        {sub && (
          <Reveal delay={0.4}>
            <div className="contact-hero-sub-wrap">
              <DecryptedText
                as="p"
                className="contact-hero-decrypted-sub"
                text={sub}
                speed={22}
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

/** SVG Logos for Social Media Channels */
function SocialLogo({ name }) {
  switch (name.toLowerCase()) {
    case 'instagram':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    case 'youtube':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
        </svg>
      )
    case 'facebook':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    default:
      return null
  }
}

/** Contact information block */
export function ContactInfoBlock() {
  return (
    <div className="contact-info">
      <div className="contact-card-header">
        <span className="contact-card-kicker">Direct Contact</span>
        <h3 className="contact-card-title">Reach Our Team</h3>
      </div>

      <div className="contact-info-list">
        <div className="contact-info-item">
          <div className="contact-info-icon-badge" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div className="contact-info-content">
            <h4 className="contact-info-label">{CONTACT_INFO.email.label}</h4>
            <a href={CONTACT_INFO.email.href} className="contact-info-value contact-info-link">
              {CONTACT_INFO.email.value}
            </a>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="contact-info-icon-badge" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div className="contact-info-content">
            <h4 className="contact-info-label">{CONTACT_INFO.phone.label}</h4>
            <a href={CONTACT_INFO.phone.href} className="contact-info-value contact-info-link">
              {CONTACT_INFO.phone.value}
            </a>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="contact-info-icon-badge" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="contact-info-content">
            <h4 className="contact-info-label">{CONTACT_INFO.office.label}</h4>
            <p className="contact-info-value">
              {CONTACT_INFO.office.value}
              <br />
              <span className="contact-info-detail">{CONTACT_INFO.office.detail}</span>
            </p>
          </div>
        </div>

        <div className="contact-info-item contact-info-social-item">
          <div className="contact-info-icon-badge" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
          <div className="contact-info-content">
            <h4 className="contact-info-label">Follow Us</h4>
            <div className="contact-social-icons-row" role="list" aria-label="Social media channels">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="contact-social-logo-btn"
                  aria-label={s.name}
                  title={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialLogo name={s.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Section heading used across Contact sections */
export function ContactSectionHeading({ kicker, title, children }) {
  return (
    <div className="contact-section-heading">
      {kicker && <span className="contact-kicker">{kicker}</span>}
      {title && <h2 className="contact-section-title">{title}</h2>}
      {children}
    </div>
  )
}

/** Real Google Maps embed – Shaila Residency, L.B. Nagar, Hyderabad */
export function ContactMapPlaceholder() {
  const mapSrc =
    'https://maps.google.com/maps?q=Shaila+Residency+Mallikarjuna+Nagar+Chintalkunta+LB+Nagar+Hyderabad+Telangana+500074&t=&z=16&ie=UTF8&iwloc=&output=embed'

  return (
    <div className="contact-map contact-map-real">
      <iframe
        title="PR Agencies Office Location"
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block', borderRadius: '12px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="Map showing PR Agencies office at Shaila Residency, L.B. Nagar, Hyderabad"
      />
      {/* Clickable overlay link that opens Google Maps in a new tab */}
      <a
        href="https://maps.google.com/maps?q=Shaila+Residency+Mallikarjuna+Nagar+Chintalkunta+LB+Nagar+Hyderabad+Telangana"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-map-open-link"
        aria-label="Open in Google Maps"
      >
        📍 Open in Google Maps ↗
      </a>
    </div>
  )
}


/**
 * LetsBuildTogether – Interactive "Together Is Better" Section with Hyperspeed
 * Features PR Agencies brand narrative and Hyperspeed 3D cyber neon highway background effect.
 */
export function LetsBuildTogether() {
  return (
    <section className="contact-build-together-section" aria-label="Let's Build Together">
      <div className="contact-build-bg-photo" aria-hidden="true" />
      <Hyperspeed className="contact-build-hyperspeed-bg" />
      <div className="contact-build-overlay" />
      <div className="contact-wrap" style={{ position: 'relative', zIndex: 3 }}>
        <div className="contact-build-inner">
          <div className="contact-build-kicker-row">
            <span className="contact-build-kicker-line" />
            <span className="contact-build-kicker">TOGETHER IS BETTER</span>
          </div>

          <h2 className="contact-build-title">
            Let&apos;s Build <span className="contact-build-gradient-text">Together</span>
          </h2>

          <p className="contact-build-lead">
            Whether you&apos;re a business seeking nationwide advertising, an executive building a distinguished public profile, or an enterprise looking for omnichannel media dominance, we&apos;re here to connect, collaborate, and create opportunities together.
          </p>

          <div className="contact-build-actions">
            <Magnet>
              <a href="mailto:pragencies27@gmail.com" className="btn contact-build-btn-primary">
                Email Us →
              </a>
            </Magnet>
            <Magnet>
              <a href="tel:+918465887595" className="btn contact-build-btn-secondary">
                Call Now 📞
              </a>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  )
}
