import requests
import json

base_url = "http://127.0.0.1:8000"

print("1. Testing /api/itinerary with specific dates...")
payload_itin = {
    "destination": "Tirthan Valley & Jibhi",
    "days": 5,
    "travelMode": "Flight",
    "groupSize": 2,
    "budget": 45000,
    "startDate": "2026-11-05",
    "endDate": "2026-11-10",
    "originCity": "Delhi",
    "originState": "Delhi"
}

resp = requests.post(f"{base_url}/api/itinerary", json=payload_itin, timeout=40)
print(f"Status Code: {resp.status_code}")
if resp.status_code == 200:
    data = resp.json()
    with open("api_itinerary_result.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print("SUCCESS! Saved /api/itinerary output to api_itinerary_result.json")
    for h in data.get("hotels", []):
        print(f"Hotel: {h['name']} | Dates: {h.get('datesFormatted')} | Rate: INR {h['pricePerNightINR']} | Booking URL: {h['bookingUrl']}")
else:
    print("Error:", resp.text)
