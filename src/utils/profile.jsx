const PROFILE_KEY_PREFIX = 'destimind_profile_';
export const PROFILE_UPDATED_EVENT = 'destimind-profile-updated';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');

function keyFor(email) {
  return PROFILE_KEY_PREFIX + email.toLowerCase();
}

export async function saveProfile(email, profile) {
  const response = await fetch(`${API_BASE_URL}/api/user/profile/${encodeURIComponent(email)}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || 'Could not save profile.');
  localStorage.setItem(keyFor(email), JSON.stringify(data.profile));
  window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
  return profile;
}

export async function getProfile(email) {
  const response = await fetch(`${API_BASE_URL}/api/user/profile/${encodeURIComponent(email)}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || 'Could not load profile.');
  if (data.profile) localStorage.setItem(keyFor(email), JSON.stringify(data.profile));
  return data.profile || null;
}

export function hasProfile(email) {
  return !!localStorage.getItem(keyFor(email));
}
