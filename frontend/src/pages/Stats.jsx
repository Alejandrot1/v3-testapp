import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats);
  }, []);

  if (!stats) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Department Statistics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Calls Today" value={stats.calls_today} />
        <StatCard label="Calls This Month" value={stats.calls_this_month} />
        <StatCard label="Avg Response Time (min)" value={stats.avg_response_time_min} />
        <StatCard label="Active Incidents" value={stats.active_incidents} />
        <StatCard label="Firefighters On Duty" value={stats.firefighters_on_duty} />
        <StatCard label="Stations" value={stats.stations} />
      </div>
    </div>
  );
}