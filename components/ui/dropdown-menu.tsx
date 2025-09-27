import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import * as React from 'react';
import {
  Platform,
  type StyleProp,
  StyleSheet,
  Text,
  type TextProps,
  View,
  type ViewStyle,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { ChevronDown } from 'lucide-react-native';
import { ChevronRight } from 'lucide-react-native';
import { ChevronUp } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { TextStyleProvider } from '../../components/ui/text';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

function DropdownMenuSubTrigger({
  style,
  inset,
  children,
  ...props
}: DropdownMenuPrimitive.SubTriggerProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.SubTriggerRef>;
  style?: StyleProp<ViewStyle>;
  inset?: boolean;
  children?: React.ReactNode;
}) {
  const theme = useTheme();
  const { open } = DropdownMenuPrimitive.useSubContext();
  const Icon =
    Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;
  return (
    <TextStyleProvider
      style={StyleSheet.flatten([
        styles.subTriggerText,
        { color: theme.colors.text },
      ])}
    >
      <DropdownMenuPrimitive.SubTrigger
        style={({ pressed, hovered }) =>
          StyleSheet.flatten([
            styles.subTrigger,
            open && { backgroundColor: theme.colors.border },
            (pressed || hovered) && { backgroundColor: theme.colors.border },
            inset && styles.subTriggerInset,
            style,
          ])
        }
        {...props}
      >
        {children}
        <Icon
          size={18}
          color={theme.colors.text}
          style={styles.subTriggerIcon}
        />
      </DropdownMenuPrimitive.SubTrigger>
    </TextStyleProvider>
  );
}

function DropdownMenuSubContent({
  style,
  ...props
}: DropdownMenuPrimitive.SubContentProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.SubContentRef>;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <DropdownMenuPrimitive.SubContent
      style={[
        styles.subContent,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.background,
          shadowColor: theme.colors.text,
        },
        style,
      ]}
      {...props}
    />
  );
}

function DropdownMenuContent({
  style,
  overlayStyle,
  portalHost,
  ...props
}: DropdownMenuPrimitive.ContentProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.ContentRef>;
  overlayStyle?: StyleProp<ViewStyle>;
  portalHost?: string;
}) {
  const theme = useTheme();
  return (
    <DropdownMenuPrimitive.Portal hostName={portalHost}>
      <DropdownMenuPrimitive.Overlay
        style={
          overlayStyle
            ? StyleSheet.flatten([
                Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined,
                overlayStyle as typeof StyleSheet.absoluteFill,
              ])
            : Platform.OS !== 'web'
              ? StyleSheet.absoluteFill
              : undefined
        }
      >
        <DropdownMenuPrimitive.Content
          style={StyleSheet.flatten([
            styles.content,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.background,
              shadowColor: theme.colors.text,
            },
            style,
          ])}
          {...props}
        />
      </DropdownMenuPrimitive.Overlay>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  style,
  inset,
  ...props
}: DropdownMenuPrimitive.ItemProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.ItemRef>;
  style?: StyleProp<ViewStyle>;
  inset?: boolean;
}) {
  const theme = useTheme();
  return (
    <TextStyleProvider style={{ color: theme.colors.text }}>
      <DropdownMenuPrimitive.Item
        style={({ pressed, hovered }) => {
          return StyleSheet.flatten([
            styles.item,
            inset && styles.itemInset,
            props.disabled && styles.itemDisabled,
            (pressed || hovered) && { backgroundColor: theme.colors.border },
            style,
          ]);
        }}
        {...props}
      />
    </TextStyleProvider>
  );
}

function DropdownMenuCheckboxItem({
  style,
  children,
  checked,
  ...props
}: DropdownMenuPrimitive.CheckboxItemProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.CheckboxItemRef>;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <DropdownMenuPrimitive.CheckboxItem
      style={({ pressed, hovered }) =>
        StyleSheet.flatten([
          styles.checkboxItem,
          props.disabled && styles.checkboxItemDisabled,
          (pressed || hovered) && { backgroundColor: theme.colors.border },
          style,
        ])
      }
      checked={checked}
      {...props}
    >
      <View style={styles.checkboxIndicator}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check size={14} strokeWidth={3} color={theme.colors.text} />
        </DropdownMenuPrimitive.ItemIndicator>
      </View>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioItem({
  style,
  children,
  ...props
}: DropdownMenuPrimitive.RadioItemProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.RadioItemRef>;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <DropdownMenuPrimitive.RadioItem
      style={({ pressed, hovered }) =>
        StyleSheet.flatten([
          styles.radioItem,
          props.disabled && styles.radioItemDisabled,
          (pressed || hovered) && { backgroundColor: theme.colors.border },
          style,
        ])
      }
      {...props}
    >
      <View style={styles.radioIndicator}>
        <DropdownMenuPrimitive.ItemIndicator>
          <View
            style={[styles.radioDot, { backgroundColor: theme.colors.text }]}
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </View>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  style,
  inset,
  ...props
}: DropdownMenuPrimitive.LabelProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.LabelRef>;
  style?: StyleProp<ViewStyle>;
  inset?: boolean;
}) {
  const theme = useTheme();
  return (
    <DropdownMenuPrimitive.Label
      style={[
        styles.label,
        { color: theme.colors.text },
        inset && styles.labelInset,
        style,
      ]}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  style,
  ...props
}: DropdownMenuPrimitive.SeparatorProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.SeparatorRef>;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <DropdownMenuPrimitive.Separator
      style={StyleSheet.flatten([
        styles.separator,
        { backgroundColor: theme.colors.border },
        style,
      ])}
      {...props}
    />
  );
}

function DropdownMenuShortcut({ style, ...props }: TextProps) {
  const theme = useTheme();
  return (
    <Text
      style={[
        styles.shortcut,
        { color: theme.colors.text + '80' }, // muted text with opacity
        style,
      ]}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};

// Base styles that don't require theme
const styles = StyleSheet.create({
  // SubTrigger styles
  subTriggerText: {
    fontSize: Platform.OS === 'web' ? 14 : 18, // text-sm native:text-lg
  },
  subTriggerTextOpen: {
    // Color applied at render time
  },
  subTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
    paddingHorizontal: 8, // px-2
    paddingVertical: Platform.OS === 'web' ? 6 : 8, // py-1.5 native:py-2
    borderRadius: 2, // rounded-sm
  },
  subTriggerInset: {
    paddingLeft: 32, // pl-8
  },
  subTriggerOpen: {
    // Background color applied at render time
  },
  subTriggerIcon: {
    marginLeft: 'auto',
    // Color applied at render time
  },

  // SubContent styles
  subContent: {
    zIndex: 50, // z-50
    minWidth: 128, // min-w-[8rem]
    overflow: 'hidden',
    borderRadius: 6, // rounded-md
    borderWidth: 1,
    marginTop: 4, // mt-1
    padding: 4, // p-1
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, // shadow-foreground/5
    shadowRadius: 2,
    elevation: 2, // Android shadow
    // Border color, background color, and shadow color applied at render time
  },

  // Content styles
  content: {
    zIndex: 50, // z-50
    minWidth: 128, // min-w-[8rem]
    overflow: 'hidden',
    borderRadius: 6, // rounded-md
    borderWidth: 1,
    padding: 4, // p-1
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, // shadow-foreground/5
    shadowRadius: 2,
    elevation: 2, // Android shadow
    // Border color, background color, and shadow color applied at render time
  },

  item: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
    borderRadius: 2, // rounded-sm
    paddingHorizontal: 8, // px-2
    paddingVertical: Platform.OS === 'web' ? 6 : 8, // py-1.5 native:py-2
  },
  itemInset: {
    paddingLeft: 32, // pl-8
  },
  itemDisabled: {
    opacity: 0.5, // opacity-50
  },

  // CheckboxItem styles
  checkboxItem: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2, // rounded-sm
    paddingVertical: Platform.OS === 'web' ? 6 : 8, // py-1.5 native:py-2
    paddingLeft: 32, // pl-8
    paddingRight: 8, // pr-2
  },
  checkboxItemDisabled: {
    opacity: 0.5, // opacity-50
  },
  checkboxIndicator: {
    position: 'absolute',
    left: 8, // left-2
    width: 14, // w-3.5
    height: 14, // h-3.5
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxIcon: {
    // Color applied at render time
  },

  // RadioItem styles
  radioItem: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2, // rounded-sm
    paddingVertical: Platform.OS === 'web' ? 6 : 8, // py-1.5 native:py-2
    paddingLeft: 32, // pl-8
    paddingRight: 8, // pr-2
  },
  radioItemDisabled: {
    opacity: 0.5, // opacity-50
  },
  radioIndicator: {
    position: 'absolute',
    left: 8, // left-2
    width: 14, // w-3.5
    height: 14, // h-3.5
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 8, // w-2
    height: 8, // h-2
    borderRadius: 4, // rounded-full
    // Background color applied at render time
  },

  // Label styles
  label: {
    paddingHorizontal: 8, // px-2
    paddingVertical: 6, // py-1.5
    fontSize: Platform.OS === 'web' ? 14 : 16, // text-sm native:text-base
    fontWeight: '600', // font-semibold
    // Color applied at render time
  },
  labelInset: {
    paddingLeft: 32, // pl-8
  },

  // Separator styles
  separator: {
    marginHorizontal: -4, // -mx-1
    marginVertical: 4, // my-1
    height: 1, // h-px
    // Background color applied at render time
  },

  // Shortcut styles
  shortcut: {
    marginLeft: 'auto',
    fontSize: Platform.OS === 'web' ? 12 : 14, // text-xs native:text-sm
    letterSpacing: 0.1, // tracking-widest
    // Color applied at render time
  },
});
