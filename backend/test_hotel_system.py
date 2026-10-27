import os
import json
import math
import re
import urllib.parse
from datetime import date, datetime, timedelta
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

HOTEL_CACHE = {}

VERIFIED_REAL_HOTELS = {
    "tirthan valley": [
        {
            "name": "Raju's Cottage",
            "tier": "Budget / Homestay",
            "categoryTag": "💎 Best Budget Value",
            "roomType": "Riverside Traditional Wooden Cottage",
            "pricePerNightINR": 2400,
            "rating": 4.8,
            "reviewCount": 340,
            "amenities": ["Fresh Trout Dining", "River Access via Pulley", "Free Wi-Fi", "Orchard Lawns", "GHNP Trek Assistance"],
            "locationHighlight": "Gushaini · On Tirthan River bank near GHNP Gate",
            "image": "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
        },
        {
            "name": "The Whispering Pines Cottages Jibhi",
            "tier": "Comfort / Mid-Range",
            "categoryTag": "⭐ Recommended Best Match",
            "roomType": "Deluxe Mountain Balcony Cottage",
            "pricePerNightINR": 4800,
            "rating": 4.6,
            "reviewCount": 210,
            "amenities": ["Complimentary Breakfast", "Valley Balcony", "High-Speed Wi-Fi", "In-House Cafe", "Waterfalls Proximity"],
            "locationHighlight": "Jibhi Valley · Surrounded by deodar and pine forest",
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        },
        {
            "name": "Kudrat - A Boutique Homestay",
            "tier": "Luxury / Resort",
            "categoryTag": "👑 Luxury Upgrade",
            "roomType": "Luxury Suite with Panoramic Valley View",
            "pricePerNightINR": 7500,
            "rating": 4.9,
            "reviewCount": 470,
            "amenities": ["Gourmet Himalayan Dining", "Fireplace & Library Lounge", "Private Verandahs", "Stargazing Deck", "Organic Orchard"],
            "locationHighlight": "Bandal Village, Tirthan Valley · Hilltop vantage point",
            "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        },
    ],
    "havelock island": [
        {
            "name": "Havelock Farms Resort",
            "tier": "Budget / Homestay",
            "categoryTag": "💎 Best Budget Value",
            "roomType": "Standard Room with Garden Balcony",
            "pricePerNightINR": 3200,
            "rating": 4.5,
            "reviewCount": 422,
            "amenities": ["Free Wi-Fi", "Garden Restaurant", "Snorkeling/Diving Desk", "Bicycle Rental", "Ferry Transfer Help"],
            "locationHighlight": "Govind Nagar · 1.3 km to beachfront",
            "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        },
        {
            "name": "TSG Blue Resort & Spa",
            "tier": "Comfort / Mid-Range",
            "categoryTag": "⭐ Recommended Best Match",
            "roomType": "Deluxe Island Villa with Balcony",
            "pricePerNightINR": 4800,
            "rating": 4.5,
            "reviewCount": 1788,
            "amenities": ["Complimentary Breakfast", "Swimming Pool", "Spa & Wellness", "Beach Access", "Scuba Diving Centre"],
            "locationHighlight": "Near Radhanagar Beach (Beach No 7)",
            "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        },
        {
            "name": "Taj Exotica Resort & Spa, Andamans",
            "tier": "Luxury / Resort",
            "categoryTag": "👑 Luxury Upgrade",
            "roomType": "Luxury Thatched Villa on Radhanagar Beach",
            "pricePerNightINR": 18000,
            "rating": 4.9,
            "reviewCount": 850,
            "amenities": ["Private White Sand Beach", "Olympic Infinity Pool", "Jiva Spa", "Gourmet Dining Pavilion", "Marine Naturalist Desk"],
            "locationHighlight": "Right on Radhanagar Beach (Beach No 7)",
            "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
        },
    ]
}

def test_recommend_hotels(dest_name, state, city, days, group_size, user_budget, allocated_stay, start_date=None, end_date=None):
    num_days = max(1, days)
    people = max(1, group_size)
    rooms_needed = math.ceil(people / 2)
    
    if not start_date:
        start_date = date.today() + timedelta(days=7)
    if not end_date:
        end_date = start_date + timedelta(days=num_days)
    
    nights = max(1, (end_date - start_date).days)
    checkin_str = start_date.strftime("%Y-%m-%d")
    checkout_str = end_date.strftime("%Y-%m-%d")
    
    norm_dest = dest_name.lower().strip()
    raw_list = None
    for k, v in VERIFIED_REAL_HOTELS.items():
        if k in norm_dest or norm_dest in k:
            raw_list = v
            break
            
    hotels = []
    for idx, raw in enumerate(raw_list or []):
        rate = raw["pricePerNightINR"]
        total_stay = rate * nights * rooms_needed
        diff = allocated_stay - total_stay
        within_budget = total_stay <= int(allocated_stay * 1.15)
        
        encoded_q = urllib.parse.quote_plus(f"{raw['name']} {dest_name} {city}")
        encoded_h = urllib.parse.quote_plus(f"{raw['name']} {city}")
        
        google_url = f"https://www.google.com/travel/hotels?q={encoded_q}&dates={checkin_str}_{checkout_str}&adults={people}&rooms={rooms_needed}"
        booking_url = f"https://www.booking.com/searchresults.html?ss={encoded_h}&checkin={checkin_str}&checkout={checkout_str}&group_adults={people}&no_rooms={rooms_needed}"
        agoda_url = f"https://www.agoda.com/search?text={encoded_h}&checkIn={checkin_str}&checkOut={checkout_str}&rooms={rooms_needed}&adults={people}"
        
        hotels.append({
            "name": raw["name"],
            "tier": raw["tier"],
            "pricePerNightINR": rate,
            "totalStayCostINR": total_stay,
            "roomsNeeded": rooms_needed,
            "nights": nights,
            "withinBudget": within_budget,
            "diffFromAllocatedINR": diff,
            "googleHotelsUrl": google_url,
            "bookingComUrl": booking_url,
            "agodaUrl": agoda_url,
            "checkinDate": checkin_str,
            "checkoutDate": checkout_str,
            "datesFormatted": f"{start_date.strftime('%d %b %Y')} – {end_date.strftime('%d %b %Y')} ({nights} Nights)",
            "guestRoomFormatted": f"{people} Guest{'s' if people > 1 else ''} · {rooms_needed} Room{'s' if rooms_needed > 1 else ''}",
            "datesPreFilled": True,
        })
    return hotels

if __name__ == "__main__":
    h_list = test_recommend_hotels(
        dest_name="Havelock Island",
        state="Andaman and Nicobar Islands",
        city="Port Blair",
        days=5,
        group_size=2,
        user_budget=45000,
        allocated_stay=16000,
        start_date=date(2026, 11, 12),
        end_date=date(2026, 11, 17)
    )
    for h in h_list:
        print(f"Hotel: {h['name']} ({h['tier']})")
        print(f"  Dates: {h['datesFormatted']} | Rate: INR {h['pricePerNightINR']}/nt | Total: INR {h['totalStayCostINR']}")
        print(f"  Within budget: {h['withinBudget']} (Diff: INR {h['diffFromAllocatedINR']})")
        print(f"  Google URL: {h['googleHotelsUrl']}")
        print(f"  Booking.com URL: {h['bookingComUrl']}")
        print()
