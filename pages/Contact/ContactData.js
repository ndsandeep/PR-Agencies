// Contact page data – all content centralised here

export const CONTACT_INFO = {
  email: {
    label: 'Email',
    value: 'pragencies27@gmail.com',
    href: 'mailto:pragencies27@gmail.com',
  },
  phone: {
    label: 'Phone',
    value: '+91 8465887595',
    href: 'tel:+918465887595',
  },
  office: {
    label: 'Office',
    value: 'Flat No. 101, Shaila Residency',
    detail: 'Mallikarjuna Nagar, Chintalkunta Check Post, L.B. Nagar, Hyderabad – 500074',
  },
}

export const SOCIAL_LINKS = [
  { name: 'Instagram', href: '#!' },
  { name: 'LinkedIn', href: '#!' },
  { name: 'YouTube', href: '#!' },
  { name: 'Facebook', href: '#!' },
]

export const FORM_FIELDS = {
  name: { label: 'Name', type: 'text', required: true },
  email: { label: 'Email', type: 'email', required: true },
  phone: { label: 'Phone', type: 'tel', required: false },
  company: { label: 'Company', type: 'text', required: false },
}

export const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
}
