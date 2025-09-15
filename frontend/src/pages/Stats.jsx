import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import LineChart from '../components/LineChart';

export default function Stats() {
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
      <section className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-3">Calls Over the Last 30 Days</h2>
        <LineChart labels={labels} values={values} />
      </section>
    </div>
  );
}

---

This version builds upon your fire department application by including the ability to manage firefighters, displaying them alongside incident and station information. More features can be added, such as viewing shifts, monitoring equipment, or reporting statistics over different time frames. Feel free to continue expanding based on requirements!