import React, { FunctionComponent, useCallback } from 'react';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Text } from '../../components/ui/text';
import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../components/ui/dropdown-menu';
import { useTargetResource } from '../../components/TargetResourceProvider';
import { ErrorMessageResourceView } from '../../components/nav/utilityResourceViews/ErrorMessageResourceView';
import { CircleX } from '../../lib/icons/CircleX';
import { Folder } from '../../lib/icons/Folder';
import { Code } from '../../lib/icons/Code';
import { File } from '../../lib/icons/File';
import { Trash } from '../../lib/icons/Trash';
import { Separator } from '../../components/ui/separator';
import { useDialog } from '../../components/nav/DialogProvider';
import {
  SolidContainer,
  SolidContainerSlug,
  SolidLeaf,
} from '@ldo/connected-solid';
import { Notifier } from 'react-native-notifier';

export const ContainerView: FunctionComponent = () => {
  const { targetResource, navigateTo } = useTargetResource();
  const { prompt } = useDialog();

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
    <View className="flex-1 flex-row">
      {/* Left Panel */}
      <View className="max-w-[200px] flex-1 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Text>Create</Text>
            </Button>
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
      <View className="flex-[3] py-4 pr-4">
        <FlatList
          data={targetResource.children()}
          keyExtractor={(item) => item.uri}
          renderItem={({ item, index }) => {
            const Icon =
              item.type === 'SolidContainer'
                ? Folder
                : item.uri.endsWith('.ttl')
                  ? Code
                  : File;
            return (
              <>
                {index === 0 && <Separator />}
                <TouchableWithoutFeedback onPress={() => navigateTo(item.uri)}>
                  <View className="flex flex-row p-4 hover:bg-secondary rounded-sm cursor-pointer justify-between">
                    <Text className="flex flex-row gap-3">
                      <Icon />
                      {item.uri.replace(targetResource.uri, '')}
                    </Text>
                    <Button
                      variant="ghost"
                      className="h-6 p-0"
                      onPress={() => onDelete(item)}
                    >
                      <Text>
                        <Trash size={20} />
                      </Text>
                    </Button>
                  </View>
                </TouchableWithoutFeedback>
                <Separator />
              </>
            );
          }}
        />
      </View>
    </View>
  );
};
