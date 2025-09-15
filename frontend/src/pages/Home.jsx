import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';

export default function Home() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-gradient-to-r from-fire-dark to-fire-red text-white p-8">
        <h1 className="text-3xl md:text-4xl font-bold">City Fire Department</h1>
        <p className="mt-2 text-white/90">
          Rapid response. Community safety. Professional service.
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats ? (
            <>
              <StatCard label="Calls Today" value={stats.calls_today} color="bg-white/10" accent="text-white" />
              <StatCard label="This Month" value={stats.calls_this_month} color="bg-white/10" accent="text-white" />
              <StatCard label="Avg Response (min)" value={stats.avg_response_time_min} color="bg-white/10" accent="text-white" />
              <StatCard label="Active Incidents" value={stats.active_incidents} color="bg-white/10" accent="text-white" />
            </>
          ) : (
            <>
              <div className="animate-pulse h-20 bg-white/10 rounded-lg" />
              <div className="animate-pulse h-20 bg-white/10 rounded-lg" />
              <div className="animate-pulse h-20 bg-white/10 rounded-lg" />
              <div className="animate-pulse h-20 bg-white/10 rounded-lg" />
            </>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">About Us</h2>
        <p className="text-gray-700">
          The City Fire Department is committed to protecting life, property, and the environment
          through prevention, education, emergency response, and community partnerships.
        </p>
      </section>
    </div>
  );
}