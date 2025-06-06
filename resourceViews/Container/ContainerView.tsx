import React, { FunctionComponent } from 'react';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '~/components/ui/dropdown-menu';
import { useTargetResource } from '~/components/TargetResourceProvider';
import { ErrorMessageResourceView } from '~/components/nav/utilityResourceViews/ErrorMessageResourceView';
import { CircleX } from '~/lib/icons/CircleX';
import { Folder } from '~/lib/icons/Folder';
import { Code } from '~/lib/icons/Code';
import { File } from '~/lib/icons/File';
import { Separator } from '~/components/ui/separator';

export const ContainerView: FunctionComponent = () => {
  const { targetResource, navigateTo } = useTargetResource();

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
            <DropdownMenuItem>Container</DropdownMenuItem>
            <DropdownMenuItem>RDF Turtle</DropdownMenuItem>
            <DropdownMenuItem>File Upload</DropdownMenuItem>
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
                  <View className="p-4 hover:bg-secondary rounded-sm cursor-pointer">
                    <Text className="flex flex-row gap-3">
                      <Icon />
                      {item.uri.replace(targetResource.uri, '')}
                    </Text>
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
