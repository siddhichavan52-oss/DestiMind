import { useLocation, useNavigate } from "react-router-dom";
import "./DestinationDetails.css";

export default function DestinationDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const destination = location.state;

  if (!destination) {
    return (
      <div className="details-page">
        <h2>No destination selected.</h2>

        <button onClick={() => navigate("/results")}>
          Back to Results
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">

      <img
        src={destination.image}
        alt={destination.name}
        className="details-image"
      />

      <div className="details-content">

        <h1>{destination.name}</h1>

        <p>
          <strong>Continent:</strong> {destination.continent}
        </p>

        <p>
          <strong>Weather:</strong> {destination.weather}
        </p>

        <p>
          <strong>Estimated Budget:</strong> ₹{destination.price.toLocaleString()}
        </p>

        <p>
          <strong>Match Score:</strong> {destination.match}%
        </p>

        <p>
          <strong>Crowd:</strong> {destination.crowd}
        </p>

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