import { COLORS } from '@/configs';
import { ColorMode } from '@/types';
import { ReactNode, createContext, useEffect, useState } from 'react';

export type ThemeContextType = {
  colorMode: ColorMode;
  setColorMode: (newValue: ColorMode) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorMode, rawSetColorMode] = useState<ColorMode>(
    'light' as ColorMode
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode'
    );
    rawSetColorMode(initialColorValue as ColorMode);
  }, []);

  function setColorMode(newValue: ColorMode) {
    const root = window.document.documentElement;

    rawSetColorMode(newValue);

    localStorage.setItem('color-mode', newValue);

    Object.keys(COLORS).forEach((propertyName: string) => {
      root.style.setProperty(
        propertyName,
        newValue === 'light' ? COLORS[propertyName][0] : COLORS[propertyName][1]
      );
    });
  }

  useEffect(() => {
    if (colorMode) {
      const metaThemeColor = document.querySelector('[name="theme-color"]');
      const getThemeColor = () => {
        if (colorMode === 'light') {
          return '#FF6B00';
        } else {
          return '#000326';
        }
      };
      metaThemeColor?.setAttribute('content', getThemeColor());
    }
  }, [colorMode]);

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
