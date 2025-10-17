import React, { FunctionComponent } from 'react';
import { TextStyleProps, useTextStyles } from './text';
import { LucideIcon } from 'lucide-react-native';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface IconProps extends TextStyleProps {
  icon: LucideIcon;
}

export const Icon: FunctionComponent<IconProps> = ({
  icon,
  ...textStyleProps
}) => {
  const textStyles = useTextStyles(textStyleProps);
  const IconComponent = icon;
  const iconStyle = StyleSheet.flatten(textStyles);
  const { fontSize, color, ...restStyles } = iconStyle;
  return (
    <View style={restStyles as ViewStyle}>
      <IconComponent size={fontSize} color={color} />
    </View>
  );
};
