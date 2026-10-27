const HISTORY_PREFIX = 'destimind_travel_preferences_';

export function getLearnedVibes(email) {
  if (!email) return [];
  try {
    const trips = JSON.parse(localStorage.getItem(HISTORY_PREFIX + email.toLowerCase()) || '[]');
    const counts = new Map();
    trips.forEach(({ vibes = [] }) => vibes.forEach((vibe) => counts.set(vibe, (counts.get(vibe) || 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([vibe]) => vibe);
  } catch {
    return [];
  }
}

export function saveTravelPreferences(email, preferences) {
  if (!email) return;
  const key = HISTORY_PREFIX + email.toLowerCase();
  let trips = [];
  try { trips = JSON.parse(localStorage.getItem(key) || '[]'); } catch { trips = []; }
  trips.push({ vibes: preferences.vibes || [], travelMode: preferences.travelMode, days: preferences.days });
  localStorage.setItem(key, JSON.stringify(trips.slice(-20)));
}
