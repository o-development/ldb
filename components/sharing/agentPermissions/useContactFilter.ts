import { useMemo } from 'react';

export function useContactFilter(
  webIds: string[],
  searchText: string,
  contactsWithNames: Array<{ '@id': string; fn?: string }>,
) {
  // Filter contacts based on search text (URI and name)
  const filteredContacts = useMemo(() => {
    if (!searchText.trim()) return webIds;

    const lowerInput = searchText.toLowerCase();

    return webIds.filter((webId) => {
      // Check if the URI matches
      if (webId.toLowerCase().includes(lowerInput)) {
        return true;
      }

      // Check if the name matches
      const contact = contactsWithNames.find((c) => c['@id'] === webId);
      if (
        contact &&
        contact.fn &&
        contact.fn.toLowerCase().includes(lowerInput)
      ) {
        return true;
      }

      return false;
    });
  }, [webIds, searchText, contactsWithNames]);

  return filteredContacts;
}
