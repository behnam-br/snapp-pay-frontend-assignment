export function cleanString(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.trim();
  return s.length ? s : undefined;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  return Object.getPrototypeOf(value) === Object.prototype;
}

export function cleanUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map((item) => cleanUndefined(item))
      .filter((item) => item !== undefined) as unknown as T;
  }

  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};

    for (const [k, v] of Object.entries(value)) {
      const cleaned = cleanUndefined(v);
      if (cleaned !== undefined) out[k] = cleaned;
    }

    return out as unknown as T;
  }

  return value;
}
