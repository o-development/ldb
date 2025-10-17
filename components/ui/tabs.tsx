import * as TabsPrimitive from '@rn-primitives/tabs';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextStyleContext } from '../ui/text';

const Tabs = TabsPrimitive.Root;

function TabsList({
  style,
  ...props
}: TabsPrimitive.ListProps & {
  ref?: React.RefObject<TabsPrimitive.ListRef>;
}) {
  return (
    <TabsPrimitive.List
      style={StyleSheet.flatten([styles.list, style])}
      {...props}
    />
  );
}

function TabsTrigger({
  style,
  ...props
}: TabsPrimitive.TriggerProps & {
  ref?: React.RefObject<TabsPrimitive.TriggerRef>;
}) {
  const { value } = TabsPrimitive.useRootContext();
  const isActive = props.value === value;

  const triggerStyle = StyleSheet.flatten([
    styles.trigger,
    isActive && styles.triggerActive,
    props.disabled && styles.triggerDisabled,
    style,
  ]);

  const textStyle = isActive
    ? StyleSheet.flatten([styles.triggerText, styles.triggerTextActive])
    : styles.triggerText;

  return (
    <TextStyleContext.Provider value={{ style: textStyle }}>
      <TabsPrimitive.Trigger style={triggerStyle} {...props} />
    </TextStyleContext.Provider>
  );
}

function TabsContent({
  style,
  ...props
}: TabsPrimitive.ContentProps & {
  ref?: React.RefObject<TabsPrimitive.ContentRef>;
}) {
  return <TabsPrimitive.Content style={style} {...props} />;
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: 'hsl(var(--muted))',
    padding: 4,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: '500',
    color: 'hsl(var(--muted-foreground))',
  },
  triggerActive: {
    backgroundColor: 'hsl(var(--background))',
    shadowColor: 'hsl(var(--foreground))',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    color: 'hsl(var(--foreground))',
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'hsl(var(--muted-foreground))',
  },
  triggerTextActive: {
    color: 'hsl(var(--foreground))',
  },
});

export { Tabs, TabsContent, TabsList, TabsTrigger };
