import { QueryClient } from '@tanstack/react-query';

/**
 * Default time (in milliseconds) that query data is considered "fresh".
 *
 * @remarks
 * While data is fresh, React Query will typically avoid refetching it automatically
 * on re-renders/mounts. This helps reduce network traffic for relatively stable data.
 */
const DEFAULT_STALE_TIME = 20 * 60 * 1000;

/**
 * Default garbage-collection time (in milliseconds) for inactive queries.
 *
 * @remarks
 * After a query becomes inactive (no observers), React Query keeps it in cache for this
 * duration before removing it. Longer values improve back/forward navigation performance
 * at the cost of memory usage.
 */
const DEFAULT_GC_TIME = 60 * 60 * 1000;

/**
 * Creates a configured {@link QueryClient} instance with application defaults.
 *
 * @returns A new {@link QueryClient}.
 *
 * @remarks
 * Defaults applied:
 * - Queries:
 *   - `staleTime`: {@link DEFAULT_STALE_TIME}
 *   - `gcTime`: {@link DEFAULT_GC_TIME}
 *   - `refetchOnWindowFocus`: disabled (avoid refetching when tab focuses)
 *   - `refetchOnReconnect`: enabled (refetch when network reconnects)
 *   - `retry`: disabled (errors surface immediately; handle retry per-query if needed)
 * - Mutations:
 *   - `retry`: disabled (handle retries explicitly per mutation if needed)
 *
 * Centralizing these defaults makes query behavior consistent across the app and keeps
 * individual hooks focused on data and UI concerns.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
        gcTime: DEFAULT_GC_TIME,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/**
 * Shared singleton {@link QueryClient} instance used by the application.
 *
 * @remarks
 * Provide this client to `<QueryClientProvider client={queryClient} />` at the app root.
 */
export const queryClient = createQueryClient();
