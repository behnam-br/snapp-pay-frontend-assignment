function normalizeEpoch(ts: number) {
  return ts < 1_000_000_000_000 ? ts * 1000 : ts;
}

export function formatDate(ts: number) {
  const d = new Date(normalizeEpoch(ts));
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}
