import React, { useEffect, useMemo } from 'react';
import { FunctionComponent, useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Input } from '../../ui/input';
import { ChevronRight } from 'lucide-react-native';
import { ChevronsRight } from 'lucide-react-native';
import { TextCursorInput } from 'lucide-react-native';
import { RefreshCw } from 'lucide-react-native';
import { ArrowRight } from 'lucide-react-native';
import { Button } from '../../../components/ui/button';
import { Text } from '../../ui/text';
import { useTargetResource } from '../../TargetResourceProvider';
import { useTheme } from '@react-navigation/native';
import { Icon } from '../../../components/ui/icon';

export const AddressBox: FunctionComponent = () => {
  const [isTextMode, setIsTextMode] = useState(false);
  const { targetUri, refresh, navigateTo, targetResource } =
    useTargetResource();
  const { colors } = useTheme();

  const [textBoxValue, setTextBoxValue] = useState(targetUri ?? '');
  useEffect(() => {
    setTextBoxValue(targetUri ?? '');
  }, [targetUri]);

  const breadcrumbInfo = useMemo<{ name: string; uri: string }[]>(() => {
    if (!targetUri) return [];
    try {
      const uri = new URL(targetUri);
      const pathSplit = uri.pathname.split('/').filter((val) => val !== '');
      const endsInSlash = uri.pathname.endsWith('/');

      let curUri = `${uri.origin}/`;
      const info: { name: string; uri: string }[] = [
        {
          name: uri.host,
          uri: curUri,
        },
      ];
      pathSplit.forEach((name, index) => {
        curUri +=
          index === pathSplit.length - 1 && !endsInSlash ? name : `${name}/`;
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
    <View style={styles.container}>
      <Input
        style={[styles.input, { backgroundColor: colors.border }]}
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
        style={styles.leftButton}
        onPress={() => setIsTextMode((val) => !val)}
        iconLeft={isTextMode ? ChevronsRight : TextCursorInput}
        textStyle={styles.buttonText}
      />
      <View style={styles.breadcrumbContainer} pointerEvents="none">
        {!isTextMode &&
          breadcrumbInfo.map((item, index) => (
            <View style={styles.breadcrumbItem} key={item.uri}>
              <TouchableOpacity onPress={() => navigateTo(item.uri)}>
                <View pointerEvents="auto">
                  <Text style={styles.breadcrumbText} size="sm">
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
              {index !== breadcrumbInfo.length - 1 ? (
                <Icon icon={ChevronRight} style={styles.chevron} />
              ) : (
                <View style={styles.spacer} />
              )}
            </View>
          ))}
      </View>
      {(() => {
        const shouldRefresh = targetUri === textBoxValue || !isTextMode;
        return (
          <Button
            variant="secondary"
            style={styles.rightButton}
            onPressIn={() => {
              if (shouldRefresh) {
                refresh();
              } else if (textBoxValue) {
                navigateTo(textBoxValue);
              }
            }}
            iconLeft={
              shouldRefresh || targetResource?.isLoading()
                ? RefreshCw
                : ArrowRight
            }
            textStyle={styles.buttonText}
          />
        );
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 40,
    height: 40,
    fontSize: 14,
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    width: 40,
    height: 40,
  },
  rightButton: {
    position: 'absolute',
    right: 0,
    width: 40,
    height: 40,
  },
  breadcrumbContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  breadcrumbItem: {
    flexDirection: 'row',
  },
  chevron: {
    width: 16,
    height: 16,
    marginRight: 2,
    color: 'hsl(var(--muted-foreground))',
  },
  spacer: {
    width: 8,
  },
  breadcrumbText: {
    marginRight: 2,
    textDecorationLine: 'underline',
  },
  buttonText: {
    fontSize: 20,
  },
});
