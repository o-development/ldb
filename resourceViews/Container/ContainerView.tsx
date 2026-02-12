import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { Text } from '../../components/ui/text';
import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../components/ui/dropdown-menu';
import { ErrorMessageResourceView } from '../../components/utilityResourceViews/ErrorMessageResourceView';
import { CircleX } from 'lucide-react-native';
import { Folder } from 'lucide-react-native';
import { Code } from 'lucide-react-native';
import { File } from 'lucide-react-native';
import { Trash } from 'lucide-react-native';
import { Plus } from 'lucide-react-native';
import { useDialog } from '../../components/nav/DialogProvider';
import { SolidContainer, SolidLeaf } from '@ldo/connected-solid';
import { Notifier } from 'react-native-notifier';
import { useViewContext } from '../../components/useViewContext';
import { useTheme } from '@react-navigation/native';
import { Icon } from '../../components/ui/icon';
import { useDataBrowserConfig } from '../../components/DataBrowserContext';
import {
  ResourceCreatorMessager,
  ResourceCreatorConfig,
} from '../../components/ResourceCreator';
import { Loader2 } from 'lucide-react-native';

export const ContainerView: FunctionComponent = () => {
  const { targetResource, navigateTo } = useViewContext();
  const { prompt } = useDialog();
  const { colors } = useTheme();
  const { resourceCreators = [] } = useDataBrowserConfig();

  const [isCreating, setIsCreating] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState<string[]>([]);

  const availableCreators = useMemo(() => {
    if (targetResource?.type !== 'SolidContainer') return [];
    return resourceCreators.filter((c) => c.canCreate(targetResource));
  }, [targetResource, resourceCreators]);

  const messager = useMemo<ResourceCreatorMessager>(
    () => ({
      prompt,
      promptFile: async () => null, // Not implemented; host can override with a file picker
      toast: (message, options) => {
        Notifier.showNotification({ title: options?.title ?? message });
      },
      loadingMessage: (message) => {
        setLoadingMessages((prev) => [...prev, message]);
      },
    }),
    [prompt],
  );

  const runCreator = useCallback(
    async (creator: ResourceCreatorConfig) => {
      if (targetResource?.type !== 'SolidContainer') return;
      setIsCreating(true);
      setLoadingMessages([]);
      try {
        await creator.create({
          container: targetResource,
          messager,
        });
      } finally {
        setIsCreating(false);
        setLoadingMessages([]);
      }
    },
    [targetResource, messager],
  );

  const onDelete = useCallback(
    async (item: SolidLeaf | SolidContainer) => {
      if (targetResource?.type !== 'SolidContainer') return;
      const createResult = await item.delete();
      if (createResult.isError)
        Notifier.showNotification({ title: createResult.message });
    },
    [targetResource?.type],
  );

  if (targetResource?.type !== 'SolidContainer') {
    return (
      <ErrorMessageResourceView
        icon={CircleX}
        message="The target resource is not a container"
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* Left Panel */}
      <View style={styles.leftPanel}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              text="Create"
              iconLeft={Plus}
              disabled={isCreating || availableCreators.length === 0}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent style={styles.createDropdownContent}>
            {availableCreators.map((creator) => (
              <DropdownMenuItem
                key={creator.name}
                onPress={() => runCreator(creator)}
              >
                <Icon icon={creator.displayIcon} />
                <Text>{creator.displayName}</Text>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {isCreating && (
          <View
            style={[styles.creatingPanel, { backgroundColor: colors.border }]}
          >
            <View style={styles.creatingHeader}>
              <Loader2 size={16} style={styles.spinner} />
              <Text>Creating…</Text>
            </View>
            {loadingMessages.length > 0 && (
              <ScrollView
                style={styles.loadingMessages}
                contentContainerStyle={styles.loadingMessagesContent}
              >
                {loadingMessages.map((msg, i) => (
                  <Text key={i} style={styles.loadingMessageItem}>
                    {msg}
                  </Text>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </View>

      {/* Right Panel */}
      <View
        style={[
          styles.rightPanel,
          { borderLeftWidth: 1, borderLeftColor: colors.border },
        ]}
      >
        <FlatList
          data={targetResource.children()}
          keyExtractor={(item) => item.uri}
          ItemSeparatorComponent={() => (
            <View
              style={[styles.listSeparator, { backgroundColor: colors.border }]}
            />
          )}
          renderItem={({ item }) => {
            const TypeIcon =
              item.type === 'SolidContainer'
                ? Folder
                : item.uri.endsWith('.ttl')
                  ? Code
                  : File;
            const displayName =
              item.uri.replace(targetResource.uri, '').replace(/\/$/, '') ||
              '/';
            return (
              <Pressable
                onPress={() => navigateTo(item.uri)}
                style={({ hovered }) => [
                  styles.listItemRow,
                  hovered && { backgroundColor: colors.border },
                ]}
              >
                <View style={styles.listItem}>
                  <View style={styles.listItemText}>
                    <Icon icon={TypeIcon} size={18} />
                    <Text
                      style={styles.listItemLabel}
                      numberOfLines={1}
                      ellipsizeMode="middle"
                    >
                      {displayName}
                    </Text>
                  </View>
                  <Button
                    variant="ghost"
                    size="icon"
                    style={styles.deleteButton}
                    onPress={() => onDelete(item)}
                    iconLeft={Trash}
                  />
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    maxWidth: 220,
    flex: 1,
    padding: 16,
    paddingRight: 12,
  },
  creatingPanel: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
  },
  creatingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  spinner: {
    opacity: 0.7,
  },
  loadingMessages: {
    maxHeight: 120,
    marginTop: 8,
  },
  loadingMessagesContent: {
    gap: 4,
  },
  loadingMessageItem: {
    fontSize: 12,
    opacity: 0.85,
  },
  rightPanel: {
    flex: 3,
  },
  createDropdownContent: {
    minWidth: 220,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  listSeparator: {
    height: 1,
    width: '100%',
  },
  listItemRow: {
    minHeight: 48,
    justifyContent: 'center',
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  listItemLabel: {
    flex: 1,
  },
  deleteButton: {
    width: 36,
    height: 36,
    padding: 0,
  },
});
