export const i18n = {
  defaultLocale: 'zn',
  locales: ['zn', 'ja'],
} as const

export type Locale = (typeof i18n)['locales'][number]