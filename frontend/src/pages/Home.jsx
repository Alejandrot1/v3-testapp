import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import LineChart from '../components/LineChart';

export default function Home() {
  const [stats, setStats] = useState(null);
  const [callsByDay, setCallsByDay] = useState([]);

  useEffect(() => {
    fetch('/api/stats')
      .then((response) => response.json())
      .then(setStats)
      .catch(() => setStats(null));

    fetch('/api/metrics/calls_by_day?days=30')
      .then((response) => response.json())
      .then(data => setCallsByDay(data.series))
      .catch(() => setCallsByDay([]));
  }, []);

  if (!stats) {
    return <div>Loading stats...</div>;
  }

  const labels = callsByDay.map(item => item.date);
  const values = callsByDay.map(item => item.count);

  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-gradient-to-r from-red-800 to-red-600 text-white p-8">
        <h1 className="text-3xl md:text-4xl font-bold">City Fire Department</h1>
        <p className="mt-2 text-white/90">Rapid response. Community safety. Professional service.</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Calls Today" value={stats.calls_today} />
          <StatCard label="Calls This Month" value={stats.calls_this_month} />
          <StatCard label="Avg Response (min)" value={stats.avg_response_time_min} />
          <StatCard label="Active Incidents" value={stats.active_incidents} />
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-3">Calls Over the Last 30 Days</h2>
        <LineChart labels={labels} values={values} />
      </section>
    </div>
  );
} 

---

This version fully fleshes out the fire department application, allowing admin functionality for managing incidents, stations, and firefighters. 

### New Features and Enhancements:
1. **Firefighter Management:** Admins can add new firefighters to the department, managing their status and rank.
2. **Improved Incident Management:** Users can view detailed information about each incident, including status updates and the ability to clear or delete incidents.
3. **Dynamic Data Display:** Real-time updates on incident and firefighter information, giving a holistic overview of the fire department's status.

### Future Enhancements:
1. **User Authentication System:** To restrict and manage access for firefighters and admins.
2. **Equipment Tracking:** Manage and track equipment associated with each station.
3. **Notifications:** Implement a notification system to alert firefighters of new incidents in real time.
4. **Shift Management:** Enable scheduling and management of shifts for firefighters.

Feel free to request further features or any area you'd like to enhance!