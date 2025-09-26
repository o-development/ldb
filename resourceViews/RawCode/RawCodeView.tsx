import { useSolidAuth } from '@ldo/solid-react';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { RawCodeEditor } from './RawCodeEditor';
import { View } from 'react-native';
import { Button } from '../../components/ui/button';
import { Notifier } from 'react-native-notifier';
import { useViewContext } from '../../components/useViewContext';
import { LoadingBar } from '../../components/common/LoadingBar';
import { Save } from 'lucide-react-native';

export const RawCodeView: FunctionComponent = () => {
  const { fetch } = useSolidAuth();
  const [content, setContent] = useState<string>('');
  const [contentType, setContentType] = useState<string>('');
  const [didEdit, setDidEdit] = useState(false);
  const { curViewConfig, targetResource } = useViewContext();
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const targetUri = targetResource?.uri;

  // Independently fetch the target resource, so we have the raw turtle
  const fetchContent = useCallback(async () => {
    if (!targetUri || curViewConfig.name !== 'rawCode') return;
    setIsFetching(true);
    const response = await fetch(targetUri);
    if (response.status !== 200) {
      Notifier.showNotification({
        title: `Could not fetch document. Recieved ${response.status}`,
      });
    }
    setContent(await response.text());
    setIsFetching(false);
    setDidEdit(false);
    setContentType(response.headers.get('content-type') ?? '');
  }, [curViewConfig.name, fetch, targetUri]);

  const submitChanges = useCallback(async () => {
    if (!targetUri) return;
    setIsSaving(true);
    const response = await fetch(targetUri, {
      method: 'put',
      headers: {
        'content-type': contentType,
      },
      body: content,
    });
    if (response.status !== 205) {
      Notifier.showNotification({
        title: `Could save document. Recieved ${response.status}`,
      });
      setIsSaving(false);
      return;
    }
    Notifier.showNotification({
      title: `Document Saved`,
    });
    await fetchContent();
    setIsSaving(false);
    setDidEdit(false);
  }, [content, contentType, fetch, fetchContent, targetUri]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <View className="flex-1 relative">
      <LoadingBar isLoading={isFetching || isSaving} />
      <RawCodeEditor
        value={content}
        onChange={(value) => {
          setDidEdit(true);
          setContent(value ?? '');
        }}
      />
      <Button
        className="absolute bottom-2 right-2 z-10"
        onPress={submitChanges}
        text="Save Changes"
        iconLeft={<Save />}
        isLoading={isSaving}
        disabled={!didEdit || isSaving}
      />
    </View>
  );
};
