import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { State, City } from 'country-state-city';
import {
  MapPin, Globe2, Sun, Snowflake, CloudSun, Palmtree, Sparkles,
  Mountain, Waves, Landmark, Music, Trees, UtensilsCrossed,
  Wallet, ArrowRight, Check, Plane, TrainFront,
  Car, Ship, Users, User, Heart, UsersRound, History, X, Plus, Lock, Stamp,
  CalendarDays, Calendar, Briefcase, BedDouble, ShieldCheck,
} from 'lucide-react';
import { getSession } from '../utils/auth';
import { getProfile, PROFILE_UPDATED_EVENT } from '../utils/profile';
import { getLearnedVibes, saveTravelPreferences } from '../utils/travelHistory';
import './PreferenceForm.css';

// DestiMind is India-only for now, so the destination country is fixed
// and the picker below only asks for state (required) and city (optional).
const COUNTRY_CODE = 'IN';
const COUNTRY_NAME = 'India';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');

const COUNTRY_TIER = {
  IN: 'value', TH: 'value', VN: 'value', ID: 'value', LK: 'value', MA: 'value',
  EG: 'value', MX: 'value', PE: 'value', CO: 'value', EC: 'value', CU: 'value',
  CN: 'mid', ES: 'mid', GR: 'mid', DE: 'mid', PT: 'mid', NL: 'mid', ZA: 'mid',
  KE: 'mid', TZ: 'mid', NA: 'mid', BR: 'mid', AR: 'mid', CL: 'mid', CR: 'mid',
  AE: 'premium', SG: 'premium', MV: 'premium', FR: 'premium', IT: 'premium',
  CH: 'premium', GB: 'premium', IS: 'premium', MU: 'premium', AU: 'premium',
  NZ: 'premium', FJ: 'premium', PF: 'premium', US: 'premium', CA: 'premium', JP: 'mid',
};

const TIER_RANGES = {
  value: { min: 8000, max: 150000, step: 2000, default: 35000 },
  mid: { min: 20000, max: 300000, step: 5000, default: 75000 },
  premium: { min: 50000, max: 600000, step: 10000, default: 160000 },
};

const TIER_COST_HINTS = {
  value: { label: 'Budget friendly', daily: [2500, 6500] },
  mid: { label: 'Comfort balanced', daily: [6500, 14000] },
  premium: { label: 'Premium destination', daily: [14000, 32000] },
};

// Rough per-person, one-way-equivalent transport cost by mode.
// Used only to shape the budget estimate — not sent anywhere.
const TRAVEL_MODE_COST = {
  Flight: 9000,
  Train: 2500,
  'Road Trip': 1800,
  Cruise: 15000,
  Flexible: 5000,
};

export const POPULAR_ORIGIN_CITIES = [
  'New Delhi',
  'Mumbai',
  'Bengaluru',
  'Kolkata',
  'Chennai',
  'Hyderabad',
  'Ahmedabad',
  'Pune',
  'Jaipur',
  'Chandigarh',
  'Lucknow',
  'Kochi',
  'Goa',
  'Guwahati',
  'Varanasi',
  'Bhubaneswar',
  'Patna',
];

function formatRs(value) {
  return `Rs. ${Math.round(value).toLocaleString('en-IN')}`;
}

// Inclusive day-count between two yyyy-mm-dd date strings (trip length = nights + 1 travel day).
function daysBetween(start, end) {
  if (!start || !end) return null;
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const diff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff + 1 : null;
}

function formatDateLabel(value) {
  if (!value) return '';
  const d = new Date(`${value}T00:00:00`);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function defaultStartDateISO() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().slice(0, 10);
}

function defaultEndDateISO() {
  const d = new Date();
  d.setDate(d.getDate() + 19);
  return d.toISOString().slice(0, 10);
}

// budget is treated as the TOTAL trip budget spread across the whole group,
// so we compare it against the group-scaled daily hint, not a per-person one.
function getBudgetBand(budget, days, groupSize, hint) {
  const dailyForGroup = budget / Math.max(days, 1);
  const dailyMin = hint.daily[0] * groupSize;
  const dailyMax = hint.daily[1] * groupSize;
  if (dailyForGroup < dailyMin) return 'tight';
  if (dailyForGroup > dailyMax) return 'comfortable';
  return 'balanced';
}

function buildTripInsight({ countryCode, countryName, stateName, budget, days, groupType, groupSize, travelMode }) {
  if (!countryCode || !groupType || !travelMode) return null;

  const tier = COUNTRY_TIER[countryCode] || 'mid';
  const hint = TIER_COST_HINTS[tier];
  const destination = stateName || (countryName ? `${countryName} (All States)` : 'India');
  const size = Math.max(Number(groupSize) || 1, 1);
  const tripDays = Math.max(days || 5, 1);
  const nights = Math.max(tripDays - 1, 1);
  const rooms = Math.ceil(size / 2);

  let totalLow, totalHigh, travelTotal, stayLow, stayHigh;

  if (travelMode === 'Flight') {
    const flightPerPerson = 7000;
    travelTotal = flightPerPerson * size;
    stayLow = 2200 * nights * rooms;
    stayHigh = 5500 * nights * rooms;
    const mealsLow = 800 * tripDays * size;
    const mealsHigh = 1600 * tripDays * size;

    totalLow = travelTotal + stayLow + mealsLow;
    totalHigh = travelTotal + stayHigh + mealsHigh;
  } else if (travelMode === 'Train') {
    travelTotal = 1800 * size;
    stayLow = 1800 * nights * rooms;
    stayHigh = 4000 * nights * rooms;
    const mealsLow = 600 * tripDays * size;
    const mealsHigh = 1200 * tripDays * size;
    totalLow = travelTotal + stayLow + mealsLow;
    totalHigh = travelTotal + stayHigh + mealsHigh;
  } else {
    const travelCostPerPerson = TRAVEL_MODE_COST[travelMode] ?? TRAVEL_MODE_COST.Flexible;
    travelTotal = travelCostPerPerson * size;
    stayLow = hint.daily[0] * tripDays * size;
    stayHigh = hint.daily[1] * tripDays * size;
    totalLow = stayLow + travelTotal;
    totalHigh = stayHigh + travelTotal;
  }

  const band = getBudgetBand(budget, tripDays, size, hint);
  const groupWord = size === 1 ? 'traveller' : 'travellers';

  const bandCopy = {
    tight: `Selected budget is close to the minimum baseline for ${size} ${groupWord} travelling by ${travelMode.toLowerCase()}. Stays will be budget homestays.`,
    balanced: `This budget covers confirmed roundtrip ${travelMode.toLowerCase()} (~${formatRs(travelTotal)}), verified hotel stays, and daily allowances for ${size} ${groupWord}.`,
    comfortable: `This budget gives extra room for boutique/resort stay upgrades and private excursions for ${size} ${groupWord}, on top of ${formatRs(travelTotal)} for ${travelMode.toLowerCase()}.`,
  };

  const bandLabel = {
    tight: 'Lean / Budget Match',
    balanced: 'Optimal Flight & Stay Fit',
    comfortable: 'Comfortable & Upgraded',
  };

  return {
    destination,
    tierLabel: travelMode === 'Flight' ? 'Flight & Stay Package' : hint.label,
    estimatedTotal: `${formatRs(totalLow)} - ${formatRs(totalHigh)}`,
    minimumBudget: formatRs(totalLow),
    dailyRange: `${formatRs(Math.round(stayLow / (tripDays * size)))} - ${formatRs(Math.round(stayHigh / (tripDays * size)))}/person/day`,
    transportEstimate: formatRs(travelTotal),
    groupSize: size,
    band,
    bandLabel: bandLabel[band],
    bandCopy: bandCopy[band],
  };
}

const WEATHER_OPTIONS = [
  { label: 'Beach & Warm', icon: Sun },
  { label: 'Cold & Snowy', icon: Snowflake },
  { label: 'Mild', icon: CloudSun },
  { label: 'Tropical', icon: Palmtree },
  { label: 'Any', icon: Sparkles },
];

const VIBE_OPTIONS = [
  { label: 'Adventure', icon: Mountain },
  { label: 'Relaxation', icon: Waves },
  { label: 'Culture', icon: Landmark },
  { label: 'Nightlife', icon: Music },
  { label: 'Nature', icon: Trees },
  { label: 'Food', icon: UtensilsCrossed },
];

const TRAVEL_MODES = [
  { label: 'Flight', icon: Plane },
  { label: 'Train', icon: TrainFront },
  { label: 'Road Trip', icon: Car },
  { label: 'Cruise', icon: Ship },
  { label: 'Flexible', icon: Sparkles },
];

const GROUP_TYPES = [
  { label: 'Solo', icon: User, suggested: 1 },
  { label: 'Couple', icon: Heart, suggested: 2 },
  { label: 'Family', icon: Users, suggested: 4 },
  { label: 'Friends', icon: UsersRound, suggested: 5 },
  { label: 'Large Group', icon: UsersRound, suggested: 10 },
];

const PLACE_SUGGESTIONS = ['Goa', 'Bali', 'Dubai', 'Paris', 'Bangkok', 'Maldives', 'Manali', 'Singapore'];

const TRIP_PURPOSES = [
  { label: 'Leisure', icon: Palmtree },
  { label: 'Honeymoon', icon: Heart },
  { label: 'Business', icon: Briefcase },
  { label: 'Adventure', icon: Mountain },
  { label: 'Celebration', icon: Sparkles },
];

const STAY_OPTIONS = [
  { label: 'Hotel', icon: BedDouble },
  { label: 'Resort', icon: Palmtree },
  { label: 'Hostel / Budget', icon: Users },
  { label: 'Homestay / Airbnb', icon: MapPin },
  { label: 'Flexible', icon: Sparkles },
];

const WAYPOINTS = [
  { key: 'state', label: 'State', icon: MapPin, x: 22, y: 64, color: '#7BCDBA' },
  { key: 'weather', label: 'Weather', icon: Sun, x: 129, y: 24, color: '#FFB347' },
  { key: 'travelMode', label: 'Mode', icon: Plane, x: 236, y: 60, color: '#FF9A63' },
  { key: 'groupType', label: 'Group', icon: Users, x: 344, y: 22, color: '#FF6F5E' },
];

function arcPath(a, b) {
  const midX = (a.x + b.x) / 2;
  const midY = Math.min(a.y, b.y) - 24;
  return `M${a.x},${a.y} Q${midX},${midY} ${b.x},${b.y}`;
}

function angleBetween(a, b) {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

function FlightRoute({ filled, destCode }) {
  const litCount = WAYPOINTS.filter((w) => filled[w.key]).length;
  const planeIndex = Math.max(0, litCount - 1);
  const plane = WAYPOINTS[Math.min(planeIndex, WAYPOINTS.length - 1)];
  const nextForAngle = WAYPOINTS[Math.min(planeIndex + 1, WAYPOINTS.length - 1)];
  const angle = litCount === 0 ? -8 : angleBetween(plane, nextForAngle) || -8;

  return (
    <div className="route-map">
      <svg viewBox="0 0 366 88" className="route-svg" aria-hidden="true">
        {WAYPOINTS.slice(0, -1).map((a, i) => {
          const b = WAYPOINTS[i + 1];
          const active = litCount > i + 1;
          return (
            <g key={a.key}>
              <path d={arcPath(a, b)} className="route-track" />
              <path
                d={arcPath(a, b)}
                pathLength="1"
                className={`route-fill ${active ? 'route-fill-on' : ''}`}
                style={{ stroke: b.color }}
              />
            </g>
          );
        })}

        {WAYPOINTS.map((w, i) => {
          const lit = litCount > i;
          const Icon = w.icon;
          return (
            <g key={w.key} className={`route-stop ${lit ? 'route-stop-on' : ''}`}>
              <circle cx={w.x} cy={w.y} r="10.5" className="route-dot" style={lit ? { fill: w.color } : undefined} />
              <foreignObject x={w.x - 7} y={w.y - 7} width="14" height="14">
                <Icon size={14} strokeWidth={2.4} color={lit ? '#0F1B2D' : 'rgba(247,245,240,0.55)'} />
              </foreignObject>
              <text x={w.x} y={w.y + 24} textAnchor="middle" className={`route-label ${lit ? 'route-label-on' : ''}`}>
                {w.label}
              </text>
            </g>
          );
        })}

        <g
          className="route-plane"
          style={{ transform: `translate(${plane.x}px, ${plane.y}px) rotate(${angle}deg)` }}
        >
          <polygon points="0,-9 6,7 0,3.5 -6,7" />
        </g>
      </svg>

      <div className="route-tag">
        <span className="route-tag-from">YOU</span>
        <ArrowRight size={11} strokeWidth={2.5} />
        <span className="route-tag-to">{destCode || '???'}</span>
      </div>
    </div>
  );
}

function Section({ icon: Icon, label, hint, children }) {
  return (
    <div className="pf-section">
      <div className="pf-section-head">
        <span className="pf-section-icon"><Icon size={14} strokeWidth={2.25} /></span>
        <span className="pf-section-label">{label}</span>
        {hint && <span className="pref-hint">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export default function PreferenceForm() {
  const countryCode = COUNTRY_CODE;
  const [stateCode, setStateCode] = useState('');
  const [cityName, setCityName] = useState('');

  const [weather, setWeather] = useState('Any');
  const [vibes, setVibes] = useState([]);
  const indiaTier = COUNTRY_TIER[COUNTRY_CODE] || 'mid';
  const [baseRange, setBaseRange] = useState(TIER_RANGES[indiaTier]);
  const [budget, setBudget] = useState(TIER_RANGES[indiaTier].default);
  const [startDate, setStartDate] = useState(defaultStartDateISO());
  const [endDate, setEndDate] = useState(defaultEndDateISO());
  const [days, setDays] = useState(5);
  const [dateError, setDateError] = useState('');

  const [travelMode, setTravelMode] = useState('Flight');
  const [groupType, setGroupType] = useState('Solo');
  const [groupSize, setGroupSize] = useState('1');
  const [placesVisited, setPlacesVisited] = useState([]);
  const [placeInput, setPlaceInput] = useState('');
  const [tripPurpose, setTripPurpose] = useState('');
  const [stayPreference, setStayPreference] = useState('');

  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const [homeProfile, setHomeProfile] = useState(null);
  const [departureCity, setDepartureCity] = useState('New Delhi');

  useEffect(() => {
    const session = getSession();
    if (!session) return;

    function loadHomeProfile() {
      getProfile(session.email).then((prof) => {
        setHomeProfile(prof);
        if (prof?.city) {
          setDepartureCity(prof.city);
        }
      }).catch((err) => console.error('Profile load failed:', err));
    }

    loadHomeProfile();
    window.addEventListener(PROFILE_UPDATED_EVENT, loadHomeProfile);
    window.addEventListener('storage', loadHomeProfile);
    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, loadHomeProfile);
      window.removeEventListener('storage', loadHomeProfile);
    };
  }, []);

  const travelingFromLabel = homeProfile
    ? [homeProfile.city, homeProfile.state, homeProfile.country].filter(Boolean).join(', ')
    : '';

  const stateOptions = useMemo(() => {
    return State.getStatesOfCountry(countryCode).sort((a, b) => a.name.localeCompare(b.name));
  }, [countryCode]);

  const cityOptions = useMemo(() => {
    if (!stateCode) return [];
    return City.getCitiesOfState(countryCode, stateCode).sort((a, b) => a.name.localeCompare(b.name));
  }, [countryCode, stateCode]);

  function handleStateChange(code) {
    setStateCode(code);
    setCityName('');
  }

  // Selecting dates auto-computes the trip length instead of the user
  // guessing it, and flags an obviously invalid range.
  function handleStartDate(value) {
    setStartDate(value);
    if (endDate && value > endDate) {
      setEndDate('');
      setDays(0);
    }
    if (!value) setDays(0);
    setDateError('');
  }

  function handleEndDate(value) {
    if (startDate && value < startDate) {
      setDateError('Return date can\'t be before your departure date.');
      return;
    }
    setDateError('');
    setEndDate(value);
    if (!value) {
      setDays(0);
      return;
    }
    const computed = daysBetween(startDate, value);
    setDays(computed ? Math.min(computed, 30) : 0);
  }

  function toggleVibe(vibe) {
    setVibes((prev) => (prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe]));
  }

  function handleGroupType(label, suggested) {
    setGroupType(label);
    if (label === 'Solo') setGroupSize('1');
    else if (!groupSize) setGroupSize(String(suggested));
  }

  function addPlace(name) {
    const clean = name.trim();
    if (!clean) return;
    setPlacesVisited((prev) => (
      prev.some((p) => p.toLowerCase() === clean.toLowerCase()) ? prev : [...prev, clean]
    ));
    setPlaceInput('');
  }

  function removePlace(name) {
    setPlacesVisited((prev) => prev.filter((p) => p !== name));
  }

  function handlePlaceKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPlace(placeInput);
    }
  }

  const filled = {
    state: true, // state and city are optional, explore across India
    weather: !!weather,
    travelMode: !!travelMode,
    groupType: !!groupType,
  };
  const progress = Object.values(filled).filter(Boolean).length;

  const estimatedMatches = useMemo(() => {
    let base = 1200;
    base *= Math.pow(0.55, progress);
    if (vibes.length > 1) base *= Math.pow(0.85, vibes.length - 1);
    if (stateCode) base *= 0.6;
    if (cityName) base *= 0.5;
    return Math.max(3, Math.round(base));
  }, [progress, vibes.length, stateCode, cityName]);

  // Budget only becomes meaningful once we know who is coming and how they're travelling
  const readyForBudget = !!(countryCode && groupType && travelMode);

  const groupSizeNum = Math.max(Number(groupSize) || 1, 1);
  const tripDaysCount = days || (startDate && endDate ? daysBetween(startDate, endDate) : null) || 5;
  const nightsCount = Math.max(1, tripDaysCount - 1);
  const roomsNeededCount = Math.ceil(groupSizeNum / 2);

  // GROUNDED REALISTIC MINIMUM BUDGET CALCULATION:
  // "if the user selects flight then lock the price to a particular minimum budget and don't do it blindly first take into consideration the actual price of flight and hotels"
  const FLIGHT_ROUNDTRIP_PER_PERSON = 12500; // Calibrated to real-world domestic flight round-trips (starting from ₹10k-18k depending on route distance)
  const HOTEL_STAY_PER_ROOM_NIGHT = 2200;   // Realistic verified budget/homestay room rate
  const DAILY_MEALS_PER_PERSON = 800;       // Realistic food & local travel daily allowance

  const flightBudgetFloor = useMemo(() => {
    if (travelMode !== 'Flight') return 0;
    const flightCost = FLIGHT_ROUNDTRIP_PER_PERSON * groupSizeNum;
    const hotelCost = HOTEL_STAY_PER_ROOM_NIGHT * nightsCount * roomsNeededCount;
    const mealsCost = DAILY_MEALS_PER_PERSON * tripDaysCount * groupSizeNum;
    const totalMinimum = flightCost + hotelCost + mealsCost;
    return Math.ceil(totalMinimum / 1000) * 1000;
  }, [travelMode, groupSizeNum, tripDaysCount, nightsCount, roomsNeededCount]);

  const trainBudgetFloor = useMemo(() => {
    if (travelMode !== 'Train') return 0;
    const trainCost = 1800 * groupSizeNum;
    const hotelCost = 1800 * nightsCount * roomsNeededCount;
    const mealsCost = 600 * tripDaysCount * groupSizeNum;
    return Math.ceil((trainCost + hotelCost + mealsCost) / 1000) * 1000;
  }, [travelMode, groupSizeNum, tripDaysCount, nightsCount, roomsNeededCount]);

  const roadBudgetFloor = useMemo(() => {
    if (travelMode !== 'Road Trip') return 0;
    const roadCost = 1500 * groupSizeNum;
    const hotelCost = 1800 * nightsCount * roomsNeededCount;
    const mealsCost = 600 * tripDaysCount * groupSizeNum;
    return Math.ceil((roadCost + hotelCost + mealsCost) / 1000) * 1000;
  }, [travelMode, groupSizeNum, tripDaysCount, nightsCount, roomsNeededCount]);

  const effectiveBudgetFloor = useMemo(() => {
    if (travelMode === 'Flight') return flightBudgetFloor;
    if (travelMode === 'Train') return trainBudgetFloor;
    if (travelMode === 'Road Trip') return roadBudgetFloor;
    return 8000;
  }, [travelMode, flightBudgetFloor, trainBudgetFloor, roadBudgetFloor]);

  const budgetRange = useMemo(() => {
    const min = effectiveBudgetFloor || 8000;
    const max = Math.max(300000, min * 4);
    const step = 2000;
    return {
      min,
      max,
      step,
      default: Math.max(min, Math.round(min * 1.25 / 1000) * 1000),
    };
  }, [effectiveBudgetFloor]);

  // Keep the current slider value inside whatever range the grounded lock produced
  useEffect(() => {
    setBudget((prev) => {
      if (prev < budgetRange.min) return budgetRange.min;
      if (prev > budgetRange.max) return budgetRange.max;
      return prev;
    });
  }, [budgetRange.min, budgetRange.max]);

  const tripLength = startDate && endDate ? daysBetween(startDate, endDate) : null;
  const datesConfirmed = !!(startDate && endDate && tripLength);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSearching(true);
    setConfirmed(false);

    // Sensible defaults so clicking 'Find My Destinations' never blocks the user
    const effGroupType = groupType || 'Solo';
    const effGroupSize = groupSize ? Math.max(1, Number(groupSize)) : 1;
    const effTravelMode = travelMode || 'Flight';
    const effWeather = weather || 'Any';

    let effStart = startDate;
    let effEnd = endDate;
    if (!effStart || !effEnd) {
      effStart = defaultStartDateISO();
      effEnd = defaultEndDateISO();
    }
    const effDays = Math.max(1, days || (effStart && effEnd ? daysBetween(effStart, effEnd) : 5));

    const countryName = COUNTRY_NAME;
    const stateName = stateCode ? State.getStateByCodeAndCountry(stateCode, countryCode)?.name || '' : '';

    const sessionUser = getSession();
    const preferences = {
      country: countryName,
      countryCode,
      state: stateName || null,
      city: cityName || null,
      weather: effWeather,
      vibes,
      budget: budget || 25000,
      days: effDays,
      startDate: effStart,
      endDate: effEnd,
      travelMode: effTravelMode,
      transportBudgetLocked: effectiveBudgetFloor,
      groupType: effGroupType,
      groupSize: effGroupSize,
      placesVisitedBefore: placesVisited,
      learnedVibes: getLearnedVibes(sessionUser?.email),
      tripPurpose: tripPurpose || null,
      stayPreference: stayPreference || null,
      originCity: departureCity || homeProfile?.city || 'New Delhi',
      originState: homeProfile?.state || null,
      userEmail: sessionUser?.email || null,
      userName: sessionUser?.name || null,
      favoriteDestinations: homeProfile?.destinations || [],
    };
    try {
      // Async RAG user training
      if (sessionUser?.email) {
        fetch(`${API_BASE_URL}/api/user/train`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: sessionUser.email,
            name: sessionUser.name,
            originCity: homeProfile?.city || null,
            originState: homeProfile?.state || null,
            favoriteDestinations: homeProfile?.destinations || [],
            preferredVibes: vibes,
            placesVisited: placesVisited,
            tripHistoryItem: {
              state: stateName,
              city: cityName,
              budget: preferences.budget,
              days: effDays,
              travelMode: effTravelMode,
              startDate: effStart,
              endDate: effEnd,
            }
          }),
        }).catch((err) => console.log('RAG background training note:', err));
      }

      const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        let detail = 'Could not generate recommendations. Please try again.';
        if (typeof data.detail === 'string') {
          detail = data.detail;
        } else if (Array.isArray(data.detail)) {
          detail = data.detail.map((d) => d.msg || JSON.stringify(d)).join(', ');
        }
        throw new Error(detail);
      }
      if (!Array.isArray(data.recommendations) || data.recommendations.length === 0) {
        throw new Error('No destinations were returned for these preferences. Please adjust your budget or trip criteria.');
      }

      saveTravelPreferences(sessionUser?.email, preferences);

      setSearching(false);
      setConfirmed(true);
      setTimeout(() => {
        setConfirmed(false);
        navigate('/results', {
          state: {
            ...preferences,
            recommendations: data.recommendations,
            recommendationNotice: data.notice,
            llmUsed: data.llmUsed,
            userLearning: data.userLearning,
            hiddenGemsCount: data.hiddenGemsCount,
          },
        });
      }, 350);
    } catch (apiError) {
      setSearching(false);
      setConfirmed(false);
      setError(apiError.message || 'Unable to connect to DestiMind. Make sure the FastAPI backend is running.');
    }
  }

  const budgetPct = ((budget - budgetRange.min) / (budgetRange.max - budgetRange.min)) * 100;
  const countryName = COUNTRY_NAME;
  const stateName = stateCode ? State.getStateByCodeAndCountry(stateCode, countryCode)?.name : '';
  const tripInsight = useMemo(() => buildTripInsight({
    countryCode,
    countryName,
    stateName,
    budget,
    days,
    groupType,
    groupSize,
    travelMode,
  }), [countryCode, countryName, stateName, budget, days, groupType, groupSize, travelMode]);
  const summaryRows = [
    { key: 'from', icon: MapPin, label: 'From', value: departureCity || 'New Delhi' },
    { key: 'where', icon: Globe2, label: 'Where', value: stateName ? `${stateName}${cityName ? `, ${cityName}` : ''}` : 'Anywhere in India' },
    { key: 'when', icon: Calendar, label: 'When', value: datesConfirmed ? `${formatDateLabel(startDate)} · ${tripLength}d` : null },
    { key: 'group', icon: Users, label: 'Group', value: groupType ? `${groupType}${groupSize ? ` · ${groupSize}` : ''}` : null },
    { key: 'mode', icon: Plane, label: 'Mode', value: travelMode || null },
    { key: 'budget', icon: Wallet, label: 'Budget', value: readyForBudget ? `₹${budget.toLocaleString()}` : null },
    { key: 'weather', icon: Sun, label: 'Weather', value: weather || null },
  ];

  return (
    <form className="pf-card" onSubmit={handleSubmit}>
      <div className="pf-stub">
        <span className="pf-eyebrow">Boarding · Travel profile</span>
        <h2 className="pf-title">Design your next trip</h2>
        <p className="pf-subtitle">Pick a destination and we'll tune the rest to it.</p>

        <div className="pf-estimate-pill">
          {stateCode
            ? <><strong>{estimatedMatches}</strong> destinations match in {stateName}</>
            : <><strong>{estimatedMatches}</strong> destinations across India match your profile</>}
        </div>

        <FlightRoute filled={filled} destCode={stateCode || 'INDIA'} />

        <div className="pf-summary">
          {summaryRows.map((row) => (
            <div className={`pf-summary-row ${row.value ? 'pf-summary-row-on' : ''}`} key={row.key}>
              <row.icon size={13} strokeWidth={2.25} />
              <span className="pf-summary-label">{row.label}</span>
              <span className="pf-summary-value">{row.value || '—'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pf-perforation-v" aria-hidden="true" />
      <div className="pf-perforation" aria-hidden="true" />

      <div className="pf-body">
        <Section icon={Globe2} label="Where to">
          <div className="pf-from-row">
            <span className="pf-from-label">
              <MapPin size={13} strokeWidth={2.25} />
              Departing From
            </span>
            <select
              className="pf-from-select"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              aria-label="Select departure city"
            >
              {POPULAR_ORIGIN_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c} {homeProfile?.city === c ? '★ (Home)' : ''}
                </option>
              ))}
              {homeProfile?.city && !POPULAR_ORIGIN_CITIES.includes(homeProfile.city) && (
                <option value={homeProfile.city}>{homeProfile.city} ★ (Home)</option>
              )}
            </select>
            {homeProfile?.city ? (
              <span className="pf-from-subtext">Profile: {homeProfile.city}</span>
            ) : (
              <Link to="/profile" className="pf-from-empty">
                Set home profile →
              </Link>
            )}
          </div>

          <div className="pref-grid">
            <div className="pref-field">
              <label className="pref-label">
                State <span className="pref-hint">(optional)</span>
              </label>
              <select
                className="pref-select"
                value={stateCode}
                onChange={(e) => handleStateChange(e.target.value)}
              >
                <option value="">All States & Territories (Recommend across India)</option>
                {stateOptions.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="pref-field">
              <label className="pref-label">
                City <span className="pref-hint">(optional)</span>
              </label>
              <select
                className="pref-select"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                disabled={!stateCode || cityOptions.length === 0}
              >
                <option value="">
                  {!stateCode ? 'Any city across India (Flexible)' : cityOptions.length === 0 ? 'No cities listed' : 'Any city in this state'}
                </option>
                {cityOptions.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </Section>

        <Section icon={Users} label="Who's coming">
          <div className="chip-row">
            {GROUP_TYPES.map(({ label, icon: Icon, suggested }) => (
              <button type="button" key={label} className={`chip ${groupType === label ? 'chip-active' : ''}`} onClick={() => handleGroupType(label, suggested)}>
                <Icon size={14} strokeWidth={2} />{label}
              </button>
            ))}
          </div>
          {groupType && groupType !== 'Solo' && (
            <div className="group-size-row">
              <label htmlFor="group-size">Number of travellers</label>
              <input id="group-size" type="number" min="2" max="40" value={groupSize} onChange={(e) => setGroupSize(e.target.value)} className="group-size-input" />
            </div>
          )}
        </Section>

        <Section icon={Calendar} label="When are you travelling">
          <div className="pref-grid">
            <div className="pref-field">
              <label className="pref-label" htmlFor="trip-start">Start date</label>
              <div className="date-input-wrap">
                <input
                  id="trip-start" type="date" className="pref-select pref-date"
                  min={todayISO()} value={startDate}
                  onChange={(e) => handleStartDate(e.target.value)}
                />
                <Calendar size={16} strokeWidth={2} className="date-input-icon" aria-hidden="true" />
              </div>
            </div>
            <div className="pref-field">
              <label className="pref-label" htmlFor="trip-end">End date</label>
              <div className="date-input-wrap">
                <input
                  id="trip-end" type="date" className="pref-select pref-date"
                  min={startDate || todayISO()} value={endDate}
                  onChange={(e) => handleEndDate(e.target.value)}
                  disabled={!startDate}
                />
                <Calendar size={16} strokeWidth={2} className="date-input-icon" aria-hidden="true" />
              </div>
            </div>
          </div>
          {dateError && <p className="pref-error">{dateError}</p>}
          {datesConfirmed ? (
            <p className="pref-microcopy pref-dates-confirmed">
              <CalendarDays size={13} strokeWidth={2.25} />
              {formatDateLabel(startDate)} → {formatDateLabel(endDate)} · auto-calculated to <strong>{tripLength} {tripLength === 1 ? 'day' : 'days'}</strong>
            </p>
          ) : (
            <p className="pref-microcopy">Pick your start and end date — we'll work out the trip length for you.</p>
          )}
        </Section>

        <Section icon={Plane} label="Getting there">
          <div className="chip-row">
            {TRAVEL_MODES.map(({ label, icon: Icon }) => (
              <button type="button" key={label} className={`chip ${travelMode === label ? 'chip-active' : ''}`} onClick={() => setTravelMode(label)}>
                <Icon size={14} strokeWidth={2} />{label}
              </button>
            ))}
          </div>
          {travelMode && (
            <p className="pref-microcopy pref-transport-lock">
              <Lock size={12} strokeWidth={2.25} />
              {travelMode === 'Flight'
                ? `~${formatRs(12500)}/person avg. roundtrip flight · Grounded budget floor locked below for ${groupSizeNum} ${groupSizeNum === 1 ? 'traveller' : 'travellers'}.`
                : `~${formatRs(TRAVEL_MODE_COST[travelMode] ?? 2500)}/person avg. ${travelMode.toLowerCase()} fare · ${formatRs(effectiveBudgetFloor)} reserved for ${groupSizeNum} ${groupSizeNum === 1 ? 'traveller' : 'travellers'}.`
              }
            </p>
          )}
        </Section>

        <Section icon={Wallet} label="Budget & length">
          <div className="pref-grid">
            <div className="pref-field">
              <label className="pref-label">
                Budget
                {readyForBudget
                  ? <span className="pref-value">₹{budget.toLocaleString()}</span>
                  : <span className="pref-value pref-value-muted"><Lock size={11} strokeWidth={2} /> locked</span>}
              </label>
              <div className="slider-wrap">
                {readyForBudget && (
                  <span className="slider-bubble" style={{ left: `${budgetPct}%` }}>
                    ₹{Math.round(budget / 1000)}k
                  </span>
                )}
                <input
                  type="range"
                  min={budgetRange.min}
                  max={budgetRange.max}
                  step={budgetRange.step}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="pref-slider"
                  disabled={!readyForBudget}
                  style={{ '--fill': `${readyForBudget ? budgetPct : 0}%` }}
                />
              </div>

              {/* Dynamic Flight Budget Lock Callout Banner */}
              {travelMode === 'Flight' && (
                <div className="flight-budget-lock-banner">
                  <div className="flight-lock-pill-title">
                    <Lock size={13} strokeWidth={2.4} color="#38bdf8" />
                    <span>Flight Minimum Budget Locked: ₹{budgetRange.min.toLocaleString()}</span>
                  </div>
                  <p className="flight-lock-explanation">
                    ⚡ <strong>Realistic Cost Lock:</strong> Takes into account actual roundtrip flights (~₹{(12500 * groupSizeNum).toLocaleString()} for {groupSizeNum} {groupSizeNum === 1 ? 'traveller' : 'travellers'}), verified stays ({nightsCount} nights × {roomsNeededCount} room{roomsNeededCount > 1 ? 's' : ''} = ~₹{(2200 * nightsCount * roomsNeededCount).toLocaleString()}), and daily allowances (~₹{(800 * tripDaysCount * groupSizeNum).toLocaleString()}).
                    Prevents unviable flight trip estimates where flights alone exceed the overall budget.
                  </p>
                </div>
              )}

              {readyForBudget ? (
                <p className="pref-microcopy">
                  {travelMode === 'Flight'
                    ? `Price locked to realistic flight + hotel costs for ${groupSizeNum} ${groupSizeNum === 1 ? 'traveller' : 'travellers'} (${tripDaysCount} days).`
                    : `Range tuned to typical trip cost for ${groupSize || 1} ${Number(groupSize) === 1 ? 'traveller' : 'travellers'} by ${travelMode.toLowerCase()}.`
                  }
                </p>
              ) : (
                <p className="pref-microcopy">Pick who's coming and how you're travelling to unlock this.</p>
              )}
            </div>

            <div className="pref-field">
              <label className="pref-label">
                Trip length
                <span className="pref-value">
                  {datesConfirmed && <CalendarDays size={11} strokeWidth={2.25} />}
                  {days} {days === 1 ? 'day' : 'days'}
                </span>
              </label>
              <div className="trip-length-readout">
                <CalendarDays size={16} strokeWidth={2} />
                <span>{days} {days === 1 ? 'day' : 'days'}</span>
              </div>
              <p className="pref-microcopy">
                {datesConfirmed
                  ? 'Auto-calculated from your travel dates above.'
                  : 'Set your travel dates above to calculate trip length.'}
              </p>
            </div>
          </div>

          {tripInsight && (
            <div className={`budget-insight budget-insight-${tripInsight.band}`}>
              <div className="budget-insight-main">
                <div>
                  <span className="budget-kicker">Rough idea for {tripInsight.destination} · {tripInsight.groupSize} {tripInsight.groupSize === 1 ? 'traveller' : 'travellers'}</span>
                  <h3>{tripInsight.tierLabel} trip estimate</h3>
                </div>
                <div className="budget-total">
                  <span>{days} {days === 1 ? 'day' : 'days'}</span>
                  <strong>{tripInsight.estimatedTotal}</strong>
                </div>
              </div>

              <div className="budget-insight-grid">
                <div className="insight-mini insight-mini-strong">
                  <Lock size={15} strokeWidth={2.3} />
                  <span>Minimum suggested budget</span>
                  <strong>{tripInsight.minimumBudget}</strong>
                </div>
                <div className="insight-mini">
                  <Wallet size={15} strokeWidth={2.3} />
                  <span>Stay & food</span>
                  <strong>{tripInsight.dailyRange}</strong>
                </div>
                <div className="insight-mini">
                  <ShieldCheck size={15} strokeWidth={2.3} />
                  <span>Transport (locked)</span>
                  <strong>{tripInsight.transportEstimate}</strong>
                </div>
                <div className="insight-mini">
                  <CalendarDays size={15} strokeWidth={2.3} />
                  <span>Budget fit</span>
                  <strong>{tripInsight.bandLabel}</strong>
                </div>
              </div>

              <p className="budget-readout">{tripInsight.bandCopy}</p>
            </div>
          )}
        </Section>

        <Section icon={Sun} label="Weather & style">
          <div className="pref-field">
            <div className="chip-row">
              {WEATHER_OPTIONS.map(({ label, icon: Icon }) => (
                <button type="button" key={label} className={`chip ${weather === label ? 'chip-active' : ''}`} onClick={() => setWeather(label)}>
                  <Icon size={14} strokeWidth={2} />{label}
                </button>
              ))}
            </div>
          </div>
          <div className="pref-field">
            <label className="pref-label pref-label-sub">Trip type <span className="pref-hint">(pick any)</span></label>
            <div className="chip-row">
              {VIBE_OPTIONS.map(({ label, icon: Icon }) => (
                <button type="button" key={label} className={`chip ${vibes.includes(label) ? 'chip-active' : ''}`} onClick={() => toggleVibe(label)}>
                  <Icon size={14} strokeWidth={2} />{label}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section icon={Briefcase} label="A bit more about the trip" hint="(optional)">
          <div className="pref-field">
            <label className="pref-label pref-label-sub">What's this trip for?</label>
            <div className="chip-row">
              {TRIP_PURPOSES.map(({ label, icon: Icon }) => (
                <button type="button" key={label} className={`chip ${tripPurpose === label ? 'chip-active' : ''}`} onClick={() => setTripPurpose(tripPurpose === label ? '' : label)}>
                  <Icon size={14} strokeWidth={2} />{label}
                </button>
              ))}
            </div>
          </div>
          <div className="pref-field">
            <label className="pref-label pref-label-sub">Where would you like to stay?</label>
            <div className="chip-row">
              {STAY_OPTIONS.map(({ label, icon: Icon }) => (
                <button type="button" key={label} className={`chip ${stayPreference === label ? 'chip-active' : ''}`} onClick={() => setStayPreference(stayPreference === label ? '' : label)}>
                  <Icon size={14} strokeWidth={2} />{label}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section icon={History} label="Been there before?" hint="(optional)">
          <div className="place-input-row">
            <input
              type="text" className="place-input" placeholder="Type a place and hit enter…"
              value={placeInput} onChange={(e) => setPlaceInput(e.target.value)} onKeyDown={handlePlaceKeyDown}
            />
            <button type="button" className="place-add-btn" onClick={() => addPlace(placeInput)}>
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>
          <div className="chip-row">
            {PLACE_SUGGESTIONS.filter((p) => !placesVisited.includes(p)).map((p) => (
              <button type="button" key={p} className="chip chip-ghost" onClick={() => addPlace(p)}>
                <Plus size={12} strokeWidth={2} /> {p}
              </button>
            ))}
          </div>
          {placesVisited.length > 0 && (
            <div className="chip-row">
              {placesVisited.map((p) => (
                <span className="chip chip-tag" key={p}>
                  {p}
                  <button type="button" className="chip-remove" onClick={() => removePlace(p)} aria-label={`Remove ${p}`}>
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Section>

        {error && <p className="pref-error">{error}</p>}

        <button type="submit" className="pref-submit" disabled={searching}>
          <span className="pref-submit-shine" />
          {searching ? 'Charting your route…' : 'Find My Destinations'}
          {!searching && <ArrowRight size={16} strokeWidth={2} />}
        </button>

        {confirmed && (
          <div className="pref-confirm">
            <span className="pref-stamp"><Stamp size={13} strokeWidth={2.5} /> Confirmed</span>
            <Check size={15} strokeWidth={2.5} />
            Searching {countryName} for {weather.toLowerCase()} trips.
          </div>
        )}
      </div>
    </form>
  );
}
