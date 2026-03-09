// Resolve backend base URL at runtime: prefer local if available, otherwise fallback to deployed.
export async function getApiBaseUrl({ timeout = 1000 } = {}) {
  const normalize = (u) => (u ? u.replace(/\/+$/u, '') : u);

  const deployedRaw = process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api';
  // Normalize and ensure it has the /api suffix (no duplicate slashes)
  const ensureApiSuffix = (u) => {
    if (!u) return u;
    const trimmed = u.replace(/\/+$/u, '');
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
  };

  const deployed = ensureApiSuffix(deployedRaw);
  const localRaw = 'http://localhost:5000/api';
  const local = ensureApiSuffix(localRaw);

  if (typeof window === 'undefined') {
    // On server, return configured deployed URL
    return deployed;
  }

  // Cache on window to avoid repeated probes
  if (window.__API_BASE_URL) return window.__API_BASE_URL;

  // If frontend is not running locally, DO NOT probe loopback/local addresses.
  // Browsers block public -> private address space requests (Private Network Access).
  const hostname = window.location && window.location.hostname;
  const isLocalFrontend = hostname === 'localhost' || hostname === '127.0.0.1';
  if (!isLocalFrontend) {
    window.__API_BASE_URL = deployed;
    return deployed;
  }

  // If frontend is local, probe local backend with timeout. If it responds, prefer local.
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
    // probe failed or timed out — fall back to deployed
  }

  window.__API_BASE_URL = deployed;
  return deployed;
}

// Synchronous convenience getter that returns cached or deployed value.
export function getApiBaseUrlSync() {
  const normalize = (u) => (u ? u.replace(/\/+$/u, '') : u);
  const deployedRaw = process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api';
  const deployed = normalize(deployedRaw);

  if (typeof window === 'undefined') return deployed;
  const cached = window.__API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || deployed;
  return normalize(cached);
}
