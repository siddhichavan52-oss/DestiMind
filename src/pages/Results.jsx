import React, { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Heart, X, Scale, Clock, Trash2, Share2, MapPin, Calendar, Wallet, Users, Building2, Sun, Star, Tag, DollarSign, Target } from "lucide-react";
import { getSession } from '../utils/auth';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';
import { getSearchHistory, addSearchHistory, clearSearchHistory, removeSearchHistory } from '../utils/searchHistory';
import { recordFavorite, recordComparison, checkAchievements } from '../utils/gamification';
import "./Results.css";

/*
  RESULTS.JSX — FRONTEND ONLY

  IMPORTANT:
  - Keep this file at: src/pages/Results.jsx
  - No separate data file is required.
  - The complete India destination data is kept in this file.
  - Your existing Results.css is NOT changed.
  - State is always checked before city/place matching.
  - If city is empty, cities from the selected state are shown.
  - If city is entered, ONLY places from that city are shown.
  - Budget / days / trip type / group are used for scoring instead of
    aggressively removing results, so the page can still show close matches.
*/

const INDIA_DESTINATIONS = [
  {
    "id": "andhra-pradesh-visakhapatnam-1",
    "state": "Andhra Pradesh",
    "city": "Visakhapatnam",
    "place": "RK Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-visakhapatnam-2",
    "state": "Andhra Pradesh",
    "city": "Visakhapatnam",
    "place": "Kailasagiri",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-visakhapatnam-3",
    "state": "Andhra Pradesh",
    "city": "Visakhapatnam",
    "place": "INS Kurusura Submarine Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-visakhapatnam-4",
    "state": "Andhra Pradesh",
    "city": "Visakhapatnam",
    "place": "Yarada Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-visakhapatnam-5",
    "state": "Andhra Pradesh",
    "city": "Visakhapatnam",
    "place": "Dolphin's Nose",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-vijayawada-6",
    "state": "Andhra Pradesh",
    "city": "Vijayawada",
    "place": "Kanaka Durga Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-vijayawada-7",
    "state": "Andhra Pradesh",
    "city": "Vijayawada",
    "place": "Prakasam Barrage",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-vijayawada-8",
    "state": "Andhra Pradesh",
    "city": "Vijayawada",
    "place": "Bhavani Island",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-vijayawada-9",
    "state": "Andhra Pradesh",
    "city": "Vijayawada",
    "place": "Undavalli Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-vijayawada-10",
    "state": "Andhra Pradesh",
    "city": "Vijayawada",
    "place": "Gandhi Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-tirupati-11",
    "state": "Andhra Pradesh",
    "city": "Tirupati",
    "place": "Tirumala Venkateswara Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-tirupati-12",
    "state": "Andhra Pradesh",
    "city": "Tirupati",
    "place": "Sri Kapileswara Swamy Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-tirupati-13",
    "state": "Andhra Pradesh",
    "city": "Tirupati",
    "place": "Akasa Ganga",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-tirupati-14",
    "state": "Andhra Pradesh",
    "city": "Tirupati",
    "place": "Silathoranam",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-tirupati-15",
    "state": "Andhra Pradesh",
    "city": "Tirupati",
    "place": "Sri Govindaraja Swamy Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-amaravati-16",
    "state": "Andhra Pradesh",
    "city": "Amaravati",
    "place": "Amaravati Stupa",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-amaravati-17",
    "state": "Andhra Pradesh",
    "city": "Amaravati",
    "place": "Amaralingeswara Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-amaravati-18",
    "state": "Andhra Pradesh",
    "city": "Amaravati",
    "place": "Dhyana Buddha Statue",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-amaravati-19",
    "state": "Andhra Pradesh",
    "city": "Amaravati",
    "place": "Undavalli Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-amaravati-20",
    "state": "Andhra Pradesh",
    "city": "Amaravati",
    "place": "Prakasam Barrage",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-araku-valley-21",
    "state": "Andhra Pradesh",
    "city": "Araku Valley",
    "place": "Borra Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-araku-valley-22",
    "state": "Andhra Pradesh",
    "city": "Araku Valley",
    "place": "Araku Tribal Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-araku-valley-23",
    "state": "Andhra Pradesh",
    "city": "Araku Valley",
    "place": "Katiki Waterfalls",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-araku-valley-24",
    "state": "Andhra Pradesh",
    "city": "Araku Valley",
    "place": "Chaparai Waterfalls",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-araku-valley-25",
    "state": "Andhra Pradesh",
    "city": "Araku Valley",
    "place": "Coffee Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-rajahmundry-26",
    "state": "Andhra Pradesh",
    "city": "Rajahmundry",
    "place": "Godavari Bridge",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-rajahmundry-27",
    "state": "Andhra Pradesh",
    "city": "Rajahmundry",
    "place": "Pushkar Ghat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-rajahmundry-28",
    "state": "Andhra Pradesh",
    "city": "Rajahmundry",
    "place": "Dowleswaram Barrage",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-rajahmundry-29",
    "state": "Andhra Pradesh",
    "city": "Rajahmundry",
    "place": "ISKCON Temple Rajahmundry",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andhra-pradesh-rajahmundry-30",
    "state": "Andhra Pradesh",
    "city": "Rajahmundry",
    "place": "Papi Hills",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-itanagar-31",
    "state": "Arunachal Pradesh",
    "city": "Itanagar",
    "place": "Ita Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-itanagar-32",
    "state": "Arunachal Pradesh",
    "city": "Itanagar",
    "place": "Ganga Lake (Gekar Sinyi)",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-itanagar-33",
    "state": "Arunachal Pradesh",
    "city": "Itanagar",
    "place": "Jawaharlal Nehru State Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-itanagar-34",
    "state": "Arunachal Pradesh",
    "city": "Itanagar",
    "place": "Indira Gandhi Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-itanagar-35",
    "state": "Arunachal Pradesh",
    "city": "Itanagar",
    "place": "Gompa",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-tawang-36",
    "state": "Arunachal Pradesh",
    "city": "Tawang",
    "place": "Tawang Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-tawang-37",
    "state": "Arunachal Pradesh",
    "city": "Tawang",
    "place": "Sela Pass",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-tawang-38",
    "state": "Arunachal Pradesh",
    "city": "Tawang",
    "place": "Madhuri Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-tawang-39",
    "state": "Arunachal Pradesh",
    "city": "Tawang",
    "place": "Nuranang Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-tawang-40",
    "state": "Arunachal Pradesh",
    "city": "Tawang",
    "place": "Tawang War Memorial",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-bomdila-41",
    "state": "Arunachal Pradesh",
    "city": "Bomdila",
    "place": "Bomdila Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-bomdila-42",
    "state": "Arunachal Pradesh",
    "city": "Bomdila",
    "place": "Apple Orchards",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-bomdila-43",
    "state": "Arunachal Pradesh",
    "city": "Bomdila",
    "place": "Eaglenest Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-bomdila-44",
    "state": "Arunachal Pradesh",
    "city": "Bomdila",
    "place": "Bomdila View Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-bomdila-45",
    "state": "Arunachal Pradesh",
    "city": "Bomdila",
    "place": "Upper Gompa",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-ziro-46",
    "state": "Arunachal Pradesh",
    "city": "Ziro",
    "place": "Ziro Valley",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-ziro-47",
    "state": "Arunachal Pradesh",
    "city": "Ziro",
    "place": "Talley Valley Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-ziro-48",
    "state": "Arunachal Pradesh",
    "city": "Ziro",
    "place": "Shiva Linga",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-ziro-49",
    "state": "Arunachal Pradesh",
    "city": "Ziro",
    "place": "Hong Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-ziro-50",
    "state": "Arunachal Pradesh",
    "city": "Ziro",
    "place": "Ziro Music Festival Ground",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-dirang-51",
    "state": "Arunachal Pradesh",
    "city": "Dirang",
    "place": "Dirang Dzong",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-dirang-52",
    "state": "Arunachal Pradesh",
    "city": "Dirang",
    "place": "Sangti Valley",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-dirang-53",
    "state": "Arunachal Pradesh",
    "city": "Dirang",
    "place": "Dirang Hot Water Spring",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-dirang-54",
    "state": "Arunachal Pradesh",
    "city": "Dirang",
    "place": "Mandro Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "arunachal-pradesh-dirang-55",
    "state": "Arunachal Pradesh",
    "city": "Dirang",
    "place": "Thupsung Dhargye Ling Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-guwahati-56",
    "state": "Assam",
    "city": "Guwahati",
    "place": "Kamakhya Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-guwahati-57",
    "state": "Assam",
    "city": "Guwahati",
    "place": "Umananda Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-guwahati-58",
    "state": "Assam",
    "city": "Guwahati",
    "place": "Assam State Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-guwahati-59",
    "state": "Assam",
    "city": "Guwahati",
    "place": "Deepor Beel",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-guwahati-60",
    "state": "Assam",
    "city": "Guwahati",
    "place": "Navagraha Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-kaziranga-61",
    "state": "Assam",
    "city": "Kaziranga",
    "place": "Kaziranga National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-kaziranga-62",
    "state": "Assam",
    "city": "Kaziranga",
    "place": "Kohora Range",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-kaziranga-63",
    "state": "Assam",
    "city": "Kaziranga",
    "place": "Bagori Range",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-kaziranga-64",
    "state": "Assam",
    "city": "Kaziranga",
    "place": "Kaziranga Orchid Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-kaziranga-65",
    "state": "Assam",
    "city": "Kaziranga",
    "place": "Panbari Reserve Forest",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-jorhat-66",
    "state": "Assam",
    "city": "Jorhat",
    "place": "Majuli Island",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-jorhat-67",
    "state": "Assam",
    "city": "Jorhat",
    "place": "Jorhat Gymkhana Club",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-jorhat-68",
    "state": "Assam",
    "city": "Jorhat",
    "place": "Tocklai Tea Research Institute",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-jorhat-69",
    "state": "Assam",
    "city": "Jorhat",
    "place": "Hoollongapar Gibbon Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-jorhat-70",
    "state": "Assam",
    "city": "Jorhat",
    "place": "Garh Ali",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-tezpur-71",
    "state": "Assam",
    "city": "Tezpur",
    "place": "Agnigarh",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-tezpur-72",
    "state": "Assam",
    "city": "Tezpur",
    "place": "Chitralekha Udyan",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-tezpur-73",
    "state": "Assam",
    "city": "Tezpur",
    "place": "Mahabhairav Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-tezpur-74",
    "state": "Assam",
    "city": "Tezpur",
    "place": "Cole Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-tezpur-75",
    "state": "Assam",
    "city": "Tezpur",
    "place": "Bamuni Hills",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-silchar-76",
    "state": "Assam",
    "city": "Silchar",
    "place": "Maniharan Tunnel",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-silchar-77",
    "state": "Assam",
    "city": "Silchar",
    "place": "Kachari Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-silchar-78",
    "state": "Assam",
    "city": "Silchar",
    "place": "ISKCON Silchar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-silchar-79",
    "state": "Assam",
    "city": "Silchar",
    "place": "Gandhibagh Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "assam-silchar-80",
    "state": "Assam",
    "city": "Silchar",
    "place": "Bhubaneswar Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-patna-81",
    "state": "Bihar",
    "city": "Patna",
    "place": "Golghar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-patna-82",
    "state": "Bihar",
    "city": "Patna",
    "place": "Bihar Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-patna-83",
    "state": "Bihar",
    "city": "Patna",
    "place": "Patna Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-patna-84",
    "state": "Bihar",
    "city": "Patna",
    "place": "Sanjay Gandhi Biological Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-patna-85",
    "state": "Bihar",
    "city": "Patna",
    "place": "Takht Sri Patna Sahib",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-gaya-86",
    "state": "Bihar",
    "city": "Gaya",
    "place": "Mahabodhi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-gaya-87",
    "state": "Bihar",
    "city": "Gaya",
    "place": "Bodhi Tree",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-gaya-88",
    "state": "Bihar",
    "city": "Gaya",
    "place": "Vishnupad Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-gaya-89",
    "state": "Bihar",
    "city": "Gaya",
    "place": "Dungeshwari Cave Temples",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-gaya-90",
    "state": "Bihar",
    "city": "Gaya",
    "place": "Muchalinda Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-rajgir-91",
    "state": "Bihar",
    "city": "Rajgir",
    "place": "Rajgir Ropeway",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-rajgir-92",
    "state": "Bihar",
    "city": "Rajgir",
    "place": "Vishwa Shanti Stupa",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-rajgir-93",
    "state": "Bihar",
    "city": "Rajgir",
    "place": "Griddhakuta Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-rajgir-94",
    "state": "Bihar",
    "city": "Rajgir",
    "place": "Nalanda University Ruins",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-rajgir-95",
    "state": "Bihar",
    "city": "Rajgir",
    "place": "Hot Springs",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-nalanda-96",
    "state": "Bihar",
    "city": "Nalanda",
    "place": "Nalanda Mahavihara",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-nalanda-97",
    "state": "Bihar",
    "city": "Nalanda",
    "place": "Xuanzang Memorial Hall",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-nalanda-98",
    "state": "Bihar",
    "city": "Nalanda",
    "place": "Nalanda Archaeological Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-nalanda-99",
    "state": "Bihar",
    "city": "Nalanda",
    "place": "Black Buddha Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-nalanda-100",
    "state": "Bihar",
    "city": "Nalanda",
    "place": "Surya Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-vaishali-101",
    "state": "Bihar",
    "city": "Vaishali",
    "place": "Ashokan Pillar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-vaishali-102",
    "state": "Bihar",
    "city": "Vaishali",
    "place": "Buddha Stupa",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-vaishali-103",
    "state": "Bihar",
    "city": "Vaishali",
    "place": "Vishwa Shanti Stupa",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-vaishali-104",
    "state": "Bihar",
    "city": "Vaishali",
    "place": "Kutagarasala Vihara",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "bihar-vaishali-105",
    "state": "Bihar",
    "city": "Vaishali",
    "place": "Vaishali Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-raipur-106",
    "state": "Chhattisgarh",
    "city": "Raipur",
    "place": "Nandan Van Zoo and Safari",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-raipur-107",
    "state": "Chhattisgarh",
    "city": "Raipur",
    "place": "Mahant Ghasidas Memorial Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-raipur-108",
    "state": "Chhattisgarh",
    "city": "Raipur",
    "place": "Purkhouti Muktangan",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-raipur-109",
    "state": "Chhattisgarh",
    "city": "Raipur",
    "place": "Telibandha Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-raipur-110",
    "state": "Chhattisgarh",
    "city": "Raipur",
    "place": "Banjari Mata Mandir",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-jagdalpur-111",
    "state": "Chhattisgarh",
    "city": "Jagdalpur",
    "place": "Chitrakote Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-jagdalpur-112",
    "state": "Chhattisgarh",
    "city": "Jagdalpur",
    "place": "Tirathgarh Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-jagdalpur-113",
    "state": "Chhattisgarh",
    "city": "Jagdalpur",
    "place": "Kanger Valley National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-jagdalpur-114",
    "state": "Chhattisgarh",
    "city": "Jagdalpur",
    "place": "Bastar Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-jagdalpur-115",
    "state": "Chhattisgarh",
    "city": "Jagdalpur",
    "place": "Anthropological Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-bilaspur-116",
    "state": "Chhattisgarh",
    "city": "Bilaspur",
    "place": "Achanakmar Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-bilaspur-117",
    "state": "Chhattisgarh",
    "city": "Bilaspur",
    "place": "Khutaghat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-bilaspur-118",
    "state": "Chhattisgarh",
    "city": "Bilaspur",
    "place": "Malhar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-bilaspur-119",
    "state": "Chhattisgarh",
    "city": "Bilaspur",
    "place": "Devrani Jethani Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-bilaspur-120",
    "state": "Chhattisgarh",
    "city": "Bilaspur",
    "place": "Tala Temples",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-ambikapur-121",
    "state": "Chhattisgarh",
    "city": "Ambikapur",
    "place": "Mainpat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-ambikapur-122",
    "state": "Chhattisgarh",
    "city": "Ambikapur",
    "place": "Tiger Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-ambikapur-123",
    "state": "Chhattisgarh",
    "city": "Ambikapur",
    "place": "Machali Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-ambikapur-124",
    "state": "Chhattisgarh",
    "city": "Ambikapur",
    "place": "Thinthini Patthar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-ambikapur-125",
    "state": "Chhattisgarh",
    "city": "Ambikapur",
    "place": "Mahamaya Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-dongargarh-126",
    "state": "Chhattisgarh",
    "city": "Dongargarh",
    "place": "Bamleshwari Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-dongargarh-127",
    "state": "Chhattisgarh",
    "city": "Dongargarh",
    "place": "Pragya Giri",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-dongargarh-128",
    "state": "Chhattisgarh",
    "city": "Dongargarh",
    "place": "Maa Bamleshwari Ropeway",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-dongargarh-129",
    "state": "Chhattisgarh",
    "city": "Dongargarh",
    "place": "Dongargarh Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chhattisgarh-dongargarh-130",
    "state": "Chhattisgarh",
    "city": "Dongargarh",
    "place": "Shivnath River View",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-panaji-131",
    "state": "Goa",
    "city": "Panaji",
    "place": "Miramar Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-panaji-132",
    "state": "Goa",
    "city": "Panaji",
    "place": "Dona Paula",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-panaji-133",
    "state": "Goa",
    "city": "Panaji",
    "place": "Basilica of Bom Jesus",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-panaji-134",
    "state": "Goa",
    "city": "Panaji",
    "place": "Fontainhas",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-panaji-135",
    "state": "Goa",
    "city": "Panaji",
    "place": "Reis Magos Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-calangute-136",
    "state": "Goa",
    "city": "Calangute",
    "place": "Calangute Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-calangute-137",
    "state": "Goa",
    "city": "Calangute",
    "place": "Calangute Market",
    "category": "Shopping",
    "tripTypes": [
      "Shopping",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-calangute-138",
    "state": "Goa",
    "city": "Calangute",
    "place": "St Alex Church",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-calangute-139",
    "state": "Goa",
    "city": "Calangute",
    "place": "Baga Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-calangute-140",
    "state": "Goa",
    "city": "Calangute",
    "place": "Anjuna Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-vasco-da-gama-141",
    "state": "Goa",
    "city": "Vasco da Gama",
    "place": "Bogmalo Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-vasco-da-gama-142",
    "state": "Goa",
    "city": "Vasco da Gama",
    "place": "Naval Aviation Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-vasco-da-gama-143",
    "state": "Goa",
    "city": "Vasco da Gama",
    "place": "Mormugao Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-vasco-da-gama-144",
    "state": "Goa",
    "city": "Vasco da Gama",
    "place": "Hollant Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-vasco-da-gama-145",
    "state": "Goa",
    "city": "Vasco da Gama",
    "place": "Japanese Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-margao-146",
    "state": "Goa",
    "city": "Margao",
    "place": "Colva Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-margao-147",
    "state": "Goa",
    "city": "Margao",
    "place": "Our Lady of Grace Church",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-margao-148",
    "state": "Goa",
    "city": "Margao",
    "place": "Margao Municipal Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-margao-149",
    "state": "Goa",
    "city": "Margao",
    "place": "Benaulim Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-margao-150",
    "state": "Goa",
    "city": "Margao",
    "place": "Varca Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-mapusa-151",
    "state": "Goa",
    "city": "Mapusa",
    "place": "Mapusa Market",
    "category": "Shopping",
    "tripTypes": [
      "Shopping",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-mapusa-152",
    "state": "Goa",
    "city": "Mapusa",
    "place": "Anjuna Flea Market",
    "category": "Shopping",
    "tripTypes": [
      "Shopping",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-mapusa-153",
    "state": "Goa",
    "city": "Mapusa",
    "place": "Vagator Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-mapusa-154",
    "state": "Goa",
    "city": "Mapusa",
    "place": "Chapora Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "goa-mapusa-155",
    "state": "Goa",
    "city": "Mapusa",
    "place": "Morjim Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-ahmedabad-156",
    "state": "Gujarat",
    "city": "Ahmedabad",
    "place": "Sabarmati Ashram",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-ahmedabad-157",
    "state": "Gujarat",
    "city": "Ahmedabad",
    "place": "Adalaj Stepwell",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-ahmedabad-158",
    "state": "Gujarat",
    "city": "Ahmedabad",
    "place": "Kankaria Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-ahmedabad-159",
    "state": "Gujarat",
    "city": "Ahmedabad",
    "place": "Sidi Saiyyed Mosque",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-ahmedabad-160",
    "state": "Gujarat",
    "city": "Ahmedabad",
    "place": "Science City",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-vadodara-161",
    "state": "Gujarat",
    "city": "Vadodara",
    "place": "Laxmi Vilas Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-vadodara-162",
    "state": "Gujarat",
    "city": "Vadodara",
    "place": "Sayaji Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-vadodara-163",
    "state": "Gujarat",
    "city": "Vadodara",
    "place": "Baroda Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-vadodara-164",
    "state": "Gujarat",
    "city": "Vadodara",
    "place": "Kirti Mandir",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-vadodara-165",
    "state": "Gujarat",
    "city": "Vadodara",
    "place": "EME Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-surat-166",
    "state": "Gujarat",
    "city": "Surat",
    "place": "Dumas Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-surat-167",
    "state": "Gujarat",
    "city": "Surat",
    "place": "Dutch Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-surat-168",
    "state": "Gujarat",
    "city": "Surat",
    "place": "Sarthana Nature Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-surat-169",
    "state": "Gujarat",
    "city": "Surat",
    "place": "Surat Castle",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-surat-170",
    "state": "Gujarat",
    "city": "Surat",
    "place": "Science Centre",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-rajkot-171",
    "state": "Gujarat",
    "city": "Rajkot",
    "place": "Rotary Midtown Dolls Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-rajkot-172",
    "state": "Gujarat",
    "city": "Rajkot",
    "place": "Kaba Gandhi No Delo",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-rajkot-173",
    "state": "Gujarat",
    "city": "Rajkot",
    "place": "Watson Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-rajkot-174",
    "state": "Gujarat",
    "city": "Rajkot",
    "place": "Aji Dam",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-rajkot-175",
    "state": "Gujarat",
    "city": "Rajkot",
    "place": "Pradhyuman Zoological Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-bhuj-176",
    "state": "Gujarat",
    "city": "Bhuj",
    "place": "Aina Mahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-bhuj-177",
    "state": "Gujarat",
    "city": "Bhuj",
    "place": "Prag Mahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-bhuj-178",
    "state": "Gujarat",
    "city": "Bhuj",
    "place": "Kutch Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-bhuj-179",
    "state": "Gujarat",
    "city": "Bhuj",
    "place": "Hamirsar Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-bhuj-180",
    "state": "Gujarat",
    "city": "Bhuj",
    "place": "Kutch Desert Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-junagadh-181",
    "state": "Gujarat",
    "city": "Junagadh",
    "place": "Girnar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-junagadh-182",
    "state": "Gujarat",
    "city": "Junagadh",
    "place": "Uparkot Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-junagadh-183",
    "state": "Gujarat",
    "city": "Junagadh",
    "place": "Mahabat Maqbara",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-junagadh-184",
    "state": "Gujarat",
    "city": "Junagadh",
    "place": "Sakkarbaug Zoo",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-junagadh-185",
    "state": "Gujarat",
    "city": "Junagadh",
    "place": "Girnar Ropeway",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-dwarka-186",
    "state": "Gujarat",
    "city": "Dwarka",
    "place": "Dwarkadhish Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-dwarka-187",
    "state": "Gujarat",
    "city": "Dwarka",
    "place": "Beyt Dwarka",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-dwarka-188",
    "state": "Gujarat",
    "city": "Dwarka",
    "place": "Nageshwar Jyotirlinga",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-dwarka-189",
    "state": "Gujarat",
    "city": "Dwarka",
    "place": "Rukmini Devi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-dwarka-190",
    "state": "Gujarat",
    "city": "Dwarka",
    "place": "Sudama Setu",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-somnath-191",
    "state": "Gujarat",
    "city": "Somnath",
    "place": "Somnath Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-somnath-192",
    "state": "Gujarat",
    "city": "Somnath",
    "place": "Triveni Sangam",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-somnath-193",
    "state": "Gujarat",
    "city": "Somnath",
    "place": "Bhalka Tirth",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-somnath-194",
    "state": "Gujarat",
    "city": "Somnath",
    "place": "Prabhas Patan Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "gujarat-somnath-195",
    "state": "Gujarat",
    "city": "Somnath",
    "place": "Somnath Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-chandigarh-196",
    "state": "Haryana",
    "city": "Chandigarh",
    "place": "Rock Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-chandigarh-197",
    "state": "Haryana",
    "city": "Chandigarh",
    "place": "Sukhna Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-chandigarh-198",
    "state": "Haryana",
    "city": "Chandigarh",
    "place": "Rose Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-chandigarh-199",
    "state": "Haryana",
    "city": "Chandigarh",
    "place": "Capitol Complex",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-chandigarh-200",
    "state": "Haryana",
    "city": "Chandigarh",
    "place": "Zakir Hussain Rose Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-kurukshetra-201",
    "state": "Haryana",
    "city": "Kurukshetra",
    "place": "Brahma Sarovar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-kurukshetra-202",
    "state": "Haryana",
    "city": "Kurukshetra",
    "place": "Jyotisar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-kurukshetra-203",
    "state": "Haryana",
    "city": "Kurukshetra",
    "place": "Krishna Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-kurukshetra-204",
    "state": "Haryana",
    "city": "Kurukshetra",
    "place": "Sheikh Chilli's Tomb",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-kurukshetra-205",
    "state": "Haryana",
    "city": "Kurukshetra",
    "place": "Kurukshetra Panorama",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-gurugram-206",
    "state": "Haryana",
    "city": "Gurugram",
    "place": "Kingdom of Dreams site area",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-gurugram-207",
    "state": "Haryana",
    "city": "Gurugram",
    "place": "Cyber Hub",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-gurugram-208",
    "state": "Haryana",
    "city": "Gurugram",
    "place": "Sultanpur National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-gurugram-209",
    "state": "Haryana",
    "city": "Gurugram",
    "place": "Leisure Valley Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-gurugram-210",
    "state": "Haryana",
    "city": "Gurugram",
    "place": "Sheetla Mata Mandir",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-panipat-211",
    "state": "Haryana",
    "city": "Panipat",
    "place": "Panipat Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-panipat-212",
    "state": "Haryana",
    "city": "Panipat",
    "place": "Kabuli Bagh Mosque",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-panipat-213",
    "state": "Haryana",
    "city": "Panipat",
    "place": "Ibrahim Lodi Tomb",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-panipat-214",
    "state": "Haryana",
    "city": "Panipat",
    "place": "Kala Amb",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-panipat-215",
    "state": "Haryana",
    "city": "Panipat",
    "place": "Panipat Battlefields",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-hisar-216",
    "state": "Haryana",
    "city": "Hisar",
    "place": "Firoz Shah Palace Complex",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-hisar-217",
    "state": "Haryana",
    "city": "Hisar",
    "place": "Gujari Mahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-hisar-218",
    "state": "Haryana",
    "city": "Hisar",
    "place": "Rakhigarhi",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-hisar-219",
    "state": "Haryana",
    "city": "Hisar",
    "place": "Blue Bird Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "haryana-hisar-220",
    "state": "Haryana",
    "city": "Hisar",
    "place": "Lat Ki Masjid",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-shimla-221",
    "state": "Himachal Pradesh",
    "city": "Shimla",
    "place": "Mall Road",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-shimla-222",
    "state": "Himachal Pradesh",
    "city": "Shimla",
    "place": "The Ridge",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-shimla-223",
    "state": "Himachal Pradesh",
    "city": "Shimla",
    "place": "Jakhoo Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-shimla-224",
    "state": "Himachal Pradesh",
    "city": "Shimla",
    "place": "Christ Church",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-shimla-225",
    "state": "Himachal Pradesh",
    "city": "Shimla",
    "place": "Kufri",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-manali-226",
    "state": "Himachal Pradesh",
    "city": "Manali",
    "place": "Solang Valley",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-manali-227",
    "state": "Himachal Pradesh",
    "city": "Manali",
    "place": "Rohtang Pass",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-manali-228",
    "state": "Himachal Pradesh",
    "city": "Manali",
    "place": "Hadimba Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-manali-229",
    "state": "Himachal Pradesh",
    "city": "Manali",
    "place": "Manali Old Town",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-manali-230",
    "state": "Himachal Pradesh",
    "city": "Manali",
    "place": "Vashisht Hot Springs",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-dharamshala-231",
    "state": "Himachal Pradesh",
    "city": "Dharamshala",
    "place": "McLeod Ganj",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-dharamshala-232",
    "state": "Himachal Pradesh",
    "city": "Dharamshala",
    "place": "Dalai Lama Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-dharamshala-233",
    "state": "Himachal Pradesh",
    "city": "Dharamshala",
    "place": "Bhagsu Waterfall",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-dharamshala-234",
    "state": "Himachal Pradesh",
    "city": "Dharamshala",
    "place": "Triund",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-dharamshala-235",
    "state": "Himachal Pradesh",
    "city": "Dharamshala",
    "place": "Kangra Art Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-kasol-236",
    "state": "Himachal Pradesh",
    "city": "Kasol",
    "place": "Parvati Valley",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-kasol-237",
    "state": "Himachal Pradesh",
    "city": "Kasol",
    "place": "Manikaran Sahib",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-kasol-238",
    "state": "Himachal Pradesh",
    "city": "Kasol",
    "place": "Tosh Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-kasol-239",
    "state": "Himachal Pradesh",
    "city": "Kasol",
    "place": "Chalal Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-kasol-240",
    "state": "Himachal Pradesh",
    "city": "Kasol",
    "place": "Malana Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-dalhousie-241",
    "state": "Himachal Pradesh",
    "city": "Dalhousie",
    "place": "Khajjiar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-dalhousie-242",
    "state": "Himachal Pradesh",
    "city": "Dalhousie",
    "place": "Panchpula",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-dalhousie-243",
    "state": "Himachal Pradesh",
    "city": "Dalhousie",
    "place": "Dainkund Peak",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-dalhousie-244",
    "state": "Himachal Pradesh",
    "city": "Dalhousie",
    "place": "St John's Church",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-dalhousie-245",
    "state": "Himachal Pradesh",
    "city": "Dalhousie",
    "place": "Subhash Baoli",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-spiti-246",
    "state": "Himachal Pradesh",
    "city": "Spiti",
    "place": "Key Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-spiti-247",
    "state": "Himachal Pradesh",
    "city": "Spiti",
    "place": "Chandratal Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-spiti-248",
    "state": "Himachal Pradesh",
    "city": "Spiti",
    "place": "Kaza",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-spiti-249",
    "state": "Himachal Pradesh",
    "city": "Spiti",
    "place": "Komic Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "himachal-pradesh-spiti-250",
    "state": "Himachal Pradesh",
    "city": "Spiti",
    "place": "Hikkim",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-ranchi-251",
    "state": "Jharkhand",
    "city": "Ranchi",
    "place": "Dassam Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-ranchi-252",
    "state": "Jharkhand",
    "city": "Ranchi",
    "place": "Hundru Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-ranchi-253",
    "state": "Jharkhand",
    "city": "Ranchi",
    "place": "Jagannath Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-ranchi-254",
    "state": "Jharkhand",
    "city": "Ranchi",
    "place": "Rock Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-ranchi-255",
    "state": "Jharkhand",
    "city": "Ranchi",
    "place": "Birsa Zoological Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-jamshedpur-256",
    "state": "Jharkhand",
    "city": "Jamshedpur",
    "place": "Jubilee Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-jamshedpur-257",
    "state": "Jharkhand",
    "city": "Jamshedpur",
    "place": "Dalma Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-jamshedpur-258",
    "state": "Jharkhand",
    "city": "Jamshedpur",
    "place": "Dimna Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-jamshedpur-259",
    "state": "Jharkhand",
    "city": "Jamshedpur",
    "place": "Tata Steel Zoological Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-jamshedpur-260",
    "state": "Jharkhand",
    "city": "Jamshedpur",
    "place": "Hudco Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-deoghar-261",
    "state": "Jharkhand",
    "city": "Deoghar",
    "place": "Baba Baidyanath Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-deoghar-262",
    "state": "Jharkhand",
    "city": "Deoghar",
    "place": "Trikuta Parvat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-deoghar-263",
    "state": "Jharkhand",
    "city": "Deoghar",
    "place": "Tapovan",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-deoghar-264",
    "state": "Jharkhand",
    "city": "Deoghar",
    "place": "Naulakha Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-deoghar-265",
    "state": "Jharkhand",
    "city": "Deoghar",
    "place": "Shivaganga",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-netarhat-266",
    "state": "Jharkhand",
    "city": "Netarhat",
    "place": "Netarhat Sunset Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-netarhat-267",
    "state": "Jharkhand",
    "city": "Netarhat",
    "place": "Magnolia Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-netarhat-268",
    "state": "Jharkhand",
    "city": "Netarhat",
    "place": "Upper Ghaghri Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-netarhat-269",
    "state": "Jharkhand",
    "city": "Netarhat",
    "place": "Lower Ghaghri Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-netarhat-270",
    "state": "Jharkhand",
    "city": "Netarhat",
    "place": "Koel View Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-hazaribagh-271",
    "state": "Jharkhand",
    "city": "Hazaribagh",
    "place": "Hazaribagh National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-hazaribagh-272",
    "state": "Jharkhand",
    "city": "Hazaribagh",
    "place": "Canary Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-hazaribagh-273",
    "state": "Jharkhand",
    "city": "Hazaribagh",
    "place": "Hazaribagh Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-hazaribagh-274",
    "state": "Jharkhand",
    "city": "Hazaribagh",
    "place": "Rajrappa",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jharkhand-hazaribagh-275",
    "state": "Jharkhand",
    "city": "Hazaribagh",
    "place": "Konar Dam",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-bengaluru-276",
    "state": "Karnataka",
    "city": "Bengaluru",
    "place": "Bangalore Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-bengaluru-277",
    "state": "Karnataka",
    "city": "Bengaluru",
    "place": "Lalbagh Botanical Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-bengaluru-278",
    "state": "Karnataka",
    "city": "Bengaluru",
    "place": "Cubbon Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-bengaluru-279",
    "state": "Karnataka",
    "city": "Bengaluru",
    "place": "Vidhana Soudha",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-bengaluru-280",
    "state": "Karnataka",
    "city": "Bengaluru",
    "place": "ISKCON Temple Bengaluru",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-mysuru-281",
    "state": "Karnataka",
    "city": "Mysuru",
    "place": "Mysore Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-mysuru-282",
    "state": "Karnataka",
    "city": "Mysuru",
    "place": "Chamundi Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-mysuru-283",
    "state": "Karnataka",
    "city": "Mysuru",
    "place": "Brindavan Gardens",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-mysuru-284",
    "state": "Karnataka",
    "city": "Mysuru",
    "place": "St Philomena's Cathedral",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-mysuru-285",
    "state": "Karnataka",
    "city": "Mysuru",
    "place": "Mysuru Zoo",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-coorg-286",
    "state": "Karnataka",
    "city": "Coorg",
    "place": "Abbey Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-coorg-287",
    "state": "Karnataka",
    "city": "Coorg",
    "place": "Raja's Seat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-coorg-288",
    "state": "Karnataka",
    "city": "Coorg",
    "place": "Dubare Elephant Camp",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-coorg-289",
    "state": "Karnataka",
    "city": "Coorg",
    "place": "Talakaveri",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-coorg-290",
    "state": "Karnataka",
    "city": "Coorg",
    "place": "Mandalpatti",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-hampi-291",
    "state": "Karnataka",
    "city": "Hampi",
    "place": "Virupaksha Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-hampi-292",
    "state": "Karnataka",
    "city": "Hampi",
    "place": "Vittala Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-hampi-293",
    "state": "Karnataka",
    "city": "Hampi",
    "place": "Hampi Bazaar",
    "category": "Shopping",
    "tripTypes": [
      "Shopping",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-hampi-294",
    "state": "Karnataka",
    "city": "Hampi",
    "place": "Lotus Mahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-hampi-295",
    "state": "Karnataka",
    "city": "Hampi",
    "place": "Elephant Stables",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-chikmagalur-296",
    "state": "Karnataka",
    "city": "Chikmagalur",
    "place": "Mullayanagiri",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-chikmagalur-297",
    "state": "Karnataka",
    "city": "Chikmagalur",
    "place": "Baba Budangiri",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-chikmagalur-298",
    "state": "Karnataka",
    "city": "Chikmagalur",
    "place": "Jhari Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-chikmagalur-299",
    "state": "Karnataka",
    "city": "Chikmagalur",
    "place": "Coffee Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-chikmagalur-300",
    "state": "Karnataka",
    "city": "Chikmagalur",
    "place": "Hirekolale Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-mangaluru-301",
    "state": "Karnataka",
    "city": "Mangaluru",
    "place": "Panambur Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-mangaluru-302",
    "state": "Karnataka",
    "city": "Mangaluru",
    "place": "Kadri Manjunath Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-mangaluru-303",
    "state": "Karnataka",
    "city": "Mangaluru",
    "place": "Sultan Battery",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-mangaluru-304",
    "state": "Karnataka",
    "city": "Mangaluru",
    "place": "Tannirbhavi Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-mangaluru-305",
    "state": "Karnataka",
    "city": "Mangaluru",
    "place": "St Aloysius Chapel",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-udupi-306",
    "state": "Karnataka",
    "city": "Udupi",
    "place": "Sri Krishna Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-udupi-307",
    "state": "Karnataka",
    "city": "Udupi",
    "place": "Malpe Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-udupi-308",
    "state": "Karnataka",
    "city": "Udupi",
    "place": "St Mary's Island",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-udupi-309",
    "state": "Karnataka",
    "city": "Udupi",
    "place": "Kaup Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-udupi-310",
    "state": "Karnataka",
    "city": "Udupi",
    "place": "Manipal End Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-bandipur-311",
    "state": "Karnataka",
    "city": "Bandipur",
    "place": "Bandipur National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-bandipur-312",
    "state": "Karnataka",
    "city": "Bandipur",
    "place": "Gopalaswamy Betta",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-bandipur-313",
    "state": "Karnataka",
    "city": "Bandipur",
    "place": "Mudumalai border safari zone",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-bandipur-314",
    "state": "Karnataka",
    "city": "Bandipur",
    "place": "Himavad Gopalaswamy Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "karnataka-bandipur-315",
    "state": "Karnataka",
    "city": "Bandipur",
    "place": "Kabini River area",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-thiruvananthapuram-316",
    "state": "Kerala",
    "city": "Thiruvananthapuram",
    "place": "Sree Padmanabhaswamy Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-thiruvananthapuram-317",
    "state": "Kerala",
    "city": "Thiruvananthapuram",
    "place": "Kovalam Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-thiruvananthapuram-318",
    "state": "Kerala",
    "city": "Thiruvananthapuram",
    "place": "Napier Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-thiruvananthapuram-319",
    "state": "Kerala",
    "city": "Thiruvananthapuram",
    "place": "Kuthira Malika",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-thiruvananthapuram-320",
    "state": "Kerala",
    "city": "Thiruvananthapuram",
    "place": "Shangumukham Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-kochi-321",
    "state": "Kerala",
    "city": "Kochi",
    "place": "Fort Kochi",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-kochi-322",
    "state": "Kerala",
    "city": "Kochi",
    "place": "Chinese Fishing Nets",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-kochi-323",
    "state": "Kerala",
    "city": "Kochi",
    "place": "Mattancherry Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-kochi-324",
    "state": "Kerala",
    "city": "Kochi",
    "place": "Jew Town",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-kochi-325",
    "state": "Kerala",
    "city": "Kochi",
    "place": "Marine Drive",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-munnar-326",
    "state": "Kerala",
    "city": "Munnar",
    "place": "Eravikulam National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-munnar-327",
    "state": "Kerala",
    "city": "Munnar",
    "place": "Mattupetty Dam",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-munnar-328",
    "state": "Kerala",
    "city": "Munnar",
    "place": "Tea Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-munnar-329",
    "state": "Kerala",
    "city": "Munnar",
    "place": "Top Station",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-munnar-330",
    "state": "Kerala",
    "city": "Munnar",
    "place": "Echo Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-alappuzha-331",
    "state": "Kerala",
    "city": "Alappuzha",
    "place": "Alleppey Backwaters",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-alappuzha-332",
    "state": "Kerala",
    "city": "Alappuzha",
    "place": "Alappuzha Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-alappuzha-333",
    "state": "Kerala",
    "city": "Alappuzha",
    "place": "Vembanad Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-alappuzha-334",
    "state": "Kerala",
    "city": "Alappuzha",
    "place": "Marari Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-alappuzha-335",
    "state": "Kerala",
    "city": "Alappuzha",
    "place": "Pathiramanal Island",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-thekkady-336",
    "state": "Kerala",
    "city": "Thekkady",
    "place": "Periyar Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-thekkady-337",
    "state": "Kerala",
    "city": "Thekkady",
    "place": "Periyar Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-thekkady-338",
    "state": "Kerala",
    "city": "Thekkady",
    "place": "Gavi",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-thekkady-339",
    "state": "Kerala",
    "city": "Thekkady",
    "place": "Spice Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-thekkady-340",
    "state": "Kerala",
    "city": "Thekkady",
    "place": "Mangala Devi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-kozhikode-341",
    "state": "Kerala",
    "city": "Kozhikode",
    "place": "Kozhikode Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-kozhikode-342",
    "state": "Kerala",
    "city": "Kozhikode",
    "place": "Kappad Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-kozhikode-343",
    "state": "Kerala",
    "city": "Kozhikode",
    "place": "Mananchira Square",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-kozhikode-344",
    "state": "Kerala",
    "city": "Kozhikode",
    "place": "Beypore",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-kozhikode-345",
    "state": "Kerala",
    "city": "Kozhikode",
    "place": "Tali Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-wayanad-346",
    "state": "Kerala",
    "city": "Wayanad",
    "place": "Edakkal Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-wayanad-347",
    "state": "Kerala",
    "city": "Wayanad",
    "place": "Banasura Sagar Dam",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-wayanad-348",
    "state": "Kerala",
    "city": "Wayanad",
    "place": "Soochipara Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-wayanad-349",
    "state": "Kerala",
    "city": "Wayanad",
    "place": "Chembra Peak",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "kerala-wayanad-350",
    "state": "Kerala",
    "city": "Wayanad",
    "place": "Kuruva Island",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-bhopal-351",
    "state": "Madhya Pradesh",
    "city": "Bhopal",
    "place": "Upper Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-bhopal-352",
    "state": "Madhya Pradesh",
    "city": "Bhopal",
    "place": "Van Vihar National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-bhopal-353",
    "state": "Madhya Pradesh",
    "city": "Bhopal",
    "place": "Sanchi Stupa",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-bhopal-354",
    "state": "Madhya Pradesh",
    "city": "Bhopal",
    "place": "Taj-ul-Masajid",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-bhopal-355",
    "state": "Madhya Pradesh",
    "city": "Bhopal",
    "place": "Bharat Bhavan",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-indore-356",
    "state": "Madhya Pradesh",
    "city": "Indore",
    "place": "Rajwada Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-indore-357",
    "state": "Madhya Pradesh",
    "city": "Indore",
    "place": "Lal Bagh Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-indore-358",
    "state": "Madhya Pradesh",
    "city": "Indore",
    "place": "Sarafa Bazaar",
    "category": "Shopping",
    "tripTypes": [
      "Shopping",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-indore-359",
    "state": "Madhya Pradesh",
    "city": "Indore",
    "place": "Patalpani Waterfall",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-indore-360",
    "state": "Madhya Pradesh",
    "city": "Indore",
    "place": "Kanch Mandir",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-gwalior-361",
    "state": "Madhya Pradesh",
    "city": "Gwalior",
    "place": "Gwalior Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-gwalior-362",
    "state": "Madhya Pradesh",
    "city": "Gwalior",
    "place": "Jai Vilas Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-gwalior-363",
    "state": "Madhya Pradesh",
    "city": "Gwalior",
    "place": "Sas Bahu Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-gwalior-364",
    "state": "Madhya Pradesh",
    "city": "Gwalior",
    "place": "Teli Ka Mandir",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-gwalior-365",
    "state": "Madhya Pradesh",
    "city": "Gwalior",
    "place": "Tomb of Tansen",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-jabalpur-366",
    "state": "Madhya Pradesh",
    "city": "Jabalpur",
    "place": "Bhedaghat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-jabalpur-367",
    "state": "Madhya Pradesh",
    "city": "Jabalpur",
    "place": "Dhuandhar Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-jabalpur-368",
    "state": "Madhya Pradesh",
    "city": "Jabalpur",
    "place": "Marble Rocks",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-jabalpur-369",
    "state": "Madhya Pradesh",
    "city": "Jabalpur",
    "place": "Madan Mahal Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-jabalpur-370",
    "state": "Madhya Pradesh",
    "city": "Jabalpur",
    "place": "Dumna Nature Reserve",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-khajuraho-371",
    "state": "Madhya Pradesh",
    "city": "Khajuraho",
    "place": "Khajuraho Temples",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-khajuraho-372",
    "state": "Madhya Pradesh",
    "city": "Khajuraho",
    "place": "Kandariya Mahadeva Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-khajuraho-373",
    "state": "Madhya Pradesh",
    "city": "Khajuraho",
    "place": "Lakshmana Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-khajuraho-374",
    "state": "Madhya Pradesh",
    "city": "Khajuraho",
    "place": "Archaeological Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-khajuraho-375",
    "state": "Madhya Pradesh",
    "city": "Khajuraho",
    "place": "Raneh Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-ujjain-376",
    "state": "Madhya Pradesh",
    "city": "Ujjain",
    "place": "Mahakaleshwar Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-ujjain-377",
    "state": "Madhya Pradesh",
    "city": "Ujjain",
    "place": "Kal Bhairav Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-ujjain-378",
    "state": "Madhya Pradesh",
    "city": "Ujjain",
    "place": "Ram Ghat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-ujjain-379",
    "state": "Madhya Pradesh",
    "city": "Ujjain",
    "place": "Vedh Shala",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-ujjain-380",
    "state": "Madhya Pradesh",
    "city": "Ujjain",
    "place": "Harsiddhi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-orchha-381",
    "state": "Madhya Pradesh",
    "city": "Orchha",
    "place": "Orchha Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-orchha-382",
    "state": "Madhya Pradesh",
    "city": "Orchha",
    "place": "Jahangir Mahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-orchha-383",
    "state": "Madhya Pradesh",
    "city": "Orchha",
    "place": "Ram Raja Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-orchha-384",
    "state": "Madhya Pradesh",
    "city": "Orchha",
    "place": "Chaturbhuj Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "madhya-pradesh-orchha-385",
    "state": "Madhya Pradesh",
    "city": "Orchha",
    "place": "Betwa River",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mumbai-386",
    "state": "Maharashtra",
    "city": "Mumbai",
    "place": "Gateway of India",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mumbai-387",
    "state": "Maharashtra",
    "city": "Mumbai",
    "place": "Marine Drive",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mumbai-388",
    "state": "Maharashtra",
    "city": "Mumbai",
    "place": "Chhatrapati Shivaji Maharaj Terminus",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mumbai-389",
    "state": "Maharashtra",
    "city": "Mumbai",
    "place": "Elephanta Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mumbai-390",
    "state": "Maharashtra",
    "city": "Mumbai",
    "place": "Siddhivinayak Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mumbai-391",
    "state": "Maharashtra",
    "city": "Mumbai",
    "place": "Colaba Causeway",
    "category": "Shopping",
    "tripTypes": [
      "Shopping",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mumbai-392",
    "state": "Maharashtra",
    "city": "Mumbai",
    "place": "Bandra-Worli Sea Link",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mumbai-393",
    "state": "Maharashtra",
    "city": "Mumbai",
    "place": "Juhu Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-pune-394",
    "state": "Maharashtra",
    "city": "Pune",
    "place": "Shaniwar Wada",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-pune-395",
    "state": "Maharashtra",
    "city": "Pune",
    "place": "Aga Khan Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-pune-396",
    "state": "Maharashtra",
    "city": "Pune",
    "place": "Sinhagad Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-pune-397",
    "state": "Maharashtra",
    "city": "Pune",
    "place": "Pataleshwar Cave Temple",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-pune-398",
    "state": "Maharashtra",
    "city": "Pune",
    "place": "Raja Dinkar Kelkar Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-pune-399",
    "state": "Maharashtra",
    "city": "Pune",
    "place": "Dagdusheth Halwai Ganpati Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-lonavala-400",
    "state": "Maharashtra",
    "city": "Lonavala",
    "place": "Tiger Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-lonavala-401",
    "state": "Maharashtra",
    "city": "Lonavala",
    "place": "Bhushi Dam",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-lonavala-402",
    "state": "Maharashtra",
    "city": "Lonavala",
    "place": "Rajmachi Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-lonavala-403",
    "state": "Maharashtra",
    "city": "Lonavala",
    "place": "Karla Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-lonavala-404",
    "state": "Maharashtra",
    "city": "Lonavala",
    "place": "Bhaja Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-lonavala-405",
    "state": "Maharashtra",
    "city": "Lonavala",
    "place": "Kune Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-lonavala-406",
    "state": "Maharashtra",
    "city": "Lonavala",
    "place": "Lohagad Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mahabaleshwar-407",
    "state": "Maharashtra",
    "city": "Mahabaleshwar",
    "place": "Venna Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mahabaleshwar-408",
    "state": "Maharashtra",
    "city": "Mahabaleshwar",
    "place": "Arthur's Seat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mahabaleshwar-409",
    "state": "Maharashtra",
    "city": "Mahabaleshwar",
    "place": "Pratapgad Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mahabaleshwar-410",
    "state": "Maharashtra",
    "city": "Mahabaleshwar",
    "place": "Elephant's Head Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mahabaleshwar-411",
    "state": "Maharashtra",
    "city": "Mahabaleshwar",
    "place": "Mapro Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-mahabaleshwar-412",
    "state": "Maharashtra",
    "city": "Mahabaleshwar",
    "place": "Lingmala Waterfall",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-nashik-413",
    "state": "Maharashtra",
    "city": "Nashik",
    "place": "Trimbakeshwar Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-nashik-414",
    "state": "Maharashtra",
    "city": "Nashik",
    "place": "Sula Vineyards",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-nashik-415",
    "state": "Maharashtra",
    "city": "Nashik",
    "place": "Pandavleni Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-nashik-416",
    "state": "Maharashtra",
    "city": "Nashik",
    "place": "Ram Kund",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-nashik-417",
    "state": "Maharashtra",
    "city": "Nashik",
    "place": "Kalaram Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-nashik-418",
    "state": "Maharashtra",
    "city": "Nashik",
    "place": "Anjaneri Hills",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-aurangabad-419",
    "state": "Maharashtra",
    "city": "Aurangabad",
    "place": "Bibi Ka Maqbara",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-aurangabad-420",
    "state": "Maharashtra",
    "city": "Aurangabad",
    "place": "Ajanta Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-aurangabad-421",
    "state": "Maharashtra",
    "city": "Aurangabad",
    "place": "Ellora Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-aurangabad-422",
    "state": "Maharashtra",
    "city": "Aurangabad",
    "place": "Daulatabad Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-aurangabad-423",
    "state": "Maharashtra",
    "city": "Aurangabad",
    "place": "Panchakki",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-aurangabad-424",
    "state": "Maharashtra",
    "city": "Aurangabad",
    "place": "Aurangabad Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-alibaug-425",
    "state": "Maharashtra",
    "city": "Alibaug",
    "place": "Alibaug Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-alibaug-426",
    "state": "Maharashtra",
    "city": "Alibaug",
    "place": "Kolaba Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-alibaug-427",
    "state": "Maharashtra",
    "city": "Alibaug",
    "place": "Kashid Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-alibaug-428",
    "state": "Maharashtra",
    "city": "Alibaug",
    "place": "Korlai Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-alibaug-429",
    "state": "Maharashtra",
    "city": "Alibaug",
    "place": "Nagaon Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-kolhapur-430",
    "state": "Maharashtra",
    "city": "Kolhapur",
    "place": "Mahalakshmi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-kolhapur-431",
    "state": "Maharashtra",
    "city": "Kolhapur",
    "place": "Panhala Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-kolhapur-432",
    "state": "Maharashtra",
    "city": "Kolhapur",
    "place": "Rankala Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-kolhapur-433",
    "state": "Maharashtra",
    "city": "Kolhapur",
    "place": "New Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-kolhapur-434",
    "state": "Maharashtra",
    "city": "Kolhapur",
    "place": "Jyotiba Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-nagpur-435",
    "state": "Maharashtra",
    "city": "Nagpur",
    "place": "Deekshabhoomi",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-nagpur-436",
    "state": "Maharashtra",
    "city": "Nagpur",
    "place": "Sitabardi Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-nagpur-437",
    "state": "Maharashtra",
    "city": "Nagpur",
    "place": "Futala Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-nagpur-438",
    "state": "Maharashtra",
    "city": "Nagpur",
    "place": "Ambazari Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "maharashtra-nagpur-439",
    "state": "Maharashtra",
    "city": "Nagpur",
    "place": "Maharajbagh Zoo",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-imphal-440",
    "state": "Manipur",
    "city": "Imphal",
    "place": "Kangla Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-imphal-441",
    "state": "Manipur",
    "city": "Imphal",
    "place": "Loktak Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-imphal-442",
    "state": "Manipur",
    "city": "Imphal",
    "place": "Shree Govindajee Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-imphal-443",
    "state": "Manipur",
    "city": "Imphal",
    "place": "Imphal War Cemetery",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-imphal-444",
    "state": "Manipur",
    "city": "Imphal",
    "place": "Ima Keithel",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-moirang-445",
    "state": "Manipur",
    "city": "Moirang",
    "place": "INA Memorial",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-moirang-446",
    "state": "Manipur",
    "city": "Moirang",
    "place": "Loktak Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-moirang-447",
    "state": "Manipur",
    "city": "Moirang",
    "place": "Keibul Lamjao National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-moirang-448",
    "state": "Manipur",
    "city": "Moirang",
    "place": "Sendra Tourist Hub",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-moirang-449",
    "state": "Manipur",
    "city": "Moirang",
    "place": "Moirang Thangjing Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-ukhrul-450",
    "state": "Manipur",
    "city": "Ukhrul",
    "place": "Shirui Hills",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-ukhrul-451",
    "state": "Manipur",
    "city": "Ukhrul",
    "place": "Khayang Peak",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-ukhrul-452",
    "state": "Manipur",
    "city": "Ukhrul",
    "place": "Kachai Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-ukhrul-453",
    "state": "Manipur",
    "city": "Ukhrul",
    "place": "Hundung Mangva Cave",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "manipur-ukhrul-454",
    "state": "Manipur",
    "city": "Ukhrul",
    "place": "Khangkhui Mangsor Cave",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-shillong-455",
    "state": "Meghalaya",
    "city": "Shillong",
    "place": "Umiam Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-shillong-456",
    "state": "Meghalaya",
    "city": "Shillong",
    "place": "Elephant Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-shillong-457",
    "state": "Meghalaya",
    "city": "Shillong",
    "place": "Shillong Peak",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-shillong-458",
    "state": "Meghalaya",
    "city": "Shillong",
    "place": "Ward's Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-shillong-459",
    "state": "Meghalaya",
    "city": "Shillong",
    "place": "Don Bosco Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-cherrapunji-460",
    "state": "Meghalaya",
    "city": "Cherrapunji",
    "place": "Nohkalikai Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-cherrapunji-461",
    "state": "Meghalaya",
    "city": "Cherrapunji",
    "place": "Mawsmai Cave",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-cherrapunji-462",
    "state": "Meghalaya",
    "city": "Cherrapunji",
    "place": "Seven Sisters Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-cherrapunji-463",
    "state": "Meghalaya",
    "city": "Cherrapunji",
    "place": "Arwah Cave",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-cherrapunji-464",
    "state": "Meghalaya",
    "city": "Cherrapunji",
    "place": "Eco Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-mawlynnong-465",
    "state": "Meghalaya",
    "city": "Mawlynnong",
    "place": "Mawlynnong Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-mawlynnong-466",
    "state": "Meghalaya",
    "city": "Mawlynnong",
    "place": "Living Root Bridge",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-mawlynnong-467",
    "state": "Meghalaya",
    "city": "Mawlynnong",
    "place": "Balancing Rock",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-mawlynnong-468",
    "state": "Meghalaya",
    "city": "Mawlynnong",
    "place": "Sky View Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-mawlynnong-469",
    "state": "Meghalaya",
    "city": "Mawlynnong",
    "place": "Riwai Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-dawki-470",
    "state": "Meghalaya",
    "city": "Dawki",
    "place": "Umngot River",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-dawki-471",
    "state": "Meghalaya",
    "city": "Dawki",
    "place": "Dawki Bridge",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-dawki-472",
    "state": "Meghalaya",
    "city": "Dawki",
    "place": "Shnongpdeng",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-dawki-473",
    "state": "Meghalaya",
    "city": "Dawki",
    "place": "Mawlynnong",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-dawki-474",
    "state": "Meghalaya",
    "city": "Dawki",
    "place": "Krang Suri Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-jowai-475",
    "state": "Meghalaya",
    "city": "Jowai",
    "place": "Krang Suri Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-jowai-476",
    "state": "Meghalaya",
    "city": "Jowai",
    "place": "Nartiang Monoliths",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-jowai-477",
    "state": "Meghalaya",
    "city": "Jowai",
    "place": "Syntu Ksiar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-jowai-478",
    "state": "Meghalaya",
    "city": "Jowai",
    "place": "Tyrshi Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "meghalaya-jowai-479",
    "state": "Meghalaya",
    "city": "Jowai",
    "place": "Ialong Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-aizawl-480",
    "state": "Mizoram",
    "city": "Aizawl",
    "place": "Durtlang Hills",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-aizawl-481",
    "state": "Mizoram",
    "city": "Aizawl",
    "place": "Mizoram State Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-aizawl-482",
    "state": "Mizoram",
    "city": "Aizawl",
    "place": "Solomon's Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-aizawl-483",
    "state": "Mizoram",
    "city": "Aizawl",
    "place": "Reiek",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-aizawl-484",
    "state": "Mizoram",
    "city": "Aizawl",
    "place": "Bara Bazar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-champhai-485",
    "state": "Mizoram",
    "city": "Champhai",
    "place": "Rih Dil",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-champhai-486",
    "state": "Mizoram",
    "city": "Champhai",
    "place": "Mura Puk",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-champhai-487",
    "state": "Mizoram",
    "city": "Champhai",
    "place": "Murlen National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-champhai-488",
    "state": "Mizoram",
    "city": "Champhai",
    "place": "Falkawn Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-champhai-489",
    "state": "Mizoram",
    "city": "Champhai",
    "place": "Khawnglung Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-thenzawl-490",
    "state": "Mizoram",
    "city": "Thenzawl",
    "place": "Vantawng Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-thenzawl-491",
    "state": "Mizoram",
    "city": "Thenzawl",
    "place": "Thenzawl Deer Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-thenzawl-492",
    "state": "Mizoram",
    "city": "Thenzawl",
    "place": "Chawngchilhi Cave",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-thenzawl-493",
    "state": "Mizoram",
    "city": "Thenzawl",
    "place": "Tuirihiau Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-thenzawl-494",
    "state": "Mizoram",
    "city": "Thenzawl",
    "place": "Thenzawl Golf Course",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-lunglei-495",
    "state": "Mizoram",
    "city": "Lunglei",
    "place": "Lunglei View Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-lunglei-496",
    "state": "Mizoram",
    "city": "Lunglei",
    "place": "Khongluang Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-lunglei-497",
    "state": "Mizoram",
    "city": "Lunglei",
    "place": "Saza Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-lunglei-498",
    "state": "Mizoram",
    "city": "Lunglei",
    "place": "Khawnglung",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "mizoram-lunglei-499",
    "state": "Mizoram",
    "city": "Lunglei",
    "place": "Tlawng River",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-kohima-500",
    "state": "Nagaland",
    "city": "Kohima",
    "place": "Kohima War Cemetery",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-kohima-501",
    "state": "Nagaland",
    "city": "Kohima",
    "place": "Kisama Heritage Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-kohima-502",
    "state": "Nagaland",
    "city": "Kohima",
    "place": "Naga Heritage Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-kohima-503",
    "state": "Nagaland",
    "city": "Kohima",
    "place": "Dzukou Valley",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-kohima-504",
    "state": "Nagaland",
    "city": "Kohima",
    "place": "Japfu Peak",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-dimapur-505",
    "state": "Nagaland",
    "city": "Dimapur",
    "place": "Kachari Ruins",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-dimapur-506",
    "state": "Nagaland",
    "city": "Dimapur",
    "place": "Triple Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-dimapur-507",
    "state": "Nagaland",
    "city": "Dimapur",
    "place": "Rangapahar Reserve Forest",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-dimapur-508",
    "state": "Nagaland",
    "city": "Dimapur",
    "place": "Diezephe Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-dimapur-509",
    "state": "Nagaland",
    "city": "Dimapur",
    "place": "Sukhajan",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-mokokchung-510",
    "state": "Nagaland",
    "city": "Mokokchung",
    "place": "Mokokchung Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-mokokchung-511",
    "state": "Nagaland",
    "city": "Mokokchung",
    "place": "Longkhum Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-mokokchung-512",
    "state": "Nagaland",
    "city": "Mokokchung",
    "place": "Ungma Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-mokokchung-513",
    "state": "Nagaland",
    "city": "Mokokchung",
    "place": "Mokokchung Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-mokokchung-514",
    "state": "Nagaland",
    "city": "Mokokchung",
    "place": "Chuchuyimlang Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-mon-515",
    "state": "Nagaland",
    "city": "Mon",
    "place": "Longwa Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-mon-516",
    "state": "Nagaland",
    "city": "Mon",
    "place": "Shangnyu Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-mon-517",
    "state": "Nagaland",
    "city": "Mon",
    "place": "Veda Peak",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-mon-518",
    "state": "Nagaland",
    "city": "Mon",
    "place": "Naganimora",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "nagaland-mon-519",
    "state": "Nagaland",
    "city": "Mon",
    "place": "Mon Town",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-bhubaneswar-520",
    "state": "Odisha",
    "city": "Bhubaneswar",
    "place": "Lingaraj Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-bhubaneswar-521",
    "state": "Odisha",
    "city": "Bhubaneswar",
    "place": "Udayagiri and Khandagiri Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-bhubaneswar-522",
    "state": "Odisha",
    "city": "Bhubaneswar",
    "place": "Odisha State Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-bhubaneswar-523",
    "state": "Odisha",
    "city": "Bhubaneswar",
    "place": "Dhauli Shanti Stupa",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-bhubaneswar-524",
    "state": "Odisha",
    "city": "Bhubaneswar",
    "place": "Nandankanan Zoological Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-puri-525",
    "state": "Odisha",
    "city": "Puri",
    "place": "Jagannath Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-puri-526",
    "state": "Odisha",
    "city": "Puri",
    "place": "Puri Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-puri-527",
    "state": "Odisha",
    "city": "Puri",
    "place": "Konark Sun Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-puri-528",
    "state": "Odisha",
    "city": "Puri",
    "place": "Chandrabhaga Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-puri-529",
    "state": "Odisha",
    "city": "Puri",
    "place": "Raghurajpur Artist Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-konark-530",
    "state": "Odisha",
    "city": "Konark",
    "place": "Sun Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-konark-531",
    "state": "Odisha",
    "city": "Konark",
    "place": "Archaeological Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-konark-532",
    "state": "Odisha",
    "city": "Konark",
    "place": "Chandrabhaga Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-konark-533",
    "state": "Odisha",
    "city": "Konark",
    "place": "Ramachandi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-konark-534",
    "state": "Odisha",
    "city": "Konark",
    "place": "Kuruma Buddhist Site",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-cuttack-535",
    "state": "Odisha",
    "city": "Cuttack",
    "place": "Barabati Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-cuttack-536",
    "state": "Odisha",
    "city": "Cuttack",
    "place": "Netaji Birthplace Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-cuttack-537",
    "state": "Odisha",
    "city": "Cuttack",
    "place": "Odisha Maritime Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-cuttack-538",
    "state": "Odisha",
    "city": "Cuttack",
    "place": "Cuttack Chandi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-cuttack-539",
    "state": "Odisha",
    "city": "Cuttack",
    "place": "Dhabaleswar Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-chilika-540",
    "state": "Odisha",
    "city": "Chilika",
    "place": "Chilika Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-chilika-541",
    "state": "Odisha",
    "city": "Chilika",
    "place": "Satapada",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-chilika-542",
    "state": "Odisha",
    "city": "Chilika",
    "place": "Nalabana Bird Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-chilika-543",
    "state": "Odisha",
    "city": "Chilika",
    "place": "Kalijai Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "odisha-chilika-544",
    "state": "Odisha",
    "city": "Chilika",
    "place": "Mangalajodi",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-amritsar-545",
    "state": "Punjab",
    "city": "Amritsar",
    "place": "Golden Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-amritsar-546",
    "state": "Punjab",
    "city": "Amritsar",
    "place": "Jallianwala Bagh",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-amritsar-547",
    "state": "Punjab",
    "city": "Amritsar",
    "place": "Wagah Border",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-amritsar-548",
    "state": "Punjab",
    "city": "Amritsar",
    "place": "Partition Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-amritsar-549",
    "state": "Punjab",
    "city": "Amritsar",
    "place": "Durgiana Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-chandigarh-550",
    "state": "Punjab",
    "city": "Chandigarh",
    "place": "Rock Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-chandigarh-551",
    "state": "Punjab",
    "city": "Chandigarh",
    "place": "Sukhna Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-chandigarh-552",
    "state": "Punjab",
    "city": "Chandigarh",
    "place": "Rose Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-chandigarh-553",
    "state": "Punjab",
    "city": "Chandigarh",
    "place": "Capitol Complex",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-chandigarh-554",
    "state": "Punjab",
    "city": "Chandigarh",
    "place": "Government Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-patiala-555",
    "state": "Punjab",
    "city": "Patiala",
    "place": "Qila Mubarak",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-patiala-556",
    "state": "Punjab",
    "city": "Patiala",
    "place": "Sheesh Mahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-patiala-557",
    "state": "Punjab",
    "city": "Patiala",
    "place": "Moti Bagh Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-patiala-558",
    "state": "Punjab",
    "city": "Patiala",
    "place": "Baradari Gardens",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-patiala-559",
    "state": "Punjab",
    "city": "Patiala",
    "place": "Kali Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-ludhiana-560",
    "state": "Punjab",
    "city": "Ludhiana",
    "place": "Punjab Agricultural University Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-ludhiana-561",
    "state": "Punjab",
    "city": "Ludhiana",
    "place": "Nehru Rose Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-ludhiana-562",
    "state": "Punjab",
    "city": "Ludhiana",
    "place": "Lodhi Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-ludhiana-563",
    "state": "Punjab",
    "city": "Ludhiana",
    "place": "Rakh Bagh",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-ludhiana-564",
    "state": "Punjab",
    "city": "Ludhiana",
    "place": "Maharaja Ranjit Singh War Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-anandpur-sahib-565",
    "state": "Punjab",
    "city": "Anandpur Sahib",
    "place": "Takht Sri Kesgarh Sahib",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-anandpur-sahib-566",
    "state": "Punjab",
    "city": "Anandpur Sahib",
    "place": "Virasat-e-Khalsa",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-anandpur-sahib-567",
    "state": "Punjab",
    "city": "Anandpur Sahib",
    "place": "Anandpur Sahib Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-anandpur-sahib-568",
    "state": "Punjab",
    "city": "Anandpur Sahib",
    "place": "Gurdwara Bhora Sahib",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "punjab-anandpur-sahib-569",
    "state": "Punjab",
    "city": "Anandpur Sahib",
    "place": "Holgarh Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaipur-570",
    "state": "Rajasthan",
    "city": "Jaipur",
    "place": "Amber Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaipur-571",
    "state": "Rajasthan",
    "city": "Jaipur",
    "place": "City Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaipur-572",
    "state": "Rajasthan",
    "city": "Jaipur",
    "place": "Hawa Mahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaipur-573",
    "state": "Rajasthan",
    "city": "Jaipur",
    "place": "Jantar Mantar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaipur-574",
    "state": "Rajasthan",
    "city": "Jaipur",
    "place": "Nahargarh Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaipur-575",
    "state": "Rajasthan",
    "city": "Jaipur",
    "place": "Jal Mahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaipur-576",
    "state": "Rajasthan",
    "city": "Jaipur",
    "place": "Albert Hall Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-udaipur-577",
    "state": "Rajasthan",
    "city": "Udaipur",
    "place": "City Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-udaipur-578",
    "state": "Rajasthan",
    "city": "Udaipur",
    "place": "Lake Pichola",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-udaipur-579",
    "state": "Rajasthan",
    "city": "Udaipur",
    "place": "Jag Mandir",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-udaipur-580",
    "state": "Rajasthan",
    "city": "Udaipur",
    "place": "Saheliyon Ki Bari",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-udaipur-581",
    "state": "Rajasthan",
    "city": "Udaipur",
    "place": "Sajjangarh Monsoon Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-udaipur-582",
    "state": "Rajasthan",
    "city": "Udaipur",
    "place": "Fateh Sagar Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jodhpur-583",
    "state": "Rajasthan",
    "city": "Jodhpur",
    "place": "Mehrangarh Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jodhpur-584",
    "state": "Rajasthan",
    "city": "Jodhpur",
    "place": "Jaswant Thada",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jodhpur-585",
    "state": "Rajasthan",
    "city": "Jodhpur",
    "place": "Umaid Bhawan Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jodhpur-586",
    "state": "Rajasthan",
    "city": "Jodhpur",
    "place": "Clock Tower Market",
    "category": "Shopping",
    "tripTypes": [
      "Shopping",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jodhpur-587",
    "state": "Rajasthan",
    "city": "Jodhpur",
    "place": "Mandore Gardens",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaisalmer-588",
    "state": "Rajasthan",
    "city": "Jaisalmer",
    "place": "Jaisalmer Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaisalmer-589",
    "state": "Rajasthan",
    "city": "Jaisalmer",
    "place": "Sam Sand Dunes",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaisalmer-590",
    "state": "Rajasthan",
    "city": "Jaisalmer",
    "place": "Patwon Ki Haveli",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaisalmer-591",
    "state": "Rajasthan",
    "city": "Jaisalmer",
    "place": "Gadisar Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-jaisalmer-592",
    "state": "Rajasthan",
    "city": "Jaisalmer",
    "place": "Kuldhara Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-pushkar-593",
    "state": "Rajasthan",
    "city": "Pushkar",
    "place": "Brahma Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-pushkar-594",
    "state": "Rajasthan",
    "city": "Pushkar",
    "place": "Pushkar Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-pushkar-595",
    "state": "Rajasthan",
    "city": "Pushkar",
    "place": "Savitri Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-pushkar-596",
    "state": "Rajasthan",
    "city": "Pushkar",
    "place": "Pushkar Camel Fair Ground",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-pushkar-597",
    "state": "Rajasthan",
    "city": "Pushkar",
    "place": "Varaha Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-ajmer-598",
    "state": "Rajasthan",
    "city": "Ajmer",
    "place": "Ajmer Sharif Dargah",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-ajmer-599",
    "state": "Rajasthan",
    "city": "Ajmer",
    "place": "Ana Sagar Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-ajmer-600",
    "state": "Rajasthan",
    "city": "Ajmer",
    "place": "Adhai Din Ka Jhonpra",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-ajmer-601",
    "state": "Rajasthan",
    "city": "Ajmer",
    "place": "Prithviraj Smarak",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-ajmer-602",
    "state": "Rajasthan",
    "city": "Ajmer",
    "place": "Akbari Fort Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-mount-abu-603",
    "state": "Rajasthan",
    "city": "Mount Abu",
    "place": "Nakki Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-mount-abu-604",
    "state": "Rajasthan",
    "city": "Mount Abu",
    "place": "Dilwara Temples",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-mount-abu-605",
    "state": "Rajasthan",
    "city": "Mount Abu",
    "place": "Guru Shikhar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-mount-abu-606",
    "state": "Rajasthan",
    "city": "Mount Abu",
    "place": "Toad Rock",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-mount-abu-607",
    "state": "Rajasthan",
    "city": "Mount Abu",
    "place": "Achalgarh Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-bikaner-608",
    "state": "Rajasthan",
    "city": "Bikaner",
    "place": "Junagarh Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-bikaner-609",
    "state": "Rajasthan",
    "city": "Bikaner",
    "place": "Karni Mata Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-bikaner-610",
    "state": "Rajasthan",
    "city": "Bikaner",
    "place": "Lalgarh Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-bikaner-611",
    "state": "Rajasthan",
    "city": "Bikaner",
    "place": "Rampuria Havelis",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "rajasthan-bikaner-612",
    "state": "Rajasthan",
    "city": "Bikaner",
    "place": "Gajner Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-gangtok-613",
    "state": "Sikkim",
    "city": "Gangtok",
    "place": "MG Marg",
    "category": "Shopping",
    "tripTypes": [
      "Shopping",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-gangtok-614",
    "state": "Sikkim",
    "city": "Gangtok",
    "place": "Rumtek Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-gangtok-615",
    "state": "Sikkim",
    "city": "Gangtok",
    "place": "Tsomgo Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-gangtok-616",
    "state": "Sikkim",
    "city": "Gangtok",
    "place": "Hanuman Tok",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-gangtok-617",
    "state": "Sikkim",
    "city": "Gangtok",
    "place": "Nathula Pass",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-pelling-618",
    "state": "Sikkim",
    "city": "Pelling",
    "place": "Pemayangtse Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-pelling-619",
    "state": "Sikkim",
    "city": "Pelling",
    "place": "Rabdentse Ruins",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-pelling-620",
    "state": "Sikkim",
    "city": "Pelling",
    "place": "Khecheopalri Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-pelling-621",
    "state": "Sikkim",
    "city": "Pelling",
    "place": "Skywalk Pelling",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-pelling-622",
    "state": "Sikkim",
    "city": "Pelling",
    "place": "Kanchenjunga Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-lachung-623",
    "state": "Sikkim",
    "city": "Lachung",
    "place": "Yumthang Valley",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-lachung-624",
    "state": "Sikkim",
    "city": "Lachung",
    "place": "Zero Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-lachung-625",
    "state": "Sikkim",
    "city": "Lachung",
    "place": "Lachung Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-lachung-626",
    "state": "Sikkim",
    "city": "Lachung",
    "place": "Shingba Rhododendron Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-lachung-627",
    "state": "Sikkim",
    "city": "Lachung",
    "place": "Bhutanese Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-namchi-628",
    "state": "Sikkim",
    "city": "Namchi",
    "place": "Char Dham",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-namchi-629",
    "state": "Sikkim",
    "city": "Namchi",
    "place": "Samdruptse Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-namchi-630",
    "state": "Sikkim",
    "city": "Namchi",
    "place": "Temi Tea Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-namchi-631",
    "state": "Sikkim",
    "city": "Namchi",
    "place": "Ngadak Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-namchi-632",
    "state": "Sikkim",
    "city": "Namchi",
    "place": "Siddhesvara Dham",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-ravangla-633",
    "state": "Sikkim",
    "city": "Ravangla",
    "place": "Buddha Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-ravangla-634",
    "state": "Sikkim",
    "city": "Ravangla",
    "place": "Ralong Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-ravangla-635",
    "state": "Sikkim",
    "city": "Ravangla",
    "place": "Borong Hot Springs",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-ravangla-636",
    "state": "Sikkim",
    "city": "Ravangla",
    "place": "Maenam Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "sikkim-ravangla-637",
    "state": "Sikkim",
    "city": "Ravangla",
    "place": "Rayong Sunrise View Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-chennai-638",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "place": "Marina Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-chennai-639",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "place": "Kapaleeshwarar Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-chennai-640",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "place": "Fort St George",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-chennai-641",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "place": "Government Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-chennai-642",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "place": "San Thome Basilica",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-chennai-643",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "place": "Guindy National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-madurai-644",
    "state": "Tamil Nadu",
    "city": "Madurai",
    "place": "Meenakshi Amman Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-madurai-645",
    "state": "Tamil Nadu",
    "city": "Madurai",
    "place": "Thirumalai Nayakkar Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-madurai-646",
    "state": "Tamil Nadu",
    "city": "Madurai",
    "place": "Gandhi Memorial Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-madurai-647",
    "state": "Tamil Nadu",
    "city": "Madurai",
    "place": "Vandiyur Mariamman Teppakulam",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-madurai-648",
    "state": "Tamil Nadu",
    "city": "Madurai",
    "place": "Alagar Koyil",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-ooty-649",
    "state": "Tamil Nadu",
    "city": "Ooty",
    "place": "Ooty Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-ooty-650",
    "state": "Tamil Nadu",
    "city": "Ooty",
    "place": "Botanical Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-ooty-651",
    "state": "Tamil Nadu",
    "city": "Ooty",
    "place": "Doddabetta Peak",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-ooty-652",
    "state": "Tamil Nadu",
    "city": "Ooty",
    "place": "Rose Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-ooty-653",
    "state": "Tamil Nadu",
    "city": "Ooty",
    "place": "Nilgiri Mountain Railway",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-ooty-654",
    "state": "Tamil Nadu",
    "city": "Ooty",
    "place": "Pykara Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-kodaikanal-655",
    "state": "Tamil Nadu",
    "city": "Kodaikanal",
    "place": "Kodaikanal Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-kodaikanal-656",
    "state": "Tamil Nadu",
    "city": "Kodaikanal",
    "place": "Coaker's Walk",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-kodaikanal-657",
    "state": "Tamil Nadu",
    "city": "Kodaikanal",
    "place": "Bryant Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-kodaikanal-658",
    "state": "Tamil Nadu",
    "city": "Kodaikanal",
    "place": "Pillar Rocks",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-kodaikanal-659",
    "state": "Tamil Nadu",
    "city": "Kodaikanal",
    "place": "Silver Cascade Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-coimbatore-660",
    "state": "Tamil Nadu",
    "city": "Coimbatore",
    "place": "Marudamalai Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-coimbatore-661",
    "state": "Tamil Nadu",
    "city": "Coimbatore",
    "place": "Gedee Car Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-coimbatore-662",
    "state": "Tamil Nadu",
    "city": "Coimbatore",
    "place": "Isha Yoga Center",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-coimbatore-663",
    "state": "Tamil Nadu",
    "city": "Coimbatore",
    "place": "VOC Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-coimbatore-664",
    "state": "Tamil Nadu",
    "city": "Coimbatore",
    "place": "Kovai Kondattam",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-rameswaram-665",
    "state": "Tamil Nadu",
    "city": "Rameswaram",
    "place": "Ramanathaswamy Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-rameswaram-666",
    "state": "Tamil Nadu",
    "city": "Rameswaram",
    "place": "Pamban Bridge",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-rameswaram-667",
    "state": "Tamil Nadu",
    "city": "Rameswaram",
    "place": "Dhanushkodi",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-rameswaram-668",
    "state": "Tamil Nadu",
    "city": "Rameswaram",
    "place": "Ariyaman Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-rameswaram-669",
    "state": "Tamil Nadu",
    "city": "Rameswaram",
    "place": "APJ Abdul Kalam Memorial",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-thanjavur-670",
    "state": "Tamil Nadu",
    "city": "Thanjavur",
    "place": "Brihadeeswarar Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-thanjavur-671",
    "state": "Tamil Nadu",
    "city": "Thanjavur",
    "place": "Thanjavur Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-thanjavur-672",
    "state": "Tamil Nadu",
    "city": "Thanjavur",
    "place": "Saraswathi Mahal Library",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-thanjavur-673",
    "state": "Tamil Nadu",
    "city": "Thanjavur",
    "place": "Gangaikonda Cholapuram",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-thanjavur-674",
    "state": "Tamil Nadu",
    "city": "Thanjavur",
    "place": "Schwartz Church",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-mahabalipuram-675",
    "state": "Tamil Nadu",
    "city": "Mahabalipuram",
    "place": "Shore Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-mahabalipuram-676",
    "state": "Tamil Nadu",
    "city": "Mahabalipuram",
    "place": "Pancha Rathas",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-mahabalipuram-677",
    "state": "Tamil Nadu",
    "city": "Mahabalipuram",
    "place": "Arjuna's Penance",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-mahabalipuram-678",
    "state": "Tamil Nadu",
    "city": "Mahabalipuram",
    "place": "Krishna's Butterball",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-mahabalipuram-679",
    "state": "Tamil Nadu",
    "city": "Mahabalipuram",
    "place": "Mahabalipuram Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-kanyakumari-680",
    "state": "Tamil Nadu",
    "city": "Kanyakumari",
    "place": "Vivekananda Rock Memorial",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-kanyakumari-681",
    "state": "Tamil Nadu",
    "city": "Kanyakumari",
    "place": "Thiruvalluvar Statue",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-kanyakumari-682",
    "state": "Tamil Nadu",
    "city": "Kanyakumari",
    "place": "Kanyakumari Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-kanyakumari-683",
    "state": "Tamil Nadu",
    "city": "Kanyakumari",
    "place": "Sunset Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tamil-nadu-kanyakumari-684",
    "state": "Tamil Nadu",
    "city": "Kanyakumari",
    "place": "Padmanabhapuram Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-hyderabad-685",
    "state": "Telangana",
    "city": "Hyderabad",
    "place": "Charminar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-hyderabad-686",
    "state": "Telangana",
    "city": "Hyderabad",
    "place": "Golconda Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-hyderabad-687",
    "state": "Telangana",
    "city": "Hyderabad",
    "place": "Salar Jung Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-hyderabad-688",
    "state": "Telangana",
    "city": "Hyderabad",
    "place": "Hussain Sagar Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-hyderabad-689",
    "state": "Telangana",
    "city": "Hyderabad",
    "place": "Chowmahalla Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-hyderabad-690",
    "state": "Telangana",
    "city": "Hyderabad",
    "place": "Ramoji Film City",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-warangal-691",
    "state": "Telangana",
    "city": "Warangal",
    "place": "Warangal Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-warangal-692",
    "state": "Telangana",
    "city": "Warangal",
    "place": "Thousand Pillar Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-warangal-693",
    "state": "Telangana",
    "city": "Warangal",
    "place": "Ramappa Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-warangal-694",
    "state": "Telangana",
    "city": "Warangal",
    "place": "Bhadrakali Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-warangal-695",
    "state": "Telangana",
    "city": "Warangal",
    "place": "Kakatiya Musical Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-nizamabad-696",
    "state": "Telangana",
    "city": "Nizamabad",
    "place": "Nizamabad Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-nizamabad-697",
    "state": "Telangana",
    "city": "Nizamabad",
    "place": "Ali Sagar Reservoir",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-nizamabad-698",
    "state": "Telangana",
    "city": "Nizamabad",
    "place": "Siddulagutta",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-nizamabad-699",
    "state": "Telangana",
    "city": "Nizamabad",
    "place": "Mallaram Forest",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-nizamabad-700",
    "state": "Telangana",
    "city": "Nizamabad",
    "place": "Sarangapur Hanuman Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-karimnagar-701",
    "state": "Telangana",
    "city": "Karimnagar",
    "place": "Elgandal Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-karimnagar-702",
    "state": "Telangana",
    "city": "Karimnagar",
    "place": "Lower Manair Dam",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-karimnagar-703",
    "state": "Telangana",
    "city": "Karimnagar",
    "place": "Vemulawada Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-karimnagar-704",
    "state": "Telangana",
    "city": "Karimnagar",
    "place": "Kondagattu Anjaneya Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "telangana-karimnagar-705",
    "state": "Telangana",
    "city": "Karimnagar",
    "place": "Ujwala Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-agartala-706",
    "state": "Tripura",
    "city": "Agartala",
    "place": "Ujjayanta Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-agartala-707",
    "state": "Tripura",
    "city": "Agartala",
    "place": "Neermahal Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-agartala-708",
    "state": "Tripura",
    "city": "Agartala",
    "place": "Tripura State Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-agartala-709",
    "state": "Tripura",
    "city": "Agartala",
    "place": "Jagannath Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-agartala-710",
    "state": "Tripura",
    "city": "Agartala",
    "place": "Heritage Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-unakoti-711",
    "state": "Tripura",
    "city": "Unakoti",
    "place": "Unakoti Rock Carvings",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-unakoti-712",
    "state": "Tripura",
    "city": "Unakoti",
    "place": "Unakoti Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-unakoti-713",
    "state": "Tripura",
    "city": "Unakoti",
    "place": "Ashokastami Festival Site",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-unakoti-714",
    "state": "Tripura",
    "city": "Unakoti",
    "place": "Kailashahar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-unakoti-715",
    "state": "Tripura",
    "city": "Unakoti",
    "place": "Raghunandan Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-dharmanagar-716",
    "state": "Tripura",
    "city": "Dharmanagar",
    "place": "Jampui Hills",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-dharmanagar-717",
    "state": "Tripura",
    "city": "Dharmanagar",
    "place": "Sepahijala Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-dharmanagar-718",
    "state": "Tripura",
    "city": "Dharmanagar",
    "place": "Dumboor Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-dharmanagar-719",
    "state": "Tripura",
    "city": "Dharmanagar",
    "place": "Neermahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "tripura-dharmanagar-720",
    "state": "Tripura",
    "city": "Dharmanagar",
    "place": "Pilak",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-agra-721",
    "state": "Uttar Pradesh",
    "city": "Agra",
    "place": "Taj Mahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-agra-722",
    "state": "Uttar Pradesh",
    "city": "Agra",
    "place": "Agra Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-agra-723",
    "state": "Uttar Pradesh",
    "city": "Agra",
    "place": "Mehtab Bagh",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-agra-724",
    "state": "Uttar Pradesh",
    "city": "Agra",
    "place": "Itmad-ud-Daulah's Tomb",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-agra-725",
    "state": "Uttar Pradesh",
    "city": "Agra",
    "place": "Akbar's Tomb",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-varanasi-726",
    "state": "Uttar Pradesh",
    "city": "Varanasi",
    "place": "Kashi Vishwanath Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-varanasi-727",
    "state": "Uttar Pradesh",
    "city": "Varanasi",
    "place": "Dashashwamedh Ghat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-varanasi-728",
    "state": "Uttar Pradesh",
    "city": "Varanasi",
    "place": "Sarnath",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-varanasi-729",
    "state": "Uttar Pradesh",
    "city": "Varanasi",
    "place": "Assi Ghat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-varanasi-730",
    "state": "Uttar Pradesh",
    "city": "Varanasi",
    "place": "Manikarnika Ghat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-varanasi-731",
    "state": "Uttar Pradesh",
    "city": "Varanasi",
    "place": "Ramnagar Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-lucknow-732",
    "state": "Uttar Pradesh",
    "city": "Lucknow",
    "place": "Bara Imambara",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-lucknow-733",
    "state": "Uttar Pradesh",
    "city": "Lucknow",
    "place": "Chota Imambara",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-lucknow-734",
    "state": "Uttar Pradesh",
    "city": "Lucknow",
    "place": "Rumi Darwaza",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-lucknow-735",
    "state": "Uttar Pradesh",
    "city": "Lucknow",
    "place": "British Residency",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-lucknow-736",
    "state": "Uttar Pradesh",
    "city": "Lucknow",
    "place": "Hazratganj",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-prayagraj-737",
    "state": "Uttar Pradesh",
    "city": "Prayagraj",
    "place": "Triveni Sangam",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-prayagraj-738",
    "state": "Uttar Pradesh",
    "city": "Prayagraj",
    "place": "Allahabad Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-prayagraj-739",
    "state": "Uttar Pradesh",
    "city": "Prayagraj",
    "place": "Anand Bhavan",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-prayagraj-740",
    "state": "Uttar Pradesh",
    "city": "Prayagraj",
    "place": "Khusro Bagh",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-prayagraj-741",
    "state": "Uttar Pradesh",
    "city": "Prayagraj",
    "place": "Hanuman Mandir",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-mathura-742",
    "state": "Uttar Pradesh",
    "city": "Mathura",
    "place": "Krishna Janmabhoomi",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-mathura-743",
    "state": "Uttar Pradesh",
    "city": "Mathura",
    "place": "Dwarkadhish Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-mathura-744",
    "state": "Uttar Pradesh",
    "city": "Mathura",
    "place": "Vishram Ghat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-mathura-745",
    "state": "Uttar Pradesh",
    "city": "Mathura",
    "place": "Govardhan Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-mathura-746",
    "state": "Uttar Pradesh",
    "city": "Mathura",
    "place": "Kusum Sarovar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-vrindavan-747",
    "state": "Uttar Pradesh",
    "city": "Vrindavan",
    "place": "Banke Bihari Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-vrindavan-748",
    "state": "Uttar Pradesh",
    "city": "Vrindavan",
    "place": "Prem Mandir",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-vrindavan-749",
    "state": "Uttar Pradesh",
    "city": "Vrindavan",
    "place": "ISKCON Vrindavan",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-vrindavan-750",
    "state": "Uttar Pradesh",
    "city": "Vrindavan",
    "place": "Yamuna Ghats",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-vrindavan-751",
    "state": "Uttar Pradesh",
    "city": "Vrindavan",
    "place": "Govind Dev Ji Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-fatehpur-sikri-752",
    "state": "Uttar Pradesh",
    "city": "Fatehpur Sikri",
    "place": "Buland Darwaza",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-fatehpur-sikri-753",
    "state": "Uttar Pradesh",
    "city": "Fatehpur Sikri",
    "place": "Jama Masjid",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-fatehpur-sikri-754",
    "state": "Uttar Pradesh",
    "city": "Fatehpur Sikri",
    "place": "Panch Mahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-fatehpur-sikri-755",
    "state": "Uttar Pradesh",
    "city": "Fatehpur Sikri",
    "place": "Diwan-i-Khas",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-fatehpur-sikri-756",
    "state": "Uttar Pradesh",
    "city": "Fatehpur Sikri",
    "place": "Tomb of Salim Chishti",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-kanpur-757",
    "state": "Uttar Pradesh",
    "city": "Kanpur",
    "place": "JK Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-kanpur-758",
    "state": "Uttar Pradesh",
    "city": "Kanpur",
    "place": "Kanpur Memorial Church",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-kanpur-759",
    "state": "Uttar Pradesh",
    "city": "Kanpur",
    "place": "Moti Jheel",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-kanpur-760",
    "state": "Uttar Pradesh",
    "city": "Kanpur",
    "place": "Allen Forest Zoo",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttar-pradesh-kanpur-761",
    "state": "Uttar Pradesh",
    "city": "Kanpur",
    "place": "Bithoor",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-dehradun-762",
    "state": "Uttarakhand",
    "city": "Dehradun",
    "place": "Robber's Cave",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-dehradun-763",
    "state": "Uttarakhand",
    "city": "Dehradun",
    "place": "Sahastradhara",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-dehradun-764",
    "state": "Uttarakhand",
    "city": "Dehradun",
    "place": "Forest Research Institute",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-dehradun-765",
    "state": "Uttarakhand",
    "city": "Dehradun",
    "place": "Mindrolling Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-dehradun-766",
    "state": "Uttarakhand",
    "city": "Dehradun",
    "place": "Tapkeshwar Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-mussoorie-767",
    "state": "Uttarakhand",
    "city": "Mussoorie",
    "place": "Mall Road",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-mussoorie-768",
    "state": "Uttarakhand",
    "city": "Mussoorie",
    "place": "Kempty Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-mussoorie-769",
    "state": "Uttarakhand",
    "city": "Mussoorie",
    "place": "Gun Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-mussoorie-770",
    "state": "Uttarakhand",
    "city": "Mussoorie",
    "place": "Lal Tibba",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-mussoorie-771",
    "state": "Uttarakhand",
    "city": "Mussoorie",
    "place": "Company Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-rishikesh-772",
    "state": "Uttarakhand",
    "city": "Rishikesh",
    "place": "Laxman Jhula",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-rishikesh-773",
    "state": "Uttarakhand",
    "city": "Rishikesh",
    "place": "Ram Jhula",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-rishikesh-774",
    "state": "Uttarakhand",
    "city": "Rishikesh",
    "place": "Triveni Ghat",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-rishikesh-775",
    "state": "Uttarakhand",
    "city": "Rishikesh",
    "place": "Beatles Ashram",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-rishikesh-776",
    "state": "Uttarakhand",
    "city": "Rishikesh",
    "place": "Neer Garh Waterfall",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-rishikesh-777",
    "state": "Uttarakhand",
    "city": "Rishikesh",
    "place": "River Rafting",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-haridwar-778",
    "state": "Uttarakhand",
    "city": "Haridwar",
    "place": "Har Ki Pauri",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-haridwar-779",
    "state": "Uttarakhand",
    "city": "Haridwar",
    "place": "Mansa Devi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-haridwar-780",
    "state": "Uttarakhand",
    "city": "Haridwar",
    "place": "Chandi Devi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-haridwar-781",
    "state": "Uttarakhand",
    "city": "Haridwar",
    "place": "Ganga Aarti",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-haridwar-782",
    "state": "Uttarakhand",
    "city": "Haridwar",
    "place": "Maya Devi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-nainital-783",
    "state": "Uttarakhand",
    "city": "Nainital",
    "place": "Naini Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-nainital-784",
    "state": "Uttarakhand",
    "city": "Nainital",
    "place": "Naina Devi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-nainital-785",
    "state": "Uttarakhand",
    "city": "Nainital",
    "place": "Snow View Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-nainital-786",
    "state": "Uttarakhand",
    "city": "Nainital",
    "place": "Tiffin Top",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-nainital-787",
    "state": "Uttarakhand",
    "city": "Nainital",
    "place": "Eco Cave Gardens",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-jim-corbett-788",
    "state": "Uttarakhand",
    "city": "Jim Corbett",
    "place": "Corbett National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-jim-corbett-789",
    "state": "Uttarakhand",
    "city": "Jim Corbett",
    "place": "Dhikala Zone",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-jim-corbett-790",
    "state": "Uttarakhand",
    "city": "Jim Corbett",
    "place": "Garjiya Devi Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-jim-corbett-791",
    "state": "Uttarakhand",
    "city": "Jim Corbett",
    "place": "Corbett Waterfall",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-jim-corbett-792",
    "state": "Uttarakhand",
    "city": "Jim Corbett",
    "place": "Sitabani Wildlife Reserve",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-kedarnath-793",
    "state": "Uttarakhand",
    "city": "Kedarnath",
    "place": "Kedarnath Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-kedarnath-794",
    "state": "Uttarakhand",
    "city": "Kedarnath",
    "place": "Bhairavnath Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-kedarnath-795",
    "state": "Uttarakhand",
    "city": "Kedarnath",
    "place": "Vasuki Tal",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-kedarnath-796",
    "state": "Uttarakhand",
    "city": "Kedarnath",
    "place": "Gaurikund",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-kedarnath-797",
    "state": "Uttarakhand",
    "city": "Kedarnath",
    "place": "Shankaracharya Samadhi",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-badrinath-798",
    "state": "Uttarakhand",
    "city": "Badrinath",
    "place": "Badrinath Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-badrinath-799",
    "state": "Uttarakhand",
    "city": "Badrinath",
    "place": "Mana Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-badrinath-800",
    "state": "Uttarakhand",
    "city": "Badrinath",
    "place": "Vasudhara Falls",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-badrinath-801",
    "state": "Uttarakhand",
    "city": "Badrinath",
    "place": "Tapt Kund",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "uttarakhand-badrinath-802",
    "state": "Uttarakhand",
    "city": "Badrinath",
    "place": "Neelkanth Peak View",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-kolkata-803",
    "state": "West Bengal",
    "city": "Kolkata",
    "place": "Victoria Memorial",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-kolkata-804",
    "state": "West Bengal",
    "city": "Kolkata",
    "place": "Howrah Bridge",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-kolkata-805",
    "state": "West Bengal",
    "city": "Kolkata",
    "place": "Indian Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-kolkata-806",
    "state": "West Bengal",
    "city": "Kolkata",
    "place": "St Paul's Cathedral",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-kolkata-807",
    "state": "West Bengal",
    "city": "Kolkata",
    "place": "Dakshineswar Kali Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-kolkata-808",
    "state": "West Bengal",
    "city": "Kolkata",
    "place": "Belur Math",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-darjeeling-809",
    "state": "West Bengal",
    "city": "Darjeeling",
    "place": "Tiger Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-darjeeling-810",
    "state": "West Bengal",
    "city": "Darjeeling",
    "place": "Darjeeling Himalayan Railway",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-darjeeling-811",
    "state": "West Bengal",
    "city": "Darjeeling",
    "place": "Batasia Loop",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-darjeeling-812",
    "state": "West Bengal",
    "city": "Darjeeling",
    "place": "Himalayan Mountaineering Institute",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-darjeeling-813",
    "state": "West Bengal",
    "city": "Darjeeling",
    "place": "Peace Pagoda",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-siliguri-814",
    "state": "West Bengal",
    "city": "Siliguri",
    "place": "Mahananda Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-siliguri-815",
    "state": "West Bengal",
    "city": "Siliguri",
    "place": "ISKCON Temple Siliguri",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-siliguri-816",
    "state": "West Bengal",
    "city": "Siliguri",
    "place": "Salugara Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-siliguri-817",
    "state": "West Bengal",
    "city": "Siliguri",
    "place": "Bengal Safari",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-siliguri-818",
    "state": "West Bengal",
    "city": "Siliguri",
    "place": "Sevoke Coronation Bridge",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-kalimpong-819",
    "state": "West Bengal",
    "city": "Kalimpong",
    "place": "Deolo Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-kalimpong-820",
    "state": "West Bengal",
    "city": "Kalimpong",
    "place": "Durpin Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-kalimpong-821",
    "state": "West Bengal",
    "city": "Kalimpong",
    "place": "Cactus Nursery",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-kalimpong-822",
    "state": "West Bengal",
    "city": "Kalimpong",
    "place": "Morgan House",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-kalimpong-823",
    "state": "West Bengal",
    "city": "Kalimpong",
    "place": "Zang Dhok Palri Phodang",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-sundarbans-824",
    "state": "West Bengal",
    "city": "Sundarbans",
    "place": "Sundarbans National Park",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-sundarbans-825",
    "state": "West Bengal",
    "city": "Sundarbans",
    "place": "Sajnekhali Wildlife Sanctuary",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-sundarbans-826",
    "state": "West Bengal",
    "city": "Sundarbans",
    "place": "Sudhanyakhali Watch Tower",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-sundarbans-827",
    "state": "West Bengal",
    "city": "Sundarbans",
    "place": "Dobanki Canopy Walk",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "west-bengal-sundarbans-828",
    "state": "West Bengal",
    "city": "Sundarbans",
    "place": "Netidhopani Watch Tower",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-port-blair-829",
    "state": "Andaman and Nicobar Islands",
    "city": "Port Blair",
    "place": "Cellular Jail",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-port-blair-830",
    "state": "Andaman and Nicobar Islands",
    "city": "Port Blair",
    "place": "Corbyn's Cove Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-port-blair-831",
    "state": "Andaman and Nicobar Islands",
    "city": "Port Blair",
    "place": "Ross Island",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-port-blair-832",
    "state": "Andaman and Nicobar Islands",
    "city": "Port Blair",
    "place": "North Bay Island",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-port-blair-833",
    "state": "Andaman and Nicobar Islands",
    "city": "Port Blair",
    "place": "Anthropological Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-swaraj-dweep-834",
    "state": "Andaman and Nicobar Islands",
    "city": "Swaraj Dweep",
    "place": "Radhanagar Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-swaraj-dweep-835",
    "state": "Andaman and Nicobar Islands",
    "city": "Swaraj Dweep",
    "place": "Elephant Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-swaraj-dweep-836",
    "state": "Andaman and Nicobar Islands",
    "city": "Swaraj Dweep",
    "place": "Kalapathar Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-swaraj-dweep-837",
    "state": "Andaman and Nicobar Islands",
    "city": "Swaraj Dweep",
    "place": "Vijaynagar Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-swaraj-dweep-838",
    "state": "Andaman and Nicobar Islands",
    "city": "Swaraj Dweep",
    "place": "Neil's Cove",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-shaheed-dweep-839",
    "state": "Andaman and Nicobar Islands",
    "city": "Shaheed Dweep",
    "place": "Bharatpur Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-shaheed-dweep-840",
    "state": "Andaman and Nicobar Islands",
    "city": "Shaheed Dweep",
    "place": "Laxmanpur Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-shaheed-dweep-841",
    "state": "Andaman and Nicobar Islands",
    "city": "Shaheed Dweep",
    "place": "Natural Bridge",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-shaheed-dweep-842",
    "state": "Andaman and Nicobar Islands",
    "city": "Shaheed Dweep",
    "place": "Sitapur Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-shaheed-dweep-843",
    "state": "Andaman and Nicobar Islands",
    "city": "Shaheed Dweep",
    "place": "Sunset Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-baratang-844",
    "state": "Andaman and Nicobar Islands",
    "city": "Baratang",
    "place": "Limestone Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-baratang-845",
    "state": "Andaman and Nicobar Islands",
    "city": "Baratang",
    "place": "Mud Volcano",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-baratang-846",
    "state": "Andaman and Nicobar Islands",
    "city": "Baratang",
    "place": "Parrot Island",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-baratang-847",
    "state": "Andaman and Nicobar Islands",
    "city": "Baratang",
    "place": "Mangrove Creek",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "andaman-and-nicobar-islands-baratang-848",
    "state": "Andaman and Nicobar Islands",
    "city": "Baratang",
    "place": "Jarawa Territory viewpoint",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chandigarh-chandigarh-849",
    "state": "Chandigarh",
    "city": "Chandigarh",
    "place": "Rock Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chandigarh-chandigarh-850",
    "state": "Chandigarh",
    "city": "Chandigarh",
    "place": "Sukhna Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chandigarh-chandigarh-851",
    "state": "Chandigarh",
    "city": "Chandigarh",
    "place": "Zakir Hussain Rose Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chandigarh-chandigarh-852",
    "state": "Chandigarh",
    "city": "Chandigarh",
    "place": "Capitol Complex",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chandigarh-chandigarh-853",
    "state": "Chandigarh",
    "city": "Chandigarh",
    "place": "Government Museum and Art Gallery",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "chandigarh-chandigarh-854",
    "state": "Chandigarh",
    "city": "Chandigarh",
    "place": "Le Corbusier Centre",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-silvassa-855",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Silvassa",
    "place": "Vanganga Lake Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-silvassa-856",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Silvassa",
    "place": "Tribal Cultural Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-silvassa-857",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Silvassa",
    "place": "Dudhni Waterfalls",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-silvassa-858",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Silvassa",
    "place": "Hirwa Van Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-silvassa-859",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Silvassa",
    "place": "Daman Ganga Riverfront",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-daman-860",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Daman",
    "place": "Devka Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-daman-861",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Daman",
    "place": "Jampore Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-daman-862",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Daman",
    "place": "Moti Daman Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-daman-863",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Daman",
    "place": "St Jerome Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-daman-864",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Daman",
    "place": "Dominican Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-diu-865",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Diu",
    "place": "Diu Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-diu-866",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Diu",
    "place": "Nagoa Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-diu-867",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Diu",
    "place": "Naida Caves",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-diu-868",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Diu",
    "place": "St Paul's Church",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-diu-869",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Diu",
    "place": "Ghogla Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "delhi-new-delhi-870",
    "state": "Delhi",
    "city": "New Delhi",
    "place": "India Gate",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "delhi-new-delhi-871",
    "state": "Delhi",
    "city": "New Delhi",
    "place": "Red Fort",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "delhi-new-delhi-872",
    "state": "Delhi",
    "city": "New Delhi",
    "place": "Qutub Minar",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "delhi-new-delhi-873",
    "state": "Delhi",
    "city": "New Delhi",
    "place": "Humayun's Tomb",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "delhi-new-delhi-874",
    "state": "Delhi",
    "city": "New Delhi",
    "place": "Lotus Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "delhi-new-delhi-875",
    "state": "Delhi",
    "city": "New Delhi",
    "place": "Akshardham Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "delhi-new-delhi-876",
    "state": "Delhi",
    "city": "New Delhi",
    "place": "Jama Masjid",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "delhi-new-delhi-877",
    "state": "Delhi",
    "city": "New Delhi",
    "place": "Rashtrapati Bhavan",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "delhi-new-delhi-878",
    "state": "Delhi",
    "city": "New Delhi",
    "place": "Connaught Place",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-srinagar-879",
    "state": "Jammu and Kashmir",
    "city": "Srinagar",
    "place": "Dal Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-srinagar-880",
    "state": "Jammu and Kashmir",
    "city": "Srinagar",
    "place": "Mughal Gardens",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-srinagar-881",
    "state": "Jammu and Kashmir",
    "city": "Srinagar",
    "place": "Shalimar Bagh",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-srinagar-882",
    "state": "Jammu and Kashmir",
    "city": "Srinagar",
    "place": "Nishat Bagh",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-srinagar-883",
    "state": "Jammu and Kashmir",
    "city": "Srinagar",
    "place": "Hazratbal Shrine",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-srinagar-884",
    "state": "Jammu and Kashmir",
    "city": "Srinagar",
    "place": "Pari Mahal",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-gulmarg-885",
    "state": "Jammu and Kashmir",
    "city": "Gulmarg",
    "place": "Gulmarg Gondola",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-gulmarg-886",
    "state": "Jammu and Kashmir",
    "city": "Gulmarg",
    "place": "Gulmarg Biosphere Reserve",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-gulmarg-887",
    "state": "Jammu and Kashmir",
    "city": "Gulmarg",
    "place": "Apharwat Peak",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-gulmarg-888",
    "state": "Jammu and Kashmir",
    "city": "Gulmarg",
    "place": "Alpather Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-gulmarg-889",
    "state": "Jammu and Kashmir",
    "city": "Gulmarg",
    "place": "St Mary's Church",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-pahalgam-890",
    "state": "Jammu and Kashmir",
    "city": "Pahalgam",
    "place": "Betaab Valley",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-pahalgam-891",
    "state": "Jammu and Kashmir",
    "city": "Pahalgam",
    "place": "Aru Valley",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-pahalgam-892",
    "state": "Jammu and Kashmir",
    "city": "Pahalgam",
    "place": "Baisaran Valley",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-pahalgam-893",
    "state": "Jammu and Kashmir",
    "city": "Pahalgam",
    "place": "Lidder River",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-pahalgam-894",
    "state": "Jammu and Kashmir",
    "city": "Pahalgam",
    "place": "Pahalgam Golf Course",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-sonamarg-895",
    "state": "Jammu and Kashmir",
    "city": "Sonamarg",
    "place": "Thajiwas Glacier",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-sonamarg-896",
    "state": "Jammu and Kashmir",
    "city": "Sonamarg",
    "place": "Zoji La",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-sonamarg-897",
    "state": "Jammu and Kashmir",
    "city": "Sonamarg",
    "place": "Baltal",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-sonamarg-898",
    "state": "Jammu and Kashmir",
    "city": "Sonamarg",
    "place": "Sind River",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-sonamarg-899",
    "state": "Jammu and Kashmir",
    "city": "Sonamarg",
    "place": "Zero Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-jammu-900",
    "state": "Jammu and Kashmir",
    "city": "Jammu",
    "place": "Vaishno Devi",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-jammu-901",
    "state": "Jammu and Kashmir",
    "city": "Jammu",
    "place": "Raghunath Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-jammu-902",
    "state": "Jammu and Kashmir",
    "city": "Jammu",
    "place": "Bahubali Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-jammu-903",
    "state": "Jammu and Kashmir",
    "city": "Jammu",
    "place": "Mansar Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "jammu-and-kashmir-jammu-904",
    "state": "Jammu and Kashmir",
    "city": "Jammu",
    "place": "Amar Mahal Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-leh-905",
    "state": "Ladakh",
    "city": "Leh",
    "place": "Leh Palace",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-leh-906",
    "state": "Ladakh",
    "city": "Leh",
    "place": "Shanti Stupa",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-leh-907",
    "state": "Ladakh",
    "city": "Leh",
    "place": "Magnetic Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-leh-908",
    "state": "Ladakh",
    "city": "Leh",
    "place": "Thiksey Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-leh-909",
    "state": "Ladakh",
    "city": "Leh",
    "place": "Hall of Fame",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-leh-910",
    "state": "Ladakh",
    "city": "Leh",
    "place": "Sangam Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-nubra-valley-911",
    "state": "Ladakh",
    "city": "Nubra Valley",
    "place": "Hunder Sand Dunes",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-nubra-valley-912",
    "state": "Ladakh",
    "city": "Nubra Valley",
    "place": "Diskit Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-nubra-valley-913",
    "state": "Ladakh",
    "city": "Nubra Valley",
    "place": "Turtuk Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-nubra-valley-914",
    "state": "Ladakh",
    "city": "Nubra Valley",
    "place": "Panamik Hot Springs",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-nubra-valley-915",
    "state": "Ladakh",
    "city": "Nubra Valley",
    "place": "Khardung La",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-pangong-916",
    "state": "Ladakh",
    "city": "Pangong",
    "place": "Pangong Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-pangong-917",
    "state": "Ladakh",
    "city": "Pangong",
    "place": "Spangmik Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-pangong-918",
    "state": "Ladakh",
    "city": "Pangong",
    "place": "Mann Village",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-pangong-919",
    "state": "Ladakh",
    "city": "Pangong",
    "place": "Pangong View Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-pangong-920",
    "state": "Ladakh",
    "city": "Pangong",
    "place": "Lukung",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-alchi-921",
    "state": "Ladakh",
    "city": "Alchi",
    "place": "Alchi Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-alchi-922",
    "state": "Ladakh",
    "city": "Alchi",
    "place": "Likir Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-alchi-923",
    "state": "Ladakh",
    "city": "Alchi",
    "place": "Basgo Monastery",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-alchi-924",
    "state": "Ladakh",
    "city": "Alchi",
    "place": "Magnetic Hill",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "ladakh-alchi-925",
    "state": "Ladakh",
    "city": "Alchi",
    "place": "Indus River View",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-kavaratti-926",
    "state": "Lakshadweep",
    "city": "Kavaratti",
    "place": "Kavaratti Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-kavaratti-927",
    "state": "Lakshadweep",
    "city": "Kavaratti",
    "place": "Ujra Mosque",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-kavaratti-928",
    "state": "Lakshadweep",
    "city": "Kavaratti",
    "place": "Kavaratti Aquarium",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-kavaratti-929",
    "state": "Lakshadweep",
    "city": "Kavaratti",
    "place": "Marine Aquarium",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-kavaratti-930",
    "state": "Lakshadweep",
    "city": "Kavaratti",
    "place": "Lagoon View",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-agatti-931",
    "state": "Lakshadweep",
    "city": "Agatti",
    "place": "Agatti Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-agatti-932",
    "state": "Lakshadweep",
    "city": "Agatti",
    "place": "Agatti Lagoon",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-agatti-933",
    "state": "Lakshadweep",
    "city": "Agatti",
    "place": "Coral Reefs",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-agatti-934",
    "state": "Lakshadweep",
    "city": "Agatti",
    "place": "Water Sports Centre",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-agatti-935",
    "state": "Lakshadweep",
    "city": "Agatti",
    "place": "Sunset Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-bangaram-936",
    "state": "Lakshadweep",
    "city": "Bangaram",
    "place": "Bangaram Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-bangaram-937",
    "state": "Lakshadweep",
    "city": "Bangaram",
    "place": "Bangaram Lagoon",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-bangaram-938",
    "state": "Lakshadweep",
    "city": "Bangaram",
    "place": "Coral Reefs",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-bangaram-939",
    "state": "Lakshadweep",
    "city": "Bangaram",
    "place": "Snorkeling Area",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-bangaram-940",
    "state": "Lakshadweep",
    "city": "Bangaram",
    "place": "Diving Point",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-kadmat-941",
    "state": "Lakshadweep",
    "city": "Kadmat",
    "place": "Kadmat Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-kadmat-942",
    "state": "Lakshadweep",
    "city": "Kadmat",
    "place": "Kadmat Island Lagoon",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-kadmat-943",
    "state": "Lakshadweep",
    "city": "Kadmat",
    "place": "Marine Turtle Zone",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-kadmat-944",
    "state": "Lakshadweep",
    "city": "Kadmat",
    "place": "Water Sports Centre",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "lakshadweep-kadmat-945",
    "state": "Lakshadweep",
    "city": "Kadmat",
    "place": "Sandbank",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-946",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Paradise Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-947",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Promenade Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-948",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Sri Aurobindo Ashram",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-949",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Auroville",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-950",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "French Quarter",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-951",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "White Town",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-952",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Puducherry Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-953",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Botanical Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-954",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Chunnambar Boat House",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-955",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Arikamedu",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-956",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Basilica of the Sacred Heart of Jesus",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-957",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Rock Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-958",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Serenity Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-959",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Pondicherry Lighthouse",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-960",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Manakula Vinayagar Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-961",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Immaculate Conception Cathedral",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-962",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Ousteri Lake",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-963",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Heritage Town",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-964",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Goubert Market",
    "category": "Shopping",
    "tripTypes": [
      "Shopping",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-965",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Bharathi Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-966",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Jawahar Toy Museum",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-967",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "French War Memorial",
    "category": "Heritage & History",
    "tripTypes": [
      "Culture",
      "History",
      "Family",
      "Sightseeing"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-968",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Old Lighthouse",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-969",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Matrimandir Viewpoint",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-970",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Mahe de Labourdonnais Street",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-puducherry-971",
    "state": "Puducherry",
    "city": "Puducherry",
    "place": "Yanam Botanical Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-mahe-972",
    "state": "Puducherry",
    "city": "Mahe",
    "place": "Mahe Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-mahe-973",
    "state": "Puducherry",
    "city": "Mahe",
    "place": "St Teresa Shrine",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-mahe-974",
    "state": "Puducherry",
    "city": "Mahe",
    "place": "Mahe River Walk",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-mahe-975",
    "state": "Puducherry",
    "city": "Mahe",
    "place": "Tagore Park",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-mahe-976",
    "state": "Puducherry",
    "city": "Mahe",
    "place": "Mahe Walkway",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-yanam-977",
    "state": "Puducherry",
    "city": "Yanam",
    "place": "Yanam Ferry Road",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-yanam-978",
    "state": "Puducherry",
    "city": "Yanam",
    "place": "Yanam Botanical Garden",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 300,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-yanam-979",
    "state": "Puducherry",
    "city": "Yanam",
    "place": "Rajiv Gandhi Beach",
    "category": "Nature",
    "tripTypes": [
      "Nature",
      "Adventure",
      "Relaxation",
      "Family"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-yanam-980",
    "state": "Puducherry",
    "city": "Yanam",
    "place": "Venkanna Babu Temple",
    "category": "Culture & Religion",
    "tripTypes": [
      "Culture",
      "Spiritual",
      "Family",
      "History"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  },
  {
    "id": "puducherry-yanam-981",
    "state": "Puducherry",
    "city": "Yanam",
    "place": "Draksharama Road",
    "category": "Sightseeing",
    "tripTypes": [
      "Sightseeing",
      "Family",
      "Couple"
    ],
    "estimatedCost": 0,
    "rating": 4.4,
    "visitHours": 2
  }
];

const normalise = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const numberValue = (value, fallback = 0) => {
  const n = Number(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : fallback;
};

const getInput = (source, keys, fallback = "") => {
  for (const key of keys) {
    if (source && source[key] !== undefined && source[key] !== null && source[key] !== "") {
      return source[key];
    }
  }
  return fallback;
};

const extractPreferences = (location) => {
  const state = location?.state;

  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem("travelPreferences") || "{}");
  } catch {
    saved = {};
  }

  // Supports the most common shapes used by React Router/localStorage.
  const source =
    state?.preferences ||
    state?.formData ||
    state?.tripData ||
    state ||
    saved ||
    {};

  return {
    state: getInput(source, ["state", "selectedState", "destinationState", "fromState"], ""),
    city: getInput(source, ["city", "selectedCity", "destinationCity"], ""),
    budget: numberValue(
      getInput(source, ["budget", "amount", "totalBudget", "maxBudget"], 0),
      0
    ),
    days: numberValue(
      getInput(source, ["days", "tripLength", "duration", "tripDays"], 0),
      0
    ),
    tripType: getInput(
      source,
      ["tripType", "travelType", "type", "theme", "category"],
      ""
    ),
    group: getInput(
      source,
      ["group", "groupType", "travellers", "travelers", "travellerType"],
      ""
    ),
    groupSize: numberValue(
      getInput(source, ["groupSize", "travelersCount", "travellersCount", "people"], 1),
      1
    ),
    crowdPreference: getInput(source, ['crowdPreference', 'crowd'], ''),
    tripPacing: getInput(source, ['tripPacing', 'pacing'], ''),
    weather: getInput(source, ['weather', 'weatherPreference'], ''),
    vibes: (() => { const v = getInput(source, ['vibes', 'tripVibes'], []); return Array.isArray(v) ? v : []; })(),
    travelMode: getInput(source, ['travelMode', 'mode'], ''),
    tripPurpose: getInput(source, ['tripPurpose', 'purpose'], ''),
    stayPreference: getInput(source, ['stayPreference', 'stay'], ''),
  };
};

const stateAliases = {
  "pondicherry": "Puducherry",
  "pondicherry union territory": "Puducherry",
  "jammu and kashmir": "Jammu and Kashmir",
  "jammu kashmir": "Jammu and Kashmir",
  "andaman nicobar": "Andaman and Nicobar Islands",
  "andaman and nicobar": "Andaman and Nicobar Islands",
  "dadra nagar haveli daman diu": "Dadra and Nagar Haveli and Daman and Diu",
  "dadra and nagar haveli daman and diu": "Dadra and Nagar Haveli and Daman and Diu",
};

const findStateName = (input) => {
  const n = normalise(input);
  if (!n) return "";

  if (stateAliases[n]) return stateAliases[n];

  const exact = Object.keys(
    INDIA_DESTINATIONS.reduce((acc, item) => {
      acc[item.state] = true;
      return acc;
    }, {})
  ).find((state) => normalise(state) === n);

  if (exact) return exact;

  const partial = Object.keys(
    INDIA_DESTINATIONS.reduce((acc, item) => {
      acc[item.state] = true;
      return acc;
    }, {})
  ).find((state) => {
    const s = normalise(state);
    return s.includes(n) || n.includes(s);
  });

  return partial || "";
};

const cityMatch = (enteredCity, actualCity) => {
  const a = normalise(enteredCity);
  const b = normalise(actualCity);
  if (!a) return false;
  return a === b || a.includes(b) || b.includes(a);
};

const tripTypeMatch = (tripType, item) => {
  const wanted = normalise(tripType);
  if (!wanted) return false;

  const all = [
    item.category,
    ...(item.tripTypes || []),
    item.place,
  ].map(normalise);

  return all.some((x) => x === wanted || x.includes(wanted) || wanted.includes(x));
};

const calculateScore = (item, prefs) => {
  let score = 0;

  // State is the strongest condition.
  if (normalise(item.state) === normalise(prefs.state)) score += 100;

  // City is even stronger when the user supplied one.
  if (prefs.city && cityMatch(prefs.city, item.city)) score += 120;

  // Trip type.
  if (tripTypeMatch(prefs.tripType, item)) score += 35;

  // Budget: don't reject places just because the estimated cost is different.
  if (prefs.budget > 0) {
    const cost = Number(item.estimatedCost || 0);
    if (cost <= prefs.budget) {
      score += 25;
      if (cost <= prefs.budget * 0.5) score += 8;
    } else {
      const difference = cost - prefs.budget;
      score += Math.max(0, 15 - difference / Math.max(prefs.budget, 1) * 15);
    }
  }

  // Days: attraction visit time is used softly.
  if (prefs.days > 0) {
    const hours = Number(item.visitHours || 2);
    const availableHours = prefs.days * 8;
    if (hours <= availableHours) score += 10;
  }

  // Group preferences are intentionally soft because an attraction can work
  // for several group types.
  const group = normalise(prefs.group);
  if (group) {
    const groupMap = {
      family: ["family", "sightseeing", "culture"],
      friends: ["adventure", "nature", "shopping", "sightseeing"],
      couple: ["couple", "relaxation", "beach", "nature"],
      solo: ["sightseeing", "culture", "nature", "history"],
    };

    const relevant = groupMap[group] || [];
    if (relevant.some((x) => (item.tripTypes || []).map(normalise).includes(x))) {
      score += 8;
    }
  }

  // Rating tie-breaker.
  score += Number(item.rating || 0) * 2;

  return score;
};

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  if (amount <= 0) return "Free";
  return `₹${amount.toLocaleString("en-IN")}`;
};

const generateMatchBadges = (item, prefs, matchScore) => {
  const badges = [];
  const maxScore = 300;
  const pct = Math.min(99, Math.max(40, Math.round((matchScore / maxScore) * 100)));
  badges.push({ emoji: '🎯', text: `${pct}% Match`, type: 'match' });

  const cost = Number(item.estimatedCost || 0);
  if (prefs.budget > 0 && cost <= prefs.budget) {
    badges.push({ emoji: 'wallet', text: `Within ₹${prefs.budget.toLocaleString('en-IN')} budget`, type: 'budget' });
  }

  if (prefs.crowdPreference) {
    const offbeatCategories = ['nature', 'trekking', 'wildlife', 'waterfall'];
    const isOffbeat = offbeatCategories.some(c => (item.category || '').toLowerCase().includes(c));
    if (prefs.crowdPreference === 'Quiet & Offbeat' && isOffbeat) {
      badges.push({ emoji: 'leaf', text: 'Quiet & Offbeat', type: 'crowd' });
    } else if (prefs.crowdPreference === 'Popular & Iconic' && !isOffbeat) {
      badges.push({ emoji: 'building', text: 'Popular Spot', type: 'crowd' });
    }
  }

  if (prefs.days > 0) {
    const hours = Number(item.visitHours || 2);
    if (hours <= prefs.days * 8) {
      badges.push({ emoji: '⏱️', text: `Fits in ${prefs.days}-day trip`, type: 'time' });
    }
  }

  if (prefs.vibes && prefs.vibes.length > 0) {
    const itemTypes = (item.tripTypes || []).map(t => t.toLowerCase());
    const matchedVibe = prefs.vibes.find(v => itemTypes.some(t => t.includes(v.toLowerCase()) || v.toLowerCase().includes(t)));
    if (matchedVibe) {
      badges.push({ emoji: '✨', text: `${matchedVibe} match`, type: 'vibe' });
    }
  }

  return badges.slice(0, 4);
};

const ITINERARY_TEMPLATES = {
  Nature: [
    { time: 'Morning', activity: 'Sunrise viewpoint & nature walk', tip: 'Carry water and wear comfortable shoes' },
    { time: 'Afternoon', activity: 'Explore trails & scenic spots', tip: 'Pack a light lunch for a scenic picnic' },
    { time: 'Evening', activity: 'Sunset photography & local market', tip: 'Best photos during golden hour' },
  ],
  'Heritage & History': [
    { time: 'Morning', activity: 'Heritage monument tour & guided walk', tip: 'Book a local guide for hidden stories' },
    { time: 'Afternoon', activity: 'Museum visit & cultural immersion', tip: 'Most museums close by 5 PM' },
    { time: 'Evening', activity: 'Old town stroll & street food', tip: 'Try the local specialty dish' },
  ],
  Sightseeing: [
    { time: 'Morning', activity: 'Visit the iconic landmark early', tip: 'Arrive before 9 AM for fewer tourists' },
    { time: 'Afternoon', activity: 'Explore surrounding attractions & photo stops', tip: 'Keep your camera charged!' },
    { time: 'Evening', activity: 'Relax at a nearby café with a view', tip: 'Ask locals for their favourite spot' },
  ],
  Adventure: [
    { time: 'Morning', activity: 'Trekking or adventure sport session', tip: 'Start early while it\'s cool' },
    { time: 'Afternoon', activity: 'River rafting, zip-lining, or rappelling', tip: 'Book in advance during peak season' },
    { time: 'Evening', activity: 'Bonfire & stargazing', tip: 'Carry warm layers for mountain evenings' },
  ],
  Religious: [
    { time: 'Morning', activity: 'Temple / shrine darshan at dawn', tip: 'Dress modestly and remove footwear' },
    { time: 'Afternoon', activity: 'Visit nearby spiritual sites & ashrams', tip: 'Many temples have a midday break' },
    { time: 'Evening', activity: 'Evening aarti or prayer ceremony', tip: 'The Ganga aarti is unmissable if near a river' },
  ],
};

const DEFAULT_ITINERARY = [
  { time: 'Morning', activity: 'Arrive & explore the area on foot', tip: 'Start early for the best experience' },
  { time: 'Afternoon', activity: 'Visit the main attraction & local spots', tip: 'Carry snacks and water' },
  { time: 'Evening', activity: 'Wind down at a local eatery & shop for souvenirs', tip: 'Ask locals for recommendations' },
];

const getItinerary = (item) => {
  const category = item.category || '';
  for (const [key, plan] of Object.entries(ITINERARY_TEMPLATES)) {
    if (category.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(category.toLowerCase())) {
      return plan;
    }
  }
  return DEFAULT_ITINERARY;
};

/* ============================================================
   PASTE THIS ABOVE `function Results() {`  (after formatCurrency)
   ============================================================ */

// Module-level cache so switching filters/sort doesn't re-fetch
// images you've already loaded in this session.
const imageCache = new Map();

const fetchWikiThumbnail = async (place, city, state, signal) => {
  const cacheKey = `${place}|${city}`;
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey);

  const tryQuery = async (query) => {
    const url =
      "https://en.wikipedia.org/w/api.php?origin=*&action=query&generator=search" +
      `&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages` +
      "&piprop=thumbnail&pithumbsize=600&format=json";

    const res = await fetch(url, { signal });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;
    const first = Object.values(pages)[0];
    return first?.thumbnail?.source || null;
  };

  // Try the most specific query first, then fall back to broader ones.
  const queries = [
    `${place} ${city}`,
    `${place} ${state}`,
    place,
  ];

  let result = null;
  for (const q of queries) {
    try {
      result = await tryQuery(q);
      if (result) break;
    } catch {
      // aborted or network error — try next query
    }
  }

  imageCache.set(cacheKey, result);
  return result;
};

function DestinationImage({ item }) {
  const [src, setSrc] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | done | empty

  React.useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setSrc(null);

    fetchWikiThumbnail(item.place, item.city, item.state, controller.signal).then(
      (url) => {
        if (controller.signal.aborted) return;
        if (url) {
          setSrc(url);
          setStatus("done");
        } else {
          setStatus("empty");
        }
      }
    );

    return () => controller.abort();
  }, [item.place, item.city, item.state]);

  if (status === "done" && src) {
    return (
      <img
        src={src}
        alt={item.place}
        loading="lazy"
        onError={() => setStatus("empty")}
      />
    );
  }

  return (
    <div className="destination-card-image-fallback">
      {status === "loading" ? (
        <span className="destination-card-image-spinner" />
      ) : (
        <span style={{ fontSize: "48px" }}>📍</span>
      )}
    </div>
  );
}

/* ============================================================
   REPLACE the existing image block inside the card render:

     <div className="destination-card-image">
       {card.image ? ( ... ) : ( ... )}
     </div>

   WITH:

     <div className="destination-card-image">
       <DestinationImage item={item} />
     </div>
   ============================================================ */
function Results() {
  const location = useLocation();
  const session = getSession();

  const preferences = useMemo(() => extractPreferences(location), [location]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("match");
  const [expandedItinerary, setExpandedItinerary] = useState(null);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [compareItems, setCompareItems] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  // Load user's favorites on mount
  useEffect(() => {
    if (session?.email) {
      const userFavs = [];
      INDIA_DESTINATIONS.forEach(dest => {
        if (isFavorite(dest.id, session.email)) {
          userFavs.push(dest.id);
        }
      });
      setFavorites(new Set(userFavs));
    }
    setSearchHistory(getSearchHistory());
  }, [session?.email]);
  useEffect(() => {
    if (session?.email) {
      const userFavs = [];
      INDIA_DESTINATIONS.forEach(dest => {
        if (isFavorite(dest.id, session.email)) {
          userFavs.push(dest.id);
        }
      });
      setFavorites(new Set(userFavs));
    }
  }, [session?.email]);

  const handleToggleFavorite = (item) => {
    if (!session?.email) return;

    if (favorites.has(item.id)) {
      removeFavorite(item.id, session.email);
      setFavorites(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    } else {
      addFavorite(item, session.email);
      setFavorites(prev => new Set(prev).add(item.id));
      recordFavorite(item.state);
      checkAchievements();
    }
  };

  const handleToggleCompare = (item) => {
    if (compareItems.find(c => c.id === item.id)) {
      setCompareItems(prev => prev.filter(c => c.id !== item.id));
    } else if (compareItems.length < 3) {
      setCompareItems(prev => [...prev, item]);
    }
  };

  const openCompareModal = () => {
    if (compareItems.length >= 2) {
      setShowCompareModal(true);
      recordComparison();
      checkAchievements();
    }
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    if (value.trim()) {
      setShowSearchHistory(true);
    } else {
      setShowSearchHistory(false);
    }
  };

  const handleSearchSubmit = (value) => {
    if (value.trim()) {
      addSearchHistory(value);
      setSearchHistory(getSearchHistory());
      setShowSearchHistory(false);
    }
  };

  const handleHistoryClick = (term) => {
    setSearch(term);
    setShowSearchHistory(false);
  };

  const handleShare = (item) => {
    const shareText = `Check out ${item.place} in ${item.city}, ${item.state}! Rating: ${item.rating}`;
    const shareUrl = `${window.location.origin}/results`;

    if (navigator.share) {
      navigator.share({
        title: item.place,
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('Link copied to clipboard!');
    }
  };

  const selectedState = findStateName(preferences.state);

  const stateData = useMemo(() => {
    if (!selectedState) return [];
    return INDIA_DESTINATIONS.filter(
      (item) => normalise(item.state) === normalise(selectedState)
    );
  }, [selectedState]);

  /*
    CORE MAPPING RULE

    1. State entered + city empty:
       only the selected state's cities are considered.

    2. State entered + city entered:
       only the selected state's selected city is considered.

    3. If the state name is slightly different (Pondicherry/Puducherry),
       aliases handle it.

    This prevents Maharashtra/Mumbai or Goa/Panaji from appearing for
    Puducherry.
  */
  const baseResults = useMemo(() => {
    if (!selectedState) return [];

    let results = stateData;

    if (preferences.city) {
      results = stateData.filter((item) =>
        cityMatch(preferences.city, item.city)
      );
    }

    return results.map((item) => ({
      ...item,
      matchScore: calculateScore(item, {
        ...preferences,
        state: selectedState,
      }),
    }));
  }, [selectedState, stateData, preferences]);

  const filteredResults = useMemo(() => {
    let results = [...baseResults];

    if (search.trim()) {
      const q = normalise(search);
      results = results.filter((item) =>
        [item.place, item.city, item.state, item.category]
          .map(normalise)
          .some((value) => value.includes(q))
      );
    }

    if (category !== "All") {
      results = results.filter(
        (item) => normalise(item.category) === normalise(category)
      );
    }

    if (showFavoritesOnly) {
      results = results.filter((item) => favorites.has(item.id));
    }

    if (sortBy === "rating") {
      results.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortBy === "cost-low") {
      results.sort(
        (a, b) => Number(a.estimatedCost) - Number(b.estimatedCost)
      );
    } else {
      results.sort((a, b) => b.matchScore - a.matchScore);
    }

    /*
      Always keep enough results for the closest-match requirement.
      Since all results are already restricted to the requested state/city,
      fallback results cannot come from another state.
    */
    return results;
  }, [baseResults, search, category, sortBy, showFavoritesOnly, favorites]);

  const citySummary = useMemo(() => {
    const map = {};

    baseResults.forEach((item) => {
      if (!map[item.city]) {
        map[item.city] = {
          city: item.city,
          places: 0,
          bestScore: -Infinity,
          bestRating: 0,
        };
      }

      map[item.city].places += 1;
      map[item.city].bestScore = Math.max(
        map[item.city].bestScore,
        item.matchScore
      );
      map[item.city].bestRating = Math.max(
        map[item.city].bestRating,
        Number(item.rating || 0)
      );
    });

    return Object.values(map).sort((a, b) => {
      if (b.bestScore !== a.bestScore) return b.bestScore - a.bestScore;
      return b.bestRating - a.bestRating;
    });
  }, [baseResults]);

  const categories = useMemo(() => {
    return ["All", ...new Set(stateData.map((item) => item.category))];
  }, [stateData]);

  const visibleResults = filteredResults.slice(0, 70);

  const destinationCardData = (item) => ({
    ...item,

    // Common property aliases so this file works with cards expecting
    // different field names.
    name: item.place,
    title: item.place,
    location: `${item.city}, ${item.state}`,
    destination: item.place,
    price: formatCurrency(item.estimatedCost),
    cost: item.estimatedCost,
    budget: item.estimatedCost,
  });

  return (
    <div className="results-page">
      <header className="results-header">
        <h1>
          {preferences.city
            ? `Places to Visit in ${preferences.city}`
            : selectedState
              ? `Best Places to Visit in ${selectedState}`
              : "Explore India"}
        </h1>

        <p>
          {preferences.city
            ? `Discover places to roam in ${preferences.city}`
            : selectedState
              ? `Explore cities and attractions across ${selectedState}`
              : "Choose a state to discover destinations across India."}
        </p>

        <div className="xp-badge">
          <Target size={14} strokeWidth={2} />
          <span>Exploring India</span>
        </div>
      </header>

      <div className="preferences-summary">
        {preferences.state && (
          <span className="pref-summary-item">
            <MapPin size={14} strokeWidth={2} />
            {selectedState || preferences.state}
          </span>
        )}
        {preferences.city && (
          <span className="pref-summary-item">
            <Building2 size={14} strokeWidth={2} />
            {preferences.city}
          </span>
        )}
        {preferences.tripType && (
          <span className="pref-summary-item">
            <Sun size={14} strokeWidth={2} />
            {preferences.tripType}
          </span>
        )}
        {preferences.budget > 0 && (
          <span className="pref-summary-item">
            <Wallet size={14} strokeWidth={2} />
            {formatCurrency(preferences.budget)}
          </span>
        )}
        {preferences.days > 0 && (
          <span className="pref-summary-item">
            <Calendar size={14} strokeWidth={2} />
            {preferences.days} Days
          </span>
        )}
        {preferences.group && (
          <span className="pref-summary-item">
            <Users size={14} strokeWidth={2} />
            {preferences.group}
          </span>
        )}
        {preferences.groupSize > 0 && (
          <span className="pref-summary-item">
            <Users size={14} strokeWidth={2} />
            {preferences.groupSize} People
          </span>
        )}
      </div>

      {!preferences.city && selectedState && citySummary.length > 0 && (
        <section className="city-summary-section">
          <div className="results-count">
            {citySummary.length} cities / destinations found in {selectedState}
          </div>

          <div className="preferences-summary">
            {citySummary.slice(0, 12).map((city) => (
              <span key={city.city} className="pref-summary-item">
                <MapPin size={14} strokeWidth={2} />
                {city.city} · {city.places} places
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search places or cities..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchHistory.length > 0 && setShowSearchHistory(true)}
            onBlur={() => setTimeout(() => setShowSearchHistory(false), 200)}
          />
          {showSearchHistory && searchHistory.length > 0 && (
            <div className="search-history-dropdown">
              <div className="search-history-header">
                <Clock size={14} strokeWidth={2} />
                <span>Recent searches</span>
                <button
                  type="button"
                  className="search-history-clear"
                  onClick={() => {
                    clearSearchHistory();
                    setSearchHistory([]);
                  }}
                >
                  Clear all
                </button>
              </div>
              <div className="search-history-list">
                {searchHistory.map((term, index) => (
                  <div
                    key={index}
                    className="search-history-item"
                    onClick={() => handleHistoryClick(term)}
                  >
                    <span>{term}</span>
                    <button
                      type="button"
                      className="search-history-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSearchHistory(term);
                        setSearchHistory(getSearchHistory());
                      }}
                    >
                      <Trash2 size={12} strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="filter-bar">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="match">Best Match</option>
            <option value="rating">Highest Rated</option>
            <option value="cost-low">Lowest Cost</option>
          </select>

          {session?.email && (
            <button
              type="button"
              className={`filter-toggle ${showFavoritesOnly ? 'filter-toggle-active' : ''}`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <Heart size={16} fill={showFavoritesOnly ? "currentColor" : "none"} />
              {showFavoritesOnly ? 'All Places' : 'Saved Only'}
            </button>
          )}
        </div>
      </div>

      <div className="results-count">
        {visibleResults.length} places found
        {selectedState ? ` in ${selectedState}` : ""}
        {preferences.city ? ` · ${preferences.city}` : ""}
      </div>

      {visibleResults.length > 0 ? (
        <div className="results-grid">
          {visibleResults.map((item) => {
            const card = destinationCardData(item);

            return (
              <article className="destination-card" key={item.id}>
                <div className="destination-card-content">
                  <div className="destination-card-image">
                    <DestinationImage item={item} />
                  </div>

                  <div className="destination-card-info">
                    <div
                      style={{
                        fontSize: "12px",
                        opacity: 0.7,
                        marginBottom: "6px",
                      }}
                    >
                      {card.city}, {card.state}
                    </div>

                    <h2>{card.place}</h2>

                    <div className="card-meta">
                      <span className="card-meta-item">
                        <Star size={12} strokeWidth={2} fill="currentColor" />
                        {card.rating}
                      </span>
                      <span className="card-meta-item">
                        <Tag size={12} strokeWidth={2} />
                        {card.category}
                      </span>
                      <span className="card-meta-item">
                        <DollarSign size={12} strokeWidth={2} />
                        {formatCurrency(card.estimatedCost)}
                      </span>
                    </div>

                    <p>
                      Estimated visit: {card.visitHours} hour
                      {card.visitHours === 1 ? "" : "s"}
                    </p>

                    <div className="card-actions">
                      <button
                        type="button"
                        className={`action-icon ${favorites.has(item.id) ? 'action-icon-active' : ''}`}
                        onClick={() => handleToggleFavorite(item)}
                        title={favorites.has(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart size={16} fill={favorites.has(item.id) ? "currentColor" : "none"} strokeWidth={2} />
                      </button>

                      <button
                        type="button"
                        className="action-icon"
                        onClick={() => handleShare(item)}
                        title="Share destination"
                      >
                        <Share2 size={16} strokeWidth={2} />
                      </button>

                      <label className="compare-trigger">
                        <input
                          type="checkbox"
                          checked={compareItems.find(c => c.id === item.id)}
                          onChange={() => handleToggleCompare(item)}
                          disabled={!compareItems.find(c => c.id === item.id) && compareItems.length >= 3}
                        />
                        <span>Compare</span>
                      </label>

                      <button
                        type="button"
                        className="explore-btn"
                        onClick={() => {
                          const mapsQuery = encodeURIComponent(
                            `${card.place}, ${card.city}, ${card.state}, India`
                          );
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="no-results">
          {selectedState
            ? preferences.city
              ? `No exact places found in ${preferences.city}. Check the city name or clear it to explore all destinations in ${selectedState}.`
              : `No destinations found in ${selectedState}.`
            : "Please select a valid Indian state."}
        </div>
      )}

      {compareItems.length > 0 && (
        <div className="compare-bar">
          <div className="compare-bar-content">
            <div className="compare-bar-info">
              <Scale size={18} strokeWidth={2} />
              <span>{compareItems.length} destination{compareItems.length > 1 ? 's' : ''} selected</span>
            </div>
            <div className="compare-bar-actions">
              <button
                type="button"
                className="compare-bar-clear"
                onClick={() => setCompareItems([])}
              >
                Clear all
              </button>
              <button
                type="button"
                className="compare-bar-compare"
                onClick={openCompareModal}
                disabled={compareItems.length < 2}
              >
                Compare ({compareItems.length}/3)
              </button>
            </div>
          </div>
        </div>
      )}

      {showCompareModal && (
        <div className="compare-modal-overlay" onClick={() => setShowCompareModal(false)}>
          <div className="compare-modal" onClick={(e) => e.stopPropagation()}>
            <div className="compare-modal-header">
              <h2>Compare Destinations</h2>
              <button
                type="button"
                className="compare-modal-close"
                onClick={() => setShowCompareModal(false)}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            <div className="compare-modal-body">
              <div className="compare-table">
                <div className="compare-row compare-row-header">
                  <div className="compare-cell">Feature</div>
                  {compareItems.map((item) => (
                    <div key={item.id} className="compare-cell">
                      <strong>{item.place}</strong>
                      <div className="compare-cell-sub">{item.city}</div>
                    </div>
                  ))}
                </div>
                <div className="compare-row">
                  <div className="compare-cell">Rating</div>
                  {compareItems.map((item) => (
                    <div key={item.id} className="compare-cell">
                      <Star size={14} strokeWidth={2} fill="currentColor" /> {item.rating}
                    </div>
                  ))}
                </div>
                <div className="compare-row">
                  <div className="compare-cell">Category</div>
                  {compareItems.map((item) => (
                    <div key={item.id} className="compare-cell">{item.category}</div>
                  ))}
                </div>
                <div className="compare-row">
                  <div className="compare-cell">Entry Fee</div>
                  {compareItems.map((item) => (
                    <div key={item.id} className="compare-cell">
                      {item.estimatedCost === 0 ? 'Free' : `₹${item.estimatedCost}`}
                    </div>
                  ))}
                </div>
                <div className="compare-row">
                  <div className="compare-cell">Visit Duration</div>
                  {compareItems.map((item) => (
                    <div key={item.id} className="compare-cell">{item.visitHours} hour{item.visitHours > 1 ? 's' : ''}</div>
                  ))}
                </div>
                <div className="compare-row">
                  <div className="compare-cell">Trip Types</div>
                  {compareItems.map((item) => (
                    <div key={item.id} className="compare-cell">
                      {item.tripTypes?.slice(0, 3).join(', ')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;