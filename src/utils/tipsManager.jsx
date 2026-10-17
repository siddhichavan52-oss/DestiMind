const TIPS_KEY = 'destimind_tips';

// Tip categories
const TIP_CATEGORIES = [
  'Best Time to Visit',
  'What to Skip',
  'Local Secret',
  'Budget Tip',
  'Safety Advice',
  'Food Recommendation',
];

// Get or initialize tips data
export function getTipsData() {
  const data = localStorage.getItem(TIPS_KEY);
  if (!data) {
    return {
      tips: [],
    };
  }
  return JSON.parse(data);
}

// Save tips data
function saveTipsData(data) {
  localStorage.setItem(TIPS_KEY, JSON.stringify(data));
}

// Add a new tip
export function addTip(tip) {
  const data = getTipsData();
  const newTip = {
    id: Date.now().toString(),
    destinationId: tip.destinationId,
    destinationName: tip.destinationName,
    category: tip.category,
    content: tip.content,
    author: tip.author || 'Anonymous Explorer',
    helpful: 0,
    notHelpful: 0,
    createdAt: new Date().toISOString(),
  };
  
  data.tips.unshift(newTip);
  saveTipsData(data);
  return newTip;
}

// Get tips for a specific destination
export function getTipsForDestination(destinationId) {
  const data = getTipsData();
  return data.tips.filter(t => t.destinationId === destinationId);
}

// Vote on a tip
export function voteTip(tipId, helpful) {
  const data = getTipsData();
  const tip = data.tips.find(t => t.id === tipId);
  
  if (tip) {
    if (helpful) {
      tip.helpful += 1;
    } else {
      tip.notHelpful += 1;
    }
    saveTipsData(data);
  }
  
  return tip;
}

// Get top tips (by helpful votes)
export function getTopTips(limit = 10) {
  const data = getTipsData();
  return data.tips
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, limit);
}

// Get recent tips
export function getRecentTips(limit = 10) {
  const data = getTipsData();
  return data.tips.slice(0, limit);
}

// Get tips by user
export function getTipsByUser(author, limit = 10) {
  const data = getTipsData();
  return data.tips
    .filter(t => t.author === author)
    .slice(0, limit);
}

// Get user's total submitted tips
export function getUserTipCount(author) {
  const data = getTipsData();
  return data.tips.filter(t => t.author === author).length;
}

// Get verified traveler status (10+ tips)
export function isVerifiedTraveler(author) {
  return getUserTipCount(author) >= 10;
}

// Get tip statistics
export function getTipStats() {
  const data = getTipsData();
  return {
    total: data.tips.length,
    totalHelpful: data.tips.reduce((sum, t) => sum + t.helpful, 0),
    byCategory: data.tips.reduce((acc, tip) => {
      acc[tip.category] = (acc[tip.category] || 0) + 1;
      return acc;
    }, {}),
  };
}
