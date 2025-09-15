# Fire Department API

## Description

This is a FastAPI backend service for a Fire Department application. It provides endpoints to manage fire stations and incidents. The frontend is implemented using React with Vite, serving as a Single Page Application (SPA).

## Endpoints

- **GET** `/api/stations`: List all fire stations.
- **GET** `/api/incidents`: List all incidents, filterable by status.
- **GET** `/api/incidents/{incident_id}`: Get details for a specific incident.
- **POST** `/api/incidents`: Report a new incident.
- **PATCH** `/api/incidents/{incident_id}`: Update a specific incident's details.
- **DELETE** `/api/incidents/{incident_id}`: Delete a specific incident.

---

This enhanced structure provides more features, allowing for dynamic incident management and statistics to be displayed via graphs and charts. You can continue expanding features like user roles, notifications, or reports as needed!