from __future__ import annotations

import json
import os
import re
import base64
import hashlib
import hmac
import secrets
from functools import lru_cache
from datetime import date
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, model_validator
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError

from .rag_engine import rag_engine

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip()
FRONTEND_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS", "http://localhost:3000,http://localhost:5173"
    ).split(",")
    if origin.strip()
]
MONGODB_URI = os.getenv("MONGODB_URI", "").strip()
MONGODB_DATABASE = os.getenv("MONGODB_DATABASE", "destimind").strip()


@lru_cache(maxsize=1)
def get_users_collection():
    if not MONGODB_URI:
        raise HTTPException(status_code=503, detail="MongoDB is not configured. Set MONGODB_URI in backend/.env.")
    client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
    collection = client[MONGODB_DATABASE]["users"]
    collection.create_index("email", unique=True)
    return collection


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1)
    return base64.b64encode(salt + digest).decode()


def verify_password(password: str, stored: str) -> bool:
    try:
        raw = base64.b64decode(stored.encode())
        salt, expected = raw[:16], raw[16:]
        actual = hashlib.scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1)
        return hmac.compare_digest(actual, expected)
    except (ValueError, TypeError):
        return False

app = FastAPI(
    title="DestiMind RAG API",
    description="Intelligent personalized destination recommendations powered by RAG across all Indian States & UTs.",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserTrainingRequest(BaseModel):
    email: str = Field(min_length=3, max_length=200)
    name: str | None = None
    originCity: str | None = None
    originState: str | None = None
    favoriteDestinations: list[str] = Field(default_factory=list)
    preferredVibes: list[str] = Field(default_factory=list)
    placesVisited: list[str] = Field(default_factory=list)
    tripHistoryItem: dict[str, Any] | None = None


class SignupRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: str = Field(min_length=3, max_length=200)
    password: str = Field(min_length=6, max_length=200)


class LoginRequest(BaseModel):
    email: str = Field(min_length=3, max_length=200)
    password: str = Field(min_length=1, max_length=200)


class ProfileRequest(BaseModel):
    countryCode: str = ""
    country: str = ""
    stateCode: str = ""
    state: str = ""
    city: str = ""
    destinations: list[str] = Field(default_factory=list)
    vibes: list[str] = Field(default_factory=list)


@app.post("/api/auth/signup")
def signup(payload: SignupRequest) -> dict[str, Any]:
    email = payload.email.strip().lower()
    try:
        get_users_collection().insert_one({
            "name": payload.name.strip(), "email": email,
            "passwordHash": hash_password(payload.password), "profile": None,
        })
    except DuplicateKeyError:
        raise HTTPException(status_code=409, detail="An account with this email already exists. Log in instead.")
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=503, detail=f"Could not connect to MongoDB: {exc}")
    return {"success": True, "user": {"name": payload.name.strip(), "email": email}}


@app.post("/api/auth/login")
def login(payload: LoginRequest) -> dict[str, Any]:
    try:
        user = get_users_collection().find_one({"email": payload.email.strip().lower()})
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=503, detail=f"Could not connect to MongoDB: {exc}")
    if not user or not verify_password(payload.password, user.get("passwordHash", "")):
        raise HTTPException(status_code=401, detail="No account found with that email and password. Sign up first.")
    return {"success": True, "user": {"name": user["name"], "email": user["email"]}}


@app.get("/api/user/profile/{email}")
def get_account_profile(email: str) -> dict[str, Any]:
    try:
        user = get_users_collection().find_one({"email": email.strip().lower()}, {"profile": 1})
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=503, detail=f"Could not connect to MongoDB: {exc}")
    return {"profile": user.get("profile") if user else None}


@app.put("/api/user/profile/{email}")
def save_account_profile(email: str, payload: ProfileRequest) -> dict[str, Any]:
    try:
        result = get_users_collection().update_one(
            {"email": email.strip().lower()}, {"$set": {"profile": payload.model_dump()}}
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=503, detail=f"Could not connect to MongoDB: {exc}")
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User account not found.")
    return {"success": True, "profile": payload.model_dump()}


class RecommendationRequest(BaseModel):
    country: str = "India"
    countryCode: str = "IN"
    state: str | None = Field(default=None, max_length=100)
    city: str | None = None
    weather: str = "Any"
    vibes: list[str] = Field(default_factory=list)
    budget: float = Field(default=25000, gt=0, le=100_000_000)
    days: int = Field(default=5, ge=1, le=30)
    startDate: date | None = None
    endDate: date | None = None
    travelMode: str = "Flexible"
    transportBudgetLocked: float | None = None
    groupType: str = "Solo"
    groupSize: int | None = Field(default=1, ge=1, le=100)
    placesVisitedBefore: list[str] = Field(default_factory=list)
    learnedVibes: list[str] = Field(default_factory=list)
    tripPurpose: str | None = None
    stayPreference: str | None = None
    originCity: str | None = None
    originState: str | None = None
    userEmail: str | None = None
    userName: str | None = None
    favoriteDestinations: list[str] = Field(default_factory=list)

    @model_validator(mode="before")
    @classmethod
    def sanitize_inputs(cls, data: Any) -> Any:
        if isinstance(data, dict):
            # Convert empty string dates or null strings to None
            for date_key in ("startDate", "endDate"):
                val = data.get(date_key)
                if val == "" or val is None or val == "null":
                    data[date_key] = None
            
            # Sanitize days if 0 or invalid
            d = data.get("days")
            if not d or (isinstance(d, (int, float)) and d < 1):
                data["days"] = 5
            elif isinstance(d, (int, float)) and d > 30:
                data["days"] = 30
            
            # Sanitize budget if 0 or invalid
            b = data.get("budget")
            if not b or (isinstance(b, (int, float)) and b <= 0):
                data["budget"] = 25000.0

            # Sanitize groupSize
            gs = data.get("groupSize")
            if not gs or (isinstance(gs, (int, float)) and gs < 1):
                data["groupSize"] = 1
                
            # Sanitize state and city empty strings
            for str_key in ("state", "city"):
                val = data.get(str_key)
                if val == "" or val == "Any" or val == "All States":
                    data[str_key] = None
            
            if not data.get("weather") or data.get("weather") == "":
                data["weather"] = "Any"
            if not data.get("travelMode") or data.get("travelMode") == "":
                data["travelMode"] = "Flexible"
            if not data.get("groupType") or data.get("groupType") == "":
                data["groupType"] = "Solo"
        return data

    @model_validator(mode="after")
    def validate_dates(self) -> "RecommendationRequest":
        if self.startDate and self.endDate and self.endDate < self.startDate:
            self.startDate, self.endDate = self.endDate, self.startDate
        return self


@app.get("/")
def root() -> dict[str, str]:
    return {
        "name": "DestiMind RAG API",
        "docs": "/docs",
        "health": "/api/health",
        "ragStatus": "/api/rag/status",
    }


@app.get("/api/health")
def health() -> dict[str, Any]:
    return {
        "status": "ok",
        "geminiConfigured": bool(GEMINI_API_KEY),
        "model": GEMINI_MODEL,
        "ragEngine": "active",
        "catalogDestinations": len(rag_engine.vector_store.destinations),
    }


@app.get("/api/rag/status")
def rag_status() -> dict[str, Any]:
    destinations = rag_engine.vector_store.destinations
    states = sorted({d["state"] for d in destinations})
    hidden_gems = [d for d in destinations if d.get("isHiddenGem")]
    return {
        "status": "healthy",
        "totalDestinations": len(destinations),
        "totalStatesCovered": len(states),
        "totalHiddenGems": len(hidden_gems),
        "allStates": states,
        "trainedUsersCount": len(rag_engine.user_store._profiles),
        "embeddingModel": "gemini-embedding-001",
        "llmModel": GEMINI_MODEL,
    }


@app.get("/api/destinations/states")
def get_destinations_states() -> dict[str, Any]:
    destinations = rag_engine.vector_store.destinations
    grouped: dict[str, list[dict[str, Any]]] = {}
    for d in destinations:
        s = d["state"]
        if s not in grouped:
            grouped[s] = []
        grouped[s].append({
            "name": d["name"],
            "city": d["city"],
            "isHiddenGem": d.get("isHiddenGem", False),
            "crowd": d.get("crowd", "Medium Crowd"),
        })
    return {
        "statesCount": len(grouped),
        "states": grouped,
    }


@app.post("/api/user/train")
def train_user(payload: UserTrainingRequest) -> dict[str, Any]:
    """Ingests user profile, favorites, visited places, and trip history into the RAG memory store."""
    try:
        updated_profile = rag_engine.user_store.train_user(
            email=payload.email,
            name=payload.name,
            origin_city=payload.originCity,
            origin_state=payload.originState,
            favorite_destinations=payload.favoriteDestinations,
            preferred_vibes=payload.preferredVibes,
            places_visited=payload.placesVisited,
            trip_history_item=payload.tripHistoryItem,
        )
        context = rag_engine.user_store.get_user_context(payload.email)
        return {
            "success": True,
            "message": f"DestiMind RAG memory trained successfully for {payload.email}.",
            "profile": updated_profile,
            "learnedContext": context,
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to train user memory: {exc}")


@app.get("/api/user/memory/{email}")
def get_user_profile(email: str) -> dict[str, Any]:
    context = rag_engine.user_store.get_user_context(email)
    profile = rag_engine.user_store._profiles.get(email.strip().lower())
    return {
        "email": email,
        "found": bool(profile),
        "profile": profile,
        "contextSummary": context.get("summary", ""),
    }


@app.post("/api/recommendations")
def recommend(request: RecommendationRequest) -> dict[str, Any]:
    """
    RAG Recommendation Pipeline:
    - Retreives learned user context
    - Performs hybrid semantic search across Indian destinations
    - Integrates hidden destination recommendations
    - Predicts date-specific crowd density and seasonality
    - Checks live flight and train availability, nearest hubs, and booking routes
    - Calculates transparent itemized budget (stay, transit, food/activities)
    """
    try:
        # Also train with preferences if userEmail is supplied
        if request.userEmail:
            rag_engine.user_store.train_user(
                email=request.userEmail,
                name=request.userName,
                origin_city=request.originCity,
                origin_state=request.originState,
                favorite_destinations=request.favoriteDestinations,
                preferred_vibes=request.vibes + request.learnedVibes,
                places_visited=request.placesVisitedBefore,
            )

        return rag_engine.generate_recommendations(request, user_email=request.userEmail)
    except Exception as exc:
        print(f"Error in RAG recommendation endpoint: {exc}")
        raise HTTPException(
            status_code=500,
            detail=f"Error generating RAG recommendations: {str(exc)}"
        )


class ItineraryRequest(BaseModel):
    destination: str = Field(min_length=1)
    days: int = Field(ge=1, le=30, default=5)
    travelMode: str = "Flight"
    groupSize: int = Field(ge=1, le=100, default=1)
    budget: float = Field(gt=0, default=35000.0)
    vibes: list[str] = Field(default_factory=list)
    startDate: date | None = None
    endDate: date | None = None
    originCity: str | None = None
    originState: str | None = None
    stayPreference: str | None = None


@app.post("/api/itinerary")
def get_custom_itinerary(payload: ItineraryRequest) -> dict[str, Any]:
    """
    Generates a structured, day-by-day travel plan (Days 1..N) tailored to:
    - Number of days selected
    - Transportation mode (Flight transfers, train or road)
    - Budget allocation per person
    - Specific offbeat and iconic activities
    - Curated hotel recommendations by budget
    """
    try:
        return rag_engine.generate_custom_itinerary(
            destination_name_or_id=payload.destination,
            days=payload.days,
            travel_mode=payload.travelMode,
            group_size=payload.groupSize,
            budget=payload.budget,
            vibes=payload.vibes,
            start_date=payload.startDate,
            end_date=payload.endDate,
            origin_city=payload.originCity,
            origin_state=payload.originState,
            stay_preference=payload.stayPreference,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate custom itinerary: {str(exc)}"
        )

