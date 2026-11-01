import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { getSession, logoutUser } from '../utils/auth';
import './Home.css';
import PreferenceForm from '../components/PreferenceForm';
import ThemeToggle from '../components/ThemeToggle';

const PERSONA_PRESETS = [
  {
    id: 'techie',
    emoji: '💻',
    label: 'Burned-Out Techie',
    tagline: 'Peaceful hills, quiet stays, digital detox',
    preset: { weather: 'Cold & Snowy', vibes: ['Relaxation', 'Nature'], groupType: 'Solo', groupSize: '1', travelMode: 'Flexible', tripPurpose: 'Leisure', stayPreference: 'Homestay / Airbnb' },
  },
  {
    id: 'college',
    emoji: '🎒',
    label: 'College Squad',
    tagline: 'Budget thrills, epic road trips, nightlife',
    preset: { weather: 'Any', vibes: ['Adventure', 'Nightlife'], groupType: 'Friends', groupSize: '5', travelMode: 'Train', tripPurpose: 'Adventure', stayPreference: 'Hostel / Budget' },
  },
  {
    id: 'romantic',
    emoji: '🌅',
    label: 'Romantic Escape',
    tagline: 'Sunsets, cozy resorts, candlelight dinners',
    preset: { weather: 'Tropical', vibes: ['Relaxation', 'Food'], groupType: 'Couple', groupSize: '2', travelMode: 'Flight', tripPurpose: 'Honeymoon', stayPreference: 'Resort' },
  },
  {
    id: 'family',
    emoji: '👨‍👩‍👧‍👦',
    label: 'Family Vacation',
    tagline: 'Comfortable, kid-friendly, cultural gems',
    preset: { weather: 'Mild', vibes: ['Culture', 'Nature'], groupType: 'Family', groupSize: '4', travelMode: 'Flexible', tripPurpose: 'Leisure', stayPreference: 'Hotel' },
  },
  {
    id: 'solo',
    emoji: '🧭',
    label: 'Solo Explorer',
    tagline: 'Offbeat trails, local food, new cultures',
    preset: { weather: 'Any', vibes: ['Adventure', 'Culture', 'Food'], groupType: 'Solo', groupSize: '1', travelMode: 'Train', tripPurpose: 'Adventure', stayPreference: 'Hostel / Budget' },
  },
];



const HERO_PHOTOS = {
  morning: 'https://images.unsplash.com/photo-1764694875522-4c17b2d7c26b?fm=jpg&q=80&w=1920&auto=format&fit=crop',
  afternoon: 'https://images.unsplash.com/photo-1731925116590-c27d25490ea0?fm=jpg&q=80&w=1920&auto=format&fit=crop',
  evening: 'https://images.unsplash.com/photo-1784570269737-21da4658a609?fm=jpg&q=80&w=1920&auto=format&fit=crop',
  night: 'https://images.unsplash.com/photo-1768590238617-1753353cee60?fm=jpg&q=80&w=1920&auto=format&fit=crop',
};
function getDaypart(hour) {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 20) return 'evening';
  return 'night';
}

export default function Home() {
  const navigate = useNavigate();
  const session = getSession();
  const daypart = useMemo(() => getDaypart(new Date().getHours()), []);
  const [activePreset, setActivePreset] = useState(null);

  function handleLogout() {
    logoutUser();
    navigate('/login');
  }

  return (
    <div className="home-page">
      <header className="nav">
        <div className="nav-brand">
          <Compass size={20} strokeWidth={1.75} />
          <span>DestiMind</span>
        </div>
        <nav className="nav-links">
          <span>Hi, {session?.name?.split(' ')[0] || 'traveller'}</span>
          <ThemeToggle />
          <div className="profile-menu">
            <Link to="/profile" className="profile-avatar profile-avatar-sm" title="Your profile">
              {session?.name?.[0]?.toUpperCase() || '?'}
            </Link>
            <div className="profile-dropdown">
              <p className="profile-dropdown-name">{session?.name}</p>
              <p className="profile-dropdown-email">{session?.email}</p>
              <Link to="/profile" className="profile-dropdown-link">
                Edit travel profile
              </Link>
              <button type="button" className="profile-dropdown-link profile-dropdown-logout" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        </nav>
      </header>

      <section className="home-hero" style={{ '--hero-img': `url(${HERO_PHOTOS[daypart]})` }}>
        <div className="hero-glow"></div>
        <h1 className="headline">
          Discover the <span className="headline-accent">extraordinary.</span>
        </h1>
        <p className="subhead">
          Set your state, weather, budget and vibe below — DestiMind will
          match you with real destinations across India in seconds.
        </p>

        <div className="persona-strip">
          <p className="persona-strip-label">Not sure where to start? Pick your vibe:</p>
          <div className="persona-cards">
            {PERSONA_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`persona-card ${activePreset === p.id ? 'persona-card-active' : ''}`}
                onClick={() => setActivePreset(activePreset === p.id ? null : p.id)}
              >
                <span className="persona-emoji">{p.emoji}</span>
                <span className="persona-name">{p.label}</span>
                <span className="persona-tagline">{p.tagline}</span>
              </button>
            ))}
          </div>
        </div>

        <PreferenceForm preset={activePreset ? PERSONA_PRESETS.find(p => p.id === activePreset)?.preset : null} />
      </section>
    </div>
  );
}