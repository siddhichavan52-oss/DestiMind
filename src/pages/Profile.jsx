import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Sparkles,
  Plus,
  X,
  Waves,
  Mountain,
  TreePine,
  Building2,
  Sun,
  Landmark,
  PartyPopper,
  PawPrint,
} from 'lucide-react';
import { getSession } from '../utils/auth';
import { saveProfile, getProfile } from '../utils/profile';
import './Auth.css';
import './Profile.css';

const VIBES = [
  { id: 'beaches', label: 'Beaches', icon: Waves },
  { id: 'mountains', label: 'Mountains', icon: Mountain },
  { id: 'forests', label: 'Forests', icon: TreePine },
  { id: 'cities', label: 'Cities', icon: Building2 },
  { id: 'desert', label: 'Desert', icon: Sun },
  { id: 'historical', label: 'Historical', icon: Landmark },
  { id: 'nightlife', label: 'Nightlife', icon: PartyPopper },
  { id: 'wildlife', label: 'Wildlife', icon: PawPrint },
];

const MIN_DESTINATIONS = 3;
const MAX_DESTINATIONS = 6;

export default function Profile() {
  const navigate = useNavigate();
  const session = getSession();
  const existing = session ? getProfile(session.email) : null;

  const allCountries = useMemo(() => Country.getAllCountries(), []);

  const [countryCode, setCountryCode] = useState(existing?.countryCode || '');
  const [stateCode, setStateCode] = useState(existing?.stateCode || '');
  const [city, setCity] = useState(existing?.city || '');
  const [destinations, setDestinations] = useState(
    existing?.destinations?.length
      ? [...existing.destinations, ...Array(MAX_DESTINATIONS).fill('')].slice(
          0,
          Math.max(MIN_DESTINATIONS, existing.destinations.length)
        )
      : Array(MIN_DESTINATIONS).fill('')
  );
  const [vibes, setVibes] = useState(existing?.vibes || []);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const states = useMemo(
    () => (countryCode ? State.getStatesOfCountry(countryCode) : []),
    [countryCode]
  );
  const cities = useMemo(
    () => (countryCode && stateCode ? City.getCitiesOfState(countryCode, stateCode) : []),
    [countryCode, stateCode]
  );

  if (!session) {
    return null;
  }

  function handleDestinationChange(index, value) {
    setDestinations((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function addDestinationField() {
    setDestinations((prev) => (prev.length < MAX_DESTINATIONS ? [...prev, ''] : prev));
  }

  function removeDestinationField(index) {
    setDestinations((prev) => {
      if (prev.length <= MIN_DESTINATIONS) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }

  function toggleVibe(id) {
    setVibes((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  }

  function validate() {
    const next = {};
    const filledDestinations = destinations.map((d) => d.trim()).filter(Boolean);

    if (!countryCode) next.country = 'Pick your country.';
    if (states.length > 0 && !stateCode) next.state = 'Pick your state.';
    if (cities.length > 0 && !city) next.city = 'Pick your city.';
    if (filledDestinations.length < MIN_DESTINATIONS) {
      next.destinations = `Add at least ${MIN_DESTINATIONS} favourite destinations.`;
    }
    if (vibes.length === 0) next.vibes = 'Pick at least one vibe.';

    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      setSaved(false);
      return;
    }

    const countryName = Country.getCountryByCode(countryCode)?.name || '';
    const stateName = states.find((s) => s.isoCode === stateCode)?.name || '';

    saveProfile(session.email, {
      countryCode,
      country: countryName,
      stateCode,
      state: stateName,
      city,
      destinations: destinations.map((d) => d.trim()).filter(Boolean),
      vibes,
    });

    setErrors({});
    setSaved(true);
    setTimeout(() => navigate('/home'), 900);
  }

  return (
    <div className="profile-page">
      <header className="nav profile-nav">
        <Link to="/home" className="nav-brand">
          <Compass size={20} strokeWidth={1.75} />
          <span>DestiMind</span>
        </Link>
        <Link to="/home" className="profile-back">
          <ArrowLeft size={16} strokeWidth={2} />
          Back home
        </Link>
      </header>

      <section className="profile-hero">
        <div className="profile-card">
          <div className="profile-identity">
            <div className="profile-avatar profile-avatar-lg">
              {session.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="profile-name">{session.name}</p>
              <p className="profile-email">{session.email}</p>
            </div>
          </div>

          <span className="profile-eyebrow">
            <Sparkles size={14} strokeWidth={2} />
            Tell us what you love
          </span>
          <h1 className="profile-title">Build your travel profile</h1>
          <p className="profile-subtitle">
            This helps DestiMind match you with places you'll actually want to visit.
          </p>

          {saved ? (
            <div className="profile-success">Profile saved — taking you home.</div>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit} noValidate>
              <div className="profile-section">
                <p className="profile-section-title">
                  <MapPin size={15} strokeWidth={2} />
                  Where are you based?
                </p>

                <div className="profile-grid">
                  <label className="field">
                    <span className="field-label">Country</span>
                    <select
                      className={`field-select ${errors.country ? 'field-error' : ''}`}
                      value={countryCode}
                      onChange={(e) => {
                        setCountryCode(e.target.value);
                        setStateCode('');
                        setCity('');
                      }}
                    >
                      <option value="">Select country</option>
                      {allCountries.map((c) => (
                        <option key={c.isoCode} value={c.isoCode}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.country && <span className="field-hint">{errors.country}</span>}
                  </label>

                  <label className="field">
                    <span className="field-label">State</span>
                    <select
                      className={`field-select ${errors.state ? 'field-error' : ''}`}
                      value={stateCode}
                      onChange={(e) => {
                        setStateCode(e.target.value);
                        setCity('');
                      }}
                      disabled={!countryCode || states.length === 0}
                    >
                      <option value="">
                        {countryCode && states.length === 0 ? 'No states listed' : 'Select state'}
                      </option>
                      {states.map((s) => (
                        <option key={s.isoCode} value={s.isoCode}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {errors.state && <span className="field-hint">{errors.state}</span>}
                  </label>

                  <label className="field">
                    <span className="field-label">City</span>
                    <select
                      className={`field-select ${errors.city ? 'field-error' : ''}`}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={!stateCode || cities.length === 0}
                    >
                      <option value="">
                        {stateCode && cities.length === 0 ? 'No cities listed' : 'Select city'}
                      </option>
                      {cities.map((ct) => (
                        <option key={`${ct.name}-${ct.latitude}`} value={ct.name}>
                          {ct.name}
                        </option>
                      ))}
                    </select>
                    {errors.city && <span className="field-hint">{errors.city}</span>}
                  </label>
                </div>
              </div>

              <div className="profile-section">
                <p className="profile-section-title">
                  <Sparkles size={15} strokeWidth={2} />
                  Favourite destinations
                  <span className="profile-section-hint">— at least {MIN_DESTINATIONS}</span>
                </p>

                <div className="destination-list">
                  {destinations.map((value, index) => (
                    <div className="destination-row" key={index}>
                      <div className="field-input">
                        <MapPin size={16} strokeWidth={1.75} />
                        <input
                          type="text"
                          placeholder={`Destination ${index + 1}`}
                          value={value}
                          onChange={(e) => handleDestinationChange(index, e.target.value)}
                        />
                      </div>
                      {destinations.length > MIN_DESTINATIONS && (
                        <button
                          type="button"
                          className="destination-remove"
                          onClick={() => removeDestinationField(index)}
                          aria-label="Remove destination"
                        >
                          <X size={15} strokeWidth={2} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {destinations.length < MAX_DESTINATIONS && (
                  <button type="button" className="destination-add" onClick={addDestinationField}>
                    <Plus size={14} strokeWidth={2} />
                    Add another
                  </button>
                )}
                {errors.destinations && <span className="field-hint">{errors.destinations}</span>}
              </div>

              <div className="profile-section">
                <p className="profile-section-title">
                  <Compass size={15} strokeWidth={2} />
                  What's your vibe?
                </p>

                <div className="vibe-grid">
                  {VIBES.map(({ id, label, icon: Icon }) => {
                    const active = vibes.includes(id);
                    return (
                      <button
                        type="button"
                        key={id}
                        className={`vibe-chip ${active ? 'vibe-chip-active' : ''}`}
                        onClick={() => toggleVibe(id)}
                      >
                        <Icon size={18} strokeWidth={1.75} />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.vibes && <span className="field-hint">{errors.vibes}</span>}
              </div>

              <button type="submit" className="auth-submit profile-submit">
                Save profile
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
