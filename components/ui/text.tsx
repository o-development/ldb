import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '../../lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

export type TextVariant = 'default' | 'h1' | 'h2' | 'h3' | 'label';
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

function Text({
  className,
  asChild = false,
  variant,
  size,
  muted,
  bold,
  ...props
}: React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
  variant?: TextVariant;
  size?: TextSize;
  muted?: boolean;
  bold?: boolean;
}) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;

  let isMuted = false;
  let isBold = false;
  let textSize: TextSize = 'base';

  if (variant) {
    switch (variant) {
      case 'h1':
        isBold = true;
        textSize = '3xl';
        break;
      case 'h2':
        isBold = true;
        textSize = '2xl';
        break;
      case 'h3':
        isBold = true;
        textSize = 'xl';
        break;
      case 'label':
        isBold = true;
        textSize = 'sm';
        break;
      case 'default':
      default:
        break;
    }
  }

  if (muted !== undefined) isMuted = muted;
  if (bold !== undefined) isBold = bold;
  if (size !== undefined) textSize = size;

  return (
    <Component
      className={cn(
        'text-base text-foreground web:select-text',
        textClass,
        isBold ? 'font-semibold' : '',
        isMuted ? 'text-muted-foreground' : '',
        `text-${textSize}`,
        className,
      )}
      {...props}
    />
  );
}

export { Text, TextClassContext };
