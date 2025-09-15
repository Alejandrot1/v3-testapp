import React from 'react';
import { NavLink } from 'react-router-dom';

const navClasses = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive ? 'bg-fire-red text-white' : 'text-gray-700 hover:bg-gray-100'
  }`;

export default function NavBar() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-fire-red text-white font-bold">
            FD
          </span>
          <div>
            <div className="text-xl font-semibold">City Fire Department</div>
            <div className="text-xs text-gray-500 -mt-1">Serving our community with pride</div>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navClasses} end>Home</NavLink>
          <NavLink to="/stats" className={navClasses}>Stats</NavLink>
          <NavLink to="/stations" className={navClasses}>Stations</NavLink>
          <NavLink to="/incidents" className={navClasses}>Incidents</NavLink>
          <NavLink to="/report" className={navClasses}>Report</NavLink>
        </nav>
      </div>
    </header>
  );
}