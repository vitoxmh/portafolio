import { createContext } from 'react'
import type { Language, LocalizedList, LocalizedString } from './i18n'

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: (value: LocalizedString) => string
  tList: (value: LocalizedList) => readonly string[]
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
