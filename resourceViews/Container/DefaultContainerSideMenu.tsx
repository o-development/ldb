import React, { FunctionComponent } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Plus, Loader2, Home, User } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { useSolidAuth, useRootContainerFor } from '@ldo/solid-react';
import { Text } from '../../components/ui/text';
import { Button } from '../../components/ui/button';
import { Icon } from '../../components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../components/ui/dropdown-menu';
import { ContainerSideMenuProps } from './ContainerView';
import { useTargetResource } from '../../components/TargetResourceProvider';

export const DefaultContainerSideMenu: FunctionComponent<
  ContainerSideMenuProps
> = ({ creators, isCreating, loadingMessages, onCreate }) => {
  const { colors } = useTheme();
  const { session } = useSolidAuth();
  const storageRoot = useRootContainerFor(session.webId as any);
  const { navigateTo } = useTargetResource();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            text="Create"
            iconLeft={Plus}
            disabled={isCreating || creators.length === 0}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={4}
          style={styles.dropdownContent}
        >
          {creators.map((creator) => (
            <DropdownMenuItem
              key={creator.name}
              onPress={() => onCreate(creator)}
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

      {session.isActive && (
        <>
          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />
          <View style={styles.navSection}>
            {storageRoot && (
              <Button
                variant="ghost"
                iconLeft={Home}
                text="Home"
                style={styles.navItem}
                onPress={() => navigateTo(storageRoot.uri)}
              />
            )}
            <Button
              variant="ghost"
              iconLeft={User}
              text="Profile"
              style={styles.navItem}
              onPress={() => navigateTo(session.webId ?? '')}
            />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  navSection: {
    gap: 2,
    marginBottom: 4,
  },
  navItem: {
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  separator: {
    height: 1,
    marginBottom: 12,
  },
  dropdownContent: {
    minWidth: 220,
    paddingVertical: 6,
    paddingHorizontal: 6,
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
});
