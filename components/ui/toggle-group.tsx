import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextStyleProvider } from '../ui/text';
import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group';

const ToggleGroupContext = React.createContext<{
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
} | null>(null);

function ToggleGroup({
  style,
  variant,
  size,
  children,
  ...props
}: ToggleGroupPrimitive.RootProps & {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  ref?: React.RefObject<ToggleGroupPrimitive.RootRef>;
}) {
  return (
    <ToggleGroupPrimitive.Root
      style={StyleSheet.flatten([styles.root, style])}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (context === null) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component',
    );
  }
  return context;
}

function ToggleGroupItem({
  style,
  children,
  variant,
  size,
  ...props
}: ToggleGroupPrimitive.ItemProps & {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  ref?: React.RefObject<ToggleGroupPrimitive.ItemRef>;
}) {
  const { colors } = useTheme();
  const context = useToggleGroupContext();
  const { value } = ToggleGroupPrimitive.useRootContext();

  const isSelected = ToggleGroupPrimitive.utils.getIsSelected(
    value,
    props.value,
  );
  const finalVariant = context.variant || variant || 'default';
  const finalSize = context.size || size || 'default';

  const textStyles = {
    color: isSelected ? colors.text : colors.text,
  };

  const getSizeStyles = () => {
    switch (finalSize) {
      case 'sm':
        return styles.smItemSize;
      case 'lg':
        return styles.lgItemSize;
      default:
        return styles.defaultItemSize;
    }
  };

  const getVariantStyles = () => {
    switch (finalVariant) {
      case 'outline':
        return styles.outlineItem;
      default:
        return styles.defaultItem;
    }
  };

  const itemStyles = StyleSheet.flatten([
    styles.item,
    getVariantStyles(),
    getSizeStyles(),
    {
      backgroundColor: isSelected ? colors.border : 'transparent',
      borderColor: finalVariant === 'outline' ? colors.border : 'transparent',
      opacity: props.disabled ? 0.5 : 1,
    },
    style,
  ]);

  return (
    <TextStyleProvider style={textStyles}>
      <ToggleGroupPrimitive.Item style={itemStyles} {...props}>
        {children}
      </ToggleGroupPrimitive.Item>
    </TextStyleProvider>
  );
}

function ToggleGroupIcon({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<LucideIcon> & {
  icon: LucideIcon;
}) {
  const { colors } = useTheme();

  return <Icon color={colors.text} {...props} />;
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  defaultItem: {
    backgroundColor: 'transparent',
  },
  outlineItem: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  defaultItemSize: {
    height: 40,
    paddingHorizontal: 12,
  },
  smItemSize: {
    height: 36,
    paddingHorizontal: 10,
  },
  lgItemSize: {
    height: 44,
    paddingHorizontal: 20,
  },
});

export { ToggleGroup, ToggleGroupIcon, ToggleGroupItem };
