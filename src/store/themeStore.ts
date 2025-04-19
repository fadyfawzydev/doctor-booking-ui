import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  toggleDarkMode: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  toggleHighContrast: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      fontSize: 'medium',
      highContrast: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setFontSize: (size) => set({ fontSize: size }),
      toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        fontSize: state.fontSize,
        highContrast: state.highContrast,
      }),
    }
  )
); 