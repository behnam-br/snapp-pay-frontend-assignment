import { delay, http, HttpResponse } from 'msw';

import { mockContacts } from '@/api/get-contact.mock';

const API_BASE = 'http://localhost:3000/api';

export const getContactHandlers = {
  success: http.get(`${API_BASE}/passenger/:id`, async ({ params }) => {
    const { id } = params;
    const contact = mockContacts.find((c) => c.id === Number(id));

    await delay(50);

    return HttpResponse.json(contact);
  }),
};
