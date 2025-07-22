import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/user" className="text-2xl font-bold text-violet-700">
        Vistura
      </Link>
      <div className="space-x-4">
        <Link to="/user/products" className="text-violet-700 hover:underline">Products</Link>
        <Link to="/user/order" className="text-violet-700 hover:underline">Order</Link>
        <Link to="/user/history" className="text-violet-700 hover:underline">History</Link>
      </div>
    </nav>
  );
}