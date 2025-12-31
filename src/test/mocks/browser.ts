import { setupWorker } from 'msw/browser';

import { handlers } from '@/test/mocks/handlers';

/**
 * MSW Worker for browser environment (development/storybook)
 * This can be used for local development or Storybook integration
 */
export const worker = setupWorker(...handlers);
