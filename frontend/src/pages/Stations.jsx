import React, { useEffect, useState } from 'react';

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
          <div key={s.id} className="rounded-lg border bg-white shadow-sm p-4">
            <h3 className="text-lg font-semibold">{s.name}</h3>
            <div className="text-sm text-gray-600 mt-1">{s.address}</div>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 rounded-md bg-red-50 text-red-600 px-2 py-1">On Duty: {s.on_duty_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}