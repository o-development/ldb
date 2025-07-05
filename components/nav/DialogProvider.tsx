// components/DialogProvider.tsx
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../ui/dialog';
import { View } from 'react-native';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { Input } from '../ui/input';

type DialogOptions =
  | { type: 'confirm'; title: string; message?: string }
  | { type: 'prompt'; title: string; message?: string; defaultValue?: string };

type DialogContextType = {
  prompt: (
    title: string,
    message?: string,
    defaultValue?: string,
  ) => Promise<null | string>;
  confirm: (title: string, message?: string) => Promise<boolean>;
  showDialog: (options: DialogOptions) => Promise<boolean | string>;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used within DialogProvider');
  return ctx;
};

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<DialogOptions | null>(null);
  const [inputValue, setInputValue] = useState('');
  const resolver = useRef<(val: boolean | string) => void>(() => {});

  const showDialog = useCallback(
    (opts: DialogOptions): Promise<boolean | string> => {
      return new Promise((resolve) => {
        resolver.current = resolve;
        setOptions(opts);
        setInputValue(opts.type === 'prompt' ? (opts.defaultValue ?? '') : '');
        setVisible(true);
      });
    },
    [],
  );

  const prompt = useCallback(
    async (
      title: string,
      message?: string,
      defaultValue?: string,
    ): Promise<null | string> => {
      return showDialog({
        type: 'prompt',
        title,
        message,
        defaultValue,
      }) as Promise<string | null>;
    },
    [showDialog],
  );

  const confirm = useCallback(
    async (title: string, message?: string): Promise<boolean> => {
      return showDialog({
        type: 'confirm',
        title,
        message,
      }) as Promise<boolean>;
    },
    [showDialog],
  );

  const handleCancel = () => {
    setVisible(false);
    resolver.current?.(options?.type === 'confirm' ? false : '');
  };

  const handleConfirm = () => {
    setVisible(false);
    resolver.current?.(options?.type === 'confirm' ? true : inputValue);
  };

  return (
    <DialogContext.Provider value={{ showDialog, prompt, confirm }}>
      {children}
      <Dialog open={visible} onOpenChange={setVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{options?.title}</DialogTitle>
            {options?.message && (
              <DialogDescription>{options.message}</DialogDescription>
            )}
          </DialogHeader>

          {options?.type === 'prompt' && (
            <View className="my-2">
              <Input
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Enter text..."
                className="border p-2 rounded"
                autoFocus
                onSubmitEditing={handleConfirm}
              />
            </View>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" onPress={handleCancel}>
                <Text>Cancel</Text>
              </Button>
            </DialogClose>
            <Button onPress={handleConfirm}>
              <Text>Ok</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};
