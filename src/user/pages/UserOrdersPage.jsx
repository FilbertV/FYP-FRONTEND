import React, { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';

const UserOrdersPage = () => {
  console.log("📍 UserOrdersPage loaded");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE_URL = 'http://localhost:5000';
    console.log("📦 Fetching from:", `${BASE_URL}/api/orders`);

    fetch(`${BASE_URL}/api/orders`)
      .then((res) => {
        console.log("🔁 Response status:", res.status);
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        console.log("✅ Orders fetched:", data);
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch failed:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Topbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="p-4 border rounded shadow">
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Product:</strong> {order.product}</p>
                <p><strong>Width:</strong> {order.width}</p>
                <p><strong>Height:</strong> {order.height}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Notes:</strong> {order.notes}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserOrdersPage;
