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
    originCity = "Delhi"
    originState = "Delhi"

t0 = time.time()
res = rag_engine.generate_recommendations(Req())
t1 = time.time()

print(f"Execution time: {(t1 - t0)*1000:.2f} ms ({(t1 - t0):.3f} s)")
print(f"Total recommendations: {res['count']}")
print(f"Flight Comparison Meta: {res.get('flightComparison')}")
for r in res['recommendations']:
    b = r['budgetBreakdown']
    t = r['transportAvailability']
    h = r['recommendedHotel']
    print(f"--- {r['name']} ({r['state']}) ---")
    print(f"  Est Total: Rs {r['price']:,} | Within Budget: {b['withinBudget']}")
    print(f"  Breakdown: Flight: Rs {b['transitTotalINR']:,} + Stay: Rs {b['stayTotalINR']:,} + Meals: Rs {b['mealsActivitiesTotalINR']:,} = Rs {b['totalEstimatedINR']:,}")
    print(f"  Flight: Rs {t['cheapestFareINR']:,}/person on {t['cheapestCarrier']} ({t['availabilityBadge']})")
    print(f"  Hotel: {h['name']} (Rs {h['pricePerNightINR']:,}/nt, Total: Rs {h['totalStayCostINR']:,})")
    print(f"  Google Flights: {t['bookingUrl']}")
