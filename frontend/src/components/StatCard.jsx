import React from 'react';

export default function StatCard({ label, value, color = 'bg-white', accent = 'text-fire.red' }) {
  return (
    <div className={`rounded-lg border shadow-sm ${color}`}>
      <div className="p-4">
        <div className="text-sm text-gray-500">{label}</div>
        <div className={`text-3xl font-bold mt-1 ${accent}`}>{value}</div>
      </div>
    </div>
  );
}