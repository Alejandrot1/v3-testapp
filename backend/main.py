from datetime import datetime, timedelta, timezone
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Fire Department API", version="1.0.0")

# Allow frontend dev server in local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory sample data
UTC = timezone.utc
now = datetime.now(tz=UTC)

STATIONS = [
    {
        "id": 1,
        "name": "Station 1 - Central",
        "address": "100 Main St",
        "apparatus_count": 4,
        "on_duty_count": 12,
        "lat": 47.6062,
        "lng": -122.3321,
    },
    {
        "id": 2,
        "name": "Station 2 - North",
        "address": "220 North Ave",
        "apparatus_count": 3,
        "on_duty_count": 9,
        "lat": 47.6756,
        "lng": -122.2711,
    },
    {
        "id": 3,
        "name": "Station 3 - South",
        "address": "450 South Blvd",
        "apparatus_count": 3,
        "on_duty_count": 8,
        "lat": 47.5233,
        "lng": -122.3550,
    },
]

INCIDENTS = [
    {
        "id": 101,
        "type": "Structure Fire",
        "severity": "Critical",
        "status": "Active",
        "address": "742 Evergreen Terrace",
        "reported_at": (now - timedelta(minutes=12)).isoformat(),
        "units_responding": ["E1", "T1", "B1", "M3"],
        "station_id": 1,
    },
    {
        "id": 102,
        "type": "Medical Aid",
        "severity": "Moderate",
        "status": "Cleared",
        "address": "88 Lakeview Rd",
        "reported_at": (now - timedelta(hours=3, minutes=5)).isoformat(),
        "units_responding": ["M2"],
        "station_id": 2,
    },
    {
        "id": 103,
        "type": "Vehicle Accident",
        "severity": "High",
        "status": "Active",
        "address": "I-5 S & Exit 163",
        "reported_at": (now - timedelta(minutes=34)).isoformat(),
        "units_responding": ["E3", "M4", "B2"],
        "station_id": 3,
    },
    {
        "id": 104,
        "type": "Alarm Bell",
        "severity": "Low",
        "status": "Cleared",
        "address": "55 Commerce Park",
        "reported_at": (now - timedelta(hours=15)).isoformat(),
        "units_responding": ["E2"],
        "station_id": 2,
    },
]

# Derived stats (mock)
def month_start(dt: datetime) -> datetime:
    return dt.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

def compute_stats():
    calls_today = sum(1 for i in INCIDENTS if datetime.fromisoformat(i["reported_at"]).date() == now.date())
    calls_this_month = sum(1 for i in INCIDENTS if datetime.fromisoformat(i["reported_at"]) >= month_start(now))
    active_incidents = sum(1 for i in INCIDENTS if i["status"].lower() == "active")
    avg_response_time_min = 5.7  # mock
    firefighters_on_duty = sum(s["on_duty_count"] for s in STATIONS)
    stations_count = len(STATIONS)
    return {
        "calls_today": calls_today,
        "calls_this_month": calls_this_month,
        "avg_response_time_min": avg_response_time_min,
        "active_incidents": active_incidents,
        "firefighters_on_duty": firefighters_on_duty,
        "stations": stations_count,
        "last_updated": now.isoformat(),
    }

@app.get("/api/hello")
async def hello():
    return {"message": "Welcome to the Fire Department API"}

@app.get("/api/stats")
async def stats():
    return compute_stats()

@app.get("/api/stations")
async def list_stations():
    return {"stations": STATIONS}

@app.get("/api/stations/{station_id}")
async def get_station(station_id: int):
    station = next((s for s in STATIONS if s["id"] == station_id), None)
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    incidents = [i for i in INCIDENTS if i["station_id"] == station_id]
    return {"station": station, "recent_incidents": incidents}

@app.get("/api/incidents")
async def list_incidents(status: Optional[str] = None, severity: Optional[str] = None):
    data = INCIDENTS
    if status:
        data = [i for i in data if i["status"].lower() == status.lower()]
    if severity:
        data = [i for i in data if i["severity"].lower() == severity.lower()]
    return {"incidents": data}

@app.get("/api/incidents/{incident_id}")
async def get_incident(incident_id: int):
    incident = next((i for i in INCIDENTS if i["id"] == incident_id), None)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    station = next((s for s in STATIONS if s["id"] == incident["station_id"]), None)
    return {"incident": incident, "station": station}