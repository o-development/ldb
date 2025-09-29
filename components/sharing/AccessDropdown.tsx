import React, { useCallback, useMemo } from 'react';
import { AccessModeList } from '@ldo/connected-solid';
import { FunctionComponent } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Text } from '../ui/text';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { ChevronDown } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { Icon } from '../ui/icon';

interface AccessDropdownProps {
  value: AccessModeList;
  onChange: (newAccess: AccessModeList) => void;
}

export const AccessDropdown: FunctionComponent<AccessDropdownProps> = ({
  value,
  onChange,
}) => {
  const accessDescription = useMemo(() => {
    if (value.read && value.append && value.write && value.control) {
      return 'Owner';
    } else if (value.read && value.append && value.write && !value.control) {
      return 'Editor';
    } else if (value.read && value.append && !value.write && !value.control) {
      return 'Contributor';
    } else if (value.read && !value.append && !value.write && !value.control) {
      return 'Viewer';
    } else if (!value.read && !value.append && !value.write && !value.control) {
      return 'No Access';
    } else {
      return 'Custom';
    }
  }, [value.append, value.control, value.read, value.write]);

  const onChangeAccessMode = useCallback(
    (field: string, newValue: boolean) => {
      onChange({
        ...value,
        [field]: newValue,
      });
    },
    [onChange, value],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild style={styles.button}>
        <Button variant="outline">
          <Text>{accessDescription}</Text>
          <Icon icon={ChevronDown} style={styles.buttonChevron} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Permissions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {['read', 'append', 'write', 'control'].map((accessModeName) => (
            <DropdownMenuItem
              key={accessModeName}
              closeOnPress={false}
              onPress={() =>
                onChangeAccessMode(
                  accessModeName,
                  !value[accessModeName as keyof AccessModeList],
                )
              }
            >
              <Checkbox
                checked={value[accessModeName as keyof AccessModeList]}
                onCheckedChange={(newVal) =>
                  onChangeAccessMode(accessModeName, newVal)
                }
              />
              <Text>
                {accessModeName.charAt(0).toUpperCase() +
                  accessModeName.slice(1)}
              </Text>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    width: 130,
    justifyContent: 'space-between',
    gap: 0,
  },
  buttonChevron: {
    fontSize: 14,
  },
});
