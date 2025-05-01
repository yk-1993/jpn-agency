import jaTranslations from '@/dictionaries/ja.json';
import zhTranslations from '@/dictionaries/zh.json';
import { Locale } from '@/i18n.config';

type Translations = {
  [key: string]: string | Translations;
};

const translations: Record<Locale, Translations> = {
  zh: zhTranslations,
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
      console.error(`Translation object not found for locale: ${locale}`);
      console.error(`Key: ${key}`);
      return key;
    }
    if (!(k in current)) {
      console.error(`Translation key not found: ${key} for locale ${locale}`);
      console.error(`Available keys: ${Object.keys(current).join(', ')}`);
      console.error(`Current path: ${keys.slice(0, keys.indexOf(k) + 1).join('.')}`);
      return key;
    }
    current = current[k];
  }

  if (typeof current !== 'string') {
    console.error(`Translation value is not a string for key: ${key} in locale ${locale}`);
    console.error('Current value:', current);
    return key;
  }

  return current;
}
