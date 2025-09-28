import * as SelectPrimitive from '@rn-primitives/select';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { ChevronDown } from 'lucide-react-native';
import { ChevronUp } from 'lucide-react-native';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

function SelectTrigger({
  ref,
  style,
  children,
  ...props
}: SelectPrimitive.TriggerProps & {
  ref?: React.RefObject<SelectPrimitive.TriggerRef>;
  children?: React.ReactNode;
}) {
  const triggerStyle = StyleSheet.flatten([
    styles.trigger,
    props.disabled && styles.triggerDisabled,
    style,
  ]);

  return (
    <SelectPrimitive.Trigger ref={ref} style={triggerStyle} {...props}>
      {children}
      <ChevronDown size={16} aria-hidden={true} style={styles.chevron} />
    </SelectPrimitive.Trigger>
  );
}

/**
 * Platform: WEB ONLY
 */
function SelectScrollUpButton({
  style,
  ...props
}: SelectPrimitive.ScrollUpButtonProps) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollUpButton
      style={StyleSheet.flatten([styles.scrollButton, style])}
      {...props}
    >
      <ChevronUp size={14} style={styles.chevron} />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * Platform: WEB ONLY
 */
function SelectScrollDownButton({
  style,
  ...props
}: SelectPrimitive.ScrollDownButtonProps) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollDownButton
      style={StyleSheet.flatten([styles.scrollButton, style])}
      {...props}
    >
      <ChevronDown size={14} style={styles.chevron} />
    </SelectPrimitive.ScrollDownButton>
  );
}

function SelectContent({
  style,
  children,
  position = 'popper',
  portalHost,
  ...props
}: SelectPrimitive.ContentProps & {
  ref?: React.RefObject<SelectPrimitive.ContentRef>;
  style?: any;
  portalHost?: string;
}) {
  const { open } = SelectPrimitive.useRootContext();

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      >
        <Animated.View
          style={{ zIndex: 50 }}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <SelectPrimitive.Content
            style={StyleSheet.flatten([styles.content, style])}
            position={position}
            {...props}
          >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              style={StyleSheet.flatten([
                styles.viewport,
                position === 'popper' && {
                  height: 'var(--radix-select-trigger-height)',
                  width: '100%',
                  minWidth: 'var(--radix-select-trigger-width)',
                },
              ])}
            >
              {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </SelectPrimitive.Content>
        </Animated.View>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  style,
  ...props
}: SelectPrimitive.LabelProps & {
  ref?: React.RefObject<SelectPrimitive.LabelRef>;
}) {
  return (
    <SelectPrimitive.Label
      style={StyleSheet.flatten([styles.label, style])}
      {...props}
    />
  );
}

function SelectItem({
  style,
  ...props
}: SelectPrimitive.ItemProps & {
  ref?: React.RefObject<SelectPrimitive.ItemRef>;
}) {
  const itemStyle = StyleSheet.flatten([
    styles.item,
    props.disabled && styles.itemDisabled,
    style,
  ]);

  return (
    <SelectPrimitive.Item style={itemStyle} {...props}>
      <View style={styles.itemIndicator}>
        <SelectPrimitive.ItemIndicator>
          <Check
            size={16}
            strokeWidth={3}
            color="hsl(var(--popover-foreground))"
          />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText style={styles.itemText} />
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  style,
  ...props
}: SelectPrimitive.SeparatorProps & {
  ref?: React.RefObject<SelectPrimitive.SeparatorRef>;
}) {
  return (
    <SelectPrimitive.Separator
      style={StyleSheet.flatten([styles.separator, style])}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'hsl(var(--input))',
    backgroundColor: 'hsl(var(--background))',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: 'hsl(var(--muted-foreground))',
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  chevron: {
    color: 'hsl(var(--foreground))',
    opacity: 0.5,
  },
  scrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  content: {
    position: 'relative',
    zIndex: 50,
    maxHeight: 384,
    minWidth: 128,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'hsl(var(--border))',
    backgroundColor: 'hsl(var(--popover))',
    shadowColor: 'hsl(var(--foreground))',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  viewport: {
    padding: 4,
  },
  label: {
    paddingVertical: 6,
    paddingLeft: 32,
    paddingRight: 8,
    color: 'hsl(var(--popover-foreground))',
    fontSize: 14,
    fontWeight: '600',
  },
  item: {
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderRadius: 2,
    paddingVertical: 6,
    paddingLeft: 32,
    paddingRight: 8,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemIndicator: {
    position: 'absolute',
    left: 8,
    flexDirection: 'row',
    height: 14,
    width: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 14,
    color: 'hsl(var(--popover-foreground))',
  },
  separator: {
    marginHorizontal: -4,
    marginVertical: 4,
    height: 1,
    backgroundColor: 'hsl(var(--muted))',
  },
});

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
