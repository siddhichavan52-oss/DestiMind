"""
Builder script to generate the comprehensive DestiMind India Knowledge Base
covering all 36 States & Union Territories with prominent attractions,
verified Hidden Gems / Offbeat destinations, transit hubs (airports & railways),
seasonal crowd profiles, and daily cost baselines.
"""

import json
from pathlib import Path

DESTINATIONS = [
    # 1. Andaman and Nicobar Islands
    {
        "id": "an-havelock",
        "name": "Havelock Island (Swaraj Dweep)",
        "state": "Andaman and Nicobar Islands",
        "city": "Port Blair",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Relaxation", "Nature", "Adventure"],
        "purposes": ["Beach holiday", "Honeymoon", "Scuba diving"],
        "dailyCostPerPerson": 4500,
        "stayCostPerDay": 2600,
        "foodCostPerDay": 1200,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "October to May",
        "duration": "3-5 Days",
        "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
        "description": "Famed for Radhanagar Beach and pristine coral reefs, Havelock offers turquoise waters, scuba diving, and tranquil tropical island life.",
        "highlights": ["Radhanagar Beach sunset", "Elephant Beach snorkeling", "Scuba diving at Nemo Reef"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Bengali, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3, 4],
            "offPeakMonths": [5, 6, 7, 8, 9],
            "peakReason": "Peak sunny island weather, calm seas, and perfect water visibility for diving.",
            "offPeakReason": "Monsoon brings rough sea conditions and occasional ferry delays, leading to low crowds and heavy hotel discounts.",
            "crowdAdvisory": "Visit Radhanagar Beach in the early morning for peaceful photography before afternoon visitor peaks."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Veer Savarkar International Airport (IXZ)",
                "airportCode": "IXZ",
                "distanceKm": 54,
                "connectivity": "Daily direct flights from Chennai, Kolkata, Bangalore & Delhi; 90-min catamaran ferry from Port Blair to Havelock."
            },
            "train": {
                "nearestStation": "Chennai Central (MAS) / Howrah (HWH)",
                "stationCode": "MAS",
                "distanceKm": 1360,
                "majorTrains": "Island destination: connect via mainland rail terminus (Chennai or Kolkata) followed by flight to Port Blair."
            },
            "road": {
                "highway": "Island Coastal Road",
                "driveHours": "Island transport via rental scooter, e-rickshaw, or private cab."
            }
        }
    },
    {
        "id": "an-neil",
        "name": "Neil Island (Shaheed Dweep)",
        "state": "Andaman and Nicobar Islands",
        "city": "Port Blair",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Nature", "Relaxation"],
        "purposes": ["Offbeat escape", "Honeymoon", "Nature walks"],
        "dailyCostPerPerson": 3500,
        "stayCostPerDay": 2000,
        "foodCostPerDay": 900,
        "crowd": "Low Crowd",
        "rating": 4.7,
        "bestTime": "October to April",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        "description": "The quieter, lush sister island to Havelock, known for its tranquil agricultural villages, natural rock formations, and unhurried bicycle-friendly roads.",
        "highlights": ["Natural rock bridge (Howrah Bridge)", "Bharatpur Beach corals", "Laxmanpur Beach sunset"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Bengali, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A secret slow-travel haven with virtually zero traffic, pristine deserted beaches, and bio-diverse tide pools.",
        "seasonality": {
            "peakMonths": [12, 1],
            "shoulderMonths": [10, 11, 2, 3],
            "offPeakMonths": [4, 5, 6, 7, 8, 9],
            "peakReason": "Mid-winter brings mild breeze and tranquil coral lagoons.",
            "offPeakReason": "Monsoon showers keep tourists away; very serene and intimate.",
            "crowdAdvisory": "Bicycle around the island at dawn for absolute solitude on Sitapur Beach."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Veer Savarkar International Airport (IXZ)",
                "airportCode": "IXZ",
                "distanceKm": 40,
                "connectivity": "Fly to Port Blair (IXZ), then take 60-min government or private catamaran ferry directly to Neil Island jetty."
            },
            "train": {
                "nearestStation": "Chennai Central (MAS)",
                "stationCode": "MAS",
                "distanceKm": 1350,
                "majorTrains": "Mainland rail to Chennai/Kolkata, then flight to Port Blair."
            },
            "road": {
                "highway": "Neil Circular Road",
                "driveHours": "Easily explored on foot, rented bicycle, or hired e-rickshaw."
            }
        }
    },

    # 2. Andhra Pradesh
    {
        "id": "ap-vizag",
        "name": "Visakhapatnam (Vizag)",
        "state": "Andhra Pradesh",
        "city": "Visakhapatnam",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Nature", "Relaxation", "Food", "Culture"],
        "purposes": ["City break", "Beach holiday", "Family holiday"],
        "dailyCostPerPerson": 2800,
        "stayCostPerDay": 1600,
        "foodCostPerDay": 800,
        "crowd": "Medium Crowd",
        "rating": 4.5,
        "bestTime": "October to March",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
        "description": "Where the Eastern Ghats meet the Bay of Bengal, Vizag features scenic coastal drives, submarine museums, and panoramic viewpoints like Kailasagiri.",
        "highlights": ["R.K. Beach & Submarine Museum", "Kailasagiri ropeway", "Rushikonda Beach water sports"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Telugu, Hindi, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [4, 5, 6, 7, 8, 9],
            "peakReason": "Pleasant coastal breeze and comfortable temperatures.",
            "offPeakReason": "Hot humid summers followed by tropical rains.",
            "crowdAdvisory": "Head to Rushikonda in morning hours for peaceful surfing."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Visakhapatnam International Airport (VTZ)",
                "airportCode": "VTZ",
                "distanceKm": 12,
                "connectivity": "Direct daily flights from Hyderabad, Bangalore, Chennai, Delhi, and Mumbai."
            },
            "train": {
                "nearestStation": "Visakhapatnam Junction (VSKP)",
                "stationCode": "VSKP",
                "distanceKm": 4,
                "majorTrains": "Vande Bharat Express (VSKP-SC), Coromandel Express, Howrah-Chennai Mail."
            },
            "road": {
                "highway": "NH 16 (Golden Quadrilateral)",
                "driveHours": "Superb 6-lane coastal highway connectivity."
            }
        }
    },
    {
        "id": "ap-gandikota",
        "name": "Gandikota (The Grand Canyon of India)",
        "state": "Andhra Pradesh",
        "city": "Kadapa",
        "weatherTags": ["Mild", "Beach & Warm", "Any"],
        "vibes": ["Adventure", "Nature", "Culture", "Photography"],
        "purposes": ["Offbeat escape", "Adventure", "Photography", "Weekend trip"],
        "dailyCostPerPerson": 2200,
        "stayCostPerDay": 1200,
        "foodCostPerDay": 600,
        "crowd": "Low Crowd",
        "rating": 4.8,
        "bestTime": "September to February",
        "duration": "2 Days",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        "description": "A magnificent gorge formed by the Penna River slicing through the Erramala hills, crowned by a 13th-century red-granite fort.",
        "highlights": ["Sunrise over the Penna River gorge", "Gandikota Fort ruins & Jama Masjid", "Belum Caves excursion nearby"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Telugu, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A dramatic geological wonder with cliffside camping under starlit skies and breathtaking red-rock canyon views without commercial tourist swarms.",
        "seasonality": {
            "peakMonths": [12, 1],
            "shoulderMonths": [10, 11, 2],
            "offPeakMonths": [3, 4, 5, 6, 7, 8],
            "peakReason": "Crisp winter mornings ideal for canyon trekking and tent camping on the gorge rim.",
            "offPeakReason": "Summers are dry and scorching; visit strictly in winter.",
            "crowdAdvisory": "Camp on the gorge plateau on a weekday for an almost private canyon view."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Kadapa Airport (CDP) / Bangalore (BLR)",
                "airportCode": "BLR",
                "distanceKm": 280,
                "connectivity": "Kempegowda Int'l Airport (BLR) offers pan-India flights; then a scenic 5-hour drive via NH 44."
            },
            "train": {
                "nearestStation": "Jammalamadugu (JMDG) / Muddanuru (MOO)",
                "stationCode": "MOO",
                "distanceKm": 40,
                "majorTrains": "Well connected to Hyderabad, Chennai, and Tirupati."
            },
            "road": {
                "highway": "NH 44 to NH 67",
                "driveHours": "5.5 hours from Bangalore; 6.5 hours from Hyderabad."
            }
        }
    },

    # 3. Arunachal Pradesh
    {
        "id": "arunachal-tawang",
        "name": "Tawang",
        "state": "Arunachal Pradesh",
        "city": "Tawang",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Nature", "Culture", "Adventure"],
        "purposes": ["Himalayan roadtrip", "Spiritual", "Photography"],
        "dailyCostPerPerson": 3600,
        "stayCostPerDay": 2000,
        "foodCostPerDay": 900,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "March to June and September to November",
        "duration": "4-6 Days",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
        "description": "Perched at 10,000 feet, Tawang is renowned for the 400-year-old Tawang Monastery, frozen Sela Pass, and dramatic Eastern Himalayan vistas.",
        "highlights": ["Tawang Monastery (Galden Namgyal Lhatse)", "Sela Pass & Sela Lake at 13,700 ft", "Madhuri (Sangetsar) Lake"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Monpa, Hindi, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [4, 5, 10, 11],
            "shoulderMonths": [3, 9],
            "offPeakMonths": [12, 1, 2, 6, 7, 8],
            "peakReason": "Clear mountain views and blooming rhododendrons in spring, crisp golden fall in October.",
            "offPeakReason": "Heavy snow blocks Sela Pass in deep winter; monsoon triggers landslides.",
            "crowdAdvisory": "Obtain Inner Line Permit (ILP) online prior to arrival."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Tezpur Airport (TEZ) / Guwahati (GAU)",
                "airportCode": "GAU",
                "distanceKm": 440,
                "connectivity": "Lokpriya Gopinath Bordoloi Int'l Airport (GAU) has pan-India connectivity; helicopter service also operates between Guwahati/Naharlagun and Tawang."
            },
            "train": {
                "nearestStation": "Rangapara North (RPAN) / Naharlagun (NHLN)",
                "stationCode": "NHLN",
                "distanceKm": 380,
                "majorTrains": "Donyi Polo Express, Naharlagun-New Delhi AC Superfast."
            },
            "road": {
                "highway": "NH 13 (Trans-Arunachal Highway)",
                "driveHours": "A scenic high-altitude drive through Bhalukpong, Bomdila, and Dirang."
            }
        }
    },
    {
        "id": "arunachal-ziro",
        "name": "Ziro Valley",
        "state": "Arunachal Pradesh",
        "city": "Lower Subansiri",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Culture", "Nature", "Relaxation"],
        "purposes": ["Offbeat cultural immersion", "Music festival", "Nature walks"],
        "dailyCostPerPerson": 2900,
        "stayCostPerDay": 1600,
        "foodCostPerDay": 700,
        "crowd": "Low Crowd",
        "rating": 4.9,
        "bestTime": "March to October",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        "description": "A UNESCO-tentative picturesque highland valley home to the Apatani tribe, characterized by layered wet-rice fields, bamboo groves, and unique cultural traditions.",
        "highlights": ["Apatani tribal villages (Hong & Hari)", "Tarin Fish Farm paddy terraces", "Kardo Shiva Lingam"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Apatani, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A tranquil haven of indigenous bio-diverse farming, gentle pine forest walks, and organic homestays where guests dine on locally harvested bamboo shoot delicacies.",
        "seasonality": {
            "peakMonths": [9, 10],
            "shoulderMonths": [3, 4, 5],
            "offPeakMonths": [11, 12, 1, 2, 6, 7],
            "peakReason": "Golden harvest season and the renowned Ziro Music Festival in late September.",
            "offPeakReason": "Chilly winters and monsoon showers; extremely peaceful with very few visitors.",
            "crowdAdvisory": "Stay in an authentic Apatani homestay in Hong village for genuine village warmth."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Donyi Polo Airport Itanagar (HGI) / Lilabari (IXI)",
                "airportCode": "HGI",
                "distanceKm": 115,
                "connectivity": "Direct flights to Itanagar (HGI) from Kolkata & Guwahati; then a 4-hour scenic mountain drive."
            },
            "train": {
                "nearestStation": "Naharlagun Railway Station (NHLN)",
                "stationCode": "NHLN",
                "distanceKm": 100,
                "majorTrains": "Connected directly to New Delhi and Guwahati."
            },
            "road": {
                "highway": "Potin-Pangin Highway",
                "driveHours": "4 hours from Naharlagun/Itanagar; 3.5 hours from North Lakhimpur."
            }
        }
    },

    # 4. Assam
    {
        "id": "assam-kaziranga",
        "name": "Kaziranga National Park",
        "state": "Assam",
        "city": "Golaghat",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Nature", "Adventure"],
        "purposes": ["Wildlife safari", "Photography", "Family trip"],
        "dailyCostPerPerson": 4200,
        "stayCostPerDay": 2400,
        "foodCostPerDay": 1000,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "November to April",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
        "description": "UNESCO World Heritage Site hosting two-thirds of the world's great one-horned rhinoceroses alongside wild elephants, tigers, and rich migratory birdlife.",
        "highlights": ["Kohora central zone elephant safari", "Bagori western zone jeep safari", "Assam orchid and biodiversity park"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Assamese, Hindi, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [12, 1, 2],
            "shoulderMonths": [11, 3, 4],
            "offPeakMonths": [5, 6, 7, 8, 9, 10],
            "peakReason": "Crisp sunny weather, short grasses for maximum wildlife visibility.",
            "offPeakReason": "Park closes from May to October due to monsoon Brahmaputra flooding.",
            "crowdAdvisory": "Book the 6:00 AM elephant safari in Bagori range for up-close rhino sightings."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jorhat Airport (JRH) / Guwahati (GAU)",
                "airportCode": "JRH",
                "distanceKm": 95,
                "connectivity": "Jorhat has regional flights from Kolkata; Guwahati GAU (215 km) has pan-India non-stop flights."
            },
            "train": {
                "nearestStation": "Furkating Junction (FKG) / Guwahati (GHY)",
                "stationCode": "FKG",
                "distanceKm": 75,
                "majorTrains": "Rajdhani Express, Kamrup Express, Jan Shatabdi."
            },
            "road": {
                "highway": "NH 715 (Old NH 37)",
                "driveHours": "4.5 hours smooth drive from Guwahati."
            }
        }
    },
    {
        "id": "assam-majuli",
        "name": "Majuli Island",
        "state": "Assam",
        "city": "Jorhat",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Culture", "Nature", "Relaxation"],
        "purposes": ["Spiritual & culture", "Photography", "Slow travel"],
        "dailyCostPerPerson": 2400,
        "stayCostPerDay": 1300,
        "foodCostPerDay": 650,
        "crowd": "Low Crowd",
        "rating": 4.7,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        "description": "The world's largest river island cradled by the Brahmaputra, revered as the epicentre of Neo-Vaishnavite culture with historic Satras, traditional mask-making, and river sunsets.",
        "highlights": ["Kamalabari & Dakhinpat Satras", "Samaguri Satra organic mask-crafting", "Sunset boat ride on Luit river"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Assamese, Mishing, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "An idyllic spiritual island with stilted bamboo eco-cottages, traditional Mishing tribal weaves, and timeless monastic chanting untouched by modern hurry.",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [4, 5, 6, 7, 8, 9],
            "peakReason": "Raas Mahotsav in November brings vibrant musical dance-dramas and serene river mist.",
            "offPeakReason": "Monsoon Brahmaputra currents make ferry crossings difficult.",
            "crowdAdvisory": "Rent a cycle to pedal across the green embankment paths between Mishing villages."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jorhat Airport (JRH)",
                "airportCode": "JRH",
                "distanceKm": 35,
                "connectivity": "Fly to Jorhat, then take a 45-min vehicle ferry from Nimati Ghat to Aphalamukh Ghat."
            },
            "train": {
                "nearestStation": "Jorhat Town (JTTN)",
                "stationCode": "JTTN",
                "distanceKm": 30,
                "majorTrains": "Well connected to Guwahati and Dibrugarh."
            },
            "road": {
                "highway": "Nimati Ghat Ferry Route",
                "driveHours": "1.5 hours from Jorhat including scenic ferry crossing."
            }
        }
    },

    # 5. Bihar
    {
        "id": "bihar-bodhgaya",
        "name": "Bodh Gaya",
        "state": "Bihar",
        "city": "Gaya",
        "weatherTags": ["Mild", "Beach & Warm", "Any"],
        "vibes": ["Culture", "Relaxation"],
        "purposes": ["Spiritual", "Heritage", "Meditation"],
        "dailyCostPerPerson": 2500,
        "stayCostPerDay": 1400,
        "foodCostPerDay": 650,
        "crowd": "Medium Crowd",
        "rating": 4.8,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
        "description": "One of Buddhism's holiest pilgrimage hubs, home to the UNESCO Mahabodhi Temple Complex and the sacred Bodhi Tree where Prince Siddhartha attained enlightenment.",
        "highlights": ["Mahabodhi Temple & Sacred Bodhi Tree", "Great Buddha 80-ft Statue", "International monasteries (Thai, Japanese, Bhutanese)"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Magahi, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [12, 1, 2],
            "shoulderMonths": [10, 11, 3],
            "offPeakMonths": [4, 5, 6, 7, 8, 9],
            "peakReason": "Pleasant cool climate; international monastic teaching season and Kalachakra festivals.",
            "offPeakReason": "Hot dry plains summer; very few visitors and quiet monastery gardens.",
            "crowdAdvisory": "Attend early morning chanting inside Mahabodhi temple at 5:30 AM for sublime serenity."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Gaya Airport (GAY) / Patna Airport (PAT)",
                "airportCode": "GAY",
                "distanceKm": 10,
                "connectivity": "Gaya Airport operates seasonal direct flights from Bangkok, Colombo, and Delhi; Patna (110 km) has year-round domestic links."
            },
            "train": {
                "nearestStation": "Gaya Junction (GAYA)",
                "stationCode": "GAYA",
                "distanceKm": 15,
                "majorTrains": "Grand Chord rail line: Vande Bharat Express, Rajdhani Express (Howrah-New Delhi)."
            },
            "road": {
                "highway": "NH 22 / Grand Trunk Road",
                "driveHours": "3 hours from Patna; 5 hours from Varanasi."
            }
        }
    },
    {
        "id": "bihar-valmiki",
        "name": "Valmiki National Park & Tiger Reserve",
        "state": "Bihar",
        "city": "West Champaran",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Nature", "Adventure"],
        "purposes": ["Wildlife safari", "Offbeat nature", "Eco-tourism"],
        "dailyCostPerPerson": 2600,
        "stayCostPerDay": 1500,
        "foodCostPerDay": 700,
        "crowd": "Low Crowd",
        "rating": 4.6,
        "bestTime": "November to April",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
        "description": "Bihar's sole tiger reserve, situated against the backdrop of the Chitwan Himalayan foothills along the Gandak River, featuring sal forests and cane bogs.",
        "highlights": ["Gandak River boating & bird watching", "Jungle safari in Manguraha & Raghia ranges", "Valmiki Ashram historical ruins"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Bhojpuri, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A secret wilderness corridor bordering Nepal with pristine jungle canopies, low footfall, and eco-huts overlooking Himalayan foothills.",
        "seasonality": {
            "peakMonths": [12, 1],
            "shoulderMonths": [11, 2, 3],
            "offPeakMonths": [4, 5, 6, 7, 8, 9, 10],
            "peakReason": "Mild winter temperatures and clear river vistas.",
            "offPeakReason": "Park closed during monsoons due to river flooding.",
            "crowdAdvisory": "Stay at the Forest Department eco-resort at Valmikinagar."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Gorakhpur Airport (GOP) / Patna (PAT)",
                "airportCode": "GOP",
                "distanceKm": 130,
                "connectivity": "Gorakhpur GOP has daily flights from Delhi, Mumbai, and Kolkata; 3.5 hrs drive to Valmikinagar."
            },
            "train": {
                "nearestStation": "Valmikinagar Road (VKNR) / Narkatiaganj (NKE)",
                "stationCode": "VKNR",
                "distanceKm": 25,
                "majorTrains": "Connected with Gorakhpur and Muzaffarpur."
            },
            "road": {
                "highway": "NH 727",
                "driveHours": "5.5 hours drive from Patna."
            }
        }
    },

    # 6. Chandigarh
    {
        "id": "chandigarh-city",
        "name": "Chandigarh Capital City",
        "state": "Chandigarh",
        "city": "Chandigarh",
        "weatherTags": ["Mild", "Beach & Warm", "Any"],
        "vibes": ["Culture", "Food", "Relaxation"],
        "purposes": ["Weekend break", "Architecture tour", "Food walk"],
        "dailyCostPerPerson": 3200,
        "stayCostPerDay": 1800,
        "foodCostPerDay": 900,
        "crowd": "Medium Crowd",
        "rating": 4.6,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
        "description": "India's premier planned modern city conceived by Le Corbusier, known for its open green sectors, the innovative Rock Garden, and scenic Sukhna Lake.",
        "highlights": ["Nek Chand Rock Garden", "Sukhna Lake sunset boating", "Sector 17 Plaza & Le Corbusier Centre"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Punjabi, Hindi, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3],
            "offPeakMonths": [4, 5, 6, 7, 8, 9],
            "peakReason": "Pleasant sunny winter afternoons, rose garden bloom festival.",
            "offPeakReason": "High summer heat in May-June.",
            "crowdAdvisory": "Walk around Sukhna Lake promenade early at 6:30 AM."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Shaheed Bhagat Singh International Airport (IXC)",
                "airportCode": "IXC",
                "distanceKm": 14,
                "connectivity": "Direct non-stop flights from Delhi, Mumbai, Bangalore, Hyderabad, Ahmedabad, and Dubai."
            },
            "train": {
                "nearestStation": "Chandigarh Junction (CDG)",
                "stationCode": "CDG",
                "distanceKm": 8,
                "majorTrains": "Vande Bharat Express (New Delhi-Chandigarh), Kalka Shatabdi Express (twice daily)."
            },
            "road": {
                "highway": "NH 44 & Himalayan Expressway",
                "driveHours": "3.5 hours drive from Delhi via smooth 6-lane highway."
            }
        }
    },

    # 7. Chhattisgarh
    {
        "id": "cg-chitrakote",
        "name": "Chitrakote Falls & Bastar",
        "state": "Chhattisgarh",
        "city": "Bastar",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Nature", "Culture", "Adventure"],
        "purposes": ["Waterfall tour", "Tribal culture", "Photography"],
        "dailyCostPerPerson": 2600,
        "stayCostPerDay": 1400,
        "foodCostPerDay": 700,
        "crowd": "Low Crowd",
        "rating": 4.7,
        "bestTime": "July to February",
        "duration": "2-4 Days",
        "image": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
        "description": "Known as the 'Niagara of India', Chitrakote is a 300-meter-wide horseshoe waterfall on the Indravati River, surrounded by the deep tribal art traditions of Bastar.",
        "highlights": ["Chitrakote horseshoe waterfall views", "Bastar bell-metal (Dhokra) craft villages", "Tirathgarh multi-tiered waterfall & Kanger Valley caves"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Chhattisgarhi, Gondi, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A thundering natural wonder and ancient tribal heritage with minimal commercial tourist presence and authentic forest cottage stays.",
        "seasonality": {
            "peakMonths": [8, 9, 10],
            "shoulderMonths": [11, 12, 1],
            "offPeakMonths": [3, 4, 5, 6],
            "peakReason": "Post-monsoon water volume is at its maximum, creating a roaring, majestic mist curtain.",
            "offPeakReason": "Hot dry summers.",
            "crowdAdvisory": "Take a local boat ride at the foot of the falls during afternoon rainbow hours."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jagdalpur Airport (JGB) / Raipur Airport (RPR)",
                "airportCode": "RPR",
                "distanceKm": 290,
                "connectivity": "Swami Vivekananda Airport Raipur (RPR) connects to all metro hubs; Jagdalpur (JGB, 40 km) has direct regional flights from Raipur & Hyderabad."
            },
            "train": {
                "nearestStation": "Jagdalpur Railway Station (JDB)",
                "stationCode": "JDB",
                "distanceKm": 38,
                "majorTrains": "Kirandul-Visakhapatnam Express (runs with Vistadome coach through scenic Ananthagiri hills)."
            },
            "road": {
                "highway": "NH 30",
                "driveHours": "6 hours drive from Raipur through scenic sal forests."
            }
        }
    },

    # 8. Dadra and Nagar Haveli and Daman and Diu
    {
        "id": "dd-diu",
        "name": "Diu Island",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "city": "Diu",
        "weatherTags": ["Beach & Warm", "Mild", "Any"],
        "vibes": ["Relaxation", "Culture", "Food"],
        "purposes": ["Coastal getaway", "Portuguese heritage", "Peaceful holiday"],
        "dailyCostPerPerson": 2900,
        "stayCostPerDay": 1600,
        "foodCostPerDay": 800,
        "crowd": "Low Crowd",
        "rating": 4.6,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        "description": "A tranquil former Portuguese coastal territory featuring a 16th-century fortress, St. Paul's Church, sea caves at Naida, and palm-fringed Nagoa Beach.",
        "highlights": ["Diu Fort ocean ramparts & lighthouse", "Naida sea caves geological walk", "Nagoa Hoka-palm beach"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Gujarati, Hindi, Portuguese, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A serene, clean alternative to mainstream western beaches with Portuguese architecture, safe swimming coves, and quiet oceanfront dining.",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [5, 6, 7, 8, 9],
            "peakReason": "Pleasant coastal breezes and lively Festa De Diu beach festivities.",
            "offPeakReason": "Humid monsoon; sea is rough.",
            "crowdAdvisory": "Explore Naida caves in early morning light for dramatic photos."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Diu Airport (DIU) / Rajkot (RAJ)",
                "airportCode": "DIU",
                "distanceKm": 7,
                "connectivity": "Direct flights connecting Diu to Mumbai (BOM) and Ahmedabad."
            },
            "train": {
                "nearestStation": "Veraval Junction (VRL) / Delvada (DVA)",
                "stationCode": "VRL",
                "distanceKm": 85,
                "majorTrains": "Somnath Express, Jabalpur-Veraval Express."
            },
            "road": {
                "highway": "Coastal Highway / NH 51",
                "driveHours": "4 hours from Rajkot; 7 hours from Ahmedabad."
            }
        }
    },

    # 9. Delhi
    {
        "id": "delhi-heritage",
        "name": "Old & New Delhi",
        "state": "Delhi",
        "city": "New Delhi",
        "weatherTags": ["Mild", "Beach & Warm", "Any"],
        "vibes": ["Culture", "Food", "Shopping", "Nightlife"],
        "purposes": ["Heritage", "Food walk", "Capital exploration"],
        "dailyCostPerPerson": 3400,
        "stayCostPerDay": 2000,
        "foodCostPerDay": 900,
        "crowd": "High Crowd",
        "rating": 4.6,
        "bestTime": "October to March",
        "duration": "2-4 Days",
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
        "description": "India's capital bridging Mughal marvels (Red Fort, Jama Masjid) and Lutyens' grand avenues, world-renowned street food, and vibrant markets.",
        "highlights": ["Humayun's Tomb & Qutub Minar", "Chandni Chowk food walk & spice market", "India Gate & National Museum"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, English, Punjabi, Urdu",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3],
            "offPeakMonths": [5, 6, 7, 8],
            "peakReason": "Crisp sunny winter weather perfect for sightseeing and outdoor dining.",
            "offPeakReason": "Scorching May-June summer heat exceeding 42°C.",
            "crowdAdvisory": "Book monument entry tickets online through ASI app to skip lines."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Indira Gandhi International Airport (DEL)",
                "airportCode": "DEL",
                "distanceKm": 16,
                "connectivity": "India's primary hub with non-stop flights to every domestic airport and all continents."
            },
            "train": {
                "nearestStation": "New Delhi Railway Station (NDLS) / Hazrat Nizamuddin (NZM)",
                "stationCode": "NDLS",
                "distanceKm": 2,
                "majorTrains": "All major Rajdhani, Shatabdi, Vande Bharat, and Superfast lines converge here."
            },
            "road": {
                "highway": "Yamuna Expressway, NH 48, Delhi-Meerut Expressway",
                "driveHours": "Superb expressway network connecting to Agra, Jaipur, and Chandigarh."
            }
        }
    },
    {
        "id": "delhi-mehrauli",
        "name": "Mehrauli & Sanjay Van",
        "state": "Delhi",
        "city": "South Delhi",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Nature", "Culture", "Relaxation"],
        "purposes": ["Hidden heritage", "Bird watching", "Cafe hopping"],
        "dailyCostPerPerson": 2800,
        "stayCostPerDay": 1700,
        "foodCostPerDay": 750,
        "crowd": "Low Crowd",
        "rating": 4.7,
        "bestTime": "October to March",
        "duration": "1-2 Days",
        "image": "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
        "description": "Over a thousand years of layered Delhi history hidden within green forest corridors, containing stepwells (Gandhak ki Baoli), Jamali Kamali, and tranquil nature trails.",
        "highlights": ["Mehrauli Archaeological Park ruins", "Rajon ki Baoli hidden stepwell", "Sanjay Van forest watchtowers"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "An offbeat green retreat inside the capital with ancient stone stepwells, Sufi shrines, and peacocks without typical tourist crowds.",
        "seasonality": {
            "peakMonths": [12, 1],
            "shoulderMonths": [10, 11, 2, 3],
            "offPeakMonths": [5, 6, 7],
            "peakReason": "Pleasant morning mist and golden winter afternoons.",
            "offPeakReason": "Hot dry summer.",
            "crowdAdvisory": "Walk the forested path behind Qutub Minar early in the morning."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Indira Gandhi International Airport (DEL)",
                "airportCode": "DEL",
                "distanceKm": 12,
                "connectivity": "Quick 25-minute taxi drive from Terminal 3."
            },
            "train": {
                "nearestStation": "Hazrat Nizamuddin (NZM)",
                "stationCode": "NZM",
                "distanceKm": 14,
                "majorTrains": "Yellow Line Metro (Qutab Minar station) links directly."
            },
            "road": {
                "highway": "Mehrauli-Gurgaon (MG) Road",
                "driveHours": "Easily accessible via Delhi Metro or cab."
            }
        }
    },

    # 10. Goa
    {
        "id": "goa-north",
        "name": "North Goa (Vagator & Morjim)",
        "state": "Goa",
        "city": "Panaji",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Nightlife", "Food", "Relaxation", "Adventure"],
        "purposes": ["Friends trip", "Beach holiday", "Nightlife"],
        "dailyCostPerPerson": 4200,
        "stayCostPerDay": 2400,
        "foodCostPerDay": 1200,
        "crowd": "High Crowd",
        "rating": 4.6,
        "bestTime": "November to February",
        "duration": "3-5 Days",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        "description": "Lively coastal haven celebrated for cliffside cafes, ocean sunsets, water sports, Portuguese chapels, and world-class beachfront dining.",
        "highlights": ["Chapora Fort sunset view", "Morjim turtle nesting beach & cafes", "Anjuna flea market"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Konkani, English, Hindi, Marathi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [12, 1],
            "shoulderMonths": [10, 11, 2, 3],
            "offPeakMonths": [5, 6, 7, 8, 9],
            "peakReason": "Christmas-New Year peak beach festival season with vibrant night markets and sunny waves.",
            "offPeakReason": "Lush monsoon season: beaches closed for swimming, but green hinterland is gorgeous and budget-friendly.",
            "crowdAdvisory": "Head north past Ashwem to Mandrem for peaceful uncrowded shoreline."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Manohar International Airport Mopa (GOX) / Dabolim (GOI)",
                "airportCode": "GOX",
                "distanceKm": 25,
                "connectivity": "New Mopa Airport (GOX) is located directly in North Goa with direct flights from all major Indian metros."
            },
            "train": {
                "nearestStation": "Thivim (THVM) / Madgaon (MAO)",
                "stationCode": "THVM",
                "distanceKm": 18,
                "majorTrains": "Vande Bharat Express (Mumbai CSMT-Madgaon), Konkan Kanya Express, Netravati Express."
            },
            "road": {
                "highway": "NH 66 (Mumbai-Goa Highway)",
                "driveHours": "10 hours scenic coastal drive from Mumbai; 10 hours from Bangalore."
            }
        }
    },
    {
        "id": "goa-south-hidden",
        "name": "Cola Beach & Netravali (South Goa Hidden)",
        "state": "Goa",
        "city": "Margao",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Nature", "Relaxation", "Adventure"],
        "purposes": ["Romantic escape", "Offbeat beach", "Eco-tourism"],
        "dailyCostPerPerson": 3300,
        "stayCostPerDay": 1900,
        "foodCostPerDay": 850,
        "crowd": "Low Crowd",
        "rating": 4.8,
        "bestTime": "October to April",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
        "description": "A secluded paradise featuring a fresh emerald-green water lagoon meeting the Arabian Sea at Cola Beach, alongside the pristine spice farms and bubbler lakes of Netravali.",
        "highlights": ["Cola fresh-water lagoon kayaking right by the ocean", "Netravali bubbling lake & Savari waterfall", "Cabo de Rama sea cliff viewpoint"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Konkani, English, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A secret tropical dream where a tranquil sweet-water lagoon meets a golden surf beach, fringed by rustic Rajasthani luxury tents and zero noisy shacks.",
        "seasonality": {
            "peakMonths": [12, 1],
            "shoulderMonths": [10, 11, 2, 3, 4],
            "offPeakMonths": [6, 7, 8, 9],
            "peakReason": "Perfect lagoon kayaking conditions and tranquil warm sea swimming.",
            "offPeakReason": "Monsoon renders trails wet; waterfalls surge dramatically.",
            "crowdAdvisory": "Walk over the volcanic rock hillock in the late morning for a private lagoon view."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Dabolim International Airport (GOI)",
                "airportCode": "GOI",
                "distanceKm": 52,
                "connectivity": "Direct flights from Mumbai, Delhi, Bangalore, Hyderabad, and Chennai."
            },
            "train": {
                "nearestStation": "Madgaon Junction (MAO)",
                "stationCode": "MAO",
                "distanceKm": 32,
                "majorTrains": "Madgaon is Goa's primary rail hub with direct trains to every part of India."
            },
            "road": {
                "highway": "NH 66 South Goa Corridor",
                "driveHours": "1.2 hours scenic country drive from Madgaon."
            }
        }
    },

    # 11. Gujarat
    {
        "id": "guj-rann",
        "name": "Rann of Kutch (White Desert)",
        "state": "Gujarat",
        "city": "Bhuj",
        "weatherTags": ["Mild", "Beach & Warm", "Any"],
        "vibes": ["Culture", "Nature", "Photography"],
        "purposes": ["White desert festival", "Cultural heritage", "Family trip"],
        "dailyCostPerPerson": 3800,
        "stayCostPerDay": 2200,
        "foodCostPerDay": 900,
        "crowd": "Medium Crowd",
        "rating": 4.7,
        "bestTime": "November to February",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
        "description": "The world's largest salt desert stretching endlessly under shimmering starlight, paired with the colourful craft hamlets (Rogan art, Kutchi embroidery) and the Rann Utsav.",
        "highlights": ["Full moon over the endless White Salt Desert", "Kalo Dungar (Black Hill) panoramic vista", "Nirona artisan village Rogan painting"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Gujarati, Kutchi, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [12, 1],
            "shoulderMonths": [11, 2],
            "offPeakMonths": [4, 5, 6, 7, 8, 9, 10],
            "peakReason": "Rann Utsav in full swing; crisp desert nights and dry salt crystalline crust.",
            "offPeakReason": "Submerged under seawater and rainwater from June to September.",
            "crowdAdvisory": "Plan around the full moon cycle and visit the salt flats at midnight for surreal tranquility."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Bhuj Airport (BHJ) / Ahmedabad (AMD)",
                "airportCode": "BHJ",
                "distanceKm": 80,
                "connectivity": "Direct daily flights between Bhuj and Mumbai; Sardar Vallabhbhai Patel Int'l Airport (AMD) 390 km away."
            },
            "train": {
                "nearestStation": "Bhuj Railway Station (BHUJ)",
                "stationCode": "BHUJ",
                "distanceKm": 82,
                "majorTrains": "Kutch Express, Sayajinagari Express, Bhuj-Pune Express."
            },
            "road": {
                "highway": "NH 341",
                "driveHours": "1.5 hours straight highway drive from Bhuj to Dhordo."
            }
        }
    },
    {
        "id": "guj-polo",
        "name": "Polo Forest (Vijayragadh)",
        "state": "Gujarat",
        "city": "Sabarkantha",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Nature", "Culture", "Adventure"],
        "purposes": ["Hidden ruins", "Forest trekking", "Offbeat camping"],
        "dailyCostPerPerson": 2200,
        "stayCostPerDay": 1300,
        "foodCostPerDay": 600,
        "crowd": "Low Crowd",
        "rating": 4.6,
        "bestTime": "September to February",
        "duration": "2 Days",
        "image": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
        "description": "An ancient 15th-century forest sanctuary concealing ruined Jain and Shiva temples, clear Harnav river pools, and lush Aravalli foothill walking trails.",
        "highlights": ["15th-century carved Jain temple ruins", "Harnav River walkway & check-dam", "Idar rock trekking nearby"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Gujarati, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A secret green jungle dotted with sculpted medieval sandstone ruins where sunlight filters through ancient banyans.",
        "seasonality": {
            "peakMonths": [9, 10],
            "shoulderMonths": [11, 12, 1],
            "offPeakMonths": [4, 5, 6],
            "peakReason": "Post-monsoon forest is vibrant green and waterfalls are flowing.",
            "offPeakReason": "Hot dry summer.",
            "crowdAdvisory": "Visit on weekdays when the entire forest is completely empty."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Sardar Vallabhbhai Patel International Airport (AMD)",
                "airportCode": "AMD",
                "distanceKm": 150,
                "connectivity": "Ahmedabad has flights from all Indian metros; 3.5 hrs drive via Himatnagar."
            },
            "train": {
                "nearestStation": "Himatnagar Junction (HMT) / Ahmedabad (ADI)",
                "stationCode": "ADI",
                "distanceKm": 155,
                "majorTrains": "Ahmedabad is a major junction on Western Railway."
            },
            "road": {
                "highway": "SH 9 & NH 8",
                "driveHours": "3 hours smooth drive from Ahmedabad."
            }
        }
    },

    # 12. Haryana
    {
        "id": "haryana-morni",
        "name": "Morni Hills",
        "state": "Haryana",
        "city": "Panchkula",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Nature", "Relaxation", "Adventure"],
        "purposes": ["Weekend escape", "Trekking", "Nature getaway"],
        "dailyCostPerPerson": 2400,
        "stayCostPerDay": 1400,
        "foodCostPerDay": 650,
        "crowd": "Low Crowd",
        "rating": 4.5,
        "bestTime": "September to April",
        "duration": "2 Days",
        "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        "description": "Haryana's sole hill station nestled in the Shivalik range, offering twin sacred lakes (Tikkar Taal), pine-scented hills, and birdwatching trails.",
        "highlights": ["Tikkar Taal twin lakes boating", "Morni Fort heritage walk", "Adventure trekking to Karoh Peak"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Punjabi, Haryanvi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A quick peaceful hill retreat just 45 minutes from Chandigarh without the commercial congestion of Shimla.",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [9, 10, 3],
            "offPeakMonths": [5, 6],
            "peakReason": "Crisp sunny Shivalik mountain air and cool lake breezes.",
            "offPeakReason": "Hot dry plains summer.",
            "crowdAdvisory": "Stay at a lakeside resort on Tikkar Taal for evening campfire quiet."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Shaheed Bhagat Singh International Airport Chandigarh (IXC)",
                "airportCode": "IXC",
                "distanceKm": 48,
                "connectivity": "Pan-India connectivity via Chandigarh."
            },
            "train": {
                "nearestStation": "Chandigarh Junction (CDG) / Kalka (KLK)",
                "stationCode": "CDG",
                "distanceKm": 42,
                "majorTrains": "Vande Bharat, Shatabdi Express."
            },
            "road": {
                "highway": "Panchkula-Morni Hill Road",
                "driveHours": "1 hour drive from Chandigarh; 4.5 hours from Delhi."
            }
        }
    },

    # 13. Himachal Pradesh
    {
        "id": "hp-manali",
        "name": "Manali & Solang Valley",
        "state": "Himachal Pradesh",
        "city": "Manali",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Adventure", "Nature", "Relaxation"],
        "purposes": ["Honeymoon", "Snow holiday", "Adventure sports"],
        "dailyCostPerPerson": 3800,
        "stayCostPerDay": 2100,
        "foodCostPerDay": 950,
        "crowd": "High Crowd",
        "rating": 4.6,
        "bestTime": "March to June and December to February",
        "duration": "4-6 Days",
        "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        "description": "High Himalayan hub surrounded by snow-capped peaks, apple orchards, the ancient wooden Hadimba Temple, and the portal to Atal Tunnel and Spiti.",
        "highlights": ["Solang Valley paragliding & snow activities", "Atal Tunnel drive to Sissu Lahaul", "Old Manali riverside cafes"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Pahari, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [5, 6, 12, 1],
            "shoulderMonths": [3, 4, 9, 10],
            "offPeakMonths": [7, 8],
            "peakReason": "Summer escape from North Indian plains (May-June) and winter snowfall/New Year holidays (Dec-Jan).",
            "offPeakReason": "Monsoon July-August brings heavy rains and highway landslide risks.",
            "crowdAdvisory": "Stay across the bridge in Old Manali or drive through Atal Tunnel to tranquil Sissu."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Kullu-Bhuntar Airport (KUU) / Chandigarh (IXC)",
                "airportCode": "KUU",
                "distanceKm": 50,
                "connectivity": "KUU has daily Alliance Air flights from Delhi; Chandigarh IXC (270 km) is the major economical flight gateway."
            },
            "train": {
                "nearestStation": "Chandigarh Junction (CDG) / Anandpur Sahib (ANSB)",
                "stationCode": "CDG",
                "distanceKm": 270,
                "majorTrains": "Vande Bharat, Shatabdi Express to Chandigarh; then 5.5 hours scenic drive on the newly built Kiratpur-Manali four-lane highway."
            },
            "road": {
                "highway": "NH 21 / Kiratpur-Manali Expressway",
                "driveHours": "9 hours from Delhi; 5.5 hours from Chandigarh."
            }
        }
    },
    {
        "id": "hp-tirthan",
        "name": "Tirthan Valley & Jibhi",
        "state": "Himachal Pradesh",
        "city": "Kullu",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Nature", "Adventure", "Relaxation"],
        "purposes": ["Offbeat mountain escape", "Trout fishing", "Nature trails"],
        "dailyCostPerPerson": 2900,
        "stayCostPerDay": 1600,
        "foodCostPerDay": 750,
        "crowd": "Low Crowd",
        "rating": 4.9,
        "bestTime": "March to June and September to November",
        "duration": "3-5 Days",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        "description": "Gateway to the UNESCO Great Himalayan National Park, blessed with crystalline Tirthan River trout streams, traditional Kathkuni timber chalets, and deodar woods.",
        "highlights": ["Great Himalayan National Park guided day hike", "Jalori Pass & Serolsar Lake trek", "Chhoie waterfall & river-rock lounging"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Pahari, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A peaceful pristine valley where crystal-clear mountain rivers rush past cozy wooden homestays, untouched by commercial malls and bumper-to-bumper traffic.",
        "seasonality": {
            "peakMonths": [4, 5, 6],
            "shoulderMonths": [3, 9, 10, 11],
            "offPeakMonths": [7, 8, 1, 2],
            "peakReason": "Blooming apple orchards, pleasant mountain sunshine, and open passes.",
            "offPeakReason": "Monsoon rains in July-August; chill winter in January.",
            "crowdAdvisory": "Book a riverside riverside wooden cottage in Gushaini for absolute peace."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Kullu-Bhuntar Airport (KUU) / Chandigarh (IXC)",
                "airportCode": "KUU",
                "distanceKm": 48,
                "connectivity": "Fly to Bhuntar, or take flight to Chandigarh and travel via four-lane highway through Aut tunnel."
            },
            "train": {
                "nearestStation": "Chandigarh Junction (CDG)",
                "stationCode": "CDG",
                "distanceKm": 230,
                "majorTrains": "Vande Bharat, Shatabdi to Chandigarh."
            },
            "road": {
                "highway": "NH 3 to Aut Tunnel then Larji-Banjar Road",
                "driveHours": "5 hours from Chandigarh; 9.5 hours from Delhi."
            }
        }
    },

    # 14. Jammu and Kashmir
    {
        "id": "jk-srinagar",
        "name": "Srinagar & Dal Lake",
        "state": "Jammu and Kashmir",
        "city": "Srinagar",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Nature", "Relaxation", "Culture", "Food"],
        "purposes": ["Honeymoon", "Houseboat stay", "Family trip"],
        "dailyCostPerPerson": 4100,
        "stayCostPerDay": 2300,
        "foodCostPerDay": 1000,
        "crowd": "High Crowd",
        "rating": 4.8,
        "bestTime": "April to October (and Jan-Feb for snow)",
        "duration": "4-5 Days",
        "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
        "description": "The crown of Kashmir featuring intricately carved cedar houseboats on Dal and Nigeen Lakes, blooming Mughal terraced gardens, and fragrant saffron kahwa.",
        "highlights": ["Sunrise shikara ride to floating vegetable market", "Nishat & Shalimar Mughal gardens", "Old Srinagar copperware & wooden architecture"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Kashmiri, Urdu, Hindi, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [4, 5, 6],
            "shoulderMonths": [9, 10, 11],
            "offPeakMonths": [12, 1, 2, 7, 8],
            "peakReason": "Tulip festival in April and lush spring blossoms, pleasant summer days.",
            "offPeakReason": "Deep sub-zero Chilai Kalan winter in January.",
            "crowdAdvisory": "Stay on tranquil Nigeen Lake instead of busy Dal boulevard for peaceful shikara glides."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Sheikh ul-Alam International Airport (SXR)",
                "airportCode": "SXR",
                "distanceKm": 12,
                "connectivity": "Over 35 daily direct flights from Delhi, Mumbai, Bangalore, Ahmedabad, and Jammu."
            },
            "train": {
                "nearestStation": "Srinagar (SINA) / Katra (SVDK) / Jammu Tawi (JAT)",
                "stationCode": "SVDK",
                "distanceKm": 190,
                "majorTrains": "Vande Bharat Express (New Delhi-Katra); world's highest rail bridge over Chenab connects the direct Kashmir rail line."
            },
            "road": {
                "highway": "NH 44 (Jammu-Srinagar Four-Lane Expressway)",
                "driveHours": "6.5 hours through Dr. Syama Prasad Mookerjee Tunnel."
            }
        }
    },
    {
        "id": "jk-gurez",
        "name": "Gurez Valley",
        "state": "Jammu and Kashmir",
        "city": "Bandipora",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Nature", "Adventure", "Culture"],
        "purposes": ["Pristine hidden valley", "Photography", "Offbeat escape"],
        "dailyCostPerPerson": 3100,
        "stayCostPerDay": 1700,
        "foodCostPerDay": 800,
        "crowd": "Low Crowd",
        "rating": 4.9,
        "bestTime": "May to October",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        "description": "An enchanted Himalayan border valley through which the turquoise Kishanganga River flows, presided over by the iconic Habba Khatoon pyramidal mountain peak.",
        "highlights": ["Habba Khatoon mountain peak & freshwater spring", "Dawar town heritage log cabins", "Kishanganga riverbank camping"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Shina, Kashmiri, Urdu",
        "isHiddenGem": True,
        "hiddenGemHighlights": "One of India's most breathtaking untouched border valleys, preserving the unique Dard-Shin culture, wooden village hamlets, and zero commercial hotel chains.",
        "seasonality": {
            "peakMonths": [6, 7, 8],
            "shoulderMonths": [5, 9, 10],
            "offPeakMonths": [11, 12, 1, 2, 3, 4],
            "peakReason": "Pleasant summer weather, lush green carpets, and open Razdan Pass.",
            "offPeakReason": "Razdan Pass is buried under 15 feet of snow from November to April.",
            "crowdAdvisory": "Obtain standard border tourism pass online and drive through Razdan Pass before midday."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Sheikh ul-Alam International Airport Srinagar (SXR)",
                "airportCode": "SXR",
                "distanceKm": 135,
                "connectivity": "Direct flights to Srinagar, followed by a scenic 5-hour drive via Razdan Pass."
            },
            "train": {
                "nearestStation": "Sopore (SXZM) / Srinagar (SINA)",
                "stationCode": "SINA",
                "distanceKm": 125,
                "majorTrains": "Direct Kashmir valley rail network."
            },
            "road": {
                "highway": "Bandipora-Gurez Road via Razdan Pass (11,672 ft)",
                "driveHours": "4.5 to 5 hours drive from Srinagar."
            }
        }
    },

    # 15. Jharkhand
    {
        "id": "jh-netarhat",
        "name": "Netarhat (Queen of Chotanagpur)",
        "state": "Jharkhand",
        "city": "Latehar",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Nature", "Relaxation"],
        "purposes": ["Sunrise-sunset escape", "Hill station", "Forest walks"],
        "dailyCostPerPerson": 2300,
        "stayCostPerDay": 1300,
        "foodCostPerDay": 600,
        "crowd": "Low Crowd",
        "rating": 4.6,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
        "description": "Known as the 'Queen of Chotanagpur', Netarhat is a peaceful hill plateau crowned with pine forests, dramatic valley viewpoints like Magnolia Sunset Point, and cool mountain breezes.",
        "highlights": ["Magnolia Sunset Point", "Koel View sunrise point", "Lower Ghaghri waterfalls & pine forests"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Nagpuri",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A serene, misty plateau wrapped in pine and chir woodlands, famous for romantic tribal folklore and panoramic horizon views without commercial crowds.",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [4, 5, 6, 7, 8],
            "peakReason": "Pleasant cool climate and spectacular sunset visibility.",
            "offPeakReason": "Hot plains summer.",
            "crowdAdvisory": "Stay at the Jharkhand Tourism Prabhat Vihar cottage for sunrise over your balcony."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Birsa Munda Airport Ranchi (IXR)",
                "airportCode": "IXR",
                "distanceKm": 155,
                "connectivity": "Direct daily flights from Delhi, Mumbai, Kolkata, Bangalore, and Patna."
            },
            "train": {
                "nearestStation": "Lohardaga (LAD) / Ranchi (RNC)",
                "stationCode": "RNC",
                "distanceKm": 150,
                "majorTrains": "Vande Bharat (Ranchi-Patna, Ranchi-Howrah), Rajdhani Express."
            },
            "road": {
                "highway": "NH 143A & Netarhat Plateau Road",
                "driveHours": "3.5 to 4 hours scenic drive from Ranchi."
            }
        }
    },

    # 16. Karnataka
    {
        "id": "ka-coorg",
        "name": "Coorg (Madikeri)",
        "state": "Karnataka",
        "city": "Madikeri",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Nature", "Relaxation", "Food"],
        "purposes": ["Coffee plantation stay", "Weekend getaway", "Nature walks"],
        "dailyCostPerPerson": 3200,
        "stayCostPerDay": 1800,
        "foodCostPerDay": 800,
        "crowd": "Medium Crowd",
        "rating": 4.7,
        "bestTime": "October to March",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
        "description": "Known as the 'Scotland of India', Coorg is a verdant highland of sprawling shade-grown coffee estates, spice gardens, Abbey Falls, and rich Kodava culture.",
        "highlights": ["Coffee & spice estate guided plantation tour", "Abbey & Iruppu waterfalls", "Namdroling Golden Temple Tibetan monastery"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Kannada, Kodava, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [6, 7, 8],
            "peakReason": "Pleasant sunny days, cool fragrant evenings, and coffee bean harvesting season.",
            "offPeakReason": "Heavy monsoon rains in July-August (great for lush waterfalls, but outdoor trails are soggy).",
            "crowdAdvisory": "Stay in an authentic heritage coffee estate homestay outside Madikeri town."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Kannur International Airport (CNN) / Mangalore (IXE) / Bangalore (BLR)",
                "airportCode": "CNN",
                "distanceKm": 85,
                "connectivity": "Kannur CNN is 2 hrs away; Mysore MYQ has regional flights; Bangalore BLR is 5.5 hrs drive."
            },
            "train": {
                "nearestStation": "Mysuru Junction (MYS)",
                "stationCode": "MYS",
                "distanceKm": 115,
                "majorTrains": "Vande Bharat Express (Chennai-Mysore), Shatabdi Express."
            },
            "road": {
                "highway": "Bangalore-Mysore Expressway to NH 275",
                "driveHours": "4.5 hours from Bangalore via new 10-lane expressway."
            }
        }
    },
    {
        "id": "ka-badami",
        "name": "Badami, Aihole & Pattadakal",
        "state": "Karnataka",
        "city": "Bagalkot",
        "weatherTags": ["Mild", "Beach & Warm", "Any"],
        "vibes": ["Culture", "Adventure", "Photography"],
        "purposes": ["UNESCO heritage", "Rock architecture", "History tour"],
        "dailyCostPerPerson": 2500,
        "stayCostPerDay": 1400,
        "foodCostPerDay": 650,
        "crowd": "Low Crowd",
        "rating": 4.8,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1600100397608-f010b3c7e1b2?auto=format&fit=crop&w=1200&q=80",
        "description": "Ancient cradle of temple architecture featuring magnificent 6th-century rock-cut cave temples chiseled into red sandstone cliffs surrounding the emerald Agastya Lake.",
        "highlights": ["Badami Cave Temples (Shiva, Vishnu, Jain)", "Agastya Lake & Bhutanatha Temple at sunset", "Pattadakal UNESCO monument complex"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Kannada, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A monumental open-air museum of red sandstone cliff carvings and early Chalukyan temple experiments far quieter than Hampi.",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [4, 5, 6],
            "peakReason": "Mild winter sunshine makes exploring rock-cut temples comfortable.",
            "offPeakReason": "Hot dry Deccan summer.",
            "crowdAdvisory": "Climb up to the North Fort ruins at 4:30 PM for a spectacular sunset reflection across Agastya Lake."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Hubli Airport (HBX) / Belgaum (IXG)",
                "airportCode": "HBX",
                "distanceKm": 105,
                "connectivity": "Direct daily flights from Bangalore, Mumbai, Chennai, and Hyderabad to Hubli."
            },
            "train": {
                "nearestStation": "Badami Railway Station (BDM)",
                "stationCode": "BDM",
                "distanceKm": 4,
                "majorTrains": "Gol Gumbaz Express, Hubli-Varanasi Express."
            },
            "road": {
                "highway": "NH 52 & SH 14",
                "driveHours": "2.5 hours from Hubli; 8 hours from Bangalore."
            }
        }
    },

    # 17. Kerala
    {
        "id": "kerala-munnar",
        "name": "Munnar",
        "state": "Kerala",
        "city": "Idukki",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Nature", "Relaxation", "Food"],
        "purposes": ["Honeymoon", "Tea plantations", "Nature escape"],
        "dailyCostPerPerson": 3400,
        "stayCostPerDay": 1900,
        "foodCostPerDay": 850,
        "crowd": "High Crowd",
        "rating": 4.7,
        "bestTime": "September to March",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
        "description": "Perched at 5,200 ft, Munnar is draped in endless rolling emerald tea gardens, misty peaks like Anamudi, cascading waterfalls, and cool mountain air.",
        "highlights": ["Kolukkumalai world's highest tea plantation sunrise", "Eravikulam National Park Nilgiri Tahr safari", "Mattupetty Dam & Top Station viewpoint"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Malayalam, Tamil, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [12, 1, 5],
            "shoulderMonths": [9, 10, 11, 2, 3],
            "offPeakMonths": [6, 7, 8],
            "peakReason": "Crisp winter mist and clear skies in Dec-Jan; summer hill escape in May.",
            "offPeakReason": "Heavy Southwest monsoon rains.",
            "crowdAdvisory": "Book a 4x4 sunrise jeep trip up to Kolukkumalai tea estate to beat the crowds."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Cochin International Airport (COK)",
                "airportCode": "COK",
                "distanceKm": 110,
                "connectivity": "Direct domestic flights from all metros and major Middle Eastern hubs."
            },
            "train": {
                "nearestStation": "Aluva (AWY) / Ernakulam Junction (ERS)",
                "stationCode": "ERS",
                "distanceKm": 125,
                "majorTrains": "Vande Bharat Express (Kasaragod-Thiruvananthapuram), Kerala Express."
            },
            "road": {
                "highway": "NH 85 (Kochi-Dhanushkodi National Highway)",
                "driveHours": "3.5 hours scenic drive up through Neriamangalam forest and Cheeyappara waterfalls."
            }
        }
    },
    {
        "id": "kerala-marari",
        "name": "Marari Beach & Vagamon",
        "state": "Kerala",
        "city": "Alappuzha",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Relaxation", "Nature"],
        "purposes": ["Quiet beach", "Ayurvedic wellness", "Slow travel"],
        "dailyCostPerPerson": 3100,
        "stayCostPerDay": 1800,
        "foodCostPerDay": 800,
        "crowd": "Low Crowd",
        "rating": 4.8,
        "bestTime": "October to April",
        "duration": "2-4 Days",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        "description": "A tranquil fishing hamlet beach with soft golden sands, coconut groves, and traditional eco-resorts, situated just 14 km from the busy backwaters of Alleppey.",
        "highlights": ["Pristine uncrowded Marari shoreline", "Traditional coir-making & fishing village walks", "Ayurvedic rejuvenating spa therapies"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Malayalam, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A secret slow-paced coastal sanctuary where fishermen mend nets under swaying palms with zero beach shacks, loud music, or commercial clutter.",
        "seasonality": {
            "peakMonths": [12, 1],
            "shoulderMonths": [10, 11, 2, 3],
            "offPeakMonths": [6, 7, 8],
            "peakReason": "Mild tropical warmth and gentle calm seas.",
            "offPeakReason": "Monsoon brings Ayurvedic therapy season ('Karkidakam') with discounted stays.",
            "crowdAdvisory": "Walk north along the beach at 7:00 AM to see fishermen returning with the morning catch."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Cochin International Airport (COK)",
                "airportCode": "COK",
                "distanceKm": 72,
                "connectivity": "Direct non-stop flights from all Indian metros; 1.5 hrs highway drive to Marari."
            },
            "train": {
                "nearestStation": "Mararikulam (MAKM) / Alappuzha (ALLP)",
                "stationCode": "ALLP",
                "distanceKm": 14,
                "majorTrains": "Well connected to Kochi, Thiruvananthapuram, and Chennai."
            },
            "road": {
                "highway": "NH 66 Coastal Highway",
                "driveHours": "1.5 hours drive from Kochi."
            }
        }
    },

    # 18. Ladakh
    {
        "id": "ladakh-leh",
        "name": "Leh & Pangong Tso",
        "state": "Ladakh",
        "city": "Leh",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Adventure", "Nature", "Culture"],
        "purposes": ["Himalayan roadtrip", "Monasteries", "High-altitude lake"],
        "dailyCostPerPerson": 4600,
        "stayCostPerDay": 2600,
        "foodCostPerDay": 1100,
        "crowd": "Medium Crowd",
        "rating": 4.9,
        "bestTime": "May to September",
        "duration": "5-7 Days",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        "description": "High-altitude moonscapes, 1,000-year-old Buddhist monasteries like Thiksey and Hemis, the world's highest motorable passes, and the color-shifting waters of Pangong Tso.",
        "highlights": ["Pangong Tso & Nubra Valley double-humped camel safari", "Thiksey Monastery morning chanting ceremony", "Khardung La high-altitude pass at 17,982 ft"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Ladakhi, Hindi, Tibetan, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [6, 7, 8],
            "shoulderMonths": [5, 9],
            "offPeakMonths": [10, 11, 12, 1, 2, 3, 4],
            "peakReason": "Passes are clear of snow, daytime temperatures are pleasant (18-22°C), all lakes are thawed.",
            "offPeakReason": "Sub-zero temperatures below -20°C; road passes closed.",
            "crowdAdvisory": "Mandatory 48-hour acclimatization in Leh town before heading up to high passes."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Kushok Bakula Rimpochee Airport Leh (IXL)",
                "airportCode": "IXL",
                "distanceKm": 4,
                "connectivity": "Direct morning flights from Delhi, Mumbai, Jammu, and Srinagar."
            },
            "train": {
                "nearestStation": "Jammu Tawi (JAT) / Chandigarh (CDG)",
                "stationCode": "JAT",
                "distanceKm": 680,
                "majorTrains": "Major railhead to Katra/Jammu or Chandigarh, followed by road trip via Srinagar or Manali."
            },
            "road": {
                "highway": "Manali-Leh Highway / Srinagar-Leh Highway",
                "driveHours": "Spectacular 2-day overland mountain expeditions (open June to October)."
            }
        }
    },
    {
        "id": "ladakh-turtuk",
        "name": "Turtuk (Balti Village Hidden Gem)",
        "state": "Ladakh",
        "city": "Nubra",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Culture", "Nature", "Adventure"],
        "purposes": ["Cultural discovery", "Offbeat border village", "Apricot orchards"],
        "dailyCostPerPerson": 3200,
        "stayCostPerDay": 1800,
        "foodCostPerDay": 800,
        "crowd": "Low Crowd",
        "rating": 4.9,
        "bestTime": "May to October",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
        "description": "The northernmost village of India opened to travelers in 2010, Turtuk preserves authentic Balti culture, stone-canal irrigation, wooden polo traditions, and lush apricot groves.",
        "highlights": ["Turtuk Yul & Farrol stone-lane walking tours", "Balti Heritage Museum & Royal House", "Sweet apricot orchard picnics with Karakoram mountain backdrops"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Balti, Ladakhi, Urdu, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A hidden Balti oasis nestled under soaring Karakoram peaks, famous for sweet sun-dried apricots, stone-walled cooling closets, and extraordinary local hospitality.",
        "seasonality": {
            "peakMonths": [7, 8],
            "shoulderMonths": [5, 6, 9],
            "offPeakMonths": [10, 11, 12, 1, 2, 3, 4],
            "peakReason": "Apricot harvesting season and warm green valley temperatures.",
            "offPeakReason": "Freezing winter.",
            "crowdAdvisory": "Spend at least one overnight in a traditional Balti homestay to experience homemade buckwheat pasta."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Kushok Bakula Rimpochee Airport Leh (IXL)",
                "airportCode": "IXL",
                "distanceKm": 205,
                "connectivity": "Fly to Leh, then travel 6 hours through Nubra Valley via Khardung La."
            },
            "train": {
                "nearestStation": "Jammu Tawi (JAT)",
                "stationCode": "JAT",
                "distanceKm": 880,
                "majorTrains": "High-altitude road route from Leh."
            },
            "road": {
                "highway": "Diskit-Turtuk Highway",
                "driveHours": "2.5 hours drive from Hunder (Nubra)."
            }
        }
    },

    # 19. Lakshadweep
    {
        "id": "lakshadweep-agatti",
        "name": "Agatti & Bangaram Atolls",
        "state": "Lakshadweep",
        "city": "Kavaratti",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Nature", "Relaxation", "Adventure"],
        "purposes": ["Island escape", "Coral diving", "Honeymoon"],
        "dailyCostPerPerson": 5200,
        "stayCostPerDay": 3200,
        "foodCostPerDay": 1400,
        "crowd": "Low Crowd",
        "rating": 4.9,
        "bestTime": "October to mid-May",
        "duration": "4-5 Days",
        "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
        "description": "A secluded coral paradise where narrow airstrips land straight into turquoise lagoons, featuring pristine coral walls, manta ray diving, and bioluminescent sands.",
        "highlights": ["Bangaram uninhabited atoll day trip", "Scuba diving with sea turtles at Agatti reef", "Glass-bottom boat lagoon ride"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Malayalam, Mahl, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "One of the world's most pristine coral atoll chains strictly protected by entry permits, ensuring total freedom from crowds and commercial noise.",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3, 4],
            "offPeakMonths": [5, 6, 7, 8, 9],
            "peakReason": "Glass-like lagoon transparency, calm waters, and brilliant dive visibility.",
            "offPeakReason": "Monsoon renders inter-island boat transfers dangerous.",
            "crowdAdvisory": "Entry permit (e-permit) is mandatory and handled by authorized tour operators."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Agatti Airport (AGX)",
                "airportCode": "AGX",
                "distanceKm": 2,
                "connectivity": "Direct daily flights from Kochi (COK) and Bangalore (BLR) landing right on Agatti's scenic runway."
            },
            "train": {
                "nearestStation": "Ernakulam Junction (ERS)",
                "stationCode": "ERS",
                "distanceKm": 460,
                "majorTrains": "Mainland rail to Kochi, followed by flight to Agatti."
            },
            "road": {
                "highway": "Lagoon boat transfers",
                "driveHours": "Speedboat transfers between Agatti, Bangaram, and Thinnakara atolls."
            }
        }
    },

    # 20. Madhya Pradesh
    {
        "id": "mp-orchha",
        "name": "Orchha & Khajuraho",
        "state": "Madhya Pradesh",
        "city": "Niwari",
        "weatherTags": ["Mild", "Beach & Warm", "Any"],
        "vibes": ["Culture", "Photography", "Relaxation"],
        "purposes": ["Medieval heritage", "Architecture", "Spiritual"],
        "dailyCostPerPerson": 2700,
        "stayCostPerDay": 1500,
        "foodCostPerDay": 700,
        "crowd": "Low Crowd",
        "rating": 4.8,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
        "description": "A frozen-in-time medieval town on the banks of the Betwa River, crowned by grandiose Bundela cenotaphs (Chhatris), Jahangir Mahal, and Ram Raja Temple.",
        "highlights": ["Betwa River Chhatris sunset reflection", "Jahangir Mahal & Raja Mahal murals", "Evening aarti at Ram Raja Temple"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Bundeli, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A peaceful riverside medieval jewel far more atmospheric and serene than mainstream tourist hubs, where palace ruins overlook lush nature sanctuaries.",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3],
            "offPeakMonths": [4, 5, 6, 7, 8],
            "peakReason": "Crisp sunny winter days and serene river conditions.",
            "offPeakReason": "Hot dry Bundelkhand summers.",
            "crowdAdvisory": "Walk down to the Betwa riverbank boulders opposite the Chhatris at 5:00 PM for the iconic postcard view."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Gwalior Airport (GWL) / Khajuraho (HJR)",
                "airportCode": "GWL",
                "distanceKm": 120,
                "connectivity": "Gwalior GWL has direct flights from Delhi, Mumbai, and Bangalore; 2.5 hrs drive to Orchha."
            },
            "train": {
                "nearestStation": "Jhansi Junction (VGLJ)",
                "stationCode": "VGLJ",
                "distanceKm": 18,
                "majorTrains": "Major Central Railway junction: Vande Bharat Express, Bhopal Shatabdi Express (2.5 hrs from Delhi)."
            },
            "road": {
                "highway": "NH 44 (North-South Corridor)",
                "driveHours": "30 mins drive from Jhansi railway station; 5.5 hours from Delhi."
            }
        }
    },

    # 21. Maharashtra
    {
        "id": "maha-lonavala",
        "name": "Lonavala & Khandala",
        "state": "Maharashtra",
        "city": "Pune",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Nature", "Relaxation", "Adventure"],
        "purposes": ["Weekend getaway", "Monsoon drive", "Relaxation"],
        "dailyCostPerPerson": 2800,
        "stayCostPerDay": 1600,
        "foodCostPerDay": 750,
        "crowd": "High Crowd",
        "rating": 4.5,
        "bestTime": "July to September (Monsoon) and October to February",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        "description": "The quintessential Sahyadri hill escape known for mist-covered valley viewpoints, ancient Karla & Bhaja Buddhist caves, and waterfalls during monsoons.",
        "highlights": ["Tiger's Leap & Lion's Point viewpoints", "Bhaja & Karla Buddhist rock-cut caves", "Bhushi Dam & Pawna Lake camping"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Marathi, Hindi, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [7, 8, 12, 1],
            "shoulderMonths": [9, 10, 11, 2],
            "offPeakMonths": [3, 4, 5],
            "peakReason": "Lush monsoon waterfalls (July-Aug) and winter weekend holiday rushes (Dec-Jan).",
            "offPeakReason": "Dry summer months.",
            "crowdAdvisory": "Visit on weekdays to avoid the heavy weekend traffic jams from Mumbai and Pune."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Pune International Airport (PNQ) / Mumbai (BOM)",
                "airportCode": "PNQ",
                "distanceKm": 68,
                "connectivity": "Both Mumbai BOM and Pune PNQ have extensive domestic flights."
            },
            "train": {
                "nearestStation": "Lonavala Railway Station (LNL)",
                "stationCode": "LNL",
                "distanceKm": 2,
                "majorTrains": "Deccan Queen, Pragati Express, Sinhagad Express, Vande Bharat Express (stops at Lonavala)."
            },
            "road": {
                "highway": "Mumbai-Pune Expressway",
                "driveHours": "2 hours drive from Mumbai; 1 hour drive from Pune."
            }
        }
    },
    {
        "id": "maha-kaas",
        "name": "Kaas Plateau & Velas Beach",
        "state": "Maharashtra",
        "city": "Satara",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Nature", "Photography", "Relaxation"],
        "purposes": ["Valley of flowers", "Photography", "Offbeat nature"],
        "dailyCostPerPerson": 2400,
        "stayCostPerDay": 1350,
        "foodCostPerDay": 650,
        "crowd": "Low Crowd",
        "rating": 4.8,
        "bestTime": "Late August to mid-October (Flowers) and November to March",
        "duration": "2 Days",
        "image": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        "description": "A UNESCO World Natural Heritage site known as Maharashtra's 'Valley of Flowers', where volcanic laterite plateaus explode into carpets of endemic wild orchids and insectivorous blossoms.",
        "highlights": ["Vibrant endemic floral carpets at Kaas Pathar", "Vajrai & Thoseghar multi-tiered waterfalls", "Serene Kaas Lake walking trails"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Marathi, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A seasonal botanical miracle of rare purple, pink, and yellow wild blossoms that bloom for just 4 to 6 weeks on a high-altitude mist-kissed plateau.",
        "seasonality": {
            "peakMonths": [9, 10],
            "shoulderMonths": [8, 11],
            "offPeakMonths": [12, 1, 2, 3, 4, 5, 6, 7],
            "peakReason": "Peak floral bloom period strictly from September to early October.",
            "offPeakReason": "The plateau turns dry laterite rock outside bloom season; nearby Koyna backwaters remain peaceful.",
            "crowdAdvisory": "Reserve your daily visitor slot online via forest department portal to ensure entry."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Pune International Airport (PNQ)",
                "airportCode": "PNQ",
                "distanceKm": 130,
                "connectivity": "Direct flights to Pune, then 3 hours drive along NH 48."
            },
            "train": {
                "nearestStation": "Satara Railway Station (STR)",
                "stationCode": "STR",
                "distanceKm": 25,
                "majorTrains": "Mahalaxmi Express, Koyna Express, Goa Express."
            },
            "road": {
                "highway": "NH 48 (Mumbai-Bengaluru Highway) to Satara-Kaas Road",
                "driveHours": "2.5 hours from Pune; 4.5 hours from Mumbai."
            }
        }
    },

    # 22. Manipur
    {
        "id": "manipur-loktak",
        "name": "Loktak Lake & Keibul Lamjao",
        "state": "Manipur",
        "city": "Bishnupur",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Nature", "Culture", "Adventure"],
        "purposes": ["Floating lake ecosystem", "Wildlife", "Photography"],
        "dailyCostPerPerson": 2700,
        "stayCostPerDay": 1500,
        "foodCostPerDay": 700,
        "crowd": "Low Crowd",
        "rating": 4.8,
        "bestTime": "October to April",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        "description": "Northeast India's largest freshwater lake famous for its circular floating vegetative islands ('Phumdis') and the world's only floating national park, home to the endangered Sangai brow-antlered deer.",
        "highlights": ["Keibul Lamjao floating national park & Sangai deer safari", "Boating among circular Phumdi fishing rings", "Sendra Island viewpoint & homestays"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Meiteilon (Manipuri), English, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A surreal geographical wonder where homestays float directly on living vegetative islands surrounded by lotus blossoms and mist-shrouded hills.",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3],
            "offPeakMonths": [5, 6, 7, 8, 9],
            "peakReason": "Pleasant cool weather, clear lake waters, and migratory waterfowl arrival.",
            "offPeakReason": "Heavy monsoons.",
            "crowdAdvisory": "Stay in a floating homestay at Thanga village for an unforgettable dawn canoe ride."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Bir Tikendrajit International Airport Imphal (IMF)",
                "airportCode": "IMF",
                "distanceKm": 42,
                "connectivity": "Direct non-stop flights from Kolkata, Guwahati, and Delhi to Imphal; 1 hr drive to Loktak."
            },
            "train": {
                "nearestStation": "Dimapur (DMV) / Silchar (SCL)",
                "stationCode": "DMV",
                "distanceKm": 235,
                "majorTrains": "New rail connectivity progressing toward Imphal; currently best accessed via flight."
            },
            "road": {
                "highway": "Tiddim Road / NH 2",
                "driveHours": "1 hour drive from Imphal city centre."
            }
        }
    },

    # 23. Meghalaya
    {
        "id": "megh-shillong",
        "name": "Shillong & Cherrapunji",
        "state": "Meghalaya",
        "city": "East Khasi Hills",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Nature", "Culture", "Music"],
        "purposes": ["Hill getaway", "Waterfalls", "Music culture"],
        "dailyCostPerPerson": 3100,
        "stayCostPerDay": 1700,
        "foodCostPerDay": 750,
        "crowd": "Medium Crowd",
        "rating": 4.6,
        "bestTime": "October to April (and monsoon for waterfalls)",
        "duration": "3-5 Days",
        "image": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
        "description": "Known as the 'Scotland of the East', Shillong combines indie rock and jazz culture with pine hills, while nearby Sohra (Cherrapunji) features deep canyon gorges and Nohkalikai waterfall.",
        "highlights": ["Nohkalikai Falls & Seven Sisters Falls", "Mawsmai & Arwah limestone caves", "Umiam Lake water sports"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Khasi, English, Pnar, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [10, 11, 12, 4],
            "shoulderMonths": [1, 2, 3],
            "offPeakMonths": [6, 7, 8],
            "peakReason": "Cherry Blossom Festival in November; pleasant crisp sunny skies in autumn.",
            "offPeakReason": "World's highest rainfall season in July-August.",
            "crowdAdvisory": "Explore the vibrant indie cafes and live music venues in Laitumkhrah in the evening."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Shillong Airport Umroi (SHL) / Guwahati (GAU)",
                "airportCode": "GAU",
                "distanceKm": 115,
                "connectivity": "Guwahati GAU has direct flights to every Indian metro; Umroi SHL (30 km) operates regional ATR flights."
            },
            "train": {
                "nearestStation": "Guwahati Railway Station (GHY)",
                "stationCode": "GHY",
                "distanceKm": 100,
                "majorTrains": "Major terminal connected with Rajdhani, Vande Bharat, and superfast lines."
            },
            "road": {
                "highway": "NH 6 (Guwahati-Shillong Four-Lane Expressway)",
                "driveHours": "2.5 hours smooth drive from Guwahati."
            }
        }
    },
    {
        "id": "megh-nongriat",
        "name": "Nongriat & Mawlynnong",
        "state": "Meghalaya",
        "city": "East Khasi Hills",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Adventure", "Nature"],
        "purposes": ["Living root bridges", "Trekking", "Eco-village"],
        "dailyCostPerPerson": 2500,
        "stayCostPerDay": 1300,
        "foodCostPerDay": 650,
        "crowd": "Low Crowd",
        "rating": 4.9,
        "bestTime": "October to April",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
        "description": "Deep within subtropical valleys, the indigenous Khasi people have guided the aerial roots of rubber trees across centuries to form extraordinary living root bridges, including the double-decker marvel of Nongriat.",
        "highlights": ["Umshiang Double Decker Living Root Bridge", "Natural turquoise pools of Rainbow Falls", "Mawlynnong eco-friendly clean village & Dawki crystal river"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Khasi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "An awe-inspiring bio-engineering wonder reached via a 3,500-step stone forest staircase, rewarding intrepid hikers with hidden turquoise swimming lagoons and bamboo homestays.",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3, 4],
            "offPeakMonths": [5, 6, 7, 8, 9],
            "peakReason": "Clear turquoise river water and dry stone steps safe for hiking.",
            "offPeakReason": "Slippery torrential rains during monsoons.",
            "crowdAdvisory": "Stay overnight in a Nongriat village homestay to swim in Rainbow Falls before day-trippers arrive."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Guwahati International Airport (GAU)",
                "airportCode": "GAU",
                "distanceKm": 165,
                "connectivity": "Fly to Guwahati, drive to Tyrna village (via Cherrapunji), then trek down to Nongriat."
            },
            "train": {
                "nearestStation": "Guwahati (GHY)",
                "stationCode": "GHY",
                "distanceKm": 150,
                "majorTrains": "Connected with all major Indian railway corridors."
            },
            "road": {
                "highway": "Sohra-Tyrna Road",
                "driveHours": "4 hours drive from Guwahati to trek trailhead at Tyrna."
            }
        }
    },

    # 24. Mizoram
    {
        "id": "mizoram-reiek",
        "name": "Reiek Peak & Aizawl",
        "state": "Mizoram",
        "city": "Aizawl",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Nature", "Culture", "Relaxation"],
        "purposes": ["Hills & clouds", "Tribal culture", "Scenic trek"],
        "dailyCostPerPerson": 2800,
        "stayCostPerDay": 1500,
        "foodCostPerDay": 700,
        "crowd": "Low Crowd",
        "rating": 4.7,
        "bestTime": "October to March",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        "description": "Perched at 5,100 ft, Reiek Peak commands dramatic 360-degree vistas across rolling emerald hills toward Bangladesh, complemented by a preserved traditional Mizo model village.",
        "highlights": ["Reiek cliff edge walk & sea-of-clouds sunrise", "Mizo traditional heritage village huts", "Aizawl city night lights from Durtlang Hills"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Mizo, English, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A peaceful paradise of friendly hill communities, zero horn-honking, vibrant choir music, and mystical mountain mists.",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [5, 6, 7, 8, 9],
            "peakReason": "Anthuriuim festival in autumn and crisp winter mountain views.",
            "offPeakReason": "Heavy rainy season.",
            "crowdAdvisory": "Trek up to Reiek peak at dawn to witness the clouds floating beneath your feet."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Lengpui Airport (AJL)",
                "airportCode": "AJL",
                "distanceKm": 35,
                "connectivity": "Direct daily flights to Aizawl (AJL) from Kolkata, Guwahati, and Delhi."
            },
            "train": {
                "nearestStation": "Bairabi (BHRB) / Silchar (SCL)",
                "stationCode": "SCL",
                "distanceKm": 160,
                "majorTrains": "Silchar is the major railhead connecting Assam and Barak valley."
            },
            "road": {
                "highway": "NH 54",
                "driveHours": "1 hour drive from Aizawl to Reiek."
            }
        }
    },

    # 25. Nagaland
    {
        "id": "nagaland-dzukou",
        "name": "Dzükou Valley & Khonoma",
        "state": "Nagaland",
        "city": "Kohima",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Adventure", "Nature", "Culture"],
        "purposes": ["Trekking", "Eco-village", "Highland wilderness"],
        "dailyCostPerPerson": 2900,
        "stayCostPerDay": 1600,
        "foodCostPerDay": 700,
        "crowd": "Low Crowd",
        "rating": 4.9,
        "bestTime": "June to September (Flowers) and October to March (Clear skies)",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        "description": "Sitting at 8,000 ft, Dzükou is a mythical valley of rolling bamboo-grass hills, meandering streams, endemic Dzükou lilies, and the nearby premier green village of Khonoma.",
        "highlights": ["Dzükou Valley high-altitude rim trek & cave camping", "Khonoma green eco-village & Angami tribal heritage", "Kohima War Cemetery & Hornbill Festival site (Kisama)"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Angami, Nagamese, English, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A dreamlike undulating landscape untouched by any roads or concrete, where whispering streams cut through rolling hill hummocks.",
        "seasonality": {
            "peakMonths": [12, 1],
            "shoulderMonths": [6, 7, 10, 11],
            "offPeakMonths": [4, 5, 8],
            "peakReason": "Famous Hornbill Festival in early December (Kisama); winter frosts create magical mornings.",
            "offPeakReason": "Monsoon rains in summer, though the rare Dzükou lily blooms June-July.",
            "crowdAdvisory": "Stay at a community homestay in Khonoma to taste local organic smoked dishes."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Dimapur Airport (DMU)",
                "airportCode": "DMU",
                "distanceKm": 74,
                "connectivity": "Direct flights from Kolkata and Guwahati to Dimapur; then 2.5 hrs drive to Kohima."
            },
            "train": {
                "nearestStation": "Dimapur Railway Station (DMV)",
                "stationCode": "DMV",
                "distanceKm": 72,
                "majorTrains": "Directly connected to Delhi, Guwahati, and Kolkata via Jan Shatabdi and Kamrup Express."
            },
            "road": {
                "highway": "NH 29 (Dimapur-Kohima Four-Lane Highway)",
                "driveHours": "2.5 hours drive from Dimapur."
            }
        }
    },

    # 26. Odisha
    {
        "id": "odisha-puri",
        "name": "Puri & Konark",
        "state": "Odisha",
        "city": "Puri",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Culture", "Relaxation", "Food"],
        "purposes": ["Pilgrimage", "Beach holiday", "UNESCO Sun Temple"],
        "dailyCostPerPerson": 2600,
        "stayCostPerDay": 1400,
        "foodCostPerDay": 650,
        "crowd": "High Crowd",
        "rating": 4.5,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
        "description": "Famed for the sacred 12th-century Jagannath Temple, the UNESCO Sun Temple at Konark, golden sand beaches, and unique Odia culinary traditions like Khaja.",
        "highlights": ["Jagannath Temple spiritual atmosphere", "Konark Sun Temple stone chariot wheels", "Puri Golden Beach (Blue Flag certified)"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Odia, Hindi, Bengali, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1, 6, 7],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [4, 5, 8, 9],
            "peakReason": "Pleasant coastal winter (Nov-Jan) and annual Rath Yatra festival in June-July.",
            "offPeakReason": "Hot humid summer months.",
            "crowdAdvisory": "Visit Konark Sun Temple right at 6:00 AM gate opening for pristine photography."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Biju Patnaik International Airport Bhubaneswar (BBI)",
                "airportCode": "BBI",
                "distanceKm": 60,
                "connectivity": "Direct non-stop flights from all Indian metros; 1 hr drive along Marine Drive to Puri."
            },
            "train": {
                "nearestStation": "Puri Railway Station (PURI)",
                "stationCode": "PURI",
                "distanceKm": 2,
                "majorTrains": "Vande Bharat Express (Howrah-Puri, Rourkela-Puri), Purushottam Express."
            },
            "road": {
                "highway": "Bhubaneswar-Puri NH 316 & Puri-Konark Marine Drive",
                "driveHours": "1 hour smooth drive from Bhubaneswar."
            }
        }
    },
    {
        "id": "odisha-daringbadi",
        "name": "Daringbadi (Kashmir of Odisha)",
        "state": "Odisha",
        "city": "Kandhamal",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Nature", "Relaxation"],
        "purposes": ["Offbeat hill station", "Coffee plantations", "Pine forests"],
        "dailyCostPerPerson": 2200,
        "stayCostPerDay": 1200,
        "foodCostPerDay": 600,
        "crowd": "Low Crowd",
        "rating": 4.6,
        "bestTime": "October to March",
        "duration": "2 Days",
        "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        "description": "Known as the 'Kashmir of Odisha', Daringbadi is a serene hill station at 3,000 ft surrounded by pine forests, coffee gardens, and occasional winter sub-zero frost.",
        "highlights": ["Daringbadi Pine Forest nature walks", "Midubanda & Dasingbadi waterfalls", "Coffee & black pepper plantation tours"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Odia, Kui, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A secret green hill sanctuary where morning mist rolls through pine woods and temperatures dip close to freezing in December.",
        "seasonality": {
            "peakMonths": [12, 1],
            "shoulderMonths": [10, 11, 2],
            "offPeakMonths": [4, 5, 6, 7],
            "peakReason": "Cold winter breeze and seasonal frost.",
            "offPeakReason": "Hot dry summer.",
            "crowdAdvisory": "Walk the pine forest loop early in the morning for crisp fragrant air."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Biju Patnaik International Airport Bhubaneswar (BBI)",
                "airportCode": "BBI",
                "distanceKm": 250,
                "connectivity": "Fly to Bhubaneswar, then 5.5 hours drive through Ganjam hills."
            },
            "train": {
                "nearestStation": "Brahmapur Railway Station (BAM)",
                "stationCode": "BAM",
                "distanceKm": 120,
                "majorTrains": "Well connected to Howrah, Chennai, and Visakhapatnam."
            },
            "road": {
                "highway": "SH 5 & NH 59",
                "driveHours": "3 hours drive from Brahmapur."
            }
        }
    },

    # 27. Puducherry
    {
        "id": "py-pondicherry",
        "name": "Puducherry (White Town & Auroville)",
        "state": "Puducherry",
        "city": "Pondicherry",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Culture", "Food", "Relaxation"],
        "purposes": ["French heritage", "Cafe hopping", "Spiritual"],
        "dailyCostPerPerson": 3300,
        "stayCostPerDay": 1900,
        "foodCostPerDay": 850,
        "crowd": "Medium Crowd",
        "rating": 4.6,
        "bestTime": "October to March",
        "duration": "2-4 Days",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        "description": "Charming coastal enclave combining mustard-yellow French colonial villas, bougainvillea-draped lanes, gourmet French bakeries, Promenade Beach, and Auroville.",
        "highlights": ["White Town heritage bicycle tour", "Auroville Matrimandir meditation & gardens", "Promenade Beach seaside sunset stroll"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Tamil, French, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [4, 5, 6, 7, 8, 9],
            "peakReason": "Pleasant tropical sea breeze and cool evenings.",
            "offPeakReason": "Hot humid summers.",
            "crowdAdvisory": "Rent a vintage bicycle at 7:00 AM to explore White Town's colonial avenues before traffic stirs."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Puducherry Airport (PNY) / Chennai (MAA)",
                "airportCode": "PNY",
                "distanceKm": 6,
                "connectivity": "PNY has flights to Bangalore and Hyderabad; Chennai MAA (135 km) offers global and pan-India connectivity."
            },
            "train": {
                "nearestStation": "Puducherry Railway Station (PDY)",
                "stationCode": "PDY",
                "distanceKm": 2,
                "majorTrains": "Puducherry-New Delhi Express, Chalukya Express."
            },
            "road": {
                "highway": "East Coast Road (ECR)",
                "driveHours": "2.5 to 3 hours scenic seaside drive from Chennai."
            }
        }
    },

    # 28. Punjab
    {
        "id": "punjab-amritsar",
        "name": "Amritsar (Golden Temple)",
        "state": "Punjab",
        "city": "Amritsar",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Culture", "Food", "Spiritual"],
        "purposes": ["Spiritual pilgrimage", "Culinary exploration", "Heritage"],
        "dailyCostPerPerson": 2700,
        "stayCostPerDay": 1500,
        "foodCostPerDay": 700,
        "crowd": "High Crowd",
        "rating": 4.9,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
        "description": "Spiritual epicentre of Sikhism, home to the resplendent Sri Harmandir Sahib (Golden Temple), the historic Jallianwala Bagh, world-famous Amritsari Kulcha, and the Wagah Border ceremony.",
        "highlights": ["Golden Temple night Palki Sahib ceremony & mega Langar", "Attari-Wagah Border beating retreat ceremony", "Authentic kulcha & lassi food walk"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Punjabi, Hindi, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3],
            "offPeakMonths": [5, 6, 7, 8],
            "peakReason": "Crisp sunny winter weather and vibrant Gurpurab celebrations.",
            "offPeakReason": "Hot dry plains summer.",
            "crowdAdvisory": "Visit Harmandir Sahib at 4:00 AM (Amrit Vela) for the sacred and tranquil hymn chanting."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Sri Guru Ram Dass Jee International Airport (ATQ)",
                "airportCode": "ATQ",
                "distanceKm": 11,
                "connectivity": "Direct non-stop domestic flights from Delhi, Mumbai, Bangalore, and direct international flights to London, Dubai, and Singapore."
            },
            "train": {
                "nearestStation": "Amritsar Junction (ASR)",
                "stationCode": "ASR",
                "distanceKm": 3,
                "majorTrains": "Vande Bharat Express (New Delhi-Amritsar), Shatabdi Express (twice daily), Golden Temple Mail."
            },
            "road": {
                "highway": "NH 3 & Grand Trunk Road",
                "driveHours": "6.5 hours from Delhi; 3.5 hours from Chandigarh."
            }
        }
    },

    # 29. Rajasthan
    {
        "id": "rajasthan-jaipur",
        "name": "Jaipur (Pink City)",
        "state": "Rajasthan",
        "city": "Jaipur",
        "weatherTags": ["Mild", "Beach & Warm", "Any"],
        "vibes": ["Culture", "Food", "Shopping"],
        "purposes": ["Palace heritage", "Craft shopping", "Food trip"],
        "dailyCostPerPerson": 3200,
        "stayCostPerDay": 1800,
        "foodCostPerDay": 800,
        "crowd": "High Crowd",
        "rating": 4.7,
        "bestTime": "October to March",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
        "description": "UNESCO-inscribed royal capital of forts and palaces, including Amber Fort, Hawa Mahal, City Palace, vibrant gem bazaars, and celebrated Rajasthani cuisine.",
        "highlights": ["Amber Fort elephant ramparts & Sheesh Mahal", "Hawa Mahal & Jantar Mantar observatory", "Johari & Bapu Bazaars craft shopping"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Rajasthani, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [4, 5, 6, 7, 8],
            "peakReason": "Pleasant sunny winter climate and Jaipur Literature Festival in January.",
            "offPeakReason": "Hot dry desert summer.",
            "crowdAdvisory": "Head up to Nahargarh Fort at sunset for panoramic city views."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jaipur International Airport (JAI)",
                "airportCode": "JAI",
                "distanceKm": 12,
                "connectivity": "Direct flights connecting to all Indian metro cities and Dubai/Sharjah."
            },
            "train": {
                "nearestStation": "Jaipur Junction (JP)",
                "stationCode": "JP",
                "distanceKm": 3,
                "majorTrains": "Vande Bharat Express (Delhi Cantt-Ajmer via Jaipur), Ajmer Shatabdi."
            },
            "road": {
                "highway": "Delhi-Mumbai Expressway (NE4)",
                "driveHours": "3 hours drive from Delhi via new expressway."
            }
        }
    },
    {
        "id": "rajasthan-bundi",
        "name": "Bundi & Shekhawati",
        "state": "Rajasthan",
        "city": "Bundi",
        "weatherTags": ["Mild", "Any"],
        "vibes": ["Culture", "Photography", "Relaxation"],
        "purposes": ["Offbeat royal history", "Stepwells & frescoes", "Slow travel"],
        "dailyCostPerPerson": 2300,
        "stayCostPerDay": 1300,
        "foodCostPerDay": 600,
        "crowd": "Low Crowd",
        "rating": 4.8,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80",
        "description": "An authentic, painted Rajput fairytale town famed for the hilltop Taragarh Fort, ancient intricate stepwells (Raniji ki Baoli), and uncommercial blue-washed alleys.",
        "highlights": ["Bundi Palace Chitrashala miniature wall paintings", "Raniji ki Baoli 46-meter sculpted stepwell", "Jait Sagar lake & Taragarh Fort"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Rajasthani",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A peaceful heritage wonderland of blue houses, painted medieval palaces, and ornate stepwells untouched by tourist buses.",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [4, 5, 6, 7],
            "peakReason": "Mild sunny winter weather.",
            "offPeakReason": "Summer heat.",
            "crowdAdvisory": "Walk the ramparts of Bundi Palace in the late morning for peaceful contemplation."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jaipur International Airport (JAI) / Udaipur (UDR)",
                "airportCode": "JAI",
                "distanceKm": 210,
                "connectivity": "Fly to Jaipur, then 3.5 hrs drive along NH 52."
            },
            "train": {
                "nearestStation": "Kota Junction (KOTA) / Bundi (BUDI)",
                "stationCode": "KOTA",
                "distanceKm": 38,
                "majorTrains": "Kota is a massive hub on the Delhi-Mumbai main line with Rajdhani and August Kranti stops."
            },
            "road": {
                "highway": "NH 52",
                "driveHours": "40 mins from Kota; 3.5 hours from Jaipur."
            }
        }
    },

    # 30. Sikkim
    {
        "id": "sikkim-gangtok",
        "name": "Gangtok & Tsomgo Lake",
        "state": "Sikkim",
        "city": "East Sikkim",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Nature", "Culture", "Adventure"],
        "purposes": ["Himalayan views", "Monasteries", "Snow lake"],
        "dailyCostPerPerson": 3500,
        "stayCostPerDay": 2000,
        "foodCostPerDay": 850,
        "crowd": "Medium Crowd",
        "rating": 4.7,
        "bestTime": "March to May and October to mid-December",
        "duration": "4-6 Days",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
        "description": "A clean mountain city offering panoramic views of Kangchenjunga, ancient Tibetan monasteries (Rumtek), and the alpine heights of glacial Tsomgo Lake at 12,310 ft.",
        "highlights": ["Tsomgo Lake & Baba Mandir near Nathu La", "Rumtek Dharma Chakra Centre", "MG Marg pedestrian mall & local cafes"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Nepali, Bhutia, Lepcha, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [4, 5, 10, 11],
            "shoulderMonths": [3, 12],
            "offPeakMonths": [6, 7, 8, 9],
            "peakReason": "Clear mountain panoramas of Kangchenjunga in autumn, rhododendron blooms in spring.",
            "offPeakReason": "Monsoon rains bring landslides on hill highways.",
            "crowdAdvisory": "Obtain Nathu La pass through registered tour agents well in advance."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Pakyong Airport (PYG) / Bagdogra (IXB)",
                "airportCode": "IXB",
                "distanceKm": 120,
                "connectivity": "Bagdogra IXB has extensive daily direct flights from Delhi, Mumbai, Kolkata, and Bangalore; Pakyong PYG is 30 km from Gangtok."
            },
            "train": {
                "nearestStation": "New Jalpaiguri (NJP)",
                "stationCode": "NJP",
                "distanceKm": 115,
                "majorTrains": "Vande Bharat Express (Howrah-NJP, Guwahati-NJP), Rajdhani Express."
            },
            "road": {
                "highway": "NH 10 (Siliguri-Gangtok Highway)",
                "driveHours": "4 hours scenic drive along the Teesta River."
            }
        }
    },
    {
        "id": "sikkim-pelling",
        "name": "Pelling & Dzongu",
        "state": "Sikkim",
        "city": "West Sikkim",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Nature", "Culture", "Relaxation"],
        "purposes": ["Kangchenjunga view", "Sacred lakes", "Offbeat retreat"],
        "dailyCostPerPerson": 2900,
        "stayCostPerDay": 1600,
        "foodCostPerDay": 750,
        "crowd": "Low Crowd",
        "rating": 4.8,
        "bestTime": "October to May",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        "description": "Perched on a quiet mountain ridge directly facing Mount Kangchenjunga, Pelling features ancient Pemayangtse Monastery, Rabdentse royal ruins, and sacred Khecheopalri Lake.",
        "highlights": ["Rabdentse palace ruins walk in pine woods", "Pemayangtse Monastery 300-year-old wooden sculpture", "Khecheopalri sacred wish-fulfilling lake"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Nepali, Bhutia, Lepcha, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "The closest and most intimate vantage point to the sacred snow peaks of Kangchenjunga, far calmer than Gangtok.",
        "seasonality": {
            "peakMonths": [10, 11, 4],
            "shoulderMonths": [12, 1, 2, 3],
            "offPeakMonths": [6, 7, 8],
            "peakReason": "Crystal clear golden sunrise reflections on the mountain peaks.",
            "offPeakReason": "Monsoon clouds obscure mountain views.",
            "crowdAdvisory": "Wake up at 5:15 AM to watch the first golden rays strike the Kangchenjunga summit."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Bagdogra Airport (IXB)",
                "airportCode": "IXB",
                "distanceKm": 135,
                "connectivity": "Direct flights to Bagdogra; 4.5 hrs scenic drive via Jorethang."
            },
            "train": {
                "nearestStation": "New Jalpaiguri (NJP)",
                "stationCode": "NJP",
                "distanceKm": 130,
                "majorTrains": "Well connected to Kolkata, Delhi, and Guwahati."
            },
            "road": {
                "highway": "NH 10 to Jorethang-Pelling Road",
                "driveHours": "4.5 hours drive from NJP/Bagdogra."
            }
        }
    },

    # 31. Tamil Nadu
    {
        "id": "tn-ooty",
        "name": "Ooty (Udhagamandalam)",
        "state": "Tamil Nadu",
        "city": "Nilgiris",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Nature", "Relaxation", "Culture"],
        "purposes": ["Hill station", "Heritage toy train", "Tea gardens"],
        "dailyCostPerPerson": 3100,
        "stayCostPerDay": 1700,
        "foodCostPerDay": 750,
        "crowd": "High Crowd",
        "rating": 4.5,
        "bestTime": "October to June",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
        "description": "Queen of the Nilgiris known for the UNESCO Nilgiri Mountain Railway toy train, sprawling tea estates, Botanical Gardens, and crisp eucalyptus-scented mountain air.",
        "highlights": ["Nilgiri Mountain Railway heritage steam train", "Doddabetta Peak & tea factory tour", "Pykara waterfalls & boating"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Tamil, Badaga, English, Hindi",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [4, 5, 12],
            "shoulderMonths": [9, 10, 11, 1, 2],
            "offPeakMonths": [6, 7],
            "peakReason": "Summer escape (April-May) and winter holiday rush (December).",
            "offPeakReason": "Heavy Southwest monsoon showers in July.",
            "crowdAdvisory": "Head to nearby Coonoor or Avalanche Lake for serene uncrowded nature walks."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Coimbatore International Airport (CJB)",
                "airportCode": "CJB",
                "distanceKm": 88,
                "connectivity": "Direct non-stop flights from Chennai, Mumbai, Delhi, Bangalore, and Hyderabad."
            },
            "train": {
                "nearestStation": "Mettupalayam (MTP) / Coimbatore Junction (CBE)",
                "stationCode": "CBE",
                "distanceKm": 85,
                "majorTrains": "Vande Bharat (Chennai-Coimbatore), Nilgiri Express; Mettupalayam connects to the historic toy train."
            },
            "road": {
                "highway": "NH 181 (Coimbatore-Ooty Ghat Road)",
                "driveHours": "2.5 hours scenic drive through 36 hairpin bends."
            }
        }
    },
    {
        "id": "tn-dhanushkodi",
        "name": "Dhanushkodi & Valparai",
        "state": "Tamil Nadu",
        "city": "Ramanathapuram",
        "weatherTags": ["Beach & Warm", "Tropical", "Any"],
        "vibes": ["Adventure", "Nature", "Culture"],
        "purposes": ["Ghost town", "Ocean convergence", "Mythological"],
        "dailyCostPerPerson": 2400,
        "stayCostPerDay": 1300,
        "foodCostPerDay": 650,
        "crowd": "Low Crowd",
        "rating": 4.8,
        "bestTime": "October to March",
        "duration": "2 Days",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        "description": "At the southern tip of Pamban Island, Dhanushkodi is a dramatic lost ghost town where the calm waters of the Bay of Bengal meet the roaring Indian Ocean, framed by the mythical Ram Setu.",
        "highlights": ["Ram Setu (Adam's Bridge) ocean convergence point", "Ruined church & railway station ghost town", "Pamban Sea Bridge crossing"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Tamil, English, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A surreal sandbar spit surrounded by two oceans on either side, characterized by eerie ruined churches and stark white beaches.",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [5, 6, 7],
            "peakReason": "Comfortable tropical sea breeze and calm coastal waters.",
            "offPeakReason": "Hot humid coastal summer.",
            "crowdAdvisory": "Drive down the straight ocean road to the tip at sunrise when ocean waters are mirror-still."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Madurai Airport (IXM)",
                "airportCode": "IXM",
                "distanceKm": 175,
                "connectivity": "Direct flights to Madurai from Chennai, Bangalore, Mumbai, and Delhi; 3.5 hrs drive to Rameswaram."
            },
            "train": {
                "nearestStation": "Rameswaram (RMM) / Mandapam (MMM)",
                "stationCode": "RMM",
                "distanceKm": 18,
                "majorTrains": "Rameswaram Express, Sethu Express."
            },
            "road": {
                "highway": "NH 87 (National Highway to Arichal Munai)",
                "driveHours": "20 mins drive from Rameswaram along scenic coastal causeway."
            }
        }
    },

    # 32. Telangana
    {
        "id": "telangana-hyderabad",
        "name": "Hyderabad City",
        "state": "Telangana",
        "city": "Hyderabad",
        "weatherTags": ["Mild", "Beach & Warm", "Any"],
        "vibes": ["Culture", "Food", "Nightlife"],
        "purposes": ["Biryani & food tour", "Monuments", "City break"],
        "dailyCostPerPerson": 3100,
        "stayCostPerDay": 1700,
        "foodCostPerDay": 850,
        "crowd": "High Crowd",
        "rating": 4.6,
        "bestTime": "October to March",
        "duration": "2-4 Days",
        "image": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
        "description": "The City of Pearls famous for Golconda Fort acoustics, Charminar, Chowmahalla Palace, modern HITEC city, and authentic Hyderabadi Dum Biryani.",
        "highlights": ["Golconda Fort light & sound show", "Charminar & Laad Bazaar pearl shopping", "Authentic Hyderabadi Biryani & Irani chai walk"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Telugu, Urdu, Hindi, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1],
            "shoulderMonths": [10, 2, 3],
            "offPeakMonths": [4, 5, 6],
            "peakReason": "Comfortable winter weather, food and cultural festivals.",
            "offPeakReason": "Hot dry Deccan summer.",
            "crowdAdvisory": "Explore Golconda Fort at 8:30 AM before afternoon heat and school tour groups."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Rajiv Gandhi International Airport (HYD)",
                "airportCode": "HYD",
                "distanceKm": 22,
                "connectivity": "Major international hub with non-stop flights to all domestic destinations and global cities."
            },
            "train": {
                "nearestStation": "Secunderabad (SC) / Kacheguda (KCG) / Hyderabad Deccan (HYB)",
                "stationCode": "SC",
                "distanceKm": 6,
                "majorTrains": "Vande Bharat Express (SC-VSKP, SC-Tirupati), Rajdhani Express."
            },
            "road": {
                "highway": "Nehru Outer Ring Road, NH 44, NH 65",
                "driveHours": "Superb 8-lane express ring road connecting all exits."
            }
        }
    },
    {
        "id": "telangana-laknavaram",
        "name": "Laknavaram Lake & Ramappa",
        "state": "Telangana",
        "city": "Warangal",
        "weatherTags": ["Mild", "Beach & Warm", "Any"],
        "vibes": ["Nature", "Culture", "Relaxation"],
        "purposes": ["Lake island camping", "UNESCO Kakatiya temple", "Nature escape"],
        "dailyCostPerPerson": 2200,
        "stayCostPerDay": 1250,
        "foodCostPerDay": 600,
        "crowd": "Low Crowd",
        "rating": 4.7,
        "bestTime": "September to February",
        "duration": "2 Days",
        "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        "description": "A sprawling Kakatiya-era reservoir spanning 10,000 acres cradled by forested hills, featuring yellow suspension bridges linking green islands, and the nearby UNESCO Ramappa Temple.",
        "highlights": ["Laknavaram suspension bridge island walk", "Night camping and kayaking on the lake", "UNESCO Ramappa Temple 800-year-old floating bricks"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Telugu, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A secret green eco-paradise where wooden island cottages are connected by graceful suspension footbridges amidst peaceful forest sounds.",
        "seasonality": {
            "peakMonths": [10, 11, 12, 1],
            "shoulderMonths": [9, 2],
            "offPeakMonths": [3, 4, 5, 6],
            "peakReason": "Post-monsoon lake is brimming full and islands are lush green.",
            "offPeakReason": "Hot dry summer.",
            "crowdAdvisory": "Stay in Haritha island cottages for quiet starlit night skies."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Rajiv Gandhi International Airport Hyderabad (HYD)",
                "airportCode": "HYD",
                "distanceKm": 220,
                "connectivity": "Fly to Hyderabad, then 4 hours drive along NH 163."
            },
            "train": {
                "nearestStation": "Kazipet Junction (KZJ) / Warangal (WL)",
                "stationCode": "WL",
                "distanceKm": 72,
                "majorTrains": "Major junction on Delhi-Chennai and Hyderabad-Vijayawada routes."
            },
            "road": {
                "highway": "NH 163 (Hyderabad-Bhopalpatnam Highway)",
                "driveHours": "3.5 to 4 hours scenic drive from Hyderabad."
            }
        }
    },

    # 33. Tripura
    {
        "id": "tripura-unakoti",
        "name": "Unakoti & Ujjayanta Palace",
        "state": "Tripura",
        "city": "Unakoti",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Culture", "Nature", "Photography"],
        "purposes": ["Rock-cut sculptures", "Royal palace", "Offbeat heritage"],
        "dailyCostPerPerson": 2400,
        "stayCostPerDay": 1300,
        "foodCostPerDay": 650,
        "crowd": "Low Crowd",
        "rating": 4.8,
        "bestTime": "October to March",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
        "description": "Known as the 'Angkor Wat of the Northeast', Unakoti is a mysterious 7th-9th century hillside sanctuary of massive rock-cut Shiva carvings and waterfalls hidden deep in forested hills.",
        "highlights": ["Unakotiswara Kal Bhairava 30-ft rock-cut carving", "Forested ravine waterfalls", "Ujjayanta Palace & Neermahal water palace in Agartala"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Bengali, Kokborok, English, Hindi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A mystical archaeological wonder where colossal stone faces gaze out from jungle-clad cliffs with natural streamlets trickling across the rocks.",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3],
            "offPeakMonths": [5, 6, 7, 8],
            "peakReason": "Pleasant dry weather, clear forest walking paths, and Ashokastami festival.",
            "offPeakReason": "Heavy monsoon rains.",
            "crowdAdvisory": "Explore Unakoti early in the morning when the sun filters through the forest canopy onto the rock carvings."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Maharaja Bir Bikram Airport Agartala (IXA)",
                "airportCode": "IXA",
                "distanceKm": 160,
                "connectivity": "Direct flights from Kolkata, Guwahati, Delhi, and Bangalore to Agartala; train or taxi to Unakoti."
            },
            "train": {
                "nearestStation": "Kumarghat (KUGT) / Dharmanagar (DMR)",
                "stationCode": "DMR",
                "distanceKm": 20,
                "majorTrains": "Tripura Sundari Express, Agartala-Kolkata Express."
            },
            "road": {
                "highway": "NH 8 (Assam-Agartala Highway)",
                "driveHours": "4 hours scenic hill drive from Agartala."
            }
        }
    },

    # 34. Uttar Pradesh
    {
        "id": "up-varanasi",
        "name": "Varanasi (Kashi)",
        "state": "Uttar Pradesh",
        "city": "Varanasi",
        "weatherTags": ["Mild", "Beach & Warm", "Any"],
        "vibes": ["Culture", "Food", "Photography", "Spiritual"],
        "purposes": ["Ganga aarti", "Spiritual", "Heritage lanes", "Street food"],
        "dailyCostPerPerson": 2600,
        "stayCostPerDay": 1400,
        "foodCostPerDay": 650,
        "crowd": "High Crowd",
        "rating": 4.8,
        "bestTime": "October to March",
        "duration": "2-4 Days",
        "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
        "description": "One of the world's oldest living cities, Varanasi breathes on the banks of the holy Ganges with ancient stone ghats, evening Ganga Aarti, and labyrinthine alleys.",
        "highlights": ["Dashashwamedh Ghat evening Maha Aarti", "Dawn sunrise boat ride along the Ghats", "Sarnath Deer Park & Dhamek Stupa"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Bhojpuri, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3],
            "offPeakMonths": [4, 5, 6, 7],
            "peakReason": "Dev Deepawali in Nov; crisp winter mornings with river mist and migratory Siberian gulls.",
            "offPeakReason": "Hot dry plains summer.",
            "crowdAdvisory": "Take an unmotorized wooden rowboat at 5:30 AM from Assi Ghat to Manikarnika for serene dawn prayers."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Lal Bahadur Shastri International Airport (VNS)",
                "airportCode": "VNS",
                "distanceKm": 24,
                "connectivity": "Direct non-stop flights from Delhi, Mumbai, Bangalore, Hyderabad, Kolkata, and Kathmandu."
            },
            "train": {
                "nearestStation": "Varanasi Junction (BSB) / Banaras (BSBS) / Pt. Deen Dayal Upadhyaya (DDU)",
                "stationCode": "BSB",
                "distanceKm": 4,
                "majorTrains": "Vande Bharat Express (New Delhi-Varanasi), Kashi Vishwanath Express."
            },
            "road": {
                "highway": "NH 19 (Grand Trunk Road) / Purvanchal Expressway link",
                "driveHours": "5.5 hours drive from Lucknow; 8 hours from Agra."
            }
        }
    },
    {
        "id": "up-dudhwa",
        "name": "Dudhwa National Park",
        "state": "Uttar Pradesh",
        "city": "Lakhimpur Kheri",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Nature", "Adventure"],
        "purposes": ["Tiger & Rhino safari", "Terai wetlands", "Offbeat wildlife"],
        "dailyCostPerPerson": 3400,
        "stayCostPerDay": 2000,
        "foodCostPerDay": 800,
        "crowd": "Low Crowd",
        "rating": 4.6,
        "bestTime": "November to April",
        "duration": "2-3 Days",
        "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
        "description": "Lush Terai forest sanctuary along the Indo-Nepal border sheltering Bengal tigers, Indian one-horned rhinoceroses, swamp deer (Barasingha), and rich sal canopy wetlands.",
        "highlights": ["Rhino rehabilitation enclosure elephant safari", "Suheli River boat safari & birdwatching", "Tharu indigenous tribal village cultural tour"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Awadhi",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A secret Terai wilderness without the crowds of Jim Corbett, featuring magnificent sal trees and peaceful rhino tracking on elephant back.",
        "seasonality": {
            "peakMonths": [12, 1, 2],
            "shoulderMonths": [11, 3, 4],
            "offPeakMonths": [5, 6, 7, 8, 9, 10],
            "peakReason": "Mild winter climate and high animal visibility around river marshes.",
            "offPeakReason": "Park closed during monsoon.",
            "crowdAdvisory": "Book the early morning Rhino Tracking safari at the Sonaripur range."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Chaudhary Charan Singh International Airport Lucknow (LKO)",
                "airportCode": "LKO",
                "distanceKm": 215,
                "connectivity": "Direct flights from all Indian metros; 4.5 hours drive to Dudhwa."
            },
            "train": {
                "nearestStation": "Mailani Junction (MLN) / Shahjahanpur (SPN)",
                "stationCode": "SPN",
                "distanceKm": 105,
                "majorTrains": "Well connected to Delhi and Lucknow."
            },
            "road": {
                "highway": "State Highway 25 / NH 730",
                "driveHours": "4.5 hours drive from Lucknow."
            }
        }
    },

    # 35. Uttarakhand
    {
        "id": "uk-rishikesh",
        "name": "Rishikesh",
        "state": "Uttarakhand",
        "city": "Dehradun",
        "weatherTags": ["Mild", "Cold & Snowy", "Any"],
        "vibes": ["Adventure", "Relaxation", "Culture"],
        "purposes": ["Yoga & wellness", "River rafting", "Spiritual"],
        "dailyCostPerPerson": 2900,
        "stayCostPerDay": 1600,
        "foodCostPerDay": 750,
        "crowd": "High Crowd",
        "rating": 4.7,
        "bestTime": "September to November and February to May",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
        "description": "Yoga capital of the world located where the Ganga leaves the Himalayas, featuring white-water rafting, Triveni Ghat evening aarti, and Beatles Ashram.",
        "highlights": ["White water river rafting & cliff jumping", "Parmarth Niketan & Triveni Ghat Ganga Aarti", "Beatles Ashram graffiti meditation walk"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Hindi, Garhwali, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [3, 4, 5, 10, 11],
            "shoulderMonths": [12, 1, 2],
            "offPeakMonths": [7, 8],
            "peakReason": "Optimal river rafting water levels in spring and autumn; International Yoga Festival in March.",
            "offPeakReason": "Monsoon July-August halts all river rafting activities.",
            "crowdAdvisory": "Stay in Tapovan or upper Shivpuri to escape the bustling Laxman Jhula pedestrian traffic."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jolly Grant Airport Dehradun (DED)",
                "airportCode": "DED",
                "distanceKm": 20,
                "connectivity": "Direct non-stop flights from Delhi, Mumbai, Bangalore, Hyderabad, and Ahmedabad; 35 mins drive to Rishikesh."
            },
            "train": {
                "nearestStation": "Yog Nagari Rishikesh (YNRK) / Haridwar (HW)",
                "stationCode": "YNRK",
                "distanceKm": 4,
                "majorTrains": "Vande Bharat Express (Delhi-Dehradun stops at Haridwar), Jan Shatabdi."
            },
            "road": {
                "highway": "NH 334 / Delhi-Dehradun Expressway",
                "driveHours": "4 hours drive from Delhi via new expressway."
            }
        }
    },
    {
        "id": "uk-chopta",
        "name": "Chopta & Tungnath (Mini Switzerland)",
        "state": "Uttarakhand",
        "city": "Rudraprayag",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Adventure", "Nature", "Relaxation"],
        "purposes": ["High altitude trek", "Highest Shiva temple", "Meadow camping"],
        "dailyCostPerPerson": 2600,
        "stayCostPerDay": 1400,
        "foodCostPerDay": 700,
        "crowd": "Low Crowd",
        "rating": 4.9,
        "bestTime": "April to June (Meadows) and October to February (Snow)",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        "description": "Known as the 'Mini Switzerland of India', Chopta is an evergreen bugyal (alpine meadow) surrounded by pine, deodar, and rhododendron forests, serving as base for the Tungnath and Chandrashila trek.",
        "highlights": ["Trek to Tungnath (world's highest Shiva temple at 12,073 ft)", "Chandrashila summit 360-degree Himalayan sunrise", "Deoria Tal pristine emerald lake reflection"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Garhwali, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "An uncommercialized alpine paradise of rolling high-altitude meadows, clear starlit skies, and sweeping views of Nanda Devi and Trishul peaks.",
        "seasonality": {
            "peakMonths": [5, 6, 12],
            "shoulderMonths": [4, 9, 10, 11],
            "offPeakMonths": [7, 8, 1, 2],
            "peakReason": "Pleasant green meadows in early summer; winter snowfall trekking in December.",
            "offPeakReason": "Monsoon rains in July-August; heavy snow blocks higher trails in Jan-Feb.",
            "crowdAdvisory": "Begin the Chandrashila summit trek at 3:30 AM to witness the sun rise over the Greater Himalayas in complete silence."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Jolly Grant Airport Dehradun (DED)",
                "airportCode": "DED",
                "distanceKm": 180,
                "connectivity": "Fly to Dehradun, then 6.5 hours scenic drive along Mandakini River."
            },
            "train": {
                "nearestStation": "Yog Nagari Rishikesh (YNRK) / Haridwar (HW)",
                "stationCode": "YNRK",
                "distanceKm": 165,
                "majorTrains": "Well connected to Delhi and national railway network."
            },
            "road": {
                "highway": "NH 107 to Kund-Gopeshwar Highway",
                "driveHours": "6.5 hours drive from Rishikesh through Devprayag and Rudraprayag."
            }
        }
    },

    # 36. West Bengal
    {
        "id": "wb-darjeeling",
        "name": "Darjeeling",
        "state": "West Bengal",
        "city": "Darjeeling",
        "weatherTags": ["Cold & Snowy", "Mild", "Any"],
        "vibes": ["Nature", "Culture", "Food"],
        "purposes": ["Tea heritage", "Kangchenjunga sunrise", "Colonial hill station"],
        "dailyCostPerPerson": 3300,
        "stayCostPerDay": 1800,
        "foodCostPerDay": 800,
        "crowd": "High Crowd",
        "rating": 4.6,
        "bestTime": "March to May and October to November",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
        "description": "Queen of the Hills renowned for Darjeeling tea estates, the UNESCO Darjeeling Himalayan Railway toy train, and the sunrise spectacle over Kangchenjunga from Tiger Hill.",
        "highlights": ["Tiger Hill sunrise over Mt. Kangchenjunga", "UNESCO Toy Train steam joyride through Batasia Loop", "Happy Valley Tea Estate tour & Glenary's bakery"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Nepali, Bengali, Hindi, English",
        "isHiddenGem": False,
        "hiddenGemHighlights": "",
        "seasonality": {
            "peakMonths": [4, 5, 10, 11],
            "shoulderMonths": [3, 12],
            "offPeakMonths": [6, 7, 8],
            "peakReason": "Clear mountain vistas in autumn; spring tea flush and pleasant weather in May.",
            "offPeakReason": "Heavy monsoon clouds and rain in July-August.",
            "crowdAdvisory": "Head to Tinchuley or Lamahatta for peaceful pine-forest stays just 45 mins from Darjeeling."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Bagdogra Airport (IXB)",
                "airportCode": "IXB",
                "distanceKm": 68,
                "connectivity": "Direct flights from Kolkata, Delhi, Mumbai, Bangalore, and Guwahati; 2.5 hrs drive to Darjeeling."
            },
            "train": {
                "nearestStation": "New Jalpaiguri (NJP)",
                "stationCode": "NJP",
                "distanceKm": 72,
                "majorTrains": "Vande Bharat Express (Howrah-NJP), Darjeeling Mail, Rajdhani Express."
            },
            "road": {
                "highway": "NH 110 (Hill Cart Road) & Rohini Road",
                "driveHours": "2.5 hours scenic mountain drive from Siliguri/Bagdogra."
            }
        }
    },
    {
        "id": "wb-dooars",
        "name": "Dooars & Tinchuley",
        "state": "West Bengal",
        "city": "Alipurduar",
        "weatherTags": ["Mild", "Tropical", "Any"],
        "vibes": ["Nature", "Adventure", "Relaxation"],
        "purposes": ["Wildlife", "Tea gardens", "Offbeat forest retreat"],
        "dailyCostPerPerson": 2600,
        "stayCostPerDay": 1400,
        "foodCostPerDay": 700,
        "crowd": "Low Crowd",
        "rating": 4.7,
        "bestTime": "October to April",
        "duration": "3-4 Days",
        "image": "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
        "description": "The scenic alluvial floodplain foothills of the Eastern Himalayas, dotted with tea gardens, quiet forest lodges, and Jaldapara National Park's rhinos.",
        "highlights": ["Jaldapara & Gorumara rhino elephant safari", "Buxa Tiger Reserve ruins trek", "Murti riverbank tea estate walks"],
        "continent": "Asia",
        "currency": "Indian Rupee (INR)",
        "language": "Bengali, Nepali, Hindi, English",
        "isHiddenGem": True,
        "hiddenGemHighlights": "A secret green corridor of tea gardens, rushing foothill rivers, and dense forests far removed from hill station tourist crowds.",
        "seasonality": {
            "peakMonths": [11, 12, 1, 2],
            "shoulderMonths": [10, 3, 4],
            "offPeakMonths": [6, 7, 8, 9],
            "peakReason": "Pleasant sunny weather and high wildlife visibility near river banks.",
            "offPeakReason": "Forest parks close from mid-June to mid-September.",
            "crowdAdvisory": "Stay at a forest bungalow on the banks of Murti River for tranquil evening birdwatching."
        },
        "transitHubs": {
            "flight": {
                "nearestAirport": "Bagdogra Airport (IXB)",
                "airportCode": "IXB",
                "distanceKm": 85,
                "connectivity": "Direct flights to Bagdogra; 2 hrs highway drive to Dooars."
            },
            "train": {
                "nearestStation": "New Mal Junction (NMZ) / Alipurduar Junction (APDJ)",
                "stationCode": "NMZ",
                "distanceKm": 25,
                "majorTrains": "Kanchan Kanya Express, Vande Bharat Express (NJP)."
            },
            "road": {
                "highway": "NH 17 & Asian Highway 48",
                "driveHours": "2 hours drive from Siliguri through picturesque tea gardens."
            }
        }
    }
]

def main():
    base_dir = Path(__file__).resolve().parent
    output_path = base_dir / "destinations.json"
    with output_path.open("w", encoding="utf-8") as f:
        json.dump(DESTINATIONS, f, indent=2, ensure_ascii=False)
    print(f"Successfully generated {len(DESTINATIONS)} curated destinations in {output_path}")

if __name__ == "__main__":
    main()
