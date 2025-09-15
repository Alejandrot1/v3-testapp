import React, { useEffect, useState } from 'react';

export default function Firefighters() {
  const [firefighters, setFirefighters] = useState([]);

  useEffect(() => {
    fetch('/api/firefighters')
      .then((response) => response.json())
      .then(data => setFirefighters(data.firefighters || []))
      .catch(error => console.error('Error fetching firefighters:', error));
  }, []);

  const handleAddFirefighter = async () => {
    const newFirefighter = { name: "New Firefighter", rank: "Firefighter", station_id: 1, on_duty: false };
    const response = await fetch('/api/firefighters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFirefighter)
    });
    if (response.ok) {
      const createdFirefighter = await response.json();
      setFirefighters([...firefighters, createdFirefighter.firefighter]);
    } else {
      alert('Failed to add firefighter.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Firefighters</h1>
      <button onClick={handleAddFirefighter} className="mb-4 bg-green-600 text-white py-1 px-3 rounded">Add Firefighter</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {firefighters.map((firefighter) => (
          <div key={firefighter.id} className="rounded-lg border bg-white shadow-sm p-4">
            <h3 className="text-lg font-semibold">{firefighter.name}</h3>
            <p className="text-sm text-gray-600">{firefighter.on_duty ? "On Duty" : "Off Duty"}</p>
            <p className="mt-2">Station ID: {firefighter.station_id}</p>
            {firefighter.rank and <p className="text-sm text-gray-500">Rank: {firefighter.rank}</p>}
          </div>
        ))}
        {firefighters.length === 0 && <div className="text-gray-600">No firefighters found.</div>}
      </div>
    </div>
  );
}