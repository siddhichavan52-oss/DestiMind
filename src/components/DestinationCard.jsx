import { useNavigate } from "react-router-dom";
import { Plane, TrainFront, Car, Sparkles, Calendar, DollarSign, ExternalLink, Hotel } from "lucide-react";
import "./DestinationCard.css";

export default function DestinationCard({ destination }) {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/destination", { state: destination });
  };

  const isHidden = Boolean(destination.isHiddenGem);
  const crowd = destination.crowd || "Medium Crowd";
  const crowdClass = crowd.toLowerCase().includes("low")
    ? "crowd-low"
    : crowd.toLowerCase().includes("high")
    ? "crowd-high"
    : "crowd-med";

  const transit = destination.transportAvailability || {};
  const budget = destination.budgetBreakdown || {};

  return (
    <div className={`destination-card ${isHidden ? "card-hidden-gem" : ""}`}>
      <div className="card-image-wrap">
        <img
          className="card-image"
          src={destination.image}
          alt={destination.name}
          loading="lazy"
        />

        <div className="badge-group-top">
          {isHidden ? (
            <span className="gem-badge">💎 Hidden Gem</span>
          ) : (
            <span className="popular-badge">⭐ Popular Highlight</span>
          )}
          <span className="match-badge">{destination.match}% Match</span>
        </div>

        <span className={`crowd-badge ${crowdClass}`}>
          {destination.crowdStatus || destination.crowd}
        </span>
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <div>
            <h3>{destination.name}</h3>
            <p className="card-location">
              📍 {destination.city ? `${destination.city}, ` : ""}{destination.state || destination.country}
            </p>
          </div>
          {destination.rating > 0 && (
            <span className="card-rating">{destination.rating.toFixed(1)}</span>
          )}
        </div>

        {/* Date Crowd Prediction Signal */}
        {destination.crowdReason && (
          <div className="card-intel-box crowd-intel">
            <div className="intel-header">
              <Calendar size={13} strokeWidth={2.2} />
              <span>Date Crowd Forecast · {destination.crowd}</span>
            </div>
            <p className="intel-text">{destination.crowdReason}</p>
          </div>
        )}

        {/* Transport Availability Signal (Flight / Train) */}
        {transit.mode && (
          <div className="card-intel-box transit-intel">
            <div className="intel-header">
              {transit.mode === "Flight" ? (
                <Plane size={13} strokeWidth={2.2} />
              ) : transit.mode === "Train" ? (
                <TrainFront size={13} strokeWidth={2.2} />
              ) : (
                <Car size={13} strokeWidth={2.2} />
              )}
              <span>{transit.mode} Availability: {transit.availabilityStatus}</span>
            </div>
            <p className="intel-text">
              <strong>{transit.nearestHub}</strong>
            </p>
            {transit.mode === "Flight" && (transit.roundTripPerPersonINR || transit.cheapestFareINR) && (
              <div className="transit-flight-compare-row">
                <span className="flight-compare-tag">
                  ✈️ Flights from ₹{(transit.cheapestFareINR || transit.roundTripPerPersonINR).toLocaleString()}/person
                  {transit.cheapestCarrier ? ` (${transit.cheapestCarrier})` : ""}
                </span>
                {budget.withinBudget !== false ? (
                  <span className="flight-budget-verified-pill">✓ Viable Budget Fit</span>
                ) : (
                  <span className="flight-budget-tight-pill">⚠️ Route Exceeds Min Budget</span>
                )}
              </div>
            )}
            <div className="transit-demand-row">
              <span className="transit-badge-pill">{transit.availabilityBadge}</span>
              {transit.bookingUrl && (
                <a
                  href={transit.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transit-booking-link"
                >
                  {transit.mode === 'Flight' ? 'Check Live on Google Flights' : 'Live booking'} <ExternalLink size={11} strokeWidth={2.2} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Hidden Gem Secret Highlight */}
        {isHidden && destination.hiddenGemHighlights && (
          <div className="card-gem-secret">
            <span className="gem-secret-label">✨ Offbeat Secret:</span>
            <span className="gem-secret-text">{destination.hiddenGemHighlights}</span>
          </div>
        )}

        {/* Appropriate Budget Breakdown */}
        {budget.totalEstimatedINR && (
          <div className="card-budget-breakdown">
            <div className="budget-row">
              <span className="budget-item">
                Stay: ₹{Math.round(budget.stayTotalINR).toLocaleString()}
              </span>
              <span className="budget-dot">•</span>
              <span className="budget-item">
                {transit.mode === 'Flight' ? 'Flights' : 'Transit'}: ₹{Math.round(budget.transitTotalINR).toLocaleString()}
              </span>
              <span className="budget-dot">•</span>
              <span className="budget-item">
                Meals: ₹{Math.round(budget.mealsActivitiesTotalINR).toLocaleString()}
              </span>
            </div>
            <div className="budget-status-row">
              <span className={`budget-status-tag ${budget.withinBudget ? "status-within" : "status-tight"}`}>
                {budget.statusText}
              </span>
            </div>
          </div>
        )}

        {/* Full Travel Plan Indicator */}
        <div className="card-itinerary-preview">
          <Calendar size={13} strokeWidth={2.4} color="var(--teal, #4fd1c5)" />
          <span className="itinerary-ready-label">
            <strong>{destination.itinerary?.length || parseInt(destination.duration) || 5}-Day Plan Ready</strong>
            <span className="itinerary-ready-sub">
              {transit.mode === "Flight" ? " · ✈️ Flights & Daily Sights" : transit.mode === "Train" ? " · 🚆 Trains & Sights" : " · 🚗 Daily Schedule"}
            </span>
          </span>
        </div>

        {/* Hotel Recommendations Preview */}
        {destination.hotels?.length > 0 && (
          <div className="card-hotel-preview">
            <Hotel size={13} strokeWidth={2.4} color="var(--dawn, #ffb347)" />
            <span className="hotel-ready-label">
              <strong>Stays from ₹{destination.hotels[0].pricePerNightINR?.toLocaleString()}/nt</strong>
              <span className="hotel-ready-sub">
                · {destination.recommendedHotel?.name ? `${destination.recommendedHotel.name.slice(0, 20)}...` : "Google Verified"} · ⚡ Dates Pre-Locked
              </span>
            </span>
          </div>
        )}

        <div className="card-meta">
          <span>{destination.weather}</span>
          <span className="dot" />
          <span>{destination.duration}</span>
        </div>

        <div className="card-footer">
          <div className="card-price">
            <span className="price-label">Est. trip total ({destination.duration})</span>
            <span className="price-value">
              ₹{destination.price.toLocaleString()}
            </span>
          </div>

          <button className="explore-btn" onClick={handleExplore}>
            <span>View {destination.itinerary?.length || parseInt(destination.duration) || 5}-Day Plan</span>
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
