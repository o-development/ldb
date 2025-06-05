import React, { useEffect, useMemo } from 'react';
import { FunctionComponent, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Input } from '~/components/ui/input';
import { ChevronRight } from '~/lib/icons/ChevronRight';
import { ChevronsRight } from '~/lib/icons/ChevronsRight';
import { TextCursorInput } from '~/lib/icons/TextCursorInput';
import { RefreshCw } from '~/lib/icons/RefreshCw';
import { ArrowRight } from '~/lib/icons/ArrowRight';
import { Button } from '~/components/ui/button';
import { Text } from '../../ui/text';
import { useTargetResource } from '../../TargetResourceProvider';

export const AddressBox: FunctionComponent = () => {
  const [isTextMode, setIsTextMode] = useState(false);
  const { targetUri, refresh, navigateTo, targetResource } =
    useTargetResource();

  const [textBoxValue, setTextBoxValue] = useState(targetUri ?? '');
  useEffect(() => {
    setTextBoxValue(targetUri ?? '');
  }, [targetUri]);

  const breadcrumbInfo = useMemo<{ name: string; uri: string }[]>(() => {
    if (!targetUri) return [];
    try {
      const uri = new URL(targetUri);
      const pathSplit = uri.pathname.split('/').filter((val) => val !== '');

      let curUri = uri.origin;
      const info: { name: string; uri: string }[] = [
        {
          name: uri.host,
          uri: curUri,
        },
      ];
      pathSplit.forEach((name) => {
        curUri += `/${name}`;
        info.push({
          uri: curUri,
          name,
        });
      });

      return info;
    } catch {
      return [];
    }
  }, [targetUri]);

  return (
    <View className="flex-1">
      <Input
        className="flex-1 bg-secondary web:py-2.5 border-none pl-10 pr-10 h-[40px] text-sm web:focus-visible:ring-0 web:focus-visible:ring-transparent web:focus-visible:ring-offset-0 web:focus:outline-none web:outline-none"
        onFocus={() => setIsTextMode(true)}
        onBlur={() => setTimeout(() => setIsTextMode(false), 100)}
        onChangeText={setTextBoxValue}
        value={isTextMode ? textBoxValue : ''}
        onSubmitEditing={() => {
          if (textBoxValue) {
            navigateTo(textBoxValue);
          }
        }}
      />
      <Button
        variant="secondary"
        className="absolute left-0 w-10 h-10"
        onPress={() => setIsTextMode((val) => !val)}
      >
        <Text>
          {isTextMode ? (
            <ChevronsRight size={20} />
          ) : (
            <TextCursorInput size={20} />
          )}
        </Text>
      </Button>
      {(() => {
        const shouldRefresh = targetUri === textBoxValue || !isTextMode;
        return (
          <Button
            variant="secondary"
            className="absolute right-0 w-10 h-10"
            onPressIn={() => {
              if (shouldRefresh) {
                refresh();
              } else if (textBoxValue) {
                navigateTo(textBoxValue);
              }
            }}
          >
            <Text className={targetResource?.isLoading() ? 'animate-spin' : ''}>
              {shouldRefresh || targetResource?.isLoading() ? (
                <RefreshCw size={20} />
              ) : (
                <ArrowRight size={20} />
              )}
            </Text>
          </Button>
        );
      })()}
      <View
        className="absolute top-0 left-0 right-0 bottom-0 flex-row-reverse items-center ml-10 mr-10 overflow-x-auto scrollbar-hide [direction:rtl]"
        pointerEvents="none"
      >
        {!isTextMode &&
          breadcrumbInfo.map((item, index) => (
            <View className="flex-row" key={item.uri}>
              {index !== breadcrumbInfo.length - 1 ? (
                <ChevronRight className="w-4 h-4 mr-0.5 mt-0.5 text-gray-500" />
              ) : (
                <View className="w-2" />
              )}
              <TouchableOpacity onPress={() => navigateTo(item.uri)}>
                <View pointerEvents="auto">
                  <Text className="mr-0.5 underline text-sm">{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </View>
  );
};
