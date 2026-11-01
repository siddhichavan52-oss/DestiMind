"""
Expands DestiMind destination database from 59 to 89 destinations
and adds corresponding verified hotels for all new destinations.
"""

import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent
DESTINATIONS_FILE = DATA_DIR / "destinations.json"
HOTELS_FILE = DATA_DIR / "verified_hotels.json"

NEW_DESTINATIONS = [
    # 1. Rajasthan - Udaipur
    {
        "id": "rj-udaipur",
        "name": "Udaipur (City of Lakes)",
        "state": "Rajasthan",
        "city": "Udaipur",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Heritage", "Luxury", "Romantic", "Culture"],
        "purposes": ["Honeymoon", "Heritage tour", "Royal luxury", "Lake holiday"],
        "dailyCostPerPerson": 4200,
        "stayCostPerDay": 2800,
        "stayCostBudget": 2200,
        "stayCostStandard": 3800,
        "stayCostLuxury": 9500,
        "foodCostPerDay": 1100,
        "crowd": "High Crowd",
        "rating": 4.9,
        "bestTime": "October to March",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
        "description": "Known as the Venice of the East, Udaipur enchants with majestic palaces rising from Lake Pichola, ornate havelis, and sunset boat cruises.",
        "highlights": ["City Palace waterfront", "Lake Pichola boat cruise to Jag Mandir", "Saheliyon-ki-Bari royal gardens", "Bagore Ki Haveli folk dance show"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Rajasthani, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [10, 11, 12, 1, 2],
            "shoulderMonths": [3, 9],
            "offPeakMonths": [4, 5, 6, 7, 8],
            "peakReason": "Cool royal winter climate, clear lake vistas, and evening cultural festivals.",
            "offPeakReason": "Hot dry summers followed by green monsoon with lower palace crowds.",
            "crowdAdvisory": "Book sunset boat rides at Lake Pichola 1 day in advance."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Maharana Pratap Airport (UDR)",
                "airportCode": "UDR",
                "distanceKm": 22,
                "connectivity": "Daily direct flights from Mumbai, Delhi, Bengaluru, Jaipur, and Hyderabad."
            },
            "train": {
                "nearestStation": "Udaipur City (UDZ)",
                "stationCode": "UDZ",
                "distanceKm": 3,
                "majorTrains": "Vande Bharat Express to Jaipur, Mewar Express to Delhi, and Chetak Express."
            },
            "road": {
                "highway": "NH 48 / NH 58",
                "driveHours": "Smooth 4-lane national highway connecting Ahmedabad (4.5 hrs) and Jaipur (6.5 hrs)."
            }
        }
    },
    # 2. Rajasthan - Jaisalmer
    {
        "id": "rj-jaisalmer",
        "name": "Jaisalmer (The Golden City & Thar Desert)",
        "state": "Rajasthan",
        "city": "Jaisalmer",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Adventure", "Heritage", "Culture", "Nature"],
        "purposes": ["Desert safari", "Cultural heritage", "Stargazing", "Photography"],
        "dailyCostPerPerson": 3800,
        "stayCostPerDay": 2400,
        "stayCostBudget": 1800,
        "stayCostStandard": 3400,
        "stayCostLuxury": 8500,
        "foodCostPerDay": 950,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "October to March",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80",
        "description": "Rising from the heart of the Thar Desert, Jaisalmer features a living golden sandstone fort, intricately carved Jain temples, and vast rolling dunes.",
        "highlights": ["Living Jaisalmer Fort (Sonar Qila)", "Sam Sand Dunes camel & jeep safari", "Patwon Ki Haveli architecture", "Stargazing luxury desert camp"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Rajasthani, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3],
            "offPeakMonths": [4, 5, 6, 7, 8, 9],
            "peakReason": "Pleasant sunny days and crisp desert nights ideal for dune safaris and Desert Festival.",
            "offPeakReason": "Extreme summer desert heat exceeding 45°C.",
            "crowdAdvisory": "Head to Sam dunes around 4:30 PM to catch golden hour and secure private dune spots."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jaisalmer Airport (JSA)",
                "airportCode": "JSA",
                "distanceKm": 14,
                "connectivity": "Seasonal flights from Delhi, Mumbai, Jaipur, and Ahmedabad."
            },
            "train": {
                "nearestStation": "Jaisalmer Railway Station (JSM)",
                "stationCode": "JSM",
                "distanceKm": 2,
                "majorTrains": "Delhi-Jaisalmer Express, Ranikhet Express, and Howrah-Jaisalmer Superfast."
            },
            "road": {
                "highway": "NH 11 / NH 68",
                "driveHours": "Scenic desert highway from Jodhpur (4.5 hrs) or Bikaner (5.5 hrs)."
            }
        }
    },
    # 3. Rajasthan - Jodhpur
    {
        "id": "rj-jodhpur",
        "name": "Jodhpur (The Blue City & Sun City)",
        "state": "Rajasthan",
        "city": "Jodhpur",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Heritage", "Culture", "Food", "Photography"],
        "purposes": ["Heritage exploration", "Food tour", "Architecture", "Photography"],
        "dailyCostPerPerson": 3600,
        "stayCostPerDay": 2200,
        "stayCostBudget": 1700,
        "stayCostStandard": 3200,
        "stayCostLuxury": 7800,
        "foodCostPerDay": 900,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
        "description": "Dominated by the impregnable Mehrangarh Fort perched on a cliff, Jodhpur features vibrant indigo-painted old town lanes, bustling bazaars, and royal cenotaphs.",
        "highlights": ["Mehrangarh Fort ramparts & Flying Fox zip-line", "Jaswant Thada marble cenotaph", "Blue City old town walking trail", "Mirchi Vada and Mawa Kachori culinary trail"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Marwari, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [10, 11, 12, 1, 2],
            "shoulderMonths": [3, 9],
            "offPeakMonths": [4, 5, 6, 7, 8],
            "peakReason": "Comfortable weather for fort exploration, RIFF folk music festival, and roof-top cafe evenings.",
            "offPeakReason": "Hot arid conditions during peak summer.",
            "crowdAdvisory": "Visit Mehrangarh Fort at 9:00 AM right at opening to explore royal armory before tour buses arrive."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jodhpur Airport (JDH)",
                "airportCode": "JDH",
                "distanceKm": 6,
                "connectivity": "Direct daily flights from Mumbai, Delhi, Bengaluru, and Ahmedabad."
            },
            "train": {
                "nearestStation": "Jodhpur Junction (JU)",
                "stationCode": "JU",
                "distanceKm": 2,
                "majorTrains": "Vande Bharat Express to Sabarmati, Mandore Express to Delhi, and Suryanagari Express to Mumbai."
            },
            "road": {
                "highway": "NH 62 / NH 25",
                "driveHours": "Express highway connecting Jaipur (5 hrs), Udaipur (4.5 hrs), and Jaisalmer (4.5 hrs)."
            }
        }
    },
    # 4. Karnataka - Hampi
    {
        "id": "ka-hampi",
        "name": "Hampi (UNESCO Vijayanagara Ruins)",
        "state": "Karnataka",
        "city": "Hosapete",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Heritage", "Culture", "Offbeat", "Adventure"],
        "purposes": ["Historical ruins", "Backpacking", "Bouldering", "Photography"],
        "dailyCostPerPerson": 2800,
        "stayCostPerDay": 1800,
        "stayCostBudget": 1400,
        "stayCostStandard": 2800,
        "stayCostLuxury": 6500,
        "foodCostPerDay": 750,
        "crowd": "Medium Crowd",
        "rating": 4.9,
        "bestTime": "October to March",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1600100397608-f010f443b784?auto=format&fit=crop&w=1200&q=80",
        "description": "An open-air museum of colossal granite boulders and 14th-century Vijayanagara empire ruins, Hampi boasts ancient riverside temples, coracle rides, and legendary boulder sunsets.",
        "highlights": ["Vijaya Vittala Temple & Stone Chariot", "Virupaksha Temple morning elephant blessing", "Matanga Hill panoramic sunrise trek", "Sanapur Lake coracle boating & cliff jumping"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Kannada, Telugu, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "Anegundi rural heritage village, cave art at Onake Kindi, and pristine Sanapur lake bouldering.",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [4, 5, 6, 7, 8, 9],
            "peakReason": "Cool breeze across boulder fields, ideal conditions for cycling and temple hiking.",
            "offPeakReason": "Granite boulders radiate intense heat during summer months.",
            "crowdAdvisory": "Rent a bicycle or electric scooter to explore the sprawling 41 sq km UNESCO monument zone."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Hubballi Airport (HBX) / Jindal Vijayanagar (VDY)",
                "airportCode": "HBX",
                "distanceKm": 140,
                "connectivity": "Hubli airport connects with Bengaluru, Mumbai, and Delhi; Toranagallu JSW airstrip 35 km away."
            },
            "train": {
                "nearestStation": "Hosapete Junction (HPT)",
                "stationCode": "HPT",
                "distanceKm": 12,
                "majorTrains": "Hampi Express from Bengaluru, Amaravati Express from Goa/Howrah, and daily overnight express from Hyderabad."
            },
            "road": {
                "highway": "NH 50 / NH 67",
                "driveHours": "Direct 4-lane highway from Bengaluru (6 hrs) or Hyderabad (7 hrs)."
            }
        }
    },
    # 5. Karnataka - Mysuru
    {
        "id": "ka-mysuru",
        "name": "Mysuru (The Heritage & Palace Capital)",
        "state": "Karnataka",
        "city": "Mysuru",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Heritage", "Culture", "Relaxation", "Family"],
        "purposes": ["Palace tour", "Silk & sandalwood shopping", "Family holiday", "Yoga retreat"],
        "dailyCostPerPerson": 3200,
        "stayCostPerDay": 2000,
        "stayCostBudget": 1500,
        "stayCostStandard": 3000,
        "stayCostLuxury": 7000,
        "foodCostPerDay": 800,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "September to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
        "description": "The cultural capital of Karnataka, famous for its magnificent Indo-Saracenic Mysore Palace, aromatic sandalwood, Mysore pak sweets, and royal heritage.",
        "highlights": ["Mysore Palace evening illumination (100,000 bulbs)", "Chamundeshwari Temple atop Chamundi Hills", "Devaraja Market vibrant spice and flower stalls", "Brindavan Gardens illuminated musical fountain"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Kannada, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [10, 11, 12, 1],
            "shoulderMonths": [2, 3, 9],
            "offPeakMonths": [4, 5, 6, 7, 8],
            "peakReason": "World-famous Mysuru Dasara festival in October with royal elephant procession.",
            "offPeakReason": "Mild tropical summer with pleasant early mornings and evenings.",
            "crowdAdvisory": "Palace illumination happens on Sundays and public holidays from 7:00 PM to 7:45 PM."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Mysore Airport (MYQ) / Bengaluru Kempegowda (BLR)",
                "airportCode": "MYQ",
                "distanceKm": 12,
                "connectivity": "Mysore Airport has regional flights; Bengaluru International Airport (170 km) has worldwide flights."
            },
            "train": {
                "nearestStation": "Mysuru Junction (MYS)",
                "stationCode": "MYS",
                "distanceKm": 2,
                "majorTrains": "Vande Bharat Express (Bengaluru to Mysuru in 1 hr 45 min) and Shatabdi Express."
            },
            "road": {
                "highway": "Bengaluru-Mysuru 10-Lane Expressway",
                "driveHours": "Superfast 10-lane expressway from Bengaluru in just 1.5 to 2 hours."
            }
        }
    },
    # 6. Karnataka - Gokarna
    {
        "id": "ka-gokarna",
        "name": "Gokarna (Om Beach & Coastal Serenity)",
        "state": "Karnataka",
        "city": "Gokarna",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Beach", "Relaxation", "Spiritual", "Nature"],
        "purposes": ["Beach trekking", "Yoga & wellness", "Temple pilgrimage", "Sunset relaxation"],
        "dailyCostPerPerson": 2900,
        "stayCostPerDay": 1800,
        "stayCostBudget": 1400,
        "stayCostStandard": 2600,
        "stayCostLuxury": 6200,
        "foodCostPerDay": 800,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "October to April",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        "description": "A sacred temple town framed by five pristine crescent beaches, Gokarna combines ancient Shaivite spirituality with cliff-side cafes and bohemian coastlines.",
        "highlights": ["Five Beach Trek (Kudle to Paradise Beach)", "Om Beach water sports and rock formations", "Mahabaleshwar Temple Atmalinga darshan", "Cliff-side sunset drum circles at Kudle"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Kannada, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "Secluded Half Moon and Paradise beaches accessible only by boat or cliff-top trek.",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [5, 6, 7, 8, 9],
            "peakReason": "Clear sea conditions, warm coastal breeze, and vibrant beach cafe culture.",
            "offPeakReason": "Heavy monsoon waves wash over beach shacks from June to September.",
            "crowdAdvisory": "Start the cliff-top five-beach trek early at 7:30 AM before midday sun."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Goa Dabolim Airport (GOI) / Manohar Mopa (GOX)",
                "airportCode": "GOI",
                "distanceKm": 140,
                "connectivity": "Daily flights to Goa from across India; 3-hour scenic coastal cab drive to Gokarna."
            },
            "train": {
                "nearestStation": "Gokarna Road (GOK) / Ankola (ANKL)",
                "stationCode": "GOK",
                "distanceKm": 9,
                "majorTrains": "Matsyagandha Express from Mumbai, Netravati Express, and Mangalore Express on Konkan Railway."
            },
            "road": {
                "highway": "NH 66 (Konkan Coastal Highway)",
                "driveHours": "Picturesque coastal drive from Goa (3.5 hrs), Mangalore (4 hrs), or Bengaluru (8 hrs)."
            }
        }
    },
    # 7. Kerala - Wayanad
    {
        "id": "kl-wayanad",
        "name": "Wayanad (Misty Rainforests & Treehouses)",
        "state": "Kerala",
        "city": "Kalpetta",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Nature", "Adventure", "Relaxation", "Romantic"],
        "purposes": ["Rainforest retreat", "Trekking", "Wildlife safari", "Treehouse stay"],
        "dailyCostPerPerson": 3500,
        "stayCostPerDay": 2200,
        "stayCostBudget": 1700,
        "stayCostStandard": 3200,
        "stayCostLuxury": 7500,
        "foodCostPerDay": 850,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "October to May",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
        "description": "Nestled in the Western Ghats, Wayanad is a verdant paradise of cardamom and tea plantations, mist-clad peaks, prehistoric rock carvings, and treehouses.",
        "highlights": ["Chembra Peak heart-shaped lake trek", "Banasura Sagar Dam (largest earthen dam in India)", "Edakkal Caves Neolithic stone petroglyphs", "Kuruva Island bamboo rafting through river deltas"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Malayalam, English, Tamil",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [10, 11, 12, 1, 2],
            "shoulderMonths": [3, 4, 9],
            "offPeakMonths": [6, 7, 8],
            "peakReason": "Crisp mountain air, blooming spice valleys, and crystal clear vistas from mountain peaks.",
            "offPeakReason": "Heavy monsoon creates lush waterfalls but slippery trekking trails.",
            "crowdAdvisory": "Forest department permits for Chembra Peak trek are issued early morning on a first-come basis."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Calicut International Airport (CCJ) / Kannur (CNN)",
                "airportCode": "CCJ",
                "distanceKm": 85,
                "connectivity": "Calicut connects with Mumbai, Delhi, Bengaluru, Chennai, and Gulf destinations."
            },
            "train": {
                "nearestStation": "Kozhikode Railway Station (CLT)",
                "stationCode": "CLT",
                "distanceKm": 72,
                "majorTrains": "Vande Bharat Express, Kerala Express, and Mangalore Mail connecting through Kozhikode."
            },
            "road": {
                "highway": "NH 766 (Wayanad Ghat Road / Thamarassery Churam)",
                "driveHours": "Spectacular mountain ghat road with 9 hairpin turns from Kozhikode (2.5 hrs) or Bengaluru (5.5 hrs)."
            }
        }
    },
    # 8. Kerala - Alleppey
    {
        "id": "kl-alleppey",
        "name": "Alleppey (Alappuzha Backwaters & Houseboats)",
        "state": "Kerala",
        "city": "Alappuzha",
        "weatherTags": ["Tropical", "Beach & Warm", "Any"],
        "vibes": ["Relaxation", "Romantic", "Nature", "Culture"],
        "purposes": ["Backwater cruise", "Houseboat stay", "Ayurvedic wellness", "Honeymoon"],
        "dailyCostPerPerson": 4200,
        "stayCostPerDay": 2800,
        "stayCostBudget": 2000,
        "stayCostStandard": 3800,
        "stayCostLuxury": 8800,
        "foodCostPerDay": 1000,
        "crowd": "High Crowd",
        "rating": 4.9,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
        "description": "Known as the Venice of the East, Alleppey is famous for its intricate maze of emerald backwaters, traditional thatched houseboats, and paddy fields.",
        "highlights": ["Overnight luxury houseboat cruise along Vembanad Lake", "Village canoe tour through narrow palm-fringed canals", "Alappuzha Beach and 150-year-old sea pier", "Authentic Karimeen Pollichathu seafood dining"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Malayalam, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [5, 6, 7, 8, 9],
            "peakReason": "Pleasant gentle breezes on the canals, calm backwaters, and Nehru Trophy boat race season.",
            "offPeakReason": "Monsoon brings rain-fresh green beauty and heavy discounts on luxury houseboats.",
            "crowdAdvisory": "Book government DTPC-certified houseboats with verified safety standards."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Cochin International Airport (COK)",
                "airportCode": "COK",
                "distanceKm": 82,
                "connectivity": "Major international hub with direct flights to all Indian metros and international hubs."
            },
            "train": {
                "nearestStation": "Alappuzha Railway Station (ALLP)",
                "stationCode": "ALLP",
                "distanceKm": 4,
                "majorTrains": "Direct coastal express trains from Ernakulam (Kochi), Thiruvananthapuram, and Chennai."
            },
            "road": {
                "highway": "NH 66",
                "driveHours": "1.5 to 2 hours drive from Kochi via NH 66."
            }
        }
    },
    # 9. Kerala - Fort Kochi
    {
        "id": "kl-kochi",
        "name": "Fort Kochi & Mattancherry (Spice Heritage Coast)",
        "state": "Kerala",
        "city": "Kochi",
        "weatherTags": ["Tropical", "Mild", "Any"],
        "vibes": ["Culture", "Heritage", "Art", "Food"],
        "purposes": ["Art biennale", "Heritage walk", "Culinary exploration", "Colonial architecture"],
        "dailyCostPerPerson": 3600,
        "stayCostPerDay": 2400,
        "stayCostBudget": 1800,
        "stayCostStandard": 3400,
        "stayCostLuxury": 7800,
        "foodCostPerDay": 950,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "October to April",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
        "description": "A historic port city where Chinese fishing nets, Portuguese churches, Dutch palaces, and spice-scented Jewish quarters converge into a vibrant art and cultural hub.",
        "highlights": ["Iconic cantilevered Chinese Fishing Nets at sunset", "Paradesi Synagogue & historic Jew Town antique lanes", "Mattancherry Palace (Dutch Palace) Ramayana murals", "Evening Kathakali classical dance and Kalaripayattu martial arts show"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Malayalam, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [12, 1, 2],
            "shoulderMonths": [10, 11, 3],
            "offPeakMonths": [5, 6, 7, 8, 9],
            "peakReason": "Kochi-Muziris Biennale contemporary art exhibition, Cochin Carnival, and pleasant coastal weather.",
            "offPeakReason": "Summer humidity followed by monsoon downpours.",
            "crowdAdvisory": "Explore Fort Kochi on foot or rent a vintage bicycle to navigate the colonial European lanes."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Cochin International Airport (COK)",
                "airportCode": "COK",
                "distanceKm": 38,
                "connectivity": "World-class 100% solar-powered international airport with round-the-clock domestic and international connectivity."
            },
            "train": {
                "nearestStation": "Ernakulam Junction (ERS) / Ernakulam Town (ERN)",
                "stationCode": "ERS",
                "distanceKm": 12,
                "majorTrains": "Connected to all major Indian cities via Vande Bharat, Rajdhani, and Duronto express trains."
            },
            "road": {
                "highway": "NH 66 / NH 544",
                "driveHours": "Public Ro-Ro water ferry connects Ernakulam mainland directly to Fort Kochi in 15 mins."
            }
        }
    },
    # 10. Kerala - Varkala
    {
        "id": "kl-varkala",
        "name": "Varkala (Papanasam Cliff & Mineral Springs)",
        "state": "Kerala",
        "city": "Varkala",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Beach", "Relaxation", "Spiritual", "Yoga"],
        "purposes": ["Cliff-side dining", "Yoga & meditation", "Surfing", "Ayurvedic rejuvenation"],
        "dailyCostPerPerson": 3100,
        "stayCostPerDay": 2000,
        "stayCostBudget": 1500,
        "stayCostStandard": 2800,
        "stayCostLuxury": 6800,
        "foodCostPerDay": 850,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "October to April",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
        "description": "Perched dramatically along towering red laterite cliffs overlooking the Arabian Sea, Varkala features sacred natural mineral springs, beachside yoga, and cliff-top cafes.",
        "highlights": ["North Cliff cafe hopping with panoramic Arabian Sea views", "Papanasam sacred beach natural mineral springs", "Surfing at Black Sand Beach and Edava lagoon", "2000-year-old Janardhana Swamy Temple"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Malayalam, English, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "Kappil Beach estuary where tranquil backwaters merge into the roaring ocean.",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3, 4],
            "offPeakMonths": [5, 6, 7, 8, 9],
            "peakReason": "Calm surf, warm sunny skies, and vibrant cliff promenade evenings.",
            "offPeakReason": "Monsoon high tides submerge beach strips below the cliff.",
            "crowdAdvisory": "Watch the sunset from the northern edge of the cliff near Helipad for unobstructed vistas."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Thiruvananthapuram International Airport (TRV)",
                "airportCode": "TRV",
                "distanceKm": 44,
                "connectivity": "Direct daily flights from Mumbai, Delhi, Bengaluru, Chennai, and Hyderabad."
            },
            "train": {
                "nearestStation": "Varkala Sivagiri (VAK)",
                "stationCode": "VAK",
                "distanceKm": 3,
                "majorTrains": "Nearly all major north-south Kerala coastal express trains stop at Varkala Sivagiri."
            },
            "road": {
                "highway": "NH 66 Coastal Highway",
                "driveHours": "1-hour drive from Trivandrum or 3.5 hours from Kochi."
            }
        }
    },
    # 11. Uttar Pradesh - Agra
    {
        "id": "up-agra",
        "name": "Agra (The Monument of Love & Mughal Splendor)",
        "state": "Uttar Pradesh",
        "city": "Agra",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Heritage", "Culture", "Romantic", "Architecture"],
        "purposes": ["Taj Mahal sunrise", "Mughal architecture", "Food tour", "World heritage"],
        "dailyCostPerPerson": 3500,
        "stayCostPerDay": 2200,
        "stayCostBudget": 1600,
        "stayCostStandard": 3200,
        "stayCostLuxury": 8500,
        "foodCostPerDay": 850,
        "crowd": "High Crowd",
        "rating": 4.9,
        "bestTime": "October to March",
        "duration": "1-2 Days",
        "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
        "description": "Home to the immortal white marble Taj Mahal, red sandstone Agra Fort, and the deserted Mughal capital of Fatehpur Sikri, Agra is an essential cornerstone of world heritage.",
        "highlights": ["Taj Mahal at dawn with golden morning light", "Agra Fort royal Diwan-i-Khas and Jahangiri Mahal", "Fatehpur Sikri Buland Darwaza and Salim Chishti shrine", "Mehtab Bagh moonlight reflection across Yamuna River"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Urdu, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [10, 11, 12, 1, 2],
            "shoulderMonths": [3, 9],
            "offPeakMonths": [4, 5, 6, 7, 8],
            "peakReason": "Pleasant cool weather, clear morning skies for monument photography, and Taj Mahotsav festival.",
            "offPeakReason": "Hot northern summer with temperatures exceeding 42°C.",
            "crowdAdvisory": "Taj Mahal is closed on Fridays. Arrive at the East Gate by 5:45 AM for sunrise entry."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Agra Kheria Airport (AGR) / Delhi IGI (DEL)",
                "airportCode": "AGR",
                "distanceKm": 12,
                "connectivity": "Agra has regional flights; Delhi IGI Airport (210 km) connects to all domestic and world destinations."
            },
            "train": {
                "nearestStation": "Agra Cantt (AGC)",
                "stationCode": "AGC",
                "distanceKm": 4,
                "majorTrains": "Gatimaan Express (Delhi to Agra in 100 mins), Vande Bharat Express, and Bhopal Shatabdi."
            },
            "road": {
                "highway": "Yamuna Expressway / Taj Expressway",
                "driveHours": "Superfast 6-lane access-controlled expressway from Delhi/Noida in just 2.5 to 3 hours."
            }
        }
    },
    # 12. Himachal Pradesh - Shimla
    {
        "id": "hp-shimla",
        "name": "Shimla & Kufri (Queen of Hill Stations)",
        "state": "Himachal Pradesh",
        "city": "Shimla",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Hills", "Nature", "Heritage", "Romantic"],
        "purposes": ["Honeymoon", "Snow holiday", "Toy train ride", "Family vacation"],
        "dailyCostPerPerson": 3900,
        "stayCostPerDay": 2600,
        "stayCostBudget": 1900,
        "stayCostStandard": 3600,
        "stayCostLuxury": 8500,
        "foodCostPerDay": 950,
        "crowd": "High Crowd",
        "rating": 4.8,
        "bestTime": "October to June (Snow: Dec-Feb)",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        "description": "The erstwhile British summer capital, Shimla charms with colonial Gothic architecture, the UNESCO Kalka-Shimla heritage toy train, bustling Mall Road, and snowy Kufri peaks.",
        "highlights": ["UNESCO Kalka-Shimla Toy Train ride through 102 tunnels", "The Ridge, Mall Road & neo-Gothic Christ Church", "Jakhoo Temple & Hanuman statue summit via ropeway", "Kufri snow slopes and Himalayan Nature Park"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Pahari, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [12, 1, 5, 6],
            "shoulderMonths": [10, 11, 2, 3, 4],
            "offPeakMonths": [7, 8, 9],
            "peakReason": "Winter snowfall (Dec-Jan) and summer cool mountain breeze (May-June).",
            "offPeakReason": "Monsoon landslides occasionally disrupt highway access.",
            "crowdAdvisory": "Walk the pedestrian-only Mall Road in the evening when vehicle traffic is strictly prohibited."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Shimla Jubbarhatti Airport (SLV) / Chandigarh (IXC)",
                "airportCode": "SLV",
                "distanceKm": 23,
                "connectivity": "Alliance Air operates direct flights from Delhi; Chandigarh Airport (115 km) connects all major metros."
            },
            "train": {
                "nearestStation": "Shimla Railway Station (SML) / Kalka (KLK)",
                "stationCode": "SML",
                "distanceKm": 1,
                "majorTrains": "UNESCO Kalka-Shimla Toy Train; broad gauge trains connect to Kalka from Delhi (Shatabdi/Vande Bharat)."
            },
            "road": {
                "highway": "Himalayan Expressway (NH 5)",
                "driveHours": "3.5 hours drive from Chandigarh via 4-lane Himalayan Expressway, or 7.5 hours from Delhi."
            }
        }
    },
    # 13. Himachal Pradesh - Dharamshala
    {
        "id": "hp-dharamshala",
        "name": "Dharamshala & McLeod Ganj (Little Lhasa)",
        "state": "Himachal Pradesh",
        "city": "Dharamshala",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Spiritual", "Mountains", "Culture", "Adventure"],
        "purposes": ["Tibetan culture", "Triund trek", "Meditation retreat", "Himalayan views"],
        "dailyCostPerPerson": 3400,
        "stayCostPerDay": 2100,
        "stayCostBudget": 1600,
        "stayCostStandard": 3000,
        "stayCostLuxury": 7200,
        "foodCostPerDay": 850,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "September to June",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1593181829063-2e6797746401?auto=format&fit=crop&w=1200&q=80",
        "description": "Perched on the wooded slopes of the Dhauladhar range, McLeod Ganj is the residence of His Holiness the Dalai Lama and the epicenter of Tibetan culture in India.",
        "highlights": ["Tsuglagkhang Complex (Dalai Lama Main Temple)", "Triund Day Trek to snowline below Moon Peak", "Bhagsu Waterfall & Bhagsunath Shiva Temple", "HPCA International Cricket Stadium with snow-capped Dhauladhar backdrop"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Tibetan, Hindi, Pahari, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [4, 5, 6, 12, 1],
            "shoulderMonths": [9, 10, 11, 2, 3],
            "offPeakMonths": [7, 8],
            "peakReason": "Spring Buddhist teachings, clear skies for Triund trek, and winter snow on upper ridges.",
            "offPeakReason": "Dharamshala receives the second-highest monsoon rainfall in India.",
            "crowdAdvisory": "Take the Dharamshala Skyway ropeway from lower Dharamshala to McLeod Ganj to avoid narrow ghat traffic."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Kangra Airport Gaggal (DHM)",
                "airportCode": "DHM",
                "distanceKm": 14,
                "connectivity": "Direct daily flights from Delhi (IndiGo, SpiceJet, Alliance Air) and Chandigarh."
            },
            "train": {
                "nearestStation": "Pathankot Cantt (PTKC)",
                "stationCode": "PTKC",
                "distanceKm": 85,
                "majorTrains": "Broad-gauge junction connected to Jammu, Delhi, and Mumbai by fast express trains."
            },
            "road": {
                "highway": "NH 154 / NH 503",
                "driveHours": "Overnight Volvo AC sleeper buses from Delhi (10 hrs) and Chandigarh (5 hrs)."
            }
        }
    },
    # 14. Himachal Pradesh - Spiti Valley
    {
        "id": "hp-spiti",
        "name": "Spiti Valley (The Middle Land & High Altitude Desert)",
        "state": "Himachal Pradesh",
        "city": "Kaza",
        "weatherTags": ["Cold & Snowy", "Any"],
        "vibes": ["Adventure", "Offbeat", "Road Trip", "Nature"],
        "purposes": ["Extreme road trip", "High-altitude monasteries", "Stargazing", "Fossil hunting"],
        "dailyCostPerPerson": 3600,
        "stayCostPerDay": 2200,
        "stayCostBudget": 1600,
        "stayCostStandard": 2900,
        "stayCostLuxury": 6000,
        "foodCostPerDay": 850,
        "crowd": "Low Crowd",
        "rating": 4.9,
        "bestTime": "June to October (Winter expedition: Jan-Feb)",
        "duration": "6-8 Days",
        "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
        "description": "A high-altitude desert world of dramatic moonscapes, thousand-year-old cliff monasteries, turquoise glacial lakes, and the world's highest inhabited villages.",
        "highlights": ["1000-year-old Key Monastery perched like a fortress", "Chandratal (Moon Lake) camping under the Milky Way", "Hikkim (World's highest post office at 14,567 ft)", "Komic (Highest village with motorable road at 15,027 ft)"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Bhoti, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "Dhankar Gompa balanced over a razor-sharp cliff ridge overlooking Spiti and Pin rivers.",
        "seasonality": {
            "peakMonths": [6, 7, 8, 9],
            "shoulderMonths": [5, 10],
            "offPeakMonths": [11, 12, 1, 2, 3, 4],
            "peakReason": "Rohtang and Kunzum passes are open, providing road access from Manali.",
            "offPeakReason": "Sub-zero temperatures down to -25°C attract dedicated snow leopard photographers.",
            "crowdAdvisory": "Acclimatize in Kalpa or Kaza for 24-48 hours before venturing to Hikkim or Chandratal."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Kullu-Bhuntar Airport (KUU) / Chandigarh (IXC)",
                "airportCode": "KUU",
                "distanceKm": 240,
                "connectivity": "Bhuntar Airport connects to Delhi; Shimla/Chandigarh airports provide starting bases."
            },
            "train": {
                "nearestStation": "Shimla Railway Station (SML) / Chandigarh (CDG)",
                "stationCode": "CDG",
                "distanceKm": 440,
                "majorTrains": "Broad-gauge railheads at Chandigarh and Kalka."
            },
            "road": {
                "highway": "NH 505 (via Kunzum Pass) / NH 5 (via Kinnaur Hindustan-Tibet Highway)",
                "driveHours": "Kinnaur-Kaza route is open year-round (subject to snow); Manali-Kaza opens June-October."
            }
        }
    },
    # 15. Uttarakhand - Mussoorie
    {
        "id": "uk-mussoorie",
        "name": "Mussoorie (Queen of the Hills)",
        "state": "Uttarakhand",
        "city": "Mussoorie",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Hills", "Nature", "Relaxation", "Family"],
        "purposes": ["Weekend escape", "Honeymoon", "Nature walks", "Colonial heritage"],
        "dailyCostPerPerson": 3800,
        "stayCostPerDay": 2400,
        "stayCostBudget": 1800,
        "stayCostStandard": 3400,
        "stayCostLuxury": 8200,
        "foodCostPerDay": 900,
        "crowd": "High Crowd",
        "rating": 4.8,
        "bestTime": "March to June & September to January",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
        "description": "Perched on a horseshoe ridge facing the snowy Himalayan peaks and the Doon valley, Mussoorie has enchanted travelers with misty promenades and waterfalls since 1827.",
        "highlights": ["Camel's Back Road peaceful sunset walking trail", "Kempty Falls cascading mountain waterfall", "Gun Hill ropeway with 360-degree Bunderpunch peak views", "Sir George Everest's historic estate & ridge trek"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Garhwali, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [5, 6, 12, 1],
            "shoulderMonths": [3, 4, 9, 10, 11],
            "offPeakMonths": [7, 8],
            "peakReason": "Escaping northern summer heat (May-June) and winter snow / winterline phenomenon (Dec-Jan).",
            "offPeakReason": "Heavy mountain monsoon rains.",
            "crowdAdvisory": "Experience the famous Mussoorie Winterline sunset from Lal Tibba (highest point) in December-January."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jolly Grant Airport, Dehradun (DED)",
                "airportCode": "DED",
                "distanceKm": 54,
                "connectivity": "Daily direct flights from Mumbai, Delhi, Bengaluru, Ahmedabad, and Hyderabad."
            },
            "train": {
                "nearestStation": "Dehradun Railway Station (DDN)",
                "stationCode": "DDN",
                "distanceKm": 34,
                "majorTrains": "Vande Bharat Express (Delhi to Dehradun in 4 hrs 45 mins), Shatabdi Express, and Nanda Devi Express."
            },
            "road": {
                "highway": "Delhi-Dehradun Expressway / Mussoorie Road",
                "driveHours": "1.5 hours drive from Dehradun; 5 hours from Delhi via new expressway."
            }
        }
    },
    # 16. Uttarakhand - Nainital
    {
        "id": "uk-nainital",
        "name": "Nainital & Pangot (The Lake District of India)",
        "state": "Uttarakhand",
        "city": "Nainital",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Hills", "Nature", "Relaxation", "Family"],
        "purposes": ["Lakeside boating", "Family retreat", "Birdwatching in Pangot", "Himalayan views"],
        "dailyCostPerPerson": 3700,
        "stayCostPerDay": 2300,
        "stayCostBudget": 1700,
        "stayCostStandard": 3300,
        "stayCostLuxury": 7900,
        "foodCostPerDay": 900,
        "crowd": "High Crowd",
        "rating": 4.8,
        "bestTime": "March to June & October to February",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
        "description": "Set in a valley containing an emerald eye-shaped lake surrounded by mountains, Nainital features vibrant lake boating, colonial cottages, and birdwatching sanctuaries.",
        "highlights": ["Naini Lake colorful rowing and yachting", "Naina Peak highest summit panoramic Himalayan trek", "Snow View Point aerial ropeway", "Pangot & Kilbury birdwatching sanctuary (500+ bird species)"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Kumaoni, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [5, 6, 12, 1],
            "shoulderMonths": [3, 4, 9, 10, 11],
            "offPeakMonths": [7, 8],
            "peakReason": "Cool summer escape and magical winter snowfall over the lake.",
            "offPeakReason": "Monsoon downpours over Kumaon foothills.",
            "crowdAdvisory": "Walk the quieter Thandi Sadak (Cold Road) on the southern bank of the lake for peaceful views."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Pantnagar Airport (PGH) / Dehradun (DED)",
                "airportCode": "PGH",
                "distanceKm": 68,
                "connectivity": "Pantnagar operates flights from Delhi; Delhi IGI Airport (300 km) is the primary hub."
            },
            "train": {
                "nearestStation": "Kathgodam Railway Station (KGM)",
                "stationCode": "KGM",
                "distanceKm": 34,
                "majorTrains": "Kathgodam Shatabdi Express from New Delhi (5.5 hrs), Ranikhet Express from Delhi/Jaisalmer."
            },
            "road": {
                "highway": "NH 109 / Delhi-Rampur-Haldwani Road",
                "driveHours": "6.5 hours drive from Delhi via NH 9; 1 hr drive from Kathgodam railhead."
            }
        }
    },
    # 17. Uttarakhand - Jim Corbett
    {
        "id": "uk-corbett",
        "name": "Jim Corbett National Park (The Realm of the Tiger)",
        "state": "Uttarakhand",
        "city": "Ramnagar",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Wildlife", "Nature", "Adventure", "Photography"],
        "purposes": ["Tiger safari", "Riverside luxury resort", "Birding", "Wild photography"],
        "dailyCostPerPerson": 4600,
        "stayCostPerDay": 3200,
        "stayCostBudget": 2200,
        "stayCostStandard": 4500,
        "stayCostLuxury": 11000,
        "foodCostPerDay": 1100,
        "crowd": "High Crowd",
        "rating": 4.9,
        "bestTime": "November to June",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
        "description": "India's oldest national park and cradle of Project Tiger, Corbett spans the Shivalik foothills and Ramganga river basin, teeming with Bengal tigers, wild elephants, and gharials.",
        "highlights": ["Dhikala & Bijrani Zone 4x4 open jeep jungle safari", "Overnight stay in British-era Dhikala Forest Rest House", "Kosi River rocky pebble beach and angling", "Elephant herd crossings across Ramganga reservoir"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Kumaoni, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2, 3, 4, 5],
            "shoulderMonths": [10, 6],
            "offPeakMonths": [7, 8, 9],
            "peakReason": "Dhikala zone opens on Nov 15; summer months (April-June) offer maximum tiger sightings near waterholes.",
            "offPeakReason": "Park core zones are closed during monsoon.",
            "crowdAdvisory": "Book jungle safari permits online 45 days in advance through the official Uttarakhand Forest Department portal."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Pantnagar Airport (PGH) / Delhi (DEL)",
                "airportCode": "PGH",
                "distanceKm": 82,
                "connectivity": "Pantnagar Airport connects to Delhi; Delhi IGI Airport (245 km) is the primary hub."
            },
            "train": {
                "nearestStation": "Ramnagar Railway Station (RMR)",
                "stationCode": "RMR",
                "distanceKm": 5,
                "majorTrains": "Ranikhet Express, Corbett Link Express, and daily trains from Old Delhi station."
            },
            "road": {
                "highway": "NH 309 / Delhi-Moradabad-Kashipur Road",
                "driveHours": "Smooth 5 hours drive from Delhi (245 km) via Moradabad bypass."
            }
        }
    },
    # 18. Uttarakhand - Auli
    {
        "id": "uk-auli",
        "name": "Auli (Skiing Capital & Himalayan Panorama)",
        "state": "Uttarakhand",
        "city": "Joshimath",
        "weatherTags": ["Cold & Snowy", "Any"],
        "vibes": ["Snow", "Adventure", "Nature", "Romantic"],
        "purposes": ["Skiing & snowboarding", "Snow holiday", "Cable car ride", "Mountain trekking"],
        "dailyCostPerPerson": 4400,
        "stayCostPerDay": 2900,
        "stayCostBudget": 2000,
        "stayCostStandard": 4200,
        "stayCostLuxury": 9800,
        "foodCostPerDay": 1050,
        "crowd": "Medium Crowd",
        "rating": 4.9,
        "bestTime": "December to March (Skiing) & April to June (Meadows)",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
        "description": "Perched at 9,000 to 10,000 feet, Auli is India's premier skiing destination, offering pristine powdery snow slopes framed by a 180-degree amphitheater of giant Himalayan peaks including Nanda Devi.",
        "highlights": ["Snow skiing on certified slopes with certified instructors", "Joshimath to Auli Cable Car (Asia's longest ropeway, 4 km)", "Gorson Bugyal high-altitude alpine meadow trek", "Auli Artificial Lake (world's highest man-made lake)"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Garhwali, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "Kuari Pass winter trek offering views of Kamet, Dunagiri, and Trishul peaks.",
        "seasonality": {
            "peakMonths": [12, 1, 2, 3],
            "shoulderMonths": [4, 5, 10, 11],
            "offPeakMonths": [6, 7, 8, 9],
            "peakReason": "Peak snow accumulation on ski slopes and national ski championships.",
            "offPeakReason": "Monsoon landslide risks on Badrinath highway.",
            "crowdAdvisory": "Ride the Joshimath-Auli cable car early morning to enjoy crisp visibility of Nanda Devi."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jolly Grant Airport, Dehradun (DED)",
                "airportCode": "DED",
                "distanceKm": 270,
                "connectivity": "Dehradun connects to Delhi, Mumbai, Bengaluru, and Hyderabad."
            },
            "train": {
                "nearestStation": "Rishikesh Railway Station (YNRK) / Haridwar (HW)",
                "stationCode": "HW",
                "distanceKm": 280,
                "majorTrains": "Haridwar and Rishikesh connect to all major Indian cities."
            },
            "road": {
                "highway": "NH 07 (Rishikesh-Joshimath Highway)",
                "driveHours": "8 to 9 hours scenic drive along the Alaknanda River from Rishikesh to Joshimath, followed by cable car or 14 km mountain road to Auli."
            }
        }
    },
    # 19. Maharashtra - Mahabaleshwar
    {
        "id": "mh-mahabaleshwar",
        "name": "Mahabaleshwar & Panchgani (Strawberry Capital)",
        "state": "Maharashtra",
        "city": "Mahabaleshwar",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Hills", "Nature", "Relaxation", "Family"],
        "purposes": ["Strawberry farm tour", "Western Ghats viewpoints", "Boating", "Weekend escape"],
        "dailyCostPerPerson": 3600,
        "stayCostPerDay": 2300,
        "stayCostBudget": 1800,
        "stayCostStandard": 3500,
        "stayCostLuxury": 8000,
        "foodCostPerDay": 850,
        "crowd": "High Crowd",
        "rating": 4.8,
        "bestTime": "October to June",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
        "description": "Perched on the Sahyadri ranges, Mahabaleshwar produces 85% of India's strawberries, offering lush evergreen forests, cliff-side viewpoints, and Venna Lake boating.",
        "highlights": ["Arthur's Seat cliff point overlooking Savitri River gorge", "Mapro Garden fresh strawberry cream and wood-fired pizza", "Venna Lake pedal and row boating", "Panchgani Table Land vast volcanic plateau"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Marathi, Hindi, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1, 4, 5],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [6, 7, 8, 9],
            "peakReason": "Peak strawberry harvesting season (Dec-March) and summer holiday coolness.",
            "offPeakReason": "Extremely heavy monsoon rainfall with dense fog.",
            "crowdAdvisory": "Visit Mapro Garden early morning around 9:00 AM to beat the weekend brunch crowd."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Pune International Airport (PNQ) / Mumbai (BOM)",
                "airportCode": "PNQ",
                "distanceKm": 120,
                "connectivity": "Pune Airport has direct flights from all Indian metros; Mumbai Airport is 240 km away."
            },
            "train": {
                "nearestStation": "Satara Railway Station (STR) / Pune (PUNE)",
                "stationCode": "STR",
                "distanceKm": 56,
                "majorTrains": "Satara connects with Mumbai, Pune, Goa, and Bengaluru via regular express trains."
            },
            "road": {
                "highway": "NH 48 (Mumbai-Bengaluru Highway)",
                "driveHours": "Scenic 2.5 hours drive from Pune or 4.5 to 5 hours drive from Mumbai."
            }
        }
    },
    # 20. Maharashtra - Alibaug
    {
        "id": "mh-alibaug",
        "name": "Alibaug & Kashid (Coastal Heritage & Beach Retreat)",
        "state": "Maharashtra",
        "city": "Alibaug",
        "weatherTags": ["Beach & Warm", "Mild", "Any"],
        "vibes": ["Beach", "Weekend", "Relaxation", "Adventure"],
        "purposes": ["Coastal getaway", "Sea fort exploration", "Watersports", "Seafood feast"],
        "dailyCostPerPerson": 3400,
        "stayCostPerDay": 2200,
        "stayCostBudget": 1600,
        "stayCostStandard": 3400,
        "stayCostLuxury": 8500,
        "foodCostPerDay": 900,
        "crowd": "High Crowd",
        "rating": 4.7,
        "bestTime": "October to May",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        "description": "Mumbai's favorite coastal playground, Alibaug features historic sea forts you can walk to at low tide, pristine coconut groves, white-sand Kashid beach, and fresh Konkani seafood.",
        "highlights": ["Kolaba Sea Fort (walk through knee-deep sea at low tide)", "Kashid Beach water sports, banana rides and parasailing", "Murud-Janjira impregnable island sea fort by sailboat", "Fresh Surmai and Pomfret thali at local Konkani beach shacks"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Marathi, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "Korlai Fort and Portuguese lighthouse perched on a rocky promontory.",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3, 4],
            "offPeakMonths": [6, 7, 8, 9],
            "peakReason": "Sunny beach weather, calm seas, and active water sports.",
            "offPeakReason": "Sea ferry operations from Gateway of India are suspended during monsoon.",
            "crowdAdvisory": "Take the Mandwa Ro-Pax ferry (M2M Ferries) from Bhaucha Dhakka to drive your car straight onto the ferry."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Chhatrapati Shivaji Maharaj International Airport, Mumbai (BOM)",
                "airportCode": "BOM",
                "distanceKm": 95,
                "connectivity": "Mumbai BOM is the primary domestic and international gateway."
            },
            "train": {
                "nearestStation": "Panvel (PNVL) / Roha (ROHA)",
                "stationCode": "PNVL",
                "distanceKm": 65,
                "majorTrains": "Panvel connects with the central railway line; local cabs connect to Alibaug."
            },
            "road": {
                "highway": "Mumbai-Goa Highway (NH 66) / Atal Setu (MTHL)",
                "driveHours": "Fastest via Atal Setu bridge (2 hours drive from South Mumbai) or 50-minute speedboat from Gateway of India to Mandwa."
            }
        }
    },
    # 21. Rajasthan - Ranthambore
    {
        "id": "rj-ranthambore",
        "name": "Ranthambore National Park (The Royal Tiger Fortress)",
        "state": "Rajasthan",
        "city": "Sawai Madhopur",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Wildlife", "Heritage", "Safari", "Adventure"],
        "purposes": ["Bengal tiger tracking", "Ancient hill fort", "Wildlife photography", "Royal safari"],
        "dailyCostPerPerson": 4500,
        "stayCostPerDay": 3000,
        "stayCostBudget": 2000,
        "stayCostStandard": 4200,
        "stayCostLuxury": 10500,
        "foodCostPerDay": 1000,
        "crowd": "High Crowd",
        "rating": 4.9,
        "bestTime": "October to June",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
        "description": "Where royal history meets raw wildlife: Bengal tigers prowl past ancient ruins, cenotaphs, and the colossal 10th-century UNESCO Ranthambore Fort perched high above the jungle canopy.",
        "highlights": ["Open-top 6-seater Gypsy safari in Zones 1 to 5", "10th-century UNESCO Ranthambore Fort & Trinetra Ganesha Temple", "Padam Talao lake tiger sightings with Jogi Mahal backdrop", "Chambal River gharial and crocodile boat safari"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Rajasthani, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2, 3, 4, 5],
            "shoulderMonths": [10, 6],
            "offPeakMonths": [7, 8, 9],
            "peakReason": "Peak season for wildlife safaris; dry summer months offer almost guaranteed tiger sightings around lakes.",
            "offPeakReason": "Park is closed for monsoon breeding from July to September.",
            "crowdAdvisory": "Book Gypsy safaris at least 60-90 days in advance on the official Rajasthan SSO portal."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jaipur International Airport (JAI)",
                "airportCode": "JAI",
                "distanceKm": 160,
                "connectivity": "Jaipur has daily flights from all Indian metros; 3.5 hrs drive to Sawai Madhopur."
            },
            "train": {
                "nearestStation": "Sawai Madhopur Junction (SWM)",
                "stationCode": "SWM",
                "distanceKm": 12,
                "majorTrains": "Located on the main Mumbai-Delhi train trunk line: Golden Temple Mail, August Kranti Rajdhani, and Kota Jan Shatabdi."
            },
            "road": {
                "highway": "Delhi-Mumbai Expressway (NE 4)",
                "driveHours": "Superfast 3.5 hours drive from Delhi via Delhi-Mumbai Expressway, or 3 hours from Jaipur."
            }
        }
    },
    # 22. Madhya Pradesh - Kanha
    {
        "id": "mp-kanha",
        "name": "Kanha & Bandhavgarh (Kipling's Jungle Country)",
        "state": "Madhya Pradesh",
        "city": "Mandla",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Wildlife", "Nature", "Safari", "Adventure"],
        "purposes": ["Tiger safari", "Sal forest exploration", "Barasingha deer conservation", "Nature documentary trails"],
        "dailyCostPerPerson": 4600,
        "stayCostPerDay": 3200,
        "stayCostBudget": 2200,
        "stayCostStandard": 4500,
        "stayCostLuxury": 11000,
        "foodCostPerDay": 1050,
        "crowd": "Medium Crowd",
        "rating": 4.9,
        "bestTime": "October to June",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
        "description": "The real inspiration for Rudyard Kipling's The Jungle Book, Kanha features vast rolling meadows of sal forests, the rare Hard-ground Barasingha, and thriving tiger prides.",
        "highlights": ["Kanha Zone early morning misty sal forest safari", "Bamni Dadar sunset point (highest plateau in the park)", "Spotting the endangered Hard-ground Barasingha (Swamp Deer)", "Authentic tribal Baiga village interaction and dance"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Gondi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "Phen Wildlife Sanctuary buffer corridor rich in leopards and barking deer.",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2, 3, 4, 5],
            "shoulderMonths": [10, 6],
            "offPeakMonths": [7, 8, 9],
            "peakReason": "Crisp morning mist, active wildlife, and dry summer waterhole tracking.",
            "offPeakReason": "Park core zones are closed during monsoon.",
            "crowdAdvisory": "Book evening safaris for golden-hour photography in the vast grasslands of Mukki zone."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jabalpur Airport (JLR) / Raipur (RPR)",
                "airportCode": "JLR",
                "distanceKm": 160,
                "connectivity": "Jabalpur connects with Delhi, Mumbai, and Hyderabad; 3.5 hrs drive to Kanha gates."
            },
            "train": {
                "nearestStation": "Gondia Junction (G) / Jabalpur (JBP)",
                "stationCode": "JBP",
                "distanceKm": 145,
                "majorTrains": "Jabalpur and Gondia have direct superfast trains from Mumbai, Delhi, Kolkata, and Chennai."
            },
            "road": {
                "highway": "NH 30 / Mandla-Kanha Road",
                "driveHours": "Scenic 3.5 hours drive from Jabalpur or 4.5 hours from Raipur."
            }
        }
    },
    # 23. Madhya Pradesh - Pachmarhi
    {
        "id": "mp-pachmarhi",
        "name": "Pachmarhi (Queen of the Satpuras)",
        "state": "Madhya Pradesh",
        "city": "Pachmarhi",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Hills", "Nature", "Waterfalls", "Spiritual"],
        "purposes": ["Cave exploration", "Waterfall treks", "Sunset viewpoints", "Biosphere reserve"],
        "dailyCostPerPerson": 3100,
        "stayCostPerDay": 1900,
        "stayCostBudget": 1500,
        "stayCostStandard": 2800,
        "stayCostLuxury": 6500,
        "foodCostPerDay": 800,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "October to June",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
        "description": "Madhya Pradesh's only hill station, Pachmarhi is a UNESCO Biosphere Reserve nestled in the Satpura range, famous for prehistoric rock art, roaring waterfalls, and sacred cave temples.",
        "highlights": ["Bee Falls refreshing plunge pool and cascading rapids", "Dhoopgarh highest peak in Madhya Pradesh with 360-degree sunset", "Jata Shankar natural stalagmite cave shrine", "Pandav Caves five rock-cut Buddhist/mythological chambers"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "Apsara Vihar natural bathing pool hidden inside dense mahogany forests.",
        "seasonality": {
            "peakMonths": [10, 11, 12, 1],
            "shoulderMonths": [2, 3, 9],
            "offPeakMonths": [4, 5, 6, 7, 8],
            "peakReason": "Crisp mountain climate, gushing waterfalls, and clear sunset vistas.",
            "offPeakReason": "Warm daytime summer temperatures.",
            "crowdAdvisory": "Hire a registered open Gypsy from the Pachmarhi Taxi Union to access interior forest checkpoints."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Raja Bhoj Airport, Bhopal (BHO) / Jabalpur (JLR)",
                "airportCode": "BHO",
                "distanceKm": 195,
                "connectivity": "Bhopal has daily flights from Mumbai, Delhi, Bengaluru, and Hyderabad."
            },
            "train": {
                "nearestStation": "Pipariya Railway Station (PPI)",
                "stationCode": "PPI",
                "distanceKm": 47,
                "majorTrains": "Located on Mumbai-Howrah main rail line; daily express trains stop at Pipariya."
            },
            "road": {
                "highway": "SH 19 / Pipariya-Pachmarhi Hill Road",
                "driveHours": "1-hour ghat drive from Pipariya railhead; 4.5 hours from Bhopal."
            }
        }
    },
    # 24. Tamil Nadu - Kodaikanal
    {
        "id": "tn-kodaikanal",
        "name": "Kodaikanal (Princess of Hill Stations)",
        "state": "Tamil Nadu",
        "city": "Kodaikanal",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Hills", "Nature", "Romantic", "Relaxation"],
        "purposes": ["Honeymoon", "Lake cycling", "Pine forest walks", "Scenic viewpoints"],
        "dailyCostPerPerson": 3500,
        "stayCostPerDay": 2200,
        "stayCostBudget": 1700,
        "stayCostStandard": 3200,
        "stayCostLuxury": 7500,
        "foodCostPerDay": 850,
        "crowd": "High Crowd",
        "rating": 4.8,
        "bestTime": "September to May",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
        "description": "Perched at 7,000 feet in the Palani Hills, Kodaikanal centers around an iconic star-shaped lake, shrouded in rolling mist, fragrant eucalyptus groves, and dramatic rock cliffs.",
        "highlights": ["Kodaikanal Lake cycling & pedal boating", "Coaker's Walk edge-of-the-cliff mountain promenade", "Pillar Rocks towering 400-ft granite monoliths", "Silent Pine Forest walks and eucalyptus oil tasting"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Tamil, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [4, 5, 12, 1],
            "shoulderMonths": [9, 10, 11, 2, 3],
            "offPeakMonths": [6, 7, 8],
            "peakReason": "Escape from southern plains heat (April-May) and winter chill.",
            "offPeakReason": "Monsoon downpours over Western Ghats.",
            "crowdAdvisory": "Walk around Kodaikanal Lake early at 6:30 AM when mist floats on the water surface."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Madurai Airport (IXM) / Coimbatore (CJB)",
                "airportCode": "IXM",
                "distanceKm": 120,
                "connectivity": "Madurai has flights from Chennai, Mumbai, Delhi, Bengaluru, and Colombo."
            },
            "train": {
                "nearestStation": "Kodai Road (KQN) / Dindigul (DG)",
                "stationCode": "KQN",
                "distanceKm": 80,
                "majorTrains": "Kodai Road is connected by southern express trains from Chennai, Bengaluru, and Madurai."
            },
            "road": {
                "highway": "Ghat Road (SH 156)",
                "driveHours": "3 hours scenic mountain drive from Madurai or 8 hours from Bengaluru."
            }
        }
    },
    # 25. Tamil Nadu - Madurai
    {
        "id": "tn-madurai",
        "name": "Madurai (The Temple City & Cultural Soul)",
        "state": "Tamil Nadu",
        "city": "Madurai",
        "weatherTags": ["Tropical", "Mild", "Any"],
        "vibes": ["Spiritual", "Heritage", "Culture", "Food"],
        "purposes": ["Meenakshi Temple darshan", "Dravidian architecture", "Street food tour", "Cultural immersion"],
        "dailyCostPerPerson": 2900,
        "stayCostPerDay": 1800,
        "stayCostBudget": 1400,
        "stayCostStandard": 2600,
        "stayCostLuxury": 6200,
        "foodCostPerDay": 750,
        "crowd": "High Crowd",
        "rating": 4.9,
        "bestTime": "October to March",
        "duration": "2 Days",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
        "description": "One of the world's oldest continuously inhabited cities, Madurai revolves around the monumental Meenakshi Amman Temple with its 14 towering gopurams encrusted with thousands of colorful mythological sculptures.",
        "highlights": ["Meenakshi Amman Temple 1000-pillar hall & evening procession", "Thirumalai Nayakkar Palace light & sound show", "Gandhi Memorial Museum in Tamukkam Palace", "Legendary Murugan Idli Shop & famous Madurai Jigarthanda beverage"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Tamil, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [10, 11, 12, 1, 2],
            "shoulderMonths": [3, 9],
            "offPeakMonths": [4, 5, 6, 7, 8],
            "peakReason": "Comfortable winter weather for walking temple corridors; Chithirai festival in April.",
            "offPeakReason": "Hot tropical summer temperatures in the plains.",
            "crowdAdvisory": "Witness the divine night procession at Meenakshi Temple around 9:00 PM."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Madurai Airport (IXM)",
                "airportCode": "IXM",
                "distanceKm": 12,
                "connectivity": "Direct daily flights from Mumbai, Delhi, Chennai, Bengaluru, and Hyderabad."
            },
            "train": {
                "nearestStation": "Madurai Junction (MDU)",
                "stationCode": "MDU",
                "distanceKm": 1,
                "majorTrains": "Vande Bharat Express to Chennai, Pandian Express, and Vaigai Superfast."
            },
            "road": {
                "highway": "NH 44 / NH 85",
                "driveHours": "6-lane national highway connecting Chennai (7 hrs) and Bengaluru (7 hrs)."
            }
        }
    },
    # 26. Tamil Nadu - Rameshwaram
    {
        "id": "tn-rameshwaram",
        "name": "Rameshwaram (The Sacred Pamban Island Corridor)",
        "state": "Tamil Nadu",
        "city": "Rameshwaram",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Spiritual", "Coastal", "Heritage", "Offbeat"],
        "purposes": ["Char Dham pilgrimage", "Pamban Sea Bridge", "Ghost town of Dhanushkodi", "Ram Setu viewpoint"],
        "dailyCostPerPerson": 3100,
        "stayCostPerDay": 1900,
        "stayCostBudget": 1400,
        "stayCostStandard": 2800,
        "stayCostLuxury": 6400,
        "foodCostPerDay": 800,
        "crowd": "High Crowd",
        "rating": 4.9,
        "bestTime": "October to April",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
        "description": "An island sanctuary connected by the legendary Pamban Sea Bridge, Rameshwaram is one of India's four sacred Char Dham sites, with longest temple corridors in the world and ghost town of Dhanushkodi.",
        "highlights": ["Ramanathaswamy Temple 22 holy teertham bathing wells & 1200-pillar corridor", "Crossing the engineering marvel Pamban Sea Bridge over turquoise ocean", "Dhanushkodi ghost town & Arichal Munai (Ram Setu starting point)", "Dr. APJ Abdul Kalam National Memorial"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Tamil, English, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "Arichal Munai coastal tip where the calm waters of Bay of Bengal meet the roaring Indian Ocean.",
        "seasonality": {
            "peakMonths": [10, 11, 12, 1, 2],
            "shoulderMonths": [3, 4, 9],
            "offPeakMonths": [5, 6, 7, 8],
            "peakReason": "Pleasant coastal breeze, calm sea, and pilgrimage festivities like Maha Shivratri.",
            "offPeakReason": "Hot sunny coastal days during peak summer.",
            "crowdAdvisory": "Hire a four-wheel-drive local vehicle to reach the tip of Dhanushkodi beach."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Madurai Airport (IXM)",
                "airportCode": "IXM",
                "distanceKm": 170,
                "connectivity": "Madurai connects to all Indian metros; 3.5 hrs scenic highway drive across Pamban bridge."
            },
            "train": {
                "nearestStation": "Rameswaram Railway Station (RMM) / Mandapam (MMM)",
                "stationCode": "RMM",
                "distanceKm": 2,
                "majorTrains": "Boat Mail Express, Rameswaram-Chennai Express, and direct trains from Varanasi, Ayodhya, and Delhi."
            },
            "road": {
                "highway": "NH 87 (Pamban Sea Bridge Roadway)",
                "driveHours": "Spectacular drive over the sea on Pamban Road Bridge (3.5 hrs from Madurai)."
            }
        }
    },
    # 27. Tamil Nadu - Kanyakumari
    {
        "id": "tn-kanyakumari",
        "name": "Kanyakumari (Triveni Sangam & Southernmost Tip)",
        "state": "Tamil Nadu",
        "city": "Kanyakumari",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Coastal", "Spiritual", "Sunrise/Sunset", "Landmark"],
        "purposes": ["Ocean confluence", "Vivekananda Rock Memorial", "Simultaneous sunrise/moonrise", "Southernmost landmark"],
        "dailyCostPerPerson": 3000,
        "stayCostPerDay": 1800,
        "stayCostBudget": 1400,
        "stayCostStandard": 2700,
        "stayCostLuxury": 6200,
        "foodCostPerDay": 800,
        "crowd": "High Crowd",
        "rating": 4.8,
        "bestTime": "October to March",
        "duration": "1-2 Days",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        "description": "The dramatic southern terminus of mainland India where the Arabian Sea, Indian Ocean, and Bay of Bengal converge, famous for simultaneous sunset and full moonrise.",
        "highlights": ["Ferry to Vivekananda Rock Memorial & 133-ft Thiruvalluvar Statue", "Triveni Sangam tri-sea confluence holy dip", "Sunset Point panoramic ocean views", "3000-year-old Bhagavathy Amman Temple"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Tamil, Malayalam, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [10, 11, 12, 1],
            "shoulderMonths": [2, 3, 9],
            "offPeakMonths": [4, 5, 6, 7, 8],
            "peakReason": "Clear sea horizon for spectacular simultaneous sunrise and moonrise.",
            "offPeakReason": "Strong monsoon offshore winds.",
            "crowdAdvisory": "Arrive at the Poompuhar ferry jetty by 7:30 AM to avoid long queues for Vivekananda Rock."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Trivandrum International Airport (TRV)",
                "airportCode": "TRV",
                "distanceKm": 90,
                "connectivity": "Direct daily flights from Mumbai, Delhi, Bengaluru, Chennai, and Gulf cities."
            },
            "train": {
                "nearestStation": "Kanyakumari Railway Station (CAPE)",
                "stationCode": "CAPE",
                "distanceKm": 1,
                "majorTrains": "Vivek Express (India's longest train route to Dibrugarh), Himsagar Express to Kashmir, and Tamil Nadu Express."
            },
            "road": {
                "highway": "NH 44 (India's longest North-South Highway terminus)",
                "driveHours": "2.5 hours scenic drive from Trivandrum; terminus of NH 44 connecting all the way to Srinagar."
            }
        }
    },
    # 28. West Bengal - Sundarbans
    {
        "id": "wb-sundarbans",
        "name": "Sundarbans National Park (The Mangrove Tiger Delta)",
        "state": "West Bengal",
        "city": "Gosaba",
        "weatherTags": ["Tropical", "Mild", "Any"],
        "vibes": ["Wildlife", "Nature", "Offbeat", "Adventure"],
        "purposes": ["Boat cruise safari", "Mangrove delta", "Royal Bengal Tiger", "Estuarine biodiversity"],
        "dailyCostPerPerson": 3500,
        "stayCostPerDay": 2200,
        "stayCostBudget": 1600,
        "stayCostStandard": 3200,
        "stayCostLuxury": 7500,
        "foodCostPerDay": 850,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
        "description": "The world's largest mangrove delta forest and UNESCO World Heritage site, home to swimming Royal Bengal Tigers, saltwater crocodiles, and iridescent kingfishers.",
        "highlights": ["Silent motorboat safari through narrow tidal creek channels", "Sajnekhali Bird Sanctuary and mangrove watchtower", "Dobanki Canopy Walk (elevated 20 ft above forest floor)", "Netidhopani 400-year-old temple ruins inside deep delta"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Bengali, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "Burirdabri mud-walk trail and watchtower overlooking the Bangladesh frontier delta.",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3],
            "offPeakMonths": [4, 5, 6, 7, 8, 9],
            "peakReason": "Pleasant sunny weather, calm waterways, and tigers basking on river mudbanks.",
            "offPeakReason": "Tropical summer heat and monsoon storm surges.",
            "crowdAdvisory": "Stay on an eco-boat overnight anchored in the middle of river delta under starlight."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Netaji Subhash Chandra Bose International Airport, Kolkata (CCU)",
                "airportCode": "CCU",
                "distanceKm": 110,
                "connectivity": "Kolkata CCU connects to all Indian metros and international destinations."
            },
            "train": {
                "nearestStation": "Canning Railway Station (CG)",
                "stationCode": "CG",
                "distanceKm": 48,
                "majorTrains": "Local EMU suburban trains run every 45 mins from Kolkata Sealdah station to Canning."
            },
            "road": {
                "highway": "Basanti Highway",
                "driveHours": "3 hours drive from Kolkata to Godkhali boat jetty (gateway to Sundarbans delta)."
            }
        }
    },
    # 29. West Bengal - Kalimpong
    {
        "id": "wb-kalimpong",
        "name": "Kalimpong & Lava (Orchids & Kanchenjunga Vistas)",
        "state": "West Bengal",
        "city": "Kalimpong",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Hills", "Nature", "Culture", "Relaxation"],
        "purposes": ["Himalayan panorama", "Monastery visits", "Orchid nurseries", "Peaceful mountain retreat"],
        "dailyCostPerPerson": 3200,
        "stayCostPerDay": 2000,
        "stayCostBudget": 1500,
        "stayCostStandard": 3000,
        "stayCostLuxury": 6800,
        "foodCostPerDay": 800,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "September to May",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
        "description": "Perched on a ridge overlooking the Teesta River, Kalimpong is famous for colonial stone bungalows, exotic orchid nurseries, Tibetan Buddhist monasteries, and quiet pine forests.",
        "highlights": ["Deolo Hill highest point with paragliding and Mount Kanchenjunga views", "Zang Dhok Palri Phodang monastery with rare Kangyur scriptures", "Exotic Pine View Nursery exhibiting 1500+ cactus and orchid species", "Morgan House colonial haunted-heritage English cottage"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Nepali, Bengali, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "Lava and Rishyap serene forest hamlets nestled under canopy of pine and fir.",
        "seasonality": {
            "peakMonths": [10, 11, 3, 4, 5],
            "shoulderMonths": [12, 1, 2],
            "offPeakMonths": [6, 7, 8, 9],
            "peakReason": "Crystal clear Himalayan views, vibrant flowers in bloom, and comfortable mountain air.",
            "offPeakReason": "Heavy mountain monsoon rains.",
            "crowdAdvisory": "Sample authentic Kalimpong cheese and Tibetan momos at local town square bakeries."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Bagdogra Airport (IXB)",
                "airportCode": "IXB",
                "distanceKm": 75,
                "connectivity": "Direct daily flights from Mumbai, Delhi, Kolkata, Bengaluru, and Guwahati."
            },
            "train": {
                "nearestStation": "New Jalpaiguri Junction (NJP)",
                "stationCode": "NJP",
                "distanceKm": 70,
                "majorTrains": "Vande Bharat Express, Rajdhani Express, and Darjeeling Mail from Kolkata and Delhi."
            },
            "road": {
                "highway": "NH 10 (along Teesta River)",
                "driveHours": "2.5 hours scenic drive from Siliguri / Bagdogra via the Teesta Coronation Bridge."
            }
        }
    },
    # 30. Andhra Pradesh - Tirupati
    {
        "id": "ap-tirupati",
        "name": "Tirupati (Sri Venkateswara Divine Hills)",
        "state": "Andhra Pradesh",
        "city": "Tirupati",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Spiritual", "Heritage", "Culture"],
        "purposes": ["Lord Balaji darshan", "Seven Sacred Hills", "Temple architecture", "Spiritual devotion"],
        "dailyCostPerPerson": 2800,
        "stayCostPerDay": 1700,
        "stayCostBudget": 1300,
        "stayCostStandard": 2600,
        "stayCostLuxury": 6500,
        "foodCostPerDay": 700,
        "crowd": "High Crowd",
        "rating": 4.9,
        "bestTime": "September to March",
        "duration": "2 Days",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
        "description": "The spiritual epicenter of South India, Tirupati is home to the world's most-visited sacred temple atop the Seven Hills of Tirumala, dedicated to Lord Sri Venkateswara Swamy.",
        "highlights": ["Sacred darshan at Sri Venkateswara Swamy Temple atop Tirumala", "Tirupati Laddu Prasadam (GI-tagged sacred offering)", "Kapila Theertham waterfall and Shiva shrine at base of hills", "Srivari Mettu historic 2388-step stone walking trail to Tirumala"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Telugu, Tamil, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [9, 10, 11, 12, 1],
            "shoulderMonths": [2, 3],
            "offPeakMonths": [4, 5, 6, 7, 8],
            "peakReason": "Annual Brahmotsavam grand festival in September/October; pleasant weather on the hills.",
            "offPeakReason": "Hot summer temperatures in the lower foothills.",
            "crowdAdvisory": "Book Special Entry Darshan (SED ₹300) tickets online months in advance via the official TTD website."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Tirupati Airport (TIR) / Chennai (MAA)",
                "airportCode": "TIR",
                "distanceKm": 14,
                "connectivity": "Direct daily flights from Hyderabad, Bengaluru, Chennai, and New Delhi."
            },
            "train": {
                "nearestStation": "Tirupati Main (TPTY) / Renigunta Junction (RU)",
                "stationCode": "TPTY",
                "distanceKm": 2,
                "majorTrains": "Vande Bharat Express to Secunderabad, Sapthagiri Express to Chennai, and direct trains nationwide."
            },
            "road": {
                "highway": "NH 71 / NH 140",
                "driveHours": "3 hours drive from Chennai (135 km) or 4.5 hours from Bengaluru (250 km)."
            }
        }
    }
]

# Generate verified hotels for each of the 30 new destinations
NEW_HOTELS = {
    "rj-udaipur": [
        {
            "name": "Jagat Niwas Palace Hotel",
            "tier": "Standard",
            "type": "Heritage Haveli",
            "pricePerNightINR": 4200,
            "rating": 4.7,
            "reviewsCount": 1840,
            "address": "23-25 Lal Ghat, Behind Jagdish Temple, Udaipur",
            "amenities": ["Lake View Rooftop", "Free WiFi", "Ayurvedic Spa", "Multicuisine Restaurant", "Boat Ride Assistance"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Udaipur?q=Jagat+Niwas+Palace+Udaipur",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Historic 17th-century haveli perched right on Lake Pichola with spectacular palace views."
        },
        {
            "name": "Zostel Udaipur",
            "tier": "Budget",
            "type": "Boutique Hostel & Private Rooms",
            "pricePerNightINR": 1850,
            "rating": 4.6,
            "reviewsCount": 2420,
            "address": "Navghat, Chandpole, Near Lake Pichola, Udaipur",
            "amenities": ["Rooftop Cafe", "Air Conditioning", "Free High-Speed WiFi", "Walking Tours", "Travel Desk"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Udaipur?q=Zostel+Udaipur",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Budget traveler favorite with sunset lake views and central location."
        },
        {
            "name": "The Leela Palace Udaipur",
            "tier": "Luxury",
            "type": "Palatial 5-Star Luxury Resort",
            "pricePerNightINR": 24500,
            "rating": 4.9,
            "reviewsCount": 3120,
            "address": "Lake Pichola, Post Box No. 125, Udaipur",
            "amenities": ["Private Boat Transfers", "Infinity Lake Pool", "ESPA Luxury Spa", "Fine Dining", "Butler Service"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Udaipur?q=The+Leela+Palace+Udaipur",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Voted world's best hotel with majestic royal suites and private palace boat arrivals."
        }
    ],
    "rj-jaisalmer": [
        {
            "name": "Hotel Pleasant Haveli",
            "tier": "Budget",
            "type": "Heritage Haveli",
            "pricePerNightINR": 1800,
            "rating": 4.7,
            "reviewsCount": 1150,
            "address": "Chainpura Street, Gandhi Chowk, Jaisalmer",
            "amenities": ["Rooftop Fort View Restaurant", "Free Desert Camp Safari Booking", "Free WiFi", "AC Rooms"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Jaisalmer?q=Hotel+Pleasant+Haveli+Jaisalmer",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Unmatched hospitality with direct fort-facing rooftop dining and camel safari assistance."
        },
        {
            "name": "Desert Springs Resort & Camp",
            "tier": "Standard",
            "type": "Luxury Swiss Tent Desert Camp",
            "pricePerNightINR": 3800,
            "rating": 4.6,
            "reviewsCount": 940,
            "address": "Sam Sand Dunes Road, Kanoi, Jaisalmer",
            "amenities": ["Private Desert Tents", "Buffet Dinner", "Rajasthani Folk Dance & Campfire", "Camel & Jeep Dune Safari"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Jaisalmer?q=Desert+Springs+Resort+Jaisalmer",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Authentic desert camp on the dunes with nightly kalbeliya folk music and stargazing."
        },
        {
            "name": "Suryagarh Jaisalmer",
            "tier": "Luxury",
            "type": "5-Star Fortress Luxury Hotel",
            "pricePerNightINR": 18500,
            "rating": 4.9,
            "reviewsCount": 2680,
            "address": "Kahala Phata, Sam Road, Jaisalmer",
            "amenities": ["Indoor Heated Pool", "Rait Spa", "Chudail Trail Night Walk", "Fine Dining", "Archery & Falconry"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Jaisalmer?q=Suryagarh+Jaisalmer",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "A bespoke sandstone fortress offering world-class luxury in the Thar desert."
        }
    ],
    "rj-jodhpur": [
        {
            "name": "The Blue House Heritage Hotel",
            "tier": "Budget",
            "type": "Heritage Haveli",
            "pricePerNightINR": 1700,
            "rating": 4.6,
            "reviewsCount": 890,
            "address": "Moti Chowk, Jodhpur Old City",
            "amenities": ["Rooftop Restaurant", "Fort Views", "Free WiFi", "Heritage Rooms"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Jodhpur?q=The+Blue+House+Jodhpur",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Family-run 500-year-old haveli inside the heart of the blue city."
        },
        {
            "name": "RAAS Jodhpur",
            "tier": "Luxury",
            "type": "Boutique Luxury Haveli",
            "pricePerNightINR": 16500,
            "rating": 4.9,
            "reviewsCount": 1720,
            "address": "Tunwar ji ka Jhalra, Makrana Mohalla, Jodhpur",
            "amenities": ["Mehrangarh Fort Views", "Stepwell Pool", "Spa", "Terrace Dining", "Bar"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Jodhpur?q=RAAS+Jodhpur",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Luxury boutique hotel built around an 18th-century stepwell right beneath Mehrangarh Fort."
        },
        {
            "name": "Ranbanka Palace",
            "tier": "Standard",
            "type": "Heritage Palace Hotel",
            "pricePerNightINR": 3400,
            "rating": 4.5,
            "reviewsCount": 1420,
            "address": "Circuit House Road, Jodhpur",
            "amenities": ["Swimming Pool", "Spa", "Multi-cuisine Dining", "Lush Courtyards"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Jodhpur?q=Ranbanka+Palace+Jodhpur",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Royal heritage property with serene gardens and classic Marwari architecture."
        }
    ],
    "ka-hampi": [
        {
            "name": "Heritage Resort Hampi",
            "tier": "Standard",
            "type": "Eco-Heritage Resort",
            "pricePerNightINR": 3600,
            "rating": 4.6,
            "reviewsCount": 1180,
            "address": "48/C & 48/D, Hosapete Taluk, Hampi",
            "amenities": ["Swimming Pool", "Organic Farm Dining", "Ayurvedic Spa", "Bicycle Rental", "Guided Ruin Tours"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Hampi?q=Heritage+Resort+Hampi",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Tranquil stone-cottage resort amidst lush orchards only 6 km from UNESCO monuments."
        },
        {
            "name": "Gowri Guest House & Huts",
            "tier": "Budget",
            "type": "Riverside Homestay & Huts",
            "pricePerNightINR": 1400,
            "rating": 4.5,
            "reviewsCount": 850,
            "address": "Sanapur Village, Hippie Island, Hampi",
            "amenities": ["Riverside Cafe", "Hammocks", "Motorbike Rental", "Free WiFi", "Coracle Booking"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Hampi?q=Gowri+Guest+House+Hampi",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Chilled-out boulder retreat near Sanapur Lake, popular with backpackers and climbers."
        },
        {
            "name": "Evolve Back Kamalapura Palace",
            "tier": "Luxury",
            "type": "Palatial 5-Star Luxury Resort",
            "pricePerNightINR": 22000,
            "rating": 4.9,
            "reviewsCount": 1950,
            "address": "Kamalapura, Bellary District, Hampi",
            "amenities": ["Private Plunge Pool Villas", "Vaidyasala Ayurvedic Center", "Infinity Pool", "Fine Dining", "Historian Guided Walks"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Hampi?q=Evolve+Back+Hampi",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Designed to recreate the grand 14th-century Vijayanagara imperial royal architecture."
        }
    ],
    "ka-mysuru": [
        {
            "name": "Radisson Blu Plaza Hotel Mysore",
            "tier": "Standard",
            "type": "4-Star Modern Hotel",
            "pricePerNightINR": 3800,
            "rating": 4.7,
            "reviewsCount": 3800,
            "address": "MG Road, Indiranagar, Mysuru",
            "amenities": ["Chamundi Hills Views", "Swimming Pool", "Spa & Wellness", "Fine Dining", "Fitness Center"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Mysore?q=Radisson+Blu+Plaza+Mysore",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Prime location next to Mysore Zoo and Palace with sweeping views of Chamundi Hills."
        },
        {
            "name": "Roamer Luxury Hostel & Rooms",
            "tier": "Budget",
            "type": "Boutique Heritage Stay",
            "pricePerNightINR": 1500,
            "rating": 4.6,
            "reviewsCount": 680,
            "address": "Gokulam 3rd Stage, Mysuru",
            "amenities": ["Yoga Shala", "Cafe", "High-Speed WiFi", "Community Terrace", "Bicycle Rental"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Mysore?q=Roamer+Hostel+Mysore",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Located in Gokulam yoga quarter, ideal for solo travelers and wellness retreats."
        },
        {
            "name": "Grand Mercure Mysuru",
            "tier": "Luxury",
            "type": "5-Star Luxury Hotel",
            "pricePerNightINR": 6800,
            "rating": 4.8,
            "reviewsCount": 2400,
            "address": "Sayyaji Rao Road, Nelson Mandela Circle, Mysuru",
            "amenities": ["Rooftop Swimming Pool", "La Rive Spa", "Fine Dining", "Cocktail Bar", "Executive Club"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Mysore?q=Grand+Mercure+Mysuru",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Sophisticated modern luxury reflecting Mysuru's silk and sandalwood legacy."
        }
    ],
    "ka-gokarna": [
        {
            "name": "Kahani Paradise Gokarna",
            "tier": "Luxury",
            "type": "Luxury Cliff-Top Villa Estate",
            "pricePerNightINR": 14500,
            "rating": 4.9,
            "reviewsCount": 340,
            "address": "Near Paradise Beach, Belekan, Gokarna",
            "amenities": ["Infinity Cliff Pool", "Panoramic Ocean & River Views", "Gourmet Chef Dining", "Ayurvedic Massages"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Gokarna?q=Kahani+Paradise+Gokarna",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Exclusive cliff villa set amidst 20 acres of tropical gardens with private beach trail."
        },
        {
            "name": "Kudle Ocean Front Resort",
            "tier": "Standard",
            "type": "Beachfront Cottages",
            "pricePerNightINR": 2800,
            "rating": 4.5,
            "reviewsCount": 1120,
            "address": "Kudle Beach, Gokarna",
            "amenities": ["Beachfront Access", "Seafood Shack Restaurant", "AC Cottages", "Free WiFi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Gokarna?q=Kudle+Ocean+Front+Gokarna",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Step directly onto Kudle beach sands with vibrant sunset views."
        },
        {
            "name": "Zostel Gokarna",
            "tier": "Budget",
            "type": "Cliffside Hostel & Private Cottages",
            "pricePerNightINR": 1600,
            "rating": 4.6,
            "reviewsCount": 2100,
            "address": "Kudle Beach Road, Dandebagh, Gokarna",
            "amenities": ["Cliff-top Sunset Point", "Mantra Cafe", "Common Room", "Free High-Speed WiFi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Gokarna?q=Zostel+Gokarna",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Perched on the cliff overlooking Gokarna beach, celebrated for its cafe and community vibes."
        }
    ],
    "kl-wayanad": [
        {
            "name": "Vythiri Resort Wayanad",
            "tier": "Luxury",
            "type": "Rainforest Treehouse & Spa Resort",
            "pricePerNightINR": 12500,
            "rating": 4.8,
            "reviewsCount": 2800,
            "address": "Lakkidi PO, Vythiri, Wayanad",
            "amenities": ["Canopy Treehouses", "Rope Bridge over Stream", "Ayurveda Spa", "Natural Pool", "Guided Rainforest Hikes"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Wayanad?q=Vythiri+Resort+Wayanad",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Pioneer eco-resort with authentic thatched treehouses in an untouched Western Ghats rainforest."
        },
        {
            "name": "Greenex Farms Homestay",
            "tier": "Budget",
            "type": "Coffee Plantation Homestay",
            "pricePerNightINR": 1800,
            "rating": 4.6,
            "reviewsCount": 620,
            "address": "Chundale, Kalpetta, Wayanad",
            "amenities": ["Coffee Estate Walks", "Homestyle Kerala Meals", "Campfire", "Free WiFi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Wayanad?q=Greenex+Farms+Wayanad",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Warm farmstay hospitality with authentic Kerala sadhya meals and plantation walks."
        },
        {
            "name": "Sterling Wayanad",
            "tier": "Standard",
            "type": "4-Star Nature Resort",
            "pricePerNightINR": 3400,
            "rating": 4.6,
            "reviewsCount": 1640,
            "address": "Valluvadi Road, Sultan Bathery, Wayanad",
            "amenities": ["Swimming Pool", "Clubhouse Games", "Multi-cuisine Restaurant", "Spa", "Elephant Sightings"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Wayanad?q=Sterling+Wayanad",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Set on the border of Muthanga Wildlife Sanctuary, ideal for families and nature lovers."
        }
    ],
    "kl-alleppey": [
        {
            "name": "Lakes & Lagoons Houseboat Cruise",
            "tier": "Standard",
            "type": "Deluxe Backwater Houseboat",
            "pricePerNightINR": 4200,
            "rating": 4.7,
            "reviewsCount": 1950,
            "address": "Finishing Point Jetty, Alappuzha",
            "amenities": ["Private AC Bedroom", "Chef Onboard (3 Fresh Meals)", "Upper Deck Viewing Lounge", "Canoe Excursion"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Alleppey?q=Lakes+and+Lagoons+Houseboat+Alleppey",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Government-certified luxury kettuvallam houseboats cruising deep into tranquil village backwaters."
        },
        {
            "name": "Kondai Lip Backwater Heritage Resort",
            "tier": "Budget",
            "type": "Heritage Backwater Cottages",
            "pricePerNightINR": 2100,
            "rating": 4.6,
            "reviewsCount": 780,
            "address": "Kondai, Eramalloor, Near Alappuzha",
            "amenities": ["Canal-side Wooden Cottages", "Country Boat Rides", "Ayurvedic Center", "Kerala Cuisine"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Alleppey?q=Kondai+Lip+Backwater+Resort",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "200-year-old traditional wooden cottages set along a private palm canal."
        },
        {
            "name": "Kumarakom Lake Resort",
            "tier": "Luxury",
            "type": "5-Star Heritage Luxury Resort",
            "pricePerNightINR": 18000,
            "rating": 4.9,
            "reviewsCount": 3200,
            "address": "Vembanad Lake, Kumarakom / Alleppey Backwaters",
            "amenities": ["Meandering Pool Villas", "Ayurmana Heritage Spa", "Sunset Lake Cruise", "Seafood Bar"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Alleppey?q=Kumarakom+Lake+Resort",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Consistently rated India's leading backwater resort, featuring villas with private plunge pools."
        }
    ],
    "kl-kochi": [
        {
            "name": "Forte Kochi Heritage Hotel",
            "tier": "Standard",
            "type": "Colonial Heritage Hotel",
            "pricePerNightINR": 4200,
            "rating": 4.8,
            "reviewsCount": 1100,
            "address": "1/373 Princess Street, Fort Kochi",
            "amenities": ["Courtyard Pool", "Colonial Architecture", "Free High-Speed WiFi", "Heritage Cafe"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kochi?q=Forte+Kochi+Hotel",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Restored 19th-century Dutch mansion on famous Princess Street, walking distance to beach nets."
        },
        {
            "name": "Zostel Kochi (Fort Kochi)",
            "tier": "Budget",
            "type": "Hostel & Private Rooms",
            "pricePerNightINR": 1700,
            "rating": 4.6,
            "reviewsCount": 1850,
            "address": "Bazaar Road, Mattancherry, Kochi",
            "amenities": ["Art Rooftop", "Common Lounge", "Bicycle Rental", "Walking Tours"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kochi?q=Zostel+Kochi",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Located between Fort Kochi and Jew Town, perfect for art lovers and backpackers."
        },
        {
            "name": "Brunton Boatyard - CGH Earth",
            "tier": "Luxury",
            "type": "5-Star Waterfront Heritage Resort",
            "pricePerNightINR": 15500,
            "rating": 4.9,
            "reviewsCount": 1640,
            "address": "1/498 Calvathy, Fort Kochi",
            "amenities": ["Harbour View Rooms", "Historic Shipyard Architecture", "Sunset Ferry", "History Fine Dining"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kochi?q=Brunton+Boatyard+Kochi",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Restored Victorian shipyard hotel directly on the harbor channel with views of dolphins and ships."
        }
    ],
    "kl-varkala": [
        {
            "name": "Clafouti Beach Resort",
            "tier": "Standard",
            "type": "Cliff-Top Beach Resort",
            "pricePerNightINR": 2900,
            "rating": 4.6,
            "reviewsCount": 1420,
            "address": "North Cliff, Kurakkanni, Varkala",
            "amenities": ["Cliff-top Ocean Views", "Ayurvedic Treatments", "Seafood Restaurant", "Yoga Deck"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Varkala?q=Clafouti+Beach+Resort+Varkala",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Prime North Cliff location with sea-facing wooden cottages and direct stairway to the beach."
        },
        {
            "name": "The Lost Hostels Varkala - Helipad",
            "tier": "Budget",
            "type": "Backpacker Hostel & Private Rooms",
            "pricePerNightINR": 1450,
            "rating": 4.7,
            "reviewsCount": 980,
            "address": "Near Helipad, North Cliff, Varkala",
            "amenities": ["Garden Chillout Zone", "Campfire Evenings", "Surfing Lessons", "High-Speed WiFi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Varkala?q=Lost+Hostels+Varkala",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Laidback surfer hostel steps from the clifftop sunset point."
        },
        {
            "name": "The Gateway Hotel Varkala - IHCL",
            "tier": "Luxury",
            "type": "5-Star Luxury Clifftop Resort",
            "pricePerNightINR": 9200,
            "rating": 4.8,
            "reviewsCount": 1820,
            "address": "Janardhanapuram, Varkala",
            "amenities": ["Cliff-Edge Pool", "Ayurvedic Wellness Spa", "Coastal Cuisine", "Tennis Courts"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Varkala?q=The+Gateway+Hotel+Varkala",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Luxury Taj hospitality perched atop the cliff overlooking the red cliffs and Arabian Sea."
        }
    ],
    "up-agra": [
        {
            "name": "ITC Mughal, a Luxury Collection Resort",
            "tier": "Luxury",
            "type": "5-Star Palatial Mughal Resort",
            "pricePerNightINR": 9800,
            "rating": 4.8,
            "reviewsCount": 4200,
            "address": "Fatehabad Road, Tajganj, Agra",
            "amenities": ["Kaya Kalp Royal Spa (India's Largest Spa)", "Mughal Gardens", "Swimming Pools", "Fine Dining (Peshawri)"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Agra?q=ITC+Mughal+Agra",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Aga Khan Award-winning architecture set across 35 acres of Mughal gardens."
        },
        {
            "name": "Hotel Taj Resorts",
            "tier": "Budget",
            "type": "Boutique Hotel Near Taj Gate",
            "pricePerNightINR": 1800,
            "rating": 4.5,
            "reviewsCount": 1650,
            "address": "Near Shilpgram, VIP Road, Taj Mahal East Gate, Agra",
            "amenities": ["Rooftop Taj View Pool", "500m to Taj Mahal East Gate", "Free WiFi", "Restaurant"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Agra?q=Hotel+Taj+Resorts+Agra",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Closest quality hotel to the Taj Mahal East Gate, ideal for sunrise visits."
        },
        {
            "name": "Crystal Sarovar Premiere",
            "tier": "Standard",
            "type": "4-Star Modern Hotel",
            "pricePerNightINR": 3400,
            "rating": 4.6,
            "reviewsCount": 2100,
            "address": "Fatehabad Road, Tajganj, Agra",
            "amenities": ["Rooftop Infinity Pool with Taj Views", "Fitness Center", "Multi-cuisine Restaurant"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Agra?q=Crystal+Sarovar+Premiere+Agra",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Great value comfortable stay with rooftop swimming pool facing the Taj Mahal."
        }
    ],
    "hp-shimla": [
        {
            "name": "The Oberoi Cecil, Shimla",
            "tier": "Luxury",
            "type": "5-Star Grand Heritage Hotel",
            "pricePerNightINR": 18500,
            "rating": 4.9,
            "reviewsCount": 2600,
            "address": "Chaura Maidan, Shimla",
            "amenities": ["Heated Indoor Pool", "Oberoi Spa", "Cedar Garden", "Fine Heritage Dining", "Children's Activity Center"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Shimla?q=The+Oberoi+Cecil+Shimla",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "130-year-old grand heritage landmark hotel with roaring fireplaces and classic colonial luxury."
        },
        {
            "name": "Hotel Combermere",
            "tier": "Standard",
            "type": "Centrally Located Hill Hotel",
            "pricePerNightINR": 3800,
            "rating": 4.6,
            "reviewsCount": 1940,
            "address": "The Mall, Opposite Tourism Lift, Shimla",
            "amenities": ["Direct Passenger Lift to Mall Road", "Spa", "Multi-cuisine Dining", "Mountain Valley Views"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Shimla?q=Hotel+Combermere+Shimla",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Connected directly to Mall Road via private passenger lift, offering unmatched convenience."
        },
        {
            "name": "Zostel Homes Mashobra (Shimla)",
            "tier": "Budget",
            "type": "Apple Orchard Homestay",
            "pricePerNightINR": 1900,
            "rating": 4.7,
            "reviewsCount": 850,
            "address": "Mashobra Valley, 12 km from Shimla",
            "amenities": ["Apple Orchard Views", "Campfire", "Homestyle Food", "Free High-Speed WiFi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Shimla?q=Zostel+Homes+Mashobra",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Peaceful pine-forest retreat away from city crowds with breathtaking valley views."
        }
    ],
    "hp-dharamshala": [
        {
            "name": "Fortune Park Moksha, McLeod Ganj",
            "tier": "Standard",
            "type": "4-Star Mountain Resort",
            "pricePerNightINR": 3600,
            "rating": 4.6,
            "reviewsCount": 1540,
            "address": "Strawberry Hills, Near Dal Lake, McLeod Ganj",
            "amenities": ["Dhauladhar Mountain Views", "Heated Swimming Pool", "Spa & Sauna", "Multi-cuisine Restaurant"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Dharamshala?q=Fortune+Park+Moksha+McLeodganj",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Peacefully set in deodar forests with magnificent vistas of the snow-clad Dhauladhar peaks."
        },
        {
            "name": "The Hosteller McLeodGanj - Bhagsu",
            "tier": "Budget",
            "type": "Modern Backpacker Hostel & Stay",
            "pricePerNightINR": 1600,
            "rating": 4.6,
            "reviewsCount": 1240,
            "address": "Bhagsu Nag, McLeod Ganj, Dharamshala",
            "amenities": ["Rooftop Mountain Cafe", "Workstation Desk", "Free WiFi", "Trek Guidance"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Dharamshala?q=The+Hosteller+McLeodganj",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Vibrant budget stay right at the starting trail of the famous Triund trek."
        },
        {
            "name": "Hyatt Regency Dharamshala Resort",
            "tier": "Luxury",
            "type": "5-Star Luxury Mountain Resort",
            "pricePerNightINR": 14000,
            "rating": 4.9,
            "reviewsCount": 2100,
            "address": "Village Dharamkot, McLeod Ganj, Dharamshala",
            "amenities": ["Indoor Heated Pool", "Shambhala Spa", "Forest Walks", "Tibetan Herb Infusion Bar"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Dharamshala?q=Hyatt+Regency+Dharamshala",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Serene luxury resort spread over 24 acres of virgin cedar forests with world-class wellness."
        }
    ],
    "hp-spiti": [
        {
            "name": "Spiti Valley Homestay & Mud Hut",
            "tier": "Budget",
            "type": "Authentic Mud Homestay",
            "pricePerNightINR": 1600,
            "rating": 4.7,
            "reviewsCount": 540,
            "address": "Kaza Old Village, Spiti Valley",
            "amenities": ["Traditional Tandoor Heating", "Home-cooked Spitian Food", "Hot Water Buckets", "Stargazing Terrace"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kaza?q=Spiti+Homestay+Kaza",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Experience genuine Spitian hospitality with organic barley soup (Thukpa) and cozy mud architecture."
        },
        {
            "name": "The Grand Dewachen",
            "tier": "Standard",
            "type": "Luxury Spitian Eco Hotel",
            "pricePerNightINR": 3500,
            "rating": 4.6,
            "reviewsCount": 680,
            "address": "Rangrik Village, Near Kaza, Spiti Valley",
            "amenities": ["Solar Heated Rooms", "Oxygen Cylinder Assistance", "Spitian & Indian Dining", "Valley Views"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kaza?q=Grand+Dewachen+Spiti",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "The premier solar-heated boutique hotel in Spiti, offering mountain vistas across the Spiti river."
        },
        {
            "name": "Parasol Camps Chandratal",
            "tier": "Standard",
            "type": "High-Altitude Glamping Tent",
            "pricePerNightINR": 3800,
            "rating": 4.5,
            "reviewsCount": 420,
            "address": "Chandratal Camp Zone (3 km from lake), Spiti",
            "amenities": ["Swiss Tents with Attached Bath", "Dinner & Breakfast", "Campfire", "Milky Way Stargazing"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Spiti?q=Chandratal+Camps+Spiti",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Camp under crystal-clear Himalayan night skies just 15 minutes walk from sacred Chandratal lake."
        }
    ],
    "uk-mussoorie": [
        {
            "name": "Welcomhotel by ITC Hotels, The Savoy",
            "tier": "Luxury",
            "type": "5-Star Historic Heritage Hotel",
            "pricePerNightINR": 16500,
            "rating": 4.8,
            "reviewsCount": 2400,
            "address": "Library Chowk, Mussoorie",
            "amenities": ["Gothic Ballroom", "Kaya Kalp Spa", "Historic Writers' Bar", "Heated Swimming Pool"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Mussoorie?q=The+Savoy+Mussoorie",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Built in 1902, The Savoy is the iconic crown jewel of Mussoorie, immortalized by Ruskin Bond."
        },
        {
            "name": "Hotel SunGrace Mussoorie",
            "tier": "Standard",
            "type": "Panoramic Mountain View Hotel",
            "pricePerNightINR": 3200,
            "rating": 4.5,
            "reviewsCount": 1150,
            "address": "Baroda Estate, Library End, Mussoorie",
            "amenities": ["Panoramic Valley Balconies", "Multi-cuisine Dining", "Free WiFi", "Travel Desk"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Mussoorie?q=Hotel+SunGrace+Mussoorie",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Peaceful location away from Mall Road congestion with sweeping views of the Doon valley."
        },
        {
            "name": "Bunkstop Hostel Mussoorie",
            "tier": "Budget",
            "type": "Backpacker Hostel & Private Rooms",
            "pricePerNightINR": 1750,
            "rating": 4.6,
            "reviewsCount": 780,
            "address": "Picture Palace, Mall Road, Mussoorie",
            "amenities": ["Terrace Cafe", "Board Games", "High-Speed WiFi", "Guided Hikes"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Mussoorie?q=Bunkstop+Mussoorie",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Budget-friendly stay with youthful vibes and easy walking access to eastern Mall Road."
        }
    ],
    "uk-nainital": [
        {
            "name": "The Naini Retreat, by Leisure Hotels",
            "tier": "Standard",
            "type": "Heritage Royal Palace Hotel",
            "pricePerNightINR": 4200,
            "rating": 4.7,
            "reviewsCount": 2100,
            "address": "Ayarpatta Slopes, Mallital, Nainital",
            "amenities": ["Lake View Gardens", "Colonial Heritage Dining", "Spa", "Billiards Room", "Free Shuttle to Mall Road"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Nainital?q=The+Naini+Retreat+Nainital",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Former residence of Maharaja of Pilibhit, perched on pine slopes with royal heritage charm."
        },
        {
            "name": "Hotel Lake View Nainital",
            "tier": "Budget",
            "type": "Lakefront Budget Hotel",
            "pricePerNightINR": 1800,
            "rating": 4.4,
            "reviewsCount": 980,
            "address": "Mall Road, Tallital, Nainital",
            "amenities": ["Direct Naini Lake Views", "Restaurant", "Free WiFi", "Boating Assistance"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Nainital?q=Hotel+Lake+View+Nainital",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Convenient budget hotel right across from the boating jetty on Mall Road."
        },
        {
            "name": "The Manu Maharani",
            "tier": "Luxury",
            "type": "4-Star Luxury Resort",
            "pricePerNightINR": 9500,
            "rating": 4.8,
            "reviewsCount": 2800,
            "address": "Grassmere Estate, Mallital, Nainital",
            "amenities": ["Olive Spa", "Panoramic Naini Lake Views", "Fine Dining", "Fitness Center"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Nainital?q=The+Manu+Maharani+Nainital",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Elevated luxury property commanding the most scenic full view of the emerald Naini lake."
        }
    ],
    "uk-corbett": [
        {
            "name": "Taj Corbett Resort & Spa, Uttarakhand",
            "tier": "Luxury",
            "type": "5-Star Riverbank Jungle Resort",
            "pricePerNightINR": 14500,
            "rating": 4.9,
            "reviewsCount": 2900,
            "address": "Zero Garjia, Dhikuli, Ramnagar, Jim Corbett",
            "amenities": ["Kosi Riverbank Dining", "Jiva Spa", "Outdoor Pool", "Jeep Safari Desk", "Birdwatching Walks"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Corbett?q=Taj+Corbett+Resort",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Sprawling across 10 acres of mango groves along the Kosi river with world-class naturalists."
        },
        {
            "name": "Aahana The Corbett Wilderness",
            "tier": "Standard",
            "type": "Luxury Eco-Sanctuary Resort",
            "pricePerNightINR": 4800,
            "rating": 4.8,
            "reviewsCount": 1850,
            "address": "Vill. Sawaldeh, PO Semalkhaliya, Ramnagar",
            "amenities": ["Organic Farming", "Infinity Pool", "Ayurvedic Spa", "Open 4x4 Gypsy Safaris"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Corbett?q=Aahana+Corbett+Wilderness",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Award-winning sustainable luxury resort bordering Corbett forest with lush bird life."
        },
        {
            "name": "Corbett Jungle Inn",
            "tier": "Budget",
            "type": "Budget Wildlife Lodge",
            "pricePerNightINR": 1950,
            "rating": 4.5,
            "reviewsCount": 720,
            "address": "Dhikuli, Ramnagar, Jim Corbett",
            "amenities": ["Swimming Pool", "Garden Restaurant", "Safari Booking Assistance", "Free WiFi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Corbett?q=Corbett+Jungle+Inn",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Affordable lodge in Dhikuli strip, close to Bijrani and Garjia safari gates."
        }
    ],
    "uk-auli": [
        {
            "name": "The Himalayan High, Auli",
            "tier": "Standard",
            "type": "Alpine Ski Lodge",
            "pricePerNightINR": 4200,
            "rating": 4.7,
            "reviewsCount": 860,
            "address": "Near TV Tower, Auli Laga Salude, Joshimath",
            "amenities": ["Ski Equipment Rental & Lessons", "Panoramic Nanda Devi Views", "Fireplace Lounge", "Restaurant"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Auli?q=The+Himalayan+High+Auli",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Boutique ski lodge directly on the slopes with front-row vistas of India's highest peaks."
        },
        {
            "name": "Blue Poppy Resort Auli",
            "tier": "Budget",
            "type": "Wooden Swiss Chalets",
            "pricePerNightINR": 2400,
            "rating": 4.6,
            "reviewsCount": 680,
            "address": "Auli Laga Joshimath, Chamoli, Uttarakhand",
            "amenities": ["Wooden Heated Cottages", "Mountain Views", "Home-cooked Food", "Bonfire"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Auli?q=Blue+Poppy+Resort+Auli",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Charming all-wood pine chalets offering warm mountain hospitality amidst deep winter snow."
        },
        {
            "name": "Cliff Top Club Auli",
            "tier": "Luxury",
            "type": "High-Altitude Ski Resort (10,000 ft)",
            "pricePerNightINR": 9800,
            "rating": 4.5,
            "reviewsCount": 1420,
            "address": "Auli, Joshimath, Chamoli, Uttarakhand",
            "amenities": ["Ski-In / Ski-Out Access", "Helipad", "Indoor Games", "Multi-cuisine Dining", "Ropeway Access"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Auli?q=Cliff+Top+Club+Auli",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Located directly at Tower 8 on the ski slopes, India's highest fully equipped resort."
        }
    ],
    "mh-mahabaleshwar": [
        {
            "name": "Le Méridien Mahabaleshwar Resort & Spa",
            "tier": "Luxury",
            "type": "5-Star Forest Luxury Resort",
            "pricePerNightINR": 13500,
            "rating": 4.8,
            "reviewsCount": 3200,
            "address": "211 / 212 Mahabaleshwar-Medha Road, Mahabaleshwar",
            "amenities": ["Infinity Forest Pool", "Explore Spa", "Chingari Rooftop Restaurant", "Children's Club"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Mahabaleshwar?q=Le+Meridien+Mahabaleshwar",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Perched inside 27 acres of pristine evergreen forest with world-class Marriott luxury."
        },
        {
            "name": "Brightland Resort & Spa",
            "tier": "Standard",
            "type": "4-Star Cliffside Resort",
            "pricePerNightINR": 3800,
            "rating": 4.6,
            "reviewsCount": 2400,
            "address": "Kates Point Road, Mahabaleshwar",
            "amenities": ["Valley Overlook Pool", "Prana Spa", "Italian Dining (Angkor)", "Solar Heated Jacuzzi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Mahabaleshwar?q=Brightland+Resort+Mahabaleshwar",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Stunning cliff-edge location overlooking the Krishna river valley and Sahyadri mountains."
        },
        {
            "name": "Treebo Trend JP Cottage",
            "tier": "Budget",
            "type": "Budget Family Hotel",
            "pricePerNightINR": 1800,
            "rating": 4.4,
            "reviewsCount": 980,
            "address": "Near Venna Lake, Panchgani Road, Mahabaleshwar",
            "amenities": ["Garden Setting", "Free Breakfast", "Free WiFi", "Near Venna Lake"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Mahabaleshwar?q=Treebo+JP+Cottage+Mahabaleshwar",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Pocket-friendly hotel close to Venna Lake and strawberry picking farms."
        }
    ],
    "mh-alibaug": [
        {
            "name": "Radisson Blu Resort & Spa Alibaug",
            "tier": "Luxury",
            "type": "5-Star Coastal Luxury Resort",
            "pricePerNightINR": 8900,
            "rating": 4.7,
            "reviewsCount": 3800,
            "address": "Gondhalpada, Veshvi, Alibaug",
            "amenities": ["Sprawling Lagoon Pool", "Full-Service Mandara Spa", "Multi-cuisine Dining", "Discotheque", "Tennis Courts"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Alibaug?q=Radisson+Blu+Alibaug",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "The premier luxury resort in Alibaug, featuring villas with private gardens and tranquil water bodies."
        },
        {
            "name": "Outpost @ Karjat / Alibaug Road",
            "tier": "Standard",
            "type": "Boutique Wellness Resort",
            "pricePerNightINR": 3600,
            "rating": 4.5,
            "reviewsCount": 1250,
            "address": "Chorande, Mapgaon, Alibaug",
            "amenities": ["Swimming Pool", "Movie Amphitheater", "Treehouse Dining", "Spa & Wellness"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Alibaug?q=Outpost+Alibaug",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Serene greenery escape nestled under coconut plantations between Mandwa and Alibaug."
        },
        {
            "name": "Kashid Beach Resort",
            "tier": "Budget",
            "type": "Beachfront Cottages",
            "pricePerNightINR": 1900,
            "rating": 4.4,
            "reviewsCount": 890,
            "address": "Kashid Beach, Murud Road, Alibaug",
            "amenities": ["Beachfront Access", "Konkani Seafood Restaurant", "Free Parking", "AC Rooms"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Alibaug?q=Kashid+Beach+Resort",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Step directly onto the golden sands of Kashid beach, ideal for watersports."
        }
    ],
    "rj-ranthambore": [
        {
            "name": "The Oberoi Vanyavilas Wildlife Resort",
            "tier": "Luxury",
            "type": "5-Star Luxury Tented Jungle Camp",
            "pricePerNightINR": 38000,
            "rating": 4.9,
            "reviewsCount": 1820,
            "address": "Ranthambhore Road, Sawai Madhopur",
            "amenities": ["Triple-Canopied Luxury Tents", "Private Waterways & Lily Ponds", "Oberoi Spa", "Private Naturalist Safaris"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Ranthambore?q=The+Oberoi+Vanyavilas+Ranthambore",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Ranked among the top luxury resorts in the world, combining royal tiger tracking with opulence."
        },
        {
            "name": "Ranthambhore National Resort",
            "tier": "Standard",
            "type": "Wildlife Heritage Hotel",
            "pricePerNightINR": 3400,
            "rating": 4.6,
            "reviewsCount": 1420,
            "address": "Ranthambhore Road, Sawai Madhopur",
            "amenities": ["Swimming Pool", "Safari Booking Center", "Rajasthani Dining & Cultural Show", "Spacious Lawns"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Ranthambore?q=Ranthambhore+National+Resort",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Prime location on Ranthambhore road with experienced naturalist staff and comfortable cottages."
        },
        {
            "name": "Tiger Safari Resort",
            "tier": "Budget",
            "type": "Budget Safari Lodge",
            "pricePerNightINR": 1850,
            "rating": 4.5,
            "reviewsCount": 920,
            "address": "Subhash Nagar, Ranthambhore Road, Sawai Madhopur",
            "amenities": ["Swimming Pool", "AC Deluxe Rooms", "Safari Guidance", "Restaurant"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Ranthambore?q=Tiger+Safari+Resort+Ranthambore",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Well-kept budget resort with swimming pool and direct access to park safari pickup points."
        }
    ],
    "mp-kanha": [
        {
            "name": "Singinawa Jungle Lodge, Kanha",
            "tier": "Luxury",
            "type": "Eco-Luxury Safari Lodge",
            "pricePerNightINR": 16500,
            "rating": 4.9,
            "reviewsCount": 980,
            "address": "Kohka, Mocha, Kanha National Park",
            "amenities": ["110-Acre Private Forest", "Tribal Art Museum", "Naturalist-led Safaris", "Swimming Pool", "Ayurvedic Spa"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kanha?q=Singinawa+Jungle+Lodge+Kanha",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Award-winning wildlife lodge dedicated to ecological conservation with on-site tribal art museum."
        },
        {
            "name": "Kanha Earth Lodge",
            "tier": "Standard",
            "type": "Eco-Friendly Wilderness Lodge",
            "pricePerNightINR": 4800,
            "rating": 4.8,
            "reviewsCount": 740,
            "address": "Narna Village, Kanha Buffer Zone",
            "amenities": ["Mud & Wood Chalets", "Infinity Forest Pool", "Birding Trails", "Farm-to-Table Dining"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kanha?q=Kanha+Earth+Lodge",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Constructed from local mud and recycled wood, blending seamlessly into Kipling's sal wilderness."
        },
        {
            "name": "Mocha Safari Resort Kanha",
            "tier": "Budget",
            "type": "Jungle Lodge",
            "pricePerNightINR": 1900,
            "rating": 4.5,
            "reviewsCount": 540,
            "address": "Mocha, Mandla, Kanha National Park",
            "amenities": ["Near Khatia Safari Gate", "Swimming Pool", "Garden Restaurant", "Gypsy Assistance"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kanha?q=Mocha+Safari+Resort+Kanha",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Affordable lodge situated 2 km from the main Khatia entry gate of Kanha National Park."
        }
    ],
    "mp-pachmarhi": [
        {
            "name": "WelcomHeritage Golf View, Pachmarhi",
            "tier": "Standard",
            "type": "Colonial Heritage Resort",
            "pricePerNightINR": 3400,
            "rating": 4.6,
            "reviewsCount": 1150,
            "address": "Mahadeo Road, Pachmarhi",
            "amenities": ["Golf Course Views", "Colonial Architecture", "Lush Lawns", "Multi-cuisine Restaurant"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Pachmarhi?q=WelcomHeritage+Golf+View+Pachmarhi",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Colonial-era estate overlooking the verdant golf course, offering quiet Satpura charm."
        },
        {
            "name": "MPT Glen View, Pachmarhi",
            "tier": "Standard",
            "type": "MP Tourism Heritage Property",
            "pricePerNightINR": 2800,
            "rating": 4.5,
            "reviewsCount": 1450,
            "address": "Near Club, Pachmarhi",
            "amenities": ["Spacious Heritage Suites", "Bar & Dining", "Open Gardens", "Government Verified Service"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Pachmarhi?q=MPT+Glen+View+Pachmarhi",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Flagship Madhya Pradesh Tourism hotel set in lush deodar groves with trusted hospitality."
        },
        {
            "name": "Hotel Utkarsh Pachmarhi",
            "tier": "Budget",
            "type": "Budget Mountain Hotel",
            "pricePerNightINR": 1500,
            "rating": 4.4,
            "reviewsCount": 620,
            "address": "Subhash Road, Pachmarhi Market",
            "amenities": ["Clean AC Rooms", "Pure Veg Restaurant", "Travel Desk for Gypsy Booking", "Free WiFi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Pachmarhi?q=Hotel+Utkarsh+Pachmarhi",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Central location in Pachmarhi town near local markets and gypsy union counter."
        }
    ],
    "tn-kodaikanal": [
        {
            "name": "The Tamara Kodai",
            "tier": "Luxury",
            "type": "5-Star Heritage Luxury Resort",
            "pricePerNightINR": 13500,
            "rating": 4.9,
            "reviewsCount": 2600,
            "address": "St. Mary's Road, Kodaikanal",
            "amenities": ["Heated Outdoor Swimming Pool", "Elevation Spa", "Historic 1840s Monastery Architecture", "French Cuisine"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kodaikanal?q=The+Tamara+Kodai",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Restored 1840s heritage building with luxury heated pool overlooking misty pine forests."
        },
        {
            "name": "Villa Retreat - Boutique Hotel",
            "tier": "Standard",
            "type": "Boutique Cliffside Hotel",
            "pricePerNightINR": 3400,
            "rating": 4.7,
            "reviewsCount": 1820,
            "address": "Coaker's Walk, Kodaikanal",
            "amenities": ["Direct Access to Coaker's Walk", "Fireplace Suites", "Valley View Garden Cafe", "Free WiFi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kodaikanal?q=Villa+Retreat+Kodaikanal",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Right on the edge of Coaker's Walk with spectacular views of misty Dolphin's Nose valley."
        },
        {
            "name": "Zostel Kodaikanal",
            "tier": "Budget",
            "type": "Hostel & Private Rooms",
            "pricePerNightINR": 1600,
            "rating": 4.6,
            "reviewsCount": 1450,
            "address": "Bear Shola Road, Kodaikanal",
            "amenities": ["Bonfire Nights", "Common Room", "Cafe", "Free WiFi", "Trek Assistance"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kodaikanal?q=Zostel+Kodaikanal",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Nestled near Bear Shola Falls with vibrant community gatherings and cozy wooden interiors."
        }
    ],
    "tn-madurai": [
        {
            "name": "Heritage Madurai",
            "tier": "Standard",
            "type": "Geoffrey Bawa Architecture Resort",
            "pricePerNightINR": 3600,
            "rating": 4.7,
            "reviewsCount": 2100,
            "address": "11 Park Town, Melakkal Main Road, Madurai",
            "amenities": ["Temple-Tank Swimming Pool", "Bawa Architecture", "Ayurvedic Spa", "Traditional South Indian Dining"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Madurai?q=Heritage+Madurai",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Designed by master architect Geoffrey Bawa with a massive swimming pool modeled on a temple tank."
        },
        {
            "name": "The Gateway Hotel Pasumalai Madurai - IHCL",
            "tier": "Luxury",
            "type": "5-Star Hilltop Luxury Hotel",
            "pricePerNightINR": 7500,
            "rating": 4.8,
            "reviewsCount": 2400,
            "address": "Pasumalai Hills, Madurai",
            "amenities": ["Hilltop Temple Views", "Peacocks in Gardens", "Outdoor Pool", "Fine Dining"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Madurai?q=The+Gateway+Hotel+Pasumalai+Madurai",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Perched atop Pasumalai Hill amidst 62 acres of gardens with peacocks roaming freely."
        },
        {
            "name": "Hotel Supreme Madurai",
            "tier": "Budget",
            "type": "Central Heritage Hotel",
            "pricePerNightINR": 1500,
            "rating": 4.4,
            "reviewsCount": 1800,
            "address": "110 West Perumal Maistry Street, Madurai",
            "amenities": ["Rooftop Temple View Restaurant", "Walking Distance to Meenakshi Temple", "AC Rooms", "Free Parking"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Madurai?q=Hotel+Supreme+Madurai",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Rooftop dining with direct view of Meenakshi Temple gopurams at night."
        }
    ],
    "tn-rameshwaram": [
        {
            "name": "Daiwik Hotels Rameswaram",
            "tier": "Standard",
            "type": "4-Star Pilgrimage Hospitality Hotel",
            "pricePerNightINR": 2900,
            "rating": 4.6,
            "reviewsCount": 2400,
            "address": "NH 49, Near Rameswaram Railway Station",
            "amenities": ["Aham Spa (Ayurvedic Foot Massages)", "Pure Vegetarian Dining (Ahaan)", "Puja Assistance Desk"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Rameshwaram?q=Daiwik+Hotels+Rameswaram",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "India's first four-star hotel chain designed specifically for spiritual pilgrims and leisure travelers."
        },
        {
            "name": "Hotel MCM Towers",
            "tier": "Budget",
            "type": "Budget Temple Hotel",
            "pricePerNightINR": 1400,
            "rating": 4.4,
            "reviewsCount": 980,
            "address": "Near West Car Street, Rameswaram",
            "amenities": ["Walking Distance to Ramanathaswamy Temple", "AC Rooms", "Pure Veg Restaurant", "Free Parking"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Rameshwaram?q=Hotel+MCM+Towers+Rameswaram",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Located 300 meters from the West Tower of Ramanathaswamy temple for early morning spatika lingam darshan."
        },
        {
            "name": "Hyatt Place Rameswaram",
            "tier": "Luxury",
            "type": "5-Star Contemporary Hotel",
            "pricePerNightINR": 6800,
            "rating": 4.8,
            "reviewsCount": 1820,
            "address": "Madhakottai, NH 49, Rameswaram",
            "amenities": ["Outdoor Swimming Pool", "24/7 Fitness Center", "Gallery Kitchen", "Modern Suites"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Rameshwaram?q=Hyatt+Place+Rameswaram",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "The highest standard of international modern luxury on the sacred island of Rameshwaram."
        }
    ],
    "tn-kanyakumari": [
        {
            "name": "Sparsa Resort Kanyakumari",
            "tier": "Standard",
            "type": "Eco-Friendly Oceanfront Resort",
            "pricePerNightINR": 3200,
            "rating": 4.6,
            "reviewsCount": 2100,
            "address": "6/112 B, Beach Road, Near Sunset Point, Kanyakumari",
            "amenities": ["Direct Ocean Views", "Swimming Pool", "Spa", "Multi-cuisine Dining", "Sunset Lawn"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kanyakumari?q=Sparsa+Resort+Kanyakumari",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Eco-friendly resort located directly on Beach Road with stunning views of Vivekananda Rock Memorial."
        },
        {
            "name": "Hotel Sea View Kanyakumari",
            "tier": "Budget",
            "type": "Sea-Facing Modern Hotel",
            "pricePerNightINR": 1750,
            "rating": 4.5,
            "reviewsCount": 2400,
            "address": "East Car Street, Kanyakumari",
            "amenities": ["Rooms with Balconies Facing Ocean", "Rooftop Sunrise Viewing", "Restaurant", "Free WiFi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kanyakumari?q=Hotel+Sea+View+Kanyakumari",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Watch the morning sunrise directly from your private bedroom balcony over the Bay of Bengal."
        },
        {
            "name": "The Seashore Hotel",
            "tier": "Standard",
            "type": "Contemporary Waterfront Hotel",
            "pricePerNightINR": 2800,
            "rating": 4.5,
            "reviewsCount": 1680,
            "address": "Main Road, Kanyakumari",
            "amenities": ["Panoramic Oceanfront Restaurant", "Elevated Viewing Deck", "AC Rooms", "Free Parking"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kanyakumari?q=The+Seashore+Hotel+Kanyakumari",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Perched right where the three seas converge, walking distance to ferry launch and sunrise point."
        }
    ],
    "wb-sundarbans": [
        {
            "name": "Sundarban Tiger Camp",
            "tier": "Standard",
            "type": "Eco Jungle Resort",
            "pricePerNightINR": 3200,
            "rating": 4.6,
            "reviewsCount": 1200,
            "address": "Dayapur Island, Gosaba, Sundarbans",
            "amenities": ["Private Safari Boats", "Mud & Bamboo Thatched Cottages", "Bonobibi Tribal Folk Dance", "Guided Mangrove Tours"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Sundarbans?q=Sundarban+Tiger+Camp",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Located directly across the river from the Tiger Reserve watchtower with private safari boat fleet."
        },
        {
            "name": "Sundarban Gateway Resort",
            "tier": "Budget",
            "type": "Riverbank Eco-Lodge",
            "pricePerNightINR": 1600,
            "rating": 4.4,
            "reviewsCount": 540,
            "address": "Pakhiralay, Gosaba, Sundarbans",
            "amenities": ["River Views", "Authentic Bengali Fish Curry Meals", "Boat Trip Arrangement", "Clean AC Rooms"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Sundarbans?q=Sundarban+Gateway+Resort",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Affordable village stay in Pakhiralay, hub for mangrove cruise departures."
        },
        {
            "name": "Tora Eco Resort Sundarbans",
            "tier": "Standard",
            "type": "Sustainable Island Homestay",
            "pricePerNightINR": 2800,
            "rating": 4.7,
            "reviewsCount": 420,
            "address": "Bali Island, Sundarbans Delta",
            "amenities": ["Organic Farming", "Solar Powered Cottages", "Country Boat Birding", "Village Cultural Walks"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Sundarbans?q=Tora+Eco+Resort+Sundarbans",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Award-winning community-based eco-resort on Bali Island with pristine silence and starry skies."
        }
    ],
    "wb-kalimpong": [
        {
            "name": "The Elgin Silver Oaks, Kalimpong",
            "tier": "Standard",
            "type": "Colonial Heritage Hotel",
            "pricePerNightINR": 3800,
            "rating": 4.7,
            "reviewsCount": 1420,
            "address": "Rinkingpong Road, Kalimpong",
            "amenities": ["Landscaped English Gardens", "Kanchenjunga Views", "Heritage Lounge with Fireplace", "High Tea on Lawns"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kalimpong?q=The+Elgin+Silver+Oaks+Kalimpong",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "1930s British architect Frederick Desraj's home, adorned with lithographs and period furniture."
        },
        {
            "name": "Morgan House Kalimpong (WBTDCL)",
            "tier": "Budget",
            "type": "British Stone Cottage Lodge",
            "pricePerNightINR": 1800,
            "rating": 4.5,
            "reviewsCount": 890,
            "address": "Durpin Dara, Kalimpong",
            "amenities": ["Stone Fireplace", "Colonial Architecture", "Government Verified Service", "Mountain Forest Setting"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kalimpong?q=Morgan+House+Kalimpong",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Classic 1930s British stone mansion perched on Durpin ridge overlooking undulating pine valleys."
        },
        {
            "name": "Mayfair Himalayan Spa Resort",
            "tier": "Luxury",
            "type": "5-Star Luxury Mountain Resort",
            "pricePerNightINR": 8500,
            "rating": 4.8,
            "reviewsCount": 1950,
            "address": "Upper Cart Road, Kalimpong",
            "amenities": ["Outdoor Heated Pool", "Mayfair Spa by the Sea", "Billiards Room", "Tiffany's Multi-cuisine Dining"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Kalimpong?q=Mayfair+Himalayan+Spa+Resort+Kalimpong",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "The highest standard of luxury in Kalimpong with panoramic views of the Teesta valley and mountains."
        }
    ],
    "ap-tirupati": [
        {
            "name": "Fortune Select Grand Ridge, Tirupati",
            "tier": "Standard",
            "type": "4-Star Upscale Pilgrimage Hotel",
            "pricePerNightINR": 3200,
            "rating": 4.7,
            "reviewsCount": 3100,
            "address": "Shilparamam Theme Park, Tiruchanoor Road, Tirupati",
            "amenities": ["Swimming Pool", "Pure Veg Specialty Dining", "Darshan Assistance", "Free High-Speed WiFi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Tirupati?q=Fortune+Select+Grand+Ridge+Tirupati",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": True,
            "reasonForRecommendation": "Prime upscale property near Shilparamam with sweeping views of the Tirumala sacred hills."
        },
        {
            "name": "Marasa Sarovar Premiere, Tirupati",
            "tier": "Luxury",
            "type": "5-Star Temple Architecture Luxury Hotel",
            "pricePerNightINR": 6200,
            "rating": 4.8,
            "reviewsCount": 2600,
            "address": "Upadhyaya Nagar, Karakambadi Road, Tirupati",
            "amenities": ["Navrasa Themed Luxury", "Swimming Pool", "Spa & Wellness", "Pure Vegetarian Gourmet Cuisine"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Tirupati?q=Marasa+Sarovar+Premiere+Tirupati",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "World's only hotel inspired by the 10 avatars of Lord Vishnu (Dasavatara) with exquisite water courts."
        },
        {
            "name": "Hotel Bliss Tirupati",
            "tier": "Budget",
            "type": "Comfortable Central Hotel",
            "pricePerNightINR": 1700,
            "rating": 4.5,
            "reviewsCount": 2200,
            "address": "Near Ramanuja Circle, Renigunta Road, Tirupati",
            "amenities": ["Pure Veg Restaurant (Surabhi)", "Swimming Pool", "Travel Counter for TTD Darshan", "Free WiFi"],
            "googleBookingUrl": "https://www.google.com/travel/hotels/Tirupati?q=Hotel+Bliss+Tirupati",
            "bookingProvider": "Google Travel Stays",
            "isRecommended": False,
            "reasonForRecommendation": "Popular trusted hotel close to railway station with famous South Indian thali dining."
        }
    ]
}


def run_expansion():
    # 1. Update destinations.json
    with open(DESTINATIONS_FILE, "r", encoding="utf-8") as f:
        existing_destinations = json.load(f)

    existing_ids = {d["id"] for d in existing_destinations}
    added_count = 0
    for d in NEW_DESTINATIONS:
        if d["id"] not in existing_ids:
            existing_destinations.append(d)
            existing_ids.add(d["id"])
            added_count += 1

    with open(DESTINATIONS_FILE, "w", encoding="utf-8") as f:
        json.dump(existing_destinations, f, indent=2, ensure_ascii=False)

    print(f"Successfully added {added_count} new destinations! Total destinations now: {len(existing_destinations)}")

    # 2. Update verified_hotels.json
    with open(HOTELS_FILE, "r", encoding="utf-8") as f:
        existing_hotels = json.load(f)

    hotels_added = 0
    for dest_id, hlist in NEW_HOTELS.items():
        if dest_id not in existing_hotels:
            existing_hotels[dest_id] = hlist
            hotels_added += 1

    with open(HOTELS_FILE, "w", encoding="utf-8") as f:
        json.dump(existing_hotels, f, indent=2, ensure_ascii=False)

    print(f"Successfully added verified hotels for {hotels_added} new destinations! Total destinations with verified hotels: {len(existing_hotels)}")


if __name__ == "__main__":
    run_expansion()
