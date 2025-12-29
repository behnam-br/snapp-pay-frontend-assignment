import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useContact } from '@/api/get-contact/get-contact.hook';
import { ContactDetail } from '@/app/contact/components/contact-detail';
import { AxiosErrorMessage } from '@/components/ui/axios-error-message';
import { MainLoading } from '@/components/ui/main-loading';
import { AxiosErrorCodeKeys } from '@/lib/axios/utils/api-types';

export function ContactPage() {
  const { id } = useParams();
  useVisitedContactIds(id);
  const contact = useContact(Number(id));

  console.log(contact.data?.data);

  if (contact.isPending) {
    return <MainLoading />;
  }
  if (contact.isError) {
    return (
      <AxiosErrorMessage code={AxiosErrorCodeKeys.API_ERROR} onReload={() => contact.refetch()} />
    );
  }
  if (contact.data?.data) {
    return <ContactDetail contact={contact.data.data} />;
  }
  return <></>;
}

function useVisitedContactIds(id?: string) {
  useEffect(() => {
    if (!id) return;
    const storedContactIds: string[] = JSON.parse(
      localStorage.getItem('visitedContactIds') ?? '[]'
    );
    if (storedContactIds.includes(id)) {
      storedContactIds.splice(storedContactIds.indexOf(id), 1);
    }
    if (storedContactIds.length === 4) {
      storedContactIds.shift();
    }
    storedContactIds.unshift(id);
    localStorage.setItem('visitedContactIds', JSON.stringify(storedContactIds));
  }, [id]);
}
