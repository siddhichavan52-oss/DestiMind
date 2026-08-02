import { Link, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { getSession, logoutUser } from '../utils/auth';
import './Home.css';
import PreferenceForm from '../components/PreferenceForm';

export default function Home() {
  const navigate = useNavigate();
  const session = getSession();

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

      <section className="home-hero">
        <span className="eyebrow">
          <Sparkles size={14} strokeWidth={2} />
          Ready when you are
        </span>
        <h1 className="headline">
          Let's find <span className="headline-accent">your next place.</span>
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
