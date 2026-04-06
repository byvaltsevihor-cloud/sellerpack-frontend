export const locales = ['uk', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'uk'

export const localeNames: Record<Locale, string> = {
  uk: 'Українська',
  en: 'English',
}

export const localeFlags: Record<Locale, string> = {
  uk: '🇺🇦',
  en: '🇬🇧',
}

// Map locale codes to WPGraphQL LanguageCodeFilterEnum
export const localeToGraphQL: Record<Locale, string> = {
  uk: 'UK',
  en: 'EN',
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
