import React, { useCallback, useState } from 'react';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { Link } from 'lucide-react-native';
import { FunctionComponent } from 'react';
import { useViewContext } from '../useViewContext';

export const CopyLink: FunctionComponent = () => {
  const { targetUri } = useViewContext();
  const [message, setMessage] = useState('Copy Link');
  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(targetUri ?? '');
    setMessage('Copied');
    await new Promise((res) => setTimeout(res, 2000));
    setMessage('Copy Link');
  }, [targetUri]);

  return (
    <Button variant="outline" className="flex-row" onPress={onCopy} text={message} iconLeft={<Link />} />
  );
};
