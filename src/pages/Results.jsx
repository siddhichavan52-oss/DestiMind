import "./Results.css";
import DestinationCard from "../components/DestinationCard";
import { useLocation, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { ArrowLeft, Sparkles, MapPin, Plane, TrainFront, Users, Calendar, Wallet } from "lucide-react";

export default function Results() {
  const location = useLocation();

  const preferences = location.state || {};
  const destinations = preferences.recommendations || [];

  const [sortBy, setSortBy] = useState("match");
  const [crowdFilter, setCrowdFilter] = useState("All");
  const [gemFilter, setGemFilter] = useState("All"); // All | Hidden | Popular
  const [search, setSearch] = useState("");

  const hiddenCount = useMemo(
    () => destinations.filter((d) => d.isHiddenGem).length,
    [destinations]
  );
  const popularCount = destinations.length - hiddenCount;

  const filteredDestinations = destinations
    .filter((destination) => {
      const crowdMatch =
        crowdFilter === "All" ||
        destination.crowd === crowdFilter;

      const gemMatch =
        gemFilter === "All" ||
        (gemFilter === "Hidden" && destination.isHiddenGem) ||
        (gemFilter === "Popular" && !destination.isHiddenGem);

      const query = search.trim().toLocaleLowerCase();
      const searchMatch = !query || [destination.name, destination.city, destination.state]
        .some((value) => String(value || "").toLocaleLowerCase().includes(query));

      // The recommendation API has already applied the location and weather
      // preferences. Rechecking those fields here can hide valid matches when
      // the catalog and form use different spellings for a state or city.
      return crowdMatch && gemMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price;
      }
      return b.match - a.match;
    });

  return (
    <div className="results-page">
      <div className="results-top-nav">
        <Link to="/home" className="results-back-link">
          <ArrowLeft size={16} strokeWidth={2.2} />
          <span>Adjust Trip Profile</span>
        </Link>
      </div>

      <div className="results-header">
        <h1>Curated Recommendations</h1>

        <p>
          {filteredDestinations.length} verified destinations matched your travel profile across India
        </p>

        {/* Personalized RAG Learning Notice */}
        {preferences.userLearning?.trainedOnUser && (
          <div className="rag-user-learning-pill">
            <Sparkles size={14} strokeWidth={2.4} color="#a855f7" />
            <span>
              <strong>Personalized with DestiMind RAG:</strong> Learned from your profile & preferences.
            </span>
          </div>
        )}

        {preferences.recommendationNotice && (
          <p className="recommendation-notice">{preferences.recommendationNotice}</p>
        )}
      </div>

      {/* Preferences Pill Summary */}
      <div className="preferences-summary">
        <span>📍 {preferences.state || "All India (Flexible State)"}{preferences.city ? ` · ${preferences.city}` : ""}</span>
        {preferences.travelMode && (
          <span>
            {preferences.travelMode === "Flight" ? "✈️" : preferences.travelMode === "Train" ? "🚆" : "🚗"} {preferences.travelMode}
          </span>
        )}
        <span>☀ {preferences.weather || "Any"}</span>
        <span>💰 ₹{preferences.budget?.toLocaleString()}</span>
        <span>
          🗓️ {preferences.startDate ? `${preferences.startDate} · ` : ""}{preferences.days} Days
        </span>
        {preferences.groupType && (
          <span>👥 {preferences.groupType} ({preferences.groupSize || 1})</span>
        )}
      </div>

      {/* Flight Route Cost Verification Banner */}
      {preferences.travelMode === "Flight" && (
        <div className="flight-comparison-banner">
          <Plane size={15} strokeWidth={2.4} color="#38bdf8" />
          <span>
            <strong>Flight Price Comparison Active:</strong> Roundtrip airfares verified from {preferences.originCity || "your origin"} to destination airports. Viable candidates filtered to fit within your ₹{(preferences.budget || 0).toLocaleString()} budget.
          </span>
        </div>
      )}

      {/* Hidden Gem vs Popular Segmented Controls */}
      <div className="gem-segmented-controls">
        <button
          type="button"
          className={`gem-segment-btn ${gemFilter === "All" ? "active" : ""}`}
          onClick={() => setGemFilter("All")}
        >
          All Destinations ({destinations.length})
        </button>
        <button
          type="button"
          className={`gem-segment-btn gem-btn-special ${gemFilter === "Hidden" ? "active" : ""}`}
          onClick={() => setGemFilter("Hidden")}
        >
          💎 Hidden Gems Only ({hiddenCount})
        </button>
        <button
          type="button"
          className={`gem-segment-btn ${gemFilter === "Popular" ? "active" : ""}`}
          onClick={() => setGemFilter("Popular")}
        >
          ⭐ Popular Highlights ({popularCount})
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search destination, city, or attractions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-bar">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="match">Sort by Best Match</option>
            <option value="price">Sort by Lowest Price</option>
          </select>

          <select
            value={crowdFilter}
            onChange={(e) => setCrowdFilter(e.target.value)}
          >
            <option value="All">All Crowd Levels</option>
            <option value="Low Crowd">Low Crowd (Quiet & Serene)</option>
            <option value="Medium Crowd">Medium Crowd (Moderate)</option>
            <option value="High Crowd">High Crowd (Peak Season)</option>
          </select>
        </div>
      </div>

      {filteredDestinations.length > 0 ? (
        <div className="results-grid">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.name}
              destination={destination}
            />
          ))}
        </div>
      ) : (
        <div className="no-results-box">
          <h2 className="no-results">No destinations match this filter.</h2>
          <p className="no-results-sub">
            Try switching the filter to "All Destinations" or clearing your crowd filter.
          </p>
          <button
            type="button"
            className="clear-filters-btn"
            onClick={() => {
              setGemFilter("All");
              setCrowdFilter("All");
              setSearch("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
