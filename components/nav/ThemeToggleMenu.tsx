import { Icon, MenuItem, MenuItemProps, Toggle } from '@ui-kitten/components';
import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';

import { useThemeChange } from '../root/ThemeProvider';

export const ThemeToggleMenu: FunctionComponent<MenuItemProps> = (props) => {
  const { colorScheme, setColorScheme } = useThemeChange();

  return (
    <MenuItem
      {...props}
      title="Dark Mode"
      onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
      accessoryLeft={(props) => (
        <Icon {...props} name={colorScheme === 'dark' ? 'moon' : 'sun'} />
      )}
      accessoryRight={(props) => (
        <Toggle
          {...props}
          style={styles.toggle}
          checked={colorScheme === 'dark'}
          onChange={(isDark) => {
            setColorScheme(isDark ? 'dark' : 'light');
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  toggle: { height: 10 },
});
