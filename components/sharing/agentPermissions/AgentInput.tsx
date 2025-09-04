import React, { useCallback, useMemo, useState } from 'react';
import { FunctionComponent } from 'react';
import { Pressable } from 'react-native';
import { useLinkQuery, useSolidAuth } from '@ldo/solid-react';
import { SolidProfileShapeType } from '../../../.ldo/profile.shapeTypes';
import { AgentInformation } from './AgentInformation';
import { InputDropdown } from '../../ui/input-dropdown';
import { useContactFilter } from './useContactFilter';
import { Plus } from '../../../lib/icons/Plus';

interface AgentInputProps {
  onAddAgent: (webId: string) => void;
  existingAgents: string[];
  className?: string;
}

// Component for dropdown items with profile data
const ContactDropdownItem: FunctionComponent<{
  webId: string;
  onSelect: (webId: string) => void;
}> = ({ webId, onSelect }) => {
  return (
    <Pressable
      className="p-2 border-b border-border last:border-b-0 hover:bg-accent active:bg-accent cursor-pointer"
      onPress={() => onSelect(webId)}
    >
      <AgentInformation webId={webId} />
    </Pressable>
  );
};

const friendsLinkQuery = {
  knows: {
    '@id': true,
    fn: true,
  },
} as const;

export const AgentInput: FunctionComponent<AgentInputProps> = ({
  onAddAgent,
  existingAgents,
  className,
}) => {
  const { session } = useSolidAuth();
  const [inputValue, setInputValue] = useState('');

  // Get current user's profile to access their "knows" list
  const currentUserProfile = useLinkQuery(
    SolidProfileShapeType,
    session.webId!,
    session.webId!,
    friendsLinkQuery,
  );

  // Filter out contacts that are already in the individual agents section
  const availableContacts = useMemo(() => {
    if (!currentUserProfile?.knows) return [];

    return currentUserProfile.knows
      .filter((contact) => !existingAgents.includes(contact['@id']))
      .map((contact) => contact['@id']);
  }, [currentUserProfile?.knows, existingAgents]);

  // Use the custom hook for filtering
  const filteredContacts = useContactFilter(
    availableContacts,
    inputValue,
    currentUserProfile?.knows ? Array.from(currentUserProfile.knows) : [],
  );

  const handleInputSubmit = useCallback(() => {
    if (inputValue.trim()) {
      // Check if it's a valid URI
      try {
        const url = new URL(inputValue);
        onAddAgent(url.toString());
        setInputValue('');
      } catch {
        // Do nothing
      }
    }
  }, [inputValue, onAddAgent]);

  const handleContactSelect = useCallback(
    (webId: string) => {
      onAddAgent(webId);
      setInputValue('');
    },
    [onAddAgent],
  );

  // Filter function for the dropdown (now just returns the filtered contacts)
  const filterContacts = useCallback(
    (_contacts: string[], _searchText: string) => {
      return filteredContacts;
    },
    [filteredContacts],
  );

  // Render function for dropdown items
  const renderContactItem = useCallback(
    (webId: string, onSelect: (webId: string) => void) => (
      <ContactDropdownItem webId={webId} onSelect={onSelect} />
    ),
    [],
  );

  return (
    <InputDropdown
      placeholder="Add Contact or WebId"
      value={inputValue}
      onChangeText={setInputValue}
      onSubmitEditing={handleInputSubmit}
      items={availableContacts}
      renderItem={renderContactItem}
      filterItems={filterContacts}
      buttonRight={{
        iconRight: <Plus />,
        onPress: handleInputSubmit,
        variant: 'secondary',
      }}
      onItemSelect={handleContactSelect}
      className={className}
    />
  );
};
