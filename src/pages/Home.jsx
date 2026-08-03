import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { getSession, logoutUser } from '../utils/auth';
import './Home.css';
import PreferenceForm from '../components/PreferenceForm';

import morningBg from '../assets/morning.png';
import afternoonBg from '../assets/afternoon.png';
import eveningBg from '../assets/evening.png';
import nightBg from '../assets/night.png';

const HERO_PHOTOS = {
  morning: morningBg,
  afternoon: afternoonBg,
  evening: eveningBg,
  night: nightBg,
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
          Set your continent, weather, budget and vibe below — DestiMind will
          match you with real destinations in seconds.
        </p>

        <PreferenceForm />
      </section>
    </div>
  );
}