import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function IncidentDetails() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    fetch(`/api/incidents/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Incident not found");
        return response.json();
      })
      .then(data => setIncident(data))
      .catch(err => alert(err.message));
  }, [id]);

  const handleUpdate = async () => {
    const updatedIncident = { ...incident, status: "Cleared" };
    await fetch(`/api/incidents/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedIncident)
    });
    alert('Incident status updated!');
  };

  if (!incident) {
    return <div>Loading incident details...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Incident Details</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p><strong>Type:</strong> {incident.type}</p>
        <p><strong>Severity:</strong> {incident.severity}</p>
        <p><strong>Status:</strong> {incident.status}</p>
        <p><strong>Address:</strong> {incident.address}</p>
        <p><strong>Reported At:</strong> {new Date(incident.reported_at).toLocaleString()}</p>
        <p><strong>Units Responding:</strong> {incident.units_responding.join(', ')}</p>
        <p><strong>Station ID:</strong> {incident.station_id}</p>
        <button onClick={handleUpdate} className="mt-4 bg-blue-600 text-white py-2 rounded">
          Mark as Cleared
        </button>
      </div>
    </div>
  );
}