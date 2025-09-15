import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const severityBadge = (severity) => {
  const map = {
    Low: 'bg-gray-100 text-gray-700',
    Moderate: 'bg-amber-100 text-amber-800',
    High: 'bg-orange-100 text-orange-800',
    Critical: 'bg-red-100 text-red-800'
  };
  return map[severity] || 'bg-gray-100 text-gray-700';
};

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [status, setStatus] = useState('all');
  const [severity, setSeverity] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    if (status !== 'all') params.append('status', status);
    if (severity !== 'all') params.append('severity', severity);
    const query = params.toString() ? `?${params.toString()}` : '';
    fetch(`/api/incidents${query}`)
      .then(r => r.json())
      .then((data) => setIncidents(data.incidents || []));
  }, [status, severity]);

  const activeCount = useMemo(() => incidents.filter(i => i.status === 'Active').length, [incidents]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Incidents</h1>
        <div className="flex items-center gap-2">
          <Link to="/report" className="px-3 py-2 rounded-md bg-fire-red text-white text-sm">Report Incident</Link>
          <select className="border rounded-md px-2 py-1" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Cleared">Cleared</option>
          </select>
          <select className="border rounded-md px-2 py-1" value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option value="all">All Severity</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>
      <div className="text-sm text-gray-600">Active: {activeCount}</div>

      <div class