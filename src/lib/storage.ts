export const STORAGE_KEYS = {
  TOKEN: 'uf_token',
  CURRENT_USER: 'uf_current_user',
} as const;

export function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStore(key: string): void {
  localStorage.removeItem(key);
}