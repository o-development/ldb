import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { CircleX } from 'lucide-react-native';
import { Notifier } from 'react-native-notifier';
import { SolidContainer, SolidLeaf } from '@ldo/connected-solid';
import { ErrorMessageResourceView } from '../../components/utilityResourceViews/ErrorMessageResourceView';
import { useDialog } from '../../components/nav/DialogProvider';
import { useViewContext } from '../../components/useViewContext';
import { useDataBrowserConfig } from '../../components/DataBrowserContext';
import {
  ResourceCreatorConfig,
  ResourceCreatorUtils,
} from '../../components/ResourceCreator';

// ─── Slot prop interfaces ─────────────────────────────────────────────────────

export interface ContainerLayoutProps {
  sideMenu: React.ReactNode;
  content: React.ReactNode;
}

export interface ContainerSideMenuProps {
  creators: ResourceCreatorConfig[];
  isCreating: boolean;
  loadingMessages: string[];
  onCreate: (creator: ResourceCreatorConfig) => void;
}

export interface ContainerContentProps {
  resources: (SolidLeaf | SolidContainer)[];
  renderResource: (item: SolidLeaf | SolidContainer) => React.ReactElement;
  creatorsAvailable: boolean;
}

export interface ContainerResourceItemProps {
  item: SolidLeaf | SolidContainer;
  displayName: string;
  onNavigate: () => void;
  onDelete: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface ContainerViewProps {
  Layout: React.ComponentType<ContainerLayoutProps>;
  SideMenu: React.ComponentType<ContainerSideMenuProps>;
  Content: React.ComponentType<ContainerContentProps>;
  ResourceItem: React.ComponentType<ContainerResourceItemProps>;
}

export const ContainerView: FunctionComponent<ContainerViewProps> = ({
  Layout,
  SideMenu,
  Content,
  ResourceItem,
}) => {
  const { targetResource, navigateTo } = useViewContext();
  const { prompt } = useDialog();
  const { resourceCreators = [] } = useDataBrowserConfig();

  const [isCreating, setIsCreating] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState<string[]>([]);

  const availableCreators = useMemo(() => {
    if (targetResource?.type !== 'SolidContainer') return [];
    return resourceCreators.filter((c) => c.canCreate(targetResource));
  }, [targetResource, resourceCreators]);

  const createUtils = useMemo<ResourceCreatorUtils>(
    () => ({
      prompt,
      promptFile: async (options) => {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: true,
          type: options?.accept ?? '*/*',
        });
        if (result.canceled) return null;
        const asset = result.assets[0];
        if (Platform.OS === 'web' && 'file' in asset && asset.file) {
          return asset.file;
        }
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        const mimeType =
          asset.mimeType ?? blob.type ?? 'application/octet-stream';
        return Object.assign(blob, {
          name: asset.name,
          type: mimeType,
        }) as File;
      },
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
        await creator.create({ container: targetResource, createUtils });
      } finally {
        setIsCreating(false);
        setLoadingMessages([]);
      }
    },
    [targetResource, createUtils],
  );

  const onDelete = useCallback(
    async (item: SolidLeaf | SolidContainer) => {
      if (targetResource?.type !== 'SolidContainer') return;
      const result = await item.delete();
      if (result.isError) Notifier.showNotification({ title: result.message });
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

  const renderResource = (item: SolidLeaf | SolidContainer) => {
    const displayName =
      item.uri.replace(targetResource.uri, '').replace(/\/$/, '') || '/';
    return (
      <ResourceItem
        key={item.uri}
        item={item}
        displayName={displayName}
        onNavigate={() => navigateTo(item.uri)}
        onDelete={() => onDelete(item)}
      />
    );
  };

  return (
    <Layout
      sideMenu={
        <SideMenu
          creators={availableCreators}
          isCreating={isCreating}
          loadingMessages={loadingMessages}
          onCreate={runCreator}
        />
      }
      content={
        <Content
          resources={targetResource.children()}
          renderResource={renderResource}
          creatorsAvailable={availableCreators.length > 0}
        />
      }
    />
  );
};
