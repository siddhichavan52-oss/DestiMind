import os
import json
import re
import math
import urllib.parse
from datetime import date, datetime, timedelta
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))

def test_fetch(dest_name, city, state, checkin_str, checkout_str, group_size, nights, user_budget, allocated_stay):
    rooms_needed = math.ceil(group_size / 2)
    prompt = f"""You are a live travel booking engine. Use Google Search to find 3 REAL, EXISTING, CURRENTLY OPERATING hotels or homestays in {dest_name}, {city}, {state} for travel dates: check-in {checkin_str} to check-out {checkout_str} for {group_size} guests ({rooms_needed} room, {nights} nights).
Total stay budget target is INR {allocated_stay}.

Cover 3 distinct tiers:
1. "Budget / Homestay": A real authentic homestay or guesthouse (affordable, high guest satisfaction).
2. "Comfort / Mid-Range": A real quality 3-4 star boutique hotel, eco-lodge or resort.
3. "Luxury / Resort": A real top-rated luxury retreat, palace, or 5-star resort.

Return ONLY a valid JSON list of 3 items with these exact keys:
[
  {{
    "name": "Exact real name of hotel",
    "tier": "Budget / Homestay",
    "categoryTag": "💎 Best Budget Value",
    "pricePerNightINR": 2400,
    "rating": 4.7,
    "reviewCount": 280,
    "roomType": "Standard Riverview Room",
    "amenities": ["Free Wi-Fi", "Breakfast Included", "River View", "Bonfire"],
    "locationHighlight": "Real neighborhood or landmark in destination",
    "availabilityStatus": "Rooms Available for {checkin_str} to {checkout_str}",
    "availabilityBadge": "Instant Confirmation",
    "image": "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80"
  }}
]
"""

    resp = client.models.generate_content(
        model=os.getenv('GEMINI_MODEL', 'gemini-2.5-flash'),
        contents=prompt,
        config=types.GenerateContentConfig(
            tools=[types.Tool(google_search=types.GoogleSearch())],
            temperature=0.2,
        )
    )

    raw_text = resp.text.strip()
    clean_json = re.sub(r"^```(?:json)?\s*", "", raw_text, flags=re.MULTILINE)
    clean_json = re.sub(r"```\s*$", "", clean_json, flags=re.MULTILINE).strip()
    
    data = json.loads(clean_json)
    return data

if __name__ == "__main__":
    result = test_fetch(
        dest_name="Havelock Island (Swaraj Dweep)",
        city="Port Blair",
        state="Andaman and Nicobar Islands",
        checkin_str="2026-11-12",
        checkout_str="2026-11-17",
        group_size=2,
        nights=5,
        user_budget=45000,
        allocated_stay=15000
    )
    with open("havelock_hotels_result.json", "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)
    print("Fetched hotels successfully! Total items:", len(result))
    for h in result:
        print(f"- {h['name']} | {h['tier']} | Rate: INR {h['pricePerNightINR']}/nt | Rating: {h['rating']}★")
