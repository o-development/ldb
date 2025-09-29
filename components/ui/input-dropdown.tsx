import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import { View, type TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Input } from './input';
import { Card } from './card';
import { ButtonProps } from './button';
import { LoadingBar } from '../common/LoadingBar';

interface InputDropdownProps<T> extends TextInputProps {
  onChangeText: (text: string) => void;
  items: T[];
  renderItem: (item: T, onSelect: (item: T) => void) => ReactNode;
  filterItems: (items: T[], searchText: string) => T[];
  onItemSelect?: (item: T) => void;
  buttonRight?: ButtonProps;
  isLoading?: boolean;
  style?: any;
}

export function InputDropdown<T>({
  items,
  renderItem,
  filterItems,
  onItemSelect,
  buttonRight,
  onChangeText,
  onFocus,
  value,
  isLoading,
  style,
  ...inputProps
}: InputDropdownProps<T>) {
  const { colors } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<any>(null);

  const filteredItems = useMemo(() => {
    return filterItems(items, value || '');
  }, [items, value, filterItems]);

  const handleInputChange = useCallback(
    (text: string) => {
      onChangeText(text);
      setIsDropdownOpen(true);
    },
    [onChangeText],
  );

  const handleInputFocus = useCallback(
    (event: any) => {
      setIsDropdownOpen(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleItemSelect = useCallback(
    (item: T) => {
      onItemSelect?.(item);
      setIsDropdownOpen(false);
    },
    [onItemSelect],
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  // Apply theme colors to base styles
  const containerStyles = {
    ...styles.container,
    ...style,
  };

  const dropdownStyles = {
    ...styles.dropdown,
    backgroundColor: colors.background,
    borderColor: colors.border,
  };

  return (
    <View style={containerStyles} ref={inputRef}>
      <Input
        {...inputProps}
        onChangeText={handleInputChange}
        onFocus={handleInputFocus}
        buttonRight={buttonRight}
      />

      {isDropdownOpen && (filteredItems.length > 0 || isLoading) && (
        <Card style={dropdownStyles}>
          {isLoading && <LoadingBar isLoading={isLoading} />}
          {filteredItems.map((item, index) => (
            <View key={index}>{renderItem(item, handleItemSelect)}</View>
          ))}
        </Card>
      )}
    </View>
  );
}

// Global base styles for input dropdown component
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4, // mt-1
    maxHeight: 240, // max-h-60 (60 * 4 = 240px)
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 8,
    // Shadow properties for web
    ...(typeof window !== 'undefined' && {
      boxShadow:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }),
  },
});
