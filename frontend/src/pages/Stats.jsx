import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import LineChart from '../components/LineChart';

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats);
    fetch('/api/metrics/calls_by_day?days=14').then(r => r.json()).then((d) => setSeries(d.series));
  }, []);

  if (!stats) {
    return <div>Loading stats...</div>;
  }

  const labels = series ? series.map(p => p.date.slice(5)) : [];
  const values = series ? series.map(p => p.count) : [];

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

      <div className="rounded-lg border bg-white p-4">
        <div className="text-sm text-gray-500 mb-2">Calls (last 14 days)</div>
        {series ? <LineChart labels={labels} values={values} /> : <div>Loading chart...</div>}
      </div>

      <div className="text-sm text-gray-500">Last updated: {new Date(stats.last_updated).toLocaleString()}</div>
    </div>
  );
}