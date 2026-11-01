import sys
import io
from pathlib import Path
from datetime import date

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

from app.main import RecommendationRequest
from app.rag_engine import rag_engine

# Test 1: Mountains & Snow
print("=== PREFERENCE 1: Cold, Mountains, Adventure ===")
req1 = RecommendationRequest(
    country="India", countryCode="IN", state=None, city=None,
    weather="Cold", vibes=["Mountains", "Adventure", "Snow"],
    budget=35000, days=5, travelMode="Flight", originCity="New Delhi"
)
res1 = rag_engine.generate_recommendations(req1)
for r in res1.get("recommendations", [])[:4]:
    print(f"  * {r['name']} ({r['state']}): Weather={r['weather']}, Vibes={r.get('highlights', [])[:2]}, Match={r['match']}%")

# Test 2: Beach & Nightlife
print("\n=== PREFERENCE 2: Tropical, Beaches, Relaxation ===")
req2 = RecommendationRequest(
    country="India", countryCode="IN", state=None, city=None,
    weather="Tropical", vibes=["Beaches", "Relaxation"],
    budget=35000, days=5, travelMode="Flight", originCity="New Delhi"
)
res2 = rag_engine.generate_recommendations(req2)
for r in res2.get("recommendations", [])[:4]:
    print(f"  * {r['name']} ({r['state']}): Weather={r['weather']}, Vibes={r.get('highlights', [])[:2]}, Match={r['match']}%")

# Test 3: Spiritual & Heritage
print("\n=== PREFERENCE 3: Mild, Spiritual, Heritage ===")
req3 = RecommendationRequest(
    country="India", countryCode="IN", state=None, city=None,
    weather="Mild", vibes=["Spiritual", "Heritage", "Temples"],
    budget=35000, days=5, travelMode="Flight", originCity="New Delhi"
)
res3 = rag_engine.generate_recommendations(req3)
for r in res3.get("recommendations", [])[:4]:
    print(f"  * {r['name']} ({r['state']}): Weather={r['weather']}, Vibes={r.get('highlights', [])[:2]}, Match={r['match']}%")
