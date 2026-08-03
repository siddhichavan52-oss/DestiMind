import { useLocation, useNavigate } from "react-router-dom";
import "./DestinationDetails.css";

export default function DestinationDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.destination;

  if (!destination) {
    return <h2>No destination selected</h2>;
  }

  return (
  <div className="details-page">
    <div className="details-content">

      <h1>{destination.name}</h1>

      <h3 style={{ color: "#2563eb", marginBottom: "20px" }}>
        📍 {destination.country}
      </h3>

      <p>
        <strong>🌍 Continent:</strong> {destination.continent}
      </p>

      <p>
        <strong>☀ Weather:</strong> {destination.weather}
      </p>

      <p>
        <strong>💰 Estimated Budget:</strong> ₹{destination.price.toLocaleString()}
      </p>

      <p>
        <strong>🎯 Match Score:</strong> {destination.match}%
      </p>

      <p>
        <strong>👥 Crowd:</strong> {destination.crowd}
      </p>

      <p>
        <strong>⭐ Rating:</strong> {destination.rating}/5
      </p>

      <p>
        <strong>🗓 Best Time to Visit:</strong> {destination.bestTime}
      </p>

      <p>
        <strong>⏳ Recommended Duration:</strong> {destination.duration}
      </p>

      <p>
        <strong>💱 Currency:</strong> {destination.currency}
      </p>

      <p>
        <strong>🗣 Language:</strong> {destination.language}
      </p>

      <div className="about-box">
        <h3>About this Destination</h3>
        <p>{destination.description}</p>
      </div>

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back to Results
      </button>

        </div>
  </div>
);
}