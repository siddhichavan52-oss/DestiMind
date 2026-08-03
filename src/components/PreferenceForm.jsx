import { useMemo, useState } from 'react';
import { Country, State } from 'country-state-city';
import {
  MapPin, Globe2, Sun, Snowflake, CloudSun, Palmtree, Sparkles,
  Mountain, Waves, Landmark, Music, Trees, UtensilsCrossed,
  Wallet, ArrowRight, Check, Plane, TrainFront,
  Car, Ship, Users, User, Heart, UsersRound, History, X, Plus, Lock, Stamp,
} from 'lucide-react';
import './PreferenceForm.css';

/* ------------------------------------------------------------------ */
/*  Location data — continents map to a curated set of popular travel  */
/*  countries. Country -> State/Province lists come from the real      */
/*  `country-state-city` dataset already in package.json, so the       */
/*  state dropdown is genuine geographic data, not guesswork.          */
/* ------------------------------------------------------------------ */

const CONTINENTS = [
  { label: 'Europe', codes: ['FR', 'IT', 'ES', 'CH', 'GR', 'DE', 'PT', 'GB', 'NL', 'IS'] },
  { label: 'Asia', codes: ['IN', 'JP', 'TH', 'ID', 'VN', 'AE', 'SG', 'LK', 'MV', 'CN'] },
  { label: 'Africa', codes: ['ZA', 'KE', 'MA', 'EG', 'TZ', 'MU', 'NA'] },
  { label: 'Oceania', codes: ['AU', 'NZ', 'FJ', 'PF'] },
  { label: 'South America', codes: ['BR', 'AR', 'PE', 'CL', 'CO', 'EC'] },
  { label: 'North America', codes: ['US', 'CA', 'MX', 'CU', 'CR'] },
];

// Cost-of-travel tier per destination country. Drives the budget
// slider's range/default so ₹40,000 means something different for
// Thailand than it does for Switzerland, instead of one-size-fits-all.
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

// The five compulsory picks, in the order the route map visualises them.
// Waypoints arc gently upward like a real flight-route map, and the
// colour drifts teal -> amber -> coral across the journey (sunrise to
// sunset), matching the home hero's own gradient direction.
const WAYPOINTS = [
  { key: 'continent', label: 'Continent', icon: Globe2, x: 22, y: 64, color: '#4FD1C5' },
  { key: 'country', label: 'Country', icon: MapPin, x: 104, y: 24, color: '#7BCDBA' },
  { key: 'weather', label: 'Weather', icon: Sun, x: 186, y: 60, color: '#FFB347' },
  { key: 'travelMode', label: 'Mode', icon: Plane, x: 268, y: 22, color: '#FF9A63' },
  { key: 'groupType', label: 'Group', icon: Users, x: 344, y: 56, color: '#FF6F5E' },
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
  const [continent, setContinent] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [stateCode, setStateCode] = useState('');

  const [weather, setWeather] = useState('');
  const [vibes, setVibes] = useState([]);
  const [budgetRange, setBudgetRange] = useState(TIER_RANGES.mid);
  const [budget, setBudget] = useState(TIER_RANGES.mid.default);
  const [days, setDays] = useState(5);

  const [travelMode, setTravelMode] = useState('');
  const [groupType, setGroupType] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [placesVisited, setPlacesVisited] = useState([]);
  const [placeInput, setPlaceInput] = useState('');

  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const countryOptions = useMemo(() => {
    const active = CONTINENTS.find((c) => c.label === continent);
    if (!active) return [];
    return active.codes
      .map((code) => Country.getCountryByCode(code))
      .filter(Boolean)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [continent]);

  const stateOptions = useMemo(() => {
    if (!countryCode) return [];
    return State.getStatesOfCountry(countryCode).sort((a, b) => a.name.localeCompare(b.name));
  }, [countryCode]);

  function handleContinentChange(value) {
    setContinent(value);
    setCountryCode('');
    setStateCode('');
  }

  function handleCountryChange(code) {
    setCountryCode(code);
    setStateCode('');
    const tier = COUNTRY_TIER[code] || 'mid';
    const range = TIER_RANGES[tier];
    setBudgetRange(range);
    setBudget(range.default);
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
    continent: !!continent,
    country: !!countryCode,
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
    return Math.max(3, Math.round(base));
  }, [progress, vibes.length, stateCode]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!continent || !countryCode) {
      setError('Please pick a continent, then a country.');
      setConfirmed(false);
      return;
    }
    if (!weather || !travelMode || !groupType) {
      setError('A few more picks needed: weather, mode of travel and group.');
      setConfirmed(false);
      return;
    }
    setError('');
    setSearching(true);
    setConfirmed(false);

    const countryName = Country.getCountryByCode(countryCode)?.name || '';
    const stateName = stateCode ? State.getStateByCodeAndCountry(stateCode, countryCode)?.name || '' : '';

    const preferences = {
      continent,
      country: countryName,
      countryCode,
      state: stateName || null,
      weather,
      vibes,
      budget,
      days,
      travelMode,
      groupType,
      groupSize: groupSize ? Number(groupSize) : null,
      placesVisitedBefore: placesVisited,
    };
    // TODO: once backend is ready, send `preferences` to the API and
    // navigate to /results with the response. `placesVisitedBefore`,
    // `travelMode` and `groupType`/`groupSize` aren't used for matching
    // yet — they're captured now so the recommendation model has rich
    // signal to train on later.
    console.log('Preferences submitted:', preferences);

    setTimeout(() => {
      setSearching(false);
      setConfirmed(true);
      setTimeout(() => setConfirmed(false), 4000);
    }, 1100);
  }

  const budgetPct = ((budget - budgetRange.min) / (budgetRange.max - budgetRange.min)) * 100;
  const daysPct = ((days - 1) / (30 - 1)) * 100;
  const countryName = countryCode ? Country.getCountryByCode(countryCode)?.name : '';
  const stateName = stateCode ? State.getStateByCodeAndCountry(stateCode, countryCode)?.name : '';

  const summaryRows = [
    { key: 'where', icon: MapPin, label: 'Where', value: countryName ? `${countryName}${stateName ? `, ${stateName}` : ''}` : null },
    { key: 'weather', icon: Sun, label: 'Weather', value: weather || null },
    { key: 'budget', icon: Wallet, label: 'Budget', value: countryCode ? `₹${budget.toLocaleString()}` : null },
    { key: 'mode', icon: Plane, label: 'Mode', value: travelMode || null },
    { key: 'group', icon: Users, label: 'Group', value: groupType ? `${groupType}${groupSize ? ` · ${groupSize}` : ''}` : null },
  ];

  return (
    <form className="pf-card" onSubmit={handleSubmit}>
      <div className="pf-stub">
        <span className="pf-eyebrow">Boarding · Travel profile</span>
        <h2 className="pf-title">Design your next trip</h2>
        <p className="pf-subtitle">Pick a destination and we'll tune the rest to it.</p>

        <div className="pf-estimate-pill">
          {continent && countryCode
            ? <><strong>{estimatedMatches}</strong> destinations match so far</>
            : 'Pick a continent to see live matches'}
        </div>

        <FlightRoute filled={filled} destCode={countryCode} />

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
          <div className="pref-grid pref-grid-3">
            <div className="pref-field">
              <label className="pref-label">Continent</label>
              <select className="pref-select" value={continent} onChange={(e) => handleContinentChange(e.target.value)}>
                <option value="">Select a continent</option>
                {CONTINENTS.map((c) => (
                  <option key={c.label} value={c.label}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="pref-field">
              <label className="pref-label">Country</label>
              <select
                className="pref-select"
                value={countryCode}
                onChange={(e) => handleCountryChange(e.target.value)}
                disabled={!continent}
              >
                <option value="">{continent ? 'Select a country' : 'Pick a continent first'}</option>
                {countryOptions.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

            <div className="pref-field">
              <label className="pref-label">
                State / Region <span className="pref-hint">(optional)</span>
              </label>
              <select
                className="pref-select"
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                disabled={!countryCode || stateOptions.length === 0}
              >
                <option value="">
                  {!countryCode ? 'Pick a country first' : stateOptions.length === 0 ? 'No states listed' : 'Any / whole country'}
                </option>
                {stateOptions.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
        </Section>

        <Section icon={Wallet} label="Budget & length">
          <div className="pref-grid">
            <div className="pref-field">
              <label className="pref-label">
                Budget
                {countryCode
                  ? <span className="pref-value">₹{budget.toLocaleString()}</span>
                  : <span className="pref-value pref-value-muted"><Lock size={11} strokeWidth={2} /> locked</span>}
              </label>
              <div className="slider-wrap">
                {countryCode && (
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
                  disabled={!countryCode}
                  style={{ '--fill': `${countryCode ? budgetPct : 0}%` }}
                />
              </div>
              {countryCode && <p className="pref-microcopy">Range tuned to {countryName}'s typical trip cost.</p>}
            </div>

            <div className="pref-field">
              <label className="pref-label">
                Trip length
                <span className="pref-value">{days} {days === 1 ? 'day' : 'days'}</span>
              </label>
              <div className="slider-wrap">
                <span className="slider-bubble" style={{ left: `${daysPct}%` }}>{days}d</span>
                <input
                  type="range" min="1" max="30" value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="pref-slider"
                  style={{ '--fill': `${daysPct}%` }}
                />
              </div>
            </div>
          </div>
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

        <Section icon={Plane} label="Getting there">
          <div className="chip-row">
            {TRAVEL_MODES.map(({ label, icon: Icon }) => (
              <button type="button" key={label} className={`chip ${travelMode === label ? 'chip-active' : ''}`} onClick={() => setTravelMode(label)}>
                <Icon size={14} strokeWidth={2} />{label}
              </button>
            ))}
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