import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderPage from './pages/OrderPage';
import UserOrdersPage from './pages/UserOrdersPage'; // 👈 Add this line

const AppUser = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/my-orders" element={<UserOrdersPage />} /> {/* 👈 Make sure this is defined */}
      </Routes>
    </AnimatePresence>
  );
};

export default AppUser;