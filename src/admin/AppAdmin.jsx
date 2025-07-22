import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AdminDashboard from './pages/AdminDashboard';
import InventoryPage from './pages/InventoryPage';
import ProductManager from './pages/ProductManager';
import AdminOrdersPage from './pages/AdminOrdersPage';

const AppAdmin = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/products" element={<ProductManager />} />
          <Route path="/orders" element={<AdminOrdersPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppAdmin;