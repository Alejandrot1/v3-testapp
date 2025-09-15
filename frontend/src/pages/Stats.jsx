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
      <section className="rounded-xl bg-gradient-to-r from-red-800 to-red-600 text-white p-8">
        <h1 className="text-3xl md:text-4xl font-bold">City Fire Department</h1>
        <p className="mt-2 text-white/90">Rapid response. Community safety. Professional service.</p>
        <div className="mt-6 grid