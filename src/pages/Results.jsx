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
    description:
      "Tokyo blends futuristic skyscrapers with ancient temples, offering world-class shopping, food, anime culture and nightlife."
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
  name: "Paris",
  country: "France",
  continent: "Europe",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  price: 85000,
  match: 95,
  crowd: "High Crowd",
  rating: 4.8,
  bestTime: "April-June",
  duration: "5 Days",
  currency: "Euro (EUR)",
  language: "French",
  description: "Paris is famous for the Eiffel Tower, Louvre Museum, romantic streets and rich cultural heritage."
},

{
  name: "Tokyo",
  country: "Japan",
  continent: "Asia",
  weather: "Cool",
  image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
  price: 120000,
  match: 92,
  crowd: "High Crowd",
  rating: 4.9,
  bestTime: "March-May",
  duration: "6 Days",
  currency: "Japanese Yen (JPY)",
  language: "Japanese",
  description: "Tokyo offers a mix of modern technology, traditional temples, anime culture and amazing food."
},

{
  name: "Bali",
  country: "Indonesia",
  continent: "Asia",
  weather: "Tropical",
  image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
  price: 65000,
  match: 94,
  crowd: "Medium Crowd",
  rating: 4.7,
  bestTime: "April-October",
  duration: "5 Days",
  currency: "Indonesian Rupiah (IDR)",
  language: "Indonesian",
  description: "Bali is known for beautiful beaches, temples, waterfalls and relaxing tropical experiences."
},

{
  name: "Dubai",
  country: "United Arab Emirates",
  continent: "Asia",
  weather: "Hot",
  image: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
  price: 95000,
  match: 91,
  crowd: "High Crowd",
  rating: 4.6,
  bestTime: "November-March",
  duration: "4 Days",
  currency: "UAE Dirham (AED)",
  language: "Arabic",
  description: "Dubai is famous for luxury shopping, skyscrapers, desert safaris and modern attractions."
},

{
  name: "London",
  country: "United Kingdom",
  continent: "Europe",
  weather: "Cool",
  image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
  price: 110000,
  match: 89,
  crowd: "High Crowd",
  rating: 4.7,
  bestTime: "May-September",
  duration: "6 Days",
  currency: "British Pound (GBP)",
  language: "English",
  description: "London is famous for historic landmarks, museums, royal palaces and vibrant city life."
},

{
  name: "Santorini",
  country: "Greece",
  continent: "Europe",
  weather: "Sunny",
  image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
  price: 90000,
  match: 93,
  crowd: "Medium Crowd",
  rating: 4.8,
  bestTime: "May-October",
  duration: "4 Days",
  currency: "Euro (EUR)",
  language: "Greek",
  description: "Santorini is famous for white buildings, blue domes, sunsets and beautiful coastal views."
},

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
  name: "Rome",
  country: "Italy",
  continent: "Europe",
  weather: "Warm",
  image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
  price: 88000,
  match: 94,
  crowd: "High Crowd",
  rating: 4.8,
  bestTime: "April-June",
  duration: "5 Days",
  currency: "Euro (EUR)",
  language: "Italian",
  description: "Rome is famous for ancient ruins, the Colosseum, Vatican City and historic architecture."
},

{
  name: "Maldives",
  country: "Maldives",
  continent: "Asia",
  weather: "Tropical",
  image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
  price: 105000,
  match: 96,
  crowd: "Low Crowd",
  rating: 4.9,
  bestTime: "November-April",
  duration: "5 Days",
  currency: "Maldivian Rufiyaa (MVR)",
  language: "Dhivehi",
  description: "Maldives is famous for crystal clear water, luxury resorts, coral reefs and peaceful beaches."
},

{
  name: "Barcelona",
  country: "Spain",
  continent: "Europe",
  weather: "Mediterranean",
  image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4",
  price: 82000,
  match: 91,
  crowd: "Medium Crowd",
  rating: 4.7,
  bestTime: "May-July",
  duration: "5 Days",
  currency: "Euro (EUR)",
  language: "Spanish",
  description: "Barcelona is known for Gaudi architecture, beaches, football culture and lively streets."
},

{
  name: "Singapore",
  country: "Singapore",
  continent: "Asia",
  weather: "Humid",
  image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
  price: 75000,
  match: 92,
  crowd: "High Crowd",
  rating: 4.6,
  bestTime: "February-April",
  duration: "4 Days",
  currency: "Singapore Dollar (SGD)",
  language: "English",
  description: "Singapore offers modern attractions, Marina Bay Sands, gardens and diverse cuisine."
},

{
  name: "Istanbul",
  country: "Turkey",
  continent: "Europe",
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
  name: "Seoul",
  country: "South Korea",
  continent: "Asia",
  weather: "Cool",
  image: "https://images.unsplash.com/photo-1538485399081-7c897c3b7d0d",
  price: 115000,
  match: 93,
  crowd: "High Crowd",
  rating: 4.8,
  bestTime: "March-May",
  duration: "6 Days",
  currency: "South Korean Won (KRW)",
  language: "Korean",
  description: "Seoul combines modern technology, K-pop culture, palaces and traditional markets."
},

{
  name: "Amsterdam",
  country: "Netherlands",
  continent: "Europe",
  weather: "Cool",
  image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017",
  price: 92000,
  match: 89,
  crowd: "High Crowd",
  rating: 4.7,
  bestTime: "April-May",
  duration: "5 Days",
  currency: "Euro (EUR)",
  language: "Dutch",
  description: "Amsterdam is famous for canals, museums, cycling culture and historic buildings."
},

{
  name: "Prague",
  country: "Czech Republic",
  continent: "Europe",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1541849546-216549ae216d",
  price: 68000,
  match: 90,
  crowd: "Medium Crowd",
  rating: 4.6,
  bestTime: "April-October",
  duration: "4 Days",
  currency: "Czech Koruna (CZK)",
  language: "Czech",
  description: "Prague is known for castles, old town squares, bridges and beautiful medieval streets."
},
{
  name: "Venice",
  country: "Italy",
  continent: "Europe",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1529260830199-42c24126f198",
  price: 95000,
  match: 92,
  crowd: "High Crowd",
  rating: 4.8,
  bestTime: "April-June",
  duration: "4 Days",
  currency: "Euro (EUR)",
  language: "Italian",
  description: "Venice is famous for canals, gondola rides, historic bridges and romantic architecture."
},

{
  name: "Kyoto",
  country: "Japan",
  continent: "Asia",
  weather: "Cool",
  image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
  price: 105000,
  match: 94,
  crowd: "Medium Crowd",
  rating: 4.9,
  bestTime: "March-May",
  duration: "5 Days",
  currency: "Japanese Yen (JPY)",
  language: "Japanese",
  description: "Kyoto is known for ancient temples, cherry blossoms, gardens and traditional Japanese culture."
},

{
  name: "Swiss Alps",
  country: "Switzerland",
  continent: "Europe",
  weather: "Cold",
  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  price: 130000,
  match: 95,
  crowd: "Medium Crowd",
  rating: 4.9,
  bestTime: "December-March",
  duration: "6 Days",
  currency: "Swiss Franc (CHF)",
  language: "German",
  description: "Swiss Alps offer snowy mountains, scenic villages, skiing and breathtaking landscapes."
},

{
  name: "Phuket",
  country: "Thailand",
  continent: "Asia",
  weather: "Tropical",
  image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
  price: 60000,
  match: 91,
  crowd: "Medium Crowd",
  rating: 4.6,
  bestTime: "November-April",
  duration: "5 Days",
  currency: "Thai Baht (THB)",
  language: "Thai",
  description: "Phuket is famous for beaches, islands, water activities and vibrant nightlife."
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
  name: "Vienna",
  country: "Austria",
  continent: "Europe",
  weather: "Mild",
  image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af",
  price: 85000,
  match: 90,
  crowd: "Medium Crowd",
  rating: 4.7,
  bestTime: "April-October",
  duration: "5 Days",
  currency: "Euro (EUR)",
  language: "German",
  description: "Vienna is known for classical music, royal palaces, museums and elegant architecture."
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