import { memo } from 'react';

import { useVisitedContactListLastVisited } from '@/api/get-contact-visited/get-contact-visited.hook';
import { ContactList } from '@/app/home/components/contact-list';
import { MainLoading } from '@/components/ui/main-loading';

export const ContactsVisited = memo(({ ids }: { ids: number[] }) => {
  const contactVisited = useVisitedContactListLastVisited(ids);

  if (ids.length > 0 && contactVisited.length === 0) {
    return <MainLoading height='11.5rem' />;
  }
  return <ContactList items={contactVisited ?? []} isFetching={false} />;
});
