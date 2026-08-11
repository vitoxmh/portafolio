import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import type { TranslationKey } from '../i18n'

export interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactFormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
}

const EMPTY_VALUES: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export function useContactForm(includeSubject = true) {
  const { t } = useLanguage()
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange =
    (field: keyof ContactFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target
      setValues((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
      if (status === 'success' || status === 'error') {
        setStatus('idle')
        setErrorMessage('')
      }
    }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors = validate(values, t, includeSubject)
    setErrors(nextErrors)
    setErrorMessage('')

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch('/send_contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      })

      const data = (await response.json()) as { success?: boolean; error?: string }
      if (!response.ok || !data.success) {
        throw new Error(data.error || t('contact.errors.sendFailed'))
      }

      setStatus('success')
      setValues(EMPTY_VALUES)
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : t('contact.errors.sendFailed'),
      )
    }
  }

  return { values, errors, status, errorMessage, handleChange, submit }
}

function validate(
  values: ContactFormValues,
  t: (key: TranslationKey) => string,
  includeSubject: boolean,
): ContactFormErrors {
  const errors: ContactFormErrors = {}

  const name = values.name.trim()
  if (!name) {
    errors.name = t('contact.errors.nameRequired')
  } else if (name.length > LIMITS.name) {
    errors.name = t('contact.errors.nameTooLong')
  }

  const email = values.email.trim()
  if (!email) {
    errors.email = t('contact.errors.emailRequired')
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = t('contact.errors.emailInvalid')
  } else if (email.length > LIMITS.email) {
    errors.email = t('contact.errors.emailTooLong')
  }

  if (includeSubject) {
    const subject = values.subject.trim()
    if (subject.length > LIMITS.subject) {
      errors.subject = t('contact.errors.subjectTooLong')
    }
  }

  const message = values.message.trim()
  if (!message) {
    errors.message = t('contact.errors.messageRequired')
  } else if (message.length > LIMITS.message) {
    errors.message = t('contact.errors.messageTooLong')
  }

  return errors
}
