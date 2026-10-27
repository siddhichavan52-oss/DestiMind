# DestiMind RAG Backend (FastAPI + Gemini + Vector Memory)

DestiMind features an end-to-end **Retrieval-Augmented Generation (RAG)** pipeline designed for personalized travel planning across **all 36 States and Union Territories of India**.

---

## 🌟 Key Features

1. **RAG Knowledge Base covering all 36 Indian States & UTs**
   - Curated destinations covering all 28 states and 8 union territories on the dashboard.
   - Comprehensive metadata: vibes, weather, daily rates, connectivity hubs, and seasonal crowd calendars.

2. **Hidden Destinations & Offbeat Gems Recommendation**
   - Over 50% of the catalog features verified, pristine **Hidden Gems** (e.g. *Tirthan Valley, Ziro Valley, Gandikota, Kaas Plateau, Gurez Valley, Netarhat, Neil Island, Agatti Atoll, Chopta, Badami, Bundi, Daringbadi, Valmiki Tiger Reserve, Unakoti, Dooars*).
   - Dedicated `💎 Hidden Gem` badges and secret highlights displayed on cards and details.
   - Results page includes interactive segmented filters: *All Destinations*, *💎 Hidden Gems Only*, and *⭐ Popular Highlights*.

3. **Dynamic User Memory Training ("Train itself on user data")**
   - Ingests and trains long-term memory on the user's home origin (city, state), favorite destinations, visited places, preferred vibes, and past queries.
   - Endpoint `POST /api/user/train` embeds user travel personality into the RAG retriever.
   - Recommendations are personalized to avoid previously visited spots and highlight new discoveries matching their style.

4. **Appropriate Budget Calculation by Dates & Mode of Transportation**
   - Input: number of days/dates, group size, and travel mode (*Flight*, *Train*, *Road Trip*, *Cruise*, *Flexible*).
   - Detailed breakdown computed per destination:
     - **Accommodation (Stay)** for $N$ days & rooms.
     - **Intercity Transit** tailored to the chosen mode (realistic roundtrip flight/train/road fares).
     - **Meals & Daily Sightseeing**.
   - Compares total trip cost against the user's target budget, flagging *Within Budget*, *Balanced Fit*, or *Tight Budget*, accompanied by money-saving travel tips.

5. **Date-Aware Crowd Prediction Engine**
   - Analyzes the traveler's exact start and end dates against destination-specific month-by-month visitor patterns.
   - Detects holiday surges (Christmas/New Year, Diwali, Summer hill-station peaks, Monsoon rains).
   - Returns crowd level (*Low Crowd*, *Medium Crowd*, *High Crowd*), status badge (e.g. *Peaceful & Serene*, *Peak Tourist Rush*), detailed reasoning, and a **Crowd Avoidance Advice** tip.

6. **Flight & Train Availability Intelligence**
   - Identifies nearest commercial airport (IATA code, distance in km) or railway station (IRCTC code, distance in km).
   - Checks frequency, route connectivity, and seat demand forecast for the user's chosen dates (e.g. *Seats Readily Available*, *RAC / Advance Reservation Advised*, *Tatkal Window Option*).
   - Generates one-click direct links to **Google Flights** (prefilled with origin, destination airport, and dates) and **IRCTC Official Booking Portal**.

---

## 🚀 Setup & Running

### Requirements
- Python 3.10+ (Python 3.13 tested)
- Gemini API key from <https://aistudio.google.com/apikey>
- Node.js & npm for frontend

### 1. Install Backend Dependencies
```powershell
cd DestiMind\backend
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 2. Configure Environment
In `backend/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_ORIGINS=http://localhost:3000,http://localhost:5173
MONGODB_URI=mongodb+srv://<db_user>:<db_password>@<cluster-host>/
MONGODB_DATABASE=destimind
```

Create a MongoDB Atlas cluster and a database user, then copy the cluster connection string into `MONGODB_URI` (replace the placeholders and URL-encode special characters in the password). Allow your development IP in Atlas Network Access. Keep `backend/.env` private and never put the Atlas URI in a `VITE_` frontend variable. The backend creates a `users` collection and a unique index on normalized email; account documents contain a salted password hash and the saved travel profile. Install dependencies again after adding the MongoDB driver.

### 3. Run FastAPI Backend
```powershell
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
Interactive Swagger docs: <http://127.0.0.1:8000/docs>
RAG Status check: <http://127.0.0.1:8000/api/rag/status>

### 4. Run React Frontend
In a separate terminal in `DestiMind`:
```powershell
npm.cmd run dev
```
Open <http://localhost:3000> in your browser.

---

## 📡 API Endpoints

- `POST /api/recommendations`: RAG recommendation engine returning grounded destinations, hidden gems, budget sheets, crowd forecasts, and transport availability.
- `POST /api/user/train`: Trains and saves user profile memory, favorites, and visited places into RAG storage.
- `GET /api/user/profile/{email}`: Retrieves trained profile and personality context.
- `GET /api/rag/status`: Health and catalog statistics (destinations, states, hidden gems, trained users).
- `GET /api/destinations/states`: Returns list of all covered states and cities.
