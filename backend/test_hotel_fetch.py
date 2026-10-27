import os
import json
import re
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))

prompt = """You are a hotel booking specialist. Find 3 REAL, EXISTING hotels/homestays/resorts in Tirthan Valley, Himachal Pradesh for travel dates check-in 2026-11-05 to check-out 2026-11-10 for 2 guests.
Cover 3 tiers:
1. Budget / Homestay (Affordable real homestay like Raju's Cottage, Khem Bharti, etc.)
2. Comfort / Mid-Range (Good 3-star/boutique hotel like The Whispering Pines, For Awhile, etc.)
3. Luxury / Resort (Top retreat like Himalayan Trout House, Kudrat Luxury, etc.)

Return ONLY valid JSON matching this exact structure:
[
  {
    "name": "Exact real hotel name",
    "tier": "Budget / Homestay",
    "categoryTag": "💎 Best Budget Value",
    "pricePerNightINR": 2200,
    "rating": 4.7,
    "reviewCount": 250,
    "roomType": "Standard Riverview Room",
    "amenities": ["Free Wi-Fi", "Breakfast included", "River view", "Bonfire"],
    "locationHighlight": "Gushaini, Tirthan Valley",
    "availabilityStatus": "Rooms Available for Selected Dates",
    "availabilityBadge": "Instant Confirmation"
  }
]
"""

try:
    resp = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            tools=[types.Tool(google_search=types.GoogleSearch())],
            temperature=0.2,
        )
    )
    with open("test_hotel_result.json", "w", encoding="utf-8") as f:
        f.write(resp.text)
    print("SUCCESS: Result written to test_hotel_result.json")
except Exception as e:
    print("ERROR:", e)
