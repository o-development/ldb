import React, { FunctionComponent } from 'react';
import { Text } from '../../ui/text';
import { LucideIcon } from 'lucide-react-native';
import { Card } from '../../ui/card';
import { View } from 'react-native';

interface ErrorMessageResourceViewsProps {
  icon: LucideIcon;
  message: string;
}

export const ErrorMessageResourceView: FunctionComponent<
  ErrorMessageResourceViewsProps
> = ({ icon, message }) => {
  const Icon = icon;
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Card className="max-w-100 p-6 items-center gap-4 m-4">
        <Text>
          <Icon size={60} />
        </Text>
        <Text>{message}</Text>
      </Card>
    </View>
  );
};
