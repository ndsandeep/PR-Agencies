// Contact form component with validation and floating label pop-up boxes
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Magnet } from '../../components/Anim.jsx'
import { SERVICES } from '../../data'
import { EMPTY_FORM } from './ContactData.js'

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const prefersReducedMotion = useReducedMotion()

  const updateField = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const validate = () => {
    const errs = {}

    if (form.name.trim().length < 2)
      errs.name = 'Please enter your name'

    if (!/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = 'Enter a valid email address'

    if (form.phone && !/^[+\d][\d\s-]{7,}$/.test(form.phone))
      errs.phone = 'Enter a valid phone number'

    if (!form.service)
      errs.service = 'Please choose a service'

    if (form.message.trim().length < 10)
      errs.message = 'Tell us a little more (10+ characters)'

    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)

    if (Object.keys(errs).length === 0) {
      setStatus('loading')

      // Simulate a brief loading state (front-end demo only)
      setTimeout(() => {
        setStatus('success')
        setForm(EMPTY_FORM)
      }, 1200)
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setErrors({})
  }

  // Animation wrapper for form transitions
  const anim = prefersReducedMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          className="contact-form-success"
          {...anim}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-form-success-icon">✓</div>
          <h3 className="contact-form-success-title">Thank you.</h3>
          <p className="contact-form-success-text">
            Your enquiry has been noted. This is a front-end demo — no data was
            sent to a server. In production, this form would submit to a backend
            service or email API.
          </p>
          <button
            className="btn contact-form-reset-btn"
            type="button"
            onClick={handleReset}
          >
            Send another enquiry
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
          {...anim}
          transition={{ duration: 0.4 }}
        >
          <div className="contact-card-header contact-form-full">
            <span className="contact-card-kicker">Send Enquiry</span>
            <h3 className="contact-card-title">Start a Conversation</h3>
          </div>

          <FloatingField
            label="Name"
            type="text"
            value={form.name}
            onChange={updateField('name')}
            error={errors.name}
            required
          />
          <FloatingField
            label="Email"
            type="email"
            value={form.email}
            onChange={updateField('email')}
            error={errors.email}
            required
          />
          <FloatingField
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={updateField('phone')}
            error={errors.phone}
          />
          <FloatingField
            label="Company"
            type="text"
            value={form.company}
            onChange={updateField('company')}
          />

          <FloatingField
            label="Service"
            isSelect
            value={form.service}
            onChange={updateField('service')}
            error={errors.service}
            required
            full
          >
            <option value="" disabled hidden />
            <option value="Individual Promotion">Individual Promotion</option>
            <option value="Media Planning">Media Planning</option>
            <option value="360° Advertising">360° Advertising</option>
            <option value="Electronic Media">Electronic Media</option>
            <option value="Print Media">Print Media</option>
            <option value="Digital Media">Digital Media</option>
            <option value="FM Advertising">FM Advertising</option>
            <option value="Other">Other</option>
          </FloatingField>

          <FloatingField
            label="Message"
            isTextarea
            rows={4}
            value={form.message}
            onChange={updateField('message')}
            error={errors.message}
            required
            full
          />

          <div className="contact-form-field contact-form-full">
            <Magnet>
              <button
                className="btn primary contact-form-submit"
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className="contact-form-spinner" />
                    Sending…
                  </>
                ) : (
                  'Send enquiry →'
                )}
              </button>
            </Magnet>
            <p className="contact-form-disclaimer">
              This is a front-end demo. No data will be sent.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

/**
 * FloatingField – Input box with pop-up floating label
 * The label sits inside the box initially, and pops up to the top border when clicked/focused.
 */
function FloatingField({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required,
  full,
  isSelect,
  isTextarea,
  rows = 4,
  children,
}) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)
  const hasValue = Boolean(value !== undefined && value !== null && String(value).trim().length > 0)
  const isPopped = isFocused || hasValue

  return (
    <div
      className={`contact-floating-box${full ? ' contact-form-full' : ''} ${
        isPopped ? 'is-popped' : ''
      } ${isFocused ? 'is-focused' : ''} ${error ? 'has-error' : ''}`}
      onClick={() => inputRef.current?.focus()}
    >
      <label className="contact-floating-label">
        {label}
        {required && <span className="contact-form-required"> *</span>}
      </label>

      {isSelect ? (
        <select
          ref={inputRef}
          className="contact-floating-input contact-floating-select"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {children}
        </select>
      ) : isTextarea ? (
        <textarea
          ref={inputRef}
          className="contact-floating-input contact-floating-textarea"
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : (
        <input
          ref={inputRef}
          className="contact-floating-input"
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}

      {error && <span className="contact-form-error">{error}</span>}
    </div>
  )
}
