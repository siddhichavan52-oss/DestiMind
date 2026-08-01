import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <header className="nav">
        <div className="nav-brand">
          <Compass size={20} strokeWidth={1.75} />
          <span>DestiMind</span>
        </div>
        <nav className="nav-links">
          <span>Hi, traveller</span>
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

        {/* Person 2's PreferenceForm.jsx drops in here */}
        <div className="form-placeholder">
          <ArrowRight size={16} strokeWidth={2} />
          Preference form goes here
        </div>
      </section>
    </div>
  );
}
