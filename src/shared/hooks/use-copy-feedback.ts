import { useEffect, useState } from 'react';

/**
 * Hook to handle copy feedback.
 * @param durationMs - The duration of the feedback in milliseconds.
 * @returns An object with the copied state and the setCopied function.
 */
export function useCopyFeedback(durationMs = 2000) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), durationMs);
    return () => window.clearTimeout(t);
  }, [copied, durationMs]);

  return { copied, setCopied };
}
