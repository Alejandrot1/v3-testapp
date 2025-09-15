import React, { useEffect, useState } from 'react';

export default function Firefighters() {
  const [firefighters, setFirefighters] = useState([]);

  useEffect(() => {
    fetch('/api/firefighters')
      .then((response) => response.json())
      .then(data => setFirefighters(data.firefighters || []))
      .catch(error => console.error('Error fetching firefighters:', error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Firefighters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {firefighters.map((firefighter) => (
          <div key={firefighter.id} className="rounded-lg border bg-white shadow-sm p-4">
            <h3 className="text-lg font-semibold">{firefighter.name}</h3>
            <p className="text-sm text-gray-600">{firefighter.on_duty ? "On Duty" : "Off Duty"}</p>
            <p className="mt-2">Station ID: {firefighter.station_id}</p>
            {firefighter.rank and <p className="text-sm text-gray-500">Rank: {firefighter.rank}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}