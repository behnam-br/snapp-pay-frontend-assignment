import { setupServer } from 'msw/node';

import { handlers } from '@/test/mocks/handlers';

/**
 * MSW Server for Node.js environment (Vitest)
 * This server intercepts requests during tests
 */
export const server = setupServer(...handlers);
