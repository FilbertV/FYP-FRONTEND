import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block py-2.5 px-4 rounded hover:bg-blue-100 ${
      isActive ? 'bg-blue-200 font-semibold' : 'text-gray-700'
    }`;

  return (
    <div className="w-64 bg-white border-r min-h-screen shadow-md p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">Vistura Admin</h2>
      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/admin/inventory" className={linkClass}>Inventory</NavLink>
        <NavLink to="/admin/products" className={linkClass}>Products</NavLink>
        <NavLink to="/admin/orders" className={linkClass}>Orders</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;