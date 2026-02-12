import React, { FunctionComponent, useMemo, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useResource } from '@ldo/solid-react';
import { useViewContext } from '../../components/useViewContext';
import { Text } from '../../components/ui/text';
import { LoadingBar } from '../../components/common/LoadingBar';
import { SolidLeaf } from '@ldo/connected-solid';

/**
 * Displays binary image resources using authenticated fetch.
 * Uses useResource to load the image (so the request is authorized), then
 * creates a blob URL for display (see LDO tutorial step 11:
 * https://ldo.js.org/latest/guides/solid_react/#11-displaying-the-post).
 */
export const ImageView: FunctionComponent = () => {
  const { targetUri } = useViewContext();
  const imageResource = useResource(targetUri) as SolidLeaf | undefined;

  const blobUrl = useMemo(() => {
    if (!imageResource?.isBinary()) return undefined;
    const blob = imageResource.getBlob();
    if (!blob || !blob.type.startsWith('image/')) return undefined;
    return URL.createObjectURL(blob);
  }, [imageResource]);

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  if (!targetUri || !imageResource) return null;

  if (imageResource.isLoading?.() ?? imageResource.status?.type === 'unfetched') {
    return (
      <View style={styles.center}>
        <LoadingBar isLoading />
        <Text>Loading image…</Text>
      </View>
    );
  }

  if (imageResource.status?.isError) {
    return (
      <View style={styles.center}>
        <Text>{imageResource.status.message ?? 'Failed to load image.'}</Text>
      </View>
    );
  }

  if (!imageResource.isBinary()) {
    return (
      <View style={styles.center}>
        <Text>This resource is not a binary image.</Text>
      </View>
    );
  }

  const blob = imageResource.getBlob();
  if (!blob || !blob.type.startsWith('image/')) {
    return (
      <View style={styles.center}>
        <Text>This binary resource is not an image ({blob?.type ?? 'unknown type'}).</Text>
      </View>
    );
  }

  if (!blobUrl) {
    return (
      <View style={styles.center}>
        <Text>Unable to display image.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: blobUrl }}
        style={styles.image}
        resizeMode="contain"
        accessibilityLabel="Image resource"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: '100%',
    minHeight: 200,
    flex: 1,
  },
});
