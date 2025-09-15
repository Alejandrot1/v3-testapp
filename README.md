# Fire Department: FastAPI backend + Vite + React + Tailwind SPA

This repo contains:
- A FastAPI backend (Cloud Run-ready) with endpoints for fire department stats, stations, incidents, and basic metrics.
- A Vite + React + TailwindCSS frontend SPA deployed on Firebase Hosting, with rewrites to the Cloud Run backend.

## Local development

Terminal 1: Backend
- python -m venv .venv && source .venv/bin/activate
- pip install -r backend/requirements.txt
- uvicorn backend.main:app --reload --port 8080

Terminal 2: Frontend
- cd frontend
- npm install
- npm run dev
- Open http://localhost:5173

The dev server proxies /api to http://localhost:8080.

## Build and Deploy (GCP Artifact Registry + Cloud Run + Firebase Hosting)

1) Build backend image
- export REGION=<your-region>
- export PROJECT_ID=<your-gcp-project-id>
- export REPO=fire-dept
- gcloud auth configure-docker "${REGION}-docker.pkg.dev"
- docker build -t "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/fire-backend:latest" .
- docker push "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/fire-backend:latest"

2) Deploy to Cloud Run
- gcloud run deploy fire-backend \
  --image "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/fire-backend:latest" \
  --platform managed \
  --region "${REGION}" \
  --allow-unauthenticated \
  --port 8080

3) Configure Firebase Hosting rewrite
- Update firebase.json:
  - serviceId: the Cloud Run service name (e.g., fire-backend)
  - region: the Cloud Run region

4) Build frontend
- cd frontend
- npm install
- npm run build

5) Deploy frontend to Firebase Hosting
- firebase login
- firebase init hosting (select existing project, set public to frontend/dist, single-page app yes)
- firebase deploy --only hosting

## API endpoints

- GET /api/hello
- GET /api/stats
- GET /api/metrics/calls_by_day?days=14
- GET /api/stations
- GET /api/stations/{station_id}
- GET /api/incidents
  - Optional query params: status, severity
- GET /api/incidents/{incident_id}
- POST /api/incidents
  - body: { type, severity["Low"|"Moderate"|"High"|"Critical"], address, station_id, units_responding[] }
- PATCH /api/incidents/{incident_id}
  - body: partial update of { status["Active"|"Cleared"], severity, address, units_responding[] }

Note: Data is in-memory for demo purposes.

## Frontend routes

- / — Home with hero and summary stats
- /stats — Dashboard stats with a calls-by-day chart
- /stations — Stations grid
- /stations/:id — Station details with recent incidents
- /incidents — Incidents table with filters
- /incidents/:id — Incident details and status control
- /report — Report a new incident form