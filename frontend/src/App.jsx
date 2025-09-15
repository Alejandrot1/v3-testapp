import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Stations from './pages/Stations';
import Report from './pages/Report';
import IncidentDetails from './pages/IncidentDetails';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/report" element={<Report />} />
          <Route path="/incidents/:id" element={<IncidentDetails />} />
        </Routes>
      </main>
      <footer className="bg-gray-100 border-t py-4">
        <div className="container mx-auto px-4 text-sm text-gray-600">
          © {new Date().getFullYear()} City Fire Department. All rights reserved.
        </div>
      </footer>
    </div>
  );
}