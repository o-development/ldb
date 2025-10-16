import * as MenubarPrimitive from '@rn-primitives/menubar';
import * as React from 'react';
import { Platform, Text, type TextProps, View, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { ChevronDown } from 'lucide-react-native';
import { ChevronRight } from 'lucide-react-native';
import { ChevronUp } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { TextStyleProvider } from '../../components/ui/text';

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

function Menubar({
  style,
  ...props
}: MenubarPrimitive.RootProps & {
  ref?: React.RefObject<MenubarPrimitive.RootRef>;
}) {
  const { colors } = useTheme();

  const rootStyles = StyleSheet.flatten([
    styles.root,
    {
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
    style,
  ]);

  return <MenubarPrimitive.Root style={rootStyles} {...props} />;
}

function MenubarTrigger({
  style,
  ...props
}: MenubarPrimitive.TriggerProps & {
  ref?: React.RefObject<MenubarPrimitive.TriggerRef>;
}) {
  const { colors } = useTheme();
  const { value } = MenubarPrimitive.useRootContext();
  const { value: itemValue } = MenubarPrimitive.useMenuContext();

  const triggerStyles = StyleSheet.flatten([
    styles.trigger,
    {
      backgroundColor: value === itemValue ? colors.border : 'transparent',
      color: value === itemValue ? colors.text : colors.text,
    },
    style,
  ]);

  return <MenubarPrimitive.Trigger style={triggerStyles} {...props} />;
}

function MenubarSubTrigger({
  style,
  inset,
  children,
  ...props
}: MenubarPrimitive.SubTriggerProps & {
  ref?: React.RefObject<MenubarPrimitive.SubTriggerRef>;
  inset?: boolean;
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();
  const { open } = MenubarPrimitive.useSubContext();
  const Icon =
    Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;

  const textStyles = {
    fontSize: Platform.OS === 'web' ? 14 : 18,
    color: open ? colors.primary : colors.primary,
  };

  const triggerStyles = StyleSheet.flatten([
    styles.subTrigger,
    {
      backgroundColor: open ? colors.border : 'transparent',
      paddingLeft: inset ? 32 : 8,
    },
    style,
  ]);

  return (
    <TextStyleProvider style={textStyles}>
      <MenubarPrimitive.SubTrigger style={triggerStyles} {...props}>
        {children}
        <Icon size={18} color={colors.text} style={styles.icon} />
      </MenubarPrimitive.SubTrigger>
    </TextStyleProvider>
  );
}

function MenubarSubContent({
  style,
  ...props
}: MenubarPrimitive.SubContentProps & {
  ref?: React.RefObject<MenubarPrimitive.SubContentRef>;
}) {
  const { colors } = useTheme();

  const contentStyles = StyleSheet.flatten([
    styles.subContent,
    {
      backgroundColor: colors.background,
      borderColor: colors.border,
      shadowColor: colors.text,
    },
    style,
  ]);

  return <MenubarPrimitive.SubContent style={contentStyles} {...props} />;
}

function MenubarContent({
  style,
  portalHost,
  ...props
}: MenubarPrimitive.ContentProps & {
  ref?: React.RefObject<MenubarPrimitive.ContentRef>;
  portalHost?: string;
}) {
  const { colors } = useTheme();

  const contentStyles = StyleSheet.flatten([
    styles.content,
    {
      backgroundColor: colors.background,
      borderColor: colors.border,
      shadowColor: colors.text,
    },
    style,
  ]);

  return (
    <MenubarPrimitive.Portal hostName={portalHost}>
      <MenubarPrimitive.Content style={contentStyles} {...props} />
    </MenubarPrimitive.Portal>
  );
}

function MenubarItem({
  style,
  inset,
  ...props
}: MenubarPrimitive.ItemProps & {
  ref?: React.RefObject<MenubarPrimitive.ItemRef>;
  inset?: boolean;
}) {
  const { colors } = useTheme();

  const textStyles = {
    fontSize: Platform.OS === 'web' ? 14 : 18,
    color: colors.text,
  };

  const itemStyles = StyleSheet.flatten([
    styles.item,
    {
      paddingLeft: inset ? 32 : 8,
      opacity: props.disabled ? 0.5 : 1,
    },
    style,
  ]);

  return (
    <TextStyleProvider style={textStyles}>
      <MenubarPrimitive.Item style={itemStyles} {...props} />
    </TextStyleProvider>
  );
}

function MenubarCheckboxItem({
  style,
  children,
  checked,
  ...props
}: MenubarPrimitive.CheckboxItemProps & {
  ref?: React.RefObject<MenubarPrimitive.CheckboxItemRef>;
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();

  const checkboxStyles = StyleSheet.flatten([
    styles.checkboxItem,
    {
      opacity: props.disabled ? 0.5 : 1,
    },
    style,
  ]);

  return (
    <MenubarPrimitive.CheckboxItem
      style={checkboxStyles}
      checked={checked}
      {...props}
    >
      <View style={styles.checkboxIndicator}>
        <MenubarPrimitive.ItemIndicator>
          <Check size={14} strokeWidth={3} color={colors.text} />
        </MenubarPrimitive.ItemIndicator>
      </View>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem({
  style,
  children,
  ...props
}: MenubarPrimitive.RadioItemProps & {
  ref?: React.RefObject<MenubarPrimitive.RadioItemRef>;
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();

  const radioStyles = StyleSheet.flatten([
    styles.radioItem,
    {
      opacity: props.disabled ? 0.5 : 1,
    },
    style,
  ]);

  return (
    <MenubarPrimitive.RadioItem style={radioStyles} {...props}>
      <View style={styles.radioIndicator}>
        <MenubarPrimitive.ItemIndicator>
          <View style={[styles.radioDot, { backgroundColor: colors.text }]} />
        </MenubarPrimitive.ItemIndicator>
      </View>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel({
  style,
  inset,
  ...props
}: MenubarPrimitive.LabelProps & {
  ref?: React.RefObject<MenubarPrimitive.LabelRef>;
  inset?: boolean;
}) {
  const { colors } = useTheme();

  const labelStyles = StyleSheet.flatten([
    styles.label,
    {
      color: colors.text,
      paddingLeft: inset ? 32 : 8,
    },
    style,
  ]);

  return <MenubarPrimitive.Label style={labelStyles} {...props} />;
}

function MenubarSeparator({
  style,
  ...props
}: MenubarPrimitive.SeparatorProps & {
  ref?: React.RefObject<MenubarPrimitive.SeparatorRef>;
}) {
  const { colors } = useTheme();

  const separatorStyles = StyleSheet.flatten([
    styles.separator,
    {
      backgroundColor: colors.border,
    },
    style,
  ]);

  return <MenubarPrimitive.Separator style={separatorStyles} {...props} />;
}

function MenubarShortcut({ style, ...props }: TextProps) {
  const { colors } = useTheme();

  const shortcutStyles = StyleSheet.flatten([
    styles.shortcut,
    {
      color: colors.text,
    },
    style,
  ]);

  return <Text style={shortcutStyles} {...props} />;
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: Platform.OS === 'web' ? 40 : 48,
    alignItems: 'center',
    gap: 4,
    borderRadius: 6,
    borderWidth: 1,
    padding: 4,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: Platform.OS === 'web' ? 14 : 16,
    fontWeight: '500',
  },
  subTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  subContent: {
    zIndex: 50,
    minWidth: 128,
    overflow: 'hidden',
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 4,
    padding: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    zIndex: 50,
    minWidth: 128,
    overflow: 'hidden',
    borderRadius: 6,
    borderWidth: 1,
    padding: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 6,
    paddingLeft: 32,
    paddingRight: 8,
  },
  checkboxIndicator: {
    position: 'absolute',
    left: 8,
    height: 14,
    width: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 6,
    paddingLeft: 32,
    paddingRight: 8,
  },
  radioIndicator: {
    position: 'absolute',
    left: 8,
    height: 14,
    width: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: Platform.OS === 'web' ? 14 : 16,
    fontWeight: '600',
  },
  separator: {
    marginHorizontal: -4,
    marginVertical: 4,
    height: 1,
  },
  shortcut: {
    marginLeft: 'auto',
    fontSize: Platform.OS === 'web' ? 12 : 14,
    letterSpacing: 1,
  },
  icon: {
    marginLeft: 'auto',
  },
});

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
