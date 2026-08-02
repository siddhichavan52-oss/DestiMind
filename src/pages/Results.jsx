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
  },
  {
  name: "Tokyo",
  continent: "Asia",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
  price: 75000,
  match: 94,
  crowd: "High Crowd",
},
{
  name: "Kyoto",
  continent: "Asia",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
  price: 70000,
  match: 90,
  crowd: "Medium Crowd",
},
{
  name: "Maldives",
  continent: "Asia",
  weather: "Beach & Warm",
  image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
  price: 90000,
  match: 97,
  crowd: "Low Crowd",
},
{
  name: "Dubai",
  continent: "Asia",
  weather: "Beach & Warm",
  image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  price: 65000,
  match: 91,
  crowd: "High Crowd",
},
{
  name: "Swiss Alps",
  continent: "Europe",
  weather: "Cold & Snowy",
  image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  price: 110000,
  match: 98,
  crowd: "Medium Crowd",
},
{
  name: "Rome",
  continent: "Europe",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1525874684015-58379d421a52",
  price: 82000,
  match: 90,
  crowd: "Medium Crowd",
},
{
  name: "Santorini",
  continent: "Europe",
  weather: "Beach & Warm",
  image: "https://images.unsplash.com/photo-1469796466635-455ede028aca",
  price: 85000,
  match: 95,
  crowd: "Low Crowd",
},
{
  name: "London",
  continent: "Europe",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
  price: 95000,
  match: 86,
  crowd: "High Crowd",
},
{
  name: "New York",
  continent: "North America",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2",
  price: 105000,
  match: 88,
  crowd: "High Crowd",
},
{
  name: "Banff",
  continent: "North America",
  weather: "Cold & Snowy",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  price: 95000,
  match: 94,
  crowd: "Low Crowd",
},
{
  name: "Rio de Janeiro",
  continent: "South America",
  weather: "Beach & Warm",
  image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
  price: 80000,
  match: 89,
  crowd: "High Crowd",
},
{
  name: "Machu Picchu",
  continent: "South America",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
  price: 90000,
  match: 93,
  crowd: "Medium Crowd",
},
{
  name: "Cairo",
  continent: "Africa",
  weather: "Beach & Warm",
  image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a",
  price: 60000,
  match: 85,
  crowd: "Medium Crowd",
},
{
  name: "Serengeti",
  continent: "Africa",
  weather: "Nature",
  image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
  price: 70000,
  match: 92,
  crowd: "Low Crowd",
},
{
  name: "Queenstown",
  continent: "Oceania",
  weather: "Cold & Snowy",
  image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  price: 98000,
  match: 95,
  crowd: "Medium Crowd",
},
{
  name: "Melbourne",
  continent: "Oceania",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1514395462725-fb4566210144",
  price: 115000,
  match: 87,
  crowd: "High Crowd",
},
{
  name: "Singapore",
  continent: "Asia",
  weather: "Tropical",
  image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
  price: 65000,
  match: 92,
  crowd: "High Crowd",
},
{
  name: "Phuket",
  continent: "Asia",
  weather: "Beach & Warm",
  image: "https://images.unsplash.com/photo-1468413253725-0d5181091126",
  price: 45000,
  match: 93,
  crowd: "Medium Crowd",
},
{
  name: "Seoul",
  continent: "Asia",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1538485399081-7c897dc4b4f9",
  price: 72000,
  match: 90,
  crowd: "High Crowd",
},
{
  name: "Bangkok",
  continent: "Asia",
  weather: "Tropical",
  image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365",
  price: 42000,
  match: 89,
  crowd: "High Crowd",
},
{
  name: "Venice",
  continent: "Europe",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0",
  price: 87000,
  match: 91,
  crowd: "Medium Crowd",
},
{
  name: "Barcelona",
  continent: "Europe",
  weather: "Beach & Warm",
  image: "https://images.unsplash.com/photo-1583422409516-2895a77efded",
  price: 83000,
  match: 92,
  crowd: "High Crowd",
},
{
  name: "Amsterdam",
  continent: "Europe",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017",
  price: 91000,
  match: 90,
  crowd: "Medium Crowd",
},
{
  name: "Reykjavik",
  continent: "Europe",
  weather: "Cold & Snowy",
  image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
  price: 125000,
  match: 97,
  crowd: "Low Crowd",
},
{
  name: "Los Angeles",
  continent: "North America",
  weather: "Beach & Warm",
  image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da",
  price: 98000,
  match: 89,
  crowd: "High Crowd",
},
{
  name: "Las Vegas",
  continent: "North America",
  weather: "Beach & Warm",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  price: 85000,
  match: 87,
  crowd: "High Crowd",
},
{
  name: "Vancouver",
  continent: "North America",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1559511260-66a654ae982a",
  price: 96000,
  match: 91,
  crowd: "Medium Crowd",
},
{
  name: "Niagara Falls",
  continent: "North America",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  price: 78000,
  match: 90,
  crowd: "Low Crowd",
},
{
  name: "Buenos Aires",
  continent: "South America",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f",
  price: 76000,
  match: 88,
  crowd: "Medium Crowd",
},
{
  name: "Patagonia",
  continent: "South America",
  weather: "Cold & Snowy",
  image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  price: 98000,
  match: 95,
  crowd: "Low Crowd",
},
{
  name: "Lima",
  continent: "South America",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce",
  price: 69000,
  match: 87,
  crowd: "Medium Crowd",
},
{
  name: "Marrakech",
  continent: "Africa",
  weather: "Beach & Warm",
  image: "https://images.unsplash.com/photo-1548013146-72479768bada",
  price: 62000,
  match: 89,
  crowd: "Medium Crowd",
},
{
  name: "Victoria Falls",
  continent: "Africa",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  price: 71000,
  match: 91,
  crowd: "Low Crowd",
},
{
  name: "Auckland",
  continent: "Oceania",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1502784444185-1b7b8f7d9f62",
  price: 108000,
  match: 90,
  crowd: "Medium Crowd",
},
{
  name: "Gold Coast",
  continent: "Oceania",
  weather: "Beach & Warm",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  price: 102000,
  match: 92,
  crowd: "Medium Crowd",
},
{
  name: "Fiji",
  continent: "Oceania",
  weather: "Tropical",
  image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  price: 115000,
  match: 96,
  crowd: "Low Crowd",
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