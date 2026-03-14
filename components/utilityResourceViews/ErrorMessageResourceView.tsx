import React, { FunctionComponent } from 'react';
import { Text } from '../ui/text';
import { LucideIcon } from 'lucide-react-native';
import { Card } from '../ui/card';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface ErrorMessageResourceViewsProps {
  icon: LucideIcon;
  message: string;
}

export const ErrorMessageResourceView: FunctionComponent<
  ErrorMessageResourceViewsProps
> = ({ icon, message }) => {
  const Icon = icon;
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Icon size={60} color={colors.text} style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    maxWidth: 400,
    width: '100%',
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
  },
});
