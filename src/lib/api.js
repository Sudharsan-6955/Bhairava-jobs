// Resolve backend base URL at runtime: prefer local if available, otherwise fallback to deployed.
export async function getApiBaseUrl({ timeout = 1000 } = {}) {
  if (typeof window === 'undefined') {
    // On server, prefer NEXT_PUBLIC_API_URL if set, otherwise deployed URL
    return process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api';
  }

  // Cache on window to avoid repeated probes
  if (window.__API_BASE_URL) return window.__API_BASE_URL;

  const deployed = process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api';
  const local = 'http://localhost:5000/api';

  // Probe local health endpoint with timeout
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(`${local}/health`, { signal: controller.signal });
    clearTimeout(id);
    if (res && res.ok) {
      window.__API_BASE_URL = local;
      return local;
    }
  } catch (e) {
    // probe failed or timed out
  }

  // fallback to deployed
  window.__API_BASE_URL = deployed;
  return deployed;
}

// Synchronous convenience getter that returns cached or deployed value.
export function getApiBaseUrlSync() {
  if (typeof window === 'undefined') return process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api';
  return window.__API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api';
}
