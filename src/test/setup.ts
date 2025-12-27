import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

// Keep the same shape as the app runtime (webpack provides `process.env.API_URL` via Node).
// In tests we default to a localhost baseURL so axios can build absolute URLs in Node env tests.
process.env.API_URL ??= 'http://localhost';
