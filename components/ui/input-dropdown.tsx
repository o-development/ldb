import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import { View, type TextInputProps } from 'react-native';
import { Input } from './input';
import { Card } from './card';
import { ButtonProps } from './button';
import { LoadingBar } from '../common/LoadingBar';
import { cn } from 'lib/utils';

interface InputDropdownProps<T> extends TextInputProps {
  onChangeText: (text: string) => void;
  items: T[];
  renderItem: (item: T, onSelect: (item: T) => void) => ReactNode;
  filterItems: (items: T[], searchText: string) => T[];
  onItemSelect?: (item: T) => void;
  buttonRight?: ButtonProps;
  isLoading?: boolean;
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
  className,
  ...inputProps
}: InputDropdownProps<T>) {
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

  return (
    <View className={cn('relative', className)} ref={inputRef}>
      <Input
        {...inputProps}
        onChangeText={handleInputChange}
        onFocus={handleInputFocus}
        buttonRight={buttonRight}
      />

      {isDropdownOpen && (filteredItems.length > 0 || isLoading) && (
        <Card className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto border border-border shadow-lg bg-background">
          {isLoading && <LoadingBar isLoading={isLoading} />}
          {filteredItems.map((item, index) => (
            <View key={index}>{renderItem(item, handleItemSelect)}</View>
          ))}
        </Card>
      )}
    </View>
  );
}
