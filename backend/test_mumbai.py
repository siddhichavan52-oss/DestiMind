import sys
from pathlib import Path
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

import time
from datetime import date
from app.rag_engine import rag_engine

class Req:
    country = "India"
    countryCode = "IN"
    state = None
    city = None
    weather = "Any"
    vibes = ["Adventure", "Relaxation"]
    budget = 28000
    days = 5
    startDate = date(2026, 11, 15)
    endDate = date(2026, 11, 20)
    travelMode = "Flight"
    groupType = "Solo"
    groupSize = 1
    placesVisitedBefore = []
    tripPurpose = "Leisure"
    stayPreference = None
    originCity = "Mumbai"
    originState = "Maharashtra"

t0 = time.time()
res = rag_engine.generate_recommendations(Req())
t1 = time.time()

print(f"Execution time: {(t1 - t0)*1000:.2f} ms")
for r in res['recommendations']:
    b = r['budgetBreakdown']
    t = r['transportAvailability']
    print(f"{r['name']} ({r['state']}) | Total: Rs {r['price']:,} | Flight: Rs {t['cheapestFareINR']:,} ({t['cheapestCarrier']}) | Hub: {t['hubCode']}")
    print("  URL:", t['bookingUrl'])
