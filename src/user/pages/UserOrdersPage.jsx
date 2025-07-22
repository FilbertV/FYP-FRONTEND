import React, { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simple GET request to see if it works (no token)
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err);
      });
  }, []);

  return (
    <div>
      <Topbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order._id} className="p-4 border rounded shadow">
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
