import "./Results.css";
import DestinationCard from "../components/DestinationCard";
import { useLocation, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { ArrowLeft, Sparkles, MapPin, Plane, TrainFront, Users, Calendar, Wallet } from "lucide-react";

const normalise = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const numberValue = (value, fallback = 0) => {
  const n = Number(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : fallback;
};

const getInput = (source, keys, fallback = "") => {
  for (const key of keys) {
    if (source && source[key] !== undefined && source[key] !== null && source[key] !== "") {
      return source[key];
    }
  }
  return fallback;
};

const extractPreferences = (location) => {
  const state = location?.state;

  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem("travelPreferences") || "{}");
  } catch {
    saved = {};
  }

  // Supports the most common shapes used by React Router/localStorage.
  const source =
    state?.preferences ||
    state?.formData ||
    state?.tripData ||
    state ||
    saved ||
    {};

  return {
    state: getInput(source, ["state", "selectedState", "destinationState", "fromState"], ""),
    city: getInput(source, ["city", "selectedCity", "destinationCity"], ""),
    budget: numberValue(
      getInput(source, ["budget", "amount", "totalBudget", "maxBudget"], 0),
      0
    ),
    days: numberValue(
      getInput(source, ["days", "tripLength", "duration", "tripDays"], 0),
      0
    ),
    tripType: getInput(
      source,
      ["tripType", "travelType", "type", "theme", "category"],
      ""
    ),
    group: getInput(
      source,
      ["group", "groupType", "travellers", "travelers", "travellerType"],
      ""
    ),
    groupSize: numberValue(
      getInput(source, ["groupSize", "travelersCount", "travellersCount", "people"], 1),
      1
    ),
    crowdPreference: getInput(source, ['crowdPreference', 'crowd'], ''),
    tripPacing: getInput(source, ['tripPacing', 'pacing'], ''),
    weather: getInput(source, ['weather', 'weatherPreference'], ''),
    vibes: (() => { const v = getInput(source, ['vibes', 'tripVibes'], []); return Array.isArray(v) ? v : []; })(),
    travelMode: getInput(source, ['travelMode', 'mode'], ''),
    tripPurpose: getInput(source, ['tripPurpose', 'purpose'], ''),
    stayPreference: getInput(source, ['stayPreference', 'stay'], ''),
  };
};

const stateAliases = {
  "pondicherry": "Puducherry",
  "pondicherry union territory": "Puducherry",
  "jammu and kashmir": "Jammu and Kashmir",
  "jammu kashmir": "Jammu and Kashmir",
  "andaman nicobar": "Andaman and Nicobar Islands",
  "andaman and nicobar": "Andaman and Nicobar Islands",
  "dadra nagar haveli daman diu": "Dadra and Nagar Haveli and Daman and Diu",
  "dadra and nagar haveli daman and diu": "Dadra and Nagar Haveli and Daman and Diu",
};

const findStateName = (input) => {
  const n = normalise(input);
  if (!n) return "";

  if (stateAliases[n]) return stateAliases[n];

  const exact = Object.keys(
    INDIA_DESTINATIONS.reduce((acc, item) => {
      acc[item.state] = true;
      return acc;
    }, {})
  ).find((state) => normalise(state) === n);

  if (exact) return exact;

  const partial = Object.keys(
    INDIA_DESTINATIONS.reduce((acc, item) => {
      acc[item.state] = true;
      return acc;
    }, {})
  ).find((state) => {
    const s = normalise(state);
    return s.includes(n) || n.includes(s);
  });

  return partial || "";
};

const cityMatch = (enteredCity, actualCity) => {
  const a = normalise(enteredCity);
  const b = normalise(actualCity);
  if (!a) return false;
  return a === b || a.includes(b) || b.includes(a);
};

const tripTypeMatch = (tripType, item) => {
  const wanted = normalise(tripType);
  if (!wanted) return false;

  const all = [
    item.category,
    ...(item.tripTypes || []),
    item.place,
  ].map(normalise);

  return all.some((x) => x === wanted || x.includes(wanted) || wanted.includes(x));
};

const calculateScore = (item, prefs) => {
  let score = 0;

  // State is the strongest condition.
  if (normalise(item.state) === normalise(prefs.state)) score += 100;

  // City is even stronger when the user supplied one.
  if (prefs.city && cityMatch(prefs.city, item.city)) score += 120;

  // Trip type.
  if (tripTypeMatch(prefs.tripType, item)) score += 35;

  // Budget: don't reject places just because the estimated cost is different.
  if (prefs.budget > 0) {
    const cost = Number(item.estimatedCost || 0);
    if (cost <= prefs.budget) {
      score += 25;
      if (cost <= prefs.budget * 0.5) score += 8;
    } else {
      const difference = cost - prefs.budget;
      score += Math.max(0, 15 - difference / Math.max(prefs.budget, 1) * 15);
    }
  }

  // Days: attraction visit time is used softly.
  if (prefs.days > 0) {
    const hours = Number(item.visitHours || 2);
    const availableHours = prefs.days * 8;
    if (hours <= availableHours) score += 10;
  }

  // Group preferences are intentionally soft because an attraction can work
  // for several group types.
  const group = normalise(prefs.group);
  if (group) {
    const groupMap = {
      family: ["family", "sightseeing", "culture"],
      friends: ["adventure", "nature", "shopping", "sightseeing"],
      couple: ["couple", "relaxation", "beach", "nature"],
      solo: ["sightseeing", "culture", "nature", "history"],
    };

    const relevant = groupMap[group] || [];
    if (relevant.some((x) => (item.tripTypes || []).map(normalise).includes(x))) {
      score += 8;
    }
  }

  // Rating tie-breaker.
  score += Number(item.rating || 0) * 2;

  return score;
};

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  if (amount <= 0) return "Free";
  return `₹${amount.toLocaleString("en-IN")}`;
};

const generateMatchBadges = (item, prefs, matchScore) => {
  const badges = [];
  const maxScore = 300;
  const pct = Math.min(99, Math.max(40, Math.round((matchScore / maxScore) * 100)));
  badges.push({ emoji: '🎯', text: `${pct}% Match`, type: 'match' });

  const cost = Number(item.estimatedCost || 0);
  if (prefs.budget > 0 && cost <= prefs.budget) {
    badges.push({ emoji: 'wallet', text: `Within ₹${prefs.budget.toLocaleString('en-IN')} budget`, type: 'budget' });
  }

  if (prefs.crowdPreference) {
    const offbeatCategories = ['nature', 'trekking', 'wildlife', 'waterfall'];
    const isOffbeat = offbeatCategories.some(c => (item.category || '').toLowerCase().includes(c));
    if (prefs.crowdPreference === 'Quiet & Offbeat' && isOffbeat) {
      badges.push({ emoji: 'leaf', text: 'Quiet & Offbeat', type: 'crowd' });
    } else if (prefs.crowdPreference === 'Popular & Iconic' && !isOffbeat) {
      badges.push({ emoji: 'building', text: 'Popular Spot', type: 'crowd' });
    }
  }

  if (prefs.days > 0) {
    const hours = Number(item.visitHours || 2);
    if (hours <= prefs.days * 8) {
      badges.push({ emoji: '⏱️', text: `Fits in ${prefs.days}-day trip`, type: 'time' });
    }
  }

  if (prefs.vibes && prefs.vibes.length > 0) {
    const itemTypes = (item.tripTypes || []).map(t => t.toLowerCase());
    const matchedVibe = prefs.vibes.find(v => itemTypes.some(t => t.includes(v.toLowerCase()) || v.toLowerCase().includes(t)));
    if (matchedVibe) {
      badges.push({ emoji: '✨', text: `${matchedVibe} match`, type: 'vibe' });
    }
  }

  return badges.slice(0, 4);
};

const ITINERARY_TEMPLATES = {
  Nature: [
    { time: 'Morning', activity: 'Sunrise viewpoint & nature walk', tip: 'Carry water and wear comfortable shoes' },
    { time: 'Afternoon', activity: 'Explore trails & scenic spots', tip: 'Pack a light lunch for a scenic picnic' },
    { time: 'Evening', activity: 'Sunset photography & local market', tip: 'Best photos during golden hour' },
  ],
  'Heritage & History': [
    { time: 'Morning', activity: 'Heritage monument tour & guided walk', tip: 'Book a local guide for hidden stories' },
    { time: 'Afternoon', activity: 'Museum visit & cultural immersion', tip: 'Most museums close by 5 PM' },
    { time: 'Evening', activity: 'Old town stroll & street food', tip: 'Try the local specialty dish' },
  ],
  Sightseeing: [
    { time: 'Morning', activity: 'Visit the iconic landmark early', tip: 'Arrive before 9 AM for fewer tourists' },
    { time: 'Afternoon', activity: 'Explore surrounding attractions & photo stops', tip: 'Keep your camera charged!' },
    { time: 'Evening', activity: 'Relax at a nearby café with a view', tip: 'Ask locals for their favourite spot' },
  ],
  Adventure: [
    { time: 'Morning', activity: 'Trekking or adventure sport session', tip: 'Start early while it\'s cool' },
    { time: 'Afternoon', activity: 'River rafting, zip-lining, or rappelling', tip: 'Book in advance during peak season' },
    { time: 'Evening', activity: 'Bonfire & stargazing', tip: 'Carry warm layers for mountain evenings' },
  ],
  Religious: [
    { time: 'Morning', activity: 'Temple / shrine darshan at dawn', tip: 'Dress modestly and remove footwear' },
    { time: 'Afternoon', activity: 'Visit nearby spiritual sites & ashrams', tip: 'Many temples have a midday break' },
    { time: 'Evening', activity: 'Evening aarti or prayer ceremony', tip: 'The Ganga aarti is unmissable if near a river' },
  ],
};

const DEFAULT_ITINERARY = [
  { time: 'Morning', activity: 'Arrive & explore the area on foot', tip: 'Start early for the best experience' },
  { time: 'Afternoon', activity: 'Visit the main attraction & local spots', tip: 'Carry snacks and water' },
  { time: 'Evening', activity: 'Wind down at a local eatery & shop for souvenirs', tip: 'Ask locals for recommendations' },
];

const getItinerary = (item) => {
  const category = item.category || '';
  for (const [key, plan] of Object.entries(ITINERARY_TEMPLATES)) {
    if (category.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(category.toLowerCase())) {
      return plan;
    }
  }
  return DEFAULT_ITINERARY;
};

/* ============================================================
   PASTE THIS ABOVE `function Results() {`  (after formatCurrency)
   ============================================================ */

// Module-level cache so switching filters/sort doesn't re-fetch
// images you've already loaded in this session.
const imageCache = new Map();

const fetchWikiThumbnail = async (place, city, state, signal) => {
  const cacheKey = `${place}|${city}`;
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey);

  const tryQuery = async (query) => {
    const url =
      "https://en.wikipedia.org/w/api.php?origin=*&action=query&generator=search" +
      `&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages` +
      "&piprop=thumbnail&pithumbsize=600&format=json";

    const res = await fetch(url, { signal });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;
    const first = Object.values(pages)[0];
    return first?.thumbnail?.source || null;
  };

  // Try the most specific query first, then fall back to broader ones.
  const queries = [
    `${place} ${city}`,
    `${place} ${state}`,
    place,
  ];

  let result = null;
  for (const q of queries) {
    try {
      result = await tryQuery(q);
      if (result) break;
    } catch {
      // aborted or network error — try next query
    }
  }

  imageCache.set(cacheKey, result);
  return result;
};

function DestinationImage({ item }) {
  const [src, setSrc] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | done | empty

  React.useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setSrc(null);

    fetchWikiThumbnail(item.place, item.city, item.state, controller.signal).then(
      (url) => {
        if (controller.signal.aborted) return;
        if (url) {
          setSrc(url);
          setStatus("done");
        } else {
          setStatus("empty");
        }
      }
    );

    return () => controller.abort();
  }, [item.place, item.city, item.state]);

  if (status === "done" && src) {
    return (
      <img
        src={src}
        alt={item.place}
        loading="lazy"
        onError={() => setStatus("empty")}
      />
    );
  }

  return (
    <div className="destination-card-image-fallback">
      {status === "loading" ? (
        <span className="destination-card-image-spinner" />
      ) : (
        <span style={{ fontSize: "48px" }}>📍</span>
      )}
    </div>
  );
}

/* ============================================================
   REPLACE the existing image block inside the card render:

     <div className="destination-card-image">
       {card.image ? ( ... ) : ( ... )}
     </div>

   WITH:

     <div className="destination-card-image">
       <DestinationImage item={item} />
     </div>
   ============================================================ */
function Results() {
  const location = useLocation();
  const session = getSession();

  const preferences = location.state || {};
  const destinations = preferences.recommendations || [];

  const [sortBy, setSortBy] = useState("match");
  const [crowdFilter, setCrowdFilter] = useState("All");
  const [gemFilter, setGemFilter] = useState("All"); // All | Hidden | Popular
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("match");
  const [expandedItinerary, setExpandedItinerary] = useState(null);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [compareItems, setCompareItems] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  const hiddenCount = useMemo(
    () => destinations.filter((d) => d.isHiddenGem).length,
    [destinations]
  );
  const popularCount = destinations.length - hiddenCount;

  const filteredDestinations = destinations
    .filter((destination) => {
      const crowdMatch =
        crowdFilter === "All" ||
        destination.crowd === crowdFilter;

      const gemMatch =
        gemFilter === "All" ||
        (gemFilter === "Hidden" && destination.isHiddenGem) ||
        (gemFilter === "Popular" && !destination.isHiddenGem);

      const query = search.trim().toLocaleLowerCase();
      const searchMatch = !query || [destination.name, destination.city, destination.state]
        .some((value) => String(value || "").toLocaleLowerCase().includes(query));

      // The recommendation API has already applied the location and weather
      // preferences. Rechecking those fields here can hide valid matches when
      // the catalog and form use different spellings for a state or city.
      return crowdMatch && gemMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price;
      }
      return b.match - a.match;
    });

  return (
    <div className="results-page">
      <div className="results-top-nav">
        <Link to="/home" className="results-back-link">
          <ArrowLeft size={16} strokeWidth={2.2} />
          <span>Adjust Trip Profile</span>
        </Link>
      </div>

      <div className="results-header">
        <h1>Curated Recommendations</h1>

        <p>
          {filteredDestinations.length} verified destinations matched your travel profile across India
        </p>

        {/* Personalized RAG Learning Notice */}
        {preferences.userLearning?.trainedOnUser && (
          <div className="rag-user-learning-pill">
            <Sparkles size={14} strokeWidth={2.4} color="#a855f7" />
            <span>
              <strong>Personalized with DestiMind RAG:</strong> Learned from your profile & preferences.
            </span>
          </div>
        )}

        {preferences.recommendationNotice && (
          <p className="recommendation-notice">{preferences.recommendationNotice}</p>
        )}
      </div>

      {/* Preferences Pill Summary */}
      <div className="preferences-summary">
        <span>📍 {preferences.state || "All India (Flexible State)"}{preferences.city ? ` · ${preferences.city}` : ""}</span>
        {preferences.travelMode && (
          <span>
            {preferences.travelMode === "Flight" ? "✈️" : preferences.travelMode === "Train" ? "🚆" : "🚗"} {preferences.travelMode}
          </span>
        )}
        <span>☀ {preferences.weather || "Any"}</span>
        <span>💰 ₹{preferences.budget?.toLocaleString()}</span>
        <span>
          🗓️ {preferences.startDate ? `${preferences.startDate} · ` : ""}{preferences.days} Days
        </span>
        {preferences.groupType && (
          <span>👥 {preferences.groupType} ({preferences.groupSize || 1})</span>
        )}
      </div>

      {/* Flight Route Cost Verification Banner */}
      {preferences.travelMode === "Flight" && (
        <div className="flight-comparison-banner">
          <Plane size={15} strokeWidth={2.4} color="#38bdf8" />
          <span>
            <strong>Flight Price Comparison Active:</strong> Roundtrip airfares verified from {preferences.originCity || "your origin"} to destination airports. Viable candidates filtered to fit within your ₹{(preferences.budget || 0).toLocaleString()} budget.
          </span>
        </div>
      )}

      {/* Hidden Gem vs Popular Segmented Controls */}
      <div className="gem-segmented-controls">
        <button
          type="button"
          className={`gem-segment-btn ${gemFilter === "All" ? "active" : ""}`}
          onClick={() => setGemFilter("All")}
        >
          All Destinations ({destinations.length})
        </button>
        <button
          type="button"
          className={`gem-segment-btn gem-btn-special ${gemFilter === "Hidden" ? "active" : ""}`}
          onClick={() => setGemFilter("Hidden")}
        >
          💎 Hidden Gems Only ({hiddenCount})
        </button>
        <button
          type="button"
          className={`gem-segment-btn ${gemFilter === "Popular" ? "active" : ""}`}
          onClick={() => setGemFilter("Popular")}
        >
          ⭐ Popular Highlights ({popularCount})
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search destination, city, or attractions..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchHistory.length > 0 && setShowSearchHistory(true)}
            onBlur={() => setTimeout(() => setShowSearchHistory(false), 200)}
          />
        </div>

        <div className="filter-bar">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="match">Sort by Best Match</option>
            <option value="price">Sort by Lowest Price</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="All">All Crowd Levels</option>
            <option value="Low Crowd">Low Crowd (Quiet & Serene)</option>
            <option value="Medium Crowd">Medium Crowd (Moderate)</option>
            <option value="High Crowd">High Crowd (Peak Season)</option>
          </select>
        </div>
      </div>

      {filteredDestinations.length > 0 ? (
        <div className="results-grid">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.name}
              destination={destination}
            />
          ))}
        </div>
      ) : (
        <div className="no-results-box">
          <h2 className="no-results">No destinations match this filter.</h2>
          <p className="no-results-sub">
            Try switching the filter to "All Destinations" or clearing your crowd filter.
          </p>
          <button
            type="button"
            className="clear-filters-btn"
            onClick={() => {
              setGemFilter("All");
              setCrowdFilter("All");
              setSearch("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
