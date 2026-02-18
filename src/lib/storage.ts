export const STORAGE_KEYS = {
  TOKEN: 'uf_token',
  CURRENT_USER: 'uf_current_user',
  USERS: 'uf_users',
  JOBS: 'uf_jobs',
  PROPOSALS: 'uf_proposals',
  CONTRACTS: 'uf_contracts',
  REVIEWS: 'uf_reviews',
  NOTIFICATIONS: 'uf_notifications',
  CHAT_THREADS: 'uf_chat_threads',
  MESSAGES: 'uf_messages',
  PAYMENTS: 'uf_payments',
  APPLIED_JOBS: 'uf_applied_jobs',
  SAVED_JOBS: 'uf_saved_jobs',
  SEEDED: 'uf_seeded'
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

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function nowISO(): string {
  return new Date().toISOString();
}