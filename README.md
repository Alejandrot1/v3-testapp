# Fire Department: FastAPI backend + Vite + React + Tailwind SPA

This repo contains:
- A FastAPI backend (Cloud Run-ready) with endpoints for fire department stats, stations, and incidents.
- A Vite + React + TailwindCSS frontend SPA deployed on Firebase Hosting, with rewrites to the Cloud Run backend.

## Local Development

### Terminal 1: Backend
- python -m venv .venv && source .venv/bin/activate
- pip install -r backend/requirements.txt
- uvicorn backend.main:app --reload --port 8080

### Terminal 2: Frontend
- cd frontend
- npm install
- npm run dev
- Open http://localhost:5173

The dev server proxies /api to http://localhost:8080.

## Build and Deploy (GCP Artifact Registry + Cloud Run + Firebase Hosting)

1. **Build backend image**
      export REGION=<your-region>
   export PROJECT_ID=<your-gcp-project-id>
   export REPO=fire-dept
   gcloud auth configure-docker "${REGION}-docker.pkg.dev"
   docker build -t "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/fire-backend:latest" .
   docker push "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/fire-backend:latest"
   
2. **Deploy to Cloud Run**
      gcloud run deploy fire-backend \
      --image "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/fire-backend:latest" \
      --platform managed \
      --region "${REGION}" \
      --allow-unauthenticated \
      --port 8080
   
3. **Configure Firebase Hosting Rewrite**
   Update your `firebase.json` file.

4. **Build Frontend**
      cd frontend
   npm install
   npm run build
   
5. **Deploy Frontend to Firebase Hosting**
      firebase login
   firebase init hosting
   firebase deploy --only hosting
   
## API Endpoints
- GET /api/hello
- GET /api/stats
- GET /api/stations
- POST /api/incidents
- GET /api/incidents

## Frontend Routes
- / — Home with stats overview
- /stats — Statistics
- /stations — Stations list
- /report — Report a new incident