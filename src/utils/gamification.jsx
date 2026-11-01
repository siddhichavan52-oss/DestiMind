const GAMIFICATION_KEY = 'destimind_gamification';
const ACHIEVEMENTS_KEY = 'destimind_achievements';

// Level thresholds and titles
const LEVELS = [
  { level: 1, xp: 0, title: 'Novice Explorer', badge: '🌱' },
  { level: 2, xp: 100, title: 'Curious Traveler', badge: '🌿' },
  { level: 3, xp: 300, title: 'India Enthusiast', badge: '🗺️' },
  { level: 4, xp: 600, title: 'Seasoned Wanderer', badge: '⛰️' },
  { level: 5, xp: 1000, title: 'Culture Seeker', badge: '🏛️' },
  { level: 6, xp: 1500, title: 'Adventure Seeker', badge: '🏔️' },
  { level: 7, xp: 2200, title: 'Beach Lover', badge: '🏖️' },
  { level: 8, xp: 3000, title: 'Heritage Expert', badge: '🕌' },
  { level: 9, xp: 4000, title: 'Master Traveler', badge: '🎖️' },
  { level: 10, xp: 5500, title: 'India Master', badge: '🏆' },
];

// Achievement definitions
const ACHIEVEMENTS = [
  {
    id: 'first_favorite',
    title: 'First Love',
    description: 'Save your first destination',
    icon: '❤️',
    xp: 50,
    condition: (stats) => stats.favorites >= 1,
  },
  {
    id: 'five_favorites',
    title: 'Collector',
    description: 'Save 5 destinations',
    icon: '💎',
    xp: 100,
    condition: (stats) => stats.favorites >= 5,
  },
  {
    id: 'ten_favorites',
    title: 'Curator',
    description: 'Save 10 destinations',
    icon: '🏆',
    xp: 200,
    condition: (stats) => stats.favorites >= 10,
  },
  {
    id: 'five_views',
    title: 'Explorer',
    description: 'View 5 destination details',
    icon: '👁️',
    xp: 50,
    condition: (stats) => stats.views >= 5,
  },
  {
    id: 'twenty_views',
    title: 'Researcher',
    description: 'View 20 destination details',
    icon: '📚',
    xp: 150,
    condition: (stats) => stats.views >= 20,
  },
  {
    id: 'first_comparison',
    title: 'Analyst',
    description: 'Compare destinations for the first time',
    icon: '⚖️',
    xp: 75,
    condition: (stats) => stats.comparisons >= 1,
  },
  {
    id: 'kerala_explorer',
    title: 'Kerala Explorer',
    description: 'Save 5 Kerala destinations',
    icon: '🌴',
    xp: 200,
    condition: (stats) => stats.stateFavorites['Kerala'] >= 5,
  },
  {
    id: 'himachal_explorer',
    title: 'Himalaya Trekker',
    description: 'Save 5 Himachal destinations',
    icon: '🏔️',
    xp: 200,
    condition: (stats) => stats.stateFavorites['Himachal Pradesh'] >= 5,
  },
  {
    id: 'raja_explorer',
    title: 'Royal Explorer',
    description: 'Save 5 Rajasthan destinations',
    icon: '👑',
    xp: 200,
    condition: (stats) => stats.stateFavorites['Rajasthan'] >= 5,
  },
  {
    id: 'tip_master',
    title: 'Local Expert',
    description: 'Submit 10 travel tips',
    icon: '💡',
    xp: 150,
    condition: (stats) => stats.tipsSubmitted >= 10,
  },
];

// Get or initialize gamification data
export function getGamificationData() {
  const data = localStorage.getItem(GAMIFICATION_KEY);
  if (!data) {
    return {
      xp: 0,
      level: 1,
      favorites: 0,
      views: 0,
      comparisons: 0,
      tipsSubmitted: 0,
      stateFavorites: {},
      unlockedAchievements: [],
      lastUpdated: Date.now(),
    };
  }
  return JSON.parse(data);
}

// Save gamification data
function saveGamificationData(data) {
  localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(data));
}

// Add XP and check for level up
export function addXP(amount) {
  const data = getGamificationData();
  data.xp += amount;
  data.lastUpdated = Date.now();
  
  // Check for level up
  const newLevel = LEVELS.filter(l => l.xp <= data.xp).pop();
  if (newLevel && newLevel.level > data.level) {
    data.level = newLevel.level;
  }
  
  saveGamificationData(data);
  return { xp: data.xp, level: data.level, levelUp: newLevel.level > data.level };
}

// Record destination view
export function recordView() {
  const data = getGamificationData();
  data.views += 1;
  const result = addXP(10);
  saveGamificationData(data);
  return result;
}

// Record favorite
export function recordFavorite(state) {
  const data = getGamificationData();
  data.favorites += 1;
  
  if (state) {
    data.stateFavorites[state] = (data.stateFavorites[state] || 0) + 1;
  }
  
  const result = addXP(50);
  saveGamificationData(data);
  return result;
}

// Record comparison
export function recordComparison() {
  const data = getGamificationData();
  data.comparisons += 1;
  const result = addXP(25);
  saveGamificationData(data);
  return result;
}

// Record tip submission
export function recordTipSubmission() {
  const data = getGamificationData();
  data.tipsSubmitted += 1;
  const result = addXP(30);
  saveGamificationData(data);
  return result;
}

// Get current level info
export function getCurrentLevel() {
  const data = getGamificationData();
  return LEVELS.find(l => l.level === data.level) || LEVELS[0];
}

// Get next level info
export function getNextLevel() {
  const data = getGamificationData();
  return LEVELS.find(l => l.level === data.level + 1) || null;
}

// Get XP progress to next level
export function getLevelProgress() {
  const data = getGamificationData();
  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  
  if (!nextLevel) {
    return { current: data.xp, target: data.xp, percentage: 100 };
  }
  
  const xpNeeded = nextLevel.xp - currentLevel.xp;
  const xpEarned = data.xp - currentLevel.xp;
  const percentage = Math.min(100, Math.round((xpEarned / xpNeeded) * 100));
  
  return { current: data.xp, target: nextLevel.xp, percentage };
}

// Check and unlock achievements
export function checkAchievements() {
  const data = getGamificationData();
  const newUnlocks = [];
  
  ACHIEVEMENTS.forEach(achievement => {
    if (!data.unlockedAchievements.includes(achievement.id)) {
      if (achievement.condition(data)) {
        data.unlockedAchievements.push(achievement.id);
        newUnlocks.push(achievement);
        addXP(achievement.xp);
      }
    }
  });
  
  saveGamificationData(data);
  return newUnlocks;
}

// Get all achievements (with unlock status)
export function getAllAchievements() {
  const data = getGamificationData();
  return ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    unlocked: data.unlockedAchievements.includes(achievement.id),
  }));
}

// Get unlocked achievements
export function getUnlockedAchievements() {
  const data = getGamificationData();
  return data.unlockedAchievements.map(id => 
    ACHIEVEMENTS.find(a => a.id === id)
  ).filter(Boolean);
}

// Generate shareable explorer card
export function generateExplorerCard() {
  const data = getGamificationData();
  const level = getCurrentLevel();
  const unlocked = getUnlockedAchievements();
  
  return {
    level: level.level,
    title: level.title,
    badge: level.badge,
    xp: data.xp,
    favorites: data.favorites,
    views: data.views,
    achievements: unlocked.length,
    joined: new Date(data.lastUpdated).toLocaleDateString(),
  };
}
