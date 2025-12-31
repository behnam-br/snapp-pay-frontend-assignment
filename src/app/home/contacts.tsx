import { memo, useEffect } from 'react';

import { useContactList } from '@/api/get-contact-list/get-contact-list.hook';
import { ContactListParams } from '@/api/get-contact-list/get-contact-list.types';
import { ContactList } from '@/app/home/contact-list';
import { AxiosErrorMessage } from '@/components/ui/axios-error-message';
import { MainLoading } from '@/components/ui/main-loading';
import { AxiosErrorCodeKeys } from '@/lib/axios/utils/api-types';

export const Contacts = memo(
  ({
    params,
    onChangeTotalPages,
  }: {
    params: ContactListParams;
    onChangeTotalPages: (totalPages: number) => void;
  }) => {
    const contactList = useContactList(params);

    useEffect(() => {
      onChangeTotalPages(contactList.data?.data.meta.totalPages ?? 0);
    }, [contactList.data?.data.meta.totalPages, onChangeTotalPages]);

    if (contactList.isPending) {
      return <MainLoading />;
    }
    if (contactList.isError) {
      return (
        <AxiosErrorMessage
          code={AxiosErrorCodeKeys.API_ERROR}
          onReload={() => contactList.refetch()}
        />
      );
    }
    if (contactList.data?.data.items) {
      return (
        <ContactList
          items={contactList.data?.data.items ?? []}
          isFetching={contactList.isFetching || contactList.isRefetching}
          ariaLabel={'contacts'}
        />
      );
    }
    return <></>;
  }
);
