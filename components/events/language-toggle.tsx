'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { languageAtom } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const [language, setLanguage] = useAtom(languageAtom);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  // Update all elements with data-language attributes when language changes
  useEffect(() => {
    document.querySelectorAll('[data-language-en]').forEach((element) => {
      if (element instanceof HTMLElement) {
        element.innerText = element.dataset[`language${language.toUpperCase()}`] || '';
      }
    });
  }, [language]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {language === 'en' ? '中文' : 'English'}
    </Button>
  );
}
