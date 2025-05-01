import { Locale } from '@/i18n.config';
import znTranslations from '@/dictionaries/zn.json';
import jaTranslations from '@/dictionaries/ja.json';

type Translations = {
  [key: string]: string | Translations;
};

const translations: Record<Locale, Translations> = {
  zn: znTranslations,
  ja: jaTranslations,
};

export function t(key: string, locale: Locale): string {
  const keys = key.split('.');
  let current: Translations | string | undefined = translations[locale];

  for (const k of keys) {
    if (typeof current === 'string') {
      return current;
    }
    if (!current) {
      console.warn(`Translation object not found for locale: ${locale}`);
      return key;
    }
    if (!(k in current)) {
      console.warn(`Translation key not found: ${key} for locale ${locale}`);
      console.warn(`Available keys: ${Object.keys(current).join(', ')}`);
      return key;
    }
    current = current[k];
  }

  if (typeof current !== 'string') {
    console.warn(`Translation value is not a string for key: ${key} in locale ${locale}`);
    return key;
  }

  return current;
}
