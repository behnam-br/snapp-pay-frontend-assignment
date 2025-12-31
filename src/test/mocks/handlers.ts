import { getContactHandlers } from '@/api/get-contact/get-contact.handlers';
import { getContactListHandlers } from '@/api/get-contact-list/get-contact-list.handlers';

/**
 * Combined handlers from all modules
 * These are the default handlers used for all tests
 * Use server.use() in individual tests to override with error handlers
 */
export const handlers = [getContactListHandlers.success, getContactHandlers.success];
