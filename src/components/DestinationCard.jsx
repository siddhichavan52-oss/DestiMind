import { useNavigate } from "react-router-dom";
import "./DestinationCard.css";

export default function DestinationCard({ destination }) {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/destination", { state: destination });
  };

  return (
    <div className="destination-card">
      <div className="card-image-wrap">
        <img
          className="card-image"
          src={destination.image}
          alt={destination.name}
          loading="lazy"
        />

        <span className="match-badge">{destination.match}% Match</span>
        <span className="crowd-badge">{destination.crowd}</span>
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <h3>{destination.name}</h3>
          <span className="card-rating">{destination.rating.toFixed(1)}</span>
        </div>

        <p className="card-location">
          {destination.country} &middot; {destination.continent}
        </p>

        <div className="card-meta">
          <span>{destination.weather}</span>
          <span className="dot" />
          <span>{destination.duration}</span>
        </div>

        <div className="card-footer">
          <div className="card-price">
            <span className="price-label">From</span>
            <span className="price-value">
              ₹{destination.price.toLocaleString()}
            </span>
          </div>

          <button className="explore-btn" onClick={handleExplore}>
            <span>Explore Destination</span>
            <svg
              className="btn-arrow"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}