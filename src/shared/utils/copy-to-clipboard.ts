/**
 * Copies text to clipboard
 * @param text - The text to copy
 * @param e - The event to prevent and stop propagation of
 * @returns A promise that resolves when the text is copied
 */
export async function copyToClipboard(e: React.MouseEvent, text?: string) {
  if (!text) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      return true;
    } catch {
      return false;
    }
  }
}
