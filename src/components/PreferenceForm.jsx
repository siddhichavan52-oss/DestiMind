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
import './PreferenceForm.css';

// DestiMind is India-only for now, so the destination country is fixed
// and the picker below only asks for state (required) and city (optional).
const COUNTRY_CODE = 'IN';
const COUNTRY_NAME = 'India';

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
  const destination = stateName || countryName;
  const size = Math.max(Number(groupSize) || 1, 1);

  const travelCostPerPerson = TRAVEL_MODE_COST[travelMode] ?? TRAVEL_MODE_COST.Flexible;
  const travelTotal = travelCostPerPerson * size;

  const stayLow = hint.daily[0] * days * size;
  const stayHigh = hint.daily[1] * days * size;

  const totalLow = stayLow + travelTotal;
  const totalHigh = stayHigh + travelTotal;

  const band = getBudgetBand(budget, days, size, hint);

  const groupWord = size === 1 ? 'traveller' : 'travellers';

  const bandCopy = {
    tight: `Selected budget is below the suggested minimum for ${size} ${groupWord} travelling by ${travelMode.toLowerCase()}, so keep the plan compact.`,
    balanced: `This range covers stays, food and local transport for ${size} ${groupWord}, plus around ${formatRs(travelTotal)} for ${travelMode.toLowerCase()} to get there.`,
    comfortable: `This budget gives extra room for better stays and paid experiences for ${size} ${groupWord}, on top of ~${formatRs(travelTotal)} for ${travelMode.toLowerCase()}.`,
  };

  const bandLabel = {
    tight: 'Below suggested minimum',
    balanced: 'Good fit for this trip',
    comfortable: 'Comfortable plan possible',
  };

  return {
    destination,
    tierLabel: hint.label,
    estimatedTotal: `${formatRs(totalLow)} - ${formatRs(totalHigh)}`,
    minimumBudget: formatRs(totalLow),
    dailyRange: `${formatRs(hint.daily[0])} - ${formatRs(hint.daily[1])}/person/day`,
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

  const [weather, setWeather] = useState('');
  const [vibes, setVibes] = useState([]);
  const indiaTier = COUNTRY_TIER[COUNTRY_CODE] || 'mid';
  const [baseRange, setBaseRange] = useState(TIER_RANGES[indiaTier]);
  const [budget, setBudget] = useState(TIER_RANGES[indiaTier].default);
  const [days, setDays] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState('');

  const [travelMode, setTravelMode] = useState('');
  const [groupType, setGroupType] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [placesVisited, setPlacesVisited] = useState([]);
  const [placeInput, setPlaceInput] = useState('');
  const [tripPurpose, setTripPurpose] = useState('');
  const [stayPreference, setStayPreference] = useState('');

  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const [homeProfile, setHomeProfile] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (!session) return;

    function loadHomeProfile() {
      setHomeProfile(getProfile(session.email));
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
    state: !!stateCode,
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

  // Budget only becomes meaningful once we know the destination tier,
  // the group size, and the mode of travel — all three shape the estimate.
  const readyForBudget = !!(countryCode && groupType && travelMode);

  const groupSizeNum = Math.max(Number(groupSize) || 1, 1);

  // Once a travel mode is picked, its average ticket price (round trip, per
  // person) is reserved off the top of the budget range — the slider can no
  // longer drop below what getting there actually costs.
  const transportFloor = travelMode
    ? (TRAVEL_MODE_COST[travelMode] ?? TRAVEL_MODE_COST.Flexible) * groupSizeNum
    : 0;

  const budgetRange = useMemo(() => {
    const min = baseRange.min + transportFloor;
    const max = Math.max(baseRange.max, min + baseRange.step);
    return { ...baseRange, min, max, default: Math.max(baseRange.default, min) };
  }, [baseRange, transportFloor]);

  // Keep the current slider value inside whatever range the transport lock
  // just produced, so it never gets stranded below the new floor.
  useEffect(() => {
    setBudget((prev) => {
      if (prev < budgetRange.min) return budgetRange.min;
      if (prev > budgetRange.max) return budgetRange.max;
      return prev;
    });
  }, [budgetRange.min, budgetRange.max]);

  const tripLength = startDate && endDate ? daysBetween(startDate, endDate) : null;
  const datesConfirmed = !!(startDate && endDate && tripLength);

  function handleSubmit(e) {
    e.preventDefault();
    if (!stateCode) {
      setError('Please pick a state.');
      setConfirmed(false);
      return;
    }
    if (!groupType) {
      setError('Please tell us who is coming.');
      setConfirmed(false);
      return;
    }
    if (!travelMode) {
      setError('Please pick a mode of travel.');
      setConfirmed(false);
      return;
    }
    if (!weather) {
      setError('Please pick a weather preference.');
      setConfirmed(false);
      return;
    }
    if (!startDate || !endDate) {
      setError('Please choose your travel start and end dates.');
      setConfirmed(false);
      return;
    }
    setError('');
    setSearching(true);
    setConfirmed(false);

    const countryName = COUNTRY_NAME;
    const stateName = stateCode ? State.getStateByCodeAndCountry(stateCode, countryCode)?.name || '' : '';

    const preferences = {
      country: countryName,
      countryCode,
      state: stateName || null,
      city: cityName || null,
      weather,
      vibes,
      budget,
      days,
      startDate,
      endDate,
      travelMode,
      transportBudgetLocked: transportFloor,
      groupType,
      groupSize: groupSize ? Number(groupSize) : null,
      placesVisitedBefore: placesVisited,
      tripPurpose: tripPurpose || null,
      stayPreference: stayPreference || null,
    };
    // TODO: once backend is ready, send `preferences` to the API and
    // use the response instead of (or alongside) the local preferences
    // object below. `placesVisitedBefore` isn't used for matching yet —
    // it's captured now so the recommendation model has rich signal to
    // train on later.
    console.log('Preferences submitted:', preferences);

    setTimeout(() => {
      setSearching(false);
      setConfirmed(true);

      // Show the success message briefly, then move on to the Results page.
      setTimeout(() => {
        setConfirmed(false);
        navigate('/results', {
          state: preferences,
        });
      }, 1000);
    }, 1100);
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
    { key: 'where', icon: MapPin, label: 'Where', value: stateName ? `${stateName}${cityName ? `, ${cityName}` : ''}` : null },
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
            ? <><strong>{estimatedMatches}</strong> destinations match so far</>
            : 'Pick a state to see live matches'}
        </div>

        <FlightRoute filled={filled} destCode={stateCode || countryCode} />

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
              Traveling from
            </span>
            {travelingFromLabel ? (
              <span className="pf-from-pill">{travelingFromLabel}</span>
            ) : (
              <Link to="/profile" className="pf-from-empty">
                Set your home location →
              </Link>
            )}
          </div>

          <div className="pref-grid">
            <div className="pref-field">
              <label className="pref-label">State</label>
              <select
                className="pref-select"
                value={stateCode}
                onChange={(e) => handleStateChange(e.target.value)}
              >
                <option value="">Select a state</option>
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
                  {!stateCode ? 'Pick a state first' : cityOptions.length === 0 ? 'No cities listed' : 'Any city in this state'}
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
              ~{formatRs(TRAVEL_MODE_COST[travelMode] ?? TRAVEL_MODE_COST.Flexible)}/person avg. {travelMode.toLowerCase()} fare · {formatRs(transportFloor)} reserved for {groupSizeNum} {groupSizeNum === 1 ? 'traveller' : 'travellers'} in your budget floor below.
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
              {readyForBudget ? (
                <p className="pref-microcopy">Range tuned to {countryName}'s typical trip cost for {groupSize || 1} {Number(groupSize) === 1 ? 'traveller' : 'travellers'} by {travelMode.toLowerCase()}.</p>
              ) : (
                <p className="pref-microcopy">Pick a country, who's coming, and how you're travelling to unlock this.</p>
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