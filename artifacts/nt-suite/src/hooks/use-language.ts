import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'fr';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'fr', // Default is FR
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'fr' : 'en' })),
    }),
    {
      name: 'nt-suite-lang',
    }
  )
);
