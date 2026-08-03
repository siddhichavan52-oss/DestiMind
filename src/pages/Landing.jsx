import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, Sparkles, SlidersHorizontal, Radar, MapPinned, ArrowRight,
  CloudSun, Users, Wallet, TrendingUp,
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
    match: 92,
    image: 'https://images.unsplash.com/photo-1574988050647-33c6773e5e9a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Goa, India',
    tag: 'Lively · 29°C',
    match: 88,
    image: 'https://images.unsplash.com/photo-1695453463057-aa5d48d9e3d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Havelock Island',
    tag: 'Quiet · 27°C',
    match: 95,
    image: 'https://images.unsplash.com/photo-1586359716568-3e1907e4cf9f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Jaisalmer, India',
    tag: 'Moderate · 24°C',
    match: 84,
    image: 'https://images.unsplash.com/photo-1732022648903-737e66c18b08?auto=format&fit=crop&w=800&q=80',
  },
];

const stats = [
  { value: 12400, suffix: '+', label: 'matches made' },
  { value: 94, suffix: '%', label: 'would go again' },
  { value: 1.8, suffix: 's', label: 'avg. match time', decimals: 1 },
  { value: 60, suffix: '+', label: 'countries scored' },
];

const differentiators = [
  {
    icon: CloudSun,
    title: 'Live conditions, not stock forecasts',
    text: "We pull current weather and season data instead of relying on a generic \"best time to visit\" blurb.",
  },
  {
    icon: Users,
    title: 'Reads the crowd, not just the map',
    text: 'Every destination is scored for how busy it actually is right now, so "quiet" means quiet.',
  },
  {
    icon: Wallet,
    title: 'Built around your budget, first',
    text: "Matches are filtered by what you're willing to spend before anything else — not sorted after the fact.",
  },
];

/** Reveals children with a fade/slide-up once they enter the viewport. */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function CountUp({ value, suffix = '', decimals = 0 }) {
  const [ref, visible] = useReveal();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;
    const duration = 1200;
    const start = performance.now();

    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, value]);

  return (
    <span ref={ref} className="stat-value">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [stepsRef, stepsVisible] = useReveal();
  const [whyRef, whyVisible] = useReveal();
  const [trendingRef, trendingVisible] = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="page">
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
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
              <ArrowRight size={16} strokeWidth={2} className="btn-arrow" />
            </Link>
            <a href="#how-it-works" className="btn-ghost">See how it works</a>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section id="how-it-works" className="how">
        <p className="section-eyebrow">How it works</p>
        <h2 className="section-title">Three steps, no guesswork.</h2>
        <div className={`steps${stepsVisible ? ' is-visible' : ''}`} ref={stepsRef}>
          <div className="steps-line" aria-hidden="true" />
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div className="step-card reveal" style={{ transitionDelay: `${i * 90}ms` }} key={step.title}>
                <span className="step-index">{String(i + 1).padStart(2, '0')}</span>
                <Icon size={22} strokeWidth={1.75} className="step-icon" />
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="why">
        <div className={`why-inner${whyVisible ? ' is-visible' : ''}`} ref={whyRef}>
          <div className="why-head">
            <p className="section-eyebrow">Why DestiMind</p>
            <h2 className="section-title">
              Not another "top 10 places to visit" list.
            </h2>
          </div>
          <div className="why-list">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <div className="why-row reveal" style={{ transitionDelay: `${i * 100}ms` }} key={item.title}>
                  <Icon size={20} strokeWidth={1.75} className="why-icon" />
                  <div>
                    <h3 className="why-title">{item.title}</h3>
                    <p className="why-text">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="trending">
        <div className="trending-header">
          <div>
            <p className="section-eyebrow">Right now</p>
            <h2 className="section-title">Where people are matching this week</h2>
          </div>
          <span className="trending-live">
            <TrendingUp size={14} strokeWidth={2} />
            live scores
          </span>
        </div>
        <div className={`trending-strip${trendingVisible ? ' is-visible' : ''}`} ref={trendingRef}>
          {trending.map((place, i) => (
            <div
              className="trend-card reveal"
              key={place.name}
              style={{ backgroundImage: `url(${place.image})`, transitionDelay: `${i * 80}ms` }}
            >
              <span className="trend-match">{place.match}% match</span>
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
        <div className="footer-top">
          <div className="nav-brand">
            <Compass size={18} strokeWidth={1.75} />
            <span>DestiMind</span>
          </div>
          <p className="footer-text">Built for travellers who'd rather arrive than search.</p>
        </div>
        <div className="footer-links">
          <a href="#how-it-works">How it works</a>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Log in</Link>
        </div>
      </footer>
    </div>
  );
}