import json
import sys
import io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

from app.main import RecommendationRequest
from app.rag_engine import rag_engine

# Reload vector store destinations from updated json
rag_engine.vector_store.destinations = json.loads(Path("DestiMind/backend/data/destinations.json").read_text(encoding="utf-8"))

print("=== SCENARIO 1: Cold & Snowy, Adventure (From New Delhi, Rs. 35,000) ===")
req1 = RecommendationRequest(
    country="India", countryCode="IN", state=None, city=None,
    weather="Cold & Snowy", vibes=["Adventure"],
    budget=35000, days=4, travelMode="Flight", originCity="New Delhi"
)
res1 = rag_engine.generate_recommendations(req1)
for idx, r in enumerate(res1.get("recommendations", [])[:5], 1):
    ti = r.get("transportAvailability", {})
    fare = ti.get("roundTripPerPersonINR", "N/A")
    print(f"  {idx}. {r['name']} ({r['state']}) | Weather={r['weather']} | Match={r['match']}% | Flight=Rs.{fare} | Total=Rs.{r['price']}")

print("\n=== SCENARIO 2: Beach & Warm, Relaxation (From New Delhi, Rs. 35,000) ===")
req2 = RecommendationRequest(
    country="India", countryCode="IN", state=None, city=None,
    weather="Beach & Warm", vibes=["Relaxation"],
    budget=35000, days=4, travelMode="Flight", originCity="New Delhi"
)
res2 = rag_engine.generate_recommendations(req2)
for idx, r in enumerate(res2.get("recommendations", [])[:5], 1):
    ti = r.get("transportAvailability", {})
    fare = ti.get("roundTripPerPersonINR", "N/A")
    print(f"  {idx}. {r['name']} ({r['state']}) | Weather={r['weather']} | Match={r['match']}% | Flight=Rs.{fare} | Total=Rs.{r['price']}")

print("\n=== SCENARIO 3: Mild, Spiritual & Culture (From New Delhi, Rs. 35,000) ===")
req3 = RecommendationRequest(
    country="India", countryCode="IN", state=None, city=None,
    weather="Mild", vibes=["Culture", "Spiritual"],
    budget=35000, days=4, travelMode="Flight", originCity="New Delhi"
)
res3 = rag_engine.generate_recommendations(req3)
for idx, r in enumerate(res3.get("recommendations", [])[:5], 1):
    ti = r.get("transportAvailability", {})
    fare = ti.get("roundTripPerPersonINR", "N/A")
    print(f"  {idx}. {r['name']} ({r['state']}) | Weather={r['weather']} | Match={r['match']}% | Flight=Rs.{fare} | Total=Rs.{r['price']}")

print("\n=== SCENARIO 4: Mumbai to Maharashtra (Lonavala Short-Haul, Rs. 25,000) ===")
req4 = RecommendationRequest(
    country="India", countryCode="IN", state="Maharashtra", city=None,
    weather="Mild", vibes=["Nature", "Relaxation"],
    budget=25000, days=3, travelMode="Flight", originCity="Mumbai"
)
res4 = rag_engine.generate_recommendations(req4)
for idx, r in enumerate(res4.get("recommendations", [])[:3], 1):
    ti = r.get("transportAvailability", {})
    fp = ti.get("flightPossible")
    alt = ti.get("recommendedAlternative", {})
    print(f"  {idx}. {r['name']} | Flight Possible={fp} | Reason={ti.get('flightNotViableReason')} | Transit=Rs.{r.get('budgetBreakdown',{}).get('transitTotalINR')} | Alt={alt.get('altMode')}")

print("\n=== SCENARIO 5: Mumbai Open Search (Mode: Flight, Rs. 35,000, Beach & Warm) ===")
req5 = RecommendationRequest(
    country="India", countryCode="IN", state=None, city=None,
    weather="Beach & Warm", vibes=["Relaxation"],
    budget=35000, days=4, travelMode="Flight", originCity="Mumbai"
)
res5 = rag_engine.generate_recommendations(req5)
for idx, r in enumerate(res5.get("recommendations", [])[:5], 1):
    ti = r.get("transportAvailability", {})
    fare = ti.get("roundTripPerPersonINR", "N/A")
    print(f"  {idx}. {r['name']} ({r['state']}) | Weather={r['weather']} | Match={r['match']}% | Flight=Rs.{fare} | Total=Rs.{r['price']}")
