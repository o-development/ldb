import React, { useCallback, useState } from 'react';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { Link } from '../../lib/icons/Link';
import { FunctionComponent } from 'react';
import { useViewContext } from '../useViewContext';

export const CopyLink: FunctionComponent = () => {
  const { targetUri } = useViewContext();
  const [message, setMessage] = useState('Copy Link');
  const onCopy = useCallback(async () => {
    console.log(targetUri);
    await navigator.clipboard.writeText(targetUri ?? '');
    setMessage('Copied');
    await new Promise((res) => setTimeout(res, 2000));
    setMessage('Copy Link');
  }, [targetUri]);

  return (
    <Button variant="outline" className="flex-row" onPress={onCopy}>
      <Text className="mr-1">
        <Link size={20} />
      </Text>
      <Text>{message}</Text>
    </Button>
  );
};
