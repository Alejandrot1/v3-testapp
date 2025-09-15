# Fire Department API

## Description

This is a FastAPI backend service for a Fire Department application. It provides endpoints to manage fire stations, incidents, and firefighters. The frontend is implemented using React with Vite, serving as a Single Page Application (SPA).

## Endpoints

- **GET** `/api/stations`: List all fire stations.
- **GET** `/api/firefighters`: List all firefighters.
- **GET** `/api/incidents`: List all incidents, filterable by status.
- **GET** `/api/incidents/{incident_id}`: Get details for a specific incident.
- **POST** `/api/incidents`: Report a new incident.
- **PATCH** `/api/incidents/{incident_id}`: Update a specific incident's details.
- **DELETE** `/api/incidents/{incident_id}`: Delete a specific incident.

## Local Development

1. Clone this repository.
2. Navigate to the backend folder and install dependencies:
      cd backend
   pip install -r requirements.txt
   3. Run the backend server:
      uvicorn main:app --reload --host 0.0.0.0 --port 8080
   
4. Navigate to the frontend folder and install dependencies:
      cd frontend
   npm install
   5. Run the frontend development server:
      npm run dev
   
6. Open your browser and visit `http://localhost:5173`.

---

This structure boasts an organized approach to manage fire department data, offering functionalities to gather statistics and view detailed incident information. Future feature expansions could include user roles, notifications, and more detailed reporting.