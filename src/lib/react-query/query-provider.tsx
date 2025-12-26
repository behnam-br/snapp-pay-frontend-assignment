import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query/query-client';

import type { ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Application-level provider that wires TanStack React Query into the React component tree.
 *
 * @param props - {@link QueryProviderProps}.
 * @returns A {@link QueryClientProvider} wrapping the given children.
 *
 * @remarks
 * This component provides the shared {@link queryClient} instance to all descendants,
 * enabling hooks like `useQuery`, `useMutation`, and `useQueryClient`.
 *
 * Typically rendered near the root of the app (often alongside other providers).
 *
 * @example
 * ```tsx
 * export function App() {
 *   return (
 *     <QueryProvider>
 *       <RouterProvider router={router} />
 *     </QueryProvider>
 *   );
 * }
 * ```
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
