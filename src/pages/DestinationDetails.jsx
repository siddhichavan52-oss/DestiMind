import { useLocation, useNavigate } from "react-router-dom";
import "./DestinationDetails.css";

export default function DestinationDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state;

  if (!destination) {
    return (
      <div className="details-page details-empty">
        <div className="details-empty-box">
          <h2>No destination selected</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Continent", value: destination.continent },
    { label: "Weather", value: destination.weather },
    { label: "Estimated Budget", value: `₹${destination.price.toLocaleString()}` },
    { label: "Match Score", value: `${destination.match}%` },
    { label: "Crowd Level", value: destination.crowd },
    { label: "Rating", value: `${destination.rating} / 5` },
    { label: "Best Time to Visit", value: destination.bestTime },
    { label: "Recommended Duration", value: destination.duration },
    { label: "Currency", value: destination.currency },
    { label: "Language", value: destination.language },
  ];

  return (
    <div
      className="details-page"
      style={{ "--details-hero-img": `url(${destination.image})` }}
    >
      <div className="details-container">
        <div className="details-hero">
          <div className="details-hero-overlay" />

          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Results
          </button>

          <div className="details-hero-content">
            <span className="details-match">{destination.match}% Match</span>
            <p className="details-eyebrow">Your next escape</p>
            <h1>{destination.name}</h1>
            <p className="details-location">
              {destination.country} &mdash; {destination.continent}
            </p>
          </div>
        </div>

        <div className="details-body">
          <div className="details-section-heading">
            <div>
              <p className="details-kicker">Trip snapshot</p>
              <h2>Everything at a glance</h2>
            </div>
            <span className="details-score">{destination.rating} <span>/ 5</span></span>
          </div>
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-chip" key={s.label}>
                <span className="stat-label">{s.label}</span>
                <span className="stat-value">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="about-box">
            <p className="details-kicker">Why you'll love it</p>
            <h3>About {destination.name}</h3>
            <p>{destination.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
