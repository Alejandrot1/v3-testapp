import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Stations() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('/api/stations')
      .then((response) => response.json())
      .then(data => setStations(data.stations || []))
      .catch(error => console.error('Error fetching stations:', error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Stations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((station) => (
          <Link key={station.id} to={`/stations/${station.id}`} className="rounded-lg border bg-white shadow-sm p-4 block hover:shadow-md transition">
            <h3 className="text-lg font-semibold">{station.name}</h3>
            <p className="text-sm text-gray-600">{station.address}</p>
            <p className="mt-2">Apparatus Count: {station.apparatus_count}</p>
            <p className="mt-2">On Duty: {station.on_duty_count}</p>
          </Link>
        ))}
        {stations.length === 0 && <div className="text-gray-600">No stations found.</div>}
      </div>
    </div>
  );
}