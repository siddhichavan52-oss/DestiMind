const SESSION_KEY = 'destimind_session';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');

async function authRequest(path, payload) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) return { ok: false, message: data.detail || 'Request failed.' };
    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
    return { ok: true, user: data.user };
  } catch {
    return { ok: false, message: 'Could not reach the server. Check that the DestiMind API is running.' };
  }
}

export function signupUser(payload) { return authRequest('/api/auth/signup', payload); }
export function loginUser(payload) { return authRequest('/api/auth/login', payload); }

export function isLoggedIn() {
  return !!localStorage.getItem(SESSION_KEY);
}

export function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}
