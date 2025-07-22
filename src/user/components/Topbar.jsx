import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();
  let user = null;

  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">Vistura</div>
      <div className="space-x-4 text-sm font-medium">
        <Link to="/user" className="hover:text-blue-500">Home</Link>
        <Link to="/user/products" className="hover:text-blue-500">Browse Products</Link>
        {user ? (
          <>
            <Link to="/user/my-orders" className="hover:text-blue-500">My Orders</Link>
            <span className="text-gray-600">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="ml-2 text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
