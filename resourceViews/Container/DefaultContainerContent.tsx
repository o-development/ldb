import React, { FunctionComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FolderOpen } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../components/ui/text';
import { ContainerContentProps } from './ContainerView';

export const DefaultContainerContent: FunctionComponent<
  ContainerContentProps
> = ({ resources, renderResource, creatorsAvailable }) => {
  const { colors } = useTheme();

  const emptyState = (
    <View style={styles.emptyState}>
      <View style={styles.emptyStateIcon}>
        <FolderOpen size={40} color={colors.text} />
      </View>
      <Text muted>This container is empty</Text>
      {creatorsAvailable && (
        <Text muted size="sm">
          Use Create to add resources
        </Text>
      )}
    </View>
  );

  return (
    <FlatList
      data={resources}
      keyExtractor={(item) => item.uri}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={<>{emptyState}</>}
      ItemSeparatorComponent={() => (
        <View style={[styles.separator, { backgroundColor: colors.border }]} />
      )}
      renderItem={({ item }) => renderResource(item)}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 48,
  },
  emptyStateIcon: {
    opacity: 0.2,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    width: '100%',
  },
});
