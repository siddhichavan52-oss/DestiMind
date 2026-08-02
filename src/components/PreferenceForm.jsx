import { useMemo, useState } from 'react';
import {
  MapPin, Sun, Snowflake, CloudSun, Palmtree, Sparkles,
  Mountain, Waves, Landmark, Music, Trees, UtensilsCrossed,
  Wallet, Calendar, ArrowRight, Check, Compass
} from 'lucide-react';
import './PreferenceForm.css';

const CONTINENTS = [
  { label: 'Europe', angle: 0 },
  { label: 'Asia', angle: 60 },
  { label: 'Africa', angle: 120 },
  { label: 'Oceania', angle: 180 },
  { label: 'South America', angle: 240 },
  { label: 'North America', angle: 300 },
];

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

export default function PreferenceForm() {
  const [continent, setContinent] = useState('');
  const [weather, setWeather] = useState('');
  const [vibes, setVibes] = useState([]);
  const [budget, setBudget] = useState(50000);
  const [days, setDays] = useState(5);
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  function toggleVibe(vibe) {
    setVibes((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe]
    );
  }

  const needleAngle = useMemo(() => {
    const found = CONTINENTS.find((c) => c.label === continent);
    return found ? found.angle : -1; // -1 = resting position
  }, [continent]);

  const progress = (continent ? 1 : 0) + (weather ? 1 : 0) + (vibes.length > 0 ? 1 : 0);
  const progressPct = (progress / 3) * 100;

  const estimatedMatches = useMemo(() => {
    let base = 480;
    base *= Math.pow(0.55, progress);
    if (vibes.length > 1) base *= Math.pow(0.85, vibes.length - 1);
    return Math.max(3, Math.round(base));
  }, [progress, vibes.length]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!continent || !weather) {
      setError('Please pick a continent and a weather vibe.');
      setConfirmed(false);
      return;
    }
    setError('');
    setSearching(true);
    setConfirmed(false);

    const preferences = { continent, weather, vibes, budget, days };
    // TODO: once backend is ready, send `preferences` to the API
    // and navigate to /results with the response.
    console.log('Preferences submitted:', preferences);

    setTimeout(() => {
      setSearching(false);
      setConfirmed(true);
      setTimeout(() => setConfirmed(false), 4000);
    }, 1000);
  }

  const budgetPct = ((budget - 10000) / (300000 - 10000)) * 100;
  const daysPct = ((days - 1) / (30 - 1)) * 100;

  const RING_R = 30;
  const RING_C = 2 * Math.PI * RING_R;

  return (
    <form className="pref-form" onSubmit={handleSubmit}>
      <div className="pref-form-heading">
        <div className="pref-heading-text">
          <span className="pref-eyebrow">Your travel profile</span>
          <h2 className="pref-title">What are you in the mood for?</h2>
          <p className="pref-subtitle">Five quick picks, then we'll do the searching.</p>
        </div>

        <div className={`compass-dial ${searching ? 'compass-searching' : ''}`} role="img" aria-label="Match progress compass">
          <svg viewBox="0 0 80 80" width="72" height="72">
            <circle cx="40" cy="40" r={RING_R} className="compass-track" />
            <circle
              cx="40" cy="40" r={RING_R}
              className="compass-progress"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C - (RING_C * progressPct) / 100}
            />
            <g
              className="compass-needle"
              style={{ transform: `rotate(${needleAngle < 0 ? 0 : needleAngle}deg)` }}
            >
              <polygon points="40,14 44,40 40,40 36,40" className="needle-north" />
              <polygon points="40,66 44,40 40,40 36,40" className="needle-south" />
            </g>
            <circle cx="40" cy="40" r="4" className="compass-hub" />
          </svg>
          <span className="compass-caption">
            {searching ? 'charting…' : `${progress}/3 set`}
          </span>
        </div>
      </div>

      <div className="match-estimate">
        <Compass size={14} strokeWidth={2} />
        <span>
          {continent && weather
            ? <><strong>{estimatedMatches}</strong> destinations match so far</>
            : 'Start picking to see how many places match'}
        </span>
      </div>

      <div className="pref-grid">
        <div className="pref-field">
          <label className="pref-label">
            <MapPin size={16} strokeWidth={2} /> Continent
          </label>
          <select
            className="pref-select"
            value={continent}
            onChange={(e) => setContinent(e.target.value)}
          >
            <option value="">Select a continent</option>
            {CONTINENTS.map((c) => (
              <option key={c.label} value={c.label}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="pref-field">
          <label className="pref-label">
            <Wallet size={16} strokeWidth={2} /> Budget
            <span className="pref-value">₹{budget.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="10000"
            max="300000"
            step="5000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="pref-slider"
            style={{ '--fill': `${budgetPct}%` }}
          />
        </div>
      </div>

      <div className="pref-field">
        <label className="pref-label">Weather vibe</label>
        <div className="chip-row">
          {WEATHER_OPTIONS.map(({ label, icon: Icon }) => (
            <button
              type="button"
              key={label}
              className={`chip ${weather === label ? 'chip-active' : ''}`}
              onClick={() => setWeather(label)}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="pref-field">
        <label className="pref-label">Trip type <span className="pref-hint">(pick any)</span></label>
        <div className="chip-row">
          {VIBE_OPTIONS.map(({ label, icon: Icon }) => (
            <button
              type="button"
              key={label}
              className={`chip ${vibes.includes(label) ? 'chip-active' : ''}`}
              onClick={() => toggleVibe(label)}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="pref-field">
        <label className="pref-label">
          <Calendar size={16} strokeWidth={2} /> Trip length
          <span className="pref-value">{days} {days === 1 ? 'day' : 'days'}</span>
        </label>
        <input
          type="range"
          min="1"
          max="30"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="pref-slider"
          style={{ '--fill': `${daysPct}%` }}
        />
      </div>

      {error && <p className="pref-error">{error}</p>}

      <button type="submit" className="pref-submit" disabled={searching}>
        {searching ? 'Charting your route…' : 'Find My Destinations'}
        {!searching && <ArrowRight size={16} strokeWidth={2} />}
      </button>

      {confirmed && (
        <div className="pref-confirm">
          <Check size={16} strokeWidth={2.5} />
          Got it — searching {continent} for {weather.toLowerCase()} trips.
        </div>
      )}
    </form>
  );
}