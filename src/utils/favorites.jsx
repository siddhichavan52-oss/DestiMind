const FAVORITES_KEY = 'destimind_favorites';

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
}

export function addFavorite(destination, userEmail) {
  const favorites = getFavorites();
  const userFavorites = favorites.filter(f => f.userEmail === userEmail);
  
  // Check if already favorited
  const exists = userFavorites.some(f => f.destinationId === destination.id);
  if (exists) {
    return { ok: false, message: 'Already in favorites' };
  }

  favorites.push({
    userEmail,
    destinationId: destination.id,
    destination: {
      id: destination.id,
      state: destination.state,
      city: destination.city,
      place: destination.place,
      category: destination.category,
      tripTypes: destination.tripTypes,
      estimatedCost: destination.estimatedCost,
      rating: destination.rating,
      visitHours: destination.visitHours,
    },
    savedAt: new Date().toISOString(),
  });

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return { ok: true };
}

export function removeFavorite(destinationId, userEmail) {
  const favorites = getFavorites();
  const filtered = favorites.filter(
    f => !(f.userEmail === userEmail && f.destinationId === destinationId)
  );
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  return { ok: true };
}

export function isFavorite(destinationId, userEmail) {
  const favorites = getFavorites();
  return favorites.some(
    f => f.userEmail === userEmail && f.destinationId === destinationId
  );
}

export function getUserFavorites(userEmail) {
  const favorites = getFavorites();
  return favorites.filter(f => f.userEmail === userEmail);
}
