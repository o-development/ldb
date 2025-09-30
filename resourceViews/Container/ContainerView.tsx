import React, { FunctionComponent, useCallback } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
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
import { Separator } from '../../components/ui/separator';
import { useDialog } from '../../components/nav/DialogProvider';
import {
  SolidContainer,
  SolidContainerSlug,
  SolidLeaf,
} from '@ldo/connected-solid';
import { Notifier } from 'react-native-notifier';
import { useViewContext } from '../../components/useViewContext';
import { useTheme } from '@react-navigation/native';
import { Icon } from '../../components/ui/icon';

export const ContainerView: FunctionComponent = () => {
  const { targetResource, navigateTo } = useViewContext();
  const { prompt } = useDialog();
  const { colors } = useTheme();

  const onCreateContainer = useCallback(async () => {
    if (targetResource?.type !== 'SolidContainer') return;
    const givenName = await prompt('Enter Container Name');
    if (!givenName) return;
    const slug = (
      givenName.endsWith('/') ? givenName : `${givenName}/`
    ) as SolidContainerSlug;
    const createResult = await targetResource.createChildIfAbsent(slug);
    if (createResult.isError)
      Notifier.showNotification({ title: createResult.message });
    if (createResult.type === 'containerReadSuccess')
      Notifier.showNotification({ title: `${slug} already exists.` });
  }, [prompt, targetResource]);

  const onCreateRdf = useCallback(async () => {
    if (targetResource?.type !== 'SolidContainer') return;
    const givenName = await prompt('Enter File Name');
    if (!givenName) return;
    const slug = (
      givenName.endsWith('.ttl') ? givenName : `${givenName}.ttl`
    ) as SolidContainerSlug;
    const createResult = await targetResource.createChildIfAbsent(slug);
    if (createResult.isError)
      Notifier.showNotification({ title: createResult.message });
    if (createResult.type === 'containerReadSuccess')
      Notifier.showNotification({ title: `${slug} already exists.` });
  }, [prompt, targetResource]);

  const onUpload = useCallback(async () => {
    if (targetResource?.type !== 'SolidContainer') return;
    // Not Implemented
    Notifier.showNotification({ title: 'Not Implemented' });
  }, [targetResource?.type]);

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
            <Button text="Create" iconLeft={Plus} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onPress={onCreateContainer}>
              <Text>Container</Text>
            </DropdownMenuItem>
            <DropdownMenuItem onPress={onCreateRdf}>
              <Text>RDF Turtle</Text>
            </DropdownMenuItem>
            <DropdownMenuItem onPress={onUpload}>
              <Text>File Upload</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>

      {/* Right Panel */}
      <View style={styles.rightPanel}>
        <FlatList
          data={targetResource.children()}
          keyExtractor={(item) => item.uri}
          renderItem={({ item, index }) => {
            const TypeIcon =
              item.type === 'SolidContainer'
                ? Folder
                : item.uri.endsWith('.ttl')
                  ? Code
                  : File;
            return (
              <>
                {index === 0 && <Separator />}
                <Pressable
                  onPress={() => navigateTo(item.uri)}
                  style={({ hovered }) => ({
                    backgroundColor: hovered ? colors.border : undefined,
                  })}
                >
                  <View style={styles.listItem}>
                    <View style={styles.listItemText}>
                      <Icon icon={TypeIcon} />
                      <Text>{item.uri.replace(targetResource.uri, '')}</Text>
                    </View>
                    <Button
                      variant="ghost"
                      style={styles.deleteButton}
                      onPress={() => onDelete(item)}
                      iconLeft={Trash}
                    />
                  </View>
                </Pressable>
                <Separator />
              </>
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
    maxWidth: 200,
    flex: 1,
    padding: 16,
  },
  rightPanel: {
    flex: 3,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
  },
  listItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    flexDirection: 'row',
    gap: 12,
  },
  deleteButton: {
    height: 24,
    padding: 0,
  },
});
