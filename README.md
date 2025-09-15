# Fire Department: FastAPI backend + Vite + React + Tailwind SPA

This repo contains:
- A FastAPI backend (Cloud Run-ready) with endpoints for fire department stats, stations, and incidents.
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
- GET /api/stations
- GET /api/stations/{station_id}
- GET /api/incidents
  - Optional query params: status, severity
- GET /api/incidents/{incident_id}

## Firebase Hosting

firebase.json includes:
- Rewrite /api/** to your Cloud Run service
- SPA fallback to /index.html for client-side routing