import React from 'react';
import { FunctionComponent, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Input } from '~/components/ui/input';
import { ChevronRight } from '~/lib/icons/ChevronRight';
import { ChevronsRight } from '~/lib/icons/ChevronsRight';
import { TextCursorInput } from '~/lib/icons/TextCursorInput';
import { RefreshCw } from '~/lib/icons/RefreshCw';
import { Button } from '~/components/ui/button';
import { Text } from '../ui/text';

const url = 'https://noat.io/jackson/chats/chat1.ttl';
const split = ['noat.io', 'jackson', 'chats', 'chat1'];

export const AddressBox: FunctionComponent = () => {
  const [isTextMode, setIsTextMode] = useState(false);

  return (
    <View className="flex-1">
      <Input
        className="flex-1 bg-secondary web:py-2.5 border-none pl-10 pr-10 h-[40px] text-sm web:focus-visible:ring-0 web:focus-visible:ring-transparent web:focus-visible:ring-offset-0 web:focus:outline-none web:outline-none"
        onFocus={() => setIsTextMode(true)}
        onBlur={() => setIsTextMode(false)}
        value={isTextMode ? url : ''}
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
      <Button
        variant="secondary"
        className="absolute right-0 w-10 h-10"
        onPress={() => console.log('go!')}
      >
        <Text>
          <RefreshCw size={20} />
        </Text>
      </Button>
      <View
        className="absolute top-0 left-0 right-0 bottom-0 flex-row items-center ml-10 mr-10 overflow-x-auto scrollbar-hide"
        pointerEvents="none"
      >
        {!isTextMode &&
          split.map((item, index) => (
            <View className="flex-row" key={item}>
              <TouchableOpacity>
                <View pointerEvents="auto">
                  <Text className="mr-0.5 underline text-sm">{item}</Text>
                </View>
              </TouchableOpacity>
              {index !== split.length - 1 ? (
                <ChevronRight className="w-4 h-4 mr-0.5 mt-0.5 text-gray-500" />
              ) : (
                <View className="w-2" />
              )}
            </View>
          ))}
      </View>
    </View>
  );
};
