import React, { useState } from 'react';

export default function Report() {
  const [formData, setFormData] = useState({
    type: '',
    severity: 'Low',
    address: '',
    station_id: 1,
    units_responding: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/incidents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      // Handle success
      alert('Incident reported successfully!');
      setFormData({ type: '', severity: 'Low', address: '', station_id: 1, units_responding: [] });
    } else {
      // Handle failure
      alert('Failed to report incident.');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Report an Incident</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
        <label className="block mb-2">
          Incident Type
          <input type="text" name="type" value={formData.type} onChange={handleChange} required className="block w-full mt-1 border rounded-md h-10" />
        </label>
        <label className="block mb-2">
          Severity
          <select name="severity" value={formData.severity} onChange={handleChange} className="block w-full mt-1 border rounded-md h-10">
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </label>
        <label className="block mb-2">
          Address
          <input type="text" name="address" value={formData.address} onChange={handleChange} required className="block w-full mt-1 border rounded-md h-10" />
        </label>
        <label className="block mb-2">
          Station ID
          <input type="number" name="station_id" value={formData.station_id} onChange={handleChange} required className="block w-full mt-1 border rounded-md h-10" />
        </label>
        <button type="submit" className="w-full bg-fire-red text-white py-2 rounded-md">Report Incident</button>
      </form>
    </div>
  );
}