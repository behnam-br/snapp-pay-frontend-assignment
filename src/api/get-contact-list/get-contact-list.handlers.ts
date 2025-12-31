import { delay, http, HttpResponse } from 'msw';

import { mockContacts } from '@/api/get-contact.mock';

const API_BASE = 'http://localhost:3000/api';

export const getContactListHandlers = {
  success: http.get(`${API_BASE}/passenger/`, async () => {
    await delay(100);

    return HttpResponse.json({
      meta: {
        skipped: 12,
        limit: 12,
        total: 2100,
        criteria: {},
      },
      items: mockContacts,
    });
  }),
};
