import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { getContact } from '@/api/get-contact/get-contact.api';
import { contactKeys, useGetContactData } from '@/api/get-contact/get-contact.hook';
import { Contact } from '@/api/get-contact/get-contact.types';

export function useVisitedContactListLastVisited(ids: number[]) {
  const queryClient = useQueryClient();
  const [lastVisited, setLastVisited] = useState<Contact[]>([]);

  const existingContacts = useGetContactData(ids);

  useEffect(() => {
    // put the contacts that are already in the cache to the last visited
    setLastVisited((prev) => {
      return ids
        .filter((id) => existingContacts.find((contact) => contact && contact?.data?.id === id))
        .map((id) => existingContacts.find((contact) => contact && contact?.data?.id === id)!.data);
    });
    // fetch the contacts that are not in the cache
    const fetchContacts = Promise.allSettled(
      ids
        .filter((id) => !existingContacts.find((contact) => contact && contact?.data?.id === id))
        .map((id) => {
          return queryClient.ensureQueryData({
            queryKey: contactKeys.detail(id),
            queryFn: ({ signal }) => getContact(id, { signal }),
          });
        })
    );
    // put the contacts that are fetched to the last visited
    fetchContacts.then((results) => {
      const lastVisited = results
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value.data);

      const contacts = ids
        .map((id) => {
          if (existingContacts.find((contact) => contact && contact?.data?.id === id)) {
            return existingContacts.find((contact) => contact && contact?.data?.id === id)?.data;
          }
          if (lastVisited.find((contact) => contact?.id === id)) {
            return lastVisited.find((contact) => contact?.id === id)!;
          }
          return undefined;
        })
        .filter((contact) => contact !== undefined);
      setLastVisited(contacts);
    });
  }, [ids, existingContacts, queryClient]);

  return lastVisited;
}
