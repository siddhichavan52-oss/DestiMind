import json
import sys
import io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

p = Path("DestiMind/backend/data/destinations.json")
destinations = json.loads(p.read_text(encoding="utf-8"))

def score_preference(dest, weather, vibes, trip_purpose=None, user_context=None, norm_city=None):
    score = 65.0
    req_weather = (weather or "").strip().lower()
    dest_tags = [t.lower() for t in dest.get("weatherTags", [])]
    dest_text = " ".join([
        dest.get("name", ""),
        dest.get("city", ""),
        dest.get("state", ""),
        dest.get("description", ""),
        dest.get("bestTime", ""),
        *dest.get("vibes", []),
        *dest.get("highlights", []),
    ]).lower()

    # Exact city match bonus
    if norm_city and norm_city in dest_text:
        score += 15.0

    # --- 1. WEATHER MATCHING ---
    if not req_weather or req_weather in ["any", "flexible", "all"]:
        score += 6.0
    else:
        is_snow = any(k in req_weather for k in ["cold", "snow", "winter"])
        is_beach = any(k in req_weather for k in ["beach", "warm", "sea", "coastal"])
        is_tropical = "tropical" in req_weather
        is_mild = "mild" in req_weather

        dest_is_snow = any("cold" in t or "snow" in t for t in dest_tags) or any(k in dest_text for k in ["snow", "himalaya", "glacier", "sub-zero"])
        dest_is_beach = any("beach" in t or "warm" in t for t in dest_tags) or any(k in dest_text for k in ["beach", "coast", "sea", "island"])

        if is_snow:
            if dest_is_snow:
                score += 30.0
                if "snow" in dest_text or "himalaya" in dest_text:
                    score += 5.0
            else:
                score -= 40.0
        elif is_beach:
            if dest_is_beach:
                score += 30.0
                if "beach" in dest_text or "island" in dest_text:
                    score += 5.0
            else:
                score -= 40.0
        elif is_tropical:
            if any("tropical" in t for t in dest_tags):
                score += 25.0
            elif dest_is_snow:
                score -= 30.0
            else:
                score += 4.0
        elif is_mild:
            if any("mild" in t for t in dest_tags):
                score += 20.0
            else:
                score -= 10.0

    # --- 2. VIBES OVERLAP ---
    req_vibes = [v.strip().lower() for v in (vibes or []) if v.strip()]
    dest_vibes = [v.strip().lower() for v in dest.get("vibes", [])]

    if req_vibes:
        matched = 0
        for rv in req_vibes:
            if any(rv in dv or dv in rv for dv in dest_vibes):
                matched += 1.0
            elif rv in dest_text:
                matched += 0.5
        overlap_ratio = matched / len(req_vibes)
        score += overlap_ratio * 35.0
        if matched == 0:
            score -= 25.0

    # --- 3. PURPOSE MATCHING ---
    if trip_purpose:
        tp = trip_purpose.strip().lower()
        if tp in dest_text or any(tp in dv for dv in dest_vibes):
            score += 6.0

    # Gem bonus
    if dest.get("isHiddenGem"):
        score += 3.0

    return max(40.0, min(99.0, round(score, 1)))


from app.rag_engine import check_transport_availability, calculate_appropriate_budget

def run_test(title, weather, vibes, purpose, budget, origin_city, state=None):
    print(f"\n=======================================================")
    print(f"SCENARIO: {title}")
    print(f"Weather='{weather}', Vibes={vibes}, Origin={origin_city}, State={state}, Budget=Rs.{budget}")
    print(f"=======================================================")

    # Candidates pool
    if state and state.lower() not in ["", "any", "all", "flexible"]:
        pool = [d for d in destinations if d.get("state", "").lower() == state.lower()]
    else:
        pool = destinations

    evaluated = []
    for d in pool:
        pref = score_preference(d, weather, vibes, purpose)
        transit_info = check_transport_availability(d, "Flight", origin_city, "State", None, None, group_size=1)
        budget_info = calculate_appropriate_budget(d, 4, "Flight", 1, origin_city, budget)
        transit_fare = budget_info["transitTotalINR"]
        flight_possible = transit_info.get("flightPossible", True)

        if pref >= 85:
            tier = 0
        elif pref >= 75:
            tier = 1
        else:
            tier = 2

        flight_viable = flight_possible if (not state) else True

        evaluated.append({
            "name": d["name"],
            "state": d["state"],
            "pref": pref,
            "tier": tier,
            "flight_fare": transit_fare,
            "total_trip": budget_info["totalEstimatedINR"],
            "within_budget": budget_info["withinBudget"],
            "flight_possible": flight_possible,
            "flight_viable": flight_viable,
            "transit_info": transit_info,
        })

    # Sort
    evaluated.sort(key=lambda r: (
        not r["within_budget"],
        not r["flight_viable"],
        r["tier"],
        r["flight_fare"],
        r["total_trip"],
        -r["pref"]
    ))

    for idx, c in enumerate(evaluated[:5], 1):
        fp_note = "FLIGHT OK" if c["flight_possible"] else f"NO FLIGHT ({c['transit_info'].get('flightNotViableReason', 'Road/Train alt')})"
        print(f"  {idx}. {c['name']} ({c['state']}) | Match: {c['pref']}% | Flight: Rs.{c['flight_fare']} | Total: Rs.{c['total_trip']} | {fp_note}")

run_test("1. Cold & Snowy / Adventure", "Cold & Snowy", ["Adventure"], "Adventure", 35000, "New Delhi")
run_test("2. Beach & Warm / Relaxation", "Beach & Warm", ["Relaxation"], "Leisure", 35000, "New Delhi")
run_test("3. Mild / Spiritual & Culture", "Mild", ["Culture", "Spiritual"], "Leisure", 35000, "New Delhi")
run_test("4. Mumbai to Maharashtra (Lonavala Short-Haul)", "Mild", ["Nature", "Relaxation"], "Weekend Getaway", 25000, "Mumbai", state="Maharashtra")
run_test("5. Tropical / Nightlife & Food", "Tropical", ["Nightlife", "Food"], "Friends Trip", 35000, "Mumbai")
