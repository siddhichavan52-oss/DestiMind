import sys
from pathlib import Path
sys.path.insert(0, "DestiMind/backend")
import time
from datetime import date
from app.rag_engine import rag_engine, predict_crowd_level, check_transport_availability, calculate_appropriate_budget, recommend_hotels_by_budget, generate_day_by_day_itinerary

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

req = Req()

t0 = time.time()
user_context = rag_engine.user_store.get_user_context(None)
t_user = time.time()

candidates = rag_engine.vector_store.search(
    state=req.state,
    city=req.city,
    weather=req.weather,
    vibes=req.vibes,
    user_context=user_context,
    trip_purpose=req.tripPurpose,
    top_k=15,
)
t_search = time.time()

evaluated = []
for idx, place in enumerate(candidates):
    c = predict_crowd_level(place, req.startDate, req.endDate, req.days)
    tr = check_transport_availability(place, req.travelMode, "Delhi", "Delhi", req.startDate, req.endDate, 1)
    b = calculate_appropriate_budget(place, req.days, req.travelMode, 1, "Delhi", req.budget, req.startDate, req.endDate)
    evaluated.append((place, c, tr, b))
t_eval = time.time()

chosen = evaluated[:6]
recs = []
t_hotels_total = 0
t_itin_total = 0
for place, c, tr, b in chosen:
    th0 = time.time()
    hotels = recommend_hotels_by_budget(place, req.days, 1, req.budget, b, req.stayPreference, req.startDate, req.endDate)
    th1 = time.time()
    t_hotels_total += (th1 - th0)
    
    ti0 = time.time()
    itinerary = generate_day_by_day_itinerary(place, req.days, req.travelMode, 1, b, req.vibes, req.startDate, "Delhi", hotels[0])
    ti1 = time.time()
    t_itin_total += (ti1 - ti0)
t_done = time.time()

print(f"User store: {(t_user - t0)*1000:.2f} ms")
print(f"Vector search: {(t_search - t_user)*1000:.2f} ms")
print(f"Candidate eval: {(t_eval - t_search)*1000:.2f} ms")
print(f"Hotels recommendation (6 places): {t_hotels_total*1000:.2f} ms")
print(f"Itinerary generation (6 places): {t_itin_total*1000:.2f} ms")
print(f"Total time: {(t_done - t0)*1000:.2f} ms")
