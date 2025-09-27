import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { MoonStar } from 'lucide-react-native';
import { Sun } from 'lucide-react-native';
import { Text } from '../../ui/text';
import { Switch } from '../../ui/switch';
import { DropdownMenuItem } from '../../ui/dropdown-menu';
import { useThemeChange } from '../../ThemeProvider';
import { Icon } from '../../ui/icon';

export const ThemeToggleMenu: FunctionComponent = () => {
  const { colorScheme, setColorScheme } = useThemeChange();

  return (
    <DropdownMenuItem
      onPress={() => {
        setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
      }}
      style={styles.dropdownMenuItem}
      closeOnPress={false}
    >
      <View style={styles.textContainer}>
        <Icon icon={colorScheme === 'dark' ? MoonStar : Sun} />
        <Text>Dark Mode</Text>
      </View>

      <Switch
        checked={colorScheme === 'dark'}
        onCheckedChange={(isDark) => {
          setColorScheme(isDark ? 'dark' : 'light');
        }}
      />
    </DropdownMenuItem>
  );
};

const styles = StyleSheet.create({
  dropdownMenuItem: {
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
});
