import { useParams } from 'react-router-dom';

import { useContact } from '@/api/get-contact/get-contact.hook';
import { ContactDetail } from '@/app/contact/components/contact-detail';
import { useSaveContact } from '@/app/contact/components/use-save-contact';
import { AxiosErrorMessage } from '@/components/ui/axios-error-message';
import { MainLoading } from '@/components/ui/main-loading';
import { AxiosErrorCodeKeys } from '@/lib/axios/utils/api-types';

export function ContactPage() {
  const { id } = useParams();
  useSaveContact(id);
  const contact = useContact(Number(id));

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
