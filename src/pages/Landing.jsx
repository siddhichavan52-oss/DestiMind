import { Link } from 'react-router-dom';
import {
  Compass, Sparkles, SlidersHorizontal, Radar, MapPinned, ArrowRight,
} from 'lucide-react';
import './Landing.css';

const steps = [
  {
    icon: SlidersHorizontal,
    title: 'Set your preferences',
    text: 'Pick a continent, country, weather, travel mode and budget — whatever matters to you.',
  },
  {
    icon: Radar,
    title: 'DestiMind reads the signals',
    text: 'We weigh live weather, crowd levels and your filters to score every possible match.',
  },
  {
    icon: MapPinned,
    title: 'Get your destinations',
    text: 'A ranked list of places that actually fit — not just the ones everyone else is posting.',
  },
];

const trending = [
  {
    name: 'Manali, India',
    tag: 'Quiet · 18°C',
    image: 'https://loremflickr.com/500/400/manali,himalayas',
  },
  {
    name: 'Goa, India',
    tag: 'Lively · 29°C',
    image: 'https://loremflickr.com/500/400/goa,beach,india',
  },
  {
    name: 'Havelock Island',
    tag: 'Quiet · 27°C',
    image: 'https://loremflickr.com/500/400/andaman,island,beach',
  },
  {
    name: 'Jaisalmer, India',
    tag: 'Moderate · 24°C',
    image: 'https://loremflickr.com/500/400/jaisalmer,desert,fort',
  },
];

export default function Landing() {
  return (
    <div className="page">
      <header className="nav">
        <div className="nav-brand">
          <Compass size={20} strokeWidth={1.75} />
          <span>DestiMind</span>
        </div>
        <nav className="nav-links">
          <Link to="/login">Log in</Link>
          <Link to="/signup" className="nav-cta">Sign up</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={14} strokeWidth={2} />
            AI destination predictor
          </span>
          <h1 className="headline">
            Stop scrolling.
            <br />
            Start landing<span className="headline-accent"> somewhere right.</span>
          </h1>
          <p className="subhead">
            Tell DestiMind how you like to travel — the weather, the crowd, the pace —
            and we'll map it against real conditions to find where you actually belong.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">
              Find my destination
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <a href="#how-it-works" className="btn-ghost">See how it works</a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <svg viewBox="0 0 420 320" className="route-svg">
            <circle cx="60" cy="240" r="5" fill="#FFB347" />
            <circle cx="220" cy="90" r="5" fill="#4FD1C5" />
            <circle cx="360" cy="180" r="6" fill="#FF6F5E" />
            <path
              d="M 60 240 Q 140 120 220 90 T 360 180"
              fill="none"
              stroke="#F7F5F0"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              className="route-path"
            />
            <text x="70" y="262" className="route-label">You</text>
            <text x="200" y="72" className="route-label">Match 92%</text>
            <text x="330" y="205" className="route-label">Match 87%</text>
          </svg>
        </div>
      </section>

      <section id="how-it-works" className="how">
        <p className="section-eyebrow">How it works</p>
        <h2 className="section-title">Three steps, no guesswork.</h2>
        <div className="steps">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div className="step-card" key={step.title}>
                <span className="step-index">{String(i + 1).padStart(2, '0')}</span>
                <Icon size={22} strokeWidth={1.75} className="step-icon" />
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="trending">
        <div className="trending-header">
          <div>
            <p className="section-eyebrow">Right now</p>
            <h2 className="section-title">Where people are matching this week</h2>
          </div>
        </div>
        <div className="trending-strip">
          {trending.map((place) => (
            <div
              className="trend-card"
              key={place.name}
              style={{ backgroundImage: `url(${place.image})` }}
            >
              <div className="trend-overlay" />
              <div className="trend-info">
                <p className="trend-name">{place.name}</p>
                <p className="trend-tag">{place.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="nav-brand">
          <Compass size={18} strokeWidth={1.75} />
          <span>DestiMind</span>
        </div>
        <p className="footer-text">Built for travellers who'd rather arrive than search.</p>
      </footer>
    </div>
  );
}
