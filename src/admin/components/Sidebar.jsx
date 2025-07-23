import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `block py-2.5 px-4 rounded hover:bg-blue-100 ${
      isActive ? 'bg-blue-200 font-semibold' : 'text-gray-700'
    }`;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="w-64 bg-white border-r min-h-screen shadow-md p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-8">Vistura Admin</h2>
        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/admin/inventory" className={linkClass}>Inventory</NavLink>
          <NavLink to="/admin/products" className={linkClass}>Products</NavLink>
          <NavLink to="/admin/orders" className={linkClass}>Orders</NavLink>
        </nav>
      </div>

      {/* 🔽 Logout Button */}
      <div className="pt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;