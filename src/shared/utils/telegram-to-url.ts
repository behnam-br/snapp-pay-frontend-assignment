export function telegramToUrl(input: string) {
  const raw = input.trim();
  if (!raw) return null;

  // If already a URL, keep it
  if (/^https?:\/\//i.test(raw)) return raw;

  // Handles "@username" or "username"
  const username = raw.startsWith('@') ? raw.slice(1) : raw;
  return `https://t.me/${encodeURIComponent(username)}`;
}
