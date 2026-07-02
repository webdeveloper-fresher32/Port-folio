export interface ContactFormInput {
  name: string
  email: string
  message: string
}

export interface ContactFormValidationResult {
  valid: boolean
  errors: Partial<Record<keyof ContactFormInput, string>>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(input: ContactFormInput): ContactFormValidationResult {
  const errors: ContactFormValidationResult['errors'] = {}

  if (!input.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!EMAIL_PATTERN.test(input.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (input.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
