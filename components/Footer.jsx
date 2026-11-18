import { Link } from 'react-router-dom'
import { NAV } from '../data'
import prLogo from '../assets/pr-logo.jpg'
import './Footer.css'

const ALL_SERVICES = [
  'Individual Promotion',
  'Media Planning',
  '360° Advertising',
  'Electronic Media',
  'Print Media',
  'Digital Media',
  'FM Advertising',
]

export default function Footer() {
  return (
    <footer className="foot">
      <svg className="foot-wave" viewBox="0 0 1920 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 66 C 210 205, 370 205, 610 112 C 850 20, 1080 35, 1300 102 C 1530 172, 1720 154, 1920 42 L1920 180 L0 180 Z" fill="#111b65" />
        <path d="M0 66 C 210 205, 370 205, 610 112 C 850 20, 1080 35, 1300 102 C 1530 172, 1720 154, 1920 42" fill="none" stroke="#dc26ff" strokeWidth="3" opacity=".8" />
        <path d="M0 66 C 210 205, 370 205, 610 112 C 850 20, 1080 35, 1300 102 C 1530 172, 1720 154, 1920 42" fill="none" stroke="#7041ee" strokeWidth="2" transform="translate(0 -3)" />
      </svg>

      <div className="wrap">
        <div className="cols">
          <div className="foot-brand">
            <div className="foot-brand-top">
              <Link className="foot-pr-logo-wrap" to="/" aria-label="PR Agencies Home">
                <img src={prLogo} alt="PR Agencies" className="foot-pr-logo" loading="lazy" />
              </Link>
              <div className="foot-brand-copy">
                <p className="big">
                  Let’s make your<br />
                  <span className="grad">brand seen.</span>
                </p>
                <svg className="foot-swoosh" viewBox="0 0 280 22" aria-hidden="true">
                  <path d="M13 13 C74 0, 166 1, 268 16 C176 10, 82 16, 13 13 Z" fill="#b422ff" />
                  <path d="M13 13 C78 4, 170 5, 268 16" fill="none" stroke="#6ad9ff" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <p className="foot-tagline">Integrated promotions. Measurable impact.<br />For brands that want to stand out.</p>
            <div className="foot-socials" aria-label="Social media links">
              <a href="#" aria-label="LinkedIn" title="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M5.2 7.6H8v11.2H5.2V7.6Zm1.4-5.3A1.8 1.8 0 1 1 6.6 5.9a1.8 1.8 0 0 1 0-3.6ZM9.8 7.6h2.7v1.5h.1c.4-.7 1.3-1.8 3.1-1.8 3.3 0 3.9 2.2 3.9 5v6.5h-2.9v-5.7c0-1.4 0-3.1-1.9-3.1s-2.1 1.5-2.1 3v5.8H9.8V7.6Z" /></svg>
              </a>
              <a href="#" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.7" r="1" /></svg>
              </a>
              <a href="#" aria-label="YouTube" title="YouTube">
                <svg viewBox="0 0 24 24"><path d="M21.5 7.1a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.6.4a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .5 4.9 2.7 2.7 0 0 0 1.9 1.9c1.6.4 7.6.4 7.6.4s6 0 7.6-.4a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.5-4.9ZM10 15V9l5.2 3L10 15Z" /></svg>
              </a>
              <a href="#" aria-label="Facebook" title="Facebook">
                <svg viewBox="0 0 24 24"><path d="M13.7 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.6V13h2.7v8h3.4Z" /></svg>
              </a>
            </div>
          </div>

          <div className="foot-column">
            <h4>
              <svg viewBox="0 0 36 36" aria-hidden="true"><path d="m18 3 14 7-14 7L4 10l14-7Zm-14 12 14 7 14-7M4 20l14 7 14-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg>
              <span>Pages</span>
            </h4>
            {NAV.map(([l, p]) => (
              <Link key={p} className="foot-link" to={p}>{l}</Link>
            ))}
          </div>

          <div className="foot-column foot-services">
            <h4>
              <svg viewBox="0 0 36 36" aria-hidden="true"><rect x="5" y="5" width="10" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2.5" /><rect x="21" y="5" width="10" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2.5" /><rect x="5" y="21" width="10" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2.5" /><rect x="21" y="21" width="10" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg>
              <span>Services</span>
            </h4>
            {ALL_SERVICES.map((s) => (
              <Link key={s} className={`foot-link${s === 'Digital Media' ? ' foot-digital' : ''}`} to="/services">{s}</Link>
            ))}
          </div>

          <div className="foot-column foot-reach">
            <h4>
              <svg viewBox="0 0 36 36" aria-hidden="true"><path d="M32 5 4 15l11 4 4 11 13-25Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="m15 19 17-14" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg>
              <span>Reach Us</span>
            </h4>
            <a href="mailto:pragathidas20@gmail.com" className="foot-contact-link">
              <span className="foot-icon"><svg viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m3.5 7 8.5 6 8.5-6" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg></span>
              <span>pragathidas20@gmail.com</span>
            </a>
            <a href="tel:+919494887225" className="foot-contact-link">
              <span className="foot-icon"><svg viewBox="0 0 24 24"><path d="M6.3 2.8 9.6 8l-2 2.1c1.2 2.5 3.5 4.7 6.1 6l2-2.1 5.3 3.3c.7.4.9 1.3.5 2l-1.4 2.3c-.4.6-1.1.9-1.8.8C10.1 21.4 2.6 13.9 1.6 5.7c-.1-.7.2-1.4.8-1.8l2.3-1.4c.7-.4 1.6-.2 1.6.3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg></span>
              <span>+91 9494887225</span>
            </a>
            <a
              href="https://maps.google.com/maps?q=Shaila+Residency+Mallikarjuna+Nagar+Chintalkunta+LB+Nagar+Hyderabad+Telangana"
              target="_blank"
              rel="noopener noreferrer"
              className="foot-contact-link foot-address"
              title="Open location in Google Maps"
            >
              <span className="foot-icon"><svg viewBox="0 0 24 24"><path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg></span>
              <span>
                Flat no 101, Shaila Residency, Mallikarjuna Nagar, Chintalkunta Check Post, L.B. Nagar, Hyderabad – 500074
              </span>
            </a>
          </div>
        </div>

        <div className="copy">
          <span>© {new Date().getFullYear()} PR Agencies. All rights reserved.</span>
          <a className="foot-developer-credit" href="#" aria-label="Bharita Solutions Private Limited">
            <span>Developed by <strong>Sherize Solutions Pvt ltd </strong></span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
