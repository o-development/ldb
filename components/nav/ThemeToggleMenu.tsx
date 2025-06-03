import React from 'react';
import { FunctionComponent } from 'react';
import { MoonStar } from '~/lib/icons/MoonStar';
import { Sun } from '~/lib/icons/Sun';
import { Text } from '../ui/text';
import { Switch } from '../ui/switch';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { useThemeChange } from '../ThemeProvider';

export const ThemeToggleMenu: FunctionComponent = () => {
  const { colorScheme, setColorScheme } = useThemeChange();

  return (
    <DropdownMenuItem
      onPress={() => {
        setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
      }}
      className="justify-between"
    >
      <Text className="flex flex-row gap-1 items-center">
        {colorScheme === 'dark' ? <MoonStar /> : <Sun />} Dark Mode
      </Text>

      <Switch
        checked={colorScheme === 'dark'}
        onCheckedChange={(isDark) => {
          setColorScheme(isDark ? 'dark' : 'light');
        }}
        nativeID="airplane-mode"
      />
    </DropdownMenuItem>
  );

  // return (
  //   <MenuItem
  //     {...props}
  //     title="Dark Mode"
  //     onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
  //     accessoryLeft={(props) => (
  //       <Icon {...props} name={colorScheme === 'dark' ? 'moon' : 'sun'} />
  //     )}
  //     accessoryRight={(props) => (
  //       <Toggle
  //         {...props}
  //         style={styles.toggle}
  //         checked={colorScheme === 'dark'}
  //         onChange={}
  //       />
  //     )}
  //   />
  // );
};
