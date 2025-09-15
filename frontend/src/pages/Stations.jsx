import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Stations() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('/api/stations').then(r => r.json()).then((data) => setStations(data.stations || []));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Stations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {stations.map((s) => (
          <Link key={s.id} to={`/stations/${s.id}`} className="rounded-lg border bg-white shadow-sm p-4 block hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{s.name}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                Apparatus: {s.apparatus_count}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">{s.address}</div>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 rounded-md bg-red-50 text-fire-red px-2 py-1">
                On Duty: <strong>{s.on_duty_count}</strong>
              </span>
              <span className="text-gray-500">ID: {s.id}</span>
            </div>
          </Link>
        ))}
        {stations.length === 0 && <div className="text-gray-600">No stations found.</div>}
      </div>
    </div>
  );
}