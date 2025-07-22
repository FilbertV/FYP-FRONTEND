import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/history`);
      setOrders(res.data);
    } catch (err) {
      toast.error('❌ Failed to load order history');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">📜 Order History</h2>
      <table className="w-full text-sm border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-2 border text-center">{o.id}</td>
              <td className="p-2 border">{o.product_name}</td>
              <td className="p-2 border text-center">{o.quantity}</td>
              <td className="p-2 border">{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;