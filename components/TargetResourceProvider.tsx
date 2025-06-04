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
import { useColorScheme } from 'nativewind';

interface UseTargetResourceContext {
  targetResource: Solid;
  loadingColorScheme: boolean;
  colorScheme: NonNullable<ColorSchemeName>;
}

const ThemeProviderContext = createContext<UseTargetResourceContext>({});

export function useThemeChange() {
  return useContext(ThemeProviderContext);
}

export const TargetResourceProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeProviderContext.Provider value={context}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
