import * as ContextMenuPrimitive from '@rn-primitives/context-menu';
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

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

function ContextMenuSubTrigger({
  style,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubTriggerProps & {
  ref?: React.RefObject<ContextMenuPrimitive.SubTriggerRef>;
  children?: React.ReactNode;
  inset?: boolean;
}) {
  const { colors } = useTheme();
  const { open } = ContextMenuPrimitive.useSubContext();
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
      <ContextMenuPrimitive.SubTrigger style={triggerStyles} {...props}>
        {children}
        <Icon size={18} color={colors.text} style={styles.icon} />
      </ContextMenuPrimitive.SubTrigger>
    </TextStyleProvider>
  );
}

function ContextMenuSubContent({
  style,
  ...props
}: ContextMenuPrimitive.SubContentProps & {
  ref?: React.RefObject<ContextMenuPrimitive.SubContentRef>;
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

  return <ContextMenuPrimitive.SubContent style={contentStyles} {...props} />;
}

function ContextMenuContent({
  style,
  overlayStyle,
  portalHost,
  ...props
}: ContextMenuPrimitive.ContentProps & {
  ref?: React.RefObject<ContextMenuPrimitive.ContentRef>;
  overlayStyle?: StyleProp<ViewStyle>;
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
    <ContextMenuPrimitive.Portal hostName={portalHost}>
      <ContextMenuPrimitive.Overlay
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
        <ContextMenuPrimitive.Content style={contentStyles} {...props} />
      </ContextMenuPrimitive.Overlay>
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem({
  style,
  inset,
  ...props
}: ContextMenuPrimitive.ItemProps & {
  ref?: React.RefObject<ContextMenuPrimitive.ItemRef>;
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
      <ContextMenuPrimitive.Item style={itemStyles} {...props} />
    </TextStyleProvider>
  );
}

function ContextMenuCheckboxItem({
  style,
  children,
  ...props
}: ContextMenuPrimitive.CheckboxItemProps & {
  ref?: React.RefObject<ContextMenuPrimitive.CheckboxItemRef>;
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
    <ContextMenuPrimitive.CheckboxItem style={checkboxStyles} {...props}>
      <View style={styles.checkboxIndicator}>
        <ContextMenuPrimitive.ItemIndicator>
          <Check size={14} strokeWidth={3} color={colors.text} />
        </ContextMenuPrimitive.ItemIndicator>
      </View>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  style,
  children,
  ...props
}: ContextMenuPrimitive.RadioItemProps & {
  ref?: React.RefObject<ContextMenuPrimitive.RadioItemRef>;
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
    <ContextMenuPrimitive.RadioItem style={radioStyles} {...props}>
      <View style={styles.radioIndicator}>
        <ContextMenuPrimitive.ItemIndicator>
          <View style={[styles.radioDot, { backgroundColor: colors.text }]} />
        </ContextMenuPrimitive.ItemIndicator>
      </View>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({
  style,
  inset,
  ...props
}: ContextMenuPrimitive.LabelProps & {
  ref?: React.RefObject<ContextMenuPrimitive.LabelRef>;
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

  return <ContextMenuPrimitive.Label style={labelStyles} {...props} />;
}

function ContextMenuSeparator({
  style,
  ...props
}: ContextMenuPrimitive.SeparatorProps & {
  ref?: React.RefObject<ContextMenuPrimitive.SeparatorRef>;
}) {
  const { colors } = useTheme();

  const separatorStyles = StyleSheet.flatten([
    styles.separator,
    {
      backgroundColor: colors.border,
    },
    style,
  ]);

  return <ContextMenuPrimitive.Separator style={separatorStyles} {...props} />;
}

function ContextMenuShortcut({ style, ...props }: TextProps) {
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
  icon: {
    marginLeft: 'auto',
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
});

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
