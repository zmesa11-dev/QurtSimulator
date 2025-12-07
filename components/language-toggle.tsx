"use client";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} 
        className="font-bold w-9 px-0"
    >
      {lang.toUpperCase()}
    </Button>
  );
}