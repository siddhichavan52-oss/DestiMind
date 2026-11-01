const SEARCH_HISTORY_KEY = 'destimind_search_history';
const MAX_HISTORY = 10;

export function getSearchHistory() {
  try {
    return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addSearchHistory(searchTerm) {
  if (!searchTerm || !searchTerm.trim()) return;

  const history = getSearchHistory();
  const normalized = searchTerm.trim().toLowerCase();

  // Remove if already exists (to move to top)
  const filtered = history.filter(h => h.toLowerCase() !== normalized);

  // Add to front
  const updated = [searchTerm.trim(), ...filtered].slice(0, MAX_HISTORY);

  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  return updated;
}

export function clearSearchHistory() {
  localStorage.removeItem(SEARCH_HISTORY_KEY);
  return [];
}

export function removeSearchHistory(searchTerm) {
  const history = getSearchHistory();
  const filtered = history.filter(h => h.toLowerCase() !== searchTerm.toLowerCase());
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(filtered));
  return filtered;
}
