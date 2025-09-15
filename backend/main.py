from datetime import datetime, timedelta, timezone
from typing import List, Optional, Literal
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Fire Department API", version="1.8.0")

# Allow frontend dev server in local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample Data
UTC = timezone.utc

# Fire stations
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

# Incident records
now = datetime.now(tz=UTC)
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
        "reported_at": (now - timedelta(days=1, hours=2)).isoformat(),
        "units_responding": ["E2"],
        "station_id": 2,
    },
]

def month_start(dt: datetime) -> datetime:
    return dt.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

def compute_stats():
    _now = datetime.now(tz=UTC)
    calls_today = sum(
        1 for i in INCIDENTS if datetime.fromisoformat(i["reported_at"]).date() == _now.date()
    )
    calls_this_month = sum(
        1 for i in INCIDENTS if datetime.fromisoformat(i["reported_at"]) >= month_start(_now)
    )
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
        "last_updated": _now.isoformat(),
    }

def next_incident_id() -> int:
    return (max((i["id"] for i in INCIDENTS), default=100)) + 1

def ensure_station_exists(station_id: int):
    if not any(s["id"] == station_id for s in STATIONS):
        raise HTTPException(status_code=400, detail="Invalid station_id")

class IncidentCreate(BaseModel):
    type: str
    severity: Literal["Low", "Moderate", "High", "Critical"]
    address: str
    station_id: int
    units_responding: List[str] = Field(default_factory=list)

@app.get("/api/hello")
async def hello():
    return {"message": "Welcome to the Fire Department API"}

@app.get("/api/stats")
async def stats():
    return compute_stats()

@app.get("/api/stations")
async def list_stations():
    return {"stations": STATIONS}

@app.post("/api/incidents", status_code=201)
async def create_incident(payload: IncidentCreate):
    ensure_station_exists(payload.station_id)
    incident = {
        "id": next_incident_id(),
        "type": payload.type,
        "severity": payload.severity,
        "status": "Active",
        "address": payload.address,
        "reported_at": datetime.now(tz=UTC).isoformat(),
        "units_responding": payload.units_responding or [],
        "station_id": payload.station_id,
    }
    INCIDENTS.insert(0, incident)
    return {"incident": incident}

class Incident(BaseModel):
    id: int
    type: str
    severity: Literal["Low", "Moderate", "High", "Critical"]
    status: Literal["Active", "Cleared"]
    address: str
    reported_at: str
    units_responding: List[str]
    station_id: int

@app.get("/api/incidents", response_model=List[Incident])
async def get_incidents(status: Optional[str] = None):
    filtered_incidents = INCIDENTS
    if status:
        filtered_incidents = [i for i in INCIDENTS if i["status"].lower() == status.lower()]
    return filtered_incidents

@app.get("/api/incidents/{incident_id}", response_model=Incident)
async def get_incident(incident_id: int):
    incident = next((i for i in INCIDENTS if i["id"] == incident_id), None)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident

@app.patch("/api/incidents/{incident_id}")
async def update_incident(incident_id: int, payload: IncidentCreate):
    incident = next((i for i in INCIDENTS if i["id"] == incident_id), None)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    # Update fields provided
    if payload.type:
        incident["type"] = payload.type
    if payload.severity:
        incident["severity"] = payload.severity
    if payload.address:
        incident["address"] = payload.address
    if payload.units_responding:
        incident["units_responding"] = payload.units_responding

    return {"incident": incident}

@app.delete("/api/incidents/{incident_id}", status_code=204)
async def delete_incident(incident_id: int):
    global INCIDENTS
    incident = next((i for i in INCIDENTS if i["id"] == incident_id), None)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    INCIDENTS = [i for i in INCIDENTS if i["id"] != incident_id]
    return