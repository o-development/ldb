import React, { FunctionComponent, useCallback } from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import {
  Folder,
  Code,
  File,
  MoreHorizontal,
  Download,
  Share2,
  Trash,
} from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { useSolidAuth } from '@ldo/solid-react';
import { Notifier } from 'react-native-notifier';
import { Text } from '../../components/ui/text';
import { Button } from '../../components/ui/button';
import { Icon } from '../../components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../../components/ui/dropdown-menu';
import { useSharingModal } from '../../components/sharing/SharingModal';
import { ContainerResourceItemProps } from './ContainerView';

export const DefaultContainerResourceItem: FunctionComponent<
  ContainerResourceItemProps
> = ({ item, displayName, onNavigate, onDelete }) => {
  const { colors } = useTheme();
  const { fetch } = useSolidAuth();
  const { openSharingModal } = useSharingModal();

  const TypeIcon =
    item.type === 'SolidContainer'
      ? Folder
      : item.uri.endsWith('.ttl')
        ? Code
        : File;

  const handleDownload = useCallback(async () => {
    if (item.type !== 'SolidLeaf') return;
    if (Platform.OS !== 'web') {
      Notifier.showNotification({ title: 'Download is only available on web' });
      return;
    }
    const response = await fetch(item.uri);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = displayName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [item, displayName, fetch]);

  const handleShare = useCallback(() => {
    if (item.type === 'SolidLeaf' || item.type === 'SolidContainer') {
      openSharingModal(item);
    }
  }, [item, openSharingModal]);

  return (
    <Pressable
      onPress={onNavigate}
      style={({ hovered }) => [
        styles.row,
        hovered && { backgroundColor: colors.border },
      ]}
    >
      <View style={styles.inner}>
        <View style={styles.label}>
          <Icon icon={TypeIcon} size={18} />
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="middle">
            {displayName}
          </Text>
        </View>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              style={styles.actionButton}
              iconLeft={MoreHorizontal}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={4}>
            {item.type === 'SolidLeaf' && (
              <DropdownMenuItem onPress={handleDownload}>
                <Icon icon={Download} />
                <Text>Download</Text>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onPress={handleShare}>
              <Icon icon={Share2} />
              <Text>Share</Text>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onPress={onDelete}>
              <Icon icon={Trash} />
              <Text style={{ color: colors.notification }}>Delete</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    minHeight: 48,
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  name: {
    flex: 1,
  },
  actionButton: {
    width: 36,
    height: 36,
    padding: 0,
  },
});
