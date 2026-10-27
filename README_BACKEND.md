# DestiMind backend quick start

The FastAPI + Gemini backend setup, environment variables, endpoint contract, and limitations are documented in [`backend/README.md`](backend/README.md).

Short version:

1. Create `backend/.env` and set `GEMINI_API_KEY`, `MONGODB_URI`, and (optionally) `MONGODB_DATABASE`; Atlas setup is documented in `backend/README.md`.
2. Install Python dependencies from `backend/requirements.txt` in a virtual environment.
3. Run `uvicorn app.main:app --reload --host 127.0.0.1 --port 8000` from `backend/`.
4. In a second terminal, run `npm install` and `npm run dev` from the project root.

The frontend now posts preferences to `POST /api/recommendations`. See the backend README for the full instructions and current catalog limitations.
