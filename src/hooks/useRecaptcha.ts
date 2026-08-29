import { useCallback, useEffect, useRef, useState } from 'react'
import { RECAPTCHA_SITE_KEY } from '../config'

interface RecaptchaApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => number
  getResponse: (widgetId: number) => string
  reset: (widgetId: number) => void
}

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi
    onRecaptchaLoaded?: () => void
  }
}

export function useRecaptcha(containerRef: React.RefObject<HTMLDivElement | null>) {
  const enabled = RECAPTCHA_SITE_KEY !== ''
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState('')
  const widgetId = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return

    const renderWidget = () => {
      if (!window.grecaptcha || !containerRef.current) return
      const id = window.grecaptcha.render(containerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (response: string) => setToken(response),
        'expired-callback': () => setToken(''),
      })
      widgetId.current = id
      setReady(true)
    }

    if (window.grecaptcha) {
      renderWidget()
      return
    }

    window.onRecaptchaLoaded = renderWidget
    const script = document.createElement('script')
    script.src =
      'https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoaded'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      if (window.onRecaptchaLoaded === renderWidget) {
        window.onRecaptchaLoaded = undefined
      }
    }
  }, [enabled, containerRef])

  const reset = useCallback(() => {
    if (widgetId.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetId.current)
    }
    setToken('')
  }, [])

  return { enabled, ready, token, reset }
}
