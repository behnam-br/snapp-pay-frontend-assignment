import { useEffect } from 'react';

export function useSaveContact(id?: string) {
  useEffect(() => {
    if (!id) return;
    const storedContactIds: string[] = JSON.parse(
      localStorage.getItem(process.env.VISITED_CONTACT_IDS_KEY!) ?? '[]'
    );
    if (storedContactIds.includes(id)) {
      storedContactIds.splice(storedContactIds.indexOf(id), 1);
    }
    if (storedContactIds.length === 4) {
      storedContactIds.shift();
    }
    storedContactIds.unshift(id);
    localStorage.setItem(process.env.VISITED_CONTACT_IDS_KEY!, JSON.stringify(storedContactIds));
  }, [id]);
}
