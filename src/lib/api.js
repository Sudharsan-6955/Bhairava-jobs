// Runtime API resolver: prefer local backend when available, otherwise use deployed backend
let cachedApiBase = null;

const DEFAULT_REMOTE = process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api';
const DEFAULT_LOCAL = process.env.NEXT_PUBLIC_LOCAL_API_URL || 'http://localhost:5000/api';

async function probeHealth(url, timeout = 1200) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(`${url.replace(/\/$/,'')}/health`, {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store'
    });
    clearTimeout(id);
    if (!res.ok) return false;
    const json = await res.json().catch(() => null);
    return json && (json.success === true || json.status === 'healthy');
  } catch (e) {
    return false;
  }
}

/**
 * Returns the API base URL to use at runtime.
 * - Tries local backend first (fast timeout).
 * - Falls back to remote backend if local unreachable.
 * - Respects NEXT_PUBLIC_API_URL / NEXT_PUBLIC_LOCAL_API_URL env overrides.
 */
export async function getApiBaseUrl() {
  if (cachedApiBase) return cachedApiBase;

  // If an explicit env indicates only remote, use it
  const remote = DEFAULT_REMOTE;
  const local = DEFAULT_LOCAL;

  // Try local first with short timeout
  const localOk = await probeHealth(local, 1000);
  cachedApiBase = localOk ? local : remote;
  return cachedApiBase;
}

// Synchronous accessor (returns cached if available, otherwise remote fallback)
export function getApiBaseUrlSync() {
  return cachedApiBase || DEFAULT_REMOTE;
}

export default {
  getApiBaseUrl,
  getApiBaseUrlSync
};
