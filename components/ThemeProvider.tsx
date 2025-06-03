import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import {
  ThemeProvider as ApplicationThemeProvider,
  DarkTheme,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from 'nativewind';

const COLOR_SCHEME_KEY = 'colorScheme';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

interface UseThemeChangeContext {
  setColorScheme: (scheme: NonNullable<ColorSchemeName>) => void;
  loadingColorScheme: boolean;
  colorScheme: NonNullable<ColorSchemeName>;
}

const ThemeProviderContext = createContext<UseThemeChangeContext>({
  loadingColorScheme: true,
  setColorScheme: () => {},
  colorScheme: 'light',
});

export function useThemeChange() {
  return useContext(ThemeProviderContext);
}

export const ThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [loadingColorScheme, setLoadingColorScheme] = useState(true);

  useEffect(() => {
    const lookupCurColorScheme = async () => {
      const storedColorSchemeName: ColorSchemeName =
        ((await AsyncStorage.getItem(COLOR_SCHEME_KEY)) as ColorSchemeName) ||
        Appearance.getColorScheme();
      console.log('Stored Color Scheme', storedColorSchemeName);
      if (storedColorSchemeName) {
        setColorScheme(storedColorSchemeName);
      }
      setLoadingColorScheme(false);
    };
    lookupCurColorScheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = useMemo(
    () => ({
      setColorScheme: async (newColorScheme: NonNullable<ColorSchemeName>) => {
        setColorScheme(newColorScheme);
        await AsyncStorage.setItem(COLOR_SCHEME_KEY, newColorScheme);
      },
      loadingColorScheme,
      colorScheme: colorScheme ?? 'light',
    }),
    [loadingColorScheme, colorScheme, setColorScheme],
  );

  console.log('Color Scheme', colorScheme);

  return (
    <>
      <ApplicationThemeProvider
        value={colorScheme === 'light' ? LIGHT_THEME : DARK_THEME}
      >
        <ThemeProviderContext.Provider value={context}>
          {children}
        </ThemeProviderContext.Provider>
      </ApplicationThemeProvider>
    </>
  );
};
