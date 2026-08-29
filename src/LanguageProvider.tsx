import { useCallback, useEffect, useState, type ReactNode } from 'react'
import type { Language, LocalizedList, LocalizedString } from './i18n'
import { LanguageContext, type LanguageContextValue } from './LanguageContext'

const STORAGE_KEY = 'portfolio-language'

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'es' || saved === 'en') return saved
  return window.navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
  }, [])

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: (value: LocalizedString) => {
      if (typeof value === 'string') return value
      return value[language]
    },
    tList: (value: LocalizedList) => {
      return value[language]
    },
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
