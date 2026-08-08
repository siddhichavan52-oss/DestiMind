import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, Sparkles, SlidersHorizontal, Radar, MapPinned, ArrowRight,
  CloudSun, Users, Wallet, TrendingUp,
} from 'lucide-react';
import './Landing.css';

// Nine mood-based scenes across the day, keyed to IST regardless of the
// visitor's own device timezone. Swap any of these Unsplash URLs / picsum
// placeholders for your own art whenever you like — the keys are what matter.
const HERO_PHOTOS = {
  midnight: 'https://picsum.photos/seed/destimind-midnight/1920/1080',
  dawn: 'https://picsum.photos/seed/destimind-dawn/1920/1080',
  morning: 'https://images.unsplash.com/photo-1764694875522-4c17b2d7c26b?fm=jpg&q=80&w=1920&auto=format&fit=crop',
  afternoon: 'https://images.unsplash.com/photo-1731925116590-c27d25490ea0?fm=jpg&q=80&w=1920&auto=format&fit=crop',
  lateAfternoon: 'https://picsum.photos/seed/destimind-late-afternoon/1920/1080',
  earlyEvening: 'https://images.unsplash.com/photo-1784570269737-21da4658a609?fm=jpg&q=80&w=1920&auto=format&fit=crop',
  midEvening: 'https://picsum.photos/seed/destimind-mid-evening/1920/1080',
  lateEvening: 'https://picsum.photos/seed/destimind-late-evening/1920/1080',
  night: 'https://images.unsplash.com/photo-1768590238617-1753353cee60?fm=jpg&q=80&w=1920&auto=format&fit=crop',
};

// Ordered boundaries covering a full 24h day. Each entry's `until` is the
// hour+minute (in IST, 24h clock) where that scene ends and the next begins.
const DAYPART_BOUNDARIES = [
  { key: 'midnight', until: [4, 0] },        // 00:00 – 03:59
  { key: 'dawn', until: [6, 0] },             // 04:00 – 05:59
  { key: 'morning', until: [10, 0] },         // 06:00 – 09:59
  { key: 'afternoon', until: [14, 0] },       // 10:00 – 13:59
  { key: 'lateAfternoon', until: [17, 0] },   // 14:00 – 16:59
  { key: 'earlyEvening', until: [18, 30] },   // 17:00 – 18:29
  { key: 'midEvening', until: [20, 0] },      // 18:30 – 19:59
  { key: 'lateEvening', until: [22, 0] },     // 20:00 – 21:59
  { key: 'night', until: [24, 0] },           // 22:00 – 23:59
];

/** Reads the current wall-clock time in IST (Asia/Kolkata), independent of
 * whatever timezone the visitor's browser/device is actually set to. */
function getISTTime() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  return { hour, minute };
}

function getDaypart({ hour, minute }) {
  const minutesNow = hour * 60 + minute;

  for (const { key, until } of DAYPART_BOUNDARIES) {
    const untilMinutes = until[0] * 60 + until[1];
    if (minutesNow < untilMinutes) return key;
  }

  return 'midnight';
}

/** Re-evaluates the IST daypart every minute so the hero scene updates live
 * if someone leaves the tab open across a boundary, without needing a refresh. */
function useISTDaypart() {
  const [daypart, setDaypart] = useState(() => getDaypart(getISTTime()));

  useEffect(() => {
    const tick = () => setDaypart(getDaypart(getISTTime()));
    tick();
    const id = setInterval(tick, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return daypart;
}

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
  const daypart = useISTDaypart();

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

      <section className="hero" style={{ '--hero-img': `url(${HERO_PHOTOS[daypart]})` }}>
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