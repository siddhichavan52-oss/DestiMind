import "./Results.css";
import DestinationCard from "../components/DestinationCard";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const destinations = [
  {
    name: "Goa",
    continent: "Asia",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 18000,
    match: 95,
    crowd: "Low Crowd",
  },
  {
    name: "Manali",
    continent: "Asia",
    weather: "Cold & Snowy",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592",
    price: 22000,
    match: 90,
    crowd: "Medium Crowd",
  },
  {
    name: "Bali",
    continent: "Asia",
    weather: "Tropical",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    price: 35000,
    match: 92,
    crowd: "Medium Crowd",
  },
  {
    name: "Paris",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    price: 85000,
    match: 88,
    crowd: "High Crowd",
  },
  {
    name: "Zurich",
    continent: "Europe",
    weather: "Cold & Snowy",
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
    price: 95000,
    match: 91,
    crowd: "Medium Crowd",
  },
  {
    name: "Cape Town",
    continent: "Africa",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8b",
    price: 65000,
    match: 87,
    crowd: "Low Crowd",
  },
  {
    name: "Sydney",
    continent: "Oceania",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
    price: 120000,
    match: 89,
    crowd: "High Crowd",
  }
];

export default function Results() {
  const location = useLocation();

  const preferences = location.state || {};
  const [sortBy, setSortBy] = useState("match");
  const [crowdFilter, setCrowdFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredDestinations = destinations
  .filter((destination) => {
    const continentMatch =
      !preferences.continent ||
      destination.continent === preferences.continent;

    const weatherMatch =
      !preferences.weather ||
      destination.weather === preferences.weather ||
      preferences.weather === "Any";

    const crowdMatch =
  crowdFilter === "All" ||
  destination.crowd === crowdFilter;

const searchMatch =
  destination.name.toLowerCase().includes(search.toLowerCase());

return (
  continentMatch &&
  weatherMatch &&
  crowdMatch &&
  searchMatch
);
  })
  .sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "match") return b.match - a.match;
    return 0;
  });

  return (
    <div className="results-page">
      <h1>Recommended Destinations</h1>
      <div className="preferences-summary">
      <span><strong>Continent:</strong> {preferences.continent}</span>
      <span><strong>Weather:</strong> {preferences.weather}</span>
      <span><strong>Budget:</strong> ₹{preferences.budget?.toLocaleString()}</span>
      <span><strong>Trip Length:</strong> {preferences.days} Days</span>
    </div>

      <div className="search-box">
  <input
    type="text"
    placeholder="Search destination..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
      <div className="filter-bar">
      

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="match">Sort by Match</option>
    <option value="price">Sort by Price</option>
  </select>

  <select
    value={crowdFilter}
    onChange={(e) => setCrowdFilter(e.target.value)}
  >
    <option value="All">All Crowd Levels</option>
    <option value="Low Crowd">Low Crowd</option>
    <option value="Medium Crowd">Medium Crowd</option>
    <option value="High Crowd">High Crowd</option>
  </select>

</div>
      {filteredDestinations.length > 0 ? (
  <div className="results-grid">
    {filteredDestinations.map((destination) => (
      <DestinationCard
        key={destination.name}
        name={destination.name}
        image={destination.image}
        price={destination.price}
        match={destination.match}
        weather={destination.weather}
        crowd={destination.crowd}
        continent={destination.continent}
      />
    ))}
  </div>
) : (
  <h2 className="no-results">
    No destinations found for your preferences.
  </h2>
)}
    </div>
  );
}