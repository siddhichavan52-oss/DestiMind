import "./Results.css";
import DestinationCard from "../components/DestinationCard";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const destinations = [
  {
    name: "Tokyo",
    country: "Japan",
    continent: "Asia",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    price: 75000,
    match: 94,
    crowd: "High Crowd",
    rating: 4.8,
    bestTime: "March-May",
    duration: "5-7 Days",
    currency: "Japanese Yen (JPY)",
    language: "Japanese",
    description: "Tokyo blends futuristic skyscrapers with ancient temples, offering world-class shopping, food, anime culture and nightlife."
  },
  {
    name: "Kyoto",
    country: "Japan",
    continent: "Asia",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    price: 70000,
    match: 93,
    crowd: "Medium Crowd",
    rating: 4.9,
    bestTime: "March-April",
    duration: "4-6 Days",
    currency: "Japanese Yen (JPY)",
    language: "Japanese",
    description: "Kyoto is famous for cherry blossoms, traditional shrines, bamboo forests and beautiful geisha districts."
  },
  {
    name: "Osaka",
    country: "Japan",
    continent: "Asia",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1590559899731-a382839e5549",
    price: 68000,
    match: 91,
    crowd: "High Crowd",
    rating: 4.7,
    bestTime: "March-May",
    duration: "4-5 Days",
    currency: "Japanese Yen (JPY)",
    language: "Japanese",
    description: "Osaka is known for delicious street food, Universal Studios Japan and vibrant nightlife."
  },
  {
    name: "Seoul",
    country: "South Korea",
    continent: "Asia",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58",
    price: 72000,
    match: 92,
    crowd: "High Crowd",
    rating: 4.8,
    bestTime: "April-May",
    duration: "5 Days",
    currency: "South Korean Won (KRW)",
    language: "Korean",
    description: "Seoul offers K-pop culture, palaces, shopping streets and modern city attractions."
  },
  {
    name: "Busan",
    country: "South Korea",
    continent: "Asia",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: 65000,
    match: 90,
    crowd: "Medium Crowd",
    rating: 4.7,
    bestTime: "May-September",
    duration: "4 Days",
    currency: "South Korean Won (KRW)",
    language: "Korean",
    description: "Busan is famous for beaches, seafood markets, temples and coastal views."
  },
  {
    name: "Singapore",
    country: "Singapore",
    continent: "Asia",
    weather: "Tropical",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
    price: 65000,
    match: 93,
    crowd: "High Crowd",
    rating: 4.9,
    bestTime: "February-April",
    duration: "4 Days",
    currency: "Singapore Dollar (SGD)",
    language: "English",
    description: "Singapore is known for Marina Bay Sands, Gardens by the Bay, Sentosa Island and luxury shopping."
  },
  {
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    price: 50000,
    match: 95,
    crowd: "Medium Crowd",
    rating: 4.9,
    bestTime: "April-October",
    duration: "6 Days",
    currency: "Indonesian Rupiah (IDR)",
    language: "Indonesian",
    description: "Bali offers beaches, waterfalls, temples, rice terraces and luxury resorts."
  },
  {
    name: "Phuket",
    country: "Thailand",
    continent: "Asia",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1468413253725-0d5181091126",
    price: 45000,
    match: 92,
    crowd: "Medium Crowd",
    rating: 4.7,
    bestTime: "November-April",
    duration: "5 Days",
    currency: "Thai Baht (THB)",
    language: "Thai",
    description: "Phuket is Thailand's most popular island with crystal-clear beaches and vibrant nightlife."
  },
  {
    name: "Bangkok",
    country: "Thailand",
    continent: "Asia",
    weather: "Tropical",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365",
    price: 42000,
    match: 90,
    crowd: "High Crowd",
    rating: 4.6,
    bestTime: "November-February",
    duration: "4 Days",
    currency: "Thai Baht (THB)",
    language: "Thai",
    description: "Bangkok is known for floating markets, temples, nightlife and affordable shopping."
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    continent: "Asia",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    price: 70000,
    match: 91,
    crowd: "High Crowd",
    rating: 4.8,
    bestTime: "November-March",
    duration: "5 Days",
    currency: "UAE Dirham (AED)",
    language: "Arabic",
    description: "Dubai features luxury shopping, Burj Khalifa, desert safari and beautiful beaches."
  },
  {
    name: "Maldives",
    country: "Maldives",
    continent: "Asia",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
    price: 90000,
    match: 98,
    crowd: "Low Crowd",
    rating: 5.0,
    bestTime: "November-April",
    duration: "5 Days",
    currency: "Maldivian Rufiyaa (MVR)",
    language: "Dhivehi",
    description: "The Maldives is famous for luxury water villas, white sand beaches and crystal-clear lagoons."
  },
  {
    name: "Kathmandu",
    country: "Nepal",
    continent: "Asia",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    price: 35000,
    match: 89,
    crowd: "Medium Crowd",
    rating: 4.5,
    bestTime: "October-November",
    duration: "5 Days",
    currency: "Nepalese Rupee (NPR)",
    language: "Nepali",
    description: "Kathmandu offers ancient temples, Himalayan views and rich Nepalese culture."
  },
  {
    name: "Leh",
    country: "India",
    continent: "Asia",
    weather: "Cold & Snowy",
    image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b",
    price: 32000,
    match: 97,
    crowd: "Low Crowd",
    rating: 4.9,
    bestTime: "June-September",
    duration: "6 Days",
    currency: "Indian Rupee (INR)",
    language: "Hindi",
    description: "Leh is surrounded by Himalayan mountains, monasteries, Pangong Lake and adventure routes."
  },
  {
    name: "Goa",
    country: "India",
    continent: "Asia",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 18000,
    match: 94,
    crowd: "Medium Crowd",
    rating: 4.7,
    bestTime: "November-February",
    duration: "4 Days",
    currency: "Indian Rupee (INR)",
    language: "Hindi, Konkani",
    description: "Goa is India's beach paradise with Portuguese heritage, nightlife and water sports."
  },
  {
    name: "Manali",
    country: "India",
    continent: "Asia",
    weather: "Cold & Snowy",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592",
    price: 22000,
    match: 91,
    crowd: "Medium Crowd",
    rating: 4.8,
    bestTime: "October-February",
    duration: "5 Days",
    currency: "Indian Rupee (INR)",
    language: "Hindi",
    description: "Manali is famous for snow-covered mountains, adventure sports, valleys and scenic beauty."
  },
  {
    name: "Istanbul",
    country: "Turkey",
    continent: "Asia",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
    price: 70000,
    match: 88,
    crowd: "Medium Crowd",
    rating: 4.6,
    bestTime: "April-May",
    duration: "5 Days",
    currency: "Turkish Lira (TRY)",
    language: "Turkish",
    description: "Istanbul is famous for historic mosques, bazaars, Bosphorus views and cultural fusion."
  },
  {
    name: "Hanoi",
    country: "Vietnam",
    continent: "Asia",
    weather: "Warm",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592",
    price: 55000,
    match: 90,
    crowd: "Medium Crowd",
    rating: 4.6,
    bestTime: "October-April",
    duration: "5 Days",
    currency: "Vietnamese Dong (VND)",
    language: "Vietnamese",
    description: "Hanoi offers historic temples, street food, lakes and traditional Vietnamese culture."
  },
  {
    name: "Petra",
    country: "Jordan",
    continent: "Asia",
    weather: "Dry",
    image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f",
    price: 60000,
    match: 92,
    crowd: "Medium Crowd",
    rating: 4.9,
    bestTime: "March-May",
    duration: "4 Days",
    currency: "Jordanian Dinar (JOD)",
    language: "Arabic",
    description: "Petra is a UNESCO wonder famous for rose-red rock-cut architecture and ancient Nabatean history."
  },
  {
    name: "Hong Kong",
    country: "Hong Kong",
    continent: "Asia",
    weather: "Humid",
    image: "https://images.unsplash.com/photo-1536599424071-0b215a388ba7",
    price: 78000,
    match: 90,
    crowd: "Very High Crowd",
    rating: 4.6,
    bestTime: "October-December",
    duration: "4 Days",
    currency: "Hong Kong Dollar (HKD)",
    language: "Cantonese, English",
    description: "Hong Kong mixes dense skyscraper skylines, harbor views, street markets and dim sum culture."
  },
  {
    name: "Taipei",
    country: "Taiwan",
    continent: "Asia",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1470004914212-05527e49370b",
    price: 60000,
    match: 89,
    crowd: "Medium Crowd",
    rating: 4.6,
    bestTime: "October-December",
    duration: "4 Days",
    currency: "New Taiwan Dollar (TWD)",
    language: "Mandarin",
    description: "Taipei is known for night markets, hot springs, temples and the iconic Taipei 101 tower."
  },
  {
    name: "Kuala Lumpur",
    country: "Malaysia",
    continent: "Asia",
    weather: "Tropical",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07",
    price: 50000,
    match: 88,
    crowd: "High Crowd",
    rating: 4.5,
    bestTime: "December-February",
    duration: "4 Days",
    currency: "Malaysian Ringgit (MYR)",
    language: "Malay",
    description: "Kuala Lumpur offers the Petronas Towers, diverse street food and lush nearby rainforests."
  },
  {
    name: "Jaipur",
    country: "India",
    continent: "Asia",
    weather: "Dry",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    price: 25000,
    match: 92,
    crowd: "Medium Crowd",
    rating: 4.7,
    bestTime: "October-March",
    duration: "4 Days",
    currency: "Indian Rupee (INR)",
    language: "Hindi",
    description: "Jaipur, the Pink City, is famous for royal forts, palaces and vibrant bazaars."
  },
 
  // ---------------- EUROPE ----------------
  {
    name: "Paris",
    country: "France",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    price: 85000,
    match: 95,
    crowd: "High Crowd",
    rating: 4.9,
    bestTime: "April-June",
    duration: "5 Days",
    currency: "Euro (EUR)",
    language: "French",
    description: "Paris is known for the Eiffel Tower, Louvre Museum, luxury shopping, romantic cafés and beautiful architecture."
  },
  {
    name: "Rome",
    country: "Italy",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1525874684015-58379d421a52",
    price: 82000,
    match: 94,
    crowd: "Medium Crowd",
    rating: 4.8,
    bestTime: "April-May",
    duration: "5 Days",
    currency: "Euro (EUR)",
    language: "Italian",
    description: "Rome offers the Colosseum, Vatican City, ancient ruins, delicious Italian food and lively streets."
  },
  {
    name: "Venice",
    country: "Italy",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0",
    price: 87000,
    match: 92,
    crowd: "Medium Crowd",
    rating: 4.8,
    bestTime: "April-June",
    duration: "4 Days",
    currency: "Euro (EUR)",
    language: "Italian",
    description: "Venice is famous for canals, gondola rides, colorful architecture and romantic scenery."
  },
  {
    name: "Florence",
    country: "Italy",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1543429776-2782fcdb3e5b",
    price: 81000,
    match: 91,
    crowd: "Medium Crowd",
    rating: 4.8,
    bestTime: "May-June",
    duration: "4 Days",
    currency: "Euro (EUR)",
    language: "Italian",
    description: "Florence is the birthplace of the Renaissance with museums, cathedrals and world-famous art."
  },
  {
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1469796466635-455ede028aca",
    price: 90000,
    match: 97,
    crowd: "Low Crowd",
    rating: 5.0,
    bestTime: "May-September",
    duration: "5 Days",
    currency: "Euro (EUR)",
    language: "Greek",
    description: "Santorini is known for whitewashed houses, blue domes, luxury resorts and stunning sunsets."
  },
  {
    name: "Barcelona",
    country: "Spain",
    continent: "Europe",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded",
    price: 83000,
    match: 93,
    crowd: "High Crowd",
    rating: 4.8,
    bestTime: "April-June",
    duration: "5 Days",
    currency: "Euro (EUR)",
    language: "Spanish",
    description: "Barcelona combines Mediterranean beaches, Gaudí architecture and exciting nightlife."
  },
  {
    name: "Madrid",
    country: "Spain",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4",
    price: 79000,
    match: 91,
    crowd: "Medium Crowd",
    rating: 4.7,
    bestTime: "April-June",
    duration: "4 Days",
    currency: "Euro (EUR)",
    language: "Spanish",
    description: "Madrid is Spain's capital with royal palaces, museums, football culture and delicious cuisine."
  },
  {
    name: "London",
    country: "United Kingdom",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    price: 95000,
    match: 90,
    crowd: "High Crowd",
    rating: 4.8,
    bestTime: "May-September",
    duration: "6 Days",
    currency: "British Pound (GBP)",
    language: "English",
    description: "London offers Buckingham Palace, Big Ben, museums, shopping and iconic red buses."
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017",
    price: 91000,
    match: 92,
    crowd: "Medium Crowd",
    rating: 4.8,
    bestTime: "April-May",
    duration: "5 Days",
    currency: "Euro (EUR)",
    language: "Dutch",
    description: "Amsterdam is famous for canals, cycling, tulip gardens and historic museums."
  },
  {
    name: "Swiss Alps",
    country: "Switzerland",
    continent: "Europe",
    weather: "Cold & Snowy",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: 110000,
    match: 99,
    crowd: "Medium Crowd",
    rating: 5.0,
    bestTime: "December-February",
    duration: "6 Days",
    currency: "Swiss Franc (CHF)",
    language: "German",
    description: "The Swiss Alps feature snow-covered peaks, skiing, luxury resorts and breathtaking scenery."
  },
  {
    name: "Zurich",
    country: "Switzerland",
    continent: "Europe",
    weather: "Cold & Snowy",
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
    price: 98000,
    match: 95,
    crowd: "Medium Crowd",
    rating: 4.9,
    bestTime: "December-February",
    duration: "5 Days",
    currency: "Swiss Franc (CHF)",
    language: "German",
    description: "Zurich offers alpine beauty, luxury shopping, clean streets and scenic lakes."
  },
  {
    name: "Reykjavik",
    country: "Iceland",
    continent: "Europe",
    weather: "Cold & Snowy",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    price: 125000,
    match: 98,
    crowd: "Low Crowd",
    rating: 5.0,
    bestTime: "September-March",
    duration: "6 Days",
    currency: "Icelandic Króna (ISK)",
    language: "Icelandic",
    description: "Reykjavik is the gateway to the Northern Lights, glaciers, volcanoes and hot springs."
  },
  {
    name: "Prague",
    country: "Czech Republic",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439",
    price: 72000,
    match: 90,
    crowd: "Medium Crowd",
    rating: 4.7,
    bestTime: "May-September",
    duration: "4 Days",
    currency: "Czech Koruna (CZK)",
    language: "Czech",
    description: "Prague is famous for medieval architecture, Charles Bridge and charming old streets."
  },
  {
    name: "Vienna",
    country: "Austria",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af",
    price: 86000,
    match: 91,
    crowd: "Medium Crowd",
    rating: 4.8,
    bestTime: "April-June",
    duration: "5 Days",
    currency: "Euro (EUR)",
    language: "German",
    description: "Vienna is known for imperial palaces, classical music, coffee houses and beautiful gardens."
  },
  {
    name: "Budapest",
    country: "Hungary",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d",
    price: 73000,
    match: 90,
    crowd: "Medium Crowd",
    rating: 4.7,
    bestTime: "April-October",
    duration: "4 Days",
    currency: "Hungarian Forint (HUF)",
    language: "Hungarian",
    description: "Budapest is famous for thermal baths, Danube River cruises and historic castles."
  },
  {
    name: "Lisbon",
    country: "Portugal",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a",
    price: 76000,
    match: 92,
    crowd: "Medium Crowd",
    rating: 4.8,
    bestTime: "March-May",
    duration: "5 Days",
    currency: "Euro (EUR)",
    language: "Portuguese",
    description: "Lisbon is known for pastel-colored streets, historic trams, fado music and coastal charm."
  },
  {
    name: "Berlin",
    country: "Germany",
    continent: "Europe",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047",
    price: 78000,
    match: 89,
    crowd: "High Crowd",
    rating: 4.6,
    bestTime: "May-September",
    duration: "5 Days",
    currency: "Euro (EUR)",
    language: "German",
    description: "Berlin blends historic landmarks, world-class museums and a famously vibrant nightlife scene."
  },
  {
    name: "Athens",
    country: "Greece",
    continent: "Europe",
    weather: "Warm",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235",
    price: 74000,
    match: 90,
    crowd: "High Crowd",
    rating: 4.7,
    bestTime: "April-June",
    duration: "4 Days",
    currency: "Euro (EUR)",
    language: "Greek",
    description: "Athens is home to the Acropolis, ancient ruins and a lively mix of history and street life."
  },
  {
    name: "Edinburgh",
    country: "United Kingdom",
    continent: "Europe",
    weather: "Cool",
    image: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc",
    price: 82000,
    match: 91,
    crowd: "Medium Crowd",
    rating: 4.8,
    bestTime: "June-August",
    duration: "4 Days",
    currency: "British Pound (GBP)",
    language: "English",
    description: "Edinburgh charms visitors with its medieval castle, cobblestone streets and festival culture."
  },
  {
    name: "Copenhagen",
    country: "Denmark",
    continent: "Europe",
    weather: "Cool",
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc",
    price: 96000,
    match: 90,
    crowd: "Medium Crowd",
    rating: 4.8,
    bestTime: "May-August",
    duration: "5 Days",
    currency: "Danish Krone (DKK)",
    language: "Danish",
    description: "Copenhagen offers colorful harbors, cycling culture, design shops and Nordic cuisine."
  },
 
  // ---------------- NORTH AMERICA ----------------
  {
    name: "New York",
    country: "United States",
    continent: "North America",
    weather: "Variable",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    price: 150000,
    match: 90,
    crowd: "Very High Crowd",
    rating: 4.7,
    bestTime: "April-June",
    duration: "7 Days",
    currency: "US Dollar (USD)",
    language: "English",
    description: "New York is known for Times Square, Central Park, Broadway and iconic city experiences."
  },
  {
    name: "Vancouver",
    country: "Canada",
    continent: "North America",
    weather: "Cool",
    image: "https://images.unsplash.com/photo-1559511260-66a654ae982a",
    price: 135000,
    match: 89,
    crowd: "Medium Crowd",
    rating: 4.7,
    bestTime: "June-September",
    duration: "6 Days",
    currency: "Canadian Dollar (CAD)",
    language: "English",
    description: "Vancouver offers mountains, beaches, parks and a beautiful mix of nature and city life."
  },
  {
    name: "Los Angeles",
    country: "United States",
    continent: "North America",
    weather: "Sunny",
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9",
    price: 140000,
    match: 88,
    crowd: "High Crowd",
    rating: 4.6,
    bestTime: "March-May",
    duration: "6 Days",
    currency: "US Dollar (USD)",
    language: "English",
    description: "Los Angeles offers Hollywood glamour, beaches, theme parks and year-round sunshine."
  },
  {
    name: "Cancun",
    country: "Mexico",
    continent: "North America",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18",
    price: 80000,
    match: 93,
    crowd: "High Crowd",
    rating: 4.7,
    bestTime: "December-April",
    duration: "5 Days",
    currency: "Mexican Peso (MXN)",
    language: "Spanish",
    description: "Cancun offers turquoise Caribbean beaches, Mayan ruins and lively resort nightlife."
  },
  {
    name: "Toronto",
    country: "Canada",
    continent: "North America",
    weather: "Cool",
    image: "https://images.unsplash.com/photo-1503189773166-77ae8b0ce8c9",
    price: 120000,
    match: 87,
    crowd: "Medium Crowd",
    rating: 4.6,
    bestTime: "May-September",
    duration: "5 Days",
    currency: "Canadian Dollar (CAD)",
    language: "English",
    description: "Toronto blends multicultural neighborhoods, the CN Tower and lakeside city life."
  },
  {
    name: "Chicago",
    country: "United States",
    continent: "North America",
    weather: "Variable",
    image: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6",
    price: 125000,
    match: 87,
    crowd: "High Crowd",
    rating: 4.6,
    bestTime: "May-September",
    duration: "5 Days",
    currency: "US Dollar (USD)",
    language: "English",
    description: "Chicago is known for striking architecture, lakeside skyline views and deep-dish pizza."
  },
  {
    name: "Miami",
    country: "United States",
    continent: "North America",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3",
    price: 118000,
    match: 90,
    crowd: "High Crowd",
    rating: 4.6,
    bestTime: "November-April",
    duration: "5 Days",
    currency: "US Dollar (USD)",
    language: "English, Spanish",
    description: "Miami offers vibrant beaches, Art Deco architecture and a lively Latin-influenced nightlife."
  },
  {
    name: "Mexico City",
    country: "Mexico",
    continent: "North America",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1518659526054-190340724bb0",
    price: 65000,
    match: 88,
    crowd: "High Crowd",
    rating: 4.6,
    bestTime: "March-May",
    duration: "5 Days",
    currency: "Mexican Peso (MXN)",
    language: "Spanish",
    description: "Mexico City boasts ancient ruins, world-class museums and a thriving culinary scene."
  },
  {
    name: "Banff",
    country: "Canada",
    continent: "North America",
    weather: "Cold & Snowy",
    image: "https://images.unsplash.com/photo-1609825488888-3a766db05470",
    price: 108000,
    match: 94,
    crowd: "Medium Crowd",
    rating: 4.9,
    bestTime: "June-September",
    duration: "5 Days",
    currency: "Canadian Dollar (CAD)",
    language: "English",
    description: "Banff National Park stuns with turquoise lakes, glaciers and dramatic Rocky Mountain peaks."
  },
 
  // ---------------- SOUTH AMERICA ----------------
  {
    name: "Rio de Janeiro",
    country: "Brazil",
    continent: "South America",
    weather: "Tropical",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
    price: 125000,
    match: 88,
    crowd: "High Crowd",
    rating: 4.6,
    bestTime: "December-March",
    duration: "6 Days",
    currency: "Brazilian Real (BRL)",
    language: "Portuguese",
    description: "Rio de Janeiro is known for beaches, Christ the Redeemer statue, mountains and festivals."
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    continent: "South America",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849",
    price: 95000,
    match: 89,
    crowd: "Medium Crowd",
    rating: 4.6,
    bestTime: "September-November",
    duration: "6 Days",
    currency: "Argentine Peso (ARS)",
    language: "Spanish",
    description: "Buenos Aires is famous for tango culture, European-style architecture and vibrant nightlife."
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    continent: "South America",
    weather: "Cool",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
    price: 100000,
    match: 96,
    crowd: "Medium Crowd",
    rating: 4.9,
    bestTime: "May-September",
    duration: "5 Days",
    currency: "Peruvian Sol (PEN)",
    language: "Spanish",
    description: "Machu Picchu is a breathtaking Incan citadel set high in the Andes mountains."
  },
  {
    name: "Cartagena",
    country: "Colombia",
    continent: "South America",
    weather: "Tropical",
    image: "https://images.unsplash.com/photo-1583531352515-8884af319dc1",
    price: 70000,
    match: 90,
    crowd: "Medium Crowd",
    rating: 4.7,
    bestTime: "December-March",
    duration: "4 Days",
    currency: "Colombian Peso (COP)",
    language: "Spanish",
    description: "Cartagena charms visitors with colorful colonial streets, Caribbean beaches and old city walls."
  },
  {
    name: "Santiago",
    country: "Chile",
    continent: "South America",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1544077960-604201fe74bc",
    price: 90000,
    match: 87,
    crowd: "Medium Crowd",
    rating: 4.5,
    bestTime: "September-November",
    duration: "5 Days",
    currency: "Chilean Peso (CLP)",
    language: "Spanish",
    description: "Santiago sits framed by the Andes, offering vineyards, museums and a growing food scene."
  },
  {
    name: "Bogotá",
    country: "Colombia",
    continent: "South America",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d",
    price: 68000,
    match: 86,
    crowd: "Medium Crowd",
    rating: 4.4,
    bestTime: "December-March",
    duration: "4 Days",
    currency: "Colombian Peso (COP)",
    language: "Spanish",
    description: "Bogotá offers colonial old town streets, street art, museums and a lively coffee culture."
  },
  {
    name: "Iguazu Falls",
    country: "Argentina/Brazil",
    continent: "South America",
    weather: "Tropical",
    image: "https://images.unsplash.com/photo-1544351449-e2b3b1e7a4a2",
    price: 105000,
    match: 96,
    crowd: "Medium Crowd",
    rating: 4.9,
    bestTime: "April-June",
    duration: "3 Days",
    currency: "Argentine Peso (ARS)",
    language: "Spanish, Portuguese",
    description: "Iguazu Falls is a spectacular system of waterfalls straddling the Argentina-Brazil border."
  },
 
  // ---------------- AFRICA ----------------
  {
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    weather: "Mediterranean",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
    price: 100000,
    match: 87,
    crowd: "Medium Crowd",
    rating: 4.5,
    bestTime: "November-March",
    duration: "6 Days",
    currency: "South African Rand (ZAR)",
    language: "English",
    description: "Cape Town offers mountains, beaches, wildlife experiences and beautiful landscapes."
  },
  {
    name: "Cairo",
    country: "Egypt",
    continent: "Africa",
    weather: "Dry",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368",
    price: 72000,
    match: 86,
    crowd: "High Crowd",
    rating: 4.5,
    bestTime: "October-April",
    duration: "5 Days",
    currency: "Egyptian Pound (EGP)",
    language: "Arabic",
    description: "Cairo is famous for the Pyramids of Giza, ancient history and Egyptian museums."
  },
  {
    name: "Marrakech",
    country: "Morocco",
    continent: "Africa",
    weather: "Warm",
    image: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3",
    price: 78000,
    match: 87,
    crowd: "Medium Crowd",
    rating: 4.5,
    bestTime: "March-May",
    duration: "5 Days",
    currency: "Moroccan Dirham (MAD)",
    language: "Arabic",
    description: "Marrakech is famous for colorful markets, palaces, gardens and Moroccan traditions."
  },
  {
    name: "Zanzibar",
    country: "Tanzania",
    continent: "Africa",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7",
    price: 90000,
    match: 92,
    crowd: "Low Crowd",
    rating: 4.8,
    bestTime: "June-October",
    duration: "5 Days",
    currency: "Tanzanian Shilling (TZS)",
    language: "Swahili",
    description: "Zanzibar is famous for white-sand beaches, spice tours and turquoise Indian Ocean waters."
  },
  {
    name: "Victoria Falls",
    country: "Zambia/Zimbabwe",
    continent: "Africa",
    weather: "Warm",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    price: 95000,
    match: 91,
    crowd: "Low Crowd",
    rating: 4.9,
    bestTime: "May-October",
    duration: "4 Days",
    currency: "US Dollar (USD)",
    language: "English",
    description: "Victoria Falls is one of the world's largest waterfalls, offering adventure sports and safari access."
  },
  {
    name: "Nairobi",
    country: "Kenya",
    continent: "Africa",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e",
    price: 88000,
    match: 90,
    crowd: "Medium Crowd",
    rating: 4.6,
    bestTime: "June-October",
    duration: "6 Days",
    currency: "Kenyan Shilling (KES)",
    language: "Swahili, English",
    description: "Nairobi is the gateway to world-famous safaris and wildlife encounters in the Maasai Mara."
  },
  {
    name: "Seychelles",
    country: "Seychelles",
    continent: "Africa",
    weather: "Beach & Warm",
    image: "https://images.unsplash.com/photo-1589979481223-deb3aac1c6d6",
    price: 130000,
    match: 97,
    crowd: "Low Crowd",
    rating: 5.0,
    bestTime: "April-May",
    duration: "5 Days",
    currency: "Seychellois Rupee (SCR)",
    language: "Creole, English, French",
    description: "Seychelles is famous for granite boulder beaches, coral reefs and luxury island resorts."
  },
  {
    name: "Tunis",
    country: "Tunisia",
    continent: "Africa",
    weather: "Mediterranean",
    image: "https://images.unsplash.com/photo-1591450662754-6b81eca90b9d",
    price: 55000,
    match: 85,
    crowd: "Medium Crowd",
    rating: 4.4,
    bestTime: "March-May",
    duration: "4 Days",
    currency: "Tunisian Dinar (TND)",
    language: "Arabic, French",
    description: "Tunis offers ancient medinas, Roman ruins and a Mediterranean coastline."
  },
 
  // ---------------- OCEANIA ----------------
  {
    name: "Sydney",
    country: "Australia",
    continent: "Oceania",
    weather: "Pleasant",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
    price: 140000,
    match: 90,
    crowd: "Medium Crowd",
    rating: 4.7,
    bestTime: "September-November",
    duration: "7 Days",
    currency: "Australian Dollar (AUD)",
    language: "English",
    description: "Sydney is known for the Opera House, Harbour Bridge, beaches and outdoor lifestyle."
  },
  {
    name: "Auckland",
    country: "New Zealand",
    continent: "Oceania",
    weather: "Mild",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
    price: 130000,
    match: 89,
    crowd: "Low Crowd",
    rating: 4.7,
    bestTime: "December-March",
    duration: "6 Days",
    currency: "New Zealand Dollar (NZD)",
    language: "English",
    description: "Auckland offers volcanic landscapes, harbors, wineries and easy access to stunning nature."
  },
  {
    name: "Fiji",
    country: "Fiji",
    continent: "Oceania",
    weather: "Tropical",
    image: "https://images.unsplash.com/photo-1573790387438-4da905039392",
    price: 110000,
    match: 95,
    crowd: "Low Crowd",
    rating: 4.9,
    bestTime: "May-October",
    duration: "6 Days",
    currency: "Fijian Dollar (FJD)",
    language: "English, Fijian",
    description: "Fiji is famous for pristine coral reefs, overwater bungalows and warm island hospitality."
  },
  {
    name: "Melbourne",
    country: "Australia",
    continent: "Oceania",
    weather: "Variable",
    image: "https://images.unsplash.com/photo-1514395462725-fb4566210144",
    price: 132000,
    match: 89,
    crowd: "Medium Crowd",
    rating: 4.7,
    bestTime: "March-May",
    duration: "6 Days",
    currency: "Australian Dollar (AUD)",
    language: "English",
    description: "Melbourne is known for its laneway cafes, arts scene, sports culture and coastal drives."
  },
  {
    name: "Queenstown",
    country: "New Zealand",
    continent: "Oceania",
    weather: "Cold & Snowy",
    image: "https://images.unsplash.com/photo-1589871173980-5c353834e5e1",
    price: 128000,
    match: 95,
    crowd: "Low Crowd",
    rating: 4.9,
    bestTime: "June-September",
    duration: "5 Days",
    currency: "New Zealand Dollar (NZD)",
    language: "English",
    description: "Queenstown is the adventure capital of New Zealand, framed by mountains and alpine lakes."
  },
  {
    name: "Bora Bora",
    country: "French Polynesia",
    continent: "Oceania",
    weather: "Tropical",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc32",
    price: 150000,
    match: 98,
    crowd: "Low Crowd",
    rating: 5.0,
    bestTime: "May-October",
    duration: "6 Days",
    currency: "CFP Franc (XPF)",
    language: "French",
    description: "Bora Bora is celebrated for its turquoise lagoon, overwater villas and dramatic volcanic peak."
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

      const countryMatch =
        !preferences.country ||
        destination.country === preferences.country;

      const weatherMatch =
        preferences.weather === "Any" ||
        !preferences.weather ||
        destination.weather === preferences.weather;

      const crowdMatch =
        crowdFilter === "All" ||
        destination.crowd === crowdFilter;

      const searchMatch = destination.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        continentMatch &&
        countryMatch &&
        weatherMatch &&
        crowdMatch &&
        searchMatch
      );
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price;
      }

      return b.match - a.match;
    });

  return (
    <div className="results-page">

      <div className="results-header">
        <h1>Recommended Destinations</h1>

        <p>
          {filteredDestinations.length} destinations matched your travel profile
        </p>
      </div>


      <div className="preferences-summary">

        <span>🌍 {preferences.continent}</span>

        <span>📍 {preferences.country}</span>

        <span>☀ {preferences.weather}</span>

        <span>
          💰 ₹{preferences.budget?.toLocaleString()}
        </span>

        <span>
          🗓 {preferences.days} Days
        </span>

      </div>


      <div className="filter-section">

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
            <option value="match">
              Sort by Match
            </option>

            <option value="price">
              Sort by Price
            </option>

          </select>


          <select
            value={crowdFilter}
            onChange={(e) => setCrowdFilter(e.target.value)}
          >

            <option value="All">
              All Crowd Levels
            </option>

            <option value="Low Crowd">
              Low Crowd
            </option>

            <option value="Medium Crowd">
              Medium Crowd
            </option>

            <option value="High Crowd">
              High Crowd
            </option>

          </select>

        </div>

      </div>


      {
        filteredDestinations.length > 0 ? (

          <div className="results-grid">

            {
              filteredDestinations.map((destination) => (

                <DestinationCard
                  key={destination.name}
                  destination={destination}
                />

              ))
            }

          </div>

        ) : (

          <h2 className="no-results">
            No destinations found for your preferences.
          </h2>

        )
      }

    </div>
  );
}