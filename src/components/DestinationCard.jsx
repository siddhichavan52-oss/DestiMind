import "./DestinationCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DestinationCard({
  name,
  image,
  price,
  match,
  weather,
  crowd,
  continent,
}) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  function handleExplore() {
    navigate("/destination", {
      state: {
        name,
        image,
        price,
        match,
        weather,
        crowd,
        continent,
      },
    });
  }

  return (
    <div className="card">
       <button
    className="favorite-btn"
    onClick={() => setFavorite(!favorite)}
  >
    {favorite ? "❤️" : "🤍"}
  </button>
      <img src={image} alt={name} />

      <div className="card-content">
        <h2>{name}</h2>

        <div className="price">
          ₹{price.toLocaleString()}
        </div>

        <div className="badges">
          <span className="match">
            {match}% Match
          </span>

          <span className="weather">
            {weather}
          </span>

          <span className="crowd">
            {crowd}
          </span>
        </div>

        <button
          className="explore-btn"
          onClick={handleExplore}
        >
          Explore Destination
        </button>
      </div>
    </div>
  );
}