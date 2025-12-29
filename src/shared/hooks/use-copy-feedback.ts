import { useEffect, useState } from 'react';

export function useCopyFeedback(durationMs = 2000) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), durationMs);
    return () => window.clearTimeout(t);
  }, [copied, durationMs]);

  return { copied, setCopied };
}
