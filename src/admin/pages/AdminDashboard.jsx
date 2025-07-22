import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, ClipboardList, AlertTriangle } from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const prodRes = await axios.get("/api/products");
      const orderRes = await axios.get("/api/orders");
      setProducts(prodRes.data);
      setOrders(orderRes.data);

      const lowStockItems = prodRes.data.filter((item) => item.stock < 10);
      setLowStock(lowStockItems);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin 👋</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Package className="text-blue-500 w-8 h-8" />
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <p className="text-2xl font-semibold">{products.length}</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <ClipboardList className="text-green-500 w-8 h-8" />
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-2xl font-semibold">{orders.length}</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AlertTriangle className="text-red-500 w-8 h-8" />
          <div>
            <p className="text-gray-500 text-sm">Low Stock Items</p>
            <p className="text-2xl font-semibold">{lowStock.length}</p>
          </div>
        </motion.div>
      </div>

      {/* LOW STOCK LIST */}
      {lowStock.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-red-600">
            ⚠️ Low Stock Alerts
          </h2>
          <div className="bg-white rounded-2xl p-4 shadow overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-600 border-b">
                <tr>
                  <th className="py-2 pr-4">Product</th>
                  <th className="py-2 pr-4">Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="py-2 pr-4">{item.name}</td>
                    <td className="py-2 pr-4 text-red-500 font-medium">
                      {item.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RECENT ORDERS */}
      <div>
        <h2 className="text-xl font-semibold mb-3">📦 Recent Orders</h2>
        <div className="bg-white rounded-2xl p-4 shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-600 border-b">
              <tr>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Product</th>
                <th className="py-2 pr-4">Dimensions</th>
                <th className="py-2 pr-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {[...orders].reverse().slice(0, 5).map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 pr-4">{order.name}</td>
                  <td className="py-2 pr-4">{order.product}</td>
                  <td className="py-2 pr-4">
                    {order.width}cm x {order.height}cm
                  </td>
                  <td className="py-2 pr-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;