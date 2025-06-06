// components/DialogProvider.tsx
import React, { createContext, useContext, useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '~/components/ui/alert-dialog';
import { Text, TextInput, View } from 'react-native';

type DialogOptions =
  | { type: 'confirm'; title: string; message?: string }
  | { type: 'prompt'; title: string; message?: string; defaultValue?: string };

type DialogContextType = {
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
  const resolver = useRef<(val: boolean | string) => void>();

  const showDialog = (opts: DialogOptions): Promise<boolean | string> => {
    return new Promise((resolve) => {
      resolver.current = resolve;
      setOptions(opts);
      setInputValue(opts.type === 'prompt' ? (opts.defaultValue ?? '') : '');
      setVisible(true);
    });
  };

  const handleCancel = () => {
    setVisible(false);
    resolver.current?.(options?.type === 'confirm' ? false : '');
  };

  const handleConfirm = () => {
    setVisible(false);
    resolver.current?.(options?.type === 'confirm' ? true : inputValue);
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <AlertDialog open={visible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text className="text-lg font-bold">{options?.title}</Text>
            {options?.message && <Text>{options.message}</Text>}
          </AlertDialogHeader>
          {options?.type === 'prompt' && (
            <View className="my-2">
              <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Enter text..."
                className="border p-2 rounded"
              />
            </View>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onPress={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onPress={handleConfirm}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  );
};
