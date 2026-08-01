const PROFILE_KEY_PREFIX = 'destimind_profile_';

function keyFor(email) {
  return PROFILE_KEY_PREFIX + email.toLowerCase();
}

export function saveProfile(email, profile) {
  localStorage.setItem(keyFor(email), JSON.stringify(profile));
  return profile;
}

export function getProfile(email) {
  return JSON.parse(localStorage.getItem(keyFor(email)) || 'null');
}

export function hasProfile(email) {
  return !!localStorage.getItem(keyFor(email));
}
