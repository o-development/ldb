import React, { useEffect } from 'react';
import '~/global.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Appearance, ColorSchemeName, Platform } from 'react-native';
import {
  ThemeProvider as ApplicationThemeProvider,
  DarkTheme,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from 'nativewind';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';

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

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

export const ThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [loadingColorScheme, setLoadingColorScheme] = useState(true);

  usePlatformSpecificSetup();

  useEffect(() => {
    const lookupCurColorScheme = async () => {
      setColorScheme(Appearance.getColorScheme() ?? 'system');
      const storedColorSchemeName: ColorSchemeName =
        ((await AsyncStorage.getItem(COLOR_SCHEME_KEY)) as ColorSchemeName) ||
        Appearance.getColorScheme();
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

  return (
    <>
      <ApplicationThemeProvider
        value={context.colorScheme === 'light' ? LIGHT_THEME : DARK_THEME}
      >
        <ThemeProviderContext.Provider value={context}>
          {children}
        </ThemeProviderContext.Provider>
      </ApplicationThemeProvider>
    </>
  );
};

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add('bg-background');
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? 'light');
  }, []);
}

function noop() {}
